const { User } = require("../models/User");
let auth = (req, res, next) => {
  // 인증처리하는 곳
  // 클라이언트 쿠키에서 토큰 가져옴
  let token = req.cookies.x_auth;
  // 토큰 복호화하고 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });
    req.token = token;
    req.user = user;
    next();
  });
  // 유저 있을 경우 인증 OK
  // 유저 없을 경우 인증 NO
};

module.exports = { auth };
