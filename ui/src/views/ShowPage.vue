<script setup>
import ShowDetails from '@/components/ShowDetails.vue';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useTvShowStore } from '@/stores/TvShowStore';
import { useToast } from 'primevue/usetoast';

const TvShowStore = useTvShowStore();
const toast = useToast();
const router = useRouter();

onMounted(() => {
  if (!TvShowStore.currentlySelectedShow) {
    toast.add({
      severity: 'error',
      summary: 'No show selected',
      detail: 'Please select a show',
      life: 3000,
    });
    router.push('/');
  }
});
</script>

<template>
  <main>
    <div class="flex justify-center items-center align-center">
      <ShowDetails
        v-if="TvShowStore.currentlySelectedShow"
        :show="TvShowStore.currentlySelectedShow"
      />
    </div>
  </main>
</template>
