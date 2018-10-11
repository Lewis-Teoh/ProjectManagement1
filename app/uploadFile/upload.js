'use strict';

angular.module('webApp.uploadFile', ['ngRoute', 'firebase' ])

.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/uploadFile', {
            templateUrl: 'uploadFile/upload.html',
            controller: 'UploadCtrl'
    });
}])

.controller('UploadCtrl', ['$scope', '$firebaseStorage', '$firebaseObject', function ($scope, $firebaseStorage, $firebaseObject) {

    let fileToUpload = null;
    $scope.onChange = function onChange(fileList) {
        fileToUpload = fileList[0];
    };
    $scope.upload = function () {
        if (fileToUpload) {
          
            let storageRef = firebase.storage().ref(fileToUpload.name);
            var fileName = (fileToUpload.name).toString(); 
            let storage = $firebaseStorage(storageRef);
            let uploadTask = storage.$put(fileToUpload);
         
            uploadTask.$progress( 
                function(snapshot){
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                console.log('Upload is '+ progress + 'done');
                $scope.value = progress;
                switch (snapshot.state){
                    case firebase.storage.TaskEvent.PAUSED:
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskEvent.RUNNING:
                    console.log('Upload is running');
                    break;
                };
            });
            
            uploadTask.$complete((snapshot) => {
                $scope.success = true;
                window.setTimeout(function() {
                    $scope.$apply(function(){
                        $scope.success = false;
                    });
                }, 4000);
                var ref = firebase.database().ref('Files');
                var pushKey = ref.push().key;
                var formData = $firebaseObject(ref.child(pushKey));
                $scope.fileName = fileToUpload.name
                $scope.fileTimestamp = firebase.database.ServerValue.TIMESTAMP;
                $scope.audioURL = snapshot.downloadURL;
                formData.$save().then(() => {
                    angular.forEach(
                        angular.element("input[type='file']"),
                        function(inputElem) {
                          angular.element(inputElem).val(null);
                        });
                })
            });
            
        }
    }
}]);
