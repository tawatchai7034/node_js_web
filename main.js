let express = require("express");
let app = express();
let path = require("path");
let router = require("./routes/router");


// EJS
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended:false}));
app.use(router);

// folder name is public and in folder need index.html
app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Open server success");
});
