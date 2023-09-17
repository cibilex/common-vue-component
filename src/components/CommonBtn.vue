<template>
    <button class="duration-200 capitalize flex items-center gap-1 justify-center"
        @click="disable || loading ? void 0 : clicked()" :class="[
            disable ? 'btn-fill-disable' : activeClass || 'btn-fill-orange',


        ]">
        <Loader v-if="loading" inner :class="loaderClass"></Loader>
        <template v-else>
            {{ text }}
        </template>
    </button>
</template>
    
<script setup lang="ts">
import Loader from "./Loader.vue";
withDefaults(
    defineProps<{
        loading: boolean,
        disable?: boolean,
        loaderClass?: string,
        text?: string,
        activeClass?: string,
    }>(), {
    text: "Accept",
})

const emits = defineEmits(["clicked"]);
const clicked = () => emits("clicked");
</script>
    
    
  
<style scoped>
.btn-fill-orange {
    @apply text-white hover:bg-orange-500 flex items-center justify-center cursor-pointer active:bg-orange-600 active:ring active:ring-orange-500 duration-150 rounded-lg font-medium bg-[#FF5A1F] py-3 px-5 relative;
}

.btn-fill-disable {
    @apply rounded-lg bg-gray-200 px-5 py-3 items-center text-gray-500 flex gap-3 hover:bg-gray-300 cursor-not-allowed duration-150 font-medium leading-[1.5];
}
</style>