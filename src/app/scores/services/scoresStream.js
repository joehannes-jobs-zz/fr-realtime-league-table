import angular from 'angular';

import scoresModule from '../scoresModule';

scoresModule.factory('scoresStream', function ($rootScope, ws, scoresTeams) {
	var games = [],
			serviceMethods =  {
			getGames: function () {
				return games;
			},
			getLastGame: function () {
				return games[games.length - 1];
			}
	};
	ws.on('message', function (event) {
		games.push(JSON.parse(event.data));
		if (!scoresTeams.getInitialized()) {
			throw {
				msg: "Initial DB-Load hasn't arrived yet",
				level: "warn",
				traceRoot: "scoresStream"
			}
		} else {
			console.log("input::stream::game");
			console.log(JSON.parse(event.data));
			$rootScope.$broadcast("input::stream::game");
		}
	});
	return serviceMethods;
});

export default scoresModule;
