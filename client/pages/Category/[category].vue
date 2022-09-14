
<script setup lang="ts">
      import { useRoute } from 'vue-router';
      import { useQuery } from "@vue/apollo-composable";
      import { GET_POSTS_WITH_CATEGORY } from '@/api/queries'
      
      const route = useRoute();
      const { params } = route;
      
      const { result, error, loading } = useQuery(GET_POSTS_WITH_CATEGORY, {
            category: params.category,
      });
</script>

<template>
  <div>
      <PostList :result="result?.postWithCategory" :loading="loading" :error="error"></PostList>
  </div>
</template>

<style scoped lang="scss">

</style>