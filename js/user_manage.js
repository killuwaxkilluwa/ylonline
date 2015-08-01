require(["jquery", "Table", "Modal", "Tmpl"], function ($, Table, Modal, Tmpl) {
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
    var table = new Table.Table();
    var usertable = table.createTable("#dataTables", "tpr", url, columns, 7);
    table.addSearch(".dsearch", usertable); 

    $("#adduser").click(function(){
    	$("#userInfoModal").html(Tmpl.getInsertUserTmplate()).modal("show");
    	new Modal.Modal().clearData("#userInfoModal");
    });

    $('#dataTables tbody').on( 'click', '#edit', function () {
        var data = usertable.row( $(this).parents('tr') ).data();
        $("#userInfoModal").html(Tmpl.getInsertUserTmplate()).modal("show");
        new Modal.Modal().initData(data);
    });

    $('#dataTables tbody').on( 'click', '#detele', function () {
        new Modal.Modal().MakeSureModal("#makeSureModal", "删除用户", "确定删除用户吗？", "show");
    });

    $('#dataTables tbody').on( 'click', '#blacklist', function () {
        new Modal.Modal().MakeSureModal("#makeSureModal", "拉黑用户", "确定拉黑用户吗？", "show");
    });

    $('#saveuserinfo').click(function(){
        $("#makeSureModal").modal("hide");
    });


});