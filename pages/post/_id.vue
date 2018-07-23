<template>
  <div id="content">
    <div v-html="article.content"></div>
    <div class="eof">--EOF--</div>
    <div class="post-info">
      发表于
      <span class="time">
        {{moment(article.createAt).format('YYYY-MM-DD')}}
      </span>
      并被添加「
      <span>
        <span
          class="tag"
          v-for="(category, index) in article.categories"
          :key="index"
        >{{category}}</span>
      </span>
      」标签，最后修改于
      <span class="time">
        {{moment(article.updateAt).format('YYYY-MM-DD')}}
      </span>
      <h3
        class="series-info"
        v-if="article.series && article.series.length > 0"
      >
        专题「 {{article.series[0]}} 」相关的其他文章
        <a href="/series/">»</a>
      </h3>
      <ul class="series-ul"
        v-if="series && series.length > 0">
        <li
          v-for="s in series"
          :key="s._id">
          <a :href="s.link">
            {{s.title}}
          </a>
          <span class="time">
            {{moment(s.meta.createAt).format('YYYY-MM-DD')}}
          </span>
        </li>
      </ul>
    </div>
    <pageNav
      :pageNav="pagenav.pageNav"
      :pageNavPn="pagenav.pageNavPn">
    </pageNav>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import moment from 'moment'
import pageNav from '~components/PageNav.vue'

export default {
  layout: 'Blog',
  components: {
    pageNav
  },
  data () {
    return {
      loading: undefined,
      article: {},
      series: [],
      pagenav: {
        // 这里的参数为链接内显示的文字内容
        pageNav: {
          prev: '',
          center: '',
          next: ''
        },
        // 这里的参数为补充 href 的链接
        pageNavPn: {
          prev: '',
          next: ''
        }
      }
    }
  },
  async created () {
    this.loading = this.$loading({
      lock: true,
      text: '加载中',
      background: 'rgba(0, 0, 0, 0.8)'
    })
    this.article = await axios.get(this.$route.fullPath)
    if (this.loading) {
      this.loading.close()
    }
  },
  watch: {
    article: async function(article, old) {
      const articleNav = await axios.get('/articleNav', {
        params: {
          id: this.article._id,
        }
      })
      if (articleNav.articleNew) {
        this.pagenav.pageNav.next = articleNav.articleNew.title
        this.pagenav.pageNavPn.next = articleNav.articleNew.link
      }
      if (articleNav.articleOld) {
        this.pagenav.pageNav.prev = articleNav.articleOld.title
        this.pagenav.pageNavPn.prev = articleNav.articleOld.link
      }
      if (article.series && article.series.length > 0) {
        const series = await axios.get('/articleSeries', {
          params: {
            series: article.series[0]
          }
        })
        this.series = series;
      }
    }
  },
  updated () {
    this.lazyload()
  },
  methods: {
    moment: moment,
    lazyload () {
      let images = document.getElementsByTagName('img');
      // let comments = document.getElementById('comments');
      // let lazyloadDOM = Array.from(images).concat(comments);
      let lazyloadDOM = Array.from(images);
      let onscrollF = function(event) {
        let scrollTop = window.scrollY;
        let innerHeight = window.innerHeight;
        let scrollBottomHeight = scrollTop + innerHeight;
        for (let i = 0; i < lazyloadDOM.length; i++) {
          let dom = lazyloadDOM[i];
          if (dom.offsetTop < scrollBottomHeight + 300) {
            let src = dom.getAttribute('data-src');
            if (src) {
              dom.setAttribute('src', src);
            }
            let className = dom.getAttribute('class');
            if (className) {
              className += ' load';
            }
            else {
              className = 'load';
            }
            dom.setAttribute('class', className);
            lazyloadDOM.splice(i, 1);
            i = 0;
            if (lazyloadDOM.length === 0) {
              document.removeEventListener('scroll', onscrollF);
            }
          } else {
            break;
          }
        }
        if (lazyloadDOM.length === 0) {
          document.removeEventListener('scroll', onscrollF);
        }
      };
      document.addEventListener('scroll', onscrollF);
      onscrollF();
    }
  }
}
</script>

<style>
#content {color: #444; line-height: 1.6; word-wrap: break-word; height: 100%;}
#content .load{height: auto!important;}
#content h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}
#content h2 {font-size: 1.6rem;}
#content h3 {font-size: 1.4rem;}
#content h4 {font-size: 1.1rem;}
#content h5, #content h6 {font-size: 1.0rem;}
#content ol, #content ul, #content dl {margin-left: 25px;}
#content li {font-size: 96%;}
#content p, #content h2, #content h3, #content h4, #content h5, #content h6, #content ol, #content ul, #content dl, #conent blockquote, #content pre  {margin-top: 15px;}
#content a {color: #538ED5;}
#content a:hover {text-decoration: underline;}
#content pre {background-color: #f8f8f8; border-left: 5px solid #ccc; color: #666; font-size: 14px; line-height: 1.6; overflow: hidden; padding: 0.6rem; position: relative; white-space: pre-wrap; word-break: break-word; word-wrap: break-word;}
#content code {background-color: #eee; border-radius: 5px;font-size: 90%; margin: 0 2px; padding: 2px 5px; vertical-align: middle;}
#content pre code {background-color: transparent; border-radius: 0; font-size: 100%; margin: 0; padding: 0;}
#content img {border: 1px solid #ccc; display: block; margin: 10px 5px; max-width: 96%;}
#content .eof{margin-top: 20px;}
#content .post-info {margin-top: 20px; font-size: 14px;}
#content span.time {color: #999; margin: 0 4px;}
#content .tag a{text-decoration: none;}
#content .tag:after {content: '、';}
#content .tag:last-child:after {content: '';}
#content .series-info a {text-decoration: none;font-size: 14px;margin-left: 4px;}
#content .series-ul a {font-size: 16px;}
#content .series-ul .time {font-size: 14px;margin-left: 10px;}
#content #comments {margin-top: 20px; padding-top: 20px; border-top: 1px solid #ccc;}
#toc {float: right; border: 1px solid #ccc; padding: 10px; max-width: 260px; min-width: 120px; margin: 0 0 15px 20px;}
#toc ul{margin-left: 14px;}
#toc>header{text-align: center; border-bottom: 1px solid #ccc; margin: -6px 0 6px;}
@media screen and (max-width: 640px) {
    #toc {float: none; box-sizing: 100%; max-width: 100%; margin: 0 0 20px;}
}
</style>
