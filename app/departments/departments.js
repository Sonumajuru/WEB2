/* global angular, */

'use strict';

angular.module('myApp.departments', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/departments', {
    templateUrl: 'departments/departments.html',
    controller: 'departmentsCtrl'
  });
}])
  

.controller('departmentsCtrl', [ '$scope', 'myService', function($scope, myService) {       


 myService.getDepartments()
  	.then(function(response){
    	$scope.Departments = response.data;
    }, function(error){
    	$scope.error = error;
    });
    
       
        $scope.btnclk = function () {
                if (!$scope.no)
                {
                    alert("Enter no");
                }
                else if (!$scope.code)
                {
                    alert("Enter code");
                }
                else if (!$scope.name) {
                    alert("Enter name");
                }
                else {
                $scope.Departments.push({ 'no': $scope.no, 
               'code': $scope.code, 'name': $scope.name });
                $scope.no = ' ';
                $scope.code = ' ';
                $scope.name = ' ';
                }
            };
            
            $scope.del = function (id) {
                $scope.Departments.splice(id, 1);
           };
            var key;
            $scope.edit = function (d, indx) {
                key = indx;                
                $scope.no = d.no;
                $scope.code = d.code;
                $scope.name = d.name;
};
$scope.Update = function () {
                $scope.Departments[key].no = $scope.no;
                $scope.Departments[key].code = $scope.code;
                $scope.Departments[key].name = $scope.name;
                $scope.no = '';
                $scope.code = ' ';
                $scope.name = ' ';
            };
}])
    
    .service('myService', ['$http', function($http){
    this.getDepartments = function(){
    	return $http.get('http://i874156.iris.fhict.nl/WEB2/departments');
    };
}]);
    