const http = require("http");
const fs = require("fs");
const PORT = 8000;

const send404Response = function(res){
  res.writeHead(404,{"Content-Type": "text/plain"});
  res.write("Error 404: Page not found!");
}

const getContentHeader = function(reqUrl){
  let urlExtension = reqUrl.substr(reqUrl.lastIndexOf("."));
  urlExtension = urlExtension.replace(".","");
  let contentHeader = {html: "text/html",
    css: "text/css",
    js: "text/js",
    PNG: "image/PNG",
    jpeg: "image/jpeg",
    gif: "image/gif",
    mp3: "audio/mp3"}
  return contentHeader[urlExtension];
}

const onRequest = function(req,res){
  req.url = req.url.replace("/","");
  if(req.url == ""){
    res.writeHead(200,{"Content-Type": "text/html"});
    res.write(fs.readFileSync("./pong.html"));
  }else if(fs.existsSync(req.url)){
    res.writeHead(200,{"Content-Type": getContentHeader(req.url)});
    res.write(fs.readFileSync("./" + req.url));
  }else{
    send404Response(res);
  }
  res.end();
}

const server = http.createServer(onRequest);
server.listen(`Server is listening at ${PORT}`);
console.log("server is now running");
