angular.module('Full_Disclosure')
.factory('Posts', ['Restangular', function(Restangular) {
	var Posts = {};
	var currentPost = {};
	var currentPosts = undefined;
	var categoriesToFilter = '-5';
	Posts.getCurrentPost = function() {
		return currentPost;
	};
	Posts.getPosts = function(callback) {
		if (currentPosts) {
			callback(currentPosts);
		} else {
			Restangular.all('posts').getList({'filter[cat]':categoriesToFilter}).then(function(posts) {
				currentPosts = posts;
				callback(posts);
			});
		}
	};
	Posts.getPost = function(postId, callback) {
		Restangular.one('posts', postId).get().then(function(post) {
			currentPost = post;
			callback(post);
		});
	};
	Posts.getNewestPost = function(callback) {
		Restangular.one('posts').get({'filter[posts_per_page]':1,'filter[orderBy]':'date','filter[cat]':categoriesToFilter}).then(function(post) {
			callback(post);
		});
	};
	Posts.getNewestNumberofPosts = function(amount, callback) {
		Restangular.one('posts').get({'filter[posts_per_page]':amount,'filter[orderBy]':'date','filter[cat]':categoriesToFilter}).then(function(post) {
			callback(post);
		});
	};
	Posts.getComments = function(postId, callback) {
		var time = Date.now();
		Restangular.one('posts', postId).one('comments').get({date:time}).then(function(comments) {
			callback(comments)
		});
	};
	Posts.saveComment = function(postId, comment, callback) {
		console.log(comment);
		Restangular.one('posts', postId).post('comments', comment).then(function() {
			callback(true);
		}, function() {
			callback(false);
		});
	};
	//TODO: Retrieve specific resource posts
	
	Posts.getAboutPage = function(callback) {
		var aboutId = 34;
		Restangular.one('posts', aboutId).get().then(function(about) {
			callback(about);
		});
	};
	return Posts;
}]);