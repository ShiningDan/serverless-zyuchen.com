<template>
  <el-form
    ref="form"
    :model="form"
    label-width="140px"
    class="x-upload"
    @submit.native.prevent>
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
    <el-form-item label="文章摘要：">
      <el-input autosize type="textarea" v-model="form.abstract"></el-input>
    </el-form-item>
    <el-form-item label="文章正文：">
      <textarea id="mde"></textarea>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        @click="submit(form)">
        保存并提交
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from '~plugins/axios'

export default {
  layout: 'Admin',
  data () {
    return {
      simplemde: undefined,
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
      categories: [],
      series: [],
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
    const response = await axios.get('/admin/alive')
    if (response.status === 401) {
      this.$router.push('/admin/login')
      return
    }
    const id = this.$route.params.id
    let categories, series, article
    if (id) {
      [categories, series, article] = await Promise.all([
        axios.get('/admin/categories'),
        axios.get('/admin/series'),
        axios.get(`/admin/upload/${id}`)
      ])
      this.form = article
      if (this.simplemde) {
        this.simplemde.value(this.form.md)
      }
    } else {
      [categories, series] = await Promise.all([
        axios.get('/admin/categories'),
        axios.get('/admin/series')
      ])
    }
    this.series = series.map(s => ({
      value: s.name,
      label: s.name
    }))
    this.categories = categories.map(category => ({
      value: category.name,
      label: category.name
    }))
  },
  mounted () {
    const head = document.getElementsByTagName('head')[0]
    if (head) {
      const script = document.createElement('script')
      const _this = this
      script.onload = function () {
        if (SimpleMDE) {
          _this.simplemde = new SimpleMDE({
            element: document.getElementById("mde")
          });
          if (_this.form.md) {
            _this.simplemde.value(this.form.md)
          }
          _this.simplemde.codemirror.on("change", function(){
            _this.form.md = _this.simplemde.value()
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
  },
  methods: {
    async submit(form) {
      console.log(form, '-------')

      const result = await axios.post('/admin/create', form)
      console.log(result)
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
