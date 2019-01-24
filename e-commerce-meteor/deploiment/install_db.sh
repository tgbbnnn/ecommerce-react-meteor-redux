#!/bin/sh

DBNAME="db_e_commerce"
DBHOST="localhost"
PASS=""

echo "Deploying db of e-comerce app..."

echo "creating tables ..."

postgres=$(cat <<EOF 
dropdb $DBNAME --if-exists;
createdb $DBNAME -E UTF8;
EOF
)
createTable=$(cat <<EOF

CREATE TABLE e_products (
	id SERIAL PRIMARY KEY ,
	name VARCHAR,
	price INTEGER,
	description VARCHAR

);
CREATE TABLE e_products_img (
	id SERIAL PRIMARY KEY ,
	url VARCHAR,
	product_id INTEGER REFERENCES e_products (id) ON DELETE CASCADE
);

CREATE TABLE e_products_tag (
	id SERIAL PRIMARY KEY ,
	tags INTEGER ARRAY,
	product_id INTEGER REFERENCES e_products (id) ON DELETE CASCADE
);


EOF
)
echo $postgres | sudo -i -u postgres
echo "$DBNAME is deployed"

echo "Deploying tables ...."

echo $createTable | psql -h $DBHOST -U postgres -d $DBNAME; 

echo "your db is deployed enjoy your dev :)"

