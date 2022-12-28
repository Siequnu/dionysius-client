<script setup>
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';

const props = defineProps({
  id: { type: String, required: true, default: crypto.randomUUID() },
  sections: { type: Array, required: true },
});
</script>

<template>
  <Accordion :activeIndex="0">
    <AccordionTab
      v-for="(section, index) in props.sections"
      :key="index"
      :header="section.title"
    >
      <p>
        {{ section.body }}
      </p>
    </AccordionTab>
  </Accordion>
</template>
