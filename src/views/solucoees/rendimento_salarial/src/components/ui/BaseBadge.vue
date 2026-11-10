<template>
  <span :class="badgeClasses">
    <slot />
  </span>
</template>

<script>
export default {
  name: "BaseBadge",
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
          "info",
        ].includes(value),
    },
    size: {
      type: String,
      default: "md",
      validator: (value) => ["sm", "md", "lg"].includes(value),
    },
    rounded: {
      type: Boolean,
      default: true,
    },
    dot: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    badgeClasses() {
      const base = "inline-flex items-center font-medium transition-colors";
      const sizes = {
        sm: "px-2 py-1 text-xs",
        md: "px-3 py-1.5 text-sm",
        lg: "px-4 py-2 text-base",
      };
      const variants = {
        primary:
          "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
        secondary:
          "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
        success:
          "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
        danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
        warning:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
        info: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
      };
      const roundedClass = this.rounded ? "rounded-full" : "rounded-md";

      return [
        base,
        sizes[this.size],
        variants[this.variant],
        roundedClass,
      ].join(" ");
    },
  },
};
</script>
