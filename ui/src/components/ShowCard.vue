<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BounceLoader from '@/components/BounceLoader.vue';

import { useTvShowStore } from '@/stores/TvShowStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const SettingsStore = useSettingsStore();
const TvShowStore = useTvShowStore();
const router = useRouter();

const props = defineProps({
  title: { type: String, required: true },
  showUrl: { type: String, required: true },
});

let imageUrl = ref(null);

const loading = ref(true);

const goToShowPage = () => {
  TvShowStore.selectShow({ title: props.title, showUrl: props.showUrl });
  router.push({
    name: 'show',
  });
};

onMounted(() => {
  axios
    .post(`${SettingsStore.apiServerUrl}/getShowImageUrl`, {
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
    @click="goToShowPage()"
  >
    <BounceLoader v-if="loading" />
    <img v-if="!loading" class="rounded-md" :src="imageUrl" />
  </div>
</template>
