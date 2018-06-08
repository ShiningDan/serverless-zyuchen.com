<template>
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
  </div>
</template>

<script>
import axios from '~plugins/axios'
import moment from 'moment'

export default {
  layout: 'Blog',
  data() {
    return {
      abstracts: []
    }
  },
  async created () {
    this.abstracts = await axios.get('/')
  },
  methods: {
    moment: moment
  }
}
</script>

<style scoped>
#content article {padding: 20px 0;border-bottom: 1px solid #ccc; position: relative;}
.meta {width: auto; float: right;}
.title {font-size: 32px;font-weight: 400;}
.title a{color: #538ED5;}
.post-content {margin-top: 20px;line-height: 1.6;}
.post-content p {word-wrap: break-word;}
.post-content p a{display: inline-block; margin: 16px 0; color: #538ED5;}
</style>
