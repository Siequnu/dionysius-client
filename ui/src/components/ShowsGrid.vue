<script setup>
import { ref, reactive } from 'vue';
import { useTvShowStore } from '@/stores/tvShowStore';

import { useToast } from 'primevue/usetoast';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import ShowCard from '@/components/ShowCard.vue';

const tvShowStore = useTvShowStore();
const toast = useToast();
const addNewShowDialogOpen = ref(false);
const filterText = ref('');

let newTvShowForm = reactive({
  name: '',
  url: '',
});

const handleAddNewShow = () => {
  if (
    newTvShowForm.name.trim().length == 0 ||
    newTvShowForm.url.trim().length == 0
  ) {
    toast.add({
      severity: 'info',
      summary: 'Please add show details',
      detail: 'Fill out the name and URL.',
      life: 3000,
    });
    return;
  }

  tvShowStore.addShow({
    title: newTvShowForm.name,
    url: newTvShowForm.url,
  });

  newTvShowForm = {
    name: '',
    url: '',
  };

  addNewShowDialogOpen.value = false;
};
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
      <div class="flex gap-3 justify-center items-center">
        <InputText
          type="text"
          placeholder="Filter by name"
          v-model="filterText"
        />
      </div>
      <div class="flex gap-3 flex-wrap items-center justify-center">
        <ShowCard
          v-for="(showObject, index) in tvShowStore.shows.filter((showObject) =>
            showObject.title.toLowerCase().includes(filterText.toLowerCase())
          )"
          :key="index"
          :showObject="showObject"
        />
      </div>
    </div>

    <Dialog
      header="Add new show"
      v-model:visible="addNewShowDialogOpen"
      :dismissable-mask="true"
    >
      <div class="flex flex-col gap-3">
        <InputText
          type="text"
          placeholder="Name"
          v-model="newTvShowForm.name"
        />
        <InputText type="text" placeholder="URL" v-model="newTvShowForm.url" />
      </div>
      <template #footer>
        <Button class="p-button-outlined p-button-secondary" label="Cancel" />
        <Button label="Submit" autofocus @click="handleAddNewShow" />
      </template>
    </Dialog>
  </div>
</template>
