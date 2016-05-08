(function(){
  angular.module('app')
    .controller('DownloadsController',function(Game){
      this.games=Game.query();
    });
})();
