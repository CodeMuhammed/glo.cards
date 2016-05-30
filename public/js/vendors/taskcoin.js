//==============taskcoin plugin for angular js=============================
angular.module('taskcoin' , [])

.directive('taskcoin' ,   function(){
    return {
       restrict: 'E',
       template : '<span style="display:block; padding:.5em; text-align:center;border:2px solid #FDC740; border-radius:5px; width:100%"'+
                     ' ng-click="clickBtn()"><img src="http://localhost:5001/img/pay.png" height="17" /> </span>',

       controller: 'taskcoinController'
     }
})

//
.factory('taskcoinFactory' , function($rootScope , $window , $document){
     var initialized = false;
     return {
         initOnce:function(){
             if(!initialized){
                 $window.addEventListener('message', function(event) {
                    var origin = event.origin || event.originalEvent.origin; // For Chrome, the origin property is in the event.originalEvent object.
                    if (origin === 'http://localhost:5001'){
                        if(event.data.status === 'cancel'){
                             $document.find('body').children().eq(0).remove()
                             $rootScope.$broadcast("taskcoin:cancelled" , {});
                        }
                        else if(event.data.status === 'done'){
                            $document.find('body').children().eq(0).remove()
                            $rootScope.$broadcast("taskcoin:done" , {});
                        }
                        else if(event.data.status === 'verify'){
                            event.source.postMessage({msg:'Verify host', status:'verify'}, '*');
                        }
                    }
                });
                initialized = true;
             }

         }
     }
})

//
.controller('taskcoinController' , function($rootScope , $scope , $document , $timeout , $window , taskcoinFactory){
      $scope.clickBtn = function(){
           var taskcoin = angular.element('<div id="taskcoin"><iframe src="http://localhost:5001" class="col-xs-12" style="padding:0; height:100%"></iframe></div>');
           taskcoin.css({
              width:'100%',
              height:'100%',
              position:'fixed',
              zIndex:'100000000000000'
           });
           $document.find('body').eq(0).prepend(taskcoin);
           $document.find('html').css({overflow:'hidden'});
      };

      //initialize the event listener that will recieve messages from paystack.io
      taskcoinFactory.initOnce();

      //
      $rootScope.$on('taskcoin:cancelled' , function(event , args){
          $document.find('html').css({overflow:'auto'});
      });

})
