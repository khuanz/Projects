<template>
  <div class="footer">
    <div class="footer-content">
      <div class="clearfix">
        <div
          class="footer-copyright"
        >版权所有 © 华为软件技术有限公司 2020保留一切权利苏ICP备17040376号-32苏B2-20130048号代理域名注册服务机构：新网</div>
        <div class="footer-law">法律声明 隐私政策</div>
      </div>
      <div>苏公网安备 32011402010008号</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style>
.footer {
  width: 100%;
  background: #f3f3f3;
  height: 100px;
}
.footer-content {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
  padding-top: 35px;
  line-height: 20px;
  color:rgba(37,43,58,.7);
  font-size: 14px;
  line-height: 20px;
}
.footer-copyright{
  float: left;
}
.footer-law{
  float: right;
}
</style>
