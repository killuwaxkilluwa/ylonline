require(["jquery", "Table", "Modal", "Tmpl"], function ($, Table, Modal, Tmpl) {
	var urlcontent = "http://121.40.103.141:8091/ylbms/users";
    var urltitle = "http://192.168.1.10:8080/ylbms/pagesconfig/users.json";
    var oprationhtml = "<button type='button' class='btn btn-primary btn-sm optionbutton' id='edit'>编辑</button><button type='button' class='btn btn-danger btn-sm optionbutton' id='detele'>删除</button><button type='button' class='btn btn-default btn-sm optionbutton' id='blacklist'>拉黑</button>";
    var table = new Table.Table();
    var usertable = table.createTable("#dataTables", "tlpr", urlcontent, urltitle, oprationhtml);
    table.addSearch(".dsearch", usertable); 

    $("#adduser").click(function(){
    	$("#userInfoModal").html(Tmpl.getInsertUserTmplate()).modal("show");
    	new Modal.Modal().clearData("#userInfoModal");
        console.log($("#edit").parents("tr").data().userid);
    });
    
    $('#dataTables tbody').on( 'click', '#edit', function () {
        console.log($(this).parents('tr'));
        var data = usertable.row( $(this).parents('tr') ).data();
        $("#userInfoModal").html(Tmpl.getInsertUserTmplate()).modal("show");
        new Modal.Modal().initData(data);
    });

    $('#dataTables tbody').on( 'click', '#detele', function () {
        new Modal.Modal().MakeSureModal("#makeSureModal","savedetele", "删除用户", "确定删除用户吗？", "show");
    });

    $('#dataTables tbody').on( 'click', '#blacklist', function () {
        new Modal.Modal().MakeSureModal("#makeSureModal", "saveblacklist","拉黑用户", "确定拉黑用户吗？", "show");
    });

    $('#saveuserinfo').click(function(){
        $("#makeSureModal").modal("hide");
    });


});