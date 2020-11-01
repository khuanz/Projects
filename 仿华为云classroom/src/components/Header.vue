<template>
  <header class="header">
    <div class="logo"></div>
    <div id="navBox" class="clearfix">
      <div :id="'navBox'+i" v-for="(item,i) in navlist" :key="item.id" >
        <router-link :to="item.link">
        {{item.name}}
        </router-link>
        </div>
    </div>
    <div class="rightBox">
      <a id="btnReset">教学平台</a>
      <ul>
        <li id="goLogin">登陆</li>
        <li id="goRegister">注册</li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      navlist: [
        { name: '首页', link: '/home' },
        { name: '鲲鹏教育中心',link: '/'  },
        { name: 'MOOC课程', link: '/cloudclassroom' },
        { name: '培训认证' ,link: '/' },
        { name: '在线实验' ,link: '/' },
        { name: '教学市场',link: '/'  },
        { name: '新工科试验班',link: '/'  },
        { name: '学习交流' ,link: '/' },
      ],
    }
  },
  name: 'Header',
}
</script>

<style>
.header {
  position: fixed;
  z-index: 100;
  background-color: #fff;
  display: flex;
  align-items: center;
  height: 60px;
  width: 100%;
  padding: 0 40px;
  border-bottom: 1px solid #eee;
}
.logo {
  width: 120px;
  height: 40px;
  background-image: url(../assets/logo.png);
  background-size: 100% 100%;
}
#navBox {
  margin-left: 40px;
}
#navBox div{
  float: left;
  margin-right: 26px;
}
#navBox a {
  text-decoration: none;
  font-size: 1vw;
  color: #293040;
  line-height: 32px;
}
#navBox a.router-link-exact-active {
  color: #5e7ce0;
}

#navBox a:hover {
  color: #5e7ce0;

}
.rightBox {
  display: flex;
  align-items: center;
  margin-left: auto;
  line-height: 59px;
  height: 100%;
}
#btnReset {
  min-width: 98px;
  margin-right: 30px;
  padding: 0 20px;
  height: 30px;
  line-height: 30px;
  color: #293040 !important;
  background: #fafafa !important;
  border: 1px solid #e3e5e9 !important;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.05) !important;
  border-radius: 20px;
  font-size: 14px;
}
#goRegister::before {
  content: '|';
  margin: 0 16px;
}
ul li{
  display: inline-block;
  font-size: 14px;
}
</style>
