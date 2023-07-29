<script setup>
defineProps({
  currentMode: {
    type: String,
    required: true,
  },
  modes: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['changeMode']);

function changeMode(mode) {
  emit('changeMode', mode);
}
</script>

<template>
<div class="pomodoro-mode">
  <span
    v-for="mode in modes"
    :key="mode" class="mode"
    :class="{active: mode === currentMode}"
    @click="changeMode(mode)"
  >
    {{mode}}
  </span>
</div>
</template>

<style scoped lang="scss">
.pomodoro-mode {
  background-color: $brand-navy-darker;
  padding: 8px;
  display: inline-block;
  border-radius: 30px;
  margin-bottom: 45px;
  span.mode {
    @include body-1;
    color: $brand-white-ghost;
    display: inline-block;
    padding: 16px 26px;
    border-radius: 30px;
    cursor: pointer;
    opacity: 0.4;
    transition-property: opacity, background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: ease-in-out;
    &:hover {
      opacity: 1;
    }
    &.active {
      color: $brand-navy;
      background-color: $brand-begonia;
      opacity: 1;
    }
  }
}
</style>
