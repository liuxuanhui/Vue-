const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: { type: String },
  //密码的加密是后端处理的  
  password: {
    type: String,
    set(val) { //set本来是填什么就保存什么  
      //使用散列  npm i bcryptjs  安装bcrypt模块用于做密码的散列
      //val是生成的散列值  第二个参数是加密指数 指数越高越安全，但越耗时 一般10~12较为合理 
      return require('bcryptjs').hashSync(val, 10)
    },
    select: false,     //这个作用会隐藏密码并且不会加密已经加密的密码 
    
  },
})

module.exports = mongoose.model('AdminUser', schema)