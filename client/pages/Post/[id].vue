<script setup lang="ts">
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import { GET_POST } from "~/api/queries";

const { params }: RouteLocationNormalizedLoaded = useRoute();
const { result, loading, error, onResult}: UseQueryReturn<any, { postId: string | string[] }> = await useQuery(GET_POST,
  {
    postId: params.id,
  }
);
</script>

<template>
  <div v-if="result">
    <div>
      <div>
        <NuxtLayout name="threeview">
          <template #main>
            <PostBox 
              v-for="(post, index) in result"
                  :user="post.user"
                  :key="index"
                  :id="post.id" 
                  :index="index"
                  :title="post.title"
                  :comment="post.comment"
                  :createdAt="post.createdAt"
                  :published="post.published"
                  :categories="post.categories"
                  :content="post.content" 
            />
          </template>
        </NuxtLayout>
      </div>
    </div>
  </div>
  <p v-else-if="loading"><img src="@/assets/icons/loader.svg" alt="" /></p>
  <p v-else-if="error">Profile not found.</p>
</template>

<style scoped lang="scss"></style>
