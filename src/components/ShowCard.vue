<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import BounceLoader from '@/components/BounceLoader.vue';

const props = defineProps({
  title: { type: String, required: true },
  showUrl: { type: String, required: true },
});

let imageUrl = ref(null);

const loaded = ref(false);

onMounted(() => {
  axios
    .post(`http://localhost:3000/getShowImageUrl`, {
      url: props.showUrl,
    })
    .then((response) => {
      imageUrl.value = response.data.imageUrl;
      loaded.value = true;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div
    class="rounded-md shadow-md cursor-pointer hover:scale-[1.02] transition-all"
  >
    <BounceLoader v-if="!loaded" />
    <img v-if="loaded" class="rounded-md" :src="imageUrl" />
  </div>
</template>
