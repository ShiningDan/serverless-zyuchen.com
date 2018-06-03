exports.flatMongoResponse = (obj) => {
  if (!obj) return obj
  return obj.toObject()
}

exports.extractCreateAtUpdateAt = (obj) => {
  if (!obj || !obj['meta']) return obj
  const {createAt, updateAt} = obj.meta
  obj.createAt = createAt
  obj.updateAt = updateAt
  delete obj['meta']
  return obj
}