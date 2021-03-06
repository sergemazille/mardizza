'use strict';

// dependencies
const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const babelify = require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');
const exec = require('gulp-exec');

// configs
let options = {
    continueOnError: false, // default = false, true means don't emit error event
    pipeStdout: false, // default = false, true means stdout is written to file.contents
};

let reportOptions = {
    err: true, // default = true, false means don't write err
    stderr: true, // default = true, false means don't write stderr
    stdout: true // default = true, false means don't write stdout
};

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

// Style (sass)
gulp.task('style', function () {
    return gulp.src('./src/AppBundle/Resources/public/style/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .on('error', function (err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(postcss([ autoprefixer() ]))
        .pipe(concat('app.css'))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('web/assets/style'));
});

// Fonts (move only)
gulp.task('fonts', function () {
    return gulp.src('./src/AppBundle/Resources/public/fonts/*.*')
        .pipe(gulp.dest('web/assets/fonts'));
});

// Images (move only)
gulp.task('images', function () {
    return gulp.src('./src/AppBundle/Resources/public/images/**/*.*')
        .pipe(gulp.dest('web/assets/images'));
});

// Tests
gulp.task('tests', function () {
    let cmd = "php ./vendor/behat/behat/bin/behat";

    return gulp.src('.')
        .pipe(exec(cmd, options))
        .pipe(exec.reporter(reportOptions));
});

// Deploy
gulp.task('capistrano', ['tests'], function () {

    let cmd = "cap dev deploy";

    return gulp.src('.')
        .pipe(exec(cmd, options))
        .pipe(exec.reporter(reportOptions));
});

// Watches
gulp.task('watch', function () {
    gulp.watch('./src/AppBundle/Resources/public/js/**/*.js', ['babelify']);
    gulp.watch('./src/AppBundle/Resources/public/style/**/*.scss', ['style']);
});

// Default
gulp.task('default', ['assets', 'watch']);

// compile and move assets (without watch task)
gulp.task('assets', ['babelify', 'style', 'fonts', 'images']);

gulp.task('deploy', ['tests', 'capistrano']);