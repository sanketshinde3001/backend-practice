var express = require('express');
var router = express.Router();
const Mymodel = require("./users");
const passport = require('passport');
const flash = require("connect-flash")
const localStrategy = require("passport-local");

// passport.use(new localStrategy(Mymodel,passport.authenticate()));
passport.use(new localStrategy(Mymodel.authenticate()));

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

// Profile Page
router.get('/profile', isLoggedIn, function(req, res) {
  res.render("profile", {
      user: req.user
  });
});

router.get('/admin', async(req, res)=>{
  const users = await Mymodel.find({});
  res.render("admin", {
      title:"Admin Panel",
      users:users
  });
});
router.get('/edit/:id', async(req, res)=>{
  const {id} = req.params;
  const user = await Mymodel.findById({_id:id});

  if(user==null){
    res.redirect("/");
  }
  else{
    res.render("edit",{
      user:user
    })
  }
});

router.post("/update/:id",async(req,res)=>{
  const {id} = req.params;
  const {username,email,password}=req.body;
  const updateuser = await Mymodel.findByIdAndUpdate({_id:id},{username,email,password},{new:true})
  res.redirect("/admin")
})
router.get("/delete/:id",async(req,res)=>{
  const {id} = req.params;
  const deleteuser = await Mymodel.findByIdAndDelete({_id:id})
  res.redirect("/admin")
})


// register route
router.post('/register', function (req,res){
  var userdata = new Mymodel({
    username: req.body.username,
    email:req.body.email
  });

  Mymodel.register(userdata,req.body.password)
    .then(function(registereduser){
      passport.authenticate("local")(req,res,function(){
        res.redirect('/profile');
      })
    })
    // First line register user 
    // then it will redirect to the profile page

});

// Login code


router.post("/login", passport.authenticate("local",{
  successRedirect: "/profile",
  failureRedirect: "/"
}) ,function (req,res){})

router.get('/logout',function(req,res,next){
  req.logout(function(err){
    if(err){return next(err);}
    res.redirect('/')
  });
});

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
