require.config({
    baseUrl: "../js",
    paths: {
        "datetimepicker": "bootstrap-datetimepicker.min",
        "moment": "moment/moment.min",
        "zh-cn" : "moment/locale/zh-cn"
    },
    shim: {
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
                $(".addinfobtn").text("插入首页轮播图片").attr("id", "fpslideadv-addbtn");
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
            new Modal.Modal().createAdvModal("#fpslideadv-modal", "show", Tmpl.getFpslideadvTmplate(), "#fpdate");
        }else if($(this).attr("id") == "startadv-btn"){
            new Modal.Modal().createAdvModal("#startadv-modal", "show", Tmpl.getStartadvTmplate(), "#stdate");
        }else if($(this).attr("id") == "fpcontentadv-btn"){
            new Modal.Modal().createAdvModal("#fpcontentadv-modal", "show", Tmpl.getFpcontentadvTmplate(), "#fpcdate");
        }
        
    });
    
});