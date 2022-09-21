<script setup lang="ts">
import { useQuery, useSubscription } from "@vue/apollo-composable";
import getToken from "~~/utils/getToken";
import { GET_POSTS } from "~/api/queries";
import { COMMENTS_SUBSCRIPTION } from "~~/api/subscriptions";
import { JWT } from '@/utils/getToken'
import {definePageMeta} from "#imports";
import {ref} from "vue";
import PageLabel from "~/components/Nav/PageLabel.vue";

definePageMeta({
  middleware: "auth",
});
const { result: postResult, loading, error } = useQuery(GET_POSTS);
const userInfo = ref<JWT>()

if(process.client) {
  userInfo.value = await getToken()
}

</script>

<template>
  <NuxtLayout name="threeview">
    <template #main>
      <PageLabel :page-name="'Home'"></PageLabel>
      <PostAddLabel></PostAddLabel>
      <PostList :result="postResult?.posts" :loading="loading" :error="error"></PostList>
    </template>
  </NuxtLayout>
</template>

<style scoped lang="scss"></style>