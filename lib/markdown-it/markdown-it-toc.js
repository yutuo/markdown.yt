/*! markdown-it-toc 1.0.0 https://github.com/samchrisinger/markdown-it-toc @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitToc = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}
)({1:[function(require,module,exports){
// Process @[toc](|Title)

'use strict';

module.exports = function(md) {

    var TOC_REGEXP = /^\[toc\]$/im;
    var gstate;
    var matchedToc = false;

    function toc(state, silent) {
        matchedToc = false;

        while (state.src.indexOf('\n') >= 0 && state.src.indexOf('\n') < state.src.indexOf('[toc]')) {
            if (state.tokens.slice(-1)[0].type === 'softbreak') {
                state.src = state.src.split('\n').slice(1).join('\n');
                state.pos = 0;
            }
        }
        var token;

        // trivial rejections
        if (state.src.charCodeAt(state.pos) !== 0x5B /* [ */ ) {
            return false;
        }

        var match = TOC_REGEXP.exec(state.src);
        if (!match) {
            return false;
        }
        match = match.filter(function(m) {
            return m;
        });
        if (match.length < 1) {
            return false;
        }
        if (silent) { // don't run any pairs in validation mode
            return false;
        }

        token = state.push('toc_open', 'toc', 1);
        token.markup = '[toc]';

        token = state.push('toc_body', '', 0);
        token.content = '';

        token = state.push('toc_close', 'toc', -1);

        var offset = 0;
        var newline = state.src.indexOf('\n');
        if (newline !== -1) {
            offset = state.pos + newline;
        } else {
            offset = state.pos + state.posMax + 1;
        }
        state.pos = offset;

        matchedToc = true;
        return true;
    }

    md.renderer.rules.heading_open = function(tokens, index, options, env, self) {
        var level = tokens[index].tag;
        var label = tokens[index + 1];
        var resultHtml = self.renderToken(tokens, index, options, env);
        if (matchedToc && label.type === 'inline') {
            var anchor = label.map[0];
            resultHtml += '<a id="mdToc' + anchor + '"></a>';
        }
        return resultHtml;
    };

    md.renderer.rules.toc_open = function(tokens, index) {
        return '';
    };

    md.renderer.rules.toc_close = function(tokens, index) {
        return '';
    };

    md.renderer.rules.toc_body = function(tokens, index) {
        // Wanted to avoid linear search through tokens here, 
        // but this seems the only reliable way to identify headings
        var headings = [];
        var gtokens = gstate.tokens;
        var size = gtokens.length;
        var minLevel = 999999;
        for (var i = 0; i < size; i++) {
            if (gtokens[i].type !== 'heading_close') {
                continue;
            }
            var token = gtokens[i];
            var heading = gtokens[i - 1];
            var level = +token.tag.substr(1, 1);
            minLevel = level < minLevel ? level : minLevel;
            if (heading.type === 'inline') {
                headings.push({
                    level: level,
                    anchor: heading.map[0],
                    content: heading.content
                });
            }
        }

        var indent = minLevel - 1;
        var list = headings.map(function(heading) {
            var res = [];
            if (heading.level > indent) {
                var ldiff = (heading.level - indent);
                for (var i = 0; i < ldiff; i++) {
                    res.push('<ul class="table-of-contents">');
                    indent++;
                }
            } else if (heading.level < indent) {
                var ldiff = (indent - heading.level);
                for (var i = 0; i < ldiff; i++) {
                    res.push('</ul>');
                    indent--;
                }
            }
            res = res.concat(['<li><a href="#mdToc', heading.anchor, '">', heading.content, '</a></li>']);
            return res.join('');
        });

        return list.join('') + new Array(indent + 1).join('</ul>');
    };

    md.core.ruler.push('grab_state', function(state) {
        gstate = state;
    });
    md.inline.ruler.after('emphasis', 'toc', toc);
};

},{}]},{},[1])(1)
});


