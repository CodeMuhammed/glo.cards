angular.module('microRecharge' , ['ui.router' ,'mgcrea.ngStrap'])

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
     $scope.myCheckout = function(card){
         console.log(card);
         //Test api auto module
         Taskcoin.initialize({
              config:{
                 apiKey:'jfdkn46ndfnvklnvG4e', //The public api key generated on taskcoin.com
                 productId:'34547km4575' //this uniquely identifies the product or service you are selling
              },
              success:function(){//Notify you when a user completes his survey
                  alert('checkout successful');
              },
              cancel:function(){//Notify you when a user cancels a survey
                  console.log('User cancelled survey');
                  alert('checkout cancelled');
              }
         });
     }

     //
     $scope.saveCard  = function(card){
         $scope.savedCard = card;
     }
     //
     $scope.refresh = function(){
         $scope.savedCard ? $scope.savedCard.visible = false : '';
     }
})

//

//taskcoin loading logo directive
.directive('typeform' , function($interval){
     return {
         restrict : 'E',
         scope : true,
         link : function(scope , elem , attrs){
             //console.log(attrs);
             scope.goodText = attrs['goodText'];
             scope.badText = attrs['badText'];
         },
         template : '<span style="display:inline-block;">'+
              '<span style="display: inline-block;text-decoration:{{active==\'good\'?\'\':\'line-through\'}}; color:{{active==\'good\'?\'green\':\'red\'}}">{{text}}<cursor></cursor></span>'+
          '</span>',

         controller: 'typeformController'
     };
})

.directive('cursor' , function($interval){
     return {
         restrict : 'E',
         scope : true,
         template : '<span style="display:inline-block;">'+
              '<span style="display: inline-block; width:.1em; color:#000">{{cursor}}</span>'+
          '</span>',

         controller: 'cursorController'
     };
})

.controller('cursorController' , function($scope , $interval){
      $scope.cursor = true;

      $interval(function(){
         $scope.cursor == '|'? $scope.cursor = ' ':$scope.cursor ='|';
      }  , 600);
})

.controller('typeformController' , function($scope , $interval  , $timeout){
    $timeout(function(){
         $scope.text = $scope.badText;
         $scope.active = 'bad';
    });


    //
    $interval(function(){
         type($scope.active=='good'?$scope.badText:$scope.goodText);
    } , 5000);

    //
    function type(text){
         eraseText(function(){
              console.log('text cleared');
              $scope.active=='good'? $scope.active='bad': $scope.active='good';
              typeText(text);
         });
    }

    //
    function eraseText(cb){
         var interval = $interval(function(){
              removeText();
         } , 100);

         function removeText(){
             if($scope.text.length >0){
                  $scope.text = $scope.text.substr(0 ,  $scope.text.length-1);
             }
             else{
                 $interval.cancel(interval);
                 cb();
             }
         }
    }

     //
    function typeText(text){
         var txt = text;

         var interval = $interval(function(){
              var ch = txt.substr(0 , 1)
              txt = txt.substr(1);
              addText(ch);
         } , 200);

         function addText(ch){
             if($scope.text.length == text.length){
                 $interval.cancel(interval);
             }
             else{
                 $scope.text+=ch;
             }

         }
    }

});
