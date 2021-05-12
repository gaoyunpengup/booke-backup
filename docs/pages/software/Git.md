## 什么是Git
分布式版本控制系统 <br>
多人分别在自己电脑上开发同一个项目, 但是他们要把项目合并到一起, 但是谁改了什么文件需要一一核对, 很麻烦, 所以需要git来帮助我们合并代码, 每个人在电脑里都可以记录这些信息 <br>
![](/software/Snipaste_2020-06-20_19-48-28.png) <br>
1. Git能监控文件变更
2. 合并文件
3. 记录每个提交节点所有文件状态

## Git中央服务器准备
其实git是分布式的, 但是我们一般会专门准备一台git服务器负责同步托管代码的 <br>
1. 准备Git服务器端: 可以使用github.com / gitlab.com / gitee.com / 自己服务器架设(申请一块共享保存代码的地方)
2. 这里我选择gitee.com(国内服务器, 访问快), 注册账号, 新建项目 <br>
    * 给仓库起个名字
    * 公开就是所有人能下载你上传的代码, 私有的团队外的人看不到
    * REDAME.md文件是一个项目介绍文件 <br>
    ![](/software/Snipaste_2020-06-20_20-08-15.png) <br>
3. 得到Git服务器端地址(一般以.git结尾) 例: https://gitee.com/lidongxuwork/ceshi.git
![](/software/Snipaste_2020-06-20_20-09-39.png) <br>

## 本地安装git软件
1. 根据自己操作系统, 下载git软件: [下载地址](https://git-scm.com/downloads) <br>
![](/software/Snipaste_2020-06-20_20-24-13.png) <br>
2. 双击安装后, 验证本机是否安装成功, 在终端中执行
![](/software/Snipaste_2020-06-21_11-52-46.png) <br>
如果显示版本, 就代表安装成功

## 本地暂无项目
本地无git里代码, 想从Git上拉取项目(或者新建项目_建立Git连接)
1. 本地准备一个空文件夹(有隐藏文件存在的不算空文件夹)
2. 克隆Git服务器上的项目代码到本地, 注意这步类似于下载, 所以只需要执行一次即可
` git clone https://gitee.com/lidongxuwork/ceshi.git .`
> 命令解释: git clone git服务器仓库地址 点代表当前终端执行命令所在目录 <br>

![](/software/Snipaste_2020-06-21_11-39-48.png)
![](/software/Snipaste_2020-06-21_12-12-13.png)
这个目录是Git来跟踪管理版本库的，git相关信息都保存在这里(so, 不要随意删除和修改)

## 本地已有项目
1. git init 初始化git环境 (生成一个隐藏的.git文件夹---用于记录git操作信息)
2. git remote add origin https://gitee.com/lidongxuwork/ceshi.git (添加远程仓库的地址)
3. 如果是和线上Git合并, 本地需要先暂存, 提交, 拉取, 推送
``` js
git add .
git commit -m '提交说明'
git pull origin master --allow-unrelated-histories 
// 允许不同的本地git拉取远程git仓库的内容
// (origin是远程仓库的名字, master是一个分支, 指向origin)
git push -u origin master
// -u 作用是把本地和远程origin仓库关联起来
// 下次直接git push就可以了
```
4. push以后可以去远程仓库的网页中查看是否有刚刚推送上来的代码

## .gitignore文件
创建此文件
```js
type nul>.gitignore
```
此文件一般在git项目的根目录上, 来管理哪些文件/文件夹是不需要Git来监测的, 也不会进行提交/合并
``` js
node_modules/

# Editor directories and files
.idea
.vscode
```
效果就是, 当你工程中出现此文件里配置的文件夹/文件, 都不会被git检测, 也不会和别人合并和提交了 <br>
git status查看本地的变更 <br>
![](/software/Snipaste_2020-06-21_19-49-31.png) <br>
发现本地新建的node_modules和隐藏的.idea都没有被检测到