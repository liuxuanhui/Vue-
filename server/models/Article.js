const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
  title: { type: String },
  body: { type: String }, //详情
}, {
  timestamps: true  //timestamps属性为true  自带创建时间和更新时间
})

module.exports = mongoose.model('Article', schema)