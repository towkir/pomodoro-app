<script setup>
const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

function increaseValue() {
  if (props.modelValue + 1 <= props.max) {
    emit('update:modelValue', props.modelValue + 1);
  }
}

function decreaseValue() {
  if (props.modelValue - 1 >= props.min) {
    emit('update:modelValue', props.modelValue - 1);
  }
}
</script>

<template>
<div class="number-input-wrapper">
  <label for="">{{ props.label }}</label>
  <input
    type="number"
    :value="modelValue"
    :min="props.min"
    :max="props.max"
    @input="$emit('update:modelValue', Number($event.target.value))"
  />
  <button type="button" class="up" tabindex="-1" @click="increaseValue">
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 6L7 2L13 6" stroke="#1E213F" stroke-width="2"/>
    </svg>
  </button>
  <button type="button" class="down" tabindex="-1" @click="decreaseValue">
    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 1L7 5L13 1" stroke="#1E213F" stroke-width="2"/>
    </svg>
  </button>
  <span
    v-if="modelValue > max || modelValue < min"
    class="error"
  >
    Min: {{props.min}} and Max: {{props.max}}
  </span>
</div>
</template>

<style scoped lang="scss">
.number-input-wrapper {
  position: relative;
  margin-bottom: 10px;
  label {
    @include body-2;
    color: transparentize($brand-navy, 0.6);
    display: block;
    margin-bottom: 8px;
  }
  input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
    border: 0;
    padding: 16px 38px 16px 16px;
    @include body-1;
    font-family: inherit;
    background-color: $brand-white-smoke;
    border-radius: 10px;
    box-sizing: border-box;
    width: 100%;
    cursor: pointer;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    &:focus {
      outline: none;
    }
  }
  button.up,
  button.down {
    appearance: none;
    border: 0;
    background-color: transparent;
    line-height: 1;
    padding: 6px 15px;
    max-height: 25px;
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 5;
    opacity: 0.25;
    cursor: pointer;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
  button.up {
    bottom: 25px;
    padding: 10px 15px 2px;
  }
  button.down {
    padding: 2px 15px 10px;
  }
  span.error {
    position: absolute;
    left: 5px;
    bottom: -18px;
    @include body-3;
    color: $brand-begonia;
  }
}

@media screen and (max-width: 570px) {
  .number-input-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    label, input[type="number"] {
      flex: 1 1 0px;
    }
    label {
      margin-bottom: 0;
    }
  }
}
</style>
