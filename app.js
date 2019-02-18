var express=require('express')
var app=express()
const session=require('express-session')

var passport=require('passport')
const GOOGLE_CLIENT_ID='583658863496-88q6jtvqgej170v2dnpljq6pvpllu9gt.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='waN_1q2VlJ87U1RlIv_V1vGa'
var GoogleStrategy = require('passport-google-oauth20').Strategy;



// passport.serializeUser(function(user, done) {
//     done(null, user.id);
//   });
  
//   passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//       done(err, user);
    // });
//   });
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,

  }))

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs')




passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3030/auth/google/callback',
    passReqToCallback   : true
  },
  function(request ,accessToken, refreshToken, profile, done) {
    console.log(profile)
  }
));

app.get('/auth/google',
passport.authenticate('google', { scope:['profile','email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    console.log(res)
// Successful authentication, redirect home.
res.redirect('/');
});
app.get('/login',()=>{
    res.render('home')
})


app.get('/',(req,res)=>{
    res.render('home');
})
app.listen(3030,()=>{
    console.log('server is running at port 3030')
})