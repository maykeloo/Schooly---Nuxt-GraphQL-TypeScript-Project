<script lang="ts" setup>
import { ApolloError } from "@apollo/client/core";
import { Comment } from "~~/types/Comment";
import timeSince from "~~/utils/timeSince";

type Data = {
  result: Comment[];
  error: ApolloError;
  loading: boolean;
};

const props = defineProps<Data>();
const route = useRoute();

const boldText = (comment) => {
  return comment.replace(
    route.params.value,
    `<span class="bolder">${route.params.value}</span>`
  );
};
</script>

<template>
  <div>
    <div v-if="result.length" class="comment-wrapper">
      <template v-for="comment in props.result">
        <div class="comment">
          <div class="post-mask">
            <div class="post">
              <div class="top">
                <div class="avatar"></div>
                <div class="row row-long"></div>
                <div class="row row-short"></div>
                <div class="row row-long"></div>
                <a :href="`/post/${comment.postId}`" class="button">Go to post</a>
              </div>
            </div>
          </div>
          <div class="comment-details">
            <a :href="`/profile/${comment.userId}`" class="top">
              <img src="@/assets/icons/icon-avatar.png" alt="" />
              <span class="data">
                <span class="data-top">
                  <span class="name">{{ comment.user.name }}</span>
                  <span>&middot;</span>
                  <span class="date"
                    >Created {{ timeSince(+comment.createdAt) }} ago</span
                  >
                </span>
                <span class="email">{{ comment.user.email }}</span>
              </span>
           
            </a>
            <p class="content" v-html="boldText(comment.content)"></p>
          </div>
        </div>
      </template>
    </div>
    <SearchError v-else :notfound="'Comment'" />
    <p v-if="loading" class="loader">
      <img src="@/assets/icons/loader.svg" alt="" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.post-mask {
  .post {
    .top {
      display: flex;
      gap: 1rem;
      align-items: center;
      height: 2rem;

      .button {
        background: black;
        color: white;
        border: 1px solid black;
        padding: 0.5rem 2rem;
        max-height: 2rem;
        display: flex;
        align-items: center;
        cursor: pointer;

        &:hover {
          background: white;
          color: black;
        }
      }
      .avatar {
        border-radius: 50%;
        background: rgb(123, 123, 123);
        width: 3rem;
        height: 3rem;
      }

      .row {
        display: block;
        height: 100%;
        background: rgb(123, 123, 123);

        &-long {
          width: 10rem;
        }

        &-short {
          width: 3rem;
        }
      }
    }
  }
}
.comment-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  a {
    text-decoration: none;
    color: black;
  }

  .comment {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    background-color: #dedede;
    padding: 2rem;
    text-decoration: none;
    color: black;
    align-items: flex-start;
    margin-top: 2rem;

    img {
      object-fit: contain;
    }

    .comment-details {
      display: flex;
      background: #edf6f9;
      flex-direction: column;
      padding: 2rem;
      width: 100%;

      .top {
        display: flex;
        gap: 1rem;
        align-items: flex-start;

        .data {
          display: flex;
          flex-direction: column;
          gap: 3px;

          &-top {
            display: flex;
            gap: 1rem;
            align-items: center;
          }
        }

        img {
          width: 4rem;
        }
      }

      .name {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .date {
        color: #ccc;
        font-weight: 300;
      }

      .content {
        margin-top: 1rem;
        margin-left: 5rem;

        &:deep(.bolder) {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
