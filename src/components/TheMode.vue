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
  theme: {
    type: String,
    required: true,
  },
  font: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['changeMode']);

function changeMode(mode) {
  emit('changeMode', mode);
}
</script>

<template>
<div class="pomodoro-mode" :class="`${theme} ${font}`">
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
  font-family: 'Kumbh Sans', sans-serif;
  background-color: $brand-navy-darker;
  padding: 8px;
  display: inline-block;
  border-radius: 30px;
  margin-bottom: 45px;
  &.begonia {
    span.mode {
      &.active {
        background-color: $brand-begonia;
      }
    }
  }
  &.teal {
    span.mode {
      &.active {
        background-color: $brand-teal;
      }
    }
  }
  &.purple {
    span.mode {
      &.active {
        background-color: $brand-purple;
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
  span.mode {
    @include body-1;
    color: $brand-white-ghost;
    display: inline-block;
    padding: 16px 26px;
    border-radius: 30px;
    @include hover-and-touch;
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

@media screen and (max-width: 570px) {
  .pomodoro-mode {
    span.mode {
      font-size: 12px;
      padding: 14px 18px;
    }
  }
}

@media screen and (max-width: 340px) {
  .pomodoro-mode {
    span.mode {
      padding: 10px;
    }
  }
}
</style>
