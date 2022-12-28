<script setup>
import ShowDetails from '@/components/ShowDetails.vue';
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
const toast = useToast();
const route = useRoute();
const router = useRouter();

const show = {
  name: 'His Dark Materials',
  url: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
};

onMounted(() => {
  if (!route.params.showObject) {
    toast.add({
      severity: 'error',
      summary: 'No show selected',
      detail: 'Please select a show',
      life: 3000,
    });
    router.push('/');
  }

  console.log(route.params.showObject);
});
</script>

<template>
  <main>
    <div class="flex justify-center items-center align-center">
      <ShowDetails :show="show" />
    </div>
  </main>
</template>
