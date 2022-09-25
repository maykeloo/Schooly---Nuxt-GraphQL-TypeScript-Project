import { useQuery } from "@vue/apollo-composable";
import { GET_POSTS_WITH_CATEGORY, GET_PROFILE_BY_NAME, GET_COMMENTS_BY_CONTENT, GET_POSTS_BY_CONTENT_TITLE } from "~~/api/queries";
import { RouteLocationNormalizedLoaded } from "vue-router";
import { Ref } from "vue";
import { ApolloError } from "@apollo/client/core";
import { Post, User } from "~~/types/User";
import { Comment } from '~~/types/Comment'

type Data = {
  result: Ref<Post[] | User[] | Comment[]>;
  error: Ref<ApolloError>;
  loading: Ref<boolean>;
};

const byCategory = (route: RouteLocationNormalizedLoaded): Data => {
  const { result, error, loading } = useQuery(GET_POSTS_WITH_CATEGORY, {
    category: route.params.value,
  });

  return {
    result,
    error,
    loading,
  };
};

const byUser = (route: RouteLocationNormalizedLoaded): Data => {
  const { result, error, loading } = useQuery(GET_PROFILE_BY_NAME, {
    name: route.params.value,
  });

  return {
    result,
    error,
    loading,
  };
};

const byComment = (route: RouteLocationNormalizedLoaded): Data => {
  const { result, error, loading } = useQuery(GET_COMMENTS_BY_CONTENT, {
    text: route.params.value,
  });

  return {
    result,
    error,
    loading,
  };
};

const byPost = (route: RouteLocationNormalizedLoaded): Data => {
  const { result, error, loading } = useQuery(GET_POSTS_BY_CONTENT_TITLE, {
    text: route.params.value,
  });

  return {
    result,
    error,
    loading,
  };
};

export { byCategory, byUser, byComment, byPost };
