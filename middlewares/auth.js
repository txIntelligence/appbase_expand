const JWT = require('jsonwebtoken')
const JWTConfig = require('../cipher/jwt_config')
const NoAuthError = require('../errors/no_auth');

module.exports = (options)=>{
  return (req,res,next)=>{
    (async ()=>{
      const authorization = req.get('Authorization');
      if (!authorization || authorization.indexOf('Bearer') === -1) {
        throw new NoAuthError(null);
      }
      const token = authorization.split(' ')[1];
      if (!token) {
        throw new NoAuthError(null);
      }
      let user;
      try {
        user = JWT.verify(token,JWTConfig.SELECT);
      } catch (e) {
        throw new NoAuthError(token);
      }
    })().then(()=>{
      next();
    }).catch((e)=>{
      next(e);
    })
  }
}