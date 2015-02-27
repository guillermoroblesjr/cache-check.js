"use strict";

// Classes
var ScriptClass, XhrClass;

var loadedDeps = {};

var versionCounter = 0;
var currentVersion = '1.6.0';

var fetchImportScript = function(script){
  importScripts(script);
};
var createClasses = function(){
  ScriptClass = Class.make(function ScriptClass(){
    // Default values
    this.timeout = 1;
    this.isAsync = false;
    this.versionCounter = 0;
    this.currentVersion = 25;
    this.complete = false;
    this.url = '';

    this.buildUrl = function(){
      
      var url = this.url,
          newUrl = url.replace('{{version}}', this.currentVersion);


      // if (currentVersion === options.rangeMin) { 
      //   currentVersion = '1.6.0';
      //   newUrl = url.replace('{{version}}', currentVersion);
      //   currentVersion = '1.8.0';
      // } else {
      //   newUrl = url.replace('{{version}}', currentVersion);
      // }
      return newUrl;
    };

  });
  
  XhrClass = Class.make(function XhrClass(){
    // Default values
    // this.xhr = new XMLHttpRequest();
  }, XMLHttpRequest);
};
var dependenciesConfig = function(deps){
  // if the dependencies aren't loaded, load them
  // and add them to the loadedDeps object so we
  // don't try loading them again.
  for (var i = 0, len = deps.length; i < len; i++) {
    (function(i){
      if (loadedDeps[deps[i]] === undefined) {
        fetchImportScript(deps[i]);
        loadedDeps[deps[i]] = true;
      };
    })(i);
  }
  // create the global classes since they do not exist yet
  createClasses();
};
var fetchScript = function(script, options){

  debugger;

  
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

    fetchScript(options);

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
      
      debugger;
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

  
  var xhr = new XhrClass();
  // xhr = addFunctionalityToXhr(xhr);
  debugger;
  var url = script.buildUrl();

  xhr.open("HEAD", url, true);
  xhr.timeout = 1;
  xhr.send(null);
};
var loadScripts = function(scripts){
  for (var i = 0, len = scripts.length; i < len; i++) {
    (function(i){
      var script = new ScriptClass();
      var currentItem = scripts[i];
      // add the user options
      for (var prop in currentItem) {
          script[prop] = currentItem[prop];
       }
       // add to the xhr
       // var xhr = new XMLHttpRequest();
       // get the script!
      fetchScript(script, scripts[i]);
    })(i);
  }
};


onmessage = function(e){
  console.log('Message received from main script');
  // console.log('e.data: ', e.data);
  
  var options = JSON.parse(e.data.options),
      scripts = JSON.parse(e.data.items);

  console.log('options: ', options, '\n', 'scripts: ', scripts);

  // load dependencies if needed
  var deps = options.webWorkerImports;
  dependenciesConfig(deps);

  // load the scripts!
  loadScripts(scripts);
};