<template>
  <div class="layui-form layui-form-pane layui-tab-item layui-show">
    <div class="layui-form-item">
      <div class="avatar-add">
        <p>建议尺寸168*168，支持jpg、png、gif，最大不能超过50KB</p>
        <label for="pic" class="layui-btn upload-img">
          <i class="layui-icon">&#xe67c;</i>上传头像
          <input
            type="file"
            id="pic"
            accept="image/gif,image/jpg,image/png"
            @change="fileChange"
          />
        </label>
        <img :src="pic" />
        <button
          class="layui-btn upload"
          :class="{ 'layui-btn-disabled': !file }"
          @click="upload"
        >
          开始上传
        </button>

        <span class="loading"> </span>
      </div>
    </div>
  </div>
</template>

<script>
import { uploadImg } from "../../../axios/user";
export default {
  name: "set-avater",
  data() {
    return {
      pic: this.$store.state.userInfo.pic,
      file: "",
    };
  },
  methods: {
    //文件的预览
    fileChange(e) {
      let file = e.target.files[0];
      let size = file.size / 1024;
      //控制大小
      if (size > 50) {
        this.$alert({
          AType: "warning",
          message: "文件大小不能超过50kb",
        });
        return;
      }
      this.file = file;
      //预览效果
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pic = reader.result;
      };
    },
    //文件上传
    async upload() {
      let formdata = new FormData();
      if (!this.file) return;
      formdata.append("file", this.file);
      try {
        let res = await uploadImg(formdata);
        if (res.status === 200) {
          this.$alert({
            AType: "success",
            message: "上传成功",
          });
          this.file = "";
          let userInfo = this.$store.state.userInfo;
          userInfo.pic = res.data.pic;
          this.$stroe.commit("setUserInfo", userInfo);
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

<style scoped lang="scss">
#pic {
  display: none;
}
.upload {
  position: absolute;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 10px;
}
</style>
