<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavbarMain from '@/components/NavbarMain.vue';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import axios from 'axios';

const toast = useToast();

onMounted(() => {
  axios
    .get('http://localhost:3000/')
    .then(() => {
      console.log('App: frontend found server');
    })
    .catch((error) => {
      console.log('App: error connecting to backend', error);
      toast.add({
        severity: 'error',
        summary: 'Backend unavailable',
        detail:
          'The client could not connect to the server. Is the backend running?',
        life: 3000,
      });
    });
});
</script>

<template>
  <Toast />
  <div>
    <NavbarMain />
    <RouterView />
  </div>
</template>

<style scoped></style>
