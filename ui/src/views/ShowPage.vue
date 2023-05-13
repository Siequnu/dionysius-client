<script setup>
import ShowDetails from '@/components/ShowDetails.vue';
import { ref, onMounted } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();

const id = ref(null);

onMounted(() => {
  console.log(route.params.id);
  id.value = route.params.id;
});
</script>

<template>
  <main>
    <div class="flex justify-center items-center align-center">
      <ShowDetails :showId="route.params.id" />
    </div>
  </main>
</template>
