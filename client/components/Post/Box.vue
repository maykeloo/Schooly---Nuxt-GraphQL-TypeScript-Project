<script lang="ts" setup>
import { Category } from "~~/types/Category";
import { User } from "~~/types/User";
import { Comment } from "~/types/Comment";
import {COMMENT_CREATE} from "~/api/mutations";
import {GET_POST} from "~/api/queries";
import {useMutation} from "@vue/apollo-composable";
import {computed, ref} from "vue";
import timeSince from "../../utils/timeSince";
import getToken from "~/utils/getToken";

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
  comment?: Comment[]
  categories?: Category[];
}>();

const capitalizeFirstLetter = (string: Category["name"]) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
const content = ref<string>('');
const {mutate: addComment, loading, error} = useMutation(COMMENT_CREATE)

const token = await getToken()

const addC = async () => {
  await addComment({
    comment: {
      content: content.value,
      userId: token.userId,
      postId: props.id
    }
  },
  {
    refetchQueries: [
      {
        query: GET_POST,
        variables: {
          postId: props.id
        }
      }
    ]
  })
  content.value = "";
}
const toManyComments = ref<boolean>(true)
const commentsList = computed(() => {
  const list = [];
  const VISIBLE_LIST_LENGTH = 3
  if(props.comment.length > VISIBLE_LIST_LENGTH) {
    toManyComments.value = true
    for(let i = 0; i < VISIBLE_LIST_LENGTH; i++) {
      list.push(props.comment[i])
    }
  }
  return list
})

</script>

<template>
    <p class="loader" v-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
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
      </div>
      <div class="post-bottom">
        <div>
          <span class="post-title">{{ props.title }}</span>
          <p class="post-content">{{ props.content }}</p>
        </div>
      </div>
      <div class="buttons-wrapper" v-if="props.isMyProfile">
        <button @click="$emit('publish')">
          <span>
            <img :class="{published: published}" src="@/assets/icons/icon-publish.svg" alt="">
            <span>{{ published ? "Unpublish" : "Publish" }}</span>
          </span>
        </button>
        <button>
          <span @click="$emit('delete')"><img src="@/assets/icons/icon-delete.svg" alt=""><span>Delete</span></span>
        </button>
      </div>
      <div class="categories-on-post-wrapper">
        <a class="category-on-post" :href="`/category/${category.category.name.toLowerCase()}`" v-for="category in categories">
          <span>{{ capitalizeFirstLetter(category.category.name) }}</span>
        </a>
      </div>
      <div class="comments-wrapper">
        <div class="comments-add-comment-wrapper">
          <img class="own-avatar" src="@/assets/icons/icon-avatar.png" alt="">
          <textarea placeholder="comment..." v-model="content"/>
          <button @click.prevent="addC"><img src="@/assets/icons/icon-add-post.svg" alt=""></button>
        </div>
        <div class="comment" v-for="com in toManyComments ? commentsList : props.comment">
          <div class="comment-top">
            <a :href="`/profile/${com.user?.id}`">
              <img class="commenter-avatar" src="@/assets/icons/icon-avatar.png" alt="">
              <span class="commenter-name">{{ com.user?.name }}</span>
            </a>
            <span>&middot;</span>
            <span class="createdAt">{{ timeSince(com.createdAt) }} ago</span>
          </div>
          <p class="comment-content">{{ com.content }}</p>
        </div>
        <p v-if="props.comment.length > 3" class="show" :class="{less: !toManyComments}" @click="toManyComments = !toManyComments">
          {{ toManyComments ? 'Show more...' : 'Show less...' }}
        </p>
      </div>
    </div>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  left: 2rem;
  bottom: 2rem;

  img {
    width: 3rem;
  }
}
.post {
  display: flex;
  flex-direction: column;
  padding: 2rem;
  width: 100%;
  gap: 1.5rem;
  background: #edf6f9;

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

  .post-bottom {
    display: flex;
    justify-content: space-between;
    .post-title {
      font-size: 2rem;
      font-weight: 500;
    }
  }

  .categories-on-post-wrapper {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    flex-wrap: wrap;

    .category-on-post {
      background-color: black;
      color: white;
      text-decoration: none;
      border-radius: 50px;
      padding: 0.35rem 1.5rem;
      font-size: 0.8rem;
    }
  }

  .comments-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 0.5rem;

    .show {
      color: blue;
      text-decoration: underline;
      cursor: pointer;

      &.less {
        position: fixed;
        left: calc(25vw + 3.5rem);
        bottom: 1rem;
      }
    }

    .comment {
      padding: 1rem;
      border: 1px solid #dbdbdb;
      border-radius: 3px;
      background: white;
      .commenter-avatar {
        width: 2rem;
      }

      .commenter-name {
        font-weight: 500;
      }

      .createdAt {
        color: #8d99ae;
      }

      .comment-top {
        display: flex;
        align-items: center;
        gap: 1rem;

        a {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-decoration: none;
          color: black;
        }
      }

      .comment-content {
        margin-top: 1rem;
        padding-left: 3rem;
      }
    }

    .comments-add-comment-wrapper {
      display: flex;
      align-items: flex-start;

      .own-avatar {
        width: 2.5rem;
        margin-right: 1rem;
        object-fit: contain;
      }

      textarea {
        flex-grow: 1;
        padding: 1rem;
        border: 0;
        outline: none;
        max-height: 300px;
      }

      button {
        border: 0;
        background: transparent;
        outline: none;
        cursor: pointer;
        margin-left: 1rem;

        > img {
          width: 2rem;
        }
      }
    }
  }
}

.post.published {
  background: #cccccc1f;
}

.post-content {
  margin-top: 2rem;
}
</style>