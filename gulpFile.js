const gulp = require('gulp');
const gulpBabel = require('gulp-babel');
const del = require('del');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');

const TASK_ES6_TO_ES5 = 'TASK_ES6_TO_ES5';
const TASK_CLEAN_DIST = 'TASK_CLEAN_DIST';
const BUILD = 'BUILD';

const SOURCE_FOLDER = 'src/';
const DESTINATION_FOLDER = 'lib/';

gulp.task(TASK_CLEAN_DIST, function () {

  del.sync([DESTINATION_FOLDER + '**']);
});

gulp.task(TASK_ES6_TO_ES5, function () {

  const babelConfiguration = {
    presets: ['es2015']
  };

  return gulp.src(SOURCE_FOLDER + '**/*.js')
    .pipe(gulpBabel(babelConfiguration))
    .pipe(uglify())
    .pipe(gulp.dest(DESTINATION_FOLDER));
});

gulp.task(BUILD,function(){

  runSequence(TASK_CLEAN_DIST,TASK_ES6_TO_ES5);
});