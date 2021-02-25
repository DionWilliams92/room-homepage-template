const { src, dest, watch, series } = require('gulp');

const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();


// SASS Task
function scssTask() {
    return src('assets/scss/style.scss', { sourecemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano()]))
    .pipe(dest('dist', { sourcemaps: '.' }));
}

// Browser Sync Task
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.'
        }
    });
    cb();
}

function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

//Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch(['assets/scss/style.scss'], series(scssTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    browserSyncServe,
    watchTask
);