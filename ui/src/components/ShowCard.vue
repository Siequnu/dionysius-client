<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import BounceLoader from '@/components/BounceLoader.vue';

import { useTvShowStore } from '@/stores/TvShowStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const tvShowStore = useTvShowStore();
const router = useRouter();

const props = defineProps({
  title: { type: String, required: true },
  url: { type: String, required: true },
  showObject: { type: String, required: true },
});

let imageUrl = ref(null);

const loading = ref(true);

function goToShowPage() {
  tvShowStore.selectShow({
    title: props.title,
    url: props.url,
    ...props.showObject,
  });
  router.push({
    name: 'show',
  });
}

onMounted(() => {
  axios
    .post(`${settingsStore.settings.api.apiBaseUrl}/getShowImageUrl`, {
      url: props.url,
    })
    .then((response) => {
      imageUrl.value = response.data.imageUrl;
      tvShowStore.setShowThumbnail(props.url, imageUrl.value);
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
    @click="goToShowPage"
  >
    <BounceLoader v-if="loading" />
    <img v-if="!loading" class="rounded-md" :src="imageUrl" />
  </div>
</template>
