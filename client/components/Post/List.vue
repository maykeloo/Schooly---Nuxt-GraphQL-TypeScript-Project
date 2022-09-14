<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { GET_POSTS } from '../../api/queries'

const { result, loading, error } = useQuery(GET_POSTS);

</script>

<template>
  <p v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
  <div v-else-if="!error && !loading" class="post-wrapper">
    <PostComponent 
      v-for="post in result?.posts"
      :user="post.user.name" 
      :id="post.user.id" 
      :title="post.title" 
      :createdAt="post.createdAt"
      :categories="post.categories"
      :content="post.content" />
  </div>
</template>
  
  
<style scoped> 
  .post-wrapper {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-bottom: 2rem;
  }
  
  </style>