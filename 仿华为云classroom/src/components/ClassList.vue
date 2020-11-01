<template>
  <div class="class-box">
    <div class="class-title" v-show="flag">
      <div class="class-name">{{list.name}}</div>
      <div>{{list.description}}</div>
    </div>
    <div class="class-list">
      <slot name="card-box"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['list',"flag"]
}
</script>

<style>
.class-box {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
}
.class-title {
  margin: 30px 0 40px 0;
  width: 100%;
  text-align: center;
}

.class-name {
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 10px;
}

.card-box {
  width: 380px;
  display: inline-block;
  background-color: #fff;
  margin: 0 30px 30px 0;
  border-radius: 12px;
  border: 1px solid #f7f8fa !important;
  box-shadow: 0 4px 16px 0 rgba(124, 142, 227, 0.12);
}

.card-box:hover {
  transform: translateY(-6px) !important;
  transition: all 0.1s ease-out !important;
  box-shadow: 0 16px 20px 0 rgba(124, 142, 227, 0.24);
  z-index: 50 !important;
}

.card-box:nth-child(3n) {
  margin: 0;
}

.card-box .card-bac {
  border-radius: 12px 12px 0 0;
  background-color: #5e7ce0;
  height: 200px;
}

.card-info {
  margin: 20px;
}

.box-line {
  margin-top: 5px;
  border-bottom: 1px solid #ccc;
}

.card-name {
  font-size: 17px;
  font-weight: 700;
}

.card-mini {
  color: #ccc;
  overflow: hidden;
}

.card-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccf;
  border-radius: 50%;
  margin-right: 2px;
}

.card-time {
  border: 1px solid #cccccc;
  border-radius: 10px;
  padding: 0 5px;
  float: right;
}

.info-mid {
  margin-top: 10px;
  width: 100%;
  height: 48px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.info-bottom {
  padding: 10px 0px;
  overflow: hidden;
}

.xs-btn {
  background-color: #fce8e9;
  color: #e41f2b;
  float: right;
  font-size: 14px;
  line-height: 20px;
  padding: 2px 4px;
  border-radius: 2px;
}
.lm-box {
  width: 100%;
  text-align: center;
}
.lm-btn {
  display: inline-block;
  background-color: #fafafa;
  border: 1px solid #e3e4e5;
  padding: 10px 20px;
  border-radius: 20px;
}
</style>
