<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    @click="handleClick"
  >
    <span v-if="loading" class="mr-2">
      <svg
        class="animate-spin h-5 w-5"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </span>
    <slot />
  </button>
</template>

<script>
export default {
  name: "BaseButton",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (value) =>
        [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
          "ghost",
          "outline",
        ].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg", "xl"].includes(value),
    },
    type: {
      type: String,
      default: "button",
      validator: (value) => ["button", "submit", "reset"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: String,
      default: "lg",
      validator: (value) => ["sm", "md", "lg", "xl", "full"].includes(value),
    },
  },
  emits: ["click"],
  computed: {
    buttonClasses() {
      return [
        "inline-flex items-center justify-center font-semibold transition-all duration-200 transform focus:outline-none focus:ring-4",
        this.sizeClasses,
        this.variantClasses,
        this.roundedClasses,
        this.fullWidth ? "w-full" : "",
        this.disabled || this.loading
          ? "opacity-50 cursor-not-allowed"
          : "hover:scale-105 active:scale-95",
      ];
    },
    sizeClasses() {
      const sizes = {
        sm: "px-4 py-2 text-sm",
        md: "px-6 py-3 text-base",
        lg: "px-8 py-4 text-lg",
        xl: "px-10 py-5 text-xl",
      };
      return sizes[this.size];
    },
    variantClasses() {
      const variants = {
        primary:
          "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 focus:ring-blue-500/50 shadow-lg hover:shadow-xl",
        secondary:
          "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500/50 shadow-md hover:shadow-lg",
        success:
          "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 focus:ring-green-500/50 shadow-lg hover:shadow-xl",
        danger:
          "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:from-red-600 hover:to-rose-700 focus:ring-red-500/50 shadow-lg hover:shadow-xl",
        warning:
          "bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 focus:ring-yellow-500/50 shadow-lg hover:shadow-xl",
        ghost:
          "bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-300",
        outline:
          "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500/50",
      };
      return variants[this.variant];
    },
    roundedClasses() {
      const rounded = {
        sm: "rounded",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      };
      return rounded[this.rounded];
    },
  },
  methods: {
    handleClick(event) {
      if (!this.disabled && !this.loading) {
        this.$emit("click", event);
      }
    },
  },
};
</script>
