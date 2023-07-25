<script setup>
defineProps({
  duration: {
    type: Number,
    required: true,
  }
})
</script>

<template>
  <div class="pomodoro-wrapper">
    <div class="pomodoro-dial">
      <svg>
        <circle cx="164" cy="164" r="159" :stroke-dashoffset="`calc(1000px - (1000px * ${duration}) / 100)`"></circle>
      </svg>
      <h1>{{ duration }}</h1>
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
  margin: auto;
  .pomodoro-dial {
    width: 366px;
    height: 366px;
    border-radius: 366px;
    background: $brand-navy-darker;
    @include center-aligned-child;
    h1 {
      @include heading-1;
    }
    svg {
      position: absolute;
      width: 338px;
      height: 338px;
      transform: rotate(-90deg);
      circle {
        fill: none;
        stroke: $brand-orange;
        stroke-width: 14;
        stroke-linecap: round;
        transform: translate(5px, 5px);
        //stroke-dashoffset: 1000px;
        stroke-dasharray: 1000px;
        transition: stroke 0.3s ease-in-out;
      }
    }
  }
}
</style>
