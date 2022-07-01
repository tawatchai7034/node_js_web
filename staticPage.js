let express = require("express");
let app = express();
let path = require("path");

// folder name is public and in folder must have index.html
app.use(express.static(path.join(__dirname, "public")));

app.listen(8000, () => {
  console.log("Open server success");
});
