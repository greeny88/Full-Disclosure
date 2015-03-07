module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		bower: {
			install: {
				options: {
					targetDir: 'src/main/webapp/assets/dependencies',
					layout: 'byComponent'
				}
			}
		},
		concat: {
			js: {
				options: {
					banner: 'var version="<%= pkg.version %>";\n'
				},
				src: ['src/main/webapp/assets/dependencies/angular/*.js',
				      'src/main/webapp/assets/dependencies/**/*.js',
				      'src/main/webapp/assets/js/app.js',
				      'src/main/webapp/assets/js/*.js',
				      '!src/main/webapp/assets/js/combined.js',
				      '!src/main/webapp/assets/js/combined.min.js',
				      '!src/main/webapp/assets/dependencies/bootstrap/**/*.js',
				      '!src/main/webapp/assets/dependencies/jquery/**/*.js'],
				dest: 'src/main/webapp/assets/js/combined.js'
			}
		},
		uglify : {
			options: {
				sourceMap: true,
				sourceMapName: 'build/main/webapp/assets/js/combined.js.map'
			},
			build : {
				src : 'src/main/webapp/assets/js/combined.js',
				dest : 'build/main/webapp/assets/js/combined.min.js'
			}
		},
		cssmin: {
			options: {
				keepSpecialComments: 0
			},
			css: {
				src: ['src/main/webapp/assets/dependencies/**/*.css',
				      'src/main/webapp/assets/css/*.css',
				      '!src/main/webapp/assets/css/combined.min.css'],
				dest: 'build/main/webapp/assets/css/combined.min.css'
			}
		},
		clean: {
			all: ['build']
		},
//		preprocess: {
//			options: {
//				context: {
//					VERSION: '<%= pkg.version %>'
//				}
//			},
//			html: {
//				src: ['src/main/webapp/template-index.html'],
//				dest: 'build/main/webapp/index.html'
//			}
//		},
		copy: {
			css: {
				files: [{
					expand:true,
					cwd: 'src/main/webapp/assets/dependencies/',
					flatten: true,
					filter: 'isFile',
					src: ['bootstrap/glyphicons*'],
					dest: 'build/main/webapp/assets/fonts/'
				}]
			},
			html: {
				files: [{
					expand:true,
					cwd: 'src/main/webapp/assets/html/',
					flatten: true,
					filter: 'isFile',
					src: ['*.html'],
					dest: 'build/main/webapp/assets/html/'
				}]
			},
//			html: {
//				src: 'src/main/webapp/assets/html/*.html',
//				dest: 'build/main/webapp/assets/html/',
//				options: {
//					process: function(content, srcpath) {
//						var file_split = srcpath.split('.');
//						var version_file_name = file_split[0] + '-<%= pkg.version %>.html';
//						return version_file_name;
//					}
//				}
//			},
			all: {
				files: [{
					expand: true,
					cwd: 'src/main/webapp/',
					src: [
//					      'assets/js/combined-<%= pkg.version %>.min.js',
//					      'assets/css/combined-<%= pkg.version %>.min.css',
					      'assets/font/*',
					      'assets/images/*',
					      'index.html'],
					dest: 'build/main/webapp/'
				}]
			}
		}
//		,
//		compress: {
//			options: {
//				mode: 'gzip'
//			},
//			js: {
//				expand: true,
//				cwd: 'src/main/webapp/assets/js/',
//				src: ['combined-<%= pkg.version %>.min.js'],
//				dest: 'build/main/webapp/assets/js/',
//				ext: '.js.gz',
//				extDot: 'last'
//			},
//			css: {
//				expand: true,
//				cwd: 'src/main/webapp/assets/css/',
//				src: ['combined-<%= pkg.version %>.min.css'],
//				dest: 'build/main/webapp/assets/css/',
//				ext: '.css.gz',
//				extDot: 'last'
//			},
//			html: {
//				expand: true,
//				cwd: 'src/main/webapp/assets/html/',
//				src: ['*.html'],
//				dest: 'build/main/webapp/assets/html/',
//				ext: '-<%= pkg.version %>.html.gz',
//				extDot: 'last'
//			}
//		}
	});

	grunt.loadNpmTasks('grunt-bower-task');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-preprocess');
	grunt.loadNpmTasks('grunt-contrib-copy');
//	grunt.loadNpmTasks('grunt-contrib-compress');

	grunt.registerTask('default', [ 'bower', 'concat', 'clean', 'uglify', 'cssmin', 'copy' ]);
};