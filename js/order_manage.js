require(["jquery", "Table", "Modal","Tmpl"], function ($, Table, Modal) {
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