<script lang="ts" setup>
import getToken from "../../utils/getToken";
import { ref } from "vue";
import { GET_PROFILE_DETAILS } from "~~/api/queries";
import { useQuery } from "@vue/apollo-composable";
import { ProfileDetails } from "~~/types/User";

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
    <li>
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
    <li class="post">
      <img src="@/assets/icons/icon-add-post.svg" alt="" />
      <span>Add Post</span>
    </li>
    <span @click="logOut" class="logout"><span>Logout</span><img src="@/assets/icons/icon-logout.svg" alt=""></span>
  </ul>
</template>

<style lang="scss" scoped>

  img {
    width: 1.5rem;
    object-fit: contain;
  }

  .logout {
    display: flex;
    justify-content: center;
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