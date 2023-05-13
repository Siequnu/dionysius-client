import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(
  'settingsStore',
  {
    state: () => {
      return { settings: {} };
    },
  },
  {
    persist: true,
  }
);
