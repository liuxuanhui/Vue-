<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}物品</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
            <el-input v-model="message.name"></el-input>
        </el-form-item>
        <el-form-item label="图标">
          <!-- action表示发送给后端接口，让其保存图片(字段名为file)，并把图片的地址返回 -->
            <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" 
              :show-file-list="false" :on-success="afterUpload" :headers="getAuthHeaders()">
              <img v-if="message.icon" :src="message.icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
      if (this.Id) {  //编辑分类
        res = await this.$http.put(`rest/items/${this.Id}`, this.message)
      } else {                //新建分类
        res = await this.$http.post('rest/items', this.message)
      }
      this.$router.push('/items/list')  //跳转到分类列表页面
      this.$message({ //element-ui提供的
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.Id}`)
      this.message = res.data
    },
    afterUpload(res){
      this.$set(this.message, 'icon', res.url)
    }
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #000;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  min-width: 5rem;
  height: 5rem;
  line-height: 5rem;
  text-align: center;
}
.avatar {
  min-width: 5rem;
  height: 5rem;
  display: block;
}
</style>