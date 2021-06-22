const mongoose =require("mongoose");


//connetion create with mondoDB
mongoose.connect("mongodb://localhost:27017/mvp",
     { useNewUrlParser: true,
       useUnifiedTopology: true,
       useCreateIndex: true,
       useFindAndModify: false, }).
     then(()=> console.log("successfully connect....")).
     catch((error)=> console.log("No Connection"));