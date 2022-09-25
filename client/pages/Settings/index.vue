<script setup lang="ts"></script>

<template>
  <NuxtLayout name="threeview">
    <template #main> 
      <h1 class="title">Settings</h1>
      <div class="list">
            <div class="list-item">
                  <img src="@/assets/icons/icon-name.svg" alt="">
                  <span>Name</span>
                  <div class="edit">Change</div>
            </div>
            <div class="list-item">
                  <img src="@/assets/icons/icon-mail.svg" alt="">
                  <span>E-mail</span>
                  <div class="edit">Change</div>
            </div>
            <div class="list-item">
                  <img src="@/assets/icons/icon-password.svg" alt="">
                  <span>Password</span>
                  <div class="edit">Change</div>
            </div>
            <div class="list-item">
                  <img src="@/assets/icons/icon-privacy.svg" alt="">
                  <span>Who can see and comment my posts</span>
                  <div class="edit">Change</div>
            </div>
            <div class="list-item">
                  <img src="@/assets/icons/icon-delete.svg" alt="">
                  <span>Posts</span>
                  <div class="edit">Delete</div>
            </div>
            <div class="list-item">
                  <img src="@/assets/icons/icon-delete.svg" alt="">
                  <span>Comments</span>
                  <div class="edit">Delete</div>
            </div>
      </div>  
    </template>
  </NuxtLayout>
</template>

<style scoped lang="scss">
      .title {
            margin-bottom: 1.5rem;
      }
      .list {
            display: flex;
            flex-direction: column;

            .list-item {
                  padding: 1.5rem 1rem;
                  cursor: pointer;
                  border-top: 1px solid #ccc;
                  display: flex;
                  align-items: center;
                  gap: 1rem;

                  img {
                        width: 2rem;
                  }

                  .edit {
                        margin-left: auto;
                        text-decoration: underline;
                  }
            }
      }
</style>
