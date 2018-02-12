<template>
  <div class="x-login-wrap" >
    <el-form class="login" ref="form" :model="form" label-width="80px">
      <el-form-item label="用户名称">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: 'Blog',
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    login() {
      const h = this.$createElement;
      this.$notify({
        title: '警告',
        message: h('i', { style: 'color: teal'}, '测试消息'),
        type: 'warning'
      });
    }
  }
}
</script>

<style>
.x-login-wrap {
  height: 100%;
  margin-bottom: -80px;
  box-sizing: border-box;
  position: relative;
}
.x-login-wrap .login {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  margin: -150px 0 0 -200px;
}
.x-login-wrap .login .el-button {
  margin-left: 120px;
}
</style>

