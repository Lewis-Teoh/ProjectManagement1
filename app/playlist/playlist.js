'use strict';

angular.module('webApp.playlist', ['ngRoute', 'angularSoundManager'])

.config(['$routeProvider', function($routeProvider){
	$routeProvider.when('/playlist', {
		templateUrl: 'playlist/playlist.html',
		controller: 'PlaylistCtrl'
	});
}])
.controller('PlaylistCtrl', ['$scope', function ($scope) {
    $scope.songs = [
        {
            id: 'one',
            title: 'Wake Me Up Acoustic Version',
            artist: 'AVICII',
            url: 'https://firebasestorage.googleapis.com/v0/b/project-management-10eca.appspot.com/o/AVICII%20-%20Wake%20Me%20Up%20Acoustic%20Version.mp3?alt=media&token=4f83878c-a9cc-469b-9078-2329d95e7d6c'
        },
        {
            id: 'two',
            title: 'Walking',
            artist: 'Nicki Minaj',
            url: 'https://firebasestorage.googleapis.com/v0/b/project-management-10eca.appspot.com/o/HEBE%20TIEN%20%E7%94%B0%E9%A6%A5%E7%94%84%20%5B%E6%84%9B%E8%91%97%E6%84%9B%E8%91%97%E5%B0%B1%E6%B0%B8%E9%81%A0%20Forever%20Love%5D%20Official%20MV%20HD.mp3?alt=media&token=d5dfa793-ee5b-4cf0-a74b-cb4b0f2c496d'
        },
        {
            id: 'three',
            title: 'Barrlping with Carl (featureblend.com)',
            artist: 'Akon',
            url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
        },
        {
            id: 'four',
            title: 'Angry cow sound?',
            artist: 'A Cow',
            url: 'http://www.freshly-ground.com/data/audio/binaural/Mak.mp3'
        },
        {
            id: 'five',
            title: 'Things that open, close and roll',
            artist: 'Someone',
            url: 'http://www.freshly-ground.com/data/audio/binaural/Things%20that%20open,%20close%20and%20roll.mp3'
        },
        {
            id: 'six',
            title: 'Barrlping with Carl (featureblend.com)',
            artist: 'Akon',
            url: 'http://www.freshly-ground.com/misc/music/carl-3-barlp.mp3'
        }
    ];
}]);