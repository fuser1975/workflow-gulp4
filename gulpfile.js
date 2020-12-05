const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass");
const concat = require("gulp-concat");

const watchedSass = "source/sass/**/*.scss";
const watchedJS = "source/js/**/*.js";
const watchedHTML = "source/*.html";

const sourceSass = "source/sass/style.scss"

const destFolder = "public";
const destFolderCSS = "public/css";
const destFolderJS = "public/js";

// Task - compile  files *.scss to public/css/style.css 
function buildcss(cb) {
    src(sourceSass)
    .pipe(sass({
        outputStyle: 'compressed'
    }))
    .pipe(dest(destFolderCSS));

    cb();
}

// Task - watching files *.scss
function watchingSass(cb) {
    watch(watchedSass, buildcss);
    cb();
}

// Task - copy files *.html
function copyHTML(cb) {
    src('source/*.html')
    .pipe(dest(destFolder));

    cb();
}

// Task - watching files *.html
function watchingHTML(cb) {
    watch(watchedHTML, copyHTML);
    cb();
}

// Task - concat files *.js and copy to public/js/main.js
function buildJS(cb) {
    src(['source/js/underscore.js', 'source/js/app.js'])
    .pipe(concat('main.js'))
    .pipe(dest(destFolderJS));

    cb();
}

// Task - watching files *.js
function watchingJS(cb) {
    watch(watchedJS, buildJS);
    cb();
}

exports.default = series(copyHTML, buildJS, buildcss);

exports.copyhtml = copyHTML;
exports.watchingHTML = watchingHTML;

exports.buildCSS = buildcss;
exports.watchCSS = watchingSass;

exports.buildJS = buildJS;
exports.watchingJS = watchingJS;