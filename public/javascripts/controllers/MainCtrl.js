app.controller('MainCtrl', ['$scope', 'MainService', '$mdDialog', '$mdMedia', 'filterFilter', function ($scope, MainService, $mdDialog, $mdMedia, filterFilter ) {

    MainService.GetContacts().then(function (data) {
       $scope.Fulldata = angular.copy(data.data.employees);
        $scope.data = data.data.employees.slice(0, 25);
    });

    $scope.DeleteContact = function (data, index) {
        var indexSource = $scope.Fulldata.indexOf(data);
        MainService.DeleteContact(indexSource).then(function (data) {
            $scope.data.splice(index, 1);
            $scope.Fulldata.splice(indexSource, 1);
        });
    };


    $scope.showPrompt = function (ev, item, index) {
        var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));

        $mdDialog.show({
            controller: DialogController,
            templateUrl: '../../partial/newContant.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            locals: {
                contact: item
            },
            clickOutsideToClose: true,
            fullscreen: useFullScreen
        })
    .then(function (result) {
        if (index === -1) {
            MainService.AddContact(result).then(function (data) {
                if (data !== "not a number") {
                    $scope.Fulldata.splice($scope.Fulldata.length, 0, { "name": result.name, "address": result.address, "phone": result.phone });
                    filter();
                }
            });
        } else {
            var indexSource = $scope.Fulldata.indexOf(item);
            MainService.UpdateContact(result, indexSource).then(function (data) {
                if (data !== "not a number") {
                    $scope.data[index] = result;
                    $scope.Fulldata[indexSource] = result;
                }
            });
          
        }
    }, function () {
    });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        });
   };

  
  
  
   $scope.typed = function(searchText){
        filter(); 
   }
 
 
 function filter()
 {
     $scope.data = filterFilter($scope.Fulldata, $scope.searchText).slice(0, 25);
 }
 
 
 $scope.$watch('Fulldata', function(){
   console.log('data changed')
   ind = 0
   if ($scope.Fulldata !=  undefined)
   {
          $scope.data = $scope.Fulldata.slice(0, 25);
   }
 })


  $scope.loadMore = function() {
    ind = ind + 25
    var r = 25
    if (ind + 25 >= $scope.Fulldata.length) {
      r = $scope.data.length - ind
    }
    console.log("Loading")
    $scope.data = $scope.data.concat($scope.Fulldata.slice(ind, r + ind))
  }
}]);




function DialogController($scope, $mdDialog, contact) {
    if (contact != null) $scope.contact = angular.copy(contact);

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };

    $scope.answer = function (x) {
        $mdDialog.hide($scope.contact);
    };
}




app.directive('lazyLoad', function() {
  return {
    restrict: 'A',
    link: function(scope, elem) {
      var scroller = elem[0]
       $(scroller).bind('scroll', function() {
        if (scroller.scrollTop + scroller.offsetHeight >= scroller.scrollHeight) {
          scope.$apply('loadMore()');
        }
      
        
      })
    }
  }
});