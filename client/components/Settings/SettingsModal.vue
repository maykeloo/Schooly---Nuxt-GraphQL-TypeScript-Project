<script setup lang="ts">
import { editName, editEmail, editPassword } from "../../utils/editUser";

const props = defineProps<{
  type: string;
}>();

const emit = defineEmits(["close"]);

enum EditTypes {
  NAME = "Name",
  MAIL = "Email",
  PASSWORD = "Password",
  POSTS = "Posts",
}

const input = ref<string>("");
const inputError = ref<boolean>(false);

const editHandler = async () => {
  switch (props.type) {
    case EditTypes.NAME:
      return editName;
    case EditTypes.MAIL:
      return editEmail;
    case EditTypes.PASSWORD:
      return editPassword;
  }
};

const res = await editHandler()
const { mutate, error, loading, onDone } = await res()

const sendData = async () => {
  mutate({ newValue: input.value, userErrors: [{}] })
}
onDone((response) => {
  if (!response?.data[`edit${props.type}`].userErrors[0].message && !error.value) {
    emit("close");
    inputError.value = false;
  } else {
    inputError.value = true;
  }
});
</script>

<template>
  <div v-if="props.type !== EditTypes.POSTS">
    <div @click="emit('close')" class="modal-background"></div>
    <div class="modal-content">
      <img
        @click="emit('close')"
        class="close-button"
        src="@/assets/icons/icon-close.svg"
        alt=""
      />
      <p>{{ props.type.toUpperCase() }}</p>
      <input type="text" v-model="input" />
      <button @click="sendData">Edit</button>
      <p class="error" v-if="inputError">Invalid value.</p>
      <div v-if="loading" class="loader-wrapper">
        <img class="loader" src="@/assets/icons/loader.svg" alt="" />
      </div>
    </div>
  </div>

  <div v-else></div>
</template>

<style lang="scss">
.modal-background {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
}

.loader-wrapper {
  width: 100%;
  display: flex;
  margin: 1rem 0;
  justify-content: center;
  .loader {
    width: 2rem;
  }
}

.close-button {
  position: absolute;
  right: 1rem;
  top: 1rem;
  width: 1rem;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 0.5rem;
}

.modal-content {
  padding: 1rem;
  background: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  display: flex;
  flex-direction: column;

  p {
    margin-bottom: 1rem;
  }

  input {
    border: 1px solid black;
    border-radius: 0;
    padding: 0.5rem;
    outline: none;
  }

  button {
    height: 100%;
  }
}
</style>
