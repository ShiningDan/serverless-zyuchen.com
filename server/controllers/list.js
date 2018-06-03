const ArticleSchema = require('../schemas/article');
const AbstractSchema = require('../schemas/abstract');
const connMongo = require('./mongo-conn');
const mongoose = require('mongoose');
const {flatMongoResponse, extractCreateAtUpdateAt} = require('./util');

exports.list = function (event, context, callback) {
  return connMongo(async function (database) {
    try {
      const Article = database.model('Article', ArticleSchema)
      const articles = await Article.find({}).select({
        title: 1,
        categories: 1,
        meta: 1,
        link: 1
      }).exec()
      return articles.map(article => flatMongoResponse(article))
        .map(article => extractCreateAtUpdateAt(article))
    } catch (err) {
      throw new Error('get list data error', err)
    } finally {
      database.close()
    }
  })
}