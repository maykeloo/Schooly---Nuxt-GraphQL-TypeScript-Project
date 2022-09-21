<script setup lang="ts">
defineProps<{
  pageName: string
}>()
</script>

<template>
  <div class="label">
    {{ pageName }}
  </div>
</template>

<style scoped lang="scss">
  .label {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    font-size: 1.4rem;
    padding: 1.5rem 2rem;
    background: rgba(255, 255, 255, 0.13);
    backdrop-filter: blur(9.8px);
  }
</style>