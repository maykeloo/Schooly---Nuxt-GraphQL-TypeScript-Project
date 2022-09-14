<script setup lang="ts">
import { ApolloError } from '@apollo/client/errors';
import { Post } from '~~/types/User';

const props = defineProps<{
  result: Post[],
  loading: boolean,
  error: ApolloError
}>()

</script>

<template>
  <p v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
  <div v-else-if="!error && !loading" class="post-wrapper">
    <PostComponent 
      v-for="post in props.result"
      :user="post.user?.name" 
      :id="post.user?.id" 
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