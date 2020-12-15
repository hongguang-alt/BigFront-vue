<template>
  <transition name="fade" v-show="isShow">
    <div
      class="layui-layer-page layui-layer-border edit-content"
      v-show="isShow"
    >
      <div class="layui-layer-title">插入图片</div>
      <div class="layui-layer-content">
        <ul class="layui-form layui-form-pane">
          <li class="layui-form-item">
            <label class="layui-form-label">URL</label>
            <div class="layui-input-inline">
              <input
                type="text"
                id="fileInput"
                placeholder="粘贴图片地址或者点击上传"
                v-model="pic"
                class="layui-input"
              />
            </div>
            <button type="button" class="layui-btn layui-btn-primary">
              <label for="uploadImg">
                <i class="layui-icon layui-icon-upload"></i>上传图片
              </label>
            </button>
            <input
              type="file"
              name="file"
              id="uploadImg"
              class="layui-upload-file"
              accept="image/*"
              @change="upload"
            />
          </li>
          <li class="layui-form-item" style="text-align:center">
            <button type="button" class="layui-btn" @click="submit()">
              确认
            </button>
          </li>
        </ul>
      </div>
      <span class="layui-layer-setwin" @click.stop="close()">
        <a
          href="javascript:void(0)"
          class="layui-layer-ico layui-layer-close layui-layer-close1"
        ></a>
      </span>
    </div>
  </transition>
</template>

<script>
import { uploadImg } from "../../../axios/user";
export default {
  name: "uploadImg",
  props: ["isShow"],
  data() {
    return {
      pic: "",
    };
  },
  methods: {
    submit() {
      if (!this.pic) {
        this.$pop({ message: "请填入图片地址!", type: "shake" });
        return;
      }
      this.$emit("addEvent", this.pic);
      this.close();
    },
    close() {
      this.$emit("closeEvent");
      this.pic = "";
    },
    async upload(e) {
      let fileList = e.target.files;
      let format = new FormData();
      if (!fileList[0]) return;
      format.append("file", fileList[0]);
      try {
        let res = await uploadImg(format);
        if (res.status === 200) {
          this.$alert({
            AType: "success",
            message: "上传成功",
          });
          this.pic = res.data.pic;
        } else {
          console.log(res.msg);
        }
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style></style>
