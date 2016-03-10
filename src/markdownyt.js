/*! markdown-it-toc 1.0.0 https://github.com/samchrisinger/markdown-it-toc @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownyt = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Process @[toc](|Title)

'use strict';

var defaults = {
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />)
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    linkify:      true,         // autoconvert URL-like texts to links
    typographer:  true,         // Enable smartypants and other sweet transforms

    // options below are for demo only
    //_highlight: true,
    //_strict: false,
    //_view: 'html'               // html / src / debug
};


function makeErrorMark(title, content) {
    return "<mark style=\"background-color: red;\" title=\"" + title + "\">" + content + "</mark>";
}

function formatMathContent(mathContent, displayMode, map) {
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
    return '<span class="math"' + map + '>' + result + '</span>';
}

module.exports = function(settingOptions) {    
    var markdownYt = markdownit();
    markdownYt = markdownYt.set(markdownYt.utils.assign({}, settingOptions, defaults));
    
    markdownYt = markdownYt.use(markdownitAbbr);
    markdownYt = markdownYt.use(markdownitContainer, 'success');
    markdownYt = markdownYt.use(markdownitContainer, 'info');
    markdownYt = markdownYt.use(markdownitContainer, 'warning');
    markdownYt = markdownYt.use(markdownitContainer, 'danger');
    markdownYt = markdownYt.use(markdownitDeflist);
    markdownYt = markdownYt.use(markdownitEmoji);

    markdownYt = markdownYt.use(markdownitFootnote);
    markdownYt = markdownYt.use(markdownitIns);
    markdownYt = markdownYt.use(markdownitMark);
    markdownYt = markdownYt.use(markdownitSub);
    markdownYt = markdownYt.use(markdownitSup);
    markdownYt = markdownYt.use(markdownitToc);

    markdownYt = markdownYt.use(markdownitSimpleMath, {inlineRenderer: function(math, displayMode) {
       return formatMathContent(math, displayMode, '');
    }});

    var markdownYt = markdownYt.use(markdownitForInline, "url_new_win", "link_open", function (tokens, idx) {
        tokens[idx].attrPush([ "target", "_blank" ]);
    });
    
    //var markdownYt = markdownYt.use(markdownitForInline, "code_new_style", "code_inline", function (tokens, idx) {
    //    tokens[idx].attrPush([ "style", "background-color: red;" ]);
    //});
    
    markdownYt.map = false;
    markdownYt.tags = {};

    markdownYt.renderer.renderToken = function(tokens, idx, options) {
        var token = tokens[idx];
        var tag = token.type;
        if(tag.endsWith('_open')) {
            var _tag = tag.substr(0, tag.length - 5);
            markdownYt.tags[_tag] = (markdownYt.tags[_tag] || 0) + 1;

            // source map
            if(markdownYt.map && token.level == 0 && token.map != null) {
                token.attrPush(['data-source-line', token.map[0] + 1]);
            }
        } else if (tag.endsWith('_close')) {
            var _tag = tag.substr(0, tag.length - 6);
            markdownYt.tags[_tag] = (markdownYt.tags[_tag] || 0) - 1;
        }

        // task list
        //if((markdownYt.tags['bullet_list'] || 0) > 0 && tag == 'list_item_open'
        // && (tokens[idx+2].content.startsWith('[ ] ') || tokens[idx+2].content.startsWith('[x] '))) {
        //    token.attrPush(['class', 'task-list-item']);
        //}

        return markdownYt.renderer.constructor.prototype.renderToken.call(this, tokens, idx, options);
    }
    
    markdownYt.renderer.rules.code_inline = function(tokens, idx) {
        var content = tokens[idx].content;        
        var matchCode = /^(\w+)#/.exec(content);
        if (matchCode) {
            return '<code class="' + markdownYt.options.langPrefix + matchCode[1] + '">' 
                   + markdownYt.utils.escapeHtml(content.substring(matchCode[0].length))
                   + '</code>';
        }        
        return '<code>' + markdownYt.utils.escapeHtml(content) + '</code>';
    }
    
    markdownYt.renderer.rules.fence = function (tokens, idx, options, env, slf) {
        var token = tokens[idx];
        var code = token.content.trim();
        var map = markdownYt.map ? ' data-source-line="' + (token.map[0] + 1) + '"': '';

        if(/math/im.test(token.info)) {
            return formatMathContent(code, true, map);
        }
        
        //if(token.info.length > 0) { // programming language
        //return `<pre${ map }><code class="hljs">${ hljs.highlightAuto(code, [token.info]).value }</code></pre>`;
        //}
        //var firstLine = code.split(/\n/)[0].trim();
        //if(firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) {
        //return markdownYt.mermaid_charts(code, map); // mermaid
        //}
        // unknown programming language
        //return `<pre${ map }><code class="hljs">${ hljs.highlightAuto(code).value }</code></pre>`;
    }

    return markdownYt;
};

},{}]},{},[1])(1)
});













