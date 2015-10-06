import angular from 'angular';
import appModule from 'app/app';
import tpl from './scores.tpl';

let scoresModule = angular.module('frScores', [appModule.name, tpl.name]);

scoresModule.config(($stateProvider) => {

	$stateProvider
		.state('scores', {
			url: '/scores',
			templateUrl: tpl.name,
			controller: 'ScoresCtrl'
		})
});

export default scoresModule;
