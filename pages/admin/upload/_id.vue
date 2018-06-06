<template>
  <el-form ref="form" :model="form" label-width="140px" class="x-upload">
    <el-form-item label="文章标题：">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="文章链接：">
      <el-input v-model="form.link"></el-input>
    </el-form-item>
    <el-form-item label="文章标签：">
      <el-select
        v-model="form.categories"
        multiple
        filterable
        allow-create
        default-first-option
      >
        <el-option
          v-for="category in categories"
          :key="category.value"
          :lable="category.label"
          :value="category.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="文章专题（可选）：">
      <el-select
        v-model="form.series"
        multiple
        filterable
        allow-create
        default-first-option
      >
        <el-option
          v-for="s in series"
          :key="s.value"
          :lable="s.label"
          :value="s.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间：">
      <el-date-picker
        v-model="form.createAt"
        placeholder="选择日期"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        :picker-options="pickerOption"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="修改时间：">
      <el-date-picker
        v-model="form.updateAt"
        placeholder="选择日期"
        type="date"
        format="yyyy 年 MM 月 dd 日"
        :picker-options="pickerOption"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="文章摘要">
      <el-input autosize type="textarea" v-model="form.abstract"></el-input>
    </el-form-item>
    <el-form-item label="文章正文">
       <textarea id="mde"></textarea>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'Blog',
  data () {
    return {
      form: {
        title: '',
        link: '',
        md: '',
        categories: [],
        series: [],
        createAt: '',
        updateAt: '',
        abstract: ''
      },
      categories: [{
          value: 'HTML',
          label: 'HTML'
        }, {
          value: 'CSS',
          label: 'CSS'
        }, {
          value: 'JavaScript',
          label: 'JavaScript'
      }],
      series: [{
          value: '前端相关专题',
          label: '前端相关专题'
        }, {
          value: '网络相关专题',
          label: '网络相关专题'
        }, {
          value: '数据库相关专题',
          label: '数据库相关专题'
        }, {
          value: '后台相关专题',
          label: '后台相关专题'
        }, {
          value: 'JavaScript专题',
          label: 'JavaScript专题'
      }],
      pickerOption: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }]
      }
    }
  },
  async created () {
    const id = this.$route.params.id
    if (id) {
      const article = await axios.get(`/admin/upload/${id}`)
      this.form = article
    }
  },
  mounted () {
    const head = document.getElementsByTagName('head')[0]
    if (head) {
      const script = document.createElement('script')
      script.onload = function () {
        if (SimpleMDE) {
          var simplemde = new SimpleMDE({
            element: document.getElementById("mde")
          });
        } else {
          console.log('SimpleMDE not fount, script Error')
        }
      }
      head.appendChild(script)
      script.src = '/js/simplemde.min.js'
      const style = document.createElement('link')
      style.rel = 'stylesheet'
      head.appendChild(style)
      style.href = '/css/simplemde.min.css'
    } else {
      console.log('head is not found')
    }
  }
}
</script>

<style>
.x-upload {
  margin: 40px 20px;
  max-width: 800px;
}
</style>
