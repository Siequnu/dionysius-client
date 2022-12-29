<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import NavbarMain from '@/components/NavbarMain.vue';
import { useSettingsStore } from '@/stores/SettingsStore';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import axios from 'axios';

const toast = useToast();
const clientBaseUrl = import.meta.env.VITE_SOURCE_BASE_URL;
const settingsStore = useSettingsStore();

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

  settingsStore.setSourceBaseUrl(clientBaseUrl);
});
</script>

<template>
  <Toast />
  <div>
    <NavbarMain />
    <RouterView />
  </div>
</template>
