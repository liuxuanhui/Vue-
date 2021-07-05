const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  banner: {type: String},
  title: { type: String },
  //写成数组形式，一个英雄可以关联多个分类
  categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Category'}],
  scores: { //难度
    difficult: { type: Number },
    skills: { type: Number },
    attack: { type: Number },
    survive: { type: Number },
  },
  skills: [{  //技能
    icon: { type: String }, //技能图标
    name: { type: String }, //技能名称
    delay: { type: String },
    cost: { type: String },
    description: { type: String },
    // tips: { type: String },
  }],
  items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //顺风出装 与物品关联
  items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Item' }], //逆风出装
  usageTips: { type: String },  //使用技巧
  battleTips: { type: String }, //对抗技巧
  teamTips: { type: String },   //团战思路
  // partners: [{  //英雄关系
  //   hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' }, //英雄关联字段
  //   description: { type: String },
  // }],   
})

//导出mongoose的模型   这个模型好像指的是MongoDB中WangZhe的集合
module.exports = mongoose.model('Hero', schema)