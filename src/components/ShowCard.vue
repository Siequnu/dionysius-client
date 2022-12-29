<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import BounceLoader from '@/components/BounceLoader.vue';
import { useTvShowStore } from '@/stores/TvShowStore';

const TvShowStore = useTvShowStore();

const props = defineProps({
  title: { type: String, required: true },
  showUrl: { type: String, required: true },
});

let imageUrl = ref(null);

const loading = ref(true);

onMounted(() => {
  axios
    .post(`http://localhost:3000/getShowImageUrl`, {
      url: props.showUrl,
    })
    .then((response) => {
      imageUrl.value = response.data.imageUrl;
      TvShowStore.setShowThumbnail(props.showUrl, imageUrl.value);
      loading.value = false;
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
    <BounceLoader v-if="loading" />
    <img v-if="!loading" class="rounded-md" :src="imageUrl" />
  </div>
</template>
