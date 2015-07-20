 $(document).ready(function() {
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
    var usertable = Table.creatTable("#dataTables-example", "tpr", url, columns, 7);
    Table.addSearch(".dsearch", usertable);  
    $("#adduser").click(Modal.clearUerInfo);

    $('#dataTables-example tbody').on( 'click', '#edit', function () {
        var data = usertable.row( $(this).parents('tr') ).data();
        Modal.setEditData(data);
        $("#userInfoModal").modal("show");

    });

    $('#dataTables-example tbody').on( 'click', '#detele', function () {
        //var data = usertable.row( $(this).parents('tr') ).data();
        Modal.createMakeSureModal("删除用户", "确定删除用户吗？");
        $("#makeSureModal").modal("show");
        
    });

    $('#dataTables-example tbody').on( 'click', '#blacklist', function () {
        //var data = usertable.row( $(this).parents('tr') ).data();
        Modal.createMakeSureModal("拉黑用户", "确定拉黑用户吗？");
        $("#makeSureModal").modal("show");
        
    });

    $('#saveuserinfo').click(function(){
        
        $("#makeSureModal").modal("hide");
    });


    
});


