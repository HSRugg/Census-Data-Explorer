var path_to_folder = "/Census-Data-Explorer/data_for_US/"
industry = "Construction"
var make_inds_map_with_counties = function() {
    var year = "2012";
    var path_to_data = path_to_folder+industry+"_county_emp.csv";
        d3.csv(path_to_data, function(data) {



    
    
    
    console.log("hi");
    console.log(data[0]);

});
}


make_inds_map_with_counties()