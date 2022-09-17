<script setup lang="ts">
import { useQuery } from "@vue/apollo-composable";
import getToken from "~~/utils/getToken";
import { GET_POSTS, GET_PROFILE_DETAILS } from "~/api/queries";
import { JWT } from '@/utils/getToken'
import {definePageMeta} from "#imports";

definePageMeta({
  middleware: "auth",
});
const { result: postResult, loading, error } = useQuery(GET_POSTS);
const userInfo = ref<JWT>()

if(process.client) {
  userInfo.value = await getToken()
}
const { result: profileResult } = useQuery(GET_PROFILE_DETAILS, {
  userId: userInfo?.value?.userId,
}); 


</script>

<template>
  <NuxtLayout name="threeview">
    <template #main>
      <div v-if="profileResult?.profile?.isMyProfile">
        <PostAddModal />
      </div>
      <PostList :result="postResult?.posts" :loading="loading" :error="error"></PostList>
    </template>
  </NuxtLayout>
</template>

<style scoped lang="scss"></style>