// Fill in your client ID and client secret that you obtained
// while registering the application
// const clientID = '7e015d8ce32370079895'
// const clientSecret = '2b976af0e6b6ceea2b1554aa31d1fe94ea692cd9'

const clientID = 'c2a4890608adfe6ccd48'
const clientSecret = '629d1d8ca21547e64106d986935c373164658ff2'

const Koa = require('koa');
const path = require('path');
const serve = require('koa-static');
const route = require('koa-route');
const axios = require('axios');
const tokenSDKServer = require('./lib/tokenSDKServer.js')

const app = new Koa();

const main = serve(path.join(__dirname + '/public'));

const oauth = async ctx => {
  const requestToken = ctx.request.query.code;
  console.log('authorization code:', requestToken);

  const tokenResponse = await axios({
    method: 'post',
    url: 'https://github.com/login/oauth/access_token?' +
      `client_id=${clientID}&` +
      `client_secret=${clientSecret}&` +
      `code=${requestToken}`,
    headers: {
      accept: 'application/json'
    }
  });

  const accessToken = tokenResponse.data.access_token;
  console.log(`access token: ${accessToken}`);

  const result = await axios({
    method: 'get',
    url: `https://api.github.com/user`,
    headers: {
      accept: 'application/json',
      Authorization: `token ${accessToken}`
    }
  });
  console.log(result.data);
  const name = result.data.name;

  ctx.response.redirect(`/welcome.html?name=${name}`);
};

const testsm = (ctx) => {
  // console.log(tokenSDKServer)
  // tokenSDKServer.main()
  tokenSDKServer.getPubByDid("did:ttm:u0ece7b787c097d55b87d4c01efae0fbe6a27b10cec8a67847c68f0482a8dc")
    .then((res) => {
      console.log('res', res)
    })
    .catch((err) => {
      console.log('err', err)
    })
  ctx.response.redirect(`/test.html`);
}

app.use(main);
app.use(route.get('/oauth/redirect', oauth));
app.use(route.get('/testsm', testsm))

app.listen(8080);
