const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/api/v1/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./CMS_project/users.json'))
  res.send(users)
})
app.get('/api/v1/users/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./CMS_project/users.json'))
  const { id } = req.params
  const user = users.find((user) => user.id == id)
  res.send(user)
})
app.post('/api/v1/users', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./CMS_project/users.json'))
  const newUser = req.body;
  users.push(newUser)
  fs.writeFileSync('./CMS_project/users.json', JSON.stringify(users))
  res.send('Successfully')
})
app.put('/api/v1/users/:id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./CMS_project/users.json'))
  const { id } = req.params
  const findUser = users.findIndex((user) => user.id == id)
  if (findUser == -1) {
    res.send('User not found')
  }
  else {
    users[findUser] = req.body
    fs.writeFileSync('./CMS_project/users.json', JSON.stringify(users))
    res.send({
      message: 'Update successfully'
    })
  }
})
app.delete('/api/v1/user:/id', (req, res) => {
  const users = JSON.parse(fs.readFileSync('./CMS_project/users.json'))
  const { id } = req.params
  const findIndex = users.findIndex((user) => user.id == id)
  if (findIndex != -1) {
    users.splice(findIndex, 1)
    fs.writeFileSync('/.CMS_project/users.json', JSON.stringify(users))
    res.send({
      message: 'Delete successfully'
    })
  }
  else {
    res.send({
      message: 'User not found'
    })
  }
})
app.get('/api/v1/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  res.send(posts)
})
app.get('/api/v1/posts/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  const { id } = req.params
  const post = posts.find((post) => post.id == id)
  res.send(post)
})
app.post('/api/v1/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  const newPost = req.body;
  posts.push(newPost)
  fs.writeFileSync('./CMS_project/posts.json', JSON.stringify(posts))
  res.send('Successfully')
})
app.put('/api/v1/posts/:id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  const { id } = req.params
  const findPost = posts.findIndex((post) => post.id == id)
  if (findPost == -1) {
    res.send('User not found')
  }
  else {
    posts[findPost] = req.body
    fs.writeFileSync('./CMS_project/users.json', JSON.stringify(posts))
    res.send({
      message: 'Update successfully'
    })
  }
})
app.delete('/api/v1/posts:/id', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  const { id } = req.params
  const findIndex = posts.findIndex((post) => post.id == id)
  if (findIndex != -1) {
    posts.splice(findIndex, 1)
    fs.writeFileSync('/.CMS_project/posts.json', JSON.stringify(posts))
    res.send({
      message: 'Delete successfully'
    })
  }
  else {
    res.send({
      message: 'User not found'
    })
  }
})
app.get('/api/v1/users/:id/posts', (req, res) => {
  const posts = JSON.parse(fs.readFileSync('./CMS_project/posts.json'))
  const { id } = req.params
  const fillPosts = posts.filter((post) => post.userId == id)
  if (fillPosts && fillPosts.length > 0) {
    res.send(fillPosts)
  }
  else {
    res.send({ message: 'User not found' })
  }
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
