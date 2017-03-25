const gulp = require('gulp');
const nodemon = require('nodemon');
const gulpMocha = require('gulp-mocha');

gulp.task('default', () => {
  nodemon({
    script: 'app.js',
    ext: 'js',
    env: {
      PORT: 8099
    },
    ignore: ['./node-modules/**']
  }).on('restart', () => {
    console.log('Restarting...');
  })
});

gulp.task('test', () => {
  gulp.src('tests/*.js', {read: false})
  .pipe(gulpMocha({reporter: 'nyan'}));
});
