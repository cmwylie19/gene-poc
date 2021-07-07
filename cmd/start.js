require("@babel/register")({
  presets: ["@babel/preset-env"],
  plugins: ["@babel/transform-async-to-generator"],
});

// Import the rest of our application.
module.exports = require("./server.js");
