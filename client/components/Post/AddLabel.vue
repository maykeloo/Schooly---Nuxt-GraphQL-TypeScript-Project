<script setup lang="ts">
import {ref} from "vue";
import {useMutation} from "@vue/apollo-composable";
import {POST_CREATE} from "~/api/mutations";
import {GET_POSTS, GET_PROFILE} from "~/api/queries";

interface PostVariables {
  title: string;
  content: string;
}

const content = ref<string>("");
const title = ref<string>("");
const category = ref<string>("");
const categories = ref<string[]>([]);
const categoriesError = ref<string>("")
const categoriesLengthError = ref<boolean>(false)

const show = ref<boolean>(false);
const handleClose = (): boolean => (show.value = false);

const { mutate: postCreate, error, loading, onDone } = useMutation(POST_CREATE, () => ({
  variables: {
    post: {
      title: title.value,
      content: content.value,
      categories: categories.value
    } as PostVariables,
  },
  refetchQueries: [
    {
      query: GET_POSTS,
    },
  ],
}));

onDone(() => {
  categoriesError.value = ""
  category.value        = ""
  content.value         = ""
  title.value           = ""
  categories.value      = []
  handleClose()
})

const addCategory = () => {
  const MAX_CATEGORIES = 15
  if(categories.value.length < MAX_CATEGORIES && category.value) {
    categoriesLengthError.value = false
    categoriesError.value = ""
    categories.value = [...categories.value, category.value]
    category.value = ""
  } else if(categories.value.length > MAX_CATEGORIES) {
    categoriesLengthError.value = true
    categoriesError.value = "You can add only 15 categories"
  } else if(!category.value) {
    categoriesLengthError.value = true
    categoriesError.value = "Invalid category text"
  }
}

const deleteCategory = (index) => {
  const categoriesCopy = [...categories.value]
  categoriesCopy.splice(index, 1)
  categories.value = categoriesCopy
}
</script>

<template>
  <div class="form">
    <img class="avatar" src="@/assets/icons/icon-avatar.png" alt="">
    <form type="form" id="registration-example">
      <div class="form-content">
        <input type="text" name="name" placeholder="title" v-model="title" />
        <input type="text" name="category" placeholder="category"  v-model="category" />
        <div class="categories-wrapper">
              <span v-for="(category, index) in categories" class="category">
                <span>{{ category }}</span>
                <span @click="deleteCategory(index)"><img src="@/assets/icons/icon-close.svg" alt=""></span>
            </span>
        </div>
        <span class="categories-error" v-if="categoriesLengthError">{{ categoriesError }}</span>
        <button class="button-add-category" @click.prevent="addCategory()">Add category</button>
        <textarea name="content" placeholder="content" v-model="content" />
        <div class="buttons-wrapper">
          <button class="button-add-post" @click.prevent="postCreate()" type="submit">Add post</button>
        </div>
      </div>
    </form>
  </div>
  <div class="loader-wrapper">
    <img v-if="loading" class="loader" src="@/assets/icons/loader.svg" alt=""/>
  </div>
</template>

<style scoped lang="scss">
.form {

  > form {
    max-width: 100%;
  }

  .avatar {
    object-fit: contain;
  }
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
.form-content {
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  .categories-wrapper {
    margin: 1rem 0;
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
    max-width: 70%;
    .category {
      background: #ccc;
      padding: 0.5rem 1rem;
      border-radius: 3px;
      width: fit-content;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;

      > span {
        display: flex;
        align-items: center;
      }
      img {
        width: 1.4rem;
        cursor: pointer;
      }
    }
  }

  .categories-error {
    color: red;
    margin-bottom: 1rem;
  }
}

input[type=text] ,textarea {
  border: 0;
  border-bottom: 1px solid black;
  padding: 1rem;

  font-weight: 500;
  max-height: 300px;
  outline: none;
}

textarea {
  min-height: 100px;
  max-width: 100%;
  min-width: 100%;
}

.buttons-wrapper {
  margin-top: 1rem;
  gap: 1rem;
  display: flex;
}

.button-add {

  &-post, &-category {
    padding: 0.5rem 2rem;
    border: 1px solid black;
    font-size: 1.4rem;

    &:hover {
      cursor: pointer;
    }
  }

  &-post {
    background: black;
    color: white;

    &:hover {
      background: white;
      color: black;
    }
  }

  &-category {
    background: white;

    &:hover {
      background: #ccc;
    }
  }
}

.button-close-modal {
  position: absolute;
  top: 0;
  right: 0;
  background: transparent;
  border: 0;
  outline: none;
  cursor: pointer;

  img {
    width: 2rem;
  }
}
</style>