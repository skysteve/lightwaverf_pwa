/**
 * Created by steve on 22/09/2016.
 */
'use strict';
const fs = require('fs');
const glob = require('glob');
const del = require('del');
const gulp = require('gulp');
const gulpCopy = require('gulp-copy');
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

gulp.task('copyStatic', ['copyFavicon'], () => {
  return gulp.src(['src/images/**/*', 'src/manifest.json'])
    .pipe(gulpCopy('dist', {
      prefix: 1
    }));
});

gulp.task('copyFavicon', () => {
  return gulp.src(['src/images/favicon*'])
    .pipe(gulpCopy('dist', {
      prefix: 2
    }));
});

gulp.task('html', ['serviceWorker'], () => {
  const target = gulp.src('./src/html/index.html');
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  const sources = gulp.src(['./dist/js/main.js', './src/**/*.css'], {read: false});

  return target.pipe(inject(sources, {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('includeTemplates', ['html'], () => {
  let fileContents = fs.readFileSync('./dist/index.html').toString();
  const templateFiles = glob.sync('./src/html/templates/**/*.html');
  const templateString = templateFiles.map(file => {
    return fs.readFileSync(file);
  }).join('\n');

  fileContents = fileContents.replace('<!--INCLUDE_TEMPLATES-->', templateString);
  fs.writeFileSync('./dist/index.html', fileContents)
});

gulp.task('lint', () =>
  gulp.src(['src/**/*.js'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);

gulp.task('script', ['clean:dist'], () => {
  return rollup({
    entry: 'src/js/index.js',
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs()
    ]
  }).then((bundle) => {
    return bundle.write({
      format: 'iife',
      dest: 'dist/js/main.js',
      sourceMap: true
    });
  });
});

gulp.task('serviceWorker', ['script'], () => {
  return rollup({
    entry: 'src/js/serviceWorker/index.js',
    plugins: [
      nodeResolve({ jsnext: true }),
      commonjs()
    ]
  }).then((bundle) => {
    return bundle.write({
      format: 'iife',
      dest: 'dist/sw.js',
      sourceMap: true
    });
  });
});

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'src/**/*.html'], ['build']);
});

// TODO minify all the things
// TODO pull in material design from npm

gulp.task('build', ['includeTemplates', 'copyStatic']);
gulp.task('test', ['lint'], () => {});
gulp.task('default', ['test']);
