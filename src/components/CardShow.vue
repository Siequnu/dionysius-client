<script setup>
import { onMounted, reactive } from 'vue';
import axios from 'axios';
import AccordionWrapper from '@/components/AccordionWrapper.vue';

const props = defineProps({
  show: { type: Object, required: true },
});

const apiData = reactive({ imageUrl: null });

onMounted(() => {
  console.log(`Loading ${props.show.name}`);

  axios
    .post(`http://localhost:3000/getShowDetails`, {
      url: props.show.url,
    })
    .then((response) => {
      console.log(response.data);
      apiData.imageUrl = response.data.image;
    })
    .catch((error) => {
      console.log(error);
    });
});
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex gap-3 shadow-md rounded-lg m-3">
      <img v-if="apiData.imageUrl" :src="apiData.imageUrl" class="rounded-lg" />
      <div class="flex flex-col gap-3">
        <h1 class="text-xl text-neutral-100 p-5">{{ show.name }}</h1>
      </div>
    </div>
    <AccordionWrapper
      id="shows"
      :sections="[
        { title: 'Test', body: 'Test body' },
        { title: 'Test 2', body: 'Test body 2' },
      ]"
    />
  </div>
</template>
