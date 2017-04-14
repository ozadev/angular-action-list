var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


//
//
//

var sassSources = [
    './css/**/*.scss',
    './angular-action-list/**/*.scss'
];

var jsSources = [
    './angular-action-list/angularActionList.module.js',
    './angular-action-list/**/*js'
];

//
//
//


gulp.task('sass', function () {
    return gulp.src(sassSources)
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 60 versions'],
            cascade: false
        }))
        .pipe(concat("style.css"))
        .pipe(gulp.dest('./css/'));
});

gulp.task('build', function () {
    return gulp.src(jsSources)
        .pipe(concat('build.js'))
        .pipe(gulp.dest('./build/'));
});

gulp.task('watch', function () {
    gulp.watch(sassSources, ['sass']);
    gulp.watch(jsSources, ['build']);
});

gulp.task('default', ['sass', 'build', 'watch']);