#!/bin/sh
# install my redux app

echo "WELCOME YOU WILL CREATE REDUX APP ..."
echo ""

if [ $(dpkg-query -W -f='${Status}' tree 2>/dev/null | grep -c "ok installed") -eq 0 ];
then
  echo "--> need tree for this script downloading ..."
  sudo apt-get install tree;
fi

echo "Choose you install first ..."
echo""
echo "--> Do you want install with orm and framework version (y/n) (require nodejs and npm) ?"

read framework

if echo "$framework" | grep -iq "^y";then
	echo '--> Ok I will create your package.json'
	echo''
	echo '--> init...'
	echo''
	npm init
	echo''
	echo '--> Package.json initialised !'
	echo''
	echo '--> Installing babel conf ...'
	touch .babelrc
	echo "{\"plugins\": [\"transform-react-jsx\"]}" >> .babelrc
	echo''
	npm install babel-plugin-transform-react-jsx --save-dev
	echo''
	echo '--> babelconf was installed !'
	echo''
	echo ' --> Installing express ...'

	npm install express --save
	npm install ejs --save
	npm install body-parser --save
	echo''
	 
	echo '--> express was installed !'
	echo''
	echo '--> Installing redux ...'
	echo''
	npm install redux --save
	npm install redux-thunk --save
	echo''
	echo '--> redux was installed !'

	echo''
	echo '--> installing react ...'
	echo''
	npm install react --save
	npm install react-dom --save
	npm install react-redux --save

	echo''
	echo '--> react was installed !'
	echo''

	echo '--> installing babel and webpack'
	echo''
	npm install babel-preset-es2015 --save-dev
	npm install babel-core --save-dev
	npm install babel-loader --save-dev
	sudo npm install webpack -g --save-dev 
	npm install copy-webpack-plugin --save-dev
	npm install webpack-uglify-js-plugin --save-dev
	echo''
	echo '--> Dev dependences was installed !'
	


else
	echo "--> No..."

fi
echo""
echo '--> Create app tree...'

mkdir app
mkdir app/controllers
mkdir app/models
mkdir app/views
mkdir app/ressources
mkdir app/ressources/js
mkdir app/ressources/js/reducers
mkdir app/ressources/js/actions
mkdir app/ressources/js/components
mkdir app/ressources/js/containers
mkdir app/ressources/css
mkdir app/ressources/assets

touch app/ressources/js/index.jsx
touch app/server.js
tree app
