<script setup lang="ts">
    definePageMeta({
      middleware: "auth"
    })
</script>

<template>
  <NuxtLayout name="threeview">
    <template #main>
      <PostList></PostList>
    </template>
  </NuxtLayout>
</template>

<style scoped lang="scss">

</style>


