var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass()) // Using gulp-sass
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy-static', function () {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/**/*.html', 'src/img/**/*'], ['copy-static']);
});

gulp.task('build', ['copy-static', 'sass']);
