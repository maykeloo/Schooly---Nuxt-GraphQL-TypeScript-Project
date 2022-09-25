<script lang="ts" setup>
import { byCategory, byComment, byPost, byUser } from "~~/utils/searchBy";
import { Ref } from "vue";
import { ApolloError } from "@apollo/client/core";
import { Post, User } from "~~/types/User";
import { Comment } from '~~/types/Comment'

type Data = {
  result: Ref<Post[] | User[] | Comment[]>;
  error: Ref<ApolloError>;
  loading: Ref<boolean>;
};

enum SearchBy {
  CATEGORY = "category",
  USER = "user",
  COMMENT = "comment",
  POST = 'post'
}

const route = useRoute();

const getData = (): Data => {
  switch (route.params.type) {
    case SearchBy.CATEGORY:
      return byCategory(route);
    case SearchBy.USER:
      return byUser(route);
    case SearchBy.COMMENT:
      return byComment(route);
    case SearchBy.POST:
      return byPost(route);
  }
};

const { error, loading, result } = await getData();
</script>

<template>
  <div>
    <NuxtLayout name="threeview">
      <template #main>
       <div v-if="result">
          <p class="search-info">
            <span>Looking for </span>
            <span class="searched-value">{{ route.params.value }}</span>
            <span>...</span>
          </p>
          <SearchCategory  
            v-if="route.params.type === SearchBy.CATEGORY" 
            :result="result['postWithCategory']" 
            :error="error" 
            :loading="loading"
          />
          <SearchUser
            v-if="route.params.type === SearchBy.USER" 
            :result="result['profileByName']" 
            :error="error" 
            :loading="loading"
          />
          <SearchComment
            v-if="route.params.type === SearchBy.COMMENT" 
            :result="result['comments']" 
            :error="error" 
            :loading="loading"
          />
          <SearchPost
            v-if="route.params.type === SearchBy.POST" 
            :result="result['postsByContent']" 
            :error="error" 
            :loading="loading"
          />
       </div>
      </template>
    </NuxtLayout>
  </div>
</template>

<style lang="scss" scoped>
.searched {
  font-weight: 700;
  text-transform: uppercase;
}

.loader {
  display: flex;
  justify-content: center;
  margin: 1rem 0;

  img {
    width: 3rem;
  }
}

.search-info {
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 1rem;
}

.searched-value {
  text-decoration: underline;
  text-transform: uppercase;
  font-weight: 900;
  font-size: 2rem;
}
</style>
