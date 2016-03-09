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

var markdownYt = window.markdownit(defaults);
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

markdownYt = markdownYt.use(markdownitSimpleMath, {inlineRenderer: function(math, displayMode) {
   return katex.renderToString(math, {displayMode: displayMode});
}});




