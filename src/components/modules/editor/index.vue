<template>
  <div class="edit-wrap">
    <div class="layui-form-item layui-form-text">
      <div class="layui-input-block">
        <div class="layui-unselect fly-edit" ref="icons">
          <!-- 表情 -->
          <span @click="choose(0)">
            <i class="iconfont icon-yxj-expression"></i>
          </span>
          <span @click="choose(1)">
            <i class="iconfont icon-tupian"></i>
          </span>
          <span @click="choose(2)">
            <i class="iconfont icon-lianjie"></i>
          </span>
          <span class="quote" @click="choose(3)">”</span>
          <span @click="choose(4)">
            <i class="iconfont icon-emwdaima"></i>
          </span>
          <span @click="addHr">hr</span>
          <span @click="choose(5)">
            <i class="iconfont icon-yulan1"></i>
          </span>
        </div>
        <textarea
          id="edit"
          class="layui-textarea fly-editor"
          name="content"
          ref="textEdit"
          v-model="content"
          @blur="handleBlur"
          @focus="handleFoc"
        ></textarea>
      </div>
    </div>
    <div ref="model">
      <face
        :isShow="current === 0"
        @closeEvent="closeModal()"
        @addEvent="addFace"
      ></face>
      <upload-img
        :isShow="current === 1"
        @closeEvent="closeModal()"
        @addEvent="addImg"
      ></upload-img>
      <add-link
        :isShow="current === 2"
        @closeEvent="closeModal()"
        @addEvent="addLink"
      ></add-link>
      <quote
        :isShow="current === 3"
        @closeEvent="closeModal()"
        @addEvent="addquote"
      />
      <mycode
        :isShow="current === 4"
        @closeEvent="closeModal()"
        @addEvent="addcode"
        :width="codeWidth"
        :height="codeHeight"
      />
      <preview
        :isShow="current === 5"
        :content="content"
        @closeEvent="closeModal()"
      />
    </div>
  </div>
</template>

<script>
import Face from "./Face";
import UploadImg from "./UploadImg";
import Quote from "./Quote";
import AddLink from "./AddLink";
import Code from "./Code";
import Preview from "./Preview";
export default {
  components: {
    Face,
    UploadImg,
    Quote,
    AddLink,
    mycode: Code,
    Preview,
  },
  name: "edit",
  updated() {
    this.$emit("updateContent", this.content);
  },
  data() {
    return {
      content: "",
      current: -1,
      codeWidth: 400,
      codeHeight: 200,
      pos: 0,
    };
  },
  mounted() {
    //全局方法
    this.$nextTick(() => {
      document.body.addEventListener("click", this.listen);
    });
    this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
    this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
    window.addEventListener("resize", () => {
      this.codeWidth = this.$refs.textEdit.offsetWidth - 60;
      this.codeHeight = this.$refs.textEdit.offsetHeight - 80;
    });
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.listen);
  },
  methods: {
    choose(index) {
      this.current = index;
    },
    closeModal() {
      this.current = -1;
    },
    addFace(item) {
      let val = ` face${item}`;
      this.insert(val);
      this.pos += val.length;
    },
    addImg(item) {
      let val = ` img[${item}]`;
      this.insert(val);
      this.pos += val.length;
    },
    addLink(item) {
      let val = ` a(${item})[${item}]`;
      this.insert(val);
      this.pos += val.length;
    },
    addquote(item) {
      let val = ` \n[quote]\n${item}\n[/quote]`;
      this.insert(val);
      this.pos += val.length;
    },
    addcode(item) {
      let val = ` \n[pre]\n${item}\n[/pre]`;
      this.insert(val);
      this.pos += val.length;
    },
    addHr() {
      this.insert("\n[hr]");
      this.pos += 5;
    },
    handleBlur() {
      this.getPos();
    },
    handleFoc() {
      this.getPos();
    },
    getPos() {
      let cursorPos = 0;
      let dom = document.getElementById("edit");
      if (document.selection) {
        // IE
        let selectRange = document.selection.createRange();
        selectRange.moveStart("character", -dom.value.length);
        cursorPos = selectRange.text.length;
      } else if (dom.selectionStart || dom.selectionStart === "0") {
        cursorPos = dom.selectionStart;
      }
      this.pos = cursorPos;
    },
    insert(val) {
      if (typeof this.content === "undefined") {
        return;
      }
      let newContent = JSON.parse(JSON.stringify(this.content));
      newContent = newContent.split("");
      newContent.splice(this.pos, 0, val);
      this.content = newContent.join("");
    },
    listen(e) {
      e.stopPropagation();
      let dom = this.$refs.model;
      let icons = this.$refs.icons;
      if (!dom || !icons) {
        return;
      }
      if (!icons.contains(e.target)) {
        if (!dom.contains(e.target)) {
          this.closeModal();
        }
      }
    },
  },
};
</script>

<style>
.fly-editor {
  height: 260px;
}
.quote {
  font-size: 22px;
  vertical-align: middle;
  position: relative;
  top: 4px;
}
.edit-wrap {
  position: relative;
}
.edit-content {
  position: absolute;
  top: 45px;
  left: 0;
  z-index: 100;
  background: #fff;
}
.icon-emwdaima {
  position: relative;
  top: 2px;
}
.layui-layer-prompt {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
@keyframes bounce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.01);
  }
  100% {
    transform: scale(1);
  }
}
.fade-enter-active {
  animation: bounce 0.2s;
}
.fade-leave-active {
  animation: bounce 0.2s reverse;
}
</style>
