var gulp = require('gulp');
var polybuild = require('polybuild');
var polyclean = require("polyclean");
var vulcanize = require('gulp-vulcanize');
var crisper = require('gulp-crisper');
var webserver = require('gulp-webserver');

gulp.task('_build', function() {
	return gulp.src('./dev/index.html')
	.pipe(polyclean.leftAlignJs)
    .pipe(polyclean.cleanJsComments)
    .pipe(polyclean.cleanCss)
    .pipe(polyclean.uglifyJs)
    .pipe(vulcanize({
        abspath: '',
        excludes: [],
        stripExcludes: true,
        inlineScripts: true,
        inlineCss:true
    }))
    .pipe(crisper({
        scriptInHead: false, // true is default 
        onlySplit: false
    }))
    .pipe(gulp.dest('.'));	  
});

gulp.task('_build_app', function(e) {
	return gulp.src('./dev/apps/*.html')
    .pipe(gulp.dest('./apps'));	  
});

gulp.task("_watch",function(){
	gulp.watch('./dev/*.html', ['build']);
	gulp.watch('./dev/apps/*.html', ['build_app']);
});

gulp.task("build",["_build","_build_app","_watch"]);

gulp.task("_dev",function(){
	gulp.src('./')
    .pipe(webserver({
		livereload: true,
		directoryListing: true,
		open: true
    }));
});

gulp.task("default",["_dev"]);



