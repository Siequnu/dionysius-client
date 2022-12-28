<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Button from 'primevue/button';

const props = defineProps({
  id: { type: String, required: false, default: crypto.randomUUID() },
  seasons: { type: Array, required: true },
});
</script>

<template>
  <div class="w-[500px]">
    <Accordion :activeIndex="0">
      <AccordionTab
        v-for="(season, index) in props.seasons"
        :key="index"
        :header="`Season ${season.season}`"
      >
        <ul>
          <li v-for="episode in season.episodes" :key="episode.number">
            <div
              class="flex gap-3 items-center p-3 hover:bg-neutral-700 transition-all justify-between rounded-md"
            >
              <div class="flex gap-3 items-center">
                <span>{{ episode.number }}</span>
                <span>{{ episode.title }}</span>
              </div>
              <img class="rounded-md" :src="episode.episodeThumbnail" />
              <Button
                icon="pi pi-cloud-download"
                class="p-button-rounded p-button-outlined"
              />
            </div>
          </li>
        </ul>
      </AccordionTab>
    </Accordion>
  </div>
</template>
