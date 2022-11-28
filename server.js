const Express = require("express");
const BodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;

const database = require('./dbconnector');

const dotenv = require('dotenv');
const userRoutes = require("./V1.0/apiRoutes/userRoutes");
const postRoutes = require("./V1.0/apiRoutes/postRoutes");
const apiVersion = 'v1.0';
const UserModel = require("./models/userModel");
const path = require("path");

dotenv.config();
var app = Express();
app.use(BodyParser.json({limit:'100mb'}));
app.use(BodyParser.urlencoded({ extended: true }));


app.set("view engine",'ejs');
app.set('view',path.join(__dirname,'views'));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("listening on hello :: " + PORT);
});
var logger = (req,res,next)=>{
  console.log(req.originalUrl);
  next();
}
app.get('/',(req,res)=>{
  res.status(200).json({"message":"running"});
});
app.use(logger);
app.use(`/api/${apiVersion}`,userRoutes);
app.use(`/api/${apiVersion}`,postRoutes);
