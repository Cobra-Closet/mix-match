const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('hit cookieController.setSSIDCookie');
  res.cookie('ssid', res.locals.sessionToken, { httpOnly: true, expires: res.locals.expiresIn });
  console.log('this is the users cookie', res.cookie);
  return next();
};

module.exports = cookieController;
