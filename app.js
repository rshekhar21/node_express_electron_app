const express = require('express')
const app=express()
const path = require('path')
const port = '3333'

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/crud', require('./router/_crud'))
app.use('/sys', require('./router/setup'))
app.use('/app', require('./router'))
app.get("/", (req, res) => res.render("index"));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname +'/public/index.htm');
// })

app.listen(port, ()=>console.log(`app address http://localhost:${port}`))