<script setup>
import { useRouter } from 'vue-router';
import ShowCard from '@/components/ShowCard.vue';
import { useTvShowStore } from '@/stores/TvShowStore';

const TvShowStore = useTvShowStore();
const router = useRouter();

const goToShowPage = (show) => {
  TvShowStore.selectShow(show);
  router.push({
    name: 'show',
  });
};
</script>

<template>
  <div class="flex justify-center align-center m-5">
    <div
      class="flex flex-col gap-3 max-w-[1000px] justify-center items-center align-center"
    >
      <h2 class="text-white text-xl p-5">My shows</h2>
      <div class="flex gap-3 flex-wrap items-center justify-center">
        <ShowCard
          v-for="(show, index) in TvShowStore.shows"
          :key="index"
          @click="goToShowPage(show)"
          :title="show.title"
          :showUrl="show.showUrl"
        />
      </div>
    </div>
  </div>
</template>
