<script setup>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import ShowCard from '@/components/ShowCard.vue';
import { useTvShowStore } from '@/stores/TvShowStore';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';

const TvShowStore = useTvShowStore();
const router = useRouter();

const goToShowPage = (show) => {
  TvShowStore.selectShow(show);
  router.push({
    name: 'show',
  });
};

const addNewShowDialogOpen = ref(false);
</script>

<template>
  <div class="flex justify-center align-center m-5">
    <div
      class="flex flex-col gap-3 max-w-[1000px] justify-center items-center align-center"
    >
      <div class="flex gap-3 justify-between items-center">
        <div></div>
        <h2 class="text-white text-xl p-5 font-bold">My shows</h2>
        <div class="justify-end">
          <Button
            icon="pi pi-plus"
            class="p-button-rounded p-button-outlined"
            @click="addNewShowDialogOpen = true"
          ></Button>
        </div>
      </div>
      <div class="flex gap-3 flex-wrap items-center justify-center">
        <ShowCard
          v-for="(show, index) in TvShowStore.shows"
          :key="index"
          @click="goToShowPage(show)"
          :title="show.title"
          :showUrl="show.showUrl"
        />
      </div>
    </div>

    <Dialog
      header="Add new show"
      footer="Footer"
      v-model:visible="addNewShowDialogOpen"
    >
      Content
    </Dialog>
  </div>
</template>
