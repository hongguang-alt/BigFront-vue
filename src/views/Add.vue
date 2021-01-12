<template>
  <div class="layui-container fly-marginTop">
    <div class="fly-panel" pad20 style="padding-top: 5px;">
      <div class="layui-form layui-form-pane">
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">添加帖子</li>
          </ul>
          <div
            class="layui-form layui-tab-content"
            id="LAY_ucm"
            style="padding: 20px 0;"
          >
            <div class="layui-tab-item layui-show">
              <ValidationObserver ref="addpostform" v-slot="{ handleSubmit }">
                <form @submit.prevent="handleSubmit(add)">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <ValidationProvider v-slot="v" rules="is_not:请选择">
                      <div class="layui-col-md3">
                        <label class="layui-form-label">专栏</label>
                        <div class="layui-input-block" @click="changeSelect()">
                          <div
                            class="layui-unselect layui-form-select"
                            :class="{ 'layui-form-selected': isSelect }"
                          >
                            <div class="layui-select-title">
                              <input
                                type="text"
                                placeholder="请选择"
                                readonly
                                name="catalog"
                                v-model="catalogs[cataIndex].text"
                                class="layui-input layui-unselect"
                              />
                              <i class="layui-edge"></i>
                            </div>
                            <dl class="layui-anim layui-anim-upbit">
                              <dd
                                v-for="(item, index) in catalogs"
                                :key="'catalog' + index"
                                @click="chooseCatalog(item, index)"
                                :class="{ 'layui-this': index === cataIndex }"
                              >
                                {{ item.text }}
                              </dd>
                            </dl>
                          </div>
                        </div>
                        <span v-if="v.errors[0]" class="err-msg">
                          {{ v.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider v-slot="v" vid="title" rules="required">
                      <div class="layui-col-md8">
                        <label for="L_title" class="layui-form-label"
                          >标题</label
                        >
                        <div class="layui-input-block">
                          <input
                            type="text"
                            id="L_browser"
                            name="title"
                            placeholder="文章标题"
                            v-model="title"
                            autocomplete="off"
                            class="layui-input"
                          />
                        </div>
                        <span v-if="v.errors[0]" class="err-msg">
                          {{ v.errors[0] }}
                        </span>
                      </div>
                    </ValidationProvider>
                  </div>
                  <editor @updateContent="setContent"></editor>
                  <div class="layui-form-item">
                    <div class="layui-inline">
                      <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-inline" style="width: 190px;">
                        <div
                          class="layui-unselect layui-form-select"
                          :class="{ 'layui-form-selected': isSelect_fav }"
                          @click="changeFav()"
                        >
                          <div class="layui-select-title">
                            <input
                              type="text"
                              placeholder="请选择"
                              readonly
                              v-model="favList[favIndex]"
                              class="layui-input layui-unselect"
                            />
                            <i class="layui-edge"></i>
                          </div>
                          <dl class="layui-anim layui-anim-upbit">
                            <dd
                              v-for="(item, index) in favList"
                              :key="'catalog' + index"
                              @click="chooseFav(item, index)"
                              :class="{ 'layui-this': index === favIndex }"
                            >
                              {{ item }}
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <div class="layui-form-mid layui-word-aux">
                        发表后无法更改飞吻
                      </div>
                    </div>
                  </div>
                  <ValidationProvider
                    v-slot="v"
                    vid="code"
                    rules="required|length:4"
                  >
                    <div class="layui-form-item">
                      <label class="layui-form-label">验证码</label>
                      <div class="layui-input-inline">
                        <input
                          name="code"
                          placeholder="请输入验证码"
                          autocomplete="off"
                          class="layui-input"
                          v-model="code"
                        />
                      </div>
                      <div
                        class="layui-form-mid code"
                        @click="changeSvg"
                        v-html="svg"
                      ></div>
                    </div>
                    <div class="err-msg-code err-msg">{{ v.errors[0] }}</div>
                  </ValidationProvider>
                  <div class="layui-form-item">
                    <button class="layui-btn" type="submit">
                      立即发布
                    </button>
                  </div>
                </form>
              </ValidationObserver>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SvgMinxin } from "../utils/svgMinxin";
import Editor from "../components/modules/editor";
import { sendPost } from "../axios/user";
export default {
  components: {
    Editor,
  },
  mixins: [SvgMinxin],
  data() {
    return {
      isSelect: false,
      isSelect_fav: false,
      favIndex: 0,
      cataIndex: 0,
      catalogs: [
        {
          text: "请选择",
          value: "",
        },
        {
          text: "提问",
          value: "ask",
        },
        {
          text: "分享",
          value: "share",
        },
        {
          text: "讨论",
          value: "discuss",
        },
        {
          text: "建议",
          value: "advise",
        },
      ],
      favList: [20, 30, 50, 60, 80],
      title: "",
      content: "",
      code: "",
    };
  },
  methods: {
    changeSelect() {
      this.isSelect = !this.isSelect;
    },
    chooseCatalog(item, index) {
      this.cataIndex = index;
    },
    changeFav() {
      this.isSelect_fav = !this.isSelect_fav;
    },
    chooseFav(item, index) {
      this.favIndex = index;
    },
    clear() {
      this.content = "";
      this.title = "";
      this.favIndex = 0;
      this.cataIndex = 0;
    },
    //发布帖子
    async add() {
      if (this.content === "" || this.content.trim() === "") {
        return this.$pop({
          message: "请输入内容",
          type: "shake",
        });
      }
      let options = {
        catalog: this.catalogs[this.cataIndex].value,
        title: this.title,
        content: this.content,
        fav: this.favList[this.favIndex],
        sid: this.$store.state.codeUuid,
        code: this.code,
      };
      try {
        let res = await sendPost(options);
        if (res.status == 200) {
          this.$alert({
            AType: "success",
            message: "上传成功",
          });
          setTimeout(() => {
            this.clear();
            this.$router.push("/home");
          }, 200);
        } else {
          this.$refs.addpostform.setErrors({
            code: [res.msg],
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    //设置内容
    setContent(content) {
      this.content = content;
    },
  },
};
</script>

<style scoped>
.code {
  margin-top: -20px;
}
</style>
