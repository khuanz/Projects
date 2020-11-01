<template>
  <div class="activity-box">
    <!--活动公告区域-->
    <div class="class-title">
      <div class="class-name">{{ list.name }}</div>
    </div>
    <div class="activity-list">
      <div class="activity-card" v-for="item in list.item" :key="item.id">
			<slot name="item" :item="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["list"],
};
</script>

<style>
.activity-card {
  height: 200px;
  /*background-color: red;*/
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.activity-card:last-child {
  margin-bottom: 100px;
}
</style>
