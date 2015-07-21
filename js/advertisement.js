require.config({
    baseUrl: "../js",
    paths: {
        "jquery": "jquery-1.11.2.min",
        "bootstrap": "bootstrap.min",
        "datetimepicker": "bootstrap-datetimepicker.min",
        "moment": "moment/moment.min",
        "zh-cn" : "moment/locale/zh-cn",
        "Table": "util/table",
        "Modal": "util/modal",
        "Tmpl": "util/tmpl"
    },
    shim: {
        "bootstrap": {"deps" : ["jquery"]},
        "datetimepicker": {"deps" : ["jquery","bootstrap","moment","zh-cn"]}
    }
});

require(["jquery", "Table", "Modal", "Tmpl", "moment","datetimepicker"], function ($, Table, Modal, Tmpl) {
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

    $("#side-menu a").click(function(){
        switch($(this).attr("id")){
            case "fpslideadv-nav":
                $(".addinfobtn").text("插入首页轮播广告").attr("id", "fpslideadv-addbtn");
                break;
            case "startadv-nav":
                $(".addinfobtn").text("插入启动画面").attr("id", "startadv-btn");
                break;
            case "fpcontentadv-nav":
                $(".addinfobtn").text("插入首页内容区广告").attr("id", "fpcontentadv-btn");
                break;

        }
    });


    $(".addinfobtn").click(function(){
        if($(this).attr("id") == "fpslideadv-addbtn"){
            $('#datetimepicker1').datetimepicker({
                locale: 'zh-cn'
            });
            $("#fpslideadv-modal").modal("show");
        }else if($(this).attr("id") == "startadv-btn"){
           
        }else if($(this).attr("id") == "fpcontentadv-btn"){
           
        }
        
    });

    
    // $("#insertfirpage").click(function(){
    //     $('#datetimepicker1').datetimepicker({
    //         locale: 'zh-cn'
    //     });
    //     $("#firpage").modal("show");
    // });
    
});