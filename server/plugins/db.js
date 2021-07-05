module.exports = app => {
    const mongoose = require('mongoose');
    //连接数据库   并创建王者数据库
    mongoose.connect('mongodb://localhost:27017/WangZhe', {useNewUrlParser: true})

    //在数据库中用到了各种关联  有时候用A模型 也用B模型  如果没有引用B模型，可能会报错
    //所以一般情况下 在数据库模块里面首先把所有模型引用一遍
    //npm i require-all  作用：把指定文件夹下的所有文件引用进来  当然这里也可以手动一个个引入
    // require('require-all')(__dirname + '/../models')
}