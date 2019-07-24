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
        $scope.fields = $attrs.vaListFields.split(",");
        $scope.list = ($scope.vaListObject);
        $scope.virtualList = [];
        $scope.virtualListTemp = [];
        for(let a = 0; a < $scope.list.length; a++) {
          let item = $scope.list[a];
          let temp = [];
          for(let b = 0; b < $scope.fields.length; b++) {
            let field = $scope.fields[b];
            temp.push(item[field]);
          }
          $scope.virtualList.push(temp);
        }
        $scope.virtualListTemp = $scope.virtualList;
        console.log($scope.virtualListTemp)

        $scope.dynamicModels = [];
        $scope.Search = () => {
          for(key in $scope.dynamicModels) {
            console.log("Searching field: " + key);

            $scope.virtualList.forEach(element => {
              console.log(element);
              if(element[key].indexOf($scope.dynamicModels[key]) != -1) $scope.virtualListTemp.push(elememt);
            })
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
