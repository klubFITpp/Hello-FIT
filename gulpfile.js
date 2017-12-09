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
    return gulp.src('src/img/2017/speakers/*.*')
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
        .pipe(gulp.dest('dist/img/2017/speakers'));
});

gulp.task('sass', function () {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy-static', function () {
    gulp.src('src/img/**/*')
        .pipe(gulp.dest('dist/img/'));
    gulp.src('src/fonts/**/*')
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('compile-pages', function () {
    gulp.src('src/*.html')
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

gulp.task('watch', ['build'], function () {
    gulp.watch('src/scss/**/*.scss', ['sass']);
    gulp.watch(['src/img/**/*', 'src/fonts/**/*'], ['copy-static']);
    gulp.watch(['src/**/*.html'], ['compile-pages']);
});

gulp.task('build', gulpSequence('copy-static', 'sass', 'compress', 'responsive-img-speakers', 'compile-pages'));
