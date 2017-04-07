var cleancss = require("gulp-clean-css");
var gulp = require("gulp");
var htmlmin = require("gulp-htmlmin");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var uncss = require("gulp-uncss");

var csscleanOptions = {
    level: {
        1: {
            specialComments: "none"
        }
    }
}
var htmlminOptions = {
    collapseWhitespace: true,
    minifyJS: true,
    removeComments: true
}
var uglifyOptions = {
    mangle: {
        toplevel: true
    }
}
var uncssOptions = {
    html: ["./dist/**/*.html"]
}

// Remove unused CSS rules and minimize the CSS file.
gulp.task("clean-css", ["css"], function() {
    return gulp.src("./dist/css/*.css")
        .pipe(uncss(uncssOptions))
        .pipe(cleancss(csscleanOptions))
        .pipe(gulp.dest("./dist/css"));
});

// Convert Sass files to CSS and copy them to distribution directory.
gulp.task("css", function() {
    return gulp.src("./stylesheets/kmbmpdc.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(gulp.dest("./dist/css"));
});

// Minimize HTML pages and copy them to distribution directory.
gulp.task("html", function() {
    return gulp.src("./source/**/*.html")
        .pipe(htmlmin(htmlminOptions))
        .pipe(gulp.dest("./dist/"));
});

// Minimize Javascript and copy it over to distribution directory.
gulp.task("js", function() {
    return gulp.src("./javascript/*.js")
        .pipe(uglify(uglifyOptions))
        .pipe(gulp.dest("./dist/js"))
});

// Copy over static assets to distribution directory.
gulp.task("static-assets", function() {
    return gulp.src("./static/**/*")
        .pipe(gulp.dest("./dist/static"))
});

// Perform all watch tasks.
gulp.task("watch", ["watch-css", "watch-html", "watch-js"]);

// Watch Sass files for changes and run "css" task.
gulp.task("watch-css", function() {
    return gulp.watch("stylesheets/*.scss", ["css"]);
});

// Watch HTML files for changes and run "html" task.
gulp.task("watch-html", function() {
    return gulp.watch("source/**/*.html", ["html"]);
});

// Watch JS files for changes and run "js" task.
gulp.task("watch-js", function() {
    return gulp.watch("javascript/**/*.js", ["js"]);
});

// Perform all the tasks required for building the page(s).
gulp.task("default", ["css", "html", "js", "clean-css", "static-assets"]);
