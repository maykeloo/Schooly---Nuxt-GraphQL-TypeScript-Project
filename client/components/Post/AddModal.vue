<script lang="ts" setup>
import Modal from "../Modal.vue";
import { ref } from "vue";
import { useMutation } from "@vue/apollo-composable";
import { POST_CREATE } from "../../api/mutations";
import { GET_PROFILE } from "../../api/queries";
import { useRoute } from "vue-router";

interface PostVariables {
  title: string;
  content: string;
}

const route = useRoute();
const { params } = route;

const content = ref<string>("");
const title = ref<string>("");

const show = ref<boolean>(false);
const handleShow = () => (show.value = true);
const handleClose = () => (show.value = false);

const { mutate: postCreate } = useMutation(POST_CREATE, () => ({
  variables: {
    post: {
      title: title.value,
      content: content.value,
    } as PostVariables,
  },
  refetchQueries: [
    {
      query: GET_PROFILE,
      variables: {
        userId: params.id,
      },
    }
  ]
}));

</script>

<template>
  <button @click="handleShow">Add Post</button>
  <modal v-if="show">
    <template #body>
      <div class="form">
        <form type="form" id="registration-example">
          <h1>Add post</h1>
          <hr />
          <input type="text" name="name" placeholder="Jane Doe" validation="required" v-model="title" />
          <input type="text" name="email" validation="required|email" v-model="content" />
          <div class="buttons-wrapper">
            <button @click.prevent="postCreate()" type="submit">Add post</button>
            <button @click="handleClose">close</button>
          </div>
        </form>
      </div>
    </template>
  </modal>
</template>

<style scoped>
.form:deep(.formkit-form) {
  margin-top: 2rem;
}

.buttons-wrapper {
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
}

.buttons-wrapper button {
  padding: 0.5rem;
}

.buttons-wrapper:deep(button) {
  padding: 0.5rem;
}
</style>
