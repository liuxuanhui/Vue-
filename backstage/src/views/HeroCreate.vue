<template>
    <div>
      <h1>{{Id? '编辑': '新建'}}英雄</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
        <el-tabs value="basic" type="border-card">
          <el-tab-pane label="基础信息" name="basic">
            <el-form-item label="名称">
              <el-input v-model="message.name"></el-input>
            </el-form-item>

            <el-form-item label="称号">
              <el-input v-model="message.title"></el-input>
            </el-form-item>

            <el-form-item label="Banner">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL + '/upload'"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(message, 'banner', res.url)">
                <img v-if="message.banner" :src="message.banner" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            
            <el-form-item label="类型">
              <el-select v-model="message.categories" multiple>
                <el-option v-for="item of categories" :key="item._id"
                  :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="难度">
              <el-rate v-model="message.scores.difficult" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
            </el-form-item>
            <el-form-item label="技能">
              <el-rate v-model="message.scores.skills" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
            </el-form-item>
            <el-form-item label="攻击">
              <el-rate v-model="message.scores.attack" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
            </el-form-item>
            <el-form-item label="生存">
              <el-rate v-model="message.scores.survive" :max="9" show-score style="margin-top: 0.6rem"></el-rate>
            </el-form-item>

            <el-form-item label="顺风出装">
              <el-select v-model="message.items1" multiple>
                <el-option v-for="item of items" :key="item._id"
                  :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="逆风出装">
              <el-select v-model="message.items2" multiple>
                <el-option v-for="item of items" :key="item._id"
                  :label="item.name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="使用技巧">
              <el-input type="textarea" v-model="message.usageTips"></el-input>
            </el-form-item>
            <el-form-item label="对抗技巧">
              <el-input type="textarea" v-model="message.battleTips"></el-input>
            </el-form-item>
            <el-form-item label="团战思路">
              <el-input type="textarea" v-model="message.teamTips"></el-input>
            </el-form-item>

            <el-form-item label="头像">
              <el-upload class="avatar-uploader" :action="$http.defaults.baseURL + '/upload'" 
                :show-file-list="false" :headers="getAuthHeaders()"
                :on-success="res => $set(message, 'avatar', res.url)">
                <img v-if="message.avatar" :src="message.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="技能" name="skills">
            <el-button size="small" @click="message.skills.push({})">
              <i class="el-icon-plus"></i> 添加技能
            </el-button>
            <el-row type="flex" style="flex-wrap: wrap">
              <el-col :md="12" v-for="(item, i) in message.skills" :key="i">
                <el-form-item label="名称">
                  <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="图标">
                  <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="res => $set(item, 'icon', res.url)"
                    :headers="getAuthHeaders()"
                  >
                    <img v-if="item.icon" :src="item.icon" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-form-item label="冷却值">
                  <el-input v-model="item.delay"></el-input>
                </el-form-item>
                <el-form-item label="消耗">
                  <el-input v-model="item.cost"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                  <el-input v-model="item.description" type="textarea"></el-input>
                </el-form-item>
                <el-form-item label="小提示">
                  <el-input v-model="item.tips" type="textarea"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button size="small" type="danger" @click="message.skills.splice(i, 1)">删除</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        

        <el-form-item style="margin-top: 1rem">
            <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
    //由于 el-rate的v-model绑定的是message.scores.difficult  
    //message没有scores层级会直接报错   所以这里直接手写scores
      message: {  
        scores: {   
          difficult: 0
        }
      },  
      Id: "",
      categories: [],
      items: []
    }
  },
  created() {
    this.Id = this.$route.params.id;
    this.Id && this.fetch() 
    this.fetchCategories()
    this.fetchItems()
  },
  methods:{
    async save() {
      let res
      if (this.Id) { 
        res = await this.$http.put(`rest/heroes/${this.Id}`, this.message)
      } else {              
        res = await this.$http.post('rest/heroes', this.message)
      }
      this.$router.push('/heroes/list')  
      this.$message({ 
        type: "success",
        message: '保存成功'
      })
    },
    async fetch() {
      const res = await this.$http.get(`rest/heroes/${this.Id}`)
      //还是因为scores的问题  直接赋值会导致scores丢失  也可以用扩展运算符(...this.message,...res.data)
      this.message = Object.assign({}, this.message, res.data)
    },
    async fetchCategories() {
      const res = await this.$http.get(`rest/categories`)
      this.categories = res.data
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`)
      this.items = res.data
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