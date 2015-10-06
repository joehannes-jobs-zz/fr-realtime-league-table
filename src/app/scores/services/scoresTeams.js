import angular from 'angular';

import scoresModule from '../scoresModule';

scoresModule.factory('scoresTeams', function ($rootScope, $http) {
	var teams = [],
      initialized = false,
	    serviceMethods = {
      getInitialized: function () { return initialized; },
      getTeams: function () { return teams; }
  };

  $http({
    method: 'GET',
    url: 'http://localhost:8080/teams'
  }).then(function successCallback(response) {
    teams = response.data;
    initialized = true;
    $rootScope.$broadcast("input::ajax::teams");
  }, function errorCallback(response) {
    throw {
      msg: "Couldn't fetch teams from DB, status: " + response.status,
      level: "error",
      traceRoot: "ScoresTeams/Probably a server issue"
    }
  });

  return serviceMethods;
});

export default scoresModule;
