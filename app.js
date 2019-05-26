const express = require('express')
const app = express()
const port = 3000

const methodOverride = require('method-override')
app.use(methodOverride('_method'))

const reqTime = (req, res, next) => {
  let date = new Date()
  req.day = date.toLocaleDateString()
  req.time = date.toLocaleTimeString()
  if (req.url !== '/favicon.ico') {
    console.log(`${req.day} ${req.time} | ${req.method} from ${req.url}`)
  }
  next();
};

app.use(reqTime)

// 列出全部 Todo
app.get('/', (req, res) => {
  res.send(`
  <form action="/" method="POST">
    <button type="submit">Create</button>
  </form>
  <form action="/:id/delete?_method=DELETE" method="POST">
  <button type="submit">delete</button>
  </form>
  `)
})

// 新增一筆 Todo 頁面
app.get('/new', (req, res) => {
  res.send('new')
})

// 顯示一筆 Todo 的詳細內容
app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

// 新增一筆  Todo
app.post('/', (req, res) => {
  res.send('新增一筆 Todo')
})

app.delete('/:id/delete', (req, res) => {
  res.send('刪除 Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
