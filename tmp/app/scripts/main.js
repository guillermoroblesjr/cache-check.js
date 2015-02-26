(function(window, undefined){

  "use strict";

  // we will time the checking to check for performance
  var startTime, endTime;

  var options = {
    webWorkers: {
      cacheCheckWorker: './scripts/cache-check.js/worker.js'
    }
  };
  CacheCheck.verify( options, [
    {
      url: 'http://ajax.googleapis.com/ajax/libs/jquery/{{version}}/jquery.min.js',
      rangeMin: '1.6.0',
      rangeMax: '1.8.0',
      idealVersion: '1.7.1'
    }
  ]);

  // location starts from HTML file
  //var cacheCheckWorker = new Worker("./scripts/cache-check.js/worker.js");



})(window);