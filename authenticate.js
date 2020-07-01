var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

module.exports = (passport) => {
  passport.use(new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, req.flash('error', 'Nombre de usuario incorrecto'));
      }
      if (user.password != password) {
      // if (user.validPassword(password)) {
        return done(null, false, req.flash('error', 'Contraseña incorrecta'));
      }
      return done(null, user);
    });
  }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

passport.use('local-signup', new LocalStrategy({
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('signupMessage', 'The Email is already Taken.'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
  console.log(newUser)
    await newUser.save();
    done(null, newUser);
  }
}));

//
// passport.use('local-signin', new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'password',
//   passReqToCallback: true
// }, async (req, email, password, done) => {
//   const user = await User.findOne({email: email});
//   if(!user) {
//     return done(null, false, req.flash('signinMessage', 'No User Found'));
//   }
//   if(!user.comparePassword(password)) {
//     return done(null, false, req.flash('signinMessage', 'Incorrect Password'));
//   }
//   return done(null, user);
// }));
//
