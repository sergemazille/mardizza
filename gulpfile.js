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

// Watches
gulp.task('watch', function () {
    gulp.watch('./src/AppBundle/Resources/public/js/**/*.js', ['babelify']);
    gulp.watch('./src/AppBundle/Resources/public/style/**/*.scss', ['style']);
});

// Default
gulp.task('default', ['deploy', 'watch']);

// Deploy only (without watch task)
gulp.task('deploy', ['babelify', 'style', 'fonts']);
