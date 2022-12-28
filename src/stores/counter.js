import { defineStore } from 'pinia';

export const useTvShowStore = defineStore('TvShowStore', () => {
  const shows = [
    {
      title: 'His Dark Materials',
      showUrl: 'https://flixtor.to/watch/tv/3837242/his-dark-materials',
    },
    {
      title: 'Rick and Morty',
      showUrl: 'https://flixtor.to/watch/tv/3393898/rick-and-morty',
    },
  ];
  function addShow(showObject) {
    shows.push(showObject);
  }

  return { shows, addShow };
});
