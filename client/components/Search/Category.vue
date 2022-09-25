<script lang="ts" setup>
import { ApolloError } from "@apollo/client/core";
import { Post } from "~~/types/User";

type Data = {
  result: Post[];
  error: ApolloError;
  loading: boolean;
};

const props = defineProps<Data>();
</script>

<template>
  <div>
    <PostList
      v-if="result.length"
      :result="props.result"
      :loading="props.loading"
      :error="props.error"
    ></PostList>
    <SearchError v-else :notfound="'Category'"/>
    <p v-if="loading" class="loader">
      <img src="@/assets/icons/loader.svg" alt="" />
    </p>
  </div>
</template>
