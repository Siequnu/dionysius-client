<script setup>
import ShowsGrid from '@/components/ShowsGrid.vue';
import ShowDetails from '@/components/ShowDetails.vue';

const show = {
  name: 'His Dark Materials',
  url: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
};
</script>

<template>
  <main>
    <ShowsGrid />
    <div class="flex justify-center items-center align-center">
      <ShowDetails :show="show" />
    </div>
  </main>
</template>
