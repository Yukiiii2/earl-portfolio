<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { shouldUseStaticScene } from './scene-strategy.js'

const sceneRoot = ref(null)
const renderState = ref('loading')
const STATIC_SCENE = '/hero-sculpture-still.webp'

let THREE = null
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

const makeMobiusGeometry = (compact = false) => {
  const segments = compact ? 96 : 144
  const across = compact ? 14 : 20
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

onMounted(async () => {
  const root = sceneRoot.value
  if (!root) return

  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  reducedMotion = motionQuery.matches
  const useStaticScene = shouldUseStaticScene({
    viewportWidth: window.innerWidth,
    reducedMotion,
    saveData: Boolean(navigator.connection?.saveData),
    hardwareConcurrency: navigator.hardwareConcurrency,
    deviceMemory: navigator.deviceMemory,
  })

  if (useStaticScene) {
    renderState.value = 'static'
    return
  }

  THREE = await import('three')
  if (disposed || !sceneRoot.value) return

  const width = Math.max(root.clientWidth, 1)
  const height = Math.max(root.clientHeight, 1)
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100)
  camera.position.set(0, 0, 7.2)

  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' })
  } catch (error) {
    renderState.value = 'fallback'
    console.error('Unable to initialize the hero WebGL renderer.', error)
    return
  }

  renderer.setClearColor(0x000000, 0)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
  renderer.setSize(width, height, false)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.className = 'scene-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  root.appendChild(renderer.domElement)

  scene.add(new THREE.HemisphereLight(0xfff6f0, 0x2b0d0b, 1.7))
  const keyLight = new THREE.DirectionalLight(0xfff0e8, 4.2)
  keyLight.position.set(4, 5, 6)
  scene.add(keyLight)
  const coralLight = new THREE.PointLight(0xff5148, 26)
  coralLight.position.set(-4, -2, 3)
  scene.add(coralLight)
  const rimLight = new THREE.DirectionalLight(0x8a3230, 2.3)
  rimLight.position.set(-3, 1, -5)
  scene.add(rimLight)

  geometry = makeMobiusGeometry(width < 480)
  material = new THREE.MeshPhysicalMaterial({
    color: '#d94b43',
    metalness: 0.28,
    roughness: 0.48,
    clearcoat: 0.28,
    clearcoatRoughness: 0.7,
    side: THREE.DoubleSide,
  })
  mobius = new THREE.Mesh(geometry, material)
  mobius.rotation.set(0.18, -0.25, -0.3)
  scene.add(mobius)

  motionQuery.addEventListener?.('change', handleMotionPreferenceChange)
  window.addEventListener('resize', handleResize, { passive: true })
  document.addEventListener('visibilitychange', handleVisibilityChange)
  root.addEventListener('pointermove', handlePointerMove, { passive: true })
  root.addEventListener('pointerleave', handlePointerLeave)

  renderScene()
  renderState.value = 'ready'
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
  <div
    ref="sceneRoot"
    class="scene-wrap"
    :class="`scene-wrap--${renderState}`"
    :data-render-state="renderState"
    role="img"
    :aria-label="renderState === 'ready' ? 'Rotating abstract Möbius sculpture in warm red' : 'Abstract Möbius sculpture in warm red'"
  >
    <img
      v-if="renderState !== 'ready'"
      class="scene-still"
      :src="STATIC_SCENE"
      alt=""
      width="568"
      height="568"
      decoding="async"
      fetchpriority="high"
    >
  </div>
</template>

<style scoped>
.scene-wrap { position: relative; width: 100%; height: 100%; contain: layout paint; touch-action: pan-y; }
.scene-canvas { display: block; width: 100%; height: 100%; pointer-events: none; }
.scene-still { position: absolute; inset: 6%; width: 88%; height: 88%; display: block; object-fit: contain; filter: drop-shadow(0 1.5rem 3rem rgba(191,48,42,.2)); }
.scene-wrap--static .scene-still,
.scene-wrap--fallback .scene-still { animation: scene-still-enter 820ms cubic-bezier(.2,.78,.2,1) both; }

@keyframes scene-still-enter {
  from { opacity: 0; transform: translate3d(0, .75rem, 0) scale(.985); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  .scene-wrap--static .scene-still,
  .scene-wrap--fallback .scene-still { animation: none; }
}
</style>
