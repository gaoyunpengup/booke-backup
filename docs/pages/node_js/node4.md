###  token值的设计,加密与解密
*  后台设计接口的时候,访问的时候带上token的意义在于,防止其他用户在没有注册账户的情况下,访问其他接口. 其次,在长时间没有退出登录的情况下,该登录的账户可以一直操作接口(出于安全的问题)
* 所以,在进行接口设计的时候,需要token的理念.
  * 1.创建token,做为该用户的唯一凭证, 在用户登录到首页的时候,把其登录的id加密为一个token值,
 然后返回给前端,前端把该token值存储到本地, 
  *  2.存储到本地之后,证明该用户凭借此token值和之前登录之后创建的token值进行比较,如果符合,并且时间没有过期,那么就会通过,进行操作接口(利用中间件设置)
  *  3.如果不匹配或者token时间过期,那么就会利用中间件的特点,next(参数) 直接跳过接下来的流程,直接找到最后处理该错误信息的中间件,返回给前端,前端通过这个信息就可以知道token值不匹配,从而进行前端的操作.
#### token设计的理解概括:
*  操作创建token值:
*  创建token利用第三方插件的根本意义在于就是把登录的用户id进行加密处理(因为id是唯一的)
*  通过第三方插件:jsonwebtoken,   引入插件   let jwt = require('jsonwebtoken')
*  调用jst.sign({useId:data[0].id},'xxx'{expiresIn:'2h'})
*  第一个参数设置键值对, key为自定义代表id的名称, value:查询之后的数组中第一个对象中id的值,
*  第二个参数代表token的名称自定义的,
*  第三个参数expiresIn  用来配置过期时间
*  例: let token = 'Bearer ' + jwt.sign({  userId: data[0].id }, 'xxx', { expiresIn:  '2h' });
*  操作解密token值于前端返回来的token值进行比较利用中间件
*  流程:验证token 中间件  next()  -->正确的话继续往下执行或者  next(错误信息)--->返回最后处理错误的中间件,通过第三方中间件解密token:  express-jwt
*  原理是通过token解密,获取的是添加req.user.userID , 解密为该用户在数据库中表的id值 <br>
   所以: token其实就是一个加密id的字符串,
    *  验证token语法:
首先引入第三方模块:   let expressJWT = require ('expressJWT')<br>
 通过中间件app.use() 调用其方法进行解密设置
   * 相当于中间件next(); 里面有参数,证明有错误,那么就会直接跳过后面的处理程序,直接来到最后处理错误的中间件上next({name:"UnauthorizedError"})