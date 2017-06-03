var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var fileinclude = require('gulp-file-include');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy-static', function () {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
});


gulp.task('compile-index', function() {
    gulp.src('src/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/img/**/*'], ['copy-static']);
    gulp.watch(['src/**/*.html'], ['compile-index']);
});



gulp.task('build', ['copy-static', 'compile-index', 'sass']);
