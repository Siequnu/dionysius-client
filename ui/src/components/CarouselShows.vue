<script setup>
import { ref } from 'vue';
import Carousel from 'primevue/carousel';
import { useTvShowStore } from '@/stores/tvShowStore';
import ShowCard from '@/components/ShowCard.vue';

const tvShowStore = useTvShowStore();

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 3,
    numScroll: 3,
  },
  {
    breakpoint: '600px',
    numVisible: 2,
    numScroll: 2,
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1,
  },
]);
</script>

<template>
  <div class="flex justify-center align-center m-5">
    <div class="max-w-[1000px]">
      <div class="flex gap-3 justify-center items-center">
        <h2 class="text-white text-xl p-5 font-bold">Recent shows</h2>
      </div>
      <Carousel
        :value="tvShowStore.shows"
        :numVisible="4"
        :numScroll="1"
        :responsiveOptions="responsiveOptions"
        class="custom-carousel"
        :circular="true"
        :autoplayInterval="3000"
      >
        <template #item="slotProps">
          <ShowCard :showObject="slotProps.data" />
        </template>
      </Carousel>
    </div>
  </div>
</template>
