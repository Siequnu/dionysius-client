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
      console.log('Card show: got data');
      console.log(response.data);
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

  <div v-if="!loading" class="flex flex-col gap-3">
    <div class="flex gap-3 shadow-md rounded-lg m-3">
      <img :src="apiData.imageUrl" class="rounded-lg" />
      <div class="flex flex-col gap-3">
        <h1 class="text-xl text-neutral-100 p-5">{{ show.name }}</h1>
        <Chip :label="`${apiData.seasonCount} seasons`" />
      </div>
    </div>
    <AccordionSeason :seasons="apiData.seasons" />
  </div>
</template>
