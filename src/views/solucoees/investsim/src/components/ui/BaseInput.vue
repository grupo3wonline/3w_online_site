<template>
  <div class="w-full">
    <!-- Label -->
    <label
      v-if="label"
      :for="inputId"
      class="block text-sm font-medium text-gray-700 mb-2 dark:text-gray-300"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
      <span v-if="hint" class="text-gray-500 font-normal ml-2 text-xs">{{
        hint
      }}</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Prefix Icon/Text -->
      <div
        v-if="$slots.prefix || prefix"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prefix">
          <span class="text-gray-500 sm:text-sm dark:text-gray-400">{{
            prefix
          }}</span>
        </slot>
      </div>

      <!-- Input -->
      <input
        v-if="type !== 'textarea'"
        :id="inputId"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :min="min"
        :max="max"
        :step="step"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        class="w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white focus:outline-none dark:bg-gray-800 dark:text-gray-100"
      />

      <!-- Textarea -->
      <textarea
        v-else
        :id="inputId"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :rows="rows"
        :autocomplete="autocomplete"
        :class="inputClasses"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        class="w-full px-4 py-3 border rounded-lg transition-all duration-200 bg-white focus:outline-none resize-none dark:bg-gray-800 dark:text-gray-100"
      ></textarea>

      <!-- Suffix Icon/Text -->
      <div
        v-if="$slots.suffix || suffix"
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <slot name="suffix">
          <span class="text-gray-500 sm:text-sm dark:text-gray-400">{{
            suffix
          }}</span>
        </slot>
      </div>
    </div>

    <!-- Error Message -->
    <p
      v-if="error && showError"
      class="mt-2 text-sm text-red-600 dark:text-red-400"
    >
      {{ error }}
    </p>

    <!-- Help Text -->
    <p
      v-else-if="helpText"
      class="mt-2 text-sm text-gray-500 dark:text-gray-400"
    >
      {{ helpText }}
    </p>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
    validator: (value) =>
      [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "date",
        "textarea",
      ].includes(value),
  },
  label: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  hint: {
    type: String,
    default: "",
  },
  helpText: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  prefix: {
    type: String,
    default: "",
  },
  suffix: {
    type: String,
    default: "",
  },
  min: {
    type: [String, Number],
    default: undefined,
  },
  max: {
    type: [String, Number],
    default: undefined,
  },
  step: {
    type: [String, Number],
    default: undefined,
  },
  rows: {
    type: Number,
    default: 3,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
});

const emit = defineEmits(["update:modelValue", "blur", "focus"]);

const inputId = computed(
  () => `input-${Math.random().toString(36).substr(2, 9)}`
);
const isFocused = ref(false);
const showError = ref(false);

const inputClasses = computed(() => {
  const classes = [];

  // Prefix/Suffix padding
  if (props.prefix || props.$slots.prefix) {
    classes.push("pl-10");
  }
  if (props.suffix || props.$slots.suffix) {
    classes.push("pr-10");
  }

  // Error state
  if (props.error && showError.value) {
    classes.push(
      "border-red-300 focus:ring-red-200 focus:border-red-500 dark:border-red-700"
    );
  } else if (isFocused.value) {
    classes.push(
      "border-primary-500 ring-4 ring-primary-200 dark:border-primary-400 dark:ring-primary-900/50"
    );
  } else {
    classes.push(
      "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
    );
  }

  // Disabled state
  if (props.disabled) {
    classes.push("bg-gray-100 cursor-not-allowed dark:bg-gray-900");
  }

  return classes.join(" ");
});

const handleInput = (event) => {
  emit("update:modelValue", event.target.value);
};

const handleBlur = (event) => {
  isFocused.value = false;
  showError.value = true;
  emit("blur", event);
};

const handleFocus = (event) => {
  isFocused.value = true;
  emit("focus", event);
};
</script>
