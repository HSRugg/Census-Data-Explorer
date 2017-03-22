var make_state_frame = function (state) {

    document.getElementById('my_p').innerHTML = "Displaying Data For "+state+"."
    document.getElementById('tooltip').style.visibility = "hidden";
    d3.select('#header').remove()

    var iframe = document.createElement('iframe');
        iframe.width = 1500;
        iframe.height = 1000;
        iframe.padding = 50;

    // append the body
    document.body.appendChild(iframe);

    // create a string to use as a new document object
    var val = '<scr' + 'ipt type="text/javascript" src = "https://d3js.org/d3.v3.min.js" >  </scr' + 'ipt>';

    val += '<scr' + 'ipt type="text/javascript" src = "industry_lines.js" >make_inds_lines(' + state + ')</scr' + 'ipt>';
    
    val += '<scr' + 'ipt type="text/javascript" src = "indesty_rank_bars.js" >  </scr' + 'ipt>';
    

    // get a handle on the <iframe>d document (in a cross-browser way)
    var doc = iframe.contentWindow || iframe.contentDocument;
    if (doc.document) {
        doc = doc.document;
    }

// open, write content to, and close the document
doc.open();
doc.write(val);
doc.close();

};