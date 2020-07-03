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
      if(!user.comparePassword(password)) {
        return done(null, false, req.flash('error', 'Contraseña incorrecta'));
      }
      if(!user.admin) {
        return done(null, false, req.flash('error', 'No eres administrador'));
      }
      return done(null, user);
    });
  }
  ));

  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (user) {
        return done(null, false, req.flash('error', 'El usuario ya existe'));
      }
      else {
        const newUser = new User();
        newUser.username = username;
        newUser.password = newUser.encryptPassword(password);
        console.log(newUser)
        newUser.save(function(error, newUser){
          if (err) {
            return done(err);
          }
          else{
             return done(null, newUser, req.flash('success', 'Registro exitoso'));
          }
       });
      }
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
