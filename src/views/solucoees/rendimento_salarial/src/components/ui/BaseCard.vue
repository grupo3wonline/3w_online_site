<template>
  <div :class="cardClasses">
    <div
      v-if="$slots.header || title"
      class="px-6 py-4 border-b border-gray-200 dark:border-gray-700"
    >
      <slot name="header">
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
          {{ title }}
        </h3>
      </slot>
    </div>
    <div :class="bodyClasses">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="px-6 py-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseCard",
  props: {
    title: {
      type: String,
      default: "",
    },
    variant: {
      type: String,
      default: "default",
      validator: (value) =>
        ["default", "outlined", "elevated", "gradient"].includes(value),
    },
    padding: {
      type: String,
      default: "md",
      validator: (value) => ["none", "sm", "md", "lg", "xl"].includes(value),
    },
    hover: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    cardClasses() {
      const base = "rounded-2xl transition-all duration-200 dark:bg-gray-800";
      const variants = {
        default: "bg-white shadow-md",
        outlined: "bg-white border-2 border-gray-200 dark:border-gray-700",
        elevated: "bg-white shadow-xl",
        gradient:
          "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900",
      };
      const hoverClass =
        this.hover || this.clickable
          ? "hover:shadow-2xl hover:-translate-y-1"
          : "";
      const clickableClass = this.clickable ? "cursor-pointer" : "";

      return [base, variants[this.variant], hoverClass, clickableClass].join(
        " "
      );
    },
    bodyClasses() {
      const paddings = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
      };
      return paddings[this.padding];
    },
  },
};
</script>
