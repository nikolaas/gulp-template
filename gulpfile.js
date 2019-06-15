const { series, parallel, watch, src, dest } = require('gulp');
const browserSync = require('browser-sync').create();
const rimraf = require("rimraf");
const autoprefixer = require('autoprefixer')
const postcss = require('gulp-postcss')

function browser_sync() {
    browserSync.init({
        server: {
            baseDir: './dist/'
        }
    })
}

function watch_files() {
    watch('src/*.html', series(html, reload));
    watch('src/*.js', series(javascript, reload));
    watch('src/*.css', series(css, reload));
}

function reload(cb) {
    browserSync.reload();
    cb()
}

function html() {
    return src('src/*.html').pipe(dest('dist/'))
}

function javascript() {
    return src('src/*.js').pipe(dest('dist/js/'))
}

function css() {
    return src('src/*.css')
        .pipe(postcss([ autoprefixer() ]))
        .pipe(dest('dist/css/'))
}

function clean(cb) {
    rimraf.sync("/some/directory");
    cb()
}

exports.build = parallel(clean, html, javascript, css);

exports.watch = parallel(browser_sync, watch_files);