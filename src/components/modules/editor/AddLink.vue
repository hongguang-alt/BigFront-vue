<template>
  <transition name="fade">
    <div
      class="layui-layer-page layui-layer-prompt edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">请输入合法链接</div>
      <div class="layui-layer-content">
        <input
          type="text"
          class="layui-layer-input"
          id="linkInput"
          v-model="link"
        />
      </div>
      <span class="layui-layer-setwin" @click="cancel()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
      <div class="layui-layer-btn">
        <a class="layui-layer-btn0" @click.prevent="submit()">确定</a>
        <a class="layui-layer-btn" @click.prevent="cancel()">取消</a>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["isShow"],
  data() {
    return {
      link: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("closeEvent");
      this.link = "";
    },
    submit() {
      if (!this.link) {
        this.$pop({ message: "请输入链接", type: "shake" });
        return;
      }
      this.$emit("addEvent", this.link);
      this.cancel();
    },
  },
};
</script>

<style></style>
