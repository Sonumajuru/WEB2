
'use strict';

angular.module('myApp.dashboard', ['ngRoute', 'myApp.employees', 'myApp.tasks', 'myApp.departments'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'dashboardCtrl'
  });
}])


.controller('dashboardCtrl',['$scope', 'myServiceT', 'myServiceR', 'myService', '$http', function($scope, myServiceT, myServiceR, myService, $http) {        
    $scope.show = '';
  
    $scope.add = function (toAdd) {$scope.show = toAdd;};
    
     myServiceT.gettasks().success(function(response){
        $scope.tasks = response; 
    });
    
    myServiceR.getEmployees().success(function(response){
        $scope.Employees = response;
    });
    
    myService.getDepartments().success(function(response){
        $scope.Departments = response;
    });
    
    
    $scope.getall = function(){
        $http.get("http://i874156.iris.fhict.nl/WEB2/tasks/1").then(function(response){
            $scope.alldets = response.data;
            $scope.cut = $scope.alldets.employees;
            $scope.reformattedArray = $scope.cut.map(function(obj){ 
            var rObj = {};
            rObj["no"] = obj.no;
            rObj["assignedDate"] = obj.assignedDate;
            rObj["rak"] = 1;
            return rObj;
         });
        });
         $http.get("http://i874156.iris.fhict.nl/WEB2/tasks/2").then(function(response){
            $scope.artalldets = response.data;
            $scope.cuts = $scope.artalldets.employees;
            $scope.reformattedArray2 = $scope.cuts.map(function(obj){ 
            var rObj = {};
            rObj["no"] = obj.no;
            rObj["assignedDate"] = obj.assignedDate;
            rObj["rak"] = 2;
            return rObj;
         });
        $scope.temp = $scope.reformattedArray.concat($scope.reformattedArray2);
            
        });
        $http.get("http://i874156.iris.fhict.nl/WEB2/tasks/3").then(function(response){
            $scope.aartalldets = response.data;
            $scope.pass = $scope.aartalldets.employees;
            $scope.pass = $scope.pass.concat($scope.cuts);
             $scope.reformattedArray3 = $scope.cuts.map(function(obj){ 
            var rObj = {};
            rObj["no"] = obj.no;
            rObj["assignedDate"] = obj.assignedDate;
            rObj["rak"] = 3;
            return rObj;
         });
         $scope.temp = $scope.temp.concat($scope.reformattedArray3);
        });
    };
    
    $scope.upload = function(){
        
            if(angular.isDefined($scope.selectask))
            {
                if($scope.selectask == "1")
                {
                    $scope.url = "http://i874156.iris.fhict.nl/WEB2/tasks/1" ;
                }
                if($scope.selectask == "2")
                {
                    $scope.url = "http://i874156.iris.fhict.nl/WEB2/tasks/2" ;
                }
                if($scope.selectask == "3")
                {
                    $scope.url = "http://i874156.iris.fhict.nl/WEB2/tasks/3" ;
                }
                if($scope.selectask == "4")
                {
                    $scope.url = "http://i874156.iris.fhict.nl/WEB2/tasks/4" ;
                }
                $http.get($scope.url)
   .then(
       function(response){
           
           $scope.takapid = response.data;
           $scope.detailed = $scope.takapid.employees;
           
               $scope.deptid = response.data;
                $scope.dept = $scope.deptid.Departments;
            $scope.taskapi = response.data;
            $scope.taskdetail = $scope.taskapi.Departments;
         // success callback
         
       }, 
       function(){
         // failure call back
         alert("nothink");
       }
    );
    }}
    
    
}])

.directive('myTask', function() {
    return {template: "Task name: {{t.task}} Task ID: {{t.id}} Duty of: {{t.position}} <br> Responsible: {{emp.name}} Department: {{dep.department}}"};
})

.directive('myEmp', function() {
    return {template: "Employee: {{emp.name}} Age: {{emp.age}} Hire date: {{emp.hiredate}} Position: {{emp.position}} Department: {{dep.department}}"};
})

.directive('myDep', function() {
    return { template: "Department: {{dep.department}} Department ID: {{dep.number}} Employees: <div ng-repeat='emp in employees | filter:{deptid:dep.number};' style='display: inline'> {{emp.name}} </div>"};
});