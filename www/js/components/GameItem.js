(function () {
  angular.module('app')
    .component('gameItem', {
      templateUrl:'./templates/game-item.html',
      bindings: {
        game: '=',
        type:'@'
      },
      controller: function () {

      },
      controllerAs: 'vm'
    })
})();
