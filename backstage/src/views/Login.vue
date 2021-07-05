<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="message.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="message.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
        
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data(){
    return {
      message: {}
    }
  },
  methods: {
    async login(){
      //校验数据，校验成功后获取token
      const res = await this.$http.post('login', this.message)  
      localStorage.token = res.data.token //永久保存token  
      // sessionStorage.token = res.data.token  //关掉浏览器就没
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style>
.login-card{
  width: 25rem;
  margin: 5rem auto;
}
</style>
