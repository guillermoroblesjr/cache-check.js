(function(window, undefined){

  "use strict";

  // How should this be used?
  // What are the needs? Requirements?
  // It should:
  // - check localStorage or cache to see if a compatible version exists
  // - maybe ask a cache-check server if one exists or when it was last used?
  // - check for a certain file with a version with the latest being sought first
  // - check for earlier versions if the latest is not found and continue decreasing
  //   the versions until either one is found
  // - fetch a compatible version after a certain amount of time passes and a compatible
  //   version has not been found
  // - save in localStorage the url, version, compatibility, date/time last used
  // - save to a cache-check server as well?
  // - be able to accept an array of objects with each being a different library/version
  // - run a callback passed in by the user on complete
  // - run as much of the logic as possible in a web worker
  // - allow the user to control the amount of time to check for a compatible version

  var options = {
    webWorkers: {
      cacheCheckWorker: './scripts/cache-check.js/worker.js'
    },
    webWorkerImports: [
      '../Class.js/Class.js'
    ]
  };
  CacheCheck.fetch( options, [
    {
      url: '//ajax.googleapis.com/ajax/libs/jquery/{{version}}/jquery.min.js',
      rangeMin: '1.6.0',
      rangeMax: '1.8.0',
      // complete: function(e){},
      maxCheckTime: 3000,

    }
  ]);

  // setTimeout(function(){
  //   var options = {
  //     webWorkers: {
  //       cacheCheckWorker: './scripts/cache-check.js/worker.js'
  //     }
  //   };
  //   CacheCheck.verify( options, [
  //     {
  //       url: 'http://ajax.googleapis.com/ajax/libs/jquery/{{version}}/jquery.min.js',
  //       rangeMin: '1.6.0',
  //       rangeMax: '1.8.0',
  //       idealVersion: '1.7.1',
  //       timeout: 3000
  //     }
  //   ]);
  // }, 2000);

  // location starts from HTML file
  //var cacheCheckWorker = new Worker("./scripts/cache-check.js/worker.js");



})(window);