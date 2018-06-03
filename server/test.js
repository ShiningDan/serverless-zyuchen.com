const list = require('./controllers/list')

;(async () => {
  try {
    const result = await list.list()
    console.log(result)
  } catch (err) {
    console.log(err)
  }
})()