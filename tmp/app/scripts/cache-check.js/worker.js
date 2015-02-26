"use strict";

importScripts('../Class.js/Class.js');

console.log(Class);

onmessage = function(e) {
  console.log('Message received from main script');
  console.log('e.data: ', e.data);
  var dataOut = {dataIn: e.data};
  var options = e.data.options;

  var versionCounter = 0;
  var currentVersion = options.rangeMin;


  var linkCheck = function linkCheck(options){

    // Default values
    var url = options.url,
        timeout = options.timeout || 1,
        isAsync = options.isAsync === true ? true : false,
        ontimeout = options.ontimeout || ontimeout;

    var reqCnt = 0;

    var VersionCheck = function(data){
      this.currentVersion = data.currentVersion;
      this.complete = false;
    };

    var versionCheck = new VersionCheck('0.0.0');

    
    var continueCheckingVersions = function(){
      if (versionCounter <= 2) {
        versionCounter++;
        return true;
      } else {
        return false;
      }
    };

    var logStuff = function(xhr, options){
      var headers = xhr.getAllResponseHeaders();
      
      console.log('options: ', options, '\n xhr is: ', xhr);
      console.log('allResponseHeaders are: ', '\n', headers);

      var data = { headers: headers };
      main.DisplayResult(data);
    };

    var checkForDifferentVersions = function(options){

      var version = '1.7.2';
      var versionCheck = new VersionCheck(version);
      // debugger;

      linkCheck(options);

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
        
        if (versionCheck.complete === true) {
          // send data back to caller
          dataOut.target = JSON.stringify(e.target);
          postMessage(dataOut);
        } else {
          // check for different versions
          if (continueCheckingVersions() === true) {
            checkForDifferentVersions(options);
          } else {
            //http://localhost:8001/test.html
            console.log('stopped checking for versions');
          }
        }
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

    var buildUrl = function(options){
      var url = options.url,
          newUrl = null;
      if (currentVersion === options.rangeMin) { 
        currentVersion = '1.6.0';
        newUrl = url.replace('{{version}}', currentVersion);
        currentVersion = '1.8.0';
      } else {
        newUrl = url.replace('{{version}}', currentVersion);
      }
      
      // debugger;

      return newUrl;
    };

    url = buildUrl(options);

    var xhr = new XMLHttpRequest();

    xhr = addFunctionalityToXhr(xhr);

    xhr.open("HEAD", url, true);
    xhr.timeout = 1;
    xhr.send(null);
  };

  linkCheck(options);
}