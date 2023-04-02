// 支持 typescript
npm i --save-dev @types/mocha
npm i --save-dev ts-node
npx mocha --require ts-node/register 'test/math.ts' 


// 生成测试报告
npm install --save-dev mochawesome
npx mocha test/* --reporter mochawesome

// 引入 nyc 获取代码覆盖率
npm i nyc --save-dev
npx nyc --reporter=html mocha