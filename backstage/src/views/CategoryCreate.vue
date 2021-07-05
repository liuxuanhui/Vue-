<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="上级分类">
          <el-select v-model="message.parent" placeholder="请选择">
            <el-option v-for="item in parents" :key="item._id"
              :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="message.name"></el-input>
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
      parents: [],
    }
  },
  created() {
    this.Id = this.$route.params.id;
    this.Id && this.fetch() //有id才能向后端请求数据
    this.fetchParentOptions()
  },
  methods:{
    async save() {
      let res
      if (this.Id) {  //编辑分类
        res = await this.$http.put(`rest/categories/${this.Id}`, this.message)
      } else {                //新建分类
        res = await this.$http.post('rest/categories', this.message)
      }
      this.$router.push('/categories/list')  //跳转到分类列表页面
      this.$message({ //element-ui提供的
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/categories/${this.Id}`)
      this.message = res.data
    },
    async fetchParentOptions() {
      const res = await this.$http.get(`rest/categories`)
      this.parents = res.data
    }
  }
}
</script>

<style scoped>

</style>