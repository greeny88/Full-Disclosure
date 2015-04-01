angular.module('Full_Disclosure')
.controller('NavBarCtrl', ['$scope', '$location', 'Posts', function($scope, $location, Posts) {
	$scope.navbarCollapsed = true;
	Posts.getPosts(function(posts) {
		$scope.posts = posts;
	});
	$scope.viewPost = function(post) {
		$scope.selectedPost = null;
		$location.path('/post/' + post.ID);
	};
	$scope.onSelect = function(item, model, label) {
		$scope.viewPost(model);
	};
}])
.controller('PostCtrl', ['$scope', '$routeParams', '$modal', '$location', '$rootScope', 'Posts', function($scope, $routeParams, $modal, $location, $rootScope, Posts) {
	function loadPostInfo(postId) {
		Posts.getPost(postId, function(post) {
			$scope.postLoaded = true;
			$scope.post = post;
			$rootScope.title += post.title;
			angular.forEach(post.terms.category, function(value, key) {
				if (value.name == 'NSFW') {
					$scope.mature = true;
					$scope.open();
				}
			});
		});
		Posts.getComments(postId, function(comments) {
			$scope.comments = comments;
		});
	}
	$scope.mature = false;
	$scope.postLoaded = false;
	$scope.postId = $routeParams.postId;
	$scope.comment = {};
	if (!$scope.postId) {
		Posts.getNewestPost(function(post) {
			$scope.postId = post[0].ID;
			$scope.currentPage = $location.absUrl() + 'post/' + $scope.postId;
			loadPostInfo($scope.postId);
		});
	} else {
		$scope.currentPage = $location.absUrl();
		loadPostInfo($scope.postId);
	}
	Posts.getNewestNumberofPosts(5, function(posts) {
		$scope.posts = posts;
	});
	$scope.submitComment = function(comment) {
		Posts.saveComment($scope.postId, comment, function(success) {
			$scope.saveSuccessful = success;
			$scope.saveFailure = !success;
			if (success) {
				Posts.getComments($scope.postId, function(comments) {
					$scope.comments = comments;
				});
			}
		});
	}
	$scope.open = function() {
		var modalInstance = $modal.open({
			templateUrl: 'matureWarning.html',
			controller: 'MatureWarningCtrl',
			size: 'lg',
			backdrop: 'static'
		});
		modalInstance.result.then(function () {
			$scope.mature = false;
		},  function() {
			$location.path('/home');
		});
	}
}])
.controller('ResourcesCtrl', ['$scope', function($scope) {
	
}])
.controller('AboutCtrl', ['$scope', function($scope) {
	
}])
.controller('ArchiveCtrl', ['$scope', 'Posts', function($scope, Posts) {
	Posts.getPosts(function(posts) {
		$scope.posts = posts;
	});
}])
.controller('MatureWarningCtrl', ['$scope', '$modalInstance', function($scope, $modalInstance) {
	$scope.ok = function() {
		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};
}]);