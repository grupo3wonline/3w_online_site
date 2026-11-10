<template>
  <div class="animate-pulse">
    <div v-if="variant === 'card'" class="card p-6">
      <div class="flex items-start space-x-4">
        <div class="w-32 h-24 bg-gray-200 rounded-lg"></div>
        <div class="flex-1 space-y-3">
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
          <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          <div class="h-3 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    </div>

    <div v-else-if="variant === 'thumbnail'" class="space-y-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in count"
          :key="n"
          class="border border-gray-200 rounded-lg p-4"
        >
          <div class="aspect-video mb-4 bg-gray-200 rounded-lg"></div>
          <div class="space-y-3">
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
            <div class="h-10 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else-if="variant === 'list'" class="space-y-4">
      <div v-for="n in count" :key="n" class="card p-6">
        <div class="flex items-center space-x-4">
          <div class="w-12 h-12 bg-gray-200 rounded-full"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="space-y-3">
      <div class="h-4 bg-gray-200 rounded w-full"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
      <div class="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
  props: {
    variant: {
      type: String,
      default: "default",
      validator: (value) =>
        ["default", "card", "thumbnail", "list"].includes(value),
    },
    count: {
      type: Number,
      default: 3,
    },
  },
};
</script>
