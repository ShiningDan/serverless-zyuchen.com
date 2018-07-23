<template>
  <div id="content"
    v-if="series.length > 0">
    <div id="toc">
      <header>年份列表</header>
      <ul>
        <li v-for="(s, index) in series"
          :key="s.name">
          <a :href="'#toc-' + index">{{s.name}}</a>
        </li>
      </ul>
    </div>
    <h1>专题</h1>
    <p>
      这里是博客的专题部分，将笔者平时的总结文章按照专题进行如下的区分。但是专题部分中收录的并不是所有的文章，如果想查看所有的文章，可以点击
      <a href="/archives/">归档</a>
      按照时间顺序浏览。
    </p>
    <div v-for="(s, index) in series"
      :key="s.name">
      <h2 :id="'toc-' + index">{{s.name}}</h2>
      <ul>
        <li v-for="article in s.articles"
          :key="article.title">
          <a :href="article.link">{{article.title}}</a>
          <div class="time">
            {{moment(article.meta.createAt).format('MMM DD, YYYY')}}
          </div>
        </li>
      </ul>
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
      series: []
    }
  },
  async created () {
    this.series = await axios.get('/series')
  },
  methods: {
    moment: moment
  }
}
</script>

<style scoped>
#content {color: #444; line-height: 1.6; word-wrap: break-word; padding-bottom: 20px;}
#content h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}
#content h2 {font-size: 1.4rem;}
#content ul{margin-left: 25px;}
#content p, #content h2, #content ul {margin-top: 15px;}
#content a {color: #538ED5;}
#content a:hover {text-decoration: underline;}
#toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}
#toc ul{list-style: none; margin-left: 0;}
#toc li {color: #538ED5; text-align: center;}
#toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}
.time {display: inline-block; font-size: 14px; color: #666; margin-left: 6px}
@media screen and (max-width: 640px) {
    #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}
}
</style>
