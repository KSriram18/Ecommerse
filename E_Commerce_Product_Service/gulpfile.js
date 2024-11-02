const eslint = require('gulp-eslint');
const fs = require('fs');
const gulp = require('gulp');

gulp.task('lint', () => gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.format('html', fs.createWriteStream('lintReports/lint_report.html')))
    .pipe(eslint.format('checkstyle', fs.createWriteStream('lintReports/checkstyle.xml')))
    .pipe(eslint.failAfterError()));
