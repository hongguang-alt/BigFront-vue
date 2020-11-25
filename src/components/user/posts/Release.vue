<template>
  <table class="layui-table">
    <!-- <colgroup>
      <col width="150" />
      <col width="200" />
      <col />
    </colgroup> -->
    <thead>
      <tr>
        <th>帖子名称</th>
        <th>作者</th>
        <th>时间</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>人生就像是一场旅行</td>
        <td>闲心</td>
        <td>2016-11-29</td>
        <td>
          <button class="layui-btn layui-btn-danger layui-btn layui-btn-xs">
            删除
          </button>
          <button class="layui-btn layui-btn-normal layui-btn layui-btn-xs">
            编辑
          </button>
        </td>
      </tr>
      <tr>
        <td>爱的供养</td>
        <td>天道酬勤</td>
        <td>2016-11-29</td>
        <td>
          <button class="layui-btn layui-btn-danger layui-btn layui-btn-xs">
            删除
          </button>
          <button class="layui-btn layui-btn-normal layui-btn layui-btn-xs">
            编辑
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "post-release",
};
</script>

<style></style>
