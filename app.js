var express=require('express')
var app=express()
const session=require('express-session')
const User =require('./models/User');

var passport=require('passport')
const GOOGLE_CLIENT_ID='583658863496-88q6jtvqgej170v2dnpljq6pvpllu9gt.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET='waN_1q2VlJ87U1RlIv_V1vGa'
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var mongodb=require('mongodb');
const mongoose=require('mongoose');


const url ='mongodb://localhost:27017/FabricUsers' ;
mongoose.Promise = global.Promise;

mongoose.connect(url).then(()=>{
  console.log("mongodb connected ...!");
}).catch(err=>{
console.log(err);
})


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

app.use(passport.initialize())
app.use(passport.session());

app.set('view engine','ejs')




passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3030/auth/google/callback',
    passReqToCallback   : true
  },
<<<<<<< HEADgit 
  function(request ,accessToken, refreshToken, profile, done) {
=======

  function(request,accessToken, refreshToken, profile, done) {

   var user={ firstName:profile.name.givenName,
   }

   new User({user}).save()
   .then(user=> done(null,user))
>>>>>>> 32c59adbc498ec24922d3bc2345405c7f6265a48
    console.log(profile)


  }
));passport.serializeUser( (user,done)=>{
  console.log("in serialize  of oauth.............")
  done(null,user.id);
} );

passport.deserializeUser( (id,done)=>{
  console.log("in deserialize of oauth.....................")
  User.findById(id).then(user =>done(null,user));
  
} );



app.get('/auth/google',
passport.authenticate('google', { scope:['profile','email'] }));

app.get('/auth/google/callback', 
passport.authenticate('google', { failureRedirect: '/login' }),
function(req, res) {
    console.log(res)
// Successful authentication, redirect home.
console.log(
  
"hello !"
);


res.redirect('/success');
});
app.get('/login',(req,res)=>{
    res.render('home')
})


app.get('/success',(req,res)=>{
res.send('Welcome ....................here !')

})

app.get('/',(req,res)=>{
    res.render('home');
})
app.listen(3030,()=>{
    console.log('server is running at port 3030')
})