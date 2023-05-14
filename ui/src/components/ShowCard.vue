<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  showObject: { type: Object, required: true },
});

function goToShowPage() {
  router.push({ name: 'show', params: { id: props.showObject._id } });
}
</script>

<template>
  <div
    class="rounded-md shadow-md cursor-pointer hover:scale-[1.02] transition-all"
    @click="goToShowPage"
  >
    <img class="rounded-md" :src="props.showObject.details.imageUrl" />
  </div>
</template>
