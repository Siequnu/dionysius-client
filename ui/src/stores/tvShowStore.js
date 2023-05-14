import { axios } from '@/api/api';
import { defineStore } from 'pinia';

import { useSettingsStore } from '@/stores/settingsStore.js';

export const useTvShowStore = defineStore('tvShowStore', {
  state: () => {
    return {
      settingsStore: useSettingsStore(),

      shows: [],
      currentlySelectedShow: null,
    };
  },
  persist: true,
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

    async getShow(id) {
      const show = this.shows.find((show) => show._id == id);

      if (show) return show;

      try {
        const response = await axios.get(
          `${this.settingsStore.settings.api.apiBaseUrl}/api/show`,
          {
            params: {
              id: id,
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        throw new Error('Error fetching show');
      }
    },
  },
});
