<template>
  <div class="x-login-wrap" >
    <el-form
      class="login"
      ref="form"
      :model="form"
      label-width="80px"
      @submit.native.prevent>
      <el-form-item label="用户名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          type="primary"
          @click="login(form)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'Admin',
  data() {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    async login(form) {
      const auth = await axios.post(this.$route.fullPath, form)
      const { status, message } = auth
      if (status === 401) {
        const h = this.$createElement;
        this.$notify({
          title: '错误',
          message: h('i', { style: 'color: teal'}, message),
          type: 'error'
        });
      } else {
        this.$router.push('/admin/list')
      }
    }
  }
}
</script>

<style>
.x-login-wrap {
  height: 726px;
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

