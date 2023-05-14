import axios from 'axios';
import { defineStore } from 'pinia';

import { useSettingsStore } from '@/stores/SettingsStore.js';

export const useTvShowStore = defineStore('tvShowStore', {
  state: () => {
    return {
      settingsStore: useSettingsStore(),

      shows: [],
      currentlySelectedShow: null,
    };
  },
  actions: {
    setupStore() {
      console.log('Setting up TV show store...');
      this.getAllShows();
    },

    async getAllShows() {
      await axios
        .get(`${this.settingsStore.settings.api.apiBaseUrl}/api/shows`)
        .then((response) => response.data)
        .then((data) => {
          console.log('Got all shows', data.shows);
          this.shows = data.shows;
        });
    },

    addShow(showObject) {
      axios.post(`${this.settingsStore.settings.api.apiBaseUrl}/api/show`, {
        ...showObject,
      });
    },
  },
});
