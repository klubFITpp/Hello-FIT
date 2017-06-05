var gulp = require('gulp');
var sass = require('gulp-sass');
var useref = require('gulp-useref');
var fileinclude = require('gulp-file-include');
var autoprefixer = require('gulp-autoprefixer');
var minifyHtml = require("gulp-minify-html");
var minifyCss = require("gulp-minify-css");
var responsive = require('gulp-responsive');
var gulpSequence = require('gulp-sequence');

gulp.task('responsive-img-speakers', function () {
    return gulp.src('src/img/speakers/*.*')
        .pipe(responsive({
            '*': [
                {
                    width: 200,
                    rename: {
                        extname: '.jpg'
                    }
                },
                {
                    width: 400,
                    rename: {
                        suffix: '@2x',
                        extname: '.jpg'
                    }
                }
            ]
        }, {
            quality: 90,
            progressive: true,
            withMetadata: false,
            errorOnEnlargement: false
        }))
        .pipe(gulp.dest('dist/img/speakers'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy-static', function () {
    gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img/'));
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('compile-index', function () {
    gulp.src('src/index.html')
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('compress', function () {
    gulp.src('dist/**/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('dist'));
    gulp.src('dist/css/**/*.css') // path to your file
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/img/**/*', 'src/fonts/**/*'], ['copy-static']);
    gulp.watch(['src/**/*.html'], ['compile-index']);
});

gulp.task('build', gulpSequence('copy-static', 'compile-index', 'sass', 'compress', 'responsive-img-speakers'));
