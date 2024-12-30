// Adapted from https://www.labnol.org/code/json-web-token-201128

function createJwt({ privateKey, expiresInHours, data = {} }) {
  // Sign token using HMAC with SHA-256 algorithm
  const header = {
    alg: 'HS256',
    typ: 'JWT',
  };

  const now = Date.now();
  const expires = new Date(now);
  expires.setHours(expires.getHours() + expiresInHours); //TODO: Change to minutes

  // iat = issued time, exp = expiration time
  const payload = {
    exp: Math.round(expires.getTime() / 1000),
    iat: Math.round(now / 1000),
  };

  // add user payload
  Object.keys(data).forEach(function (key) {
    payload[key] = data[key];
  });

  const base64Encode = (text, json = true) => {
    const data = json ? JSON.stringify(text) : text;
    return Utilities.base64EncodeWebSafe(data).replace(/=+$/, '');
  };

  const toSign = `${base64Encode(header)}.${base64Encode(payload)}`;
  const signatureBytes = Utilities.computeHmacSha256Signature(toSign, privateKey);
  const signature = base64Encode(signatureBytes, false);

  return `${toSign}.${signature}`;
};

function generateAccessToken(data) {
  const PRIVATE_KEY = PropertiesService.getScriptProperties().getProperty('JWT_PrivateKey');
  const accessToken = createJwt({
    privateKey: PRIVATE_KEY,
    expiresInHours: 1,
    data: data,
  });
  Logger.log(accessToken);
  return accessToken;
};

function parseJwt(jsonWebToken) {
  const PRIVATE_KEY = PropertiesService.getScriptProperties().getProperty('JWT_PrivateKey');
  const [header, payload, signature] = jsonWebToken.split('.');
  const signatureBytes = Utilities.computeHmacSha256Signature(`${header}.${payload}`, PRIVATE_KEY);
  const validSignature = Utilities.base64EncodeWebSafe(signatureBytes);
  if (signature === validSignature.replace(/=+$/, '')) {
    const blob = Utilities.newBlob(Utilities.base64Decode(payload)).getDataAsString();
    const { exp, ...data } = JSON.parse(blob);
    if (new Date(exp * 1000) < new Date()) {
      throw new Error('The token has expired');
    }
    Logger.log(data);
  } else {
    Logger.log('🔴', 'Invalid Signature');
    throw new Error('Invalid Signature');
  }
};