const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 3010;
const router = require("./routers/wa");
app.use(bodyParser.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})