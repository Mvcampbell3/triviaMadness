module.exports = (req, res, next) => {
  try {
    const password = req.headers.authorization.split(" ")[1];
    if (password === process.env.Moderator_Key){
      next();
    } else {
      res.json({mod: false})
    }
  } catch{
    res.json({mod: false})
  }
}