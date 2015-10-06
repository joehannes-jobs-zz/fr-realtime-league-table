import angular from 'angular';

import scoresModule from '../scoresModule';
import '../services/scoresTeams';
import '../services/scoresStream';

scoresModule.controller('ScoresCtrl', function ($rootScope, $scope, scoresStream, scoresTeams) {
	$scope.teams = [];

	var enrich = function (team, owngoals, awaygoals, init) {
		if (init !== 0) {
			init = 1;
		} else {
			owngoals = 0;
			awaygoals = 0;
		}
		team.pld = (team.pld || 0) + init;
		if (owngoals > awaygoals) {
			team.w = (team.w || 0) + 1;
			team.pts = (team.pts || 0) + 3;
		} else if (owngoals == awaygoals) {
			if (init === 0) {
				team.w = 0;
				team.d = 0;
				team.l = 0;
				team.pts = 0;
			} else {
				team.d = (team.d || 0) + 1;
				team.pts = (team.pts || 0) + 1;
			}
		}
		else {
			team.l = (team.l || 0) + 1;
			team.pts = team.pts || 0;
		}
		team.gf = (team.gf || 0) + Number(owngoals);
		team.ga = (team.ga || 0) + Number(awaygoals);
		team.gd = (team.gd || 0) + Number(owngoals) - Number(awaygoals);
	};

	var scorify = function (game) {
		let current = function (id) {
			for (let [i, team] of $scope.teams.entries()) {
				if (team.id == id) {
					return i;
				}
			}
			return false;
		};
		let homeTeam = current(game.homeTeamId),
				awayTeam = current(game.awayTeamId);
		if (homeTeam === false || awayTeam === false) {
			throw {
				msg: "A game with an unidentifieable team happened??!!",
				level: "warn",
				traceRoot: "ScoresCtrl",
				data: { game: game, teams: $scope.teams }
			};
		} else {
			enrich($scope.teams[homeTeam], game.homeGoals, game.awayGoals);
			enrich($scope.teams[awayTeam], game.awayGoals, game.homeGoals);
		}
	}

	if (scoresTeams.getInitialized()) {
		$scope.teams = scoresTeams.getTeams();
		$scope.teams.map(function (team, i, teams) {
			return enrich(team, 0, 0, 0);
		});
	}

	$scope.$on('input::ajax::teams', function(event, data) {
		if (!$scope.teams.length) {
			$scope.teams = scoresTeams.getTeams();
			$scope.teams.map(function (team, i, teams) {
				return enrich(team, 0, 0, 0);
			});
		}
	});

	$scope.$on('input::stream::game', function(event, data) {
		if (scoresTeams.getInitialized()) {
			if(!$scope.teams.length) {
				$scope.teams = scoresTeams.getTeams();
				$scope.teams.map(function (team, i, teams) {
					return enrich(team, 0, 0, 0);
				});
			}
			scorify(scoresStream.getLastGame());
		}
	});
});

export default scoresModule;
