require.config({
    baseUrl: "../js",
    paths: {
        "jquery": "jquery-1.11.2.min",
        //"bootstrap": "bootstrap.min",
        //"metisMenu": "metisMenu/metisMenu.min",
       // "sbamin": "sb-admin-2",
        "Table": "util/table",
        "Modal": "util/modal",
        "Tmpl": "util/tmpl"
    }
    //  shim : {
    //     "metisMenu" : {"deps": ["jquery"]},
    //     "sbadmin" : { "deps" :["jquery","metisMenu"] },
    //     "bootstrap" : {"deps" : ["jquery"]}
    // }
});

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
    var infotable = new Table.Table();
    infotable.createTable("#dataTables", "tpr", url, columns, 7);
    infotable.addSearch(".dsearch", infotable); 

    

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