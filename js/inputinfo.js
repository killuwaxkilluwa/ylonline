require(["jquery", "Table", "Modal", "Tmpl"], function ($, Table, Modal, Tmpl) {
    // var url = "../pages/userdata.txt";
    // var columns = [
    //     { "data": "userid" },
    //     { "data": "username" },
    //     { "data": "sex" },
    //     { "data": "tel" },
    //     { "data": "mail" },
    //     { "data": "level" },
    //     { "data": "score" },
    //     { "data": null }
    // ];
    // var table = new Table.Table();
    // var infotable =  table.createTable("#dataTables", "tpr", url, columns, 7);
    // table.addSearch(".dsearch", infotable); 
    var urlcontent = "http://121.40.103.141:8091/ylbms/users";
    var urltitle = "http://192.168.1.10:8080/ylbms/pagesconfig/users.json";
    var oprationhtml = "<button type='button' class='btn btn-primary btn-sm optionbutton' id='edit'>编辑</button><button type='button' class='btn btn-danger btn-sm optionbutton' id='detele'>删除</button><button type='button' class='btn btn-default btn-sm optionbutton' id='send'>发布</button>";
    var table = new Table.Table();
    var inputtable = table.createTable("#dataTables", "tlpr", urlcontent, urltitle, oprationhtml);
    table.addSearch(".dsearch", inputtable); 
    
    $("#side-menu a").click(function(){
        switch($(this).attr("id")){
            case "addroom-input":
                $(".addinfobtn").text("插入客房信息").attr("id", "addRoomInfo");
                break;
            case "addservice-input":
                $(".addinfobtn").text("插入服务信息").attr("id", "addServiceInfo");
                break;
            case "addmenu-input":
                $(".addinfobtn").text("插入菜单信息").attr("id", "addMenuInfo");
                break;

        }
    });


    $(".addinfobtn").click(function(){
        if($(this).attr("id") == "addRoomInfo"){
            new Modal.Modal().createModal("#roomInfoModal", "show", Tmpl.getRoomTmplate());
        }else if($(this).attr("id") == "addServiceInfo"){
            new Modal.Modal().createModal("#serviceInfoModal", "show", Tmpl.getServiceTmplate());
        }else if($(this).attr("id") == "addMenuInfo"){
            new Modal.Modal().createModal("#menuInfoModal", "show", Tmpl.getMenuTmplate());
        }
        
    });

    //添加客房信息
    $(document).on("click", "#addRoomType", function(){
        Tmpl.initRoomtypeTmpl(); 
        $("#RoomTypeModal").modal("show");    
    }); 

   

    
    //in order to fix close the second modal then the first modal cant scroll
    $("#RoomTypeModal").on("hidden.bs.modal" , function() {
        if ( $(".modal:visible").length ) {
            $("body").addClass("modal-open");
        }
    });

    $("#CustomDataModal").on("hidden.bs.modal" , function() {
        if ( $(".modal:visible").length ) {
            $("body").addClass("modal-open");
        }
    } );   

});