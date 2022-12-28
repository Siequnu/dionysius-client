<script setup>
import ShowCard from '@/components/ShowCard.vue';

const shows = [
  {
    title: 'His Dark Materials',
    showUrl: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
  },
  {
    title: 'Rick and Morty',
    showUrl: 'https://flixtor.to/watch/tv/3393898/rick-and-morty',
  },
];
</script>

<template>
  <div class="flex gap-3 flex-wrap">
    <ShowCard
      v-for="(show, index) in shows"
      :key="index"
      :title="show.title"
      :showUrl="show.showUrl"
    />
  </div>
</template>
