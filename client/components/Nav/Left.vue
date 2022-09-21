<script lang="ts" setup>
defineEmits<{
  (e: 'search'): void
}>()
</script>

<template>
  <div class="sidebar-wrapper">
    <div class="header">
      <a href="/">
        <h2>LOGO</h2>
      </a>
    </div>
    <div class="nav-wrapper">
      <nav>
        <NavList @search="$emit('search')"/>
      </nav>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 2rem 4rem;
  border-right: 1px solid #ccc;

  a {
    color: black;
    text-decoration: none;
  }

  .header {
    margin-bottom: 2rem;
  }

  .user-info {
    display: flex;
    gap: 1rem;
    align-items: center;
    .name {
      font-size: 1.5rem;
      margin-bottom: 0.15rem;
      font-weight: 500;
    }

    .bio {
      color: #ccc;
      margin-top: 0.5rem;
      font-weight: 300;
    }

    .email {
      font-size: 0.9rem;
    }
  }

  .nav-wrapper {
    margin-top: 3rem;

    &:deep(ul) {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      li {
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background: rgba(204, 204, 204, 0.473);
        }

        img {
          height: 1.5rem;
        }
      }
    }
  }
}
</style>
