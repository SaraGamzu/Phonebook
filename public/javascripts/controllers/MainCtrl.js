app.controller('MainCtrl', ['$scope', 'MainService', '$mdDialog', '$mdMedia', function ($scope, MainService, $mdDialog, $mdMedia) {

    MainService.GetContacts().then(function (data) {
        $scope.data = data.data.employees;
    });

    $scope.DeleteContact = function (index) {
        MainService.DeleteContact(index).then(function (data) {
            $scope.data.splice(index, 1);
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
                    $scope.data.splice($scope.data.length, 0, { "name": result.name, "address": result.address, "phone": result.phone });
                }
            });
        } else {
            
            MainService.UpdateContact(result, index).then(function (data) {
                if (data !== "not a number") {
                    $scope.data[index] = result;
                }
            });
          
        }
    }, function () {
    });

        $scope.$watch(function () {
            return $mdMedia('xs') || $mdMedia('sm');
        });
    };

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