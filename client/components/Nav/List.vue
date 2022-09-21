<script lang="ts" setup>
import getToken from "../../utils/getToken";
import { ref } from "vue";
import { GET_PROFILE_DETAILS } from "~~/api/queries";
import { useQuery } from "@vue/apollo-composable";
import { ProfileDetails } from "~~/types/User";

defineEmits<{
  (e: 'search'): void
}>()

const userId = ref<string>("");
const profile = ref<ProfileDetails | null>(null);

onBeforeMount(async () => {
  userId.value = (await getToken()).userId;
});
const { onResult } = useQuery(GET_PROFILE_DETAILS, {
  userId: userId,
});
onResult((result) => {
  profile.value = result.data?.profile;
});


const logOut = () => {
  localStorage.removeItem('token');
  window.location.href = "/signin";
}

</script>

<template>
  <ul>
    <li @click="$emit('search')">
      <img src="@/assets/icons/icon-search.svg" alt="" />
      <span>Search</span>
    </li>
    <a href="/">
      <li>
        <img src="@/assets/icons/icon-home.png" alt="" />
        <span>Home</span>
      </li>
    </a>  
    <li>
      <img src="@/assets/icons/icon-thunder.png" alt="" />
      <span>Explore</span>
    </li>
    <li>
      <img src="@/assets/icons/icon-bell.png" alt="" />
      <span>Notifications</span>
    </li>
    <a :href="`/profile/${userId}`">
      <li>
        <img src="@/assets/icons/icon-profile.svg" alt="" />
        <span>Profile</span>
      </li>
    </a>
    <li>
      <img src="@/assets/icons/icon-settings.png" alt="" />
      <span>Settings</span>
    </li>
    <li @click="logOut()">
      <img src="@/assets/icons/icon-logout.svg" alt="">
      <span>Log out</span>
    </li>
  </ul>
</template>

<style lang="scss" scoped>

  img {
    width: 1.5rem;
    object-fit: contain;
  }

  .logout {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 1rem;
    text-decoration: underline;
    cursor: pointer;
  }
  .post {
    background: black;
    border: 1px solid black;
    color: white;

    &:hover {
      color: black;
      background: white;
    }
  }
</style>