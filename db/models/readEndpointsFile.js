const fs = require("fs/promises");

const readEndpointsFile = () => {
  const path = __dirname + "/../../endpoints.json";
  return fs
    .readFile(path, "utf-8")
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return promise.reject(err);
    });
};
module.exports = readEndpointsFile;
