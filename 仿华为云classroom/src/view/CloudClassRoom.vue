<template>
  <el-container>
    <el-main>
      <div class="course-header-current-bg">
        <div class="course-header-main">
          <div class="course-header-title">MOOC课程</div>
          <div class="course-header-description">面向师生提供丰富的自学开放课程，轻松实现自我提升。</div>
        </div>
        <div class="course-header-description">面向师生提供丰富的自学开放课程，轻松实现自我提升。</div>
      </div>
      <div class="course-content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            :tabs="tabs"
            v-for="items in tabs"
            :key="items.id"
            :label="items.label"
            :name="items.name"
          >
            <div class="cloud-top">
              <div>全部</div>
              <div>算法与数据结构</div>
              <div>应用开发</div>
              <div>Android</div>
              <div>区块链</div>
              <div>java</div>
              <div>软件测试</div>
              <div>python</div>
            </div>
            <ClassList :list="items">
              <template slot="card-box">
                <div class="course-box impt" v-for="item in items.item" :key="item.id">
                  <div class="course-bac"></div>
                  <div>
                    <div class="course-info">
                      <div class="info-top">
                        <div class="course-name">{{item.name}}</div>
                        <div class="course-mini">
                          <span>
                            <i class="course-icon"></i>
                            {{item.username}}
                          </span>
                          <span>
                            <i class="course-icon"></i>
                            {{item.scrollname}}
                          </span>
                        </div>
                      </div>
                      <div class="info-mid">{{item.description}}</div>
                    </div>
                  </div>
                </div>
              </template>
            </ClassList>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import ClassList from '../components/ClassList.vue'
import Header from '../components/Header'
export default {
  name:"CloudClassRoom",
  components: {
    Header,
    ClassList,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    },
  },
  data() {
    return {
      activeName: 'first',
      classList: {
        name: '云课堂',
        description: '免费精品公开课，覆盖丰富知识点、课件与在线习题',
        item: [
          {
            id: 1,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
          {
            id: 2,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
          {
            id: 3,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
          {
            id: 4,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
          {
            id: 5,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
          {
            id: 6,
            name: '区块链精品实践课',
            username: 'Classroom',
            scrollname: '华为云',
            time: '6小时',
            description:
              '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
          },
        ],
      },
      tabs: [
        {
          id: 1,
          label: '热门课程',
          name: 'first',
          item: [
            {
              id: 1,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 2,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 3,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 4,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 5,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 6,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
          ],
        },
        {
          id: 2,
          label: '热门活动',
          name: 'second',
          item: [
            {
              id: 1,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 2,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 3,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 4,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 5,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 6,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
          ],
        },
        {
          id: 3,
          label: '云课程',
          name: 'thrid',
          item: [
            {
              id: 1,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 2,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 3,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 4,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 5,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 6,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
          ],
        },
        {
          id: 4,
          label: '角色系列课程',
          name: 'four',
          item: [
            {
              id: 1,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 2,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 3,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 4,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 5,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
            {
              id: 6,
              name: '区块链精品实践课',
              username: 'Classroom',
              scrollname: '华为云',
              time: '6小时',
              description:
                '本课程由浅入深的介绍区块链技术缘起、原理机制、演进和发展现状，分享区块链典型应用场景及特点。了解华为云区块链的方案及特点，参与动手实验。从入门到实践，循序渐进一站式学习。',
            },
          ],
        },
      ],
    }
  }
}
</script>

<style>
.class-box {
  width: 100%;
  padding-bottom: 60px;
  margin: 0 auto;
}
.course-box.impt {
  width: 284px;
  margin: 0 calc((100% - 1136px) / 3) 16px 0;
  border: 1px solid #f7f8fa;
  box-shadow: 0 4px 16px 0 rgba(124, 142, 227, 0.12);
  border-radius: 12px;
  display: inline-block;
  cursor: pointer;
}
.impt:nth-of-type(4n) {
  margin-right: 0;
}
.course-content {
  position: relative;
  min-height: 300px;
  width: 1200px;
  margin: 23px auto 0;
}
.course-header-current-bg {
  height: 180px;
  background-color: #222127;
}
.course-header-main {
  width: 1200px;
  margin: 0 auto;
  height: 100%;
}
.course-header-title {
  font-size: 30px;
  color: #fff;
  padding: 40px 0 20px;
}
.course-header-description {
  font-size: 16px;
  color: #fff;
  letter-spacing: 0.11px;
  line-height: 24px;
}

.course-box {
  width: 380px;
  display: inline-block;
  background-color: #fff;
  margin: 0 30px 30px 0;
  border-radius: 12px;
  border: 1px solid #f7f8fa !important;
  box-shadow: 0 4px 16px 0 rgba(124, 142, 227, 0.12);
}

.course-box:hover {
  transform: translateY(-6px) !important;
  transition: all 0.1s ease-out !important;
  box-shadow: 0 16px 20px 0 rgba(124, 142, 227, 0.24);
  z-index: 50 !important;
}

.course-box .course-bac {
  border-radius: 12px 12px 0 0;
  /* background-color: #5e7ce0; */
   background-image: url(https://res.devcloud.huaweicloud.com/obsdevui/diploma/8.1.24.002/index-cloud.07a57744ef9e998461a5.png);
  height: 200px;
}
.course-box:nth-child(1) .course-bac{
    background-position-y: -2000px;
}
.course-box:nth-child(2) .course-bac{
    background-position-y: -2200px;
}
.course-box:nth-child(3) .course-bac{
    background-position-y: -2400px;
}
.course-box:nth-child(4) .course-bac{
    background-position-y: -2600px;
}
.course-box:nth-child(5) .course-bac{
    background-position-y: -2800px;
}
.course-box:nth-child(6) .course-bac{
    background-position-y: -3000px;
}
.course-info {
  margin: 20px;
}

.course-line {
  margin-top: 5px;
  border-bottom: 1px solid #ccc;
}

.course-name {
  font-size: 17px;
  font-weight: 700;
}

.course-mini {
  color: #ccc;
  overflow: hidden;
}

.course-icon {
  display: inline-block;
  width: 10px;
  height: 10px;
  background-color: #ccf;
  border-radius: 50%;
  margin-right: 2px;
}
.el-tabs__active-bar {
  width: 0 !important;
}
.el-tabs__nav {
  display: flex;
  justify-content: flex-start;
  border-bottom: 1px solid #eee;
  cursor: pointer;
}
.el-tabs__item {
  padding: 5px 0;
  margin-right: 20px;
  font-weight: 700;
}
div.is-active {
  color: #5e7ce0;
  /*position: relative;*/
}
.is-active::after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  height: 2px;
  width: 0;
  background: #5e7ce0;
  transition: width 0.3s ease-out, background-color 0.3s ease-out;
}
:focus {
  outline: none !important;
}
.cloud-top {
  display: flex;
  align-items: center;
}
.cloud-top div {
  margin: 20px 10px;
  padding: 5px 10px;
  border-radius: 20px;
  background-color: #f6f7fa;
  font-size: 14px;
}
.cloud-top div:hover {
  color: #5e7ce0;
}
</style>
