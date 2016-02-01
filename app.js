//Starter Project for the Reddit Clone
var app = angular.module('reddit-clone', ['ngRoute', 'firebase']);

//The Firebase URL set as a Constant
app.constant('fbURL', 'https://kevdit.firebaseio.com');

//Creating a factory so we can use the Firebase URL
app.factory('Posts', function ($firebase, fbURL) {
    return $firebase(new Firebase(fbURL)).$asArray();
});

//Configuring the route providers to redirect to the right location
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'MainController',
            templateUrl: 'main.html'
        })
        .otherwise({
            redirectTo: '/'
        })
});

//The Main Controller that holds everything
app.controller('MainController', function ($scope, $firebase, Posts) {

    //Set the posts we get to a global variable that can be used
    $scope.posts = Posts;

    //The function that runs when the user saves a post
    $scope.savePost = function (post) {
		Posts.$add({
			name: post.name,
			description: post.description,
			url: post.url
		})

		post.name = "";
		post.description = "";
		post.url = "";

	}
});