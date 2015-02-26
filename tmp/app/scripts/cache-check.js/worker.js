'use strict';

onmessage = function(e) {
  console.log('Message received from main script');
  console.log('e.data: ', e.data);
  var dataOut = {dataIn: e.data};
  var options = e.data.options;

  var linkCheck = function linkCheck(options){

    // Default values
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

    var addFunctionalityToXhr = function(xhr){
      
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
        // send data back to caller
        dataOut.target = JSON.stringify(e.target);
        postMessage(dataOut);
        //debugger;
          // for (var i = 0; i < items.length; ++i) {
          //   var req = items[i];
          //   console.log('XHR ' + req.name + ' took ' + req.duration + ' ms');
          // }
      };
      xhr.onloadstart = function(e){
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
      return xhr;
    };

    var xhr = new XMLHttpRequest();

    xhr = addFunctionalityToXhr(xhr);

    xhr.open("HEAD", url, true);
    xhr.timeout = 1;
    //window.performance.mark('mark_start_xhr');
    xhr.send(null);
  };

  linkCheck(options);

  // // send data back to caller
  // postMessage(dataOut);

}