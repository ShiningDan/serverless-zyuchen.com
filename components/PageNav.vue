<template>
  <nav id="page-nav">
    <a v-if="pageNav && pageNavPn" :href="pageNavPn.prev" class="prev">{{pageNav.prev}}</a>
    <a v-if="pageNav && pageNavPn" :href="pageNavPn.next" class="prev">{{pageNav.next}}</a>
    <div v-if="pageNav && pageNavPn" class="center">
      <a href="/archives/">{{pageNav.center}}</a>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    pageNav: {
      type: Object,
      default: undefined,
      validator: function (value) {
        if (!value) return false
        return value.prev !== undefined && value.next !== undefined
      }
    },
    pageNavPn: {
      type: Object,
      default: undefined,
      validator: function (value) {
        if (!value) return false
        return value.prev !== undefined && value.next !== undefined
      }
    }
  }
}
</script>

<style scoped>
#page-nav { margin-top: 20px; color: #538ED5; border-top: 1px solid #ccc; padding-top: 20px;overflow: hidden;}
.prev {float: left; text-decoration: none; color: #538ED5;}
.next {float: right; text-decoration: none; color: #538ED5;}
.center {margin: 0 auto; text-align: center;width: 80px;}
.center a {color: #538ED5;}
</style>
