angular.module( 'ng-startup.signin', ['ui.router.state'])
.config(function config( $stateProvider ) {
	$stateProvider.state( 'signin', {
		url: '/signin',
		views: {
			"main": {
				controller: 'SigninCtrl',
				templateUrl: 'signin/signin.tpl.html'
			}
		},
		data:{ pageTitle: 'Signin' }
	});
	$stateProvider.state( 'signout', {
		url: '/signout',
		views: {
			"main": {
				controller: 'SignoutCtrl'
			}
		},
		data:{ pageTitle: 'Signout' }
	});

})
/**
 * Signin controller
 */
.controller( 'SigninCtrl', ['$rootScope', '$scope', '$stateParams', '$auth', function SigninController( $rootScope, $scope, $stateParams, $auth ) {
	$scope.doLogin = function(username, password) {
		$auth.login({
		  username: username,
		  password: password
		}).then(function(response) {
			$rootScope.$broadcast("auth:login:success", {'role': response.data.role, 'provider': 'fakelogin', 'user': response.data.identity});
		});
	};

}])
/**
 * Signout controller
 */
.controller( 'SignoutCtrl', ['$rootScope', '$scope', '$state', '$auth', function SigninController( $rootScope, $scope, $state, $auth ) {
	$auth.logout().then(function() {
		$rootScope.$broadcast("auth:logout:success");
	});

}])
;
