import axios from 'axios';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTvShowStore = defineStore(
  'TvShowStore',
  () => {
    /* Store variables */
    let shows = ref([]);
    let currentlySelectedShow = ref(null);

    /* Show management */
    function addShow(showObject) {
      shows.value.push(showObject);
    }
    function removeShow(showObject) {
      shows.value = shows.value.filter(
        (show) => show.showUrl !== showObject.showUrl
      );
    }

    /* Episodes cache */
    function setShowData(showUrl, showData) {
      shows.value.find((showObject) => showObject.showUrl == showUrl).showData =
        showData;
    }
    function getShowData(showUrl) {
      return shows.value.find((showObject) => showObject.showUrl == showUrl)
        ?.showData;
    }

    /* Thumbnail cache */
    function getShowThumbnail(showUrl) {
      return shows.value.find((showObject) => showObject.showUrl == showUrl)
        ?.thumbnailBase64;
    }
    async function setShowThumbnail(showUrl) {
      axios
        .post(`http://localhost:3000/getBase64Image`, {
          url: showUrl,
        })
        .then((response) => {
          shows.value.find(
            (showObject) => showObject.showUrl == showUrl
          ).thumbnailBase64 = response.data.base64;
        })
        .catch((error) => {
          console.log(error);
        });
    }

    /* State  */
    function selectShow(show) {
      currentlySelectedShow.value = show;
    }

    return {
      shows,
      currentlySelectedShow,

      addShow,
      removeShow,

      setShowData,
      getShowData,

      getShowThumbnail,
      setShowThumbnail,

      selectShow,
    };
  },
  {
    persist: true,
  }
);
