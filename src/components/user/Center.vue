<template>
  <div class="layui-card my-center">
    <div class="layui-card-header">Hai,admin,你已经成为我们的正式会员！</div>
    <div class="layui-card-body">
      <div class="layui-row layui-col-space30 leave-top">
        <div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
          <div class="fly-panel fly-signin">
            <div class="fly-panel-title">
              我的会员信息签到
            </div>
            <div class="fly-panel-main fly-signin-main">
              <p><span>积分经验值：</span>60</p>
              <p><span>您当前为：</span>非VIP</p>
            </div>
          </div>
        </div>

        <div class="layui-col-xs12 layui-col-sm6 layui-col-md6">
          <sign></sign>
        </div>
      </div>
      <div class="layui-card">
        <div class="layui-card-header">快捷方式</div>
        <div class="layui-card-body my-contain">
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
          <div class="my-contain-item">
            <i class="layui-icon layui-icon-heart center-icon"></i>
            <span>修改密码</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sign from "../sidebar/Sign";
export default {
  name: "user-center",
  components: {
    Sign,
  },
};
</script>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  .my-center {
    margin: 20px !important;
  }
}
.my-center {
  margin-left: 230px;
  .leave-top {
    margin-top: 3px;
  }
}
.my-contain {
  display: flex;
  flex-wrap: wrap;
  .my-contain-item {
    display: flex;
    flex-direction: column;
    justify-items: center;
    text-align: center;
    width: 150px;
    margin: 0 10px;
    .center-icon {
      font-size: 30px;
      height: 50px;
      line-height: 50px;
      background-color: #009688;
    }
  }
}
</style>
