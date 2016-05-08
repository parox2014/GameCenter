'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('app', ['ionic', 'ngCordova']).run(["$ionicPlatform", "$cordovaToast", "$location", "$ionicHistory", "$rootScope", function ($ionicPlatform, $cordovaToast, $location, $ionicHistory, $rootScope) {
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      window.StatusBar.styleDefault();
    }

    //双击退出
    $ionicPlatform.registerBackButtonAction(backButtonActionHandler, 101);

    function backButtonActionHandler(e) {
      var needExitAppViews = ['/app/games', '/app/downloads'];
      var currentPath = $location.path();
      //判断处于哪个页面时双击退出
      if (needExitAppViews.indexOf(currentPath) > -1) {
        if ($rootScope.backButtonPressedOnceToExit) {
          ionic.Platform.exitApp();
        } else {
          showExitAlert();
        }
      } else if ($ionicHistory.backView()) {
        $ionicHistory.goBack();
      } else {
        showExitAlert();
      }
      e.preventDefault();
      return false;
    }

    function showExitAlert() {
      $rootScope.backButtonPressedOnceToExit = true;
      $cordovaToast.showShortTop('Press back again to exit app');
      setTimeout(function () {
        $rootScope.backButtonPressedOnceToExit = false;
      }, 2000);
    }
  });
}]).config(["$stateProvider", "$urlRouterProvider", "$ionicConfigProvider", function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  //设置ajax请求拦截器
  //$httpProvider.interceptors.push('Interceptor');
  //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  //$httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';

  $ionicConfigProvider.tabs.position('bottom');
  $ionicConfigProvider.navBar.alignTitle('center');
  $ionicConfigProvider.tabs.style('standard');

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('app', {
    url: '/app',
    abstract: true,
    views: {
      'app': {
        templateUrl: 'templates/app.html'
      }
    }
  })

  // Each tab has its own nav history stack:

  .state('app.games', {
    url: '/games',
    views: {
      'my-games': {
        templateUrl: 'templates/app-games.html',
        controller: 'GamesController',
        controllerAs: 'vm'
      }
    }
  }).state('app.downloads', {
    url: '/downloads',
    views: {
      'download-games': {
        templateUrl: 'templates/app-downloads.html',
        controller: 'DownloadsController',
        controllerAs: 'vm'
      }
    }
  }).state('app.leader-board', {
    url: '/leader-board/:gameId',
    views: {
      'my-games': {
        templateUrl: 'templates/app-leader-board.html',
        controller: 'LeaderBoardController',
        controllerAs: 'vm'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/games');
}]);
'use strict';

(function () {
  angular.module('app').component('gameItem', {
    templateUrl: './templates/game-item.html',
    bindings: {
      game: '=',
      type: '@'
    },
    controller: function controller() {},
    controllerAs: 'vm'
  });
})();
'use strict';

(function () {
  angular.module('app');
})();
'use strict';

(function () {
  angular.module('app').controller('DownloadsController', ["Game", function (Game) {
    this.games = Game.query();
  }]);
})();
'use strict';

(function () {
  angular.module('app').controller('GamesController', ["Game", "$cordovaInAppBrowser", "$cordovaAppAvailability", function (Game, $cordovaInAppBrowser, $cordovaAppAvailability) {
    this.games = Game.query();
    this.openCamera = function () {
      $cordovaInAppBrowser.open('http://qq.com', '_blank');
    };

    this.check = function () {
      $cordovaAppAvailability.check('com.facebook.katana').then(function () {
        alert('可用');
      }).catch(function () {
        alert('不可用');
      });
    };
  }]);
})();
'use strict';

(function () {
  angular.module('app').controller('LeaderBoardController', ["Game", "$stateParams", function (Game, $stateParams) {
    this.game = Game.get($stateParams.gameId);
  }]);
})();
'use strict';

(function () {
  angular.module('app').service('Game', function () {
    var games = [];

    for (var i = 0; i < 10; i++) {
      var game = {
        id: i,
        name: 'Tomb Raider' + i,
        scores: Math.floor(Math.random() * 1000),
        points: Math.floor(Math.random() * 1000),
        scheme: 'facebook://',
        leaderBoard: []
      };

      for (var j = 0; j < 6; j++) {
        game.leaderBoard.push({
          id: j,
          nickname: 'User' + j * 100,
          avatar: './img/mike.png',
          scores: Math.floor(Math.random() * 100000)
        });
      }
      games.push(game);
    }
    this.query = function () {
      return games;
    };

    this.get = function (id) {
      return games[id];
    };
  });
})();