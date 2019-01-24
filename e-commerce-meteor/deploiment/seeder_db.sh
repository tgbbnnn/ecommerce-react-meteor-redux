#!/bin/sh

DBNAME="db_e_commerce"
DBHOST="localhost"
PASS=""

echo "Seeding of data ..."

insertTools=$(cat <<EOF

insert into e_products (name, price, description) values ('cocaCola', 20,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius mollis diam, quis fermentum enim bibendum eu. Quisque sed blandit orci. Proin nec pretium nibh' );

insert into e_products (name, price, description) values ('beer', 10,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla varius mollis diam, quis fermentum enim bibendum eu. Quisque sed blandit orci. Proin nec pretium nibh' );

insert into e_products_img (url, product_id) values ('http://pngimg.com/uploads/cocacola/cocacola_PNG0.png', 1);
insert into e_products_img (url, product_id) values ('https://www.picpng.com/image/view/26113', 2);
EOF
)
echo $insertTools | psql -h $DBHOST -U postgres -d $DBNAME; 

echo "seeding complete :)"