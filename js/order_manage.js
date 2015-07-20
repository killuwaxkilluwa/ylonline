require.config({
    baseUrl: "../js",
    paths: {
        "jquery": "jquery-1.11.2.min",
        //"bootstrap": "bootstrap.min",
        //"metisMenu": "metisMenu/metisMenu.min",
        //"sbamin": "sb-admin-2",
        "Table": "util/table",
        "Modal": "util/modal"
    }
    //  shim : {
    //     "metisMenu" : {"deps": ["jquery"]},
    //     "sbadmin" : { "deps" :["jquery","metisMenu"] },
    //     "bootstrap" : {"deps" : ["jquery"]}
    // }
});

require(["jquery", "Table", "Modal"], function ($, Table, Modal) {
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
    var usertable = new Table.Table();
    usertable.createTable("#dataTables-example", "tpr", url, columns, 7);
    usertable.addSearch(".dsearch", usertable); 



});