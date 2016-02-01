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
    	if (post.name && post.description && post.url){
			Posts.$add({
				name: post.name,
				description: post.description,
				url: post.url,
				votes: 0
			})

	        //Resetting all the values
			post.name = "";
			post.description = "";
			post.url = "";
		}
		else {
			alert('Sorry bruh, you need all of those info to be filled!');
		}
	}

    //Adding a vote
    $scope.addVote = function (post) {
        //Increment the number
        post.votes++;
        //Save to the Firebase
        Posts.$save(post);
    }

    //Deleting a post
    $scope.deletePost = function (post) {
        //Getting the right URL
		var postForDeletion = new Firebase('https://kevdit.firebaseio.com/' + post.$id);
        //Removing it from Firebase
        postForDeletion.remove();
    }
});