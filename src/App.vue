<script setup>
import ThePomodoro from "@/components/ThePomodoro.vue";
</script>

<template>
  <header>
    <h1>pomodoro</h1>
  </header>

  <main>
    <ThePomodoro :duration="80"/>
  </main>
</template>

<style lang="scss">
@import "@/assets/styles/styles.scss";
</style>

<style lang="scss" scoped>
header {
  padding: 48px;
  h1 {
    text-align: center;
    @include heading-2;
  }
}
</style>
