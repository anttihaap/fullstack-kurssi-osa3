const morgan = require('morgan')

morgan.token('req_body_json', req => {
  return JSON.stringify(req.body)
})

const logger = () =>
  morgan(
    ':method :url :req_body_json :status :res[content-length] - :response-time ms'
  )

module.exports = logger
