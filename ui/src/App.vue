<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';

import NavbarMain from '@/components/NavbarMain.vue';

import { useTvShowStore } from '@/stores/tvShowStore';
import { useSettingsStore } from '@/stores/settingsStore';
import config from '../../config.mjs';

import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';

import { axios } from '@/api/api';

const toast = useToast();
const settingsStore = useSettingsStore();
settingsStore.settings = { ...settingsStore.settings, ...config };
settingsStore.settings.api.apiBaseUrl = `${settingsStore.settings.api.baseUrl}:${settingsStore.settings.api.port}`;

const tvShowStore = useTvShowStore();
console.log(tvShowStore);
tvShowStore.setupStore();

onMounted(() => {
  axios
    .get(`${settingsStore.settings.api.apiBaseUrl}/health`)
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
