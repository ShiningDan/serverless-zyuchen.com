<template>
  <div>
    <div id="content">
      <article v-for="(abstract, index) in abstracts"
        :key="index"
      >
        <div class="meta">
          <div class="date">
            {{moment(abstract.createAt).format('YYYY-MM-DD')}}
          </div>
        </div>
        <h1 class="title">
          <a :href="abstract.link">
            {{abstract.title}}
          </a>
        </h1>
        <div class="post-content">
          <p class="abstract">
            {{abstract.abstract}}
          </p>
          <p>
            <a :href="abstract.link">继续阅读...</a>
          </p>
        </div>
      </article>
      <pageNav
        :pageNav="pagenav.pageNav"
        :pageNavPn="pagenav.pageNavPn">
      </pageNav>
    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import moment from 'moment'
import pageNav from '~components/PageNav.vue'
import qs from 'querystring'
const PAGE_COUNT = 5

export default {
  layout: 'Blog',
  data() {
    return {
      abstracts: [],
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
  components: {
    pageNav
  },
  // 前端根据返回的数据的个数，来判断是否还有下一页
  async created () {
    const originAbs = await axios.get(this.$route.fullPath)
    if (!originAbs || originAbs.length === 0) {
      return
    }
    const {lt, gt} = this.$route.query
    const length = originAbs.length
    console.log(this.$route.query)
    console.log(originAbs)
    // id 越大，代表文章越新
    if (gt) {
      // 如果文章数量小于或等于一页文章的数量，则不显示上一页，只显示下一页
      if (originAbs.length <= PAGE_COUNT) {
        this.abstracts = originAbs
        this.pagenav.pageNav = {
          prev: '',
          center: '归档',
          next: '下一页'
        }
        this.pagenav.pageNavPn = {
          prev: '',
          next: '?' + qs.stringify({
            lt: originAbs[length - 1]._id
          })
        }
      } else {
        // 说明总体文章数量大于首页一页文章的数量，需要显示下一页
        this.abstracts = originAbs.slice(0, length - 1)
        const nextPn = originAbs[length - 1]
        this.pagenav.pageNav = {
          prev: '上一页',
          center: '归档',
          next: '下一页'
        }
        this.pagenav.pageNavPn = {
          prev: '?' + qs.stringify({
            gt: originAbs[0]._id
          }),
          next: '?' + qs.stringify({
            lt: originAbs[PAGE_COUNT - 1]._id
          })
        }
      }
    } else if (lt) {
      // 如果文章数量小于或等于一页文章的数量，则不显示下一页，只显示上一页
      if (originAbs.length <= PAGE_COUNT) {
        this.abstracts = originAbs
        this.pagenav.pageNav = {
          prev: '上一页',
          center: '归档',
          next: ''
        }
        this.pagenav.pageNavPn = {
          prev: '?' + qs.stringify({
            gt: originAbs[0]._id
          }),
          next: ''
        }
      } else {
        // 说明总体文章数量大于首页一页文章的数量，需要显示下一页
        this.abstracts = originAbs.slice(0, length - 1)
        const nextPn = originAbs[length - 1]
        this.pagenav.pageNav = {
          prev: '上一页',
          center: '归档',
          next: '下一页'
        }
        this.pagenav.pageNavPn = {
          prev: '?' + qs.stringify({
            gt: originAbs[0]._id
          }),
          next: '?' + qs.stringify({
            lt: originAbs[PAGE_COUNT - 1]._id
          })
        }
      }
    } else {
      if (originAbs.length <= PAGE_COUNT) {
        // 说明总体文章的数量小于或等于首页一页文章的数量，则不需要显示上一页和下一页
        this.abstracts = originAbs
      } else {
        // 说明总体文章数量大于首页一页文章的数量，需要显示下一页
        this.abstracts = originAbs.slice(0, length - 1)
        const nextPn = originAbs[length - 1]
        this.pagenav.pageNav = {
          prev: '',
          center: '归档',
          next: '下一页'
        }
        this.pagenav.pageNavPn = {
          prev: '',
          next: '?' + qs.stringify({
            lt: originAbs[PAGE_COUNT - 1]._id
          })
        }
      }
    }
  },
  methods: {
    moment: moment
  }
}
</script>

<style scoped>
#content article {padding: 20px 0; border-bottom: 1px solid #ccc; position: relative;}
#content article:last-child { border-bottom: none;}
.meta {width: auto; float: right;}
.title {font-size: 32px;font-weight: 400;}
.title a {color: #538ED5;}
.post-content {margin-top: 20px;line-height: 1.6;}
.post-content p {word-wrap: break-word;}
.post-content p a {display: inline-block; margin: 16px 0; color: #538ED5;}
</style>
