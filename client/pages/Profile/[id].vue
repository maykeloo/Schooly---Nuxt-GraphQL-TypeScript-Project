<script setup lang="ts">
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { GET_PROFILE } from "../../api/queries";

const { params } = useRoute();

const { result, loading, error } = useQuery(GET_PROFILE, {
  userId: params.id,
});
</script>

<template>
  <div v-if="!error">
    <p v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
    <div v-else-if="!error && !loading">
      <div class="profile-wrapper">
        <div>
          <h1>{{ result?.profile?.user?.name }}</h1>
          <p>{{ result?.profile.bio }}</p>
        </div>
        <div v-if="result?.profile.isMyProfile">
          <PostAddModal />
        </div>
      </div>
      <div>
        <PostComponent
          :title="post.title"
          :createdAt="post.createdAt"
          :content="post.content"
          :published="post.published"
          :id="post.id"
          :isMyProfile="result?.profile.isMyProfile"
          v-for="post in result?.profile?.user?.posts"
        />
      </div>
    </div>
  </div>
  <div v-else>Profile does not exist.</div>
</template>

<style scoped>
.profile-wrapper {
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
