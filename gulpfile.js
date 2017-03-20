const gulp = require('gulp');
const nodemon = require('nodemon');

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
