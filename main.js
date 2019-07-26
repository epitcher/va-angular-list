let sampleData = [
  {price: "1.50", name: "1Test One", desc: "First test item"},
  {price: "25.20", name: "2Test Two", desc: "Second test item"},
  {price: "100.50", name: "3Test Three", desc: "Third test item"},
  {price: "1.50", name: "4 Test One", desc: "First test item"},
  {price: "25.20", name: "5 Test Two", desc: "Second test item"},
  {price: "100.50", name: "6 Test Three", desc: "Third test item"},
  {price: "1.50", name: "7 Test One", desc: "First test item"},
  {price: "25.20", name: "8 Test Two", desc: "Second test item"},
  {price: "100.50", name: "9 Test Three", desc: "Third test item"},
  {price: "1.50", name: "10 Test One", desc: "First test item"},
  {price: "25.20", name: "11 Test Two", desc: "Second test item"},
  {price: "100.50", name: "12 Test Three", desc: "Third test item"},
  {price: "1.50", name: "13 Test One", desc: "First test item"},
  {price: "25.20", name: "14 Test Two", desc: "Second test item"},
  {price: "100.50", name: "15 Test Three", desc: "Third test item"},
  {price: "1.50", name: "16 Test One", desc: "First test item"},
  {price: "25.20", name: "17 Test Two", desc: "Second test item"},
  {price: "100.50", name: "18 Test Three", desc: "Third test item"},
  {price: "1.50", name: "19 Test One", desc: "First test item"},
  {price: "25.20", name: "20 Test Two", desc: "Second test item"},
  {price: "100.50", name: "21 Test Three", desc: "Third test item"},
  {price: "1.50", name: "22 Test One", desc: "First test item"},
  {price: "25.20", name: "23 Test Two", desc: "Second test item"},
  {price: "100.50", name: "24 Test Three", desc: "Third test item"},
  {price: "1.50", name: "25 Test One", desc: "First test item"},
  {price: "25.20", name: "26 Test Two", desc: "Second test item"},
  {price: "100.50", name: "27 Test Three", desc: "Third test item"},
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
        $scope.paginationPerPage = ($attrs.vaListPagination == null) ? 0 : parseInt($attrs.vaListPagination);
        $scope.dynamicModels = [];
        $scope.fields = $attrs.vaListFields.split(",");
        $scope.list = ($scope.vaListObject);
        $scope.virtualList = [];
        $scope.virtualListTemp = [];
        $scope.virtualListPagination = [];
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
            if(!$scope.dynamicModels.hasOwnProperty(key)) continue;
            newList = [];
            $scope.virtualListTemp.forEach(element => {
              let searched = (element[key].toLowerCase().indexOf($scope.dynamicModels[key]) != -1) ? true : false; 
              if(searched && newList.indexOf(element) == -1) newList.push(element);
              
            })
            $scope.virtualListTemp = newList;
          }
          $scope.Pagination();
        }
        $scope.Pagination = () => {
          $scope.paginationCurrent = 1;
          $scope.paginationTotal = Math.ceil($scope.virtualListTemp.length / $scope.paginationPerPage);
          $scope.PaginationSelect();
        }
        $scope.PaginationSelect = () => {
          let startCount = ($scope.paginationPerPage * $scope.paginationCurrent) - $scope.paginationPerPage;
          $scope.virtualListPagination = $scope.virtualListTemp.slice(startCount, startCount + $scope.paginationPerPage);
        }
        $scope.PaginationUp = () => {
          if($scope.paginationCurrent >= $scope.paginationTotal) return;
          $scope.paginationCurrent++;
          $scope.PaginationSelect();
        }
        $scope.PaginationDown = () => {
          if($scope.paginationCurrent <= 1) return;
          $scope.paginationCurrent--;
          $scope.PaginationSelect();
        }
        $scope.Pagination();
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
