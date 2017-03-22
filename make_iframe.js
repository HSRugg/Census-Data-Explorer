var make_state_frame = function (state) {
var iframe = document.createElement('iframe');
        iframe.id = "inds_plot_iframe"
        iframe.src = "state_inds.html";
        iframe.width = 1500;
        iframe.height = 1000;
        document.body.appendChild(iframe);
    
        document.getElementById('my_p').innerHTML = "Displaying Data For "+state+"."

        document.getElementById('tooltip').style.visibility = "hidden";
        document.getElementById('header').style.visibility = "hidden";
    
    var inds_plot_iframe = document.getElementById("inds_plot_iframe");
    var d3_script = myIframe.contentWindow.document.createElement("script");
    d3_script.type = "text/javascript";
    d3_script.src = "https://d3js.org/d3.v3.min.js";
    inds_plot_iframe.contentWindow.document.body.appendChild(d3_script);
//        make_inds_plots(state)
};
