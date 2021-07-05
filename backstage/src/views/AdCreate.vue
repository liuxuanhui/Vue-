<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}广告位</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="名称">
            <el-input v-model="message.name"></el-input>
        </el-form-item>

        <el-form-item label="广告">
          <el-button size="small" @click="message.items.push({})">
            <i class="el-icon-plus"></i> 添加广告
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="24" v-for="(item, i) in message.items" :key="i">
              <el-form-item label="跳转链接 (URL)" style="margin-top: 1rem;">
                <el-input v-model="item.url"></el-input>
              </el-form-item>

              <el-form-item label="图片" style="margin-top: 0.5rem;">
                <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'"
                  :show-file-list="false" :on-success="res => $set(item, 'image', res.url)"
                  :headers="getAuthHeaders()">
                  <img v-if="item.image" :src="item.image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              
              <el-form-item>
                <el-button size="small" type="danger" @click="message.items.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
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
      message: {
        items: []
      },  
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
        res = await this.$http.put(`rest/ads/${this.Id}`, this.message)
      } else {                //新建分类
        res = await this.$http.post('rest/ads', this.message)
      }
      this.$router.push('/ads/list')  //跳转到分类列表页面
      this.$message({ //element-ui提供的
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.Id}`)
      this.message = Object.assign({}, this.model, res.data)
    },
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