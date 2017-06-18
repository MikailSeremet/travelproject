var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Place = require("./models/place"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    expressSession = require("express-session"),
    Comment = require("./models/comment"),
    seedDB = require("./seeds")

var commentRoutes = require("./routes/comments"),
    placeRoutes = require("./routes/places"),
    indexRoutes = require("./routes/index")
mongoose.connect("mongodb://localhost/coupletraveler");
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"));
//seedDB(); //seed the database

// PASSPORT CONFIGURATION

app.use(expressSession({
    secret : "Annie are you ok?",
    resave : false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});


//requiring routes
app.use("/",indexRoutes);
app.use("/places",placeRoutes);
app.use("/places/:id/comments",commentRoutes);


app.listen(process.env.PORT,process.env.IP, function(){
       console.log("Couple Traveler Server Started!");
});