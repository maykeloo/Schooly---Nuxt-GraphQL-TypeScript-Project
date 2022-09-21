<script lang="ts" setup>
import {ref} from "vue";
import Search from "~/components/Search.vue";

const searchVisible = ref<boolean>(false)
const toggleSearch = () => {
  searchVisible.value = !searchVisible.value
}

</script>

<template>
  <div class="App">
    <Search @search="toggleSearch()" v-if="searchVisible"/>
    <div class="nav-sides left"><NavLeft @search="toggleSearch()"/></div>
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
