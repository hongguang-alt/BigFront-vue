<template>
  <div
    class="tips animation"
    v-if="isShow"
    :class="type == 'shake' ? type : ''"
    ref="popRef"
  >
    <div class="contain">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: "pop",
  props: {
    message: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    isShow: {
      type: Boolean,
    },
  },
  watch: {
    isShow(newValue, oldValue) {
      if (newValue !== oldValue && newValue === true) {
        //设置居中的位置
        setTimeout(() => {
          let pop = this.$refs.popRef;
          let height = pop.clientHeight;
          let left = pop.clientLeft;
          pop.style.marginTop = -height / 2 + "px";
          pop.style.marginLeft = -left / 2 + "px";
        }, 0);
        //让组件消失
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      }
    },
  },
};
</script>

<style scoped lang="scss">
@keyframes lrshake {
  0%,
  100% {
    transform: translateY(0);
  }

  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-10px);
  }

  20%,
  40%,
  60%,
  80% {
    transform: translateX(10px);
  }
}

.tips {
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.4);
  padding: 5px;
  color: white;
}
.animation {
  animation-duration: 0.3s;
}
.shake {
  animation-name: lrshake;
}
</style>
