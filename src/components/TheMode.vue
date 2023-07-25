<script setup>
import {ref} from "vue";

defineProps({
  currentMode: {
    type: String,
    required: true,
  }
});

const modes = ref(['pomodoro', 'short break', 'long break']);
</script>

<template>
<div class="pomodoro-mode">
  <span v-for="mode in modes" :key="mode" class="mode" :class="{ active: mode === currentMode}">{{mode}}</span>
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
    &.active {
      color: $brand-navy;
      background-color: $brand-orange;
      opacity: 1;
    }
  }
}
</style>
