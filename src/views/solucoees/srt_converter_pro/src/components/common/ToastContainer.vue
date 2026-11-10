<template>
  <div
    class="fixed top-4 right-4 z-50 flex flex-col gap-4 pointer-events-none"
    aria-live="assertive"
    aria-atomic="true"
  >
    <BaseToast
      v-for="toast in toasts"
      :key="toast.id"
      :type="toast.type"
      :title="toast.title"
      :message="toast.message"
      :duration="toast.duration"
      class="pointer-events-auto"
      @close="removeToast(toast.id)"
    />
  </div>
</template>

<script setup lang="ts">
import { useToast } from "../../composables/useToast";
import BaseToast from "./BaseToast.vue";

const { toasts, remove } = useToast();

const removeToast = (id: string) => {
  remove(id);
};
</script>
