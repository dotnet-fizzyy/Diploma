rm -rf dist && mkdir dist

"./node_modules/.bin/tsc" -p ./tsconfig.json --skipLibCheck

cp package.json ./dist
cp docker-compose.yml ./dist
cp Dockerfile ./dist
cp yarn.lock ./dist
cd ./dist
npm pack
