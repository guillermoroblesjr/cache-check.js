(function(window){

  "use strict";

  // Make sure all dependencies are available!
  var checkDependencies = function(deps){
    var missingDependencies = true;
    for (var i = 0, len = deps.length; i< len; i++) {
      (function(i){

        var currentDep = deps[i];

        // checkBy is: window
        if (currentDep.checkBy === 'window') {
          if (window[currentDep.globalName] === undefined) {
            console.error('You are missing a dependency: ', 
              '\n' + 'Name: ' + currentDep.name,
              '\n' + 'Version: ' + currentDep.version,
              '\n' + 'Homepage: ' + currentDep.homepage
            );
          };
        };

      })(i);
    };
    return missingDependencies;
  };

  var missingDeps = checkDependencies([{
    name: 'Class.js',
    version: '*',
    homepage: 'https://github.com/guillermoroblesjr/Class.js',
    url: null,
    errorMessage: null,
    globalName: 'Class',
    checkBy: 'window'
  }]);

  if (missingDeps === true) {
    return;
  };

  // we will time the checking to check for performance
  var startTime, endTime;

  // location starts from HTML file
  var cacheCheckWorker = new Worker("./scripts/cache-check.js/worker.js");

  // when data comes back from the worker
  cacheCheckWorker.onmessage = function(e) {
    console.log( 'Message received from worker' );
    console.log( 'The data is: ', e.data );

    endTime = performance.now();
    console.log('difference: ', (endTime - startTime) * .01, ' ms');

    var result = JSON.parse(e.data.target);
    console.log('the result is: ', result);
  };

  var data = {
    options: {
      url: 'http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js',
      timeout: 1,
      isAsync: false
    }
  };
  startTime = performance.now();

  cacheCheckWorker.postMessage(data);






})(window, undefined);