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
  }
}
</style>
