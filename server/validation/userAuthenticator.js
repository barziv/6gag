const LocalStrategy = require('passport-local').Strategy

function initialize(passport, getUserByUsername) {
  const authenticateUser = async (username, password, done) => {
    const user = getUserByUsername(username)
    console.log(user);
    if (user == null) {
      return done(null, false, { message: 'No user with that Username' })
    }

    try {
      if (password === user.password) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.username))
  passport.deserializeUser((id, done) => {
    return done(null, getUserByUsername(id))
  })
}

module.exports = initialize