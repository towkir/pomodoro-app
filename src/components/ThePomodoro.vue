<script setup>
import { computed, ref, watch } from "vue";

const props = defineProps({
  durationInMinutes: {
    type: Number,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
  },
});

const timerRunning = ref(false);
const localDuration = ref(valueInSeconds(props.durationInMinutes));
const timerCompleted = ref(false);

const durationInSeconds = computed(() => { return valueInSeconds(props.durationInMinutes) })
const timer = computed(() => {
  const minutes = Math.floor(localDuration.value / 60);
  const remainingSeconds = localDuration.value % 60;
  return {
    minutes: appendZero(minutes),
    seconds: appendZero(remainingSeconds),
  }
})
const buttonText = computed(() => {
  if (timerCompleted.value) {
    return 'restart';
  }
  return timerRunning.value ? 'pause' : 'start';
});
const timerProgress = computed(() => {
  return (localDuration.value / durationInSeconds.value) * 100;
});

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
      localDuration.value = valueInSeconds(props.durationInMinutes);
      timerCompleted.value = false;
    }
    theTimer.value = setInterval(countDown, 1000);
  }
  timerRunning.value = !timerRunning.value;
}
function appendZero(value) {
  return value < 10 ? `0${value}` : value;
}

function valueInSeconds(minutes) {
  return minutes * 60;
}

watch(() => props.durationInMinutes, (value) => {
  localDuration.value = valueInSeconds(value);
  timerRunning.value = false;
  clearInterval(theTimer.value);
})
</script>

<template>
  <div class="pomodoro-wrapper">
    <div :class="`pomodoro-dial ${theme} ${font}`" @click="toggleTimer">
      <div class="circular-progress-bar-wrapper">
        <svg viewBox="0 0 340 340" preserveAspectRatio="xMinYMin meet">
          <circle
            cx="170"
            cy="170"
            r="164"
            :stroke-dashoffset="`calc(1031px - (1031px * ${timerProgress}) / 100)`"
          ></circle>
        </svg>
      </div>
      <h1>
        <span class="minutes">{{ timer.minutes }}</span>
        <span class="separator">:</span>
        <span class="seconds">{{ timer.seconds }}</span>
      </h1>
      <h4>{{ buttonText }}</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pomodoro-wrapper {
  max-width: 410px;
  border-radius: 410px;
  background: linear-gradient(315deg, #2E325A 0%, #0E112A 100%);
  box-shadow: 50px 50px 100px 0 #121530, -50px -50px 100px 0 #272C5A;
  margin: 0 auto 60px;
  box-sizing: border-box;
  padding: 22px;
  .pomodoro-dial {
    width: 100%;
    max-width: 366px;
    border-radius: 366px;
    padding: 13px;
    box-sizing: border-box;
    font-family: 'Kumbh Sans', sans-serif;
    background: $brand-navy-darker;
    @include center-aligned-child;
    position: relative;
    .circular-progress-bar-wrapper {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
      padding-bottom: 100%;
      position: relative;
      svg {
        position: absolute;
        top: 0;
        left: 0;
        transform: rotate(-90deg);
        @include hover-and-touch;
        z-index: 5;
        circle {
          fill: none;
          stroke: $brand-begonia; // fallback default
          stroke-width: 11;
          stroke-linecap: round;
          //stroke-dashoffset: 1031px;
          stroke-dasharray: 1031px;
          transition: stroke-dashoffset 0.3s ease-in-out;
        }
      }
    }
    &.begonia {
      svg {
        circle {
          stroke: $brand-begonia;
        }
      }
      &:hover {
        h4 {
          color: $brand-begonia;
        }
      }
    }
    &.teal {
      svg {
        circle {
          stroke: $brand-teal;
        }
      }
      &:hover {
        h4 {
          color: $brand-teal;
        }
      }
    }
    &.purple {
      svg {
        circle {
          stroke: $brand-purple;
        }
      }
      &:hover {
        h4 {
          color: $brand-purple;
        }
      }
    }
    &.sans {
      font-family: 'Kumbh Sans', sans-serif;
    }
    &.serif {
      font-family: 'Roboto Slab', serif;
    }
    &.mono {
      font-family: 'Space Mono', monospace;
    }
    h1 {
      @include heading-1;
      position: absolute;
      min-width: 310px;
      height: 120px;
      span {
        position: absolute;
        &.separator {
          left: 50%;
          transform: translateX(-50%);
        }
        &.minutes {
          text-align: right;
          right: calc(50% + 10px);
        }
        &.seconds {
          text-align: left;
          left: calc(50% + 10px);
        }
      }
    }
    h4 {
      @include heading-4;
      position: absolute;
      bottom: calc(50% - 80px);
      transition: color 0.3s ease-in-out;
    }
  }
}

@media screen and (max-width: 370px) {
  .pomodoro-wrapper {
    .pomodoro-dial {
      h1 {
        font-size: 80px;
        line-height: 100px;
        min-width: 230px;
        height: 100px;
      }
      h4 {
        font-size: 12px;
        line-height: 16px;
        bottom: calc(50% - 60px);
      }
    }
  }
}

@media screen and (max-width: 340px) {
  .pomodoro-wrapper {
    padding: 15px;
    .pomodoro-dial {
      padding: 8px;
    }
  }
}
</style>
