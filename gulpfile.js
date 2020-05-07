var gulp = require('gulp');
var sass = require('gulp-sass');
var replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');

gulp.task('sass', function() {
  //root scss file (import all your partials into here)
  return gulp.src('./sass/main.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      // add vendor prefixes
      .pipe(autoprefixer())
      // change the file name to be styles.scss.liquid file
      .pipe(rename('application.scss.liquid'))
      // remove the extra set of quotations used for escaping the liquid string
      .pipe(replace('"{{', '{{'))
      .pipe(replace('}}"', '}}'))
      // save the file to the theme assets directory
      .pipe(gulp.dest('./assets/'));
});

gulp.task('default', function() {
  // this assumes your sass is in a directory named 'sass'
  gulp.watch('./sass/**/*.scss', gulp.series('sass'));
});