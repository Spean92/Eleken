// "use strict";

var gulp = require('gulp'),
    concatCss = require('gulp-concat-css'),
    sass = require('gulp-sass'),
    cleanCSS = require('gulp-clean-css'),
    browserSync  = require('browser-sync'),
    rename = require('gulp-rename'),
    // imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

//
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'dest'
        },
        notify: false
    });
});
// html
gulp.task('html', function() {
  return gulp.src('app/index.html')
  .pipe(gulp.dest('dest'))
  .pipe(browserSync.reload({stream: true}));
});

// css
gulp.task('scss', function() {
  return gulp.src('app/scss/style.scss')
    .pipe(sass({includePaths: require('node-normalize-scss').includePaths}))
    .pipe(autoprefixer('last 20 versions'))
    .pipe(cleanCSS())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('dest/css'))
    .pipe(browserSync.reload({stream: true}));
});

// scripts
gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(gulp.dest('dest/js'));
});

// images
gulp.task('images', function() {
  return gulp.src('app/img/*')
    .pipe(gulp.dest('dest/img'))
    .pipe(browserSync.reload({stream: true}));
});

// fonts
gulp.task('fonts', function() {
  return gulp.src('app/fonts/*')
    .pipe(gulp.dest('dest/fonts'));
});

// watcher
gulp.task('watch',['browser-sync', 'scripts', 'images'], function () {
   gulp.watch('app/scss/style.scss', ['scss'])
   gulp.watch('app/index.html', ['html']);

});

// default
gulp.task('default', ['html', 'scss', 'images', 'scripts', 'browser-sync', 'watch', 'fonts']);
