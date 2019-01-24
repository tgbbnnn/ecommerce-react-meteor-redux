// controller of products components to do some actions

// require tool


//requiring model ...

let Postgre = require('../models/postgre_model.js') //postgre data model

//lets go ...
let ProductsController = function () {

}
ProductsController.prototype = {
	'getProductData':(req,res)=>{
		let products = []
		Postgre.pool.query('SELECT e_products.id, e_products.name, e_products.description, e_products.price, e_products_img.url FROM e_products, e_products_img WHERE e_products.id = e_products_img.product_id',(err, result)=>{
			if(err){
				console.error(err)
			}
			else{
				result.rows.map((product)=>{
					var p = {
						product_id : product.id,
						product_name : product.name, 
						product_price : product.price,
						product_description : product.description,
						product_image: product.url,
						product_tag:[]
					}
					products.push(p)
				})
				res.send(products)
			}
		})
	}
	
}

module.exports = new ProductsController()
