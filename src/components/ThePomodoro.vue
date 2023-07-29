<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
  duration: {
    type: Number,
    required: true,
  }
});

const timerRunning = ref(false);
const localDuration = ref(props.duration);
const timerCompleted = ref(false);

const timer = computed(() => {
  const minutes = Math.floor(localDuration.value / 60);
  const remainingSeconds = localDuration.value % 60;
  return `${appendOrPrependZero(minutes)}:${appendOrPrependZero(remainingSeconds)}`;
})
const buttonText = computed(() => {
  if (timerCompleted.value) {
    return 'restart';
  }
  return timerRunning.value ? 'pause' : 'start';
});
const timerProgress = computed(() => {
  return (localDuration.value / props.duration) * 100;
})

const theTimer = ref();
function countDown() {
  if (localDuration.value > 0) {
    localDuration.value -= 1;
  } else {
    clearInterval(theTimer.value);
    timerCompleted.value = true;
    timerRunning.value = false;
  }
}
function toggleTimer() {
  if (timerRunning.value) {
    clearInterval(theTimer.value);
  } else {
    if (timerCompleted.value) {
      localDuration.value = props.duration;
      timerCompleted.value = false;
    }
    theTimer.value = setInterval(countDown, 1000);
  }
  timerRunning.value = !timerRunning.value;
}
function appendOrPrependZero(value) {
  return value < 10 ? `0${value}` : value;
}

watch(() => props.duration, (value) => {
  localDuration.value = value;
  timerRunning.value = false;
  clearInterval(theTimer.value);
})
</script>

<template>
  <div class="pomodoro-wrapper">
    <div class="pomodoro-dial" @click="toggleTimer">
      <svg>
        <circle cx="170" cy="170" r="164" :stroke-dashoffset="`calc(1031px - (1031px * ${timerProgress}) / 100)`"></circle>
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
        stroke: $brand-begonia;
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
