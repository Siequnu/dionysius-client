<script setup></script>

<template>
  <div class="Navbar__top flex w-full justify-between bg-neutral-800 p-5">
    <a @click="$router.push('/')">Home</a>
  </div>
</template>

<style lang="scss" scoped>
.Navbar__top a {
  @apply cursor-pointer p-3 rounded-md text-white hover:text-neutral-100;
}
</style>
