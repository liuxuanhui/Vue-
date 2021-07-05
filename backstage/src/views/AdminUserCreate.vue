<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="用户名">
            <el-input v-model="message.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input type="password" v-model="message.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      message: {},  // 必须是对象，不能是字符串 否则后端无法存入数据库 不知道为啥
      Id: "",
    }
  },
  created() {
    this.Id = this.$route.params.id;
    this.Id && this.fetch() //有id才能向后端请求数据
  },
  methods:{
    async save() {
      let res
      if (this.Id) {
        res = await this.$http.put(`rest/admin_users/${this.Id}`, this.message)
      } else {
        res = await this.$http.post('rest/admin_users', this.message)
      }
      this.$router.push('/admin_users/list')  //跳转到分类列表页面
      this.$message({ //element-ui提供的
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.Id}`)
      this.message = res.data
    },
  }
}
</script>

<style scoped>

</style>