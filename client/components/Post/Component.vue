<script lang="ts" setup>
import { useMutation } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { PUBLISH_POST } from "../../api/mutations";
import { GET_PROFILE } from "../../api/queries";
import timeSince from '../../utils/timeSince'

const { params } = useRoute();

const props = defineProps<{
  title: string;
  content: string;
  user?: string;
  id: string | number;
  createdAt: string;
  published?: boolean;
  isMyProfile?: boolean;
}>();

const { mutate: postPublish, loading } = useMutation(PUBLISH_POST, {
  variables: {
    postId: props.id,
  },
  refetchQueries: [
    {
      query: GET_PROFILE,
      variables: {
        userId: params.id,
      },
    },
  ],
});
</script>

<template>
  <div class="post" :class="{ published: props.published }">
    <div class="post-top">
      <div class="post-top-info">
        <a :href="`/profile/${props.id}`" class="user">
          <img src="@/assets/icons/icon-avatar.png" alt="">
          <span class="post-author">{{props.user}}</span>
        </a>
        <span>&middot;</span>
        <span class="time-since"> {{ timeSince(Number(props.createdAt))}} ago</span>
      </div>
    </div>
    <div class="post-bottom">
      <span class="post-title">{{ props.title }}</span>
      <button v-if="props.isMyProfile" @click="postPublish()">{{ props.published ? "Unpublish" : "Publish" }}</button>
      <p class="post-content">{{ props.content }}</p>
    </div>
    <p v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
  </div>
</template>

<style scoped lang="scss">
.post {
  background: #cccccc1f;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  border-radius: 0.5rem;
  gap: 1.5rem;
  .post-top {
    display: flex;
    justify-content: space-between;
    .post-top-info {
      display: flex;
      gap: 1rem;
      align-items: center;
    
      .user {
        display: flex;
        align-items: center;
        gap: 1rem;
        text-decoration: none;
        color: black;
      }
    
      img {
        width: 3rem;
        object-fit: contain;
      }
      
      .post-author {
        font-weight: 500;
      }
      
      .time-since {
        color: rgb(182, 182, 182);
        font-weight: 300;
      }
    }
  }

  .post-bottom {
    .post-title {
      font-size: 2rem;
      font-weight: 500
    }
  }
}

.post.published {
  background: aquamarine;
}




.post-content {
  margin-top: 2rem;
}
</style>
