<script setup lang="ts">
import { useRoute, RouteLocationNormalizedLoaded } from "vue-router";
import { useQuery, UseQueryReturn } from "@vue/apollo-composable";
import { PUBLISH_POST, DELETE_POST } from "~/api/mutations";
import { GET_PROFILE } from "~/api/queries";
import { useMutation } from "@vue/apollo-composable";
import { provide } from 'vue'

const { params }: RouteLocationNormalizedLoaded = useRoute();
const { result, loading, error, onResult }: UseQueryReturn<any, { userId: string | string[]; }> = await useQuery(GET_PROFILE, {
  userId: params.id,
});

const { mutate: postPublish, loading: loadingPublish } = useMutation(PUBLISH_POST);
const { mutate: postDelete, loading: loadingDelete } = useMutation(DELETE_POST)

const publishP = async (id: number) => {
  await postPublish({
    postId: id
    }, {
    refetchQueries: [
      {
        query: GET_PROFILE,
        variables: {
          userId: params.id,
        },
      },
    ],
  })
}
const deleteP = async (id: number) => {
  await postDelete({
    postId: id
    }, {
    refetchQueries: [
      {
        query: GET_PROFILE,
        variables: {
          userId: params.id,
        },
      },
    ],
  })
}

const createdAt = ref<string>("");
onResult((result) => {
  createdAt.value = new Date(new Date((+result.data.profile.user.createdAt))).toLocaleDateString("en-US")
})

provide('loadingPublish', loadingPublish)
provide('loadingDelete', loadingDelete)

</script>

<template>
  <div v-if="result">
    <div>
      <div>
        <NuxtLayout name="threeview">
          <template #main>
            <div class="user-info">
              <div>
                <div>
                  <img class="user-info-image" src="@/assets/icons/icon-avatar.png" alt="" />
                </div>
                <div class="user-info-details">
                  <p class="name">{{ result.profile.user.name }}</p>
                  <p class="bio">{{ result.profile.bio }}</p>
                  <div class="user-info-details-extra">
                    <p class="paragraph-with-icon email"><img class="icon" src="@/assets/icons/icon-mail.svg" alt=""> {{ result.profile.user.email }}</p>
                    <p class="paragraph-with-icon date"><img class="icon" src="@/assets/icons/icon-calendar.svg" alt=""> Joined {{ createdAt }}</p>
                    <p class="paragraph-with-icon posts"><img class="icon" src="@/assets/icons/icon-forum.svg" alt=""> Posts {{ result?.profile?.user?.posts.length }}</p>
                  </div>
                </div>
              </div>
              <div class="profile-wrapper">
                <div v-if="result.profile.isMyProfile">
                  <PostAddModal />
                </div>
              </div>
            </div>
            <PostList 
              @publish="publishP"
              @delete="deleteP"
              :result="result.profile.user.posts"
              :user="result.profile.user"
              :id="result.profile.user.id"
              :error="error" 
              :loading="loading" 
              :isMyProfile="result.profile.isMyProfile"
            />
          </template>
        </NuxtLayout>
      </div>
    </div>
  </div>
  <p v-else-if="loading"><img src="@/assets/icons/loader.svg" alt=""></p>
  <p v-else-if="error">Profile not found.</p>
</template>

<style scoped lang="scss">

  .user-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3rem;
    .user-info-image {
      width: 10rem;
    }
  }

.user-info-details {
  display: flex;
  flex-direction: column;

  &-extra {
    margin-top: 1rem;
  }

  .paragraph-with-icon {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    margin-top: 0.25rem;
    .icon {
      width: 1rem;
    }
  }
  .name {
    font-size: 2rem;
    font-weight: 500;
  }

  .bio {
    color: #ccc;
  }
}
.profile-wrapper {
  display: flex;
  align-items: flex-end;
}
</style>
