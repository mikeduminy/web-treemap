var gulp = require('gulp'),
	connect = require('gulp-connect');

gulp.task('connect', function() {
	connect.server({
		livereload: true,
		port: 8005
	});
});

gulp.task('html', function() {
	gulp.src('./*.html')
		.pipe(connect.reload());
});

gulp.task('styles', function() {
	gulp.src('./styles/*.css')
		.pipe(connect.reload());
})

gulp.task('scripts', function() {
	gulp.src('./scripts/*.js')
		.pipe(connect.reload());
})

gulp.task('watch', function() {
	gulp.watch(['./*.html'], ['html']);
	gulp.watch(['./styles/*.css'], ['styles', 'html']);
	gulp.watch(['./scripts/*.js'], ['scripts']);
});

gulp.task('default', ['connect', 'watch']);