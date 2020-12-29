const express = require('express')
const serveStatic = require('serve-static')
const history = require('connect-history-api-fallback')
const enforce = require('express-sslify')

const app = express()
// trustProtoHeader heroku thing - heroku gives ssl certificates
// this makes it a secure accesspoints for the site
app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.use(serveStatic(_dirname + '/dist'))
// middleware
app.use(history())

app.listen(process.env.PORT || 5000)
