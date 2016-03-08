var defaults = {
    html:         true,        // Enable HTML tags in source
    xhtmlOut:     true,        // Use '/' to close single tags (<br />)
    breaks:       true,        // Convert '\n' in paragraphs into <br>
    langPrefix:   'language-',  // CSS language prefix for fenced blocks
    linkify:      true,         // autoconvert URL-like texts to links
    typographer:  true,         // Enable smartypants and other sweet transforms

    // options below are for demo only
    //_highlight: true,
    //_strict: false,
    //_view: 'html'               // html / src / debug
};

var markdownYt = window.markdownit(defaults);