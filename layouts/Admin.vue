<template>
  <div id="main">
    <Header></Header>
    <div id="content-wrap">
      <nuxt/>
    </div>
  </div>
</template>

<script>
import Header from '../components/Header'

export default {
  components: {
    Header,
  }
}
</script>

<style>
/* html, body, #main, #__nuxt, #__layout {height: 100%;} */
#content-wrap {height: 100%;}
* {padding: 0; margin: 0;}
a {text-decoration: none;}
a:hover {cursor: pointer;}
body {font-size: 16px; font-family: -apple-system, "Helvetica Neue", "Arial", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif; font-style: normal; font-weight: 400;background: #eee;}
pre, code{font-family : "SFMono-Regular", Consolas, "Liberation Mono", Menlo, Courier, monospace;}
#content-wrap {margin-left: 270px;overflow: auto; max-width: 1300px;background: #fff;}
#content {padding: 40px 40px 0;}
#content a:hover {text-decoration: underline;}
@media screen and (max-width: 1024px) {
  #content-wrap {margin-left: 210px;}
  #content {padding: 40px 20px 0;}
}
@media screen and (max-width: 640px) {
  #content-wrap {margin-left: 0;}
}
</style>
