const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  //表示是数据库里面的ObjectId    ref表示关联的模型
  parent: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, 
})

schema.virtual('children', {
  localField: '_id',
  foreignField: 'parent', //外键
  justOne: false,
  ref: 'Category'
})

schema.virtual('newsList', {
  localField: '_id',
  foreignField: 'categories',
  justOne: false,
  ref: 'Article'
})

//导出mongoose的模型   这个模型好像指的是MongoDB中WangZhe的集合
module.exports = mongoose.model('Category', schema)