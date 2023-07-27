<script setup>
import {computed, ref} from "vue";

const props = defineProps({
  duration: {
    type: Number,
    required: true,
  }
});

const timerRunning = ref(false);

const timer = computed(() => {
  const minutes = props.duration / 60;
  const remainingSeconds = props.duration % 60;
  return `${appendOrPrependZero(minutes)}:${appendOrPrependZero(remainingSeconds)}`;
})
const buttonText = computed(() => {
  return timerRunning.value ? 'pause' : 'start';
});

function appendOrPrependZero(value) {
  return value < 10 ? `0${value}` : value;
}
</script>

<template>
  <div class="pomodoro-wrapper">
    <div class="pomodoro-dial">
      <svg>
        <circle cx="170" cy="170" r="164" :stroke-dashoffset="`calc(1031px - (1031px * ${duration}) / 100)`"></circle>
      </svg>
      <h1>{{ timer }}</h1>
      <h4>{{ buttonText }}</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pomodoro-wrapper {
  width: 410px;
  height: 410px;
  border-radius: 410px;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  box-shadow: 50px 50px 100px 0 #121530, -50px -50px 100px 0 #272C5A;
  @include center-aligned-child;
  margin: 0 auto 60px;
  .pomodoro-dial {
    width: 366px;
    height: 366px;
    border-radius: 366px;
    background: $brand-navy-darker;
    @include center-aligned-child;
    position: relative;
    svg {
      position: absolute;
      width: 340px;
      height: 340px;
      transform: rotate(-90deg);
      cursor: pointer;
      z-index: 5;
      circle {
        fill: none;
        stroke: $brand-orange;
        stroke-width: 11;
        stroke-linecap: round;
        //stroke-dashoffset: 1031px;
        stroke-dasharray: 1031px;
        transition: stroke-dashoffset 0.3s ease-in-out;
      }
    }
    h1 {
      @include heading-1;
    }
    h4 {
      @include heading-4;
      position: absolute;
      bottom: 90px;
    }
  }
}
</style>
