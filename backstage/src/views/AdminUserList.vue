<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="items">
        <el-table-column prop="_id" label="ID" width="240"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button type="text" size="small" 
            @click="$router.push(`/admin_users/edit/${scope.row._id}`)">编辑</el-button>
            <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() { //获取存在的分类
      const res = await this.$http.get('rest/admin_users')
      this.items = res.data
    },
    remove(row) {   //删除分类
      this.$confirm(`此操作将永久删除 "${row.name}" 分类`, '提示', { //element-ui提供
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then( async () => {
        const res = await this.$http.delete(`rest/admin_users/${row._id}`)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        this.fetch()  //重新获取存在的分类
      })
    }
  }
}
</script>


