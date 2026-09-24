<script setup>
import { shallowRef, onMounted, onUnmounted } from 'vue'


const objectRef = shallowRef(null)
let animationId = null

const animate = () => {
  if (objectRef.value) {
    objectRef.value.rotation.x += 0.005
    objectRef.value.rotation.y += 0.01
  }
  animationId = requestAnimationFrame(animate)
}

onMounted(() => {
  animate()
})

onUnmounted(() => {
  cancelAnimationFrame(animationId)
})
</script>

<template>
  <TresCanvas :alpha="true" :clear-alpha="0" class="w-full h-full pointer-events-none">
    <!-- Pulled the camera back from 6 to 9 to see the whole shape -->
    <TresPerspectiveCamera :position="[0, 0, 9]" />
    
    <TresMesh ref="objectRef" :position="[0, 0, 0]">
      <!-- Tweaked the geometry to be slightly more elegant -->
      <TresTorusKnotGeometry :args="[2.2, 0.4, 256, 64]" />
      <TresMeshBasicMaterial color="#FF3B30" wireframe />
    </TresMesh>
  </TresCanvas>
</template>