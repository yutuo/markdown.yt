"use strict";

var os = require("os");
var gulp = require("gulp");
var gutil = require("gulp-util");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglifyjs");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var header = require("gulp-header");
var minifycss = require("gulp-minify-css");
var browserify = require('gulp-browserify');
//var jsdoc        = require("gulp-jsdoc");
//var jsdoc2md     = require("gulp-jsdoc-to-markdown");
var pkg = require("./package.json");
var dateFormat = require("dateformatter").format;
var replace = require("gulp-replace");

pkg.name = "markdown.yt";
pkg.today = dateFormat;

var headerComment = ["/*",
    " * <%= pkg.name %>",
    " *",
    " * @file        <%= fileName(file) %> ",
    " * @version     v<%= pkg.version %> ",
    " * @description <%= pkg.description %>",
    " * @license     MIT License",
    " * @author      <%= pkg.author %>",
    " * {@link       <%= pkg.homepage %>}",
    " */",
    "\r\n"].join("\r\n");

var headerMiniComment = "/*! <%= pkg.name %> v<%= pkg.version %> | <%= fileName(file) %> | <%= pkg.description %> | MIT License | By: <%= pkg.author %> | <%= pkg.homepage %> | <%=pkg.today('Y-m-d') %> */\r\n";

var dist = "dist";

var cssSrcs = [
    "css/markdownyt.css",
];

gulp.task("css", function () {
    return gulp.src(cssSrcs)
        .pipe(concat("markdownyt.css"))
        .pipe(gulp.dest(dist))
        .pipe(concat("markdownyt.min.css"))
        .pipe(minifycss({compatibility: 'ie8'}))
        .pipe(gulp.dest(dist));
});

var jsLibSrcs = [
    "lib/markdown-it/markdown-it.js",
    "lib/markdown-it/markdown-it-abbr.js",
    "lib/markdown-it/markdown-it-container.js",
    "lib/markdown-it/markdown-it-deflist.js",
    "lib/markdown-it/markdown-it-emoji.js",
    "lib/markdown-it/markdown-it-footnote.js",
    "lib/markdown-it/markdown-it-for-inline.js",
    "lib/markdown-it/markdown-it-ins.js",
    "lib/markdown-it/markdown-it-mark.js",
    "lib/markdown-it/markdown-it-sub.js",
    "lib/markdown-it/markdown-it-sup.js",
    "lib/markdown-it/markdown-it-toc.js",
    "lib/markdown-it/markdown-it-simplemath.js",
];

var jsSrcs = [    
    "src/markdownyt.js",
];

gulp.task("js", function () {
    
    return gulp.src(jsSrcs)
        .pipe(concat("markdownyt.js"))
        .pipe(browserify({standalone: 'MarkdownYt'}))
        .pipe(gulp.dest(dist))
        .pipe(concat("markdownyt.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(header(headerMiniComment, {
            pkg: pkg, fileName: function (file) {
                var name = file.path.split(file.base + "\\");
                return (name[1] ? name[1] : name[0]).replace(/\\/g, "");
            }
        }))
        .pipe(gulp.dest(dist));
});

gulp.task("jsall", function () {
    
    return gulp.src(jsLibSrcs.concat([dist + '/markdownyt.js']))
        .pipe(concat("markdownyt.all.js"))
        .pipe(gulp.dest(dist))
        .pipe(concat("markdownyt.all.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest(dist))
        .pipe(header(headerMiniComment, {
            pkg: pkg, fileName: function (file) {
                var name = file.path.split(file.base + "\\");
                return (name[1] ? name[1] : name[0]).replace(/\\/g, "");
            }
        }))
        .pipe(gulp.dest(dist));
});


gulp.task("default", function () {
    gulp.run("css");
    gulp.run("js");
    gulp.run("jsall");
});