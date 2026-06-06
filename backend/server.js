const express = require("express");
const app = express();
const Car = require('./models/carModel');
const port = 5000     ;
const dbConnection = require ('./db');
const cors = require('cors')
app.use(express.json());
app.use(cors())
const path = require("path");
const usersRoute = require('./routes/usersRoute')
const carsRoute = require('./routes/carsRoute')
const bookingsRoute = require('./routes/bookingsRoute')
const uploadRoute = require('./routes/uploadRoute')

app.use("/api/cars/", carsRoute);
app.use("/api/users/", usersRoute);
app.use("/api/bookings/", bookingsRoute);
app.use("/api/upload/", uploadRoute);

// Serve uploads directory as static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


//----------deployment-----------------

__dirname = path.resolve();

if(process.env.NODE_ENV==="production") {
 app.use(express.static(path.join(__dirname,"/frontend/build")));

 app.get('*',(req,res)=>{
   res.sendFile(path.resolve(__dirname,"frontend","build","index.html"));
 });
}else{
	app.get("/", (req, res)=>{
      res.send("API is running..");
	});
}


//----------deployment-----------



app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`Node JS Server Started in Port ${port}`));
