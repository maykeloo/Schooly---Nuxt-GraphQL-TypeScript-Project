<script setup lang="ts">
import { ApolloError } from '@apollo/client/errors';
import { Post, User } from '~~/types/User';

interface ListProps {
  result: Post[],
  loading: boolean,
  error: ApolloError,
  isMyProfile?: boolean
  user?: User
}
const props = defineProps<ListProps>()
const loadingDelete = inject<boolean>('loadingDelete')
const loadingPublish = inject<boolean>('loadingPublish')
</script>

<template>
  <p v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
  <div v-else-if="!error && !loading" class="post-wrapper">
    <p class="list-loader" v-if="loadingPublish || loadingDelete"><img src="@/assets/icons/loader.svg" alt=""></p>
    <PostBox 
      v-for="(post, index) in props.result"
      @publish="$emit('publish', post.id)"
      @delete="$emit('delete', post.id)"
      :user="post.user" 
      :key="index"
      :id="post.id" 
      :index="index"
      :title="post.title" 
      :createdAt="post.createdAt"
      :published="post.published"
      :isMyProfile="props.isMyProfile"
      :categories="post.categories"
      :content="post.content" />
  </div>
</template>
  
  
<style scoped lang="scss"> 
  .list-loader {
    display: flex;
    margin: 1rem 0;
    justify-content: center;
    position: fixed;
    left: 2rem;
    bottom: 2rem;

    img {
      width: 5rem;
    }
  }
  .post-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-bottom: 2rem;
  }
  
  </style>