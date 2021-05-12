## Valine
Valine是一款, 简洁快速的第三方, 无后台的评论系统 <br>
后台数据保存采用的是Leancloud平台存储留言数据 <br>
Vuepress <-> Valine <-> LeanCloud
[Valine官网](https://valine.js.org/quickstart.html)
## 准备工作
集成Valine和Leancloud, 下载valine和leancloud-storage
``` js
npm install valine leancloud-storage vuepress
```
## 修改页面
> 其实我们要基于默认主题, 扩展植入我们评论的vue组件
1. 定义评论组件
需要申请leancloud的APPID等, [leancloud官网](https://leancloud.cn/dashboard/login.html#/signin) <br>
新建.vuepress/components/Valine.vue, 其中代码如下 <br>
> 注意: AppId和AppKey换成你自己的
``` js
<template>
  <section
    class="page"
    style="border-top: 2px solid #eaecef;padding-top:1rem;margin-top:2rem;padding-right:2.5rem"
  >
    <div style="padding-left:2.5rem;">
      <!-- id 将作为查询条件 -->
      <span class="leancloud-visitors" data-flag-title="Your Article Title">
        <em class="post-meta-item-text">阅读量：</em>
        <i class="leancloud-visitors-count"></i>
      </span>
    </div>
    <h3 style="padding-left:2.5rem;">发表评论：</h3>
    <div style="padding-left:2.5rem;" id="vcomments"></div>
  </section>
</template>
 
<script>
export default {
  name: "Valine",
  mounted: function() { // 网页重新刷新加载, 也重新初始化评论组件
    // 修改不同路由页面的配置 区分不同页面的评论
    // require window
    const Valine = require("valine");
    if (typeof window !== "undefined") {
      this.Windows = window;
      this.Windows.AV = require("leancloud-storage");
    }
    this.valine = new Valine();
    this.initValine();
  },
  watch: { // 监听路由改变, 重新初始化评论组件
    $route(to, from) {
      if (from.path != to.path) {
        this.initValine();
      }
    }
  },
  methods: {
    initValine() {
      let path = location.origin + location.pathname;
      document.getElementsByClassName("leancloud-visitors")[0].id = path;
      this.valine.init({
        el: "#vcomments",
        appId: "请填写你自己从leanCloud申请下来的AppID",
        appKey: "请填写你自己从leanCloud申请下来的AppKey",
        placeholder: "如果有好的想法, 还请不吝赐教",
        avatar: "wavatar",
        path: path,
        meta: ["nick", "mail"],
        visitor: true
      });
    }
  }
};
</script>
<style>
  .vsys{
    display: none !important;
  }
</style>
```
2. 继承默认主题
默认主题的代码存放在本地工程此目录中 <br>
/lidongxu_blog/node_modules/@vuepress/theme-default <br>
把目录里的一切复制一份, 放到/lidongxu_blog/docs/.vuepress/theme/下面 <br>
![](/software/Snipaste_2020-06-20_18-57-47.png)
3. 修改布局
因为每个页面都是靠Layout.vue作为模板, 来渲染的每个博客页面, 所以在Layout.vue底部添加Valine组件使用 <br>
在/lidongxu_blog/docs/.vuepress/theme/layouts/Layout.vue中修改: <br>
* Page组件下添加Value评论组件
``` js
<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar
      v-if="shouldShowNavbar"
      @toggle-sidebar="toggleSidebar"
    />
    <div
      class="sidebar-mask"
      @click="toggleSidebar(false)"
    />
    <Sidebar
      :items="sidebarItems"
      @toggle-sidebar="toggleSidebar"
    >
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </Sidebar>
    <Home v-if="$page.frontmatter.home" />
    <Page
      v-else
      :sidebar-items="sidebarItems"
    >
      <template #top>
        <slot name="page-top" />
      </template>
      <template #bottom>
        <slot name="page-bottom" />
      </template>
    </Page>
    <!-- 集成了Valine评论组件 -->
    <Valine v-show="isShowValine"></Valine>
  </div>
</template>
<script>
import Home from '@theme/components/Home.vue'
import Navbar from '@theme/components/Navbar.vue'
import Page from '@theme/components/Page.vue'
import Sidebar from '@theme/components/Sidebar.vue'
import { resolveSidebarItems } from '../util'
export default {
  name: 'Layout',
  components: {
    Home,
    Page,
    Sidebar,
    Navbar
  },
  // js部分修改 (为了防止在首页也渲染评论组件)
  data () {
    return {
      isSidebarOpen: false,
      isShowValine: false,
    }
  },
  watch: {
      $route(to, from) {
        this.isShowValine = to.path !== "/";
      }
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false
    })
    this.isShowValine = this.$router.currentRoute.path !== "/";
  },
  computed: {
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    },
    sidebarItems () {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      )
    },
    pageClasses () {
      const userPageClass = this.$page.frontmatter.pageClass
      return [
        {
          'no-navbar': !this.shouldShowNavbar,
          'sidebar-open': this.isSidebarOpen,
          'no-sidebar': !this.shouldShowSidebar
        },
        userPageClass
      ]
    }
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
    // side swipe
    onTouchStart (e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      }
    },
    onTouchEnd (e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x
      const dy = e.changedTouches[0].clientY - this.touchStart.y
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true)
        } else {
          this.toggleSidebar(false)
        }
      }
    }
  }
}
</script>
```
## 查看效果
重新启动整个项目后, 看到效果如下: <br>
![](/software/Snipaste_2020-06-20_19-07-16.png)
[以上产物-git地址](https://github.com/lidongxuwork126com/vuepress_template.git)