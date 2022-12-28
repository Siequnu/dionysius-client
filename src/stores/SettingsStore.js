import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore(
  'SettingsStore',
  () => {
    let sourceBaseUrl = ref('');

    function setSourceBaseUrl(url) {
      sourceBaseUrl.value = url;
    }

    return { sourceBaseUrl, setSourceBaseUrl };
  },
  {
    persist: true,
  }
);
