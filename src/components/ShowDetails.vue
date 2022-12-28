<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import AccordionSeason from '@/components/AccordionSeason.vue';
import Chip from 'primevue/chip';
import BounceLoader from '@/components/BounceLoader.vue';

const props = defineProps({
  show: { type: Object, required: true },
});

let loading = ref(true);
let apiData = reactive({});

onMounted(() => {
  axios
    .post(`http://localhost:3000/getShowDetails`, {
      url: props.show.showUrl,
    })
    .then((response) => {
      apiData = response.data;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => (loading.value = false));
});
</script>

<template>
  <div v-if="loading">
    <BounceLoader />
  </div>

  <div v-if="!loading" class="flex gap-3">
    <div class="flex flex-col gap-3 shadow-md rounded-lg m-3">
      <img :src="apiData.imageUrl" class="rounded-lg h-80" />
      <div class="flex flex-col gap-1">
        <h1 class="text-xl text-neutral-100 p-5">{{ show.title }}</h1>
        <Chip :label="`${apiData.seasonCount} seasons`" />
      </div>
    </div>
    <div class="p-3"><AccordionSeason :seasons="apiData.seasons" /></div>
  </div>
</template>
