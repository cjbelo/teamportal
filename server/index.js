const http = require("http");
const cors = require("cors");
const express = require("express");
const parser = require("body-parser");

const argv = require("minimist")(process.argv.slice(2));
const port = parseInt(argv.port || process.env.PORT || "8080", 10);
const host = argv.host || process.env.HOST || "localhost";
const app = express();

app.use(cors());
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

const server = http.createServer(app);
const io = require("socket.io")(server);

server.listen(port, () => {
  console.log(`Server running on http://${host}:${port}`);
});

require("./socket")(io);
