<template>
  <div class="App">
    <div class="nav-sides left"><NavLeft/></div>
    <div class="nav-main"><slot name="main"></slot></div>
    <div class="nav-sides right"><NavRigth/></div>
  </div>
</template>

<style lang="scss" scoped>  
  .nav-sides {
    position: fixed;
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
    padding-top: 4rem;
      position: relative;

    &:deep(main) {
      width: 100vw;
    }
  }
</style>