<template>
  <div
    class="Navbar__top flex w-full justify-between items-center bg-neutral-800 p-5"
  >
    <div class="flex gap-3 items-center">
      <i
        @click="$router.push('/')"
        class="pi pi-compass text-2xl font-bold"
      ></i>
      <a @click="$router.push('/')">Recent</a>
      <a @click="$router.push('/all')">All shows</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.Navbar__top a,
.Navbar__top i {
  @apply cursor-pointer p-3 rounded-md text-white hover:text-green-300 transition-all font-bold;
}
</style>
