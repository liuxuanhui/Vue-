const express = require("express");
const app = express()

//表示给当前express实例上面设置一个变量  比如secret
//但这个值应该放在环境变量中去 不应该保存在代码里  这里只是为了简单的教学，放在这里比较简单一点
app.set('secret', 'lxh18567671780')   

app.use(require('cors')())  //引入跨域模块
app.use(express.json())     //现在可以使用JSON了
//这是托管静态文件  想访问uploads的资源发现访问不了 加上了这个就可以访问了
app.use('/uploads', express.static(__dirname + '/uploads'))

require('./routes/backstage/index')(app);   //执行函数并传参  处理请求
require('./routes/web/index')(app);   //执行函数并传参  处理请求
require('./plugins/db')(app);  //连接并创建数据库


app.listen(3000, ()=>{
    console.log('3000!');
})