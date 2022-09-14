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
  profile.value = result.data.profile;
});
</script>

<template>
  <div class="sidebar-wrapper">
    <div class="header">
      <a href="/">
        <h2>LOGO</h2>
      </a>
    </div>
    <a :href="`/profile/${userId}`">
      <div class="user-info">
        <div>
          <img src="@/assets/icons/icon-avatar.png" alt="" />
        </div>
        <div>
          <p class="name">{{ profile?.user.name }}</p>
          <p class="email">{{ profile?.user.email }}</p>
          <p class="bio">{{ profile?.bio }}</p>
        </div>
      </div>
    </a>
    <div class="nav-wrapper">
      <nav>
        <NavList/>
      </nav>
    </div>
  </div>
</template>
1
<style scoped lang="scss">
.sidebar-wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 4rem 2rem 2rem 4rem;

  a {
    color: black;
    text-decoration: none;
  }

  .header {
    margin-bottom: 2rem;
  }

  .user-info {
    display: flex;
    gap: 1rem;
    align-items: center;
    .name {
      font-size: 1.5rem;
      margin-bottom: 0.15rem;
      font-weight: 500;
    }

    .bio {
      color: #ccc;
      margin-top: 0.5rem;
      font-weight: 300;
    }

    .email {
      font-size: 0.9rem;
    }
  }

  .nav-wrapper {
    margin-top: 3rem;

    &:deep(ul) {
      list-style-type: none;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;

      li {
        display: flex;
        align-items: center;
        gap: 2rem;
        padding: 1rem;
        border-radius: 0.5rem;
        font-size: 1.2rem;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background: rgba(204, 204, 204, 0.473);
        }

        img {
          height: 1.5rem;
        }
      }
    }
  }
}
</style>
