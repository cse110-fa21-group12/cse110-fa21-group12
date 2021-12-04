"use strict";

module.exports = {
  port: 8080,
  noAuth: new Set([
    '/source/login.html',
  ]),
  firebaseConfig: {
    apiKey: "AIzaSyBL68BR-D9W0HDwF99dI04lf1OAuxN-6ck",
    authDomain: "zen-recipe-9eb67.firebaseapp.com",
    projectId: "zen-recipe-9eb67",
    storageBucket: "zen-recipe-9eb67.appspot.com",
    messagingSenderId: "1039363703080",
    appId: "1:1039363703080:web:b53b5377e30053272f101d",
    measurementId: "G-RS5KBT98CF",
  },
  jwtKeyPublic: ['-----BEGIN PUBLIC KEY-----',
  'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDsBPbWsLMpn70pw64CRpxCbzjc',
  'UNydYV3weVkeoH3Jsug9leTX7Lo2MGomTUxLxw1v3XWxjSdrbT+eOrEJTZojKH6R',
  '9HBO0trcvOVq0Cj3ZfXpb36UUnpOxbLfBtnBAdWpW1Ky7eSGdPU7mU4TdT4uZBpp',
  '6zGH24DogrYlq9hftQIDAQAB',
  '-----END PUBLIC KEY-----'].join('\n'),
  jwtKeyPrivate: ['-----BEGIN RSA PRIVATE KEY-----',
    'MIICXgIBAAKBgQDsBPbWsLMpn70pw64CRpxCbzjcUNydYV3weVkeoH3Jsug9leTX',
    '7Lo2MGomTUxLxw1v3XWxjSdrbT+eOrEJTZojKH6R9HBO0trcvOVq0Cj3ZfXpb36U',
    'UnpOxbLfBtnBAdWpW1Ky7eSGdPU7mU4TdT4uZBpp6zGH24DogrYlq9hftQIDAQAB',
    'AoGBAOUB9Bhgn5cVvdAWZHMk3F3B2aQ8ebPjU+kPdZ+4DhV1mM6Y8NFqi0wlMfo0',
    'KoGkhK80bQx4b/VWrdH0FO938sOpSwRPMYM6igrdAAOyxPtOilPsRIq53wcCZq6E',
    'joEfzMFmDd2O6BykOEY/WYqSE57W2NSbm4UljWrBrt4nNlNJAkEA/FeDkzgQJ0g/',
    '1ppqnHEPgI9MWEPi5lCYGUQbjilEzbXIJx+IBk8qfpeDg8e0lU8uO8wIc5D5mc33',
    'h57QX8zBAwJBAO9w3+nKlKDwg0iG2noqvsdSVHBdz19rFK+lgKeJlMq61emOf4w7',
    'RZwey0nimg4uXOTHZe8k8d3RHg6kUzgsEucCQQCUlvfMdePVLc8hkHYcvtqxCjCb',
    'fQYcNvMJVbigIp74PwWoPAH+LRnJx3BS5gLpNOH1pjSH0KOZtNYATz1GXCx/AkEA',
    'lLlUq3/kL88UjIEOxWE1nNLblev++bKmZ69yKR5A6GeCpQ6Y1P6f7ygFd0AkFnjf',
    'xE7CVvdosDHK7KdO9Y4SswJAJsJ2vdg6sJhwa894GFsI4o2zlAG/TiI1A9RJ7qmo',
    'mSqbSkSLJYZyhXxxrw7FPzC5+HNXNVchupC2Dmsl7cq+Iw==',
    '-----END RSA PRIVATE KEY-----'].join('\n')
};
