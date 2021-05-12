#coding:utf-8
# 第一行让当前页的中文都以utf-8编码运行
# 导入 lxml 库(负责分析标签结构的), requests库(负责把目标url的网页源代码都请求下来的)  pymysql库(负责链接和操作数据库的)
from lxml import etree
import requests
import pymysql

# 创建数据库链接
db = pymysql.connect(host="localhost", user="root", password="", port=3306, database="xiaou", charset='utf8')
# 创建游标
cursor = db.cursor()

# 在这里填入你要爬取的目标网址
html = requests.get("http://lidongxuwork.gitee.io/lidongxu123/")
# 输入爬取下来的数据编码(标签+内容)
html.encoding = 'utf-8' 
# 获取到根标签
xh = etree.HTML(html.text)
# 从根标签寻找div的class叫..下面的li标签
arr = xh.xpath("//div[@class='category_con']/ul/li")
# 遍历每个li标签
for index, el in enumerate(arr):
    # 获取当前li标签下的a标签里的文本
    contentArr = el.xpath("./a/text()")
    # 标签每组li下拿到的文字
    for index2, theStr in enumerate(contentArr):
        # 编写sql语句
        sql = "INSERT INTO ttt(id, category_name, row) VALUES(null, '"+ theStr + "', '" + str(index2) + "')"
        # 执行SQL语句
        cursor.execute(sql)
        # 必须提交, 才会真正执行到MySQL数据库里(查询则不用commit)
        db.commit()


