'use strict';

describe('myApp.departments module', function() {

  beforeEach(module('myApp.departments'));

  describe('departmentsCtrl controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var departmentsCtrl = $controller('departmentsCtrl');
      expect(departmentsCtrl).toBeDefined();
    }));

  });
});