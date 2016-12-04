'use strict';

// dependencies
const gulp = require('gulp');
const less = require('gulp-less');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

// Scripts (ES6)
gulp.task('babelify', function () {
    let bundler = browserify('./src/AppBundle/Resources/public/js/main.js', {debug: true}).transform(babelify);

    bundler.bundle()
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source('app.js')) //fichier de destination
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/assets/js'));
});

gulp.task('lib', function () {
    return gulp.src('./src/AppBundle/Resources/public/js/lib/*.js')
        .pipe(gulp.dest('./web/assets/js/lib'));
});

// Style (less)
gulp.task('style', function () {
    return gulp.src('./src/AppBundle/Resources/public/style/*.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./web/assets/style'));
});

// Watches
gulp.task('watch', function () {
    gulp.watch('./src/AppBundle/Resources/public/js/*.js', ['babelify']);
    gulp.watch('./src/AppBundle/Resources/public/js/lib/*.js', ['lib']);
    gulp.watch('./src/AppBundle/Resources/public/style/*.less', ['style']);
});

// Default
gulp.task('default', ['deploy', 'watch']);

// Deploy only (without watch task)
gulp.task('deploy', ['babelify', 'lib', 'style']);
