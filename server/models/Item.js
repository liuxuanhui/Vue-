const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  icon: { type: String }
})

//导出mongoose的模型   这个模型好像指的是MongoDB中WangZhe的集合
module.exports = mongoose.model('Item', schema)