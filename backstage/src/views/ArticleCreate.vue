<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}文章</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-form-item label="所属分类">
          <el-select v-model="message.categories" multiple>
            <el-option v-for="item in categories" :key="item._id"
              :label="item.name" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题">
            <el-input v-model="message.title"></el-input>
        </el-form-item>
        <el-form-item label="详情">
            <!--富文本编辑器-->
            <Vue-editor v-model="message.body" useCustomImageHandler @image-added="handleImageAdded"></Vue-editor> 
        </el-form-item>
        <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
import { VueEditor } from "vue2-editor";  //富文本编辑器  npm install vue2-editor –save

export default {

  components: { VueEditor },

  data() {
    return {
      message: {},  // 必须是对象，不能是字符串 否则后端无法存入数据库 不知道为啥
      Id: "",
      categories: [],
    }
  },
  created() {
    this.Id = this.$route.params.id;
    this.Id && this.fetch() //有id才能向后端请求数据
    this.fetchCategories()
  },
  methods:{
    async save() {
      let res
      if (this.Id) {  //编辑分类
        res = await this.$http.put(`rest/articles/${this.Id}`, this.message)
      } else {                //新建分类
        res = await this.$http.post('rest/articles', this.message)
      }
      this.$router.push('/articles/list')  //跳转到分类列表页面
      this.$message({ //element-ui提供的
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.Id}`)
      this.message = res.data
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) { //富文本编辑器的图片上传
      const formData = new FormData();  
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  }
}
</script>

<style scoped>

</style>