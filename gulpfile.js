/**
 * Created by steve on 22/09/2016.
 */
'use strict';

const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const inject = require('gulp-inject');
const rollup = require('rollup').rollup;
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');

gulp.task('clean:dist', function () {
  return del([
    'dist/**/*.js',
    'dist/**/*.css',
    'dist/**/*.html',
  ]);
});

gulp.task('html', ['script'], () => {
  const target = gulp.src('./src/html/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = gulp.src(['./dist/js/main.js', './src/**/*.css'], {read: false});

  return target.pipe(inject(sources, {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', () =>
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('script', () => {
  return rollup({
    entry: 'src/js/index.js',
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs()
    ]
  }).then(function (bundle) {
    return bundle.write({
      format: 'iife',
      dest: 'dist/js/main.js',
      sourceMap: true
    });
  });
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'src/**/html'], ['build']);
});

gulp.task('build', ['clean:dist', 'html']);
gulp.task('test', ['lint'], () => {});
gulp.task('default', ['test']);
