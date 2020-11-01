<template>
  <div id="app">
    <Header></Header>
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="router"></router-view>
      </keep-alive>
    </transition>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from "./components/Footer"
import Header from "./components/Header"
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right',
    }
  },
  components:{
    Header,
    Footer
  },
  watch: {
    $route(to, from) {
      let isBack = this.$router.isBack
      if (isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    },
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

*,
:after,
:before {
  box-sizing: border-box;
}
a,
a:active,
a:focus,
a:hover,
a:visited {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
.router{
  padding-top: 60px;
}
.slide-left-enter,
.slide-left-leave-to{
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-enter,
.slide-right-leave-to{
  transform: translateX(-100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-right-enter-active{
  transition:all 0.9s ease;
}

.slide-left-leave-active,
.slide-right-leave-active {
  transform: translateX(100%);
}
</style>
