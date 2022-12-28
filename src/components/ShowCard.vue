<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';

const props = defineProps({
  title: { type: String, required: true },
  showUrl: { type: String, required: true },
});

let imageUrl = ref(null);

onMounted(() => {
  axios
    .post(`http://localhost:3000/getShowImageUrl`, {
      url: props.showUrl,
    })
    .then((response) => {
      imageUrl.value = response.data.imageUrl;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div class="rounded-md shadow-md cursor-pointer">
    <img class="rounded-md" :src="imageUrl" />
  </div>
</template>
