import Vue from "vue";
import Router from "vue-router";
import Home from "../view/Home";
import CloudClassRoom from "../view/CloudClassRoom"
Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/home" },
    { path: "/home", component: Home },
    { path: "/cloudclassroom", component: CloudClassRoom }
  ]
});
