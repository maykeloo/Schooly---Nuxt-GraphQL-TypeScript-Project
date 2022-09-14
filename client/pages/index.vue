<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import { GET_POSTS } from "../api/queries";

definePageMeta({
  middleware: "auth",
});
const { result, loading, error } = useQuery(GET_POSTS);
</script>

<template>
  <NuxtLayout name="threeview">
    <template #main>
      <PostList :result="result?.posts" :loading="loading" :error="error"></PostList>
    </template>
  </NuxtLayout>
</template>

<style scoped lang="scss"></style>