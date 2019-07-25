let sampleData = [
  {price: "1.50", name: "Test One", desc: "First test item"},
  {price: "25.20", name: "Test Two", desc: "Second test item"},
  {price: "100.50", name: "Test Three", desc: "Third test item"},
]

let app = angular.module('va', [function() {

}]);

app.directive('vaList', function() {
    return {
      templateUrl: 'templateVaAngularList.html',
      scope: {
        vaListObject: "=",
      },
      link: function($scope, $element, $attrs) {
        $scope.dynamicModels = [];
        $scope.fields = $attrs.vaListFields.split(",");
        $scope.list = ($scope.vaListObject);
        $scope.virtualList = [];
        $scope.virtualListTemp = [];
        for(let a = 0; a < $scope.list.length; a++) {
          let item = $scope.list[a];
          let temp = [];
          for(let b = 0; b < $scope.fields.length; b++) {
            let field = $scope.fields[b];
            temp[field] = (item[field]);
          }
          $scope.virtualList.push(temp);
        }
        $scope.fields.forEach(element => {
          $scope.dynamicModels[element] = "";
        })
        $scope.virtualListTemp = $scope.virtualList;

        
        $scope.Search = () => {
          $scope.virtualListTemp = $scope.virtualList;
          let newList = [];
          for(key in $scope.dynamicModels) {
            newList = [];
            $scope.virtualListTemp.forEach(element => {
              let searched = (element[key].toLowerCase().indexOf($scope.dynamicModels[key]) != -1) ? true : false; 
              if(searched && newList.indexOf(element) == -1) newList.push(element);
              
            })
            $scope.virtualListTemp = newList;
          }
        }
      }
    };
  });

app.filter('nameCase', function() {
    return function(text) {
      return (!!text) ? text.charAt(0).toUpperCase() + text.substr(1).toLowerCase() : '';
    }
});

app.controller('InitController', ['$rootScope', Init]);
function Init($rootScope) {
  $rootScope.sampleData = sampleData;
}
