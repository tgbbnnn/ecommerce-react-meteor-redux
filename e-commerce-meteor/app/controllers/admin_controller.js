// controller of products components to do some actions

// require tool


//requiring model ...

let Postgre = require('../models/postgre_model.js') //postgre data model

//lets go ...
let AdminController = function () {

}
AdminController.prototype = {
	'render':(req,res)=>{
		if(req.session.name == undefined || req.session.name == ''){
			res.redirect('/admin_portal')
		}
		else{
			res.render('client/index.ejs')
			res.end()
		}
	},
	'portalRender':(req,res)=>{
		res.render('client/index.ejs')
		res.end()
	},
	'updateProduct':(req,res)=>{
	
		let product = req.body // we get data from post

		//check product for XSS ATACK
		console.log(product)
		
		
		Postgre.pool.query("UPDATE e_products SET name = $1, price=$2, description = $3 WHERE id = $4  ",[product.product_name, product.product_price, product.product_description, product.product_id],(err, result)=>{
			if(err){
				console.error(err)
			}
		})
		Postgre.pool.query("UPDATE e_products_img SET url =$1  WHERE product_id =$2  ",[product.product_image, product.product_id],(err, result)=>{
			if(err){
				console.error(err)
			}
		})
		res.send(product)
	},
	'addProduct':(req,res)=>{

		let product = req.body // we get data from post

		//check product for XSS ATACK
		console.log(product)
		
		Postgre.pool.query("INSERT INTO e_products (name,price,description) VALUES ($1,$2,$3) RETURNING id ",[product.product_name, product.product_price, product.product_description],(err, result)=>{
			if(err){
				console.error(err)
			}
			else{
				let product_id = result.rows[0].id
				product.product_id = product_id
				Postgre.pool.query("INSERT INTO e_products_img (url,product_id) VALUES ($1,$2) ",[product.product_image, product_id ],(err, result)=>{
					if(err){
						console.error(err)
					}
				})
					res.send(product)

			}
		})
		
	},
	'deleteProduct':(req,res)=>{

		let product = req.body // we get data from post

		//check product for XSS ATACK
		console.log(product)
		Postgre.pool.query("DELETE FROM e_products WHERE id = $1 ",[product.product_id],(err, result)=>{
				if(err){
					console.error(err)
				}else{
					
					res.send(product)
				}
			})
		
		
	}
	
}

module.exports = new AdminController()
