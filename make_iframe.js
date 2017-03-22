var make_state_frame = function (state) {
var iframe = document.createElement('iframe');
        iframe.src = "state_inds.html";
        iframe.width = 1500;
        iframe.height = 1000;
        document.body.appendChild(iframe);
    
        document.getElementById('my_p').innerHTML = "Displaying Data For "+state+"."

        document.getElementById('tooltip').style.visibility = "hidden";
        document.getElementById('header').style.visibility = "hidden";
        make_inds_plots(state)
};
