import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore(
  'SettingsStore',
  () => {
    let sourceBaseUrl = ref('');
    let apiServerUrl = ref('');

    function setSourceBaseUrl(url) {
      sourceBaseUrl.value = url;
    }
    function setApiServerUrl(url) {
      apiServerUrl.value = url;
    }

    return { sourceBaseUrl, apiServerUrl, setSourceBaseUrl, setApiServerUrl };
  },
  {
    persist: true,
  }
);
