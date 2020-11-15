<template>
  <div>
    <div class="confirm" v-if="isShow">
      <div class="confirm-message">{{ message }}</div>
      <div>
        <button @click="handleOnok" class="left-btn">取消</button>
        <button @click="handleOnCancel" class="right-btn">确定</button>
      </div>
    </div>
    <div class="mask" @click="handleOnCancel" v-if="isShow"></div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      default: "",
    },
    onOk: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleOnok() {
      if (this.onOk) {
        this.onOk();
      }
      this.isShow = false;
    },
    handleOnCancel() {
      if (this.onCancel) {
        this.onCancel();
      }
      this.isShow = false;
    },
  },
};
</script>

<style scoped lang='scss'>
.confirm {
  position: absolute;
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
  width: 300px;
  padding: 20px;
  background: white;
  z-index: 999;
  text-align: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  .confirm-message {
    font-weight: 200;
    margin-bottom: 20px;
    margin-top: 7%;
  }
  button {
    width: 85px;
    height: 30px;
    border: none;
    cursor: pointer;
    &.left-btn {
      background: cornsilk;
      margin-right: 10px;
      &:hover {
        background: darken(cornsilk, 5%);
      }
    }
    &.right-btn {
      background: #009688;
      color: white;
      &:hover {
        background: darken(#009688, 5%);
      }
    }
  }
}
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
}
</style>