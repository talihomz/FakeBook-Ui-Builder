var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var runSequence = require('run-sequence');
var sass        = require('gulp-sass');
const image  = require('gulp-image');

// Static Server + watching scss/html files
gulp.task('serve', () => {

  browserSync.init({
      server: "public"
  });

  gulp.watch("src/*.html", ['html']);
  gulp.watch("src/scss/**/*.scss", ['sass']);
  gulp.watch("public/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', () =>
  gulp.src("src/scss/main.scss")
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("public/css"))
    .pipe(browserSync.stream())
);

// Compress images
gulp.task('images', () =>
    gulp.src('src/images/*')
        .pipe(image())
        .pipe(gulp.dest('public/images'))
);

// Browser Sync
gulp.task('html', function(){
  gulp.src('src/*.html')
    .pipe(gulp.dest('public'))
    .pipe(browserSync.stream());
});

// Default task
gulp.task('default', function(callback){
  runSequence('sass',
              ['images', 'html'],
              'serve',
              callback);
});