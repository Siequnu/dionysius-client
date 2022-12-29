<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import AccordionSeason from '@/components/AccordionSeason.vue';
import BounceLoader from '@/components/BounceLoader.vue';
import Chip from 'primevue/chip';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast';
import { useTvShowStore } from '@/stores/TvShowStore';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();
const TvShowStore = useTvShowStore();

const props = defineProps({
  show: { type: Object, required: true },
});

let loading = ref(true);
let apiData = reactive({});

onMounted(() => {
  if (TvShowStore.getShowData(props.show.showUrl)) {
    loading.value = false;
  }

  axios
    .post(`http://localhost:3000/getShowDetails`, {
      url: props.show.showUrl,
    })
    .then((response) => {
      apiData = response.data;
      TvShowStore.setShowData(props.show.showUrl, apiData);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
});

const getTotalEpisodeCount = () => {
  let count = 0;
  TvShowStore.getShowData(props.show.showUrl).seasons.forEach(
    (season) => (count += season.episodes.length)
  );
  return count;
};

const handleRemoveShow = () => {
  TvShowStore.removeShow({ showUrl: props.show.showUrl });
  toast.add({
    severity: 'success',
    summary: 'Removed show',
    detail: 'Show removed successfully',
    life: 3000,
  });
  router.push('/');
};
</script>

<template>
  <div v-if="loading">
    <BounceLoader />
  </div>

  <div v-if="!loading" class="flex gap-3">
    <div class="flex flex-col gap-3 shadow-md rounded-lg m-3">
      <img
        :src="TvShowStore.getShowData(props.show.showUrl)?.imageUrl"
        class="rounded-lg h-80"
      />
      <div class="flex flex-col gap-1">
        <h1 class="text-xl text-neutral-100 p-5">{{ show.title }}</h1>
        <div class="flex gap-3">
          <Chip
            :label="`${
              TvShowStore.getShowData(props.show.showUrl)?.seasonCount
            } seasons`"
          />
          <Chip :label="`${getTotalEpisodeCount()} episodes`" />
        </div>
      </div>
      <Button
        class="p-button-outlined p-button-secondary"
        label="Remove"
        @click="handleRemoveShow"
      />
    </div>
    <div class="p-3">
      <AccordionSeason
        :seasons="TvShowStore.getShowData(props.show.showUrl).seasons"
      />
    </div>
  </div>
</template>
