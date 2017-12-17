const http = require("http");
const fs = require("fs");

const send404Response = function(res){
  res.writeHead(404,{"Content-Type": "text/plain"});
  res.write("Error 404: Page not found!");
}

// const foo = {png: }

const onRequest = function(req,res){

  if(req.url == '/'){
    // console.log("hello");
// res.writeHead(200,{"Content-Type": "text/html"});
// res.statusCode = 200;
    // fs.readFileSync("./pong2.0/pong.html","utf-8").pipe(res);
    res.write(fs.readFileSync("./pong.html"));
  }else if(req.url == '/pong.css'){
    res.write(fs.readFileSync("./pong.css"))
  }else if(req.url == '/paddle.PNG'){
    res.write(fs.readFileSync("./paddle.PNG"));
  }else if(req.url == '/pong.js'){
    res.write(fs.readFileSync("./pong.js","utf8"));
  }else if(req.url == '/ball.gif'){
    res.write(fs.readFileSync("./ball.gif"));
  }else if(req.url == '/ballHit.mp3'){
    res.write(fs.readFileSync("./ballHit.mp3"));
  }else {
    send404Response(res);
  }
  console.log(req.url);
  // else if(fs.existsSync(req.url)){
  //   console.log(req.url);
  //   res.write(fs.readFileSync("." + req.url,"utf8"));
  // }
  // console.log(req.url);
  // else{
  //   send404Response(res);
  // }
  console.log(req.url);
  res.end();
}

const server = http.createServer(onRequest);
server.listen(1111);
console.log("server is now running");
