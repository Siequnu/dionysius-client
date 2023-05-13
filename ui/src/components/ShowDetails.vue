<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import AccordionSeason from '@/components/AccordionSeason.vue';
import BounceLoader from '@/components/BounceLoader.vue';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

import { useTvShowStore } from '@/stores/TvShowStore';
import { useSettingsStore } from '@/stores/SettingsStore';

const toast = useToast();
const router = useRouter();

const tvShowStore = useTvShowStore();
const settingsStore = useSettingsStore();

const props = defineProps({
  show: { type: Object, required: true },
});

let loading = ref(true);
let apiData = reactive({});

onMounted(() => {
  axios
    .post(`${settingsStore.settings.api.apiBaseUrl}/getShowDetails`, {
      id: props.show.id,
    })
    .then((response) => {
      console.log(response.data);
      apiData = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
});

const getTotalEpisodeCount = (seasons) => {
  let count = 0;
  seasons.forEach((season) => (count += season.episodes.length));
  return count;
};

async function handleRemoveShow() {
  axios.post(`${settingsStore.settings.api.apiBaseUrl}/manage/show/delete`, {
    id: tvShowStore.currentlySelectedShow._id,
  });
  router.push('/');
}
</script>

<template>
  <div v-if="loading">
    <BounceLoader />
  </div>

  <div v-if="!loading" class="flex gap-3">
    <div class="flex flex-col gap-3 shadow-md rounded-lg m-3">
      <img :src="apiData.imageUrl" class="rounded-lg h-80" />
      <div class="flex flex-col gap-1">
        <h1 class="text-xl text-neutral-100 p-5">{{ props.show.title }}</h1>
        <div class="flex gap-3">
          <Chip :label="`${apiData.seasonCount} seasons`" />
          <Chip :label="`${getTotalEpisodeCount(apiData.seasons)} episodes`" />
        </div>
      </div>
      <Button
        class="p-button p-button-success"
        label="Mark all as seen"
        @click="handleMarkShowAsSeen"
      />
      <Button
        class="p-button-outlined p-button-danger"
        label="Remove show"
        @click="handleRemoveShow"
      />
    </div>
    <div class="p-3">
      <AccordionSeason :seasons="apiData.seasons" />
    </div>
  </div>
</template>
