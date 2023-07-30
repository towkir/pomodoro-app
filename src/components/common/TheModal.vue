<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import VectorIconClose from "@/components/icons/VectorIconClose.vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: 'Modal Title',
  },
  okText: {
    type: String,
    default: 'Okay',
  },
  canPressOk: {
    type: Boolean,
    default: true,
  },
  closeOnEsc: {
    type: Boolean,
    default: true,
  },
  closeOnBackdrop: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['open', 'close', 'ok']);

const visible = ref(false);
const hiding = ref(true);
const showing = ref(false);

function show() {
  visible.value = true;
  setTimeout(() => {
    showing.value = true;
    hiding.value = false;
  }, 0);
  addEventListenerForCloseOnEsc();
  emit('open');
}
function hide() {
  hiding.value = true;
  showing.value = false;
  setTimeout(() => {
    visible.value = false;
    emit('close');
  }, 300);
  removeEventListenerForCloseOnEsc();
}
function onOkay() {
  emit('ok');
}
function handleEsc(e) {
  if (e.keyCode === 27) {
    hide();
  }
}
function handleCloseOnBackdrop(event) {
  if (event.target && event.target.classList.contains('modal-backdrop')
    && props.closeOnBackdrop) {
    hide();
  }
}
function addEventListenerForCloseOnEsc() {
  if (props.closeOnEsc) {
    document.addEventListener('keydown', handleEsc);
  }
}
function removeEventListenerForCloseOnEsc() {
  if (props.closeOnEsc) {
    document.removeEventListener('keydown', handleEsc);
  }
}

function handleModalShowEvent(event) {
  if (event.detail === props.id) {
    show();
  }
}
function handleModalHideEvent(event) {
  if (event.detail === props.id) {
    hide();
  }
}

onMounted(() => {
  window.addEventListener('modal::show', handleModalShowEvent);
  window.addEventListener('modal::hide', handleModalHideEvent);
})
onUnmounted(() => {
  window.removeEventListener('modal::show', handleModalShowEvent);
  window.removeEventListener('modal::hide', handleModalHideEvent);
})
</script>

<template>
  <div
    class="modal-backdrop"
    :class="[visible ? 'visible' : 'hidden', { 'fade-in' : showing, 'fade-out' : hiding }]"
    @click="handleCloseOnBackdrop"
  >
    <div
      class="modal"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        id="modal-title"
        class="modal-header"
      >
        <h3>
          <slot name="header">
            {{ title }}
          </slot>
        </h3>
        <button
          class="btn minimal"
          @click="hide"
        >
          <VectorIconClose />
        </button>
      </div>
      <div
        id="modal-description"
        class="modal-body"
      >
        <slot name="body">
          Modal Body
        </slot>
      </div>
      <div class="modal-footer">
        <slot name="footer">
          <button
            class="btn okay"
            @click="onOkay"
            :disabled="!canPressOk"
          >
            {{ okText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 50;
  background-color: transparentize($brand-backdrop, 0.5);
  transition: opacity 0.3s ease-in-out;
  &.hidden {
    display: none;
  }
  &.visible {
    display: block;
  }
  &.fade-out {
    opacity: 0;
  }
  &.fade-in {
    opacity: 1;
  }
  .modal {
    background-color: $brand-white;
    width: calc(100% - 40px);
    max-width: 540px;
    position: absolute;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
    border-radius: 25px;
    box-sizing: border-box;
    color: $brand-navy-darker;
    .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 40px;
      border-bottom: 1px solid $brand-border;
      h3 {
        @include heading-3;
      }
      .btn {
        padding: 10px;
        margin-right: -10px;
        svg {
          vertical-align: middle;
        }
      }
    }
    .modal-body {
      padding: 30px 40px;
    }
    .modal-footer {
      position: relative;
      padding: 15px 40px;
      .btn.okay {
        @include body-1;
        color: $brand-white;
        background-color: $brand-begonia;
        border-radius: 30px;
        padding: 14px 32px;
        min-width: 140px;
        position: absolute;
        left: 50%;
        top: 100%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>
