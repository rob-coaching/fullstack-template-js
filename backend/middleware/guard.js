import jwt from 'jsonwebtoken'

export const guard = (req, res, next) => {
  // expect JWT token to be present in either a cookie "token" of the authorization header
  const token = req.headers.authorization || req.cookies?.token

  // no token? => reject!
  if(!token) return next({ error: "Token not provided", status: 401 })

  // token invalid? => reject
  try {
    const decodedUserData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedUserData
    next()
  }
  // token not valid => reject
  catch(err) {
    next({ status: 401, err: err.message })
  }

}