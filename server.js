var app = require('express')();
var http = require('http');


app.get('/', handleResponse);
//the callback function looks like the following usually:
//we just use handleresonse below for any GETs to /
app.get('/test', function(req, res){
  res.send('we got test');
})

app.listen(3000, function(){
  console.log("listening on 3000");
});

function handleResponse(req, res){

  function resSend(data){
    //resSend is within the scope of res
    res.send(data):
  }

  //////////////////////////////////////////////////////////////////////////////////

  //sendin the res object to be called within getRedditDataSendRes
  getRedditDataSendRes(res);

  //////////////////////////////////////////////////////////////////////////////////

  //use an anonymous callback functon that is defined within the scope of res
  // getRedditDataCallback(function(data){
  //   console.log("got reddit data, ", data);
  //   res.send(data);
  // });

  //////////////////////////////////////////////////////////////////////////////////

  //use the resSend function as the callback, which was defined in scope of
  //res and thus has access to it
  //getRedditDataCallback(resSend);

  //////////////////////////////////////////////////////////////////////////////////

  //chain a .then and pass in an anonymouse callback function that's defined
  //in the scope of res
  // getRedditDataPromise().then(function(data){
  //   console.log('got reddit data, ', data);
  //   res.send(data);
  // });

  //////////////////////////////////////////////////////////////////////////////////

  //chain a .then and use the resSend as the callback to .then, which was
  //defined in the scope of res and thus has access to it
  // getRedditDataPromise().then(resSend);

}


function getRedditDataPromise(){
  return new Promise(function(resolve, reject){
    http.get('http://www.reddit.com/r/cats.json', function(res){
      resolve(res);
    });
  });
}

function getRedditDataCallback(callback){
   http.get('http://www.reddit.com/r/cats.json', function(data){
    callback(data);
  });
}
