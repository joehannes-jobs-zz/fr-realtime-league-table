import angular from 'angular';

import router from 'oclazyload-systemjs-router';
import futureRoutes from 'app/routes.json!';

import ws from 'neoziro/angular-ws';

import semantic from 'semantic-ui';

var appModule = angular.module('app', ['ws']);

appModule.config(router(appModule, futureRoutes));

appModule.config(function($locationProvider, $httpProvider, $urlRouterProvider, wsProvider) {
	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
	$httpProvider.useApplyAsync(true);
	$urlRouterProvider.otherwise('/scores');

	wsProvider.setUrl('ws://localhost:8080/games');
});

angular.element(document).ready(function() {
	return angular.bootstrap(document.body, [appModule.name], {
		strictDi: false
	});
});

export default appModule;
