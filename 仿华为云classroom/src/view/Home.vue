<template>
  <el-container>
    <el-main>
      <div class="swiperWrap" @mouseenter="s_enter" @mouseleave="s_leave">
        <swiper
          ref="mySwiper"
          :options="swiperOptions"
          :key="parseInt(new Date())"
        >
          <swiper-slide v-for="banner in banners" :key="banner.id">
            <a :href="banner.href" target="_blank">
              <img :src="banner.url" :alt="banner.title" />
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
      <div class="main-layout">
        <section class="banner-box">
          <div class="banner-box-left">
            Classroom是基于华为云的云上软件教学服务，支持高校师生实现备课、上课、作业、考试、实验、实训等全教学流程的线上教学，提供多类习题自动判题、企业级DevOps实训、免费在线习题库等众多高级特性辅助进行数字化教学转型。
          </div>
          <a href="#" class="btn-start">开始上课</a>
        </section>
        <section class="class-item">
          <ClassList :list="classList" :flag="true">
            <template slot="card-box">
              <div
                class="card-box"
                v-for="item in classList.item"
                :key="item.id"
              >
                <div class="card-bac"></div>
                <div>
                  <div class="card-info">
                    <div class="info-top">
                      <div class="card-name">{{ item.name }}</div>
                      <div class="card-mini">
                        <span>
                          <i class="card-icon"></i>
                          {{ item.username }}
                        </span>
                        <span>
                          <i class="card-icon"></i>
                          {{ item.scrollname }}
                        </span>
                        <span class="card-time">{{ item.time }}</span>
                      </div>
                    </div>
                    <div class="info-mid">{{ item.description }}</div>
                    <div class="box-line"></div>
                    <div class="info-bottom">
                      <span class="xs-btn">限时免费</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lm-box">
                <span class="lm-btn">查看更多></span>
              </div>
            </template>
          </ClassList>
        </section>
      </div>
      <div class="mark-layout">
        <section class="mark-item">
          <ClassList :list="markList" :flag="true">
            <template slot="card-box">
              <div
                class="card-box"
                v-for="item in markList.item"
                :key="item.id"
              >
                <div class="card-bac"></div>
                <div>
                  <div class="card-info">
                    <div class="info-top">
                      <div class="card-name">{{ item.name }}</div>
                      <div class="card-mini">
                        <span>
                          <i class="card-icon"></i>
                          {{ item.username }}
                        </span>
                        <span>
                          <i class="card-icon"></i>
                          {{ item.scrollname }}
                        </span>
                        <!--<span class="card-time">{{item.time}}</span>-->
                      </div>
                    </div>
                    <div class="info-mid">{{ item.description }}</div>
                    <div class="box-line"></div>
                    <div class="info-bottom">
                      <span class="xs-btn">限时免费</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="lm-box">
                <span class="lm-btn">查看更多></span>
              </div>
            </template>
          </ClassList>
        </section>
      </div>
      <section class="notice-item">
        <Notice :list="noticeList">
          <template slot="item" slot-scope="props">
            <div class="activity-bac"></div> 
            <div>
              <div class="activity-name">{{ props.item.title }}</div>
              <div class="card-mini">{{ props.item.username }}|{{ props.item.time }}</div>
            </div>
          </template>
        </Notice>
      </section>
    </el-main>
  </el-container>
</template>

<script>
import VueAwesomeSwiper from "vue-awesome-swiper";
import ClassList from "../components/ClassList";
import Notice from "../components/Notice";
export default {
  name: "Home",
  components: {
    ClassList,
    Notice,
    // swiper,
    // swiperSlide
    VueAwesomeSwiper,
  },
  data() {
    return {
      banners: [
        {
          id: 0,
          title: "banner0",
          url:
            "https://res.devcloud.huaweicloud.com/obsdevui/diploma/8.1.17.002/banner-2.64b1407e7a8db89d6cf2.jpg",
          href: "https://bbs.huaweicloud.com/forum/thread-39737-1-1.html",
        },
        {
          id: 1,
          title: "banner1",
          url:
            "https://res.devcloud.huaweicloud.com/obsdevui/diploma/8.1.24.002/banner-4.4ac0f6534a11844638e4.jpg",
          href:
            "https://developer.huaweicloud.com/activity/full-stack/web-developer.html",
        },
        {
          id: 2,
          title: "banner2",
          url:
            "https://res.devcloud.huaweicloud.com/obsdevui/diploma/8.1.24.002/banner-10.30eaaf519fa37bf97d36.jpg",
          href:
            "https://classroom.devcloud.huaweicloud.com/joinclass/51f29987ab234b3993f54e834a247faf/1",
        },
        {
          id: 3,
          title: "banner3",
          url:
            "https://res.devcloud.huaweicloud.com/obsdevui/diploma/8.1.17.002/banner-8.d14241daf518717981c6.jpg",
          href:
            "https://developer.huaweicloud.com/activity/full-stack/java-developer.html",
        },
      ],
      swiperOptions: {
        loop: true,
        // 设定初始化时slide的索引
        // initialSlide: 0,
        // 自动播放
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        },
        // 修改swiper自己或子元素时，自动初始化swiper
        observer: true,
        // 修改swiper的父元素时，自动初始化swiper
        observeParents: true,
        // 滑动速度
        speed: 1000,
        // 滑动方向
        direction: "horizontal",
        // 小手掌抓取滑动
        grabCursor: true,
        // 分页器设置
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      },
      classList: {
        name: "云课堂",
        description: "免费精品公开课，覆盖丰富知识点、课件与在线习题",
        item: [
          {
            id: 1,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 2,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 3,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 4,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 5,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 6,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
        ],
      },
      markList: {
        name: "教学市场",
        description: "丰富教学资源辅助高效教学，免费习题库一键获取",
        item: [
          {
            id: 1,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 2,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 3,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 4,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 5,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
          {
            id: 6,
            name: "区块链精品实践课",
            username: "Classroom",
            scrollname: "华为云",
            time: "6小时",
            description:
              "本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。",
          },
        ],
      },
      noticeList: {
        name: "活动公告",
        item: [
          {
            id: 1,
            title: "大连理工大学与华为软件工程大师华山论剑，邀您参与。",
            username: "Classtoom",
            time: "2020/02/07",
            src: require("../../static/notices_bg.png"),
          },
          {
            id: 2,
            title: "大连理工大学与华为软件工程大师华山论剑，邀您参与。",
            username: "Classtoom",
            time: "2020/02/07",
            src: require("../../static/notices_bg.png"),
          },
          {
            id: 3,
            title: "大连理工大学与华为软件工程大师华山论剑，邀您参与。",
            username: "Classtoom",
            time: "2020/02/07",
            src: require("../../static/notices_bg.png"),
          },
          {
            id: 4,
            title: "大连理工大学与华为软件工程大师华山论剑，邀您参与。",
            username: "Classtoom",
            time: "2020/02/07",
            src: require("../../static/notices_bg.png"),
          },
          {
            id: 5,
            title: "大连理工大学与华为软件工程大师华山论剑，邀您参与。",
            username: "Classtoom",
            time: "2020/02/07",
            src: "../../static/notices_bg.png",
          },
        ],
      },
    };
  },
  computed: {
    mySwiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  methods: {
    s_enter() {
      this.mySwiper.autoplay.stop();
    },
    s_leave() {
      this.mySwiper.autoplay.start();
    },
  },
};
</script>

<style>
.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
}
.swiper-slide img {
  width: 100%;
}
.swiper-pagination-bullets {
  bottom: 50px !important;
}
swiper-pagination-bullet-active {
  width: 20px !important;
  border-radius: 10px !important;
}
.main-layout {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  margin: 0 auto;
}
.banner-box {
  display: flex;
  flex-wrap: nowrap;
  padding: 30px;
  position: relative;
  top: -25px;
  z-index: 2;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(41, 48, 64, 0.1);
  border-radius: 5px;
  align-items: center;
}
.banner-box-left {
  flex: 1;
  padding-right: 40px;
  color: #5e6678;
  line-height: 32px;
}
.btn-start {
  padding: 0 20px;
  height: 32px;
  color: #fff;
  line-height: 32px;
  background-color: #5e7ce0;
  white-space: nowrap;
  border-radius: 18px;
}
.class-item {
  width: 100%;
}
.card-box .card-bac {
  background-image: url(../../static/cd_bg.png);
}
.card-box:nth-child(2) .card-bac {
  background-position: 0px -200px;
}
.card-box:nth-child(3) .card-bac {
  background-position: 0px -400px;
}
.card-box:nth-child(4) .card-bac {
  background-position: 0px -600px;
}
.card-box:nth-child(5) .card-bac {
  background-position: 0px -800px;
}
.card-box:nth-child(6) .card-bac {
  background-position: 0px -1000px;
}


.activity-bac {
  width: 160px;
  height: 96px;
  margin-right: 30px;
  background-image: url(../../static/notices_bg.png);
}

.activity-card:nth-child(2) .activity-bac {
  background-position: 0px -96px;
}
.activity-card:nth-child(3) .activity-bac  {
  background-position: 0px -192px;
}
.activity-card:nth-child(4) .activity-bac  {
  background-position: 0px -288px;
}
.activity-card:nth-child(5) .activity-bac  {
  background-position: 0px -384px;
}

.activity-name {
  padding-bottom: 40px;
  font-size: 20px;
  color: #293040;
}
.mark-item .card-box:nth-child(1) .card-bac {
  background-position: 0px -1200px;
}
.mark-item .card-box:nth-child(2) .card-bac {
  background-position: 0px -1400px;
}
.mark-item .card-box:nth-child(3) .card-bac {
  background-position: 0px -1600px;
}

.mark-item .card-box:nth-child(4) .card-bac {
  background-position: 0px -1800px;
}
.mark-item .card-box:nth-child(5) .card-bac {
  background-position: 0px -2000px;
}
.mark-item .card-box:nth-child(6) .card-bac {
  background-position: 0px -2200px;
}
.mark-layout {
  padding: 0 calc((100% - 1200px) / 2);
  background-color: #fafafa;
}

.mark-item {
  width: 1200px;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 60px;
  margin-top: 60px;
}
.notice-item {
  width: 100%;
}
</style>
