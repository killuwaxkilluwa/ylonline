require.config({
    baseUrl: "js",
    paths: {
        "jquery": "jquery-1.11.2.min",
        "bootstrap": "bootstrap.min"
        "metisMenu": "metisMenu/metisMenu.min",
        "sbamin": "sb-admin-2",
        
    },
     shim : {
        "sbadmin" : { "deps" :["jquery","metisMenu"] },
        "bootstrap" : {"deps" : ["jquery"]}
    }
});

require(["jquery", "bootstrap", "sbamin", "table"], function ($) {
    var url = "../pages/userdata.txt";
    var columns = [
        { "data": "userid" },
        { "data": "username" },
        { "data": "sex" },
        { "data": "tel" },
        { "data": "mail" },
        { "data": "level" },
        { "data": "score" },
        { "data": null }
    ];
    var usertable = new table();
    console.log(usertable);
    usertable.creatTable("#dataTables-example", "tpr", url, columns, 7);
    usertable.addSearch(".dsearch", usertable); 

});


// $(document).ready(function() {
// 	 var url = "../pages/userdata.txt";
//      var columns = [
//             { "data": "userid" },
//             { "data": "username" },
//             { "data": "sex" },
//             { "data": "tel" },
//             { "data": "mail" },
//             { "data": "level" },
//             { "data": "score" },
//             { "data": null }
//         ];
//     var usertable = Table.creatTable("#dataTables-example", "tpr", url, columns, 7);
//     Table.addSearch(".dsearch", usertable); 


	
// });