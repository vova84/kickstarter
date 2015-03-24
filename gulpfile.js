// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass'),
    path = require('path'),
    embedlr = require("gulp-embedlr"),
    cache = require('gulp-cache'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    rigger = require('gulp-rigger'),
    processhtml = require('gulp-processhtml'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    server = lr();

// Styles on build
gulp.task('styles', function() {
    return gulp.src('app/styles/main.css')
        .pipe(gulp.dest('dist/styles'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/styles'));
});

//rigger
gulp.task('rigger', function () {
    gulp.src('app/html-partials/index.html')
        .pipe(rigger())
        .pipe(gulp.dest('app/'))
        .pipe(livereload(server));
});

//files
gulp.task('files', function() {
    return gulp.src(['app/*.php', 'app/*.ico', 'app/*.htc', 'app/*.txt'])
        .pipe(gulp.dest('dist'));
});

//modernizr
gulp.task('modernizr', function() {
    return gulp.src('app/scripts/modernizr.js')
        .pipe(gulp.dest('dist/scripts'));
});

// Styles on watch
gulp.task('scss', function() {
    return gulp.src('app/scss/main.scss')
        .pipe(sass({compass: true, 'sourcemap=none': true}))
        .pipe(autoprefixer('last 2 version', 'safari >= 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('app/styles'))
        .pipe(livereload(server));
});


//remove comments and livereload scripts from output html files -  gulp-processhtml
gulp.task('processHTML', function() {
    return gulp.src('./app/index.html')
        .pipe(processhtml('index.html'))
        .pipe(gulp.dest('./dist/'));
});

// Scripts
gulp.task('scripts', function() {
    return gulp.src(['app/scripts/libs/*.js','app/scripts/main.js', 'app/scripts/*.js', '!./app/scripts/modernizr.js'])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe(livereload(server));
});

// Images
gulp.task('images', function() {
    return gulp.src('app/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
});

// Html
gulp.task('html', function() {
    return gulp.src("app/**/*.html")
        .pipe(embedlr())
        .pipe(livereload(server));
});

// Clean
gulp.task('clean', function() {
    return gulp.src(['dist/styles', 'dist/scripts', 'dist/images'], {read: false})
        .pipe(clean());
});

// Default task
gulp.task('default', ['styles', 'images','scripts','files','modernizr', 'processHTML']);

// Watch
gulp.task('watch', function() {

    // Listen on port 35729
    server.listen(35729, function (err) {
        if (err) {
            return console.log(err)
        }
    });

    // Watch .scss files
    gulp.watch('app/scss/**/*.scss', ['scss']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    //gulp.watch('app/**/*.html', ['html']);

    gulp.watch('app/html-partials/*.html', ['rigger']);

});


