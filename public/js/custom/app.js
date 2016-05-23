angular.module('microRecharge' , ['ui.router' ,'mgcrea.ngStrap' , 'taskcoin'])

//state configuration and routing setup
.config([
    '$stateProvider' , '$urlRouterProvider'  , '$locationProvider',
    function($stateProvider , $urlRouterProvider  , $locationProvider){
          //enabling HTML5 mode
           $locationProvider.html5Mode(false).hashPrefix('!');
           $stateProvider
             .state('home' , {
                 url : '/v1_home',
                 templateUrl : 'views/home.tpl.html',
                 controller : 'homeController',
                 data :{}
             });

             $urlRouterProvider.otherwise('/v1_home');
        }
])

// cors configurations to enable consuming the rest api
.config([
    '$httpProvider' ,
    function($httpProvider){
       $httpProvider.defaults.useXDomain = true;
       $httpProvider.defaults.withCredentials = true;
       delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
])

//============================ 2 implementation ============================
.controller('homeController' , function($rootScope , $scope , $timeout , $interval){
     //
     $scope.cards = [
          {
             name : "MTN",
             amount:"100",
             asyncPin:"234789052658",
             visible:false
          },
           {
             name : "GLO",
             amount:"100",
             asyncPin:"2343486795357458",
             visible:false
          },
           {
             name : "ETISALAT",
             amount:"100",
             asyncPin:"1432637234752658",
             visible:false
          },
           {
             name : "AIRTEL",
             amount:"100",
             asyncPin:"789052658455948",
             visible:false
          }
     ];

     //
     $scope.saveCard  = function(card){
         $scope.savedCard = card;
     }
     //
     $scope.refresh = function(){
         $scope.savedCard ? $scope.savedCard.visible = false : '';
     }

     //
     $rootScope.$on('paytask:done' , function(event , args){
           $timeout(function() {
               $scope.savedCard.visible = true;
           }, 0);
     });

     $rootScope.$on('paytask:cancelled' , function(event , args){
          $timeout(function() {
              for(var i=0; i<$scope.cards.length; i++){
                   $scope.cards[i].visible = false;
              }
           }, 0);

     });
});
