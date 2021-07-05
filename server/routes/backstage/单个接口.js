//index.js在此基础上改造成通用接口
module.exports = app => {
    const express = require('express')
    //子路由
    const router = express.Router()
    const Category = require('../../models/Category')   //导入mongoose的模型 

    //当有POST方式请求categories
    router.post('/categories', async (req,res) => {
       //创建数据  数据来源是客户端提交过来的
        const model = await Category.create(req.body)  //需要在server/index中app.use(express.json())
        res.send(model)   //发回给前端 让前端知道创建完成了 状态码200，什么什么的
    })

    //当有GET方式请求categories
    router.get('/categories', async (req,res) => {
        //查询数据   populate是取出关联字段的数据 详情见populate取出关联字段.png
        const items = await Category.find().populate('parent').limit(10)   
        res.send(items)   //发送给前端   前端那边就可以保存数据 this.~ = res.data
    })

    //当有GET方式请求categories/:id时
    router.get('/categories/:id', async (req,res) => {
        const message = await Category.findById(req.params.id)   //通过id查询数据
        res.send(message)   
    })

    //当有PUT方式请求categories/:id
    router.put('/categories/:id', async (req,res) => {
        const model = await Category.findByIdAndUpdate(req.params.id, req.body) //更新数据
        res.send(model)  
    })

    //当有delete方式请求categories/:id
    router.delete('/categories/:id', async (req,res) => {
        await Category.findByIdAndDelete(req.params.id, req.body) //删除数据
        res.send({success: true})   //直接返回一个true就行
    })

    app.use('/backstage/api', router)
}