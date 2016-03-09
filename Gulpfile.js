"use strict";

var os = require("os");
var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-ruby-sass");
var jshint = require("gulp-jshint");
var uglify = require("gulp-uglifyjs");
var rename = require("gulp-rename");
var concat = require("gulp-concat");
var notify = require("gulp-notify");
var header = require("gulp-header");
var minifycss = require("gulp-minify-css");
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

var codeMirror = {
    path: {
        src: {
            base: "lib/codemirror",
            mode: "lib/codemirror/mode",
            addon: "lib/codemirror/addon"
        },
        dist: "lib/codemirror"
    },
    base: [
        "lib/codemirror",
        "addon/mode/simple",
        "addon/mode/overlay",
        "addon/mode/loadmode",
        "addon/mode/multiplex",
        "addon/runmode/runmode",
        "mode/meta",
    ],

    modes: [
        "apl",
        "asciiarmor",
        "asn.1",
        "asterisk",
        "brainfuck",
        "clike",
        "clojure",
        "cmake",
        "cobol",
        "coffeescript",
        "commonlisp",
        "crystal",
        "css",
        "cypher",
        "d",
        "dart",
        "diff",
        "django",
        "dockerfile",
        "dtd",
        "dylan",
        "ebnf",
        "ecl",
        "eiffel",
        "elm",
        "erlang",
        "factor",
        "fcl",
        "forth",
        "fortran",
        "gas",
        "gfm",
        "gherkin",
        "go",
        "groovy",
        "haml",
        "handlebars",
        "haskell",
        "haskell-literate",
        "haxe",
        "htmlembedded",
        "htmlmixed",
        "http",
        "idl",
        "jade",
        "javascript",
        "jinja2",
        "jsx",
        "julia",
        "livescript",
        "lua",
        "markdown",
        "mathematica",
        "mirc",
        "mllike",
        "modelica",
        "mscgen",
        "mumps",
        "nginx",
        "nsis",
        "ntriples",
        "octave",
        "oz",
        "pascal",
        "pegjs",
        "perl",
        "php",
        "pig",
        "properties",
        "puppet",
        "python",
        "q",
        "r",
        "rpm",
        "rst",
        "ruby",
        "rust",
        "sass",
        "scheme",
        "shell",
        "sieve",
        "slim",
        "smalltalk",
        "smarty",
        "solr",
        "soy",
        "sparql",
        "spreadsheet",
        "sql",
        "stex",
        "stylus",
        "swift",
        "tcl",
        "textile",
        "tiddlywiki",
        "tiki",
        "toml",
        "tornado",
        "troff",
        "ttcn",
        "ttcn-cfg",
        "turtle",
        "twig",
        "vb",
        "vbscript",
        "velocity",
        "verilog",
        "vhdl",
        "vue",
        "xml",
        "xquery",
        "yaml",
        "yaml-frontmatter",
        "z80",
    ],

    addons: [
        "edit/trailingspace",
        "dialog/dialog",
        "search/searchcursor",
        "search/search",
        "scroll/annotatescrollbar",
        "search/matchesonscrollbar",
        "display/placeholder",
        "edit/closetag",
        "fold/foldcode",
        "fold/foldgutter",
        "fold/indent-fold",
        "fold/brace-fold",
        "fold/xml-fold",
        "fold/markdown-fold",
        "fold/comment-fold",
        "selection/active-line",
        "edit/closebrackets",
        "display/fullscreen",
        "search/match-highlighter"
    ]
};

gulp.task("js", function () {

    var bases = [];
    for (var i in codeMirror.base) {
        var base = codeMirror.base[i];
        bases.push(codeMirror.path.src.base + "/" + base + ".js");
    }

    return gulp.src(bases)
        .pipe(concat("codemirror.min.js"))
        .pipe(gulp.dest(codeMirror.path.dist))
        .pipe(uglify()) // {outSourceMap: true, sourceRoot: codeMirror.path.dist}
        .pipe(gulp.dest(codeMirror.path.dist))
        .pipe(header(headerMiniComment, {
            pkg: pkg, fileName: function (file) {
                var name = file.path.split(file.base + "\\");
                return (name[1] ? name[1] : name[0]).replace(/\\/g, "");
            }
        }))
        .pipe(gulp.dest(codeMirror.path.dist))
        .pipe(notify({message: "codemirror task complete!"}));
});


gulp.task("default", function () {
    gulp.run("js");
});