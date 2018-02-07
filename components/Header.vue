<template>
  <header id="header">
    <div id="avatar">
      <a href="/"></a>
    </div>
    <h1>
      <a href="/">Yuchen</a>
    </h1>
    <div id="sup">
      <p>前端开发</p>
      <p>软件定义网络</p>
    </div>
    <nav id="main-nav">
      <ul>
        <li><a href="/">首页</a></li>
        <li><a href="/archives/">归档</a></li>
        <li><a href="/series/">专题</a></li>
        <li><a href="/search/">搜索</a></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  
}
</script>

<style scoped>
#header {position: fixed; top: 0; bottom: 0; width: 270px;box-sizing: border-box;padding: 70px; background-color: #DAF0FE; background-image: url('~assets/img/header-bg.jpg'); background-size: cover; }
#avatar a {display: block;margin: -10px 0 0 -10px; height: 150px; width: 150px; border-radius: 50%; background: url('~assets/img/avatar.png');background-size: 100% 100%;}
#header h1 {font-size: 28px; margin: 20px auto 10px;font-weight: 400;}
#header a { color: #333;}
#sup > p {margin: 6px auto;color: #666;}
#main-nav {margin-top: 40px}
#main-nav ul {list-style: none;}
#main-nav ul li{margin-top: 10px;}
@media screen and (max-width: 1024px) {
    #header {width: 210px; padding: 70px 40px;}
}
@media screen and (max-width: 640px) {
    #header {position: relative; width: 100%; text-align: center; padding-bottom: 20px; background-image: none;}
    #avatar a {position: absolute; top: 30px; left: 30px; width: 50px; height: 50px;}
    #header h1 {margin-top: -40px;}
    #sup {overflow: hidden; text-align: center;display: inline-block;}
    #sup > p {float: left; margin: 0 20px;}
    #main-nav {margin-top: 0px;}
    #main-nav ul {overflow: hidden; display: inline-block; text-align: center;}
    #main-nav ul li{float: left; margin: 0 16px;}
}
</style>
