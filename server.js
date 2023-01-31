
const express = require("express");
const server = express();
const port = 1337;

server.use('/static', express.static('public'));

server.get("/", (req, res) => {
  res.end("Hello World");
});
server.get("/about", (req, res) => {
  res.end("About me");
});
server.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});

server.listen(port, () => {
console.log("Server is running on port 1337");
});