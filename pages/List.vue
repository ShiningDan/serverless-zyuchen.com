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
      <el-button type="primary">创建新文章</el-button>
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
        >
        </el-table-column>
        <el-table-column
          label="创建时间"
          prop="createAt"
        >
        </el-table-column>
        <el-table-column
          label="修改时间"
          prop="updateAt"
        >
        </el-table-column>
        <el-table-column
          label="查看"
          prop="link"
        >
          <template slot-scope="scope">
            <a :href="scope.link" target="_blank">查看</a>
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
              @click="handleEdit(scope.$index, scope.row)"
            >
              编辑
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
export default {
  layout: 'Blog',
  data () {
    return {
      dialogTableVisible: false,
      articles: [
        {
          title: 'Webpack 源码解析',
          categories: 'Webpack',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        },
        {
          title: 'Preact 源码解析之元素创建流程',
          categories: 'Preact,JavaScript',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        },
        {
          title: 'Webpack 源码解析',
          categories: 'Webpack',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        },
        {
          title: 'Webpack 源码解析',
          categories: 'Webpack',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        },
        {
          title: 'Webpack 源码解析',
          categories: 'Webpack',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        },
        {
          title: 'Webpack 源码解析',
          categories: 'Webpack',
          createAt: '2017-10-01',
          updateAt: '2017-10-18',
          link: '/error'
        }
      ]
    }
  },
  methods: {
    handleEdit (index, data) {
      console.log('handle arti edit', index, data)
    },
    handleDelete (index, data) {
      console.log('handle arti delete', index, data)    
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
