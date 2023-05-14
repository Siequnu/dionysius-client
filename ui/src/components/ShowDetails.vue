<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import AccordionSeason from '@/components/AccordionSeason.vue';
import BounceLoader from '@/components/BounceLoader.vue';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

import { useTvShowStore } from '@/stores/tvShowStore';
import { useSettingsStore } from '@/stores/settingsStore';

const toast = useToast();
const router = useRouter();

const tvShowStore = useTvShowStore();
const settingsStore = useSettingsStore();

const props = defineProps({ showId: String });

let loading = ref(true);
let apiData = reactive({});

onMounted(() => {
  console.log('Getting show details for', props.showId);
  axios
    .get(`${settingsStore.settings.api.apiBaseUrl}/api/show`, {
      params: {
        id: props.showId,
      },
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
  axios.delete(`${settingsStore.settings.api.apiBaseUrl}/api/show`, {
    params: {
      id: props.showId,
    },
  });
  router.push('/all');
}

function handleMarkShowAsSeen() {}
</script>

<template>
  <div v-if="loading">
    <BounceLoader />
  </div>

  <div v-if="!loading" class="flex gap-3">
    <div class="flex flex-col gap-3 shadow-md rounded-lg m-3">
      <img :src="apiData.details.imageUrl" class="rounded-lg h-80" />
      <div class="flex flex-col gap-1">
        <h1 class="text-xl text-neutral-100 p-5">{{ apiData.title }}</h1>
        <div class="flex gap-3">
          <Chip :label="`${apiData.details.seasonCount} seasons`" />
          <Chip
            :label="`${getTotalEpisodeCount(apiData.details.seasons)} episodes`"
          />
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
      <AccordionSeason :seasons="apiData.details.seasons" />
    </div>
  </div>
</template>
