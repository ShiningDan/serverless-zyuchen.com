<template>
  <div id="content">
    <h1>404 - 什么也没有</h1>
    <p>您要找的东西不在哦</p>
    <p>
      请检测 URL 拼写是否有误，或者通过
      <a href="/archives/">归档</a>
      查看是否有您先看的文章
    </p>
    <PageNav></PageNav>
  </div>
</template>

<script>
import PageNav from '../components/PageNav'

export default {
  layout: 'Blog',
  components: {
    PageNav
  }
}
</script>

<style scoped>
#content {color: #444; line-height: 1.6; word-wrap: break-word;}
#content h1 {color: #333; font-size: 2rem; font-weight: 400; line-height: 35px;}
#content a {color: #538ED5;}
#content p {margin-top: 15px;}
</style>
