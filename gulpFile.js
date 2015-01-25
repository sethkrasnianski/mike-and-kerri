var config      = require('./gulp.json'),
    gulp        = require('gulp'),
    util        = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    minCSS      = require('gulp-minify-css'),
    stylus      = require('gulp-stylus'),
    connect     = require('gulp-connect'),
    watch       = require('gulp-watch'),
    aprefix     = require('autoprefixer-stylus'),
    rupture     = require('rupture'),
    nib         = require('nib');

// Set paths
var paths = config;

// Run live reload server
gulp.task('server', function(next) {
  connect.server({
    port: 3838,
    root: 'public',
    livereload: true
  });
});

gulp.task('html', function() {
  gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(connect.reload());
});

// Project scripts
gulp.task('scripts.project', function() {
  gulp.src(paths.scripts.project)
    // For production
    // .pipe(uglify())
    .pipe(concat('main.js'))
    .pipe(gulp.dest(paths.scripts.dest.project))
    .pipe(connect.reload());
});

// Vendor Scripts
gulp.task('scripts.vendor', function() {
  gulp.src(paths.scripts.vendor)
    .pipe(uglify())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.scripts.dest.project))
    .pipe(connect.reload());
});

// Stylesheets Project
gulp.task('stylesheets.project', function() {
  // Project styles
  gulp.src(paths.styles.src)
    .pipe(stylus({
      use: [
        rupture(),
        aprefix(),
        nib()
      ]
    }))
    // Production
    // .pipe(minCSS())
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(connect.reload());
});

// Watch
gulp.task('watch', function () {
  gulp.watch(paths.html.src, ['html']);
  watch(paths.scripts.project, function() {
    gulp.start('scripts.project');
  });
  watch(paths.scripts.vendor, function() {
    gulp.start('scripts.vendor');
  });
  watch(paths.styles.src, function() {
    gulp.start('stylesheets.project');
  });
});

gulp.task('default', ['server', 'html', 'stylesheets.project', 'scripts.project', 'scripts.vendor', 'watch']);
