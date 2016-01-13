// app.js
var routerApp = angular.module('personalSite', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html',
            controller: 'homeController'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            templateUrl: 'views/aboutMe.html',
            controller: 'aboutController'     
        })
    
        .state('other', {
            url: '/other',
            templateUrl: 'views/otherActivities.html',
            controller: 'otherController'     
        });
        
});

routerApp.controller('homeController', ['$scope', function($scope){
    console.log("Home");
}])

routerApp.controller('otherController', ['$scope', function($scope){
    console.log("Other");
}])


.controller('aboutController', ['$scope', function($scope){
    console.log("About Me");
}]);

routerApp.directive('scrollOnClick', function() {
  return {
    restrict: 'A',
    link: function(scope, $elm, attrs) {
      var idToScroll = attrs.href;
      $elm.on('click', function() {
        var $target;
        if (idToScroll) {
          $target = $(idToScroll);
        } else {
          $target = $elm;
        }
        $("body").animate({scrollTop: $target.offset().top}, "slow");
      });
    }
  }
});
