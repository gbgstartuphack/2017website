/* Modules & variables
-------------------------------------*/
var gulp          = require('gulp');
    sass          = require('gulp-sass'),
    autoprefixer  = require('gulp-autoprefixer'),
    minifycss     = require('gulp-minify-css'),
    rename        = require('gulp-rename'),
    images        = require('gulp-imagemin');
    uglify        = require('gulp-uglify');


/* Paths
-------------------------------------*/
var paths = {
  scss:       'stylesheets/main.scss',
  css:        'build/css/',
  cssReload:  'build/css/main.css',
  html:       '*.html',
  js:         'scripts/main.js',
  jsmin:      'build/scripts/'
};


/* Tasks
-------------------------------------*/
//Server
gulp.task('express', function() {
  var express = require('express');
  var app = express();
  app.use(require('connect-livereload')({port: 4002}));
  app.use(express.static(__dirname));
  console.log('App running frontend on port 4000\nLivereload on port 4002');
  app.listen(4000);
});

//Live-reload
var tinylr;
gulp.task('livereload', function() {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
});


//Styles
gulp.task('styles', function() {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.css));
  
});

function notifyLiveReload(event) {
  var fileName = require('path').relative(__dirname, event.path);

  tinylr.changed({
    body: {
      files: [fileName]
    }
  });
}

// Image minifyer
gulp.task("images", function(){
  gulp.src(['res/images/*.jpg', 'res/images/*.png', 'res/images/**/*'])
    .pipe(images({
      progressive: true,
      cache: false
    }))
    .pipe(gulp.dest("build/images"));
});

//JS uglify
gulp.task('uglify', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsmin))
});

/* Watchers
-------------------------------------*/
gulp.task('watch', function() {
  gulp.watch('stylesheets/**/*.scss', ['styles']);
  gulp.watch(paths.js, ['uglify']);
  gulp.watch(paths.html, notifyLiveReload);
  gulp.watch(paths.cssReload, notifyLiveReload);
});


gulp.task('default', ['express', 'styles', 'uglify', 'livereload', 'watch'], function() {

});
