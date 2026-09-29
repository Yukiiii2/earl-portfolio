<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'

const sceneRoot = ref(null)

let scene = null
let camera = null
let renderer = null
let mobius = null
let geometry = null
let material = null
let animationFrameId = null
let motionQuery = null
let reducedMotion = false
let disposed = false
let previousFrameTime = 0
let pointerTargetX = 0
let pointerTargetY = 0
let pointerX = 0
let pointerY = 0

const rotationSpeed = { x: 0.025, y: 0.16, z: 0.008 }

const makeMobiusGeometry = () => {
  const segments = 144
  const across = 20
  const radius = 1.28
  const halfWidth = 0.37
  const positions = []
  const indices = []

  for (let i = 0; i <= segments; i += 1) {
    const u = (i / segments) * Math.PI * 2
    for (let j = 0; j <= across; j += 1) {
      const v = ((j / across) * 2 - 1) * halfWidth
      const radial = radius + v * Math.cos(u / 2)
      positions.push(radial * Math.cos(u), v * Math.sin(u / 2), radial * Math.sin(u))
    }
  }

  for (let i = 0; i < segments; i += 1) {
    for (let j = 0; j < across; j += 1) {
      const a = i * (across + 1) + j
      const b = a + across + 1
      indices.push(a, b, a + 1, b, b + 1, a + 1)
    }
  }

  const mobiusGeometry = new THREE.BufferGeometry()
  mobiusGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))
  mobiusGeometry.setIndex(indices)
  mobiusGeometry.computeVertexNormals()
  return mobiusGeometry
}

const renderScene = () => {
  if (renderer && scene && camera && !disposed) renderer.render(scene, camera)
}

const stopAnimation = () => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
  previousFrameTime = 0
}

const animate = (time) => {
  animationFrameId = null
  if (disposed || !renderer || !mobius) return

  if (!document.hidden && !reducedMotion) {
    const delta = previousFrameTime ? Math.min((time - previousFrameTime) / 1000, 0.05) : 0
    previousFrameTime = time

    const pointerEase = 1 - Math.exp(-4 * delta)
    pointerX += (pointerTargetX - pointerX) * pointerEase
    pointerY += (pointerTargetY - pointerY) * pointerEase
    mobius.rotation.x += (rotationSpeed.x + pointerY * 0.035) * delta
    mobius.rotation.y += (rotationSpeed.y + pointerX * 0.035) * delta
    mobius.rotation.z += rotationSpeed.z * delta
    renderer.render(scene, camera)
  }

  if (!disposed && !document.hidden && !reducedMotion && animationFrameId === null) {
    animationFrameId = requestAnimationFrame(animate)
  }
}

const startAnimation = () => {
  if (disposed || reducedMotion || document.hidden || animationFrameId !== null || !renderer) return
  previousFrameTime = 0
  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (!renderer || !camera || !sceneRoot.value) return
  const width = Math.max(sceneRoot.value.clientWidth, 1)
  const height = Math.max(sceneRoot.value.clientHeight, 1)
  camera.aspect = width / height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(width, height, false)
  renderScene()
}

const handlePointerMove = (event) => {
  if (reducedMotion || !sceneRoot.value) return
  const bounds = sceneRoot.value.getBoundingClientRect()
  pointerTargetX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
  pointerTargetY = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
}

const handlePointerLeave = () => {
  pointerTargetX = 0
  pointerTargetY = 0
}

const handleVisibilityChange = () => {
  if (document.hidden) stopAnimation()
  else startAnimation()
}

const handleMotionPreferenceChange = () => {
  reducedMotion = motionQuery.matches
  pointerTargetX = 0
  pointerTargetY = 0
  pointerX = 0
  pointerY = 0
  if (reducedMotion) stopAnimation()
  else startAnimation()
  renderScene()
}

onMounted(() => {
  const root = sceneRoot.value
  if (!root) return

  const width = Math.max(root.clientWidth, 1)
  const height = Math.max(root.clientHeight, 1)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
  camera.position.set(0, 0, 7.2)

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch (error) {
    console.error('Unable to initialize the hero WebGL renderer.', error)
    return
  }

  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(width, height, false)
  renderer.toneMapping = THREE.ReinhardToneMapping
  renderer.domElement.className = 'scene-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  root.appendChild(renderer.domElement)

  scene.add(new THREE.AmbientLight(0xffffff, 1.15))
  const keyLight = new THREE.DirectionalLight(0xfff0e8, 3.2)
  keyLight.position.set(4, 5, 6)
  scene.add(keyLight)
  const coralLight = new THREE.PointLight(0xff5148, 18)
  coralLight.position.set(-4, -2, 3)
  scene.add(coralLight)

  geometry = makeMobiusGeometry()
  material = new THREE.MeshStandardMaterial({
    color: '#dd5149',
    metalness: 0.18,
    roughness: 0.6,
    side: THREE.DoubleSide,
  })
  mobius = new THREE.Mesh(geometry, material)
  mobius.rotation.set(0.18, -0.25, -0.3)
  scene.add(mobius)

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionQuery.matches
  motionQuery.addEventListener?.('change', handleMotionPreferenceChange)
  window.addEventListener('resize', handleResize, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  root.addEventListener('pointermove', handlePointerMove, { passive: true })
  root.addEventListener('pointerleave', handlePointerLeave)

  renderScene()
  startAnimation()
})

onBeforeUnmount(() => {
  disposed = true
  stopAnimation()
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  motionQuery?.removeEventListener?.('change', handleMotionPreferenceChange)
  sceneRoot.value?.removeEventListener('pointermove', handlePointerMove)
  sceneRoot.value?.removeEventListener('pointerleave', handlePointerLeave)

  geometry?.dispose()
  material?.dispose()
  renderer?.dispose()
  if (renderer?.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
  scene?.clear()

  geometry = null
  material = null
  mobius = null
  camera = null
  scene = null
  renderer = null
  motionQuery = null
})
</script>

<template>
  <div ref="sceneRoot" class="scene-wrap" aria-hidden="true"></div>
</template>

<style scoped>
.scene-wrap { width: 100%; height: 100%; touch-action: pan-y; }
.scene-canvas { display: block; width: 100%; height: 100%; pointer-events: none; }
</style>
