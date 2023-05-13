import axios from 'axios';
import { defineStore } from 'pinia';

import { useSettingsStore } from '@/stores/SettingsStore.js';

export const useTvShowStore = defineStore('TvShowStore', {
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
        .get(`${this.settingsStore.settings.api.apiBaseUrl}/manage/shows/get`)
        .then((response) => response.data)
        .then((data) => {
          console.log('Got all shows', data.shows);
          this.shows = data.shows;
        });
    },

    addShow(showObject) {
      axios.post(
        `${this.settingsStore.settings.api.apiBaseUrl}/manage/show/create`,
        {
          ...showObject,
        }
      );
    },
    removeShow(showObject) {
      this.shows = this.shows.filter((show) => show.url !== showObject.url);
    },

    async setShowThumbnail(url) {
      axios
        .post(`${this.settingsStore.settings.api.apiBaseUrl}/getBase64Image`, {
          url: url,
        })
        .then((response) => {
          this.shows.find(
            (showObject) => showObject.url == url
          ).thumbnailBase64 = response.data.base64;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    selectShow(show) {
      this.currentlySelectedShow = show;
    },
  },
});
