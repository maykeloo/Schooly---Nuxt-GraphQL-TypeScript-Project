<script setup lang="ts">
import {ref} from "vue";

defineEmits<{
  (e: 'search'): void
}>()

enum SearchBy {
  CATEGORY = 'category',
  USER = 'user',
  COMMENT = 'comment'
}

type SearchByType = SearchBy.COMMENT | SearchBy.USER | SearchBy.CATEGORY

const searchBy = ref<SearchByType>()
const setSearchBy = (type) => {
    searchBy.value = type
}
</script>

<template>
    <div class="modal-overlay">
      <div class="modal">
        <h6>Search by</h6>
        <div class="search-by-buttons">
          <span :class="{active: searchBy === SearchBy.CATEGORY}" @click="setSearchBy(SearchBy.CATEGORY)">Category</span>
          <span :class="{active: searchBy === SearchBy.USER}" @click="setSearchBy(SearchBy.USER)">User</span>
          <span :class="{active: searchBy === SearchBy.COMMENT}" @click="setSearchBy(SearchBy.COMMENT)">Comment</span>
        </div>
        <input type="text" placeholder="search...">
        <button>Search</button>
        <div class="close"  @click="$emit('search')">
          <img class="close-img" src="@/assets/icons/icon-close.svg" alt="" />
        </div>
      </div>
    </div>
</template>

<style scoped lang="scss">

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 10;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
}
.close {
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
}


h6 {
  font-weight: 500;
  font-size: 2rem;
}

.search-by-buttons {
  display: flex;
  gap: 1rem;
  width: 80%;
  margin: 0 auto;

  > span {
    display: block;
    padding: 1rem 2rem;
    background: black;
    color: white;
    width: 33%;
    border: 1px solid black;

    &.active {
      background: white;
      color: black;
      cursor: pointer;

      &:hover {
        background: #ccc;
      }
    }


    &:hover {
      background: white;
      color: black;
      cursor: pointer;
    }
  }
}
input {
  margin: 0 auto;
  width: 80%;
  padding: 1rem;
  border: 1px solid black;
  outline: none;
  font-weight: 500;

  &::placeholder {
    color: black;
  }
}

button {
  margin: 0 auto;
  width: 80%;
  padding: 1rem;
  border: 1px solid black;
  outline: none;
  background: black;
  color: white;
  cursor: pointer;
  font-weight: 500;
}

</style>