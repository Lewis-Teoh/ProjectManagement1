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
            let storage = $firebaseStorage(storageRef);
            let uploadTask = storage.$put(fileToUpload);
            // let uploadTaskProgress = storage.$put(fileToUpload);
            
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGE, 
                function(snapshot){
                var progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                console.log('Upload is '+ progress + 'done');
                switch (snapshot.state){
                    case firebase.storage.TaskEvent.PAUSED:
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskEvent.RUNNING:
                    console.log('Upload is running');
                    break;
                }
            })
            
            uploadTask.$complete((snapshot) => {
                let ref = firebase.database().ref("Files");
                let pushKey = ref.push().key;
                let formData = $firebaseObject(ref.child(pushKey));
                formData.name = fileToUpload.name;
                formData.timestamp = firebase.database.ServerValue.TIMESTAMP;
                formData.url = snapshot.downloadURL;
                formData.$save().then(() => {
                    
                    angular.element("input[type='file']").val(null);
                    fileToUpload = null;
                })
            });
            window.alert("Completed Upload");
        }
    }
}]);
