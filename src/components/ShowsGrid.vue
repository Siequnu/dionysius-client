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
  <div class="flex gap-3 flex-wrap items-center justify-center">
    <ShowCard
      v-for="(show, index) in TvShowStore.shows"
      :key="index"
      @click="goToShowPage(show)"
      :title="show.title"
      :showUrl="show.showUrl"
    />
  </div>
</template>
