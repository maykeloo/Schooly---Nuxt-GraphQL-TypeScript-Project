<script lang="ts" setup>
import { ApolloError } from "@apollo/client/core";
import { Profile } from "~~/types/User";
import timeSince from "~~/utils/timeSince";

type Data = {
  result: Profile[];
  error: ApolloError;
  loading: boolean;
};
const props = defineProps<Data>();
</script>

<template>
  <div>
    <div v-if="result.length" class="profile-wrapper">
      <a
        :href="`/profile/${user.id}`"
        class="profile"
        v-for="{ user } in props.result"
      >
        <img src="@/assets/icons/icon-avatar.png" alt="" />
        <div class="profile-details">
          <span class="name">{{ user.name }}</span>
          <span class="email">{{ user.email }}</span>
          <span class="date">Joined {{ timeSince(+user.createdAt) }} ago</span>
        </div>
      </a>
    </div>
    <SearchError v-else :notfound="'User'"/>
    <p v-if="loading" class="loader">
      <img src="@/assets/icons/loader.svg" alt="" />
    </p>
  </div>
</template>

<style lang="scss" scoped>
.profile-wrapper {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .profile {
    display: flex;
    gap: 1.5rem;
    background: #edf6f9;
    padding: 2rem;
    text-decoration: none;
    color: black;
    align-items: flex-start;

    img {
      object-fit: contain;
    }

    .profile-details {
      display: flex;
      flex-direction: column;

      .name {
        font-size: 1.5rem;
        font-weight: 700;
      }

      .email {
        margin-top: 3px;
      }

      .date {
        color: #ccc;
        margin-top: 1rem;
        font-weight: 300;
      }
    }
  }
}
</style>
