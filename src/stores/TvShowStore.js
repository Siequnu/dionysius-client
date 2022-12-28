import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTvShowStore = defineStore(
  'TvShowStore',
  () => {
    let shows = ref([
      {
        title: 'His Dark Materials',
        showUrl: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
      },
      {
        title: 'Rick and Morty',
        showUrl: 'https://flixtor.to/watch/tv/3393898/rick-and-morty',
      },
    ]);
    function addShow(showObject) {
      shows.value.push(showObject);
    }
    function removeShow(showObject) {
      shows.value = shows.value.filter(
        (show) => show.showUrl !== showObject.showUrl
      );
    }

    let currentlySelectedShow = ref(null);
    function selectShow(show) {
      currentlySelectedShow.value = show;
    }

    return { shows, addShow, removeShow, currentlySelectedShow, selectShow };
  },
  {
    persist: true,
  }
);
