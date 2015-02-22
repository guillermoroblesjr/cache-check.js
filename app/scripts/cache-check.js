// This will be separated!

var workerCode = function () {
    "use strict;" //this will become the first line of the worker

    var CalculateSomething = function(options) {

      var linkCheck = function linkCheck(options){

        var url = options.url,
            timeout = options.timeout || false,
            isAsync = options.isAsync === true ? true : false,
            ontimeout = options.ontimeout || ontimeout;

        var reqCnt = 0;

        var logStuff = function(xhr, options){
          var headers = xhr.getAllResponseHeaders();
          
          console.log('options: ', options, '\n xhr is: ', xhr);
          console.log('allResponseHeaders are: ', '\n', headers);

          var data = { headers: headers };
          main.DisplayResult(data);
        };

        var xhr = new XMLHttpRequest();
        xhr.onabort = function(e){
          console.log('onabort: ', e);
        };
        xhr.onerror = function(e){
          console.log('onerror: ', e);
        };
        xhr.onload = function(e){
          console.log('onload: ', e);
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log(xhr.responseText);
            } else {
              console.error(xhr.statusText);
            }
          }
          logStuff(xhr, options);
        };
        xhr.onloadend = function(e){
          console.log('onloadend: ', e);
          main.DisplayResult();
          //debugger;
            // for (var i = 0; i < items.length; ++i) {
            //   var req = items[i];
            //   console.log('XHR ' + req.name + ' took ' + req.duration + ' ms');
            // }
        };
        xhr.onloadstart = function(e){
          apples('start');
          // window.performance.mark('mark_end_xhr');
          // reqCnt++;
          // window.performance.measure('measure_xhr_' + reqCnt, 'mark_start_xhr', 'mark_end_xhr');
          console.log('onloadstart: ', e);
        };
        xhr.onprogress = function(e){
          console.log('onprogress: ', e);
        };
        xhr.onereadystatechange = function(e){
          console.log('onereadystatechange: ', e);
        };
        xhr.ontimeout = function (e) {
          console.log('ontimeout: ', e);
          console.error("The request for " + url + " timed out.");
        };
        xhr.onload = function() {
          if (xhr.readyState === 4) { 
            if (xhr.status === 200) {
              callback.apply(xhr, args);
            } else {
              console.error(xhr.statusText);
            }
          }
        };

        xhr.open("HEAD", url, true);
        xhr.timeout = 1;
        //window.performance.mark('mark_start_xhr');
        xhr.send(null);
      };

      linkCheck(options);
    };
};

var start, end;

var DisplayResult = function (data) {
  end = performance.now();
  console.log('difference: ', (end - start) * .01, ' ms');
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
start = performance.now();
theWorker.CalculateSomething(options);