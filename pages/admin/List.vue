<template>
  <div class="x-list">
    <el-dialog
      title="文章删除"
      :visible.sync="dialogTableVisible"
    >
      <div class="dialog-head">是否确认删掉文章</div>
      <div class="dialog-body">
        <el-button type="success">确认</el-button>
        <el-button type="danger">取消</el-button>
      </div>
    </el-dialog>
    <div class="header">
      <el-button type="primary">
        <nuxt-link to='/admin/upload' style="color: inherit">创建新文章</nuxt-link>
      </el-button>
    </div>
    <div class="body">
      <el-table
        border
        style="min-width: 600px"
        :data="articles"
      >
        <el-table-column
          fixed
          label="文章标题"
          prop="title"
          width="140"
        >
        </el-table-column>
        <el-table-column
          label="文章标签"
          prop="categories"
          :formatter="categoriesFormatter"
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt"
          :formatter="timeFormatter"
        >
        </el-table-column>
        <el-table-column
          label="修改时间"
          prop="updateAt"
          :formatter="timeFormatter"
        >
        </el-table-column>
        <el-table-column
          label="查看"
        >
          <template slot-scope="scope">
            <a :href="scope.row.link" target="_blank" style="color: inherit">查看</a>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="150"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
            >
              <a :href="'/admin/upload/' + scope.row._id"
                style="color: inherit"
              >
                编辑
              </a>
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from '~plugins/axios'
import moment from 'moment'

export default {
  layout: 'Admin',
  data () {
    return {
      dialogTableVisible: false,
      articles: []
    }
  },
  async created () {
    this.articles = await axios.get('/admin/list')
  },
  methods: {
    handleDelete (index, data) {
      console.log('handle arti delete', index, data)
    },
    categoriesFormatter (row, column, cellValue, index) {
      if (cellValue) {
        return cellValue.join(', ')
      }
      return ''
    },
    timeFormatter (row, column, cellValue, index) {
      if (cellValue) {
        return moment(cellValue).locale('zh-cn').format('LL')
      }
      return ''
    }
  }
}
</script>

<style>
.x-list {
  padding: 40px 20px;
}
.x-list .dialog-head {
  font-size: 16px;
  font-weight: bold;
  height: 20px;
  line-height: 1.4;
  text-align: center;
}
.x-list .dialog-body {
  margin-top: 50px;
  text-align: center;
}
.x-list .dialog-body .el-button {
  margin: 0 20px;
}
.x-list .body {
  margin-top: 20px;
}
</style>
