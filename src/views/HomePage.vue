<script setup>
import CardShow from '@/components/CardShow.vue';

const show = {
  name: 'His Dark Materials',
  url: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
};
</script>

<template>
  <main>
    <div class="flex justify-center items-center align-center">
      <CardShow :show="show" />
    </div>
  </main>
</template>
