const path = require('path');
const Koa = require('koa');
const app = new Koa();
const static = require('koa-static');
const port = process.env.PORT || 1200;

app.use(static(path.resolve(__dirname, 'dist')));
app.listen(port, function() {
  console.log(`Server running at http://localhost:${port}/`);
});