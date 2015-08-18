require(["jquery", "Table", "Modal","Tmpl"], function ($, Table, Modal) {
    var urlcontent = "http://121.40.103.141:8091/ylbms/users";
    var urltitle = "http://192.168.1.10:8080/ylbms/pagesconfig/users.json";
    var oprationhtml = "<button type='button' class='btn btn-primary btn-sm optionbutton' id='edit'>编辑</button><button type='button' class='btn btn-danger btn-sm optionbutton' id='detele'>删除</button><button type='button' class='btn btn-default btn-sm optionbutton' id='send'>发布</button>";
    var table = new Table.Table();
    var ordertable = table.createTable("#dataTables", "tlpr", urlcontent, urltitle, oprationhtml);
    table.addSearch(".dsearch", ordertable); 

});