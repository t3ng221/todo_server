const { statusCodes } = require("../helper/statusCodes.js");
const { errorResponseHandler } = require("./../helper/errorResponseHandler.js");
const jsonwebtoken = require("jsonwebtoken");
const { jwtSecret } = require("../config/variables.js");

const isTokenExpired = (expirationTime) =>
  expirationTime <= Math.floor(Date.now() / 1000);

const authenticate = () => (req, res, next) => {
  try {
    const token =
      req.headers.authorization?.split(" ")[1] || req.headers.token;

    if (!token) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40113,
        },
      });
    }

    const decoded = jsonwebtoken.verify(token, jwtSecret);

    if (isTokenExpired(decoded.exp)) {
      throw Object.assign(new Error(), {
        status: statusCodes.UNAUTHORIZED,
        error: {
          code: 40110,
        },
      });
    }

    req.user = decoded;
    return next();
  } catch (err) {
    errorResponseHandler(err, req, res);
  }
};

const userAuthenticate = authenticate();

module.exports = { userAuthenticate };
