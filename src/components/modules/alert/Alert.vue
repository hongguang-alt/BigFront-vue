<template>
  <div v-bind:class="[{ alert: true }, AType]" v-if="isShow">
    <div class="alert-message">{{ message }}</div>
    <div class="alert-x" @click="handleOnClose">X</div>
  </div>
</template>

<script>
let myTimer;
export default {
  props: {
    AType: {
      type: String,
      default: "success",
    },
    message: {
      type: String,
      default: "",
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  beforeUpdate() {
    if (myTimer) {
      clearTimeout(myTimer);
    }
    myTimer = setTimeout(() => {
      this.isShow = false;
    }, 2000);
  },
  methods: {
    handleOnClose() {
      this.isShow = false;
      if (this.onClose) {
        this.onClose();
      }
    },
  },
};
</script>

<style scoped lang='scss'>
$success: #52c41a !default;
$warning: #fadb14 !default;
$danger: #dc3545 !default;

.alert {
  position: absolute;
  z-index: 999;
  width: 500px;
  height: 40px;
  color: white;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
  top: 45px;
  left: 0;
  right: 0;
  .alert-message {
    flex: 1;
  }
  .alert-x {
    padding: 10px;
    cursor: pointer;
  }
  &.success {
    background: $success;
  }
  &.warning {
    background: $warning;
  }
  &.danger {
    background: $danger;
  }
}
</style>