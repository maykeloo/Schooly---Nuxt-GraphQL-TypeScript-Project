<script lang="ts" setup>
import { Category } from "~~/types/Category";
import { User } from "~~/types/User";
import timeSince from "../../utils/timeSince";

defineEmits<{
  (e: 'delete', id: number): void
  (e: 'publish', id: string): void
}>()

const props = defineProps<{
  title: string;
  content: string;
  user?: User;
  id: string | number;
  createdAt: string;
  published?: boolean;
  index?: number;
  isMyProfile?: boolean;
  categories?: Category[];
}>();
</script>

<template>
    <div class="post" :class="{ published: props.published && isMyProfile }">
      <div class="post-top" v-if="user">
        <div class="post-top-info">
          <a :href="`/profile/${props.user?.id}`" class="user">
            <img src="@/assets/icons/icon-avatar.png" alt="" />
            <span class="post-author">{{ props.user?.name }}</span>
          </a>
          <span>&middot;</span>
          <span class="time-since">{{ timeSince(Number(props.createdAt)) }} ago</span>
        </div>
        <div class="categories-on-post-wrapper">
          <a class="category-on-post" :href="`/category/${category.category.name.toLowerCase()}`" v-for="category in categories">
            <span>{{ category.category.name }}</span>
          </a>
        </div>
      </div>
      <div class="post-bottom">
        <div>
          <span class="post-title">{{ props.title }}</span>
          <p class="post-content">{{ props.content }}</p>
        </div>
        <div class="buttons-wrapper" v-if="props.isMyProfile">
          <button @click="$emit('publish')">
            <span><img :class="{published: published}" src="@/assets/icons/icon-publish.svg" alt=""><span>{{ published ? "Unpublish" : "Publish" }}</span></span>
          </button>
          <button>
            <span @click="$emit('delete')"><img src="@/assets/icons/icon-delete.svg" alt=""><span>Delete</span></span>
          </button>
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">
.post {
  background: #cccccc1f;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
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
    display: flex;
    justify-content: space-between;
    .post-title {
      font-size: 2rem;
      font-weight: 500;
    }

    .buttons-wrapper {
      display: flex;
      gap: 0.5rem;

      button {
        height: fit-content;
        outline: none;
        border: 0;
        background: transparent;
        cursor: pointer;
      }
      span {
        display: flex;
        align-items: center;
        gap: 0.25rem;
      }

      img {
        width: 1rem;

        &.published {
          transform: rotate(180deg);
        }
      }
    }
  }

  .categories-on-post-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;

    .category-on-post {
      background-color: black;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      padding: 0.35rem 1.5rem;
      font-size: 0.8rem;
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