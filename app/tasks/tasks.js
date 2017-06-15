'use strict';

angular.module('myApp.tasks', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/tasks', {
    templateUrl: 'tasks/tasks.html',
    controller: 'tasksCtrl'
  });
}])

.controller('tasksCtrl', ['$scope' ,'myServiceT', function($scope,myServiceT) {
       
       myServiceT.gettasks()
  	.then(function(response){
    	$scope.tasks = response.data;
    }, function(error){
    	$scope.error = error;
    });

        
        $scope.btnclk = function () {
                if (!$scope.no)
                {
                    alert("Enter No");
                }
                else if (!$scope.deptno)
                {
                    alert("Enter Deptno");
                }
                else if (!$scope.title)
                {
                    alert("Enter Title");
                }
                else if (!$scope.description)
                {
                    alert("Enter Description");
                }
                else if (!$scope.finishedDate)
                {
                    alert("Enter FinishedDate");
                }
                else if (!$scope.modificationDate)
                {
                    alert("Enter ModificationDate");
                }
                else if (!$scope.creatioDate) {
                    alert("Enter CreatioDate");
                }
                else {
                $scope.tasks.push({ 'no': $scope.no, 
            'deptno': $scope.deptno, 'title': $scope.title, 'description': $scope.description, 'finishedDate': $scope.finishedDate, 'modificationDate': $scope.modificationDate, 'creatioDate': $scope.creatioDate });
                $scope.no = '  ';
                $scope.deptno = '  ';
                $scope.title = '  ';
                $scope.description = '  ';
                $scope.finishedDate = '  ';
                $scope.modificationDate = '  ';
                $scope.creatioDate = '  ';
                }
            };
            
            $scope.del = function (id) {
                $scope.tasks.splice(id, 1);
           };
            var key;
            $scope.edit = function (t, indx) {
                key = indx;                
                $scope.no = t.no;
                $scope.deptno = t.deptno;
                $scope.title = t.title;
                $scope.description = t.description;
                $scope.finishedDate = t.finishedDate;
                $scope.modificationDate = t.modificationDate;
                $scope.creatioDate = t.creatioDate;
              };
                
 $scope.Update = function () {
                $scope.tasks[key].no = $scope.no;
                $scope.tasks[key].deptno = $scope.deptno;
                $scope.tasks[key].title = $scope.title;
                $scope.tasks[key].description = $scope.description;
                $scope.tasks[key].finishedDate = $scope.finishedDate;
                $scope.tasks[key].modificationDate = $scope.modificationDate;
                $scope.tasks[key].creatioDate = $scope.creatioDate;
                $scope.no = '  ';
                $scope.deptno = '  ';
                $scope.title = '  ';
                $scope.description = '  ';
                $scope.finishedDate = '  ';
                $scope.modificationDate = '  ';
                $scope.creatioDate = '  ';
            };
}])


        .service('myServiceT', ['$http', function($http){
        this.gettasks = function(){
            return $http.get('http://i874156.iris.fhict.nl/WEB2/tasks');
        };
    }]);
    