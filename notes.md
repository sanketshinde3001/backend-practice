# Express JS

##installation
```js
npm i express
```
basic code

```js
const express = require('express')
const app = express()

// Middleware
app.use((req,res,next)=>{
    // console.log(req) 
    // it contains all data came from user
    // console.log(res) 
    // it contains all data came from server as respond for user
    next();
    // it transfer control for next middleware
})

// Below code is used to make routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(3000)
```

* req mein saara data hota hai aane waale user ki request ki
taraf ka, jaise ki uski location, device info and other
things, res mein controls hote hai jinke basis pe hum server
se response bhej paate hai, next is just a push so that our
request moves to the next thing which should be executed


### route parameters
```js
app.get('/profile/sanket', (req, res) => {
  res.send('Hello World!')
})
// here we make route for sanket but if we go to
// /profile/rahul it will get error 
// if we want that it should work for all names after profile then make it dynamic
// use ':username'  , ':' is used before it

app.get('/profile/:username', (req, res) => 
})

// :username - this called params
// If we want that the route name display in website also then

app.get('/profile/:username', (req, res) => {
  res.send(`Hello from ${req.params.username}`)
})

```

* route parameters - to make any route dynamic you can use at the place where you want to make it dynamic, and to access there value use - 
req. params  
eg -
/ author/books/issued/harsh
/author/books/issued/harshita
/ author/books/issued/harshit


### ROUTES
* html ke paas superpowers nahi hai calculation krne ki if we write 1+2 in html , it will show as it is - 1+2 but in ejs we have option to calculate it
* ejs is html with some powers

```js
app.get('/', (req, res) => {
  res.send('<h1>HII</h1>')
})
```
But we cant write all html in such way . so use ejs
template engines => ek markup style jo ki baad mein Convert
hojaayegi html mein
### EJS Setup
```js
//ejs install
npm i ejs

//configure ejs
app.set("view engine", "ejs");

// ek views folder banao
// usmein ejs files banao
// send ki jagah render karo

app.get('/ejsfile', (req, res) => {
  res.render('index', {heading : "This is Title passed from script"})
})

// Passing value like above
// and we can use it in ejs like below

<h2><%= heading %></h2>

```
### static files
images, stylesheets, frontend js setup karnal

static files setup karne ke liye:
1) create a folder called public
2) create three folders inside it -  stylesheets, javascripts , images
3) configure the express static in script.js file
```js
app.use(express.static('./public'));
```
4) understand the path

currently we are in views folder so that we want to use files in folder
- public > stylesheets/images/javascripts
so we want to came out from views folder and go to the public folder and to specific file further.

```js
../public/stylesheets/style.css
// but we already define path ./public above
// so we need to remove public in it
../public/stylesheets/style.css
```

### Error Handling

```js
app.get("/error",(req,res,next) => { 
  throw Error("Something Went Wrong")
})

app.use(
  function errorHandler (err, req, res, next) {
    if (res.headersSent) {
      return next(err)
    }
    res.status(500)
    res.render('error', { error: err })
  }
  
)
```

## Recap

1) express js install
```js
npm install express
```
2) express js boilerplate code
```js
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
```
3) ejs setup
    * install ejs
    ```js
    npm i ejs
    ```
    * set view engine
    ```js
    app.set("view engine", "ejs");
    ```
    * create views folder
    * create ejs files
    * render ejs files inside route
    ```js
    res.render('home')
    ```
4) express static files setup
5) architecture of public folder

## Express Generator

hum logo ko kaafi saara kaam karna padta hai express har baar jab hum naya project banaayege to har baar fir mat lab ki poora code likho and sab kuchh setup karo, is help of express generator, use express generator and it structure for you and it will also write the basic code setup krne mein i ska mat lab se utna hi kaam krna padega, time ko bacha sakte ho with will make the folder for the project

express generator ek folder bana ke deta hai, jiska mat lab aapko
khudse folder nahi banana hai, to express gen saare files ko is folder
mein daal ke dega

## steps to use express generator
1) sabse pahle jeevan mein ek baar laptop par install
karo globally
```js
npm i express-genérator -g
```
2) To create new app anywhere:
  open cmd move to desktop
create new app
```js
express appname --view=ejs

cd appname

npm i

code .
```
app.get - > router. get
npx nodemon filename -> npx nodemon


# MongoDB

| **Code Side** | **MongoDB Side** |
|:----------:|:------------:|
|    DB Setup    |   Db Formation   |
|      Model     |    Collection    |
|     Schema     |     Documents    |

har naye app ka data store hoga storage mein, par usey directly rakne ki jagah ek container mein rakhege, us container mein sirf us app ka data aayega

- ek app ka poora data => db
- ek app mein variety of data hota hai par poora data hota app ka hi hai, par us data ka sub category kehlaata hai collection
- collection mat lab ki bola users ka data, ek user pe baat kri to hua document

1) install mongodb
2) install mongoosejs
    ```js
    npm i mongoose
    ```
3) require and setup connection
4) make schema
5) create model and export


```js
const mongoose = require( "mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/practicekaro");
// it will create the db name - practicekaro

const userschema = mongoose.Schema({
  username: String,
  name: String,
  age: Number
})
// each document have above three things

module.exports = mongoose.model("user",userschema);
//user - collection name
```

import above using
```js
const userModel = require("./users")
```

### Curd Commands
```js
var express = require('express');
var router = express.Router();
const Mymodel = require("./users")


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/create',async function(req, res) {
  const cdata =await Mymodel.create({
    username:"sanket",
    age:20,
    name:"shinde"
  });
  res.send(cdata);
});

router.get("/findall",async function(req,res){
  const data = await Mymodel.find()
  res.send(data)
})
router.get("/find",async function(req,res){
  const data1 = await Mymodel.findOne({username:"sanket"})
  res.send(data1)
})
router.get("/deleteone",async function(req,res){
  const data2 = await Mymodel.findOneAndDelete({username:"sanket"})
  res.send(data2)
})

module.exports = router;

```

# Cookies and Sessions 
- ## Session
```js
npm i express-session
```
Add Following in app.js file

```js
var session = require("express-session")

app.use(session({
  resave:false,
  saveUninitialized:false,
  secret:"golumolu"
}))

```

In index.js
```js
router.get('/', function(req, res) {
  req.session.ban = true;
  res.render('index');
});

router.get("/checkban", function(req,res){
  if(req.session.ban === true){
    res.send("you are banned");
  }
  else{
    res.send("not banned")
  }
});
router.get("/removeban", function(req,res){
  req.session.destroy(function(err){
    console.log(err);
    res.send("ban removed")
  })
});
```

## Cookies

Already installed by express-generator

```js
router.get('/', function(req, res) {
  res.cookie("age",20)
  req.session.ban = true;
  res.render('index');
});

router.get("/read",async function(req,res){
  console.log(req.cookies.age)
  res.send("check")
})
router.get("/dcookies",function(req,res){
  res.clearCookie("age")
  res.send("done")
})
```

# Flash messages
When we enter login details , it goes to backend - if they are not correct - it will send respond from backend to frontend.
it can be make possible by using - flash messages.

1) install connect-flash
    ```js
    npm i connect-flash
    ```
2) make sure you setup express-session
    a) Install express-session
    ```js
    npm i express-session
    ```
    after var logger write - 
    ```js
    const expressSession = require("express-session")
    const flash = require("connect-flash")
    ```
    after appuse view ejs
    ```js
    app.use(session({
      resave:false,
      saveUninitialized:false,
      secret:"golumolu"
    }))

    
    app.use(flash());
    ```
3) make sure you put connect flash in a app.use function (code given above step)
4) kisi bhi route mein aap ko flash create karna hai
5) kisi bhi doosre route par app use chalane ka try karein
6) AAP CONNECT FLASH KO USE NAHI KR SKTE BINA EXPRESS SESSION

* agar login hojaaye to login page ke baad profile page dikhaado
* agar naa ho to fir, mujhe is route se kisi aur route lejao jaise ki / error and waha par dikhao failed
* flash message aapko ye allow krte hai ki aap is route mein bane huye data ko doosre route mein use kr skol

```js
router.get('/sendflash', function(req, res) {
  req.flash("age" , 20)
  res.send("Done")
});
router.get('/receiveflash', function(req, res) {
  console.log(req.flash("age"))
  res.send("recived")
});
```

## Case Insensetive Searches -

```js
router.get('/create',async function(req, res) {
  let userdata = await Mymodel.create({
    username: "vaishnavi",
    nickname: "Raykar",
    description: "sf ffsfdfdfsdfsdfsdf fsf f fs f sdff",
    categories :['aa','bb','cc','dd']
  })
  res.send(userdata)
});

router.get('/find',async function(req, res) {
  let finduser = await Mymodel.find({username:"vaishnavi"})
  res.send(finduser)
});

// If we try to find 'Vaishnavi' , it will not find it.
// use following

var nametypes = new RegExp("Abc",'i');
let finduser = await Mymodel.find({username:nametypes})

//But issue is , it will find all words that include abc
// ABc, abc , abcd , ABC .......
// We want exact match but only word case not matters..
var nametypes = new RegExp("^Abc$",'i');
```

## How do I find documents where an array field contains all of a set of values?

```js
router.get('/findcat',async function(req, res) {
  let findusercat = await Mymodel.find({categories:{$all:['a']}})
  res.send(findusercat)
});

```

## How can I search for documents with a specific date range in Mongoose?

```js
router.get('/finddate',async function(req, res) {
  var date1 = new Date('2024-02-05')
  var date2 = new Date('2024-02-10')
  let finduserdate = await Mymodel.find({datecreated:{$gte:date1 , $lte : date2}})
  res.send(finduserdate)
});
```

## How can I filter documents based on the existence of a field in Mongoose?
```js
router.get('/findfield',async function(req, res) {
  let findfield = await Mymodel.find({categories: {$exists : true}})
  res.send(findfield)
});

```

## How can I filter documents based on a specific field's length in Mongoose?
```js

```


# Authentication
1) install these packages
    ```js
    npm i passport passport-local passport-local-mongoose mongoose express-session
    ```
2) write app.js code first in app.js file and write it after view engine and before logger    
      after var logger write - 
    ```js
    const expressSession = require("express-session")
    ```
    passport require , see location
    ```js
    var indexRouter = require('./routes/index');
    var usersRouter = require('./routes/users');
    const passport = require('passport')
    ```

    after appuse view ejs
    ```js
    app.use(session({
      resave:false,
      saveUninitialized:false,
      secret:"golumolu"
    }))
    // above code used to save data to server as sessions

    app.use(passport.initialize());
    // initialize the passport for authenticate
    app.use(passport.session());
    // use to create session
    passport.serializeUser(usersRouter.serializeUser()) ;
    passport.deserializeUser(usersRouter.deserializeUser()) ;
    ```



