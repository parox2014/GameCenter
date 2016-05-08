(function(){
  angular.module('app')
  .service('Game',function(){
    var games=[];

    for(var i=0;i<10;i++){
      var game={
        id:i,
        name:'Tomb Raider'+i,
        scores:Math.floor(Math.random()*1000),
        points:Math.floor(Math.random()*1000),
        scheme:'facebook://',
        leaderBoard:[]
      }

      for(var j=0;j<6;j++){
        game.leaderBoard.push({
          id:j,
          nickname:'User'+j*100,
          avatar:'./img/mike.png',
          scores:Math.floor(Math.random()*100000)
        })
      }
      games.push(game);
    }
    this.query=function(){
      return games;
    };

    this.get=function(id){
      return games[id];
    };

  });
})();
