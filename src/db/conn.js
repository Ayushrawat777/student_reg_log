const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mydatabase", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("connected with mongodb")
}).catch((error)=>{
  console.log(error);
})

