<script setup>
import { ref } from 'vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { useSettingsStore } from '@/stores/SettingsStore';

const settingsStore = useSettingsStore();
const props = defineProps({
  id: { type: String, required: false, default: crypto.randomUUID() },
  seasons: { type: Array, required: true },
});

const handleDownloadLink = (link) => {
  dialogVisible.value = true;
  //window.open(`${settingsStore.settings.service.baseUrl}${link}`);
};

const dialogVisible = ref(false);
</script>

<template>
  <div class="w-[700px]">
    <Accordion :activeIndex="0">
      <AccordionTab
        v-for="(season, index) in props.seasons"
        :key="index"
        :header="`Season ${season.season}`"
      >
        <ul>
          <li v-for="episode in season.episodes" :key="episode.number">
            <div
              class="flex gap-3 items-center p-3 hover:bg-neutral-700 transition-all justify-start rounded-md"
            >
              <Button
                icon="pi pi-cloud-download"
                class="p-button-rounded p-button-outlined"
                @click="handleDownloadLink(episode.downloadLink)"
              />
              <img class="rounded-md" :src="episode.episodeThumbnail" />
              <div class="flex gap-3 items-center justify-start">
                <span>{{ episode.number }}</span>
                <span>{{ episode.title }}</span>
              </div>
            </div>
          </li>
        </ul>
      </AccordionTab>
    </Accordion>
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    maximizable
    modal
    :style="{ width: '1000px' }"
  >
    <iframe
      style="width: 1000px"
      src="https://flixtor.to/watch/tv/4275642/succession/season/4/episode/7"
    ></iframe>
  </Dialog>
</template>
