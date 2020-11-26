let express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
let app = express();
let router = express.Router();
let port = 3000;

app.use(express.static(__dirname + '/dist'));

router.get('/', function (req, res, next) {
  res.sendFile('index.html', {root: __dirname + "/dist"});
});

app.use('/', router);

app.use('/someurl', createProxyMiddleware({
  target: "https://someurl",
  changeOrigin: true,
  pathRewrite: {
      [`^/someurl`]: '',
  },
}));

app.listen(port);