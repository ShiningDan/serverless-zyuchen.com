<template>
  <div id="content">
    <div id="toc">
      <header>年份列表</header>
      <ul>
        <li v-for="year in Object.keys(links).reverse()"
          :key="year">
          <a :href="'#toc-'+year">{{year}}</a>
        </li>
      </ul>
    </div>
    <h1>归档</h1>
    <p>
      本博客系统是自己搭建的博客系统，后台系统用的是
      <a href="https://help.aliyun.com/product/50980.html">函数计算 | 阿里云</a>
      ，前端的样式参考了
      <a href="https://imququ.com/">屈屈老师的博客</a>
      。除了文章展示页面以外，还有后台页面管理系统，文章统计，搜索等辅助功能。之前使用
      <a href="https://shiningdan.github.io/"> Shiningdan 的博客 | Hexo</a>
      作为博客系统，上面保留一些原来的博客文章，有一些不重要的就没有迁移过来了。
    </p>
    <p>
      归档部分按照时间顺序展示文章，文章质量良莠不齐，既有想与大家分享的个人心得，也有平时学习未整理好的总结笔记，如果大家想选择性阅读一些文章，可以点击链接来
      <a href="/series">专题 </a>
      查看。希望自己的在这个浮躁的时代坚持阅读与写作，也非常感谢大家的支持与反馈。
    </p>
    <div v-for="year in Object.keys(links).reverse()"
      :key="year">
      <div v-for="month in Object.keys(links[year]).reverse()"
        :key="month">
        <h2>
          {{year}} 年 {{month}} 月
        </h2>
        <ul>
          <li v-for="(article, index) in links[year][month]"
            :key="index">
            <a :href="article.link">{{article.title}}</a>
            <div class="time">
              {{moment(article.date).format('MMM DD, YYYY')}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import moment from 'moment'

export default {
  layout: 'Blog',
  data () {
    return {
      articles: []
    }
  },
  computed: {
    years: function() {
      const years = []
      for (let i = this.articles.length - 1; i >=0 ; i--) {
        for (let j in this.articles[i]) {
          years.push(j)
        }
      }
      return years
    },
    links: function() {
      const links = {}
      for (let i = this.articles.length - 1; i >= 0 ; i--) {
        for (let j in this.articles[i]) {
          links[j] = {}
          for (let k = this.articles[i][j].length - 1; k >= 0; k--) {
            for (let l in this.articles[i][j][k]) {
              links[j][l] = this.articles[i][j][k][l]
            }
          }
        }
      }
      return links
    }
  },
  async mounted () {
    this.articles = await axios.get('/archives')
  },
  methods: {
    moment: moment
  }
}
</script>

<style scoped>
#content {color: #444;line-height: 1.6; word-wrap: break-word; padding-bottom: 20px;}
#content h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}
#content h2 {font-size: 1.4rem;}
#content ul{margin-left: 25px;}
#content p, #content h2, #content ul {margin-top: 15px;}
#content a {color: #538ED5;}
#content a:hover {text-decoration: underline;}
#toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}
#toc ul{ list-style: none; margin-left: 0;}
#toc li {color: #538ED5; text-align: center;}
#toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}
.time {display: inline-block; font-size: 14px; color: #666; margin-left: 6px}
@media screen and (max-width: 640px) {
    #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}
}
</style>
