'use strict';

angular.module('myApp.employees', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/employees', {
    templateUrl: 'employees/employees.html',
    controller: 'EmployeesCtrl'
  });
}])

.controller('EmployeesCtrl', ['$scope', 'myServiceR', function($scope,myServiceR) {

        myServiceR.getEmployees()
                .then(function(response){
                $scope.Employees = response.data;
            }, function(error){
                $scope.error = error;
            });

        $scope.btnclk = function () {
                        if (!$scope.no)
                        {
                            alert("Enter No");
                        }
                        else if (!$scope.birthDate)
                        {
                            alert("Enter Birthdate");
                        }
                        else if (!$scope.firstName) {
                            alert("Enter First name");
                        }
                          else if (!$scope.lastName) {
                            alert("Enter Last name");
                        }
                          else if (!$scope.gender) {
                            alert("Enter Gender");
                        }
                          else if (!$scope.hireDate) {
                            alert("Enter Hiredate");
                        }
                        else {
                        $scope.Employees.push({ 'no': $scope.no, 
                    'birthDate': $scope.birthDate, 'firstName': $scope.firstName, 'lastName': $scope.lastName, 'gender' : $scope.gender, 'hireDate' : $scope.hireDate });
                          $scope.no = '';
                          $scope.birthDate = '';
                          $scope.firstName = '';
                          $scope.lastName = '';
                          $scope.gender = '';
                          $scope.hireDate = '';
                        }
                    };

                     var key;
                    $scope.edit = function (e, indx) {
                        key = indx;                
                            $scope.no = e.no;
                            $scope.birthDate = e.birthDate;
                            $scope.firstName = e.firstName;
                            $scope.lastName = e.lastName;
                            $scope.gender = e.gender;
                            $scope.hireDate = e.hireDate;
        };

        $scope.Update = function () {
                        $scope.Employees[key].no = $scope.no;
                        $scope.Employees[key].birthDate = $scope.birthDate;
                        $scope.Employees[key].firstName = $scope.firstName;
                        $scope.Employees[key].lastName = $scope.lastName;
                        $scope.Employees[key].gender = $scope.gender;
                        $scope.Employees[key].hireDate= $scope.hireDate;
                        $scope.no = '';
                        $scope.birthDate = '';
                        $scope.firstName = '';
                        $scope.lastName = '';
                        $scope.gender = '';
                        $scope.hireDate = '';
                    };

        $scope.del = function (no) {
                        $scope.Employees.splice(no, 1);
                   };

        }])

          .service('myServiceR', ['$http', function($http){
            this.getEmployees = function(){
                return $http.get('http://i874156.iris.fhict.nl/WEB2/employees');
            };
        }]);



