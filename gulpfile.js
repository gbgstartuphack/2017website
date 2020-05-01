/* Modules & variables
-------------------------------------*/
var gulp          = require('gulp');
var sass          = require('gulp-sass');
var autoprefixer  = require('gulp-autoprefixer');
var minifycss     = require('gulp-minify-css');
var rename        = require('gulp-rename');
var images        = require('gulp-imagemin');
const browsersync = require("browser-sync").create();
var uglify        = require('gulp-uglify');


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
// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "."
    },
    port: 4000
  });
  done();
}

// BrowserSync Reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

//Live-reload
var tinylr;
const livereload = () => {
  tinylr = require('tiny-lr')();
  tinylr.listen(4002);
};

//Styles
const styles = () => {
  return gulp.src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest(paths.css))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest(paths.css)); 
};
const notifyLiveReload =  (event) => {
  var fileName = require('path').relative(__dirname, event.path);

  returntinylr.changed({
    body: {
      files: [fileName]
    }
  });
};

// Image minifyer

const imagesMover = () => {
  return gulp.src(['res/images/*.jpg', 'res/images/*.png', 'res/images/**/*'])
    .pipe(gulp.dest("build/images"));
};

//JS uglify
const uglifyJob =  () => {
  return gulp.src(paths.js)
    .pipe(uglify())
    .pipe(gulp.dest(paths.jsmin))
};

/* Watchers
-------------------------------------*/


// Watch files
const watch = () => {
  gulp.watch("stylesheets/**/*.scss", styles);
  gulp.watch(paths.js, gulp.series(uglify));
  gulp.watch(
    [
      paths.html,
      paths.cssReload
    ],
    gulp.series(browserSyncReload)
  );
  gulp.watch("./assets/img/**/*", images);
}

const defaultTasks = gulp.parallel( styles, uglifyJob, browserSync,watch);

exports.imagesMover = imagesMover;
exports.styles = styles;
exports.uglifyJob = uglifyJob;
exports.livereload = livereload;
exports.watch=watch;

exports.default = defaultTasks;