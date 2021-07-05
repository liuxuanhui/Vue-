//index.js在'单个接口.js'基础上改造成通用接口
module.exports = app => {
    const express = require('express')
    const AdminUser = require('../../models/AdminUser') //管理员模型
    const jwt = require('jsonwebtoken')
    const router = express.Router({
        //由于在app.use定义了参数resource，想要在router中使用，需要加上mergeParams 表示合并参数
        mergeParams: true  
    })

//校验token中间件  授权
    const auth = async(req,res,next) => {
        //注意：authorization  前端首字母是大写  这里小写 会自动对应
        //提取出token 因为传过来的是Bearer {{token}}   以空格分隔成数组并返回最后一个
        const token = String(req.headers.authorization || '').split(' ').pop() 
        if(!token){     //不写这个 会报"jwt must be provided"错误  页面卡死在这里
            //会在backstage/network的响应拦截里面跳转页面 
            return res.status(401).send({    //一般用户身份有问题报401
                message: '请先登录'    
            })
        }
        //校验token 由于我们用id生成的token  就会解析出来id
        const { id } = jwt.verify(token, app.get('secret')) 
        if(!id){
            return res.status(401).send({    
                message: '请先登录'    
            })
        }
        //根据ID查询是否有这个管理员  挂载到req上表示后续也可以使用user这个变量
        req.user = await AdminUser.findById(id)   
        if(!req.user){
            return res.status(401).send({    
                message: '请先登录'    
            })
        }
        await next()
    }

//自动获取模型的中间件
    const auto = async(req,res,next) => {
      //npm i inflection  用于处理单复数、下划线、单词的格式转换
      const modelName = require('inflection').classify(req.params.resource)   //小写复数转换大写单数
      req.Model = require(`../../models/${modelName}`)  //若const Model其他地方拿不到  所以直接req.Model
      next()
    } 

//通用的增删改查接口  引用两个中间件：授权中间件  自动获取模型中间件
    //前缀rest作用：防止污染其他通用接口
    app.use('/backstage/api/rest/:resource', auth, auto, router)


    //创建数据
    router.post('/', async (req,res) => {
        const model = await req.Model.create(req.body)  
        res.send(model)   
    })
    //查询数据  
    router.get('/', async (req,res) => {
        //有的需要关联数据 有的不需要  做一个扩展
        const queryOptions = {}
        if(req.Model.modelName == 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)   
        res.send(items)   
    })
    //查询详情数据
    router.get('/:id', async (req,res) => {
        const message = await req.Model.findById(req.params.id)   
        res.send(message)   
    })
    //更新数据
    router.put('/:id', async (req,res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body) 
        res.send(model)  
    })
    //删除数据
    router.delete('/:id', async (req,res) => {
        await req.Model.findByIdAndDelete(req.params.id, req.body) 
        res.send({success: true})   
    })


//上传功能  引用了授权的中间件
    //express本身获取不到上传文件的数据 所以这里我们需要中间件来专门处理上传数据的  npm i multer
    const multer = require('multer')
    //定义一个中间件 并且执行它   dest表示传到哪里去   __dirname是当前文件绝对位置
    const upload = multer({dest: __dirname + '/../../uploads'})     
    //single表示接收单个文件上传，同时字段名为'file'
    app.post('/backstage/api/upload', auth ,upload.single('file'), async(req,res) =>{
        const file = req.file   //本身express没有req.file  是因为我们用了upload+multer中间件
        //给file添加一个url属性  filename是上传到uploads中生成的名称(不带后缀名)
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })


//登录功能
    /*
        在前端将用户名和密码传过来  在这里校验  校验成功返回给前端token(秘钥)
        让前端保存秘钥  后续通过秘钥来证明是哪一个用户，实现鉴权
    */
   app.post('/backstage/api/login', async(req, res) => {
       const {username, password} = req.body
       //第一步：根据用户名找用户   不能用密码(因为散列过了 同一个密码，每次的散列值都不一样)
       const user = await AdminUser.findOne({ //根据用户名查找  数据已经在AdminUserCreate创建过
           username: username   
        }).select('+password')   //select('+password') 表示把password取出来 见下行注释
        //由于AdminUser模型中设置了select: false 所以正常取是取不出来密码的  
       if(!user){
           return res.status(422).send({    //status设置状态码 
               message: '用户不存在'    //错误会在network统一做处理
           })
       }
    
        //第二步：校验密码
        //导入散列  比较明文和密文是否匹配  返回布尔值  明文是登录页面传过来的 密文是数据库中的
        const isValid = require('bcryptjs').compareSync(password,user.password);
        if(!isValid) {
            return res.status(422).send({
                message: '密码错误'
            })
        }
        
       //第三步：返回token   使用jwt： npm i jsonwebtoken
       //记得先在上面引用jwt  jwt有一个方法(签名:sign) 用来生成token
       /*参数1 需要加密或者说放在token的数据   这里我选择id，也可以是用户名
         参数2  秘钥 根据秘钥算法生成token  客户端不需要秘钥就解出来  
            秘钥用来验证token是否正确(比如客户端是否篡改token之类的 )
            秘钥可以是随便一个字符串 但不能写在这里，应该是一个全局的东西 
            在server/index.js通过app.set设置一个变量 在这app.get获取变量
        注：获取配置的app.get与处理请求的app.get名称相同  所以通过参数来确定是在定义处理请求还是获取配置
        */
       const token = jwt.sign({id:user._id}, app.get('secret'))   
       //如果前端要展示"欢迎谁谁谁",就需要把用户名称也返回
       res.send({token})
   })
}