'use strict'
// express stuff

const express = require('express')
let app = express()
const server = require('http').Server(app)
let session = require('express-session')
// my app stuff
const bodyParser = require('body-parser')

//controller
const ProductsController = require('./controllers/products_controller.js')
const AdminController = require('./controllers/admin_controller.js')


//my app conf
const path = require('path')
app.set('view engine', 'ejs')
app.set('views', './dist/views')
app.use(express.static(path.join(__dirname + '/')))

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

//route 

app.get('/',(req,res)=>{

	res.render('client/index.ejs')
	res.end()
})

app.get('/admin',(req,res)=>{

	AdminController.render(req,res)
})
app.get('/admin_portal',(req,res)=>{

	AdminController.portalRender(req,res)
})
app.get('/get_product_data',(req,res)=>{
	ProductsController.getProductData(req,res)
})
app.post('/update_product',(req,res)=>{
	AdminController.updateProduct(req,res)
})
app.post('/add_product',(req,res)=>{
	AdminController.addProduct(req,res)
})
app.post('/delete_product',(req,res)=>{
	AdminController.deleteProduct(req,res)
})
app.listen(8000,function(){
	console.log('================================ server listening =====================')

})
