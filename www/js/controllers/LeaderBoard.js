(function(){
  angular.module('app')
    .controller('LeaderBoardController',function(Game,$stateParams){
      this.game=Game.get($stateParams.gameId);
    });
})();

