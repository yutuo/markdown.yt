/*! markdownyt https://github.com/yutuo/markdown.yt @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownyt = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}
)({1:[function(require,module,exports){

'use strict';

var defaults = {
    html:           true,        // Enable HTML tags in source
    xhtmlOut:       true,        // Use '/' to close single tags (<br />)
    breaks:         true,        // Convert '\n' in paragraphs into <br>
    linkify:        true,         // autoconvert URL-like texts to links
    typographer:    false,         // Enable smartypants and other sweet transforms


    useAbbr:        true,
    useContainer:   true,
    useDeflist:     true,
    useEmoji:       true,
    useFootnote:    true,
    useIns:         true,
    useMark:        true,
    useSub:         true,
    useSup:         true,
    useToc:         true,
    useMath:        false,

    useLinkNewWin:  false,
    useSourceLine:  false,
    useCodeBlockPre:false,
    
    highlight:      false,
    useLineNumber:  true,
    useShowLangName:true,

};

var langNamesForDisplay = {
    '1c': '1C',
    'accesslog': 'Access logs',
    'armasm': 'ARM assembler',
    'arm': 'ARM assembler',
    'avrasm': 'AVR assembler',
    'actionscript': 'ActionScript',
    'as': 'ActionScript',
    'apache': 'Apache',
    'apacheconf': 'Apache',
    'applescript': 'AppleScript',
    'osascript': 'AppleScript',
    'asciidoc': 'AsciiDoc',
    'adoc': 'AsciiDoc',
    'aspectj': 'AspectJ',
    'autohotkey': 'AutoHotkey',
    'autoit': 'AutoIt',
    'axapta': 'Axapta',
    'bash': 'Bash',
    'sh': 'Bash',
    'zsh': 'Bash',
    'basic': 'Basic',
    'brainfuck': 'Brainfuck',
    'bf': 'Brainfuck',
    'cs': 'C#',
    'csharp': 'C#',
    'c': 'C',
    'cc': 'C',
    'h': 'C',
    'cpp': 'C++',
    'c++': 'C++',
    'h++': 'C++',
    'hpp': 'C++',
    'cal': 'C/AL',
    'cos': 'Cache Object Script',
    'cls': 'Cache Object Script',
    'cmake': 'CMake',
    'cmake.in': 'CMake',
    'csp': 'CSP',
    'css': 'CSS',
    'capnproto': 'Cap\'n Proto',
    'capnp': 'Cap\'n Proto',
    'clojure': 'Clojure',
    'clj': 'Clojure',
    'coffeescript': 'CoffeeScript',
    'coffee': 'CoffeeScript',
    'cson': 'CoffeeScript',
    'iced': 'CoffeeScript',
    'crmsh': 'Crmsh',
    'crm': 'Crmsh',
    'pcmk': 'Crmsh',
    'crystal': 'Crystal',
    'cr': 'Crystal',
    'd': 'D',
    'dns': 'DNS Zone file',
    'zone': 'DNS Zone file',
    'bind': 'DNS Zone file',
    'dos': 'DOS',
    'bat': 'DOS',
    'cmd': 'DOS',
    'dart': 'Dart',
    'delphi': 'Delphi',
    'dpr': 'Delphi',
    'dfm': 'Delphi',
    'pas': 'Delphi',
    'pascal': 'Delphi',
    'freepascal': 'Delphi',
    'lazarus': 'Delphi',
    'lpr': 'Delphi',
    'lfm': 'Delphi',
    'diff': 'Diff',
    'patch': 'Diff',
    'django': 'Django',
    'jinja': 'Django',
    'dockerfile': 'Dockerfile',
    'docker': 'Dockerfile',
    'dts': 'DTS (Device Tree)',
    'dust': 'Dust',
    'dst': 'Dust',
    'elixir': 'Elixir',
    'elm': 'Elm',
    'erlang': 'Erlang',
    'erl': 'Erlang',
    'fsharp': 'F#',
    'fs': 'F#',
    'fix': 'FIX',
    'fortran': 'Fortran',
    'f90': 'Fortran',
    'f95': 'Fortran',
    'gcode': 'G-Code',
    'nc': 'G-Code',
    'gams': 'Gams',
    'gms': 'Gams',
    'gauss': 'GAUSS',
    'gss': 'GAUSS',
    'gherkin': 'Gherkin',
    'go': 'Go',
    'golang': 'Go',
    'golo': 'Golo',
    'gololang': 'Golo',
    'gradle': 'Gradle',
    'groovy': 'Groovy',
    'html': 'HTML',
    'xhtml': 'HTML',
    'xml': 'XML',
    'rss': 'XML',
    'atom': 'XML',
    'xsl': 'XML',
    'plist': 'XML',
    'http': 'HTTP',
    'https': 'HTTP',
    'haml': 'Haml',
    'handlebars': 'Handlebars',
    'hbs': 'Handlebars',
    'html.hbs': 'Handlebars',
    'html.handlebars': 'Handlebars',
    'haskell': 'Haskell',
    'hs': 'Haskell',
    'haxe': 'Haxe',
    'hx': 'Haxe',
    'ini': 'Ini',
    'inform7': 'Inform7',
    'i7': 'Inform7',
    'irpf90': 'IRPF90',
    'json': 'JSON',
    'java': 'Java',
    'jsp': 'Java',
    'javascript': 'JavaScript',
    'js': 'JavaScript',
    'jsx': 'JavaScript',
    'lasso': 'Lasso',
    'lassoscript': 'Lasso',
    'less': 'Less',
    'lisp': 'Lisp',
    'livecodeserver': 'LiveCode Server',
    'livescript': 'LiveScript',
    'ls': 'LiveScript',
    'lua': 'Lua',
    'makefile': 'Makefile',
    'mk': 'Makefile',
    'mak': 'Makefile',
    'markdown': 'Markdown',
    'md': 'Markdown',
    'mkdown': 'Markdown',
    'mkd': 'Markdown',
    'mathematica': 'Mathematica',
    'mma': 'Mathematica',
    'matlab': 'Matlab',
    'maxima': 'Maxima',
    'mel': 'Maya Embedded Language',
    'mercury': 'Mercury',
    'mizar': 'Mizar',
    'mojolicious': 'Mojolicious',
    'monkey': 'Monkey',
    'nsis': 'NSIS',
    'nginx': 'Nginx',
    'nginxconf': 'Nginx',
    'nimrod': 'Nimrod',
    'nim': 'Nimrod',
    'nix': 'Nix',
    'ocaml': 'OCaml',
    'ml': 'OCaml',
    'objectivec': 'Objective C',
    'mm': 'Objective C',
    'objc': 'Objective C',
    'obj-c': 'Objective C',
    'glsl': 'OpenGL Shading Language',
    'openscad': 'OpenSCAD',
    'scad': 'OpenSCAD',
    'ruleslanguage': 'Oracle Rules Language',
    'oxygene': 'Oxygene',
    'pf': 'PF',
    'pf.conf': 'PF',
    'php': 'PHP',
    'php3': 'PHP',
    'php4': 'PHP',
    'php5': 'PHP',
    'php6': 'PHP',
    'parser3': 'Parser3',
    'perl': 'Perl',
    'pl': 'Perl',
    'powershell': 'PowerShell',
    'ps': 'PowerShell',
    'processing': 'Processing',
    'prolog': 'Prolog',
    'protobuf': 'Protocol Buffers',
    'puppet': 'Puppet',
    'pp': 'Puppet',
    'python': 'Python',
    'py': 'Python',
    'gyp': 'Python',
    'profile': 'Python profiler results',
    'k': 'Q',
    'kdb': 'Q',
    'qml': 'QML',
    'r': 'R',
    'rib': 'RenderMan RIB',
    'rsl': 'RenderMan RSL',
    'graph': 'Roboconf',
    'instances': 'Roboconf',
    'ruby': 'Ruby',
    'rb': 'Ruby',
    'gemspec': 'Ruby',
    'podspec': 'Ruby',
    'thor': 'Ruby',
    'irb': 'Ruby',
    'rust': 'Rust',
    'rs': 'Rust',
    'scss': 'SCSS',
    'sql': 'SQL',
    'p21': 'STEP Part 21',
    'step': 'STEP Part 21',
    'stp': 'STEP Part 21',
    'scala': 'Scala',
    'scheme': 'Scheme',
    'scilab': 'Scilab',
    'sci': 'Scilab',
    'smali': 'Smali',
    'smalltalk': 'Smalltalk',
    'st': 'Smalltalk',
    'stan': 'Stan',
    'stata': 'Stata',
    'stylus': 'Stylus',
    'styl': 'Stylus',
    'swift': 'Swift',
    'tcl': 'Tcl',
    'tk': 'Tcl',
    'tex': 'TeX',
    'thrift': 'Thrift',
    'tp': 'TP',
    'twig': 'Twig',
    'craftcms': 'Twig',
    'typescript': 'TypeScript',
    'ts': 'TypeScript',
    'vbnet': 'VB.Net',
    'vb': 'VB.Net',
    'vbscript': 'VBScript',
    'vbs': 'VBScript',
    'vhdl': 'VHDL',
    'vala': 'Vala',
    'verilog': 'Verilog',
    'v': 'Verilog',
    'vim': 'Vim Script',
    'x86asm': 'x86 Assembly',
    'xl': 'XL',
    'tao': 'XL',
    'xpath': 'XQuery',
    'xq': 'XQuery',
    'zephir': 'Zephir',
    'zep': 'Zephir',
}

function makeErrorMark(title, content) {
    return "<mark style=\"background-color: red;\" title=\"" + title + "\">" + content + "</mark>";
}

function formatMathContent(mathContent, displayMode, sourceLineString, options) {
    var result = '';
    if (typeof katex === "undefined") {
        result = makeErrorMark("No Katex", mathContent);
    }
    try {
        result = katex.renderToString(mathContent, {displayMode: displayMode});
    }
    catch(err) {
        result = makeErrorMark("Math Convert Error", mathContent);
    }
    return '<span class="katex-math"' + sourceLineString + '>' + result + '</span>';
}

function highLightJs(code, langInfo, isInline, sourceLineString, options) {
    var highlighted = code;
    var langClass = '';
    var langDisplay = langNamesForDisplay[langInfo.toLowerCase()];
    var langNameDisplay = '';
        
    if (langInfo && hljs.getLanguage(langInfo)) {
        langClass = ' ' + options.langPrefix + langInfo;
        try {
            highlighted = hljs.highlight(langInfo, code, true).value;
        } catch (__) {}
    }

    if (isInline) {
        if (langDisplay && options.useShowLangName) {
            langNameDisplay = ' title="' + langDisplay + '"';
        }
        return '<code class="hljs inline' + langClass + '"' + langNameDisplay + '>'
            + highlighted
            + '</code>';
    }
    else {
        if (langDisplay && options.useShowLangName) {
            langNameDisplay = '<span class="show-language">' + langDisplay + '</span>';
        }
        var lineNumbersWrapper = '';
        var lineNumbersClass = ''; 
        if (options.useLineNumber) {
            var match = code.match(/\n(?!$)/g);
            var linesNum = match ? match.length + 1 : 1;
            var lines = new Array(linesNum + 1);
            lineNumbersWrapper = '<span class="line-numbers-rows">' + lines.join('<span></span>') + '</span>';
            lineNumbersClass = ' line-numbers';
        }

        return '<pre' + sourceLineString + ' class="hljs' + lineNumbersClass + '"><code class="' + langClass + '">'
            + highlighted + lineNumbersWrapper + '</code>' + langNameDisplay + '</pre>\n';
    }
}

module.exports = function(settingOptions) {
    var markdownYt = markdownit();
    var options = markdownYt.utils.assign({}, defaults, settingOptions);
    markdownYt = markdownYt.set(options);

    if (options.useAbbr) {
        markdownYt = markdownYt.use(markdownitAbbr);
    }
    if (options.useContainer) {
        markdownYt = markdownYt.use(markdownitContainer, 'success');
        markdownYt = markdownYt.use(markdownitContainer, 'info');
        markdownYt = markdownYt.use(markdownitContainer, 'warning');
        markdownYt = markdownYt.use(markdownitContainer, 'danger');
    }
    if (options.useDeflist) {
        markdownYt = markdownYt.use(markdownitDeflist);
    }
    if (options.useEmoji) {
        markdownYt = markdownYt.use(markdownitEmoji);
    }
    if (options.useFootnote) {
        markdownYt = markdownYt.use(markdownitFootnote);
    }
    if (options.useIns) {
        markdownYt = markdownYt.use(markdownitIns);
    }
    if (options.useMark) {
        markdownYt = markdownYt.use(markdownitMark);
    }
    if (options.useSub) {
        markdownYt = markdownYt.use(markdownitSub);
    }
    if (options.useSup) {
        markdownYt = markdownYt.use(markdownitSup);
    }
    if (options.useToc) {
        markdownYt = markdownYt.use(markdownitToc);
    }
    if (options.useMath) {
        markdownYt = markdownYt.use(markdownitSimpleMath, {inlineRenderer: function(math, displayMode) {
            return formatMathContent(math, displayMode, '');
        }});
    }
    if (options.useLinkNewWin) {
        markdownYt = markdownYt.use(markdownitForInline, "url_new_win", "link_open", function (tokens, idx) {
            tokens[idx].attrPush([ "target", "_blank" ]);
        });
    }

    markdownYt.tags = {};
    markdownYt.renderer.renderToken = function(tokens, idx, options) {
        var token = tokens[idx];
        var tag = token.type;
        var mainTag = '';
        if(tag.match(/_open/im)) {
            mainTag = tag.substr(0, tag.length - 5);
            markdownYt.tags[mainTag] = (markdownYt.tags[mainTag] || 0) + 1;

            // source map
            if(options.useSourceLine && token.level == 0 && token.map != null) {
                token.attrPush(['data-source-line', token.map[0] + 1]);
            }
        } else if (tag.match(/_close/im)) {
            mainTag = tag.substr(0, tag.length - 6);
            markdownYt.tags[mainTag] = (markdownYt.tags[mainTag] || 0) - 1;
        }

        return markdownYt.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options);
    };

    markdownYt.renderer.rules.code_inline = function(tokens, idx, options) {
        var content = tokens[idx].content;
        var langName = '';

        var matchCode = /^(\w+)#/.exec(content);
        if (matchCode) {
            langName = matchCode[1];
            content = content.substring(matchCode[0].length);
        }

        if (options.highlight !== true && options.highlight) {
            return options.highlight(content, langName, true, '', markdownYt.options);
        }
        else if (options.highlight === true && typeof hljs !== "undefined") {
            return highLightJs(content, langName, true, '', markdownYt.options);
        }
        else if (langName.length > 0) {
            return '<code class="' + markdownYt.options.langPrefix + langName + '">'
                + markdownYt.utils.escapeHtml(content)
                + '</code>';
        }
        else {
            return '<code>' + markdownYt.utils.escapeHtml(content) + '</code>';
        }
    };

    markdownYt.renderer.rules.fence = function (tokens, idx, options) {
        var token = tokens[idx];
        var code = token.content.trim();
        var langName = token.info.trim();
        var sourceLineString = options.useSourceLine ? ' data-source-line="' + (token.map[0] + 1) + '"': '';

        if(options.useMath && /math/im.test(langName)) {
            return formatMathContent(code, true, sourceLineString);
        }

        if (options.highlight !== true && options.highlight) {
            return options.highlight(code, langName, false, sourceLineString, markdownYt.options);
        }
        else if (options.highlight === true && typeof hljs !== "undefined") {
            return highLightJs(code, langName, false, sourceLineString, markdownYt.options);
        }
        else if (langName) {
            return  '<pre' + sourceLineString + '><code class="' + markdownYt.options.langPrefix + langName + '">'
                + markdownYt.utils.escapeHtml(code)
                + '</code></pre>\n';
        }
        else {
            return  '<pre' + sourceLineString + '><code>'
                + markdownYt.utils.escapeHtml(code)
                + '</code></pre>\n';
        }
    };

    markdownYt.renderer.rules.code_block = function (tokens, idx, options) {
        var token = tokens[idx];
        var code = token.content.trim();
        var sourceLineString = options.useSourceLine ? ' data-source-line="' + (token.map[0] + 1) + '"': '';

        if (options.useCodeBlockPre) {
            return  '<pre' + sourceLineString + '>' + markdownYt.utils.escapeHtml(code) + '</pre>\n';
        }
        else if (options.highlight !== true && options.highlight) {
            return options.highlight(code, '', false, sourceLineString, markdownYt.options);
        }
        else if (options.highlight === true && typeof hljs !== "undefined") {
            return highLightJs(code, '', false, sourceLineString, markdownYt.options);
        }
        else {
            return  '<pre' + sourceLineString + '><code>'
                + markdownYt.utils.escapeHtml(code)
                + '</code></pre>\n';
        }
    };

    return markdownYt;
};

},{}]},{},[1])(1)
});
