<script setup>
import ShowCard from '@/components/ShowCard.vue';
import { useTvShowStore } from '@/stores/counter';
const TvShowStore = useTvShowStore();
</script>

<template>
  <div class="flex gap-3 flex-wrap items-center justify-center">
    <ShowCard
      v-for="(show, index) in TvShowStore.shows"
      :key="index"
      @click="$router.push({ name: 'show', params: { showObject: show } })"
      :title="show.title"
      :showUrl="show.showUrl"
    />
  </div>
</template>
