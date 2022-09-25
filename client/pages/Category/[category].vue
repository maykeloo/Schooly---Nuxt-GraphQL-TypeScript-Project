<script setup lang="ts">
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GET_POSTS_WITH_CATEGORY } from "@/api/queries";

const route = useRoute();
const { params }: RouteLocationNormalizedLoaded = route;

const { result, error, loading } = useQuery(GET_POSTS_WITH_CATEGORY, {
  category: params.category,
});
</script>

<template>
  <div>
    <NuxtLayout name="threeview">
      <template #main>
        <h1 class="category-name">#{{ params.category }}</h1>
        <PostList
          :result="result?.postWithCategory"
          :loading="loading"
          :error="error"
        ></PostList>
      </template>
    </NuxtLayout>
  </div>
</template>

<style scoped lang="scss">
.category-name {
  margin-bottom: 2rem;
}
</style>
