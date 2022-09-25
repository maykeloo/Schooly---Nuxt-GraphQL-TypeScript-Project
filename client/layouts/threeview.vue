<script lang="ts" setup>
import Search from "~/components/Search.vue";
import useSearchComponent from '@/composables/searchComponent'

const { toggleVisible, isVisible } = useSearchComponent()
</script>

<template>
  <div class="App">
    <Search @search="toggleVisible" v-if="isVisible"/>
    <div class="nav-sides left"><NavLeft @search="toggleVisible"/></div>
    <div class="nav-main"><slot name="main"></slot></div>
    <div class="nav-sides right"><NavRight/></div>
  </div>
</template>

<style lang="scss" scoped>  
  .nav-sides {
    position: fixed;
    z-index: 3;
    top: 0;
    height: 100vh;
    width: 25vw;

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }
  }

  .nav-main {
    width: 50vw;
    height: fit-content;
    margin: 0 auto;
    padding: 6rem 2rem 4rem 2rem;
      position: relative;

    &:deep(main) {
      width: 100vw;
    }
  }
</style>
