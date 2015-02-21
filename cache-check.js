// This will be separated!

var workerCode = function () {
    "use strict;" //this will become the first line of the worker

    var CalculateSomething = function(options) {

      var ontimeout = function(http){
        console.log('timed out ------------------'); 
        http.abort();
        if (http.status === 200) {
          console.log('is cached');
        } else {
          console.log('is NOT cached');
        }
      };

      var linkCheck = function linkCheck(options){
          var logTimedOut = function(){
            console.log('timed out!!!'); 
          };
          var url = options.url,
              timeout = options.timeout || false,
              isAsync = options.isAsync === true ? true : false,
              ontimeout = options.ontimeout || ontimeout;

          var http = new XMLHttpRequest();
          http.open('HEAD', url, isAsync);
          http.timeout = timeout;
          http.ontimeout = function(){
            ontimeout(http);
          };
          http.send();
          return http;
      };

      var http = linkCheck(options);
      var headers = http.getAllResponseHeaders();
      
      console.log('options: ', options, '\n http is: ', http);
      console.log('allResponseHeaders are: ', '\n', headers);

      var data = { headers: headers };
      main.DisplayResult(data);
    };
};

var DisplayResult = function (data) {
    console.log('worker is done');
};

var theWorker = BuildBridgedWorker( 
  workerCode, 
  ["CalculateSomething"],
  ["DisplayResult"], 
  [DisplayResult]
);

var options = {
  url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
  timeout: 1,
  isAsync: false
};

theWorker.CalculateSomething(options);