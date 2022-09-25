<script lang="ts" setup>
import useSearchComponent from "@/composables/searchComponent";
const { toggleVisible } = useSearchComponent();

const props = defineProps<{
  notfound: string;
}>();
</script>

<template>
  <div class="error">
    <span>{{ props.notfound }} not found</span>
    <span class="button" @click="toggleVisible">Search for other one</span>
  </div>
</template>

<style lang="scss" scoped>
.error {
  font-size: 2rem;
  background: rgb(252, 163, 163);
  padding: 1rem;
  color: white;
  display: flex;
  align-items: center;
  flex-direction: column;

  .button {
    border: 1px solid black;
    background: white;
    color: black;
    padding: 1rem;
    margin-top: 1rem;
    cursor: pointer;
    font-size: 1.2rem;
  }
}
</style>
