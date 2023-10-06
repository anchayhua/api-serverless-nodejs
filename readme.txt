npm i -g serverless
serverless login

mkdir serverless-api && cd $_
npm init -y
npm i --save aws-sdk body-parser express node-uuid serverless-http cors morgan
npm i --save serverless-dynamodb-local@0.2.30 serverless-offline @aws-sdk/lib-dynamodb

npm install --save-dev serverless-mocha-plugin

Tests:
    npm install --save-dev jest supertest
    npx jest

sls offline start --migrate
    sls dynamodb install
sls deploy

serverless invoke local --function general-app
    serverless invoke --function general-app

curl -H "Content-Type: application/json" -X POST http://localhost:3000/general -d '{"title": "Data de prueba"}'
curl -H "Content-Type: application/json" -X POST https://b35uuai4il.execute-api.us-east-1.amazonaws.com/dev/general -d '{"title": "Data de prueba"}'
curl -H "Content-Type: application/json" -X PUT http://localhost:3000/general -d '{"generalId": "d70e8e75-d815-4d10-85b6-8ff2339eee47", "title": "Data de prueba 2", "done": true}'
curl -H "Content-Type: application/json" -X DELETE http://localhost:3000/general/328c4de5-57ba-477a-baf1-936b457a63ef

// npm i --save mocha supertest 
// sls create function -f general-app --handler index.handler

//Para cambiar de version V2 -> V3
npm install -g aws-sdk-js-codemod
npx aws-sdk-js-codemod -t v2-to-v3 index.js