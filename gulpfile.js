//Packages
// ======================================================
var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

//Globs
// ======================================================

    var rawPaths = {
      index: './public/index.html',
      scss: './raw/css/**/*.scss*',
      js: './raw/js/*.js',
      img: './raw/img/*'
    };

    // For Public
    var output = {
      scssOut: './public/css',
      jsOut: './public/js',
      public: './public/',
      img : './public/img-min/'
    };

// ======================================================

var autoprefixerOptions = {
  browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};
//gulp-sass
// ======================================================

  gulp.task('sass',function(){
    return gulp.src(rawPaths.scss)
           .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
           .pipe(rename('main.min.css'))
           .pipe(autoprefixer(autoprefixerOptions))
           .pipe(gulp.dest(output.scssOut));
  });
  
  gulp.task('minifyJS', function(){
    return gulp.src(rawPaths.js)
          .pipe(uglify())
          .pipe(rename('scripts.min.js'))
          .pipe(gulp.dest(output.jsOut));
  });

  gulp.task('image-min',function(){
    return gulp.src(rawPaths.img)
          .pipe(imagemin())
          .pipe(gulp.dest(output.img));
  });

  // browser-sync reload
  gulp.task('browser-sync', function() {
      browserSync.init({
          server: {
              baseDir: "./public"
          }
      });

      //Watch files on reload
      gulp.watch(rawPaths.index).on('change', browserSync.reload);
      gulp.watch(rawPaths.scss,['sass']).on('change', browserSync.reload);
      gulp.watch(rawPaths.js).on('change', browserSync.reload);
  });

gulp.task('watch', function(){
  gulp.watch(rawPaths.index).on('change', browserSync.reload);
  gulp.watch(rawPaths.scss,['sass']).on('change', browserSync.reload);
  gulp.watch(rawPaths.js).on('change', browserSync.reload);
});

// gulp.task('default',['sass','watch']);
// ======================================================


// Defaults
gulp.task('default', ['browser-sync','sass', 'watch']);

gulp.task('succ', ['sass','watch']);
