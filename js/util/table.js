require.config({
    baseUrl: "../js",
    paths: {
       // "jquery": "jquery-1.11.2.min",
        "datatables" : "datatables/js/jquery.dataTables.min",
        "dataTablesPlugein" : "datatables/js/dataTables.bootstrap.min"
    }
});

define(["jquery", "datatables", "dataTablesPlugein"], function($){
    var map = {"userid" : "用户ID","username" : "用户名", "sex" : "性别", "tel" : "电话", "mail" : "邮箱", "level" : "等级", "score" : "积分" };
    function Table(){}

    Table.prototype = {
        /*  
        dom : table id or class
        positon: 
        dataurl: ajax data url
        columns: columns init data
        columndefs: option columns num (from 0 start)
        */
        createTable : function(dom, position, dataurl, columns, columndefs){
        var tableHead = [];
        tableHead.push("<thead><tr>");
        for (var i = 0; i < columns.length; i++) {
            if(map[columns[i].data]){
                tableHead.push("<th>" + map[columns[i].data] + "</th>")
            }else{
                tableHead.push("<th>操作</th>")
            }
            
        };
        tableHead.push("</tr></thead>");
        $(dom).html(tableHead.join(""));
        var t = $(dom).DataTable({
            "dom": position,
            "language": {
                "lengthMenu": "每页 _MENU_ 条记录",
                "zeroRecords": "没有找到记录",
                "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
                "infoEmpty": "无记录",
                "infoFiltered": "(从 _MAX_ 条记录过滤)",
                "search": "会员查询: ",
                "oPaginate": {
                    "sFirst": "首页",
                    "sPrevious": "上一页",
                    "sNext": "下一页",
                    "sLast": "尾页"
                }
                
            },
            "ajax": dataurl,
            // "ajax": $.fn.dataTable.pipeline({
            //     url: dataurl,
            //     pages: 5 // number of pages to cache
            // }),
            "columns": columns,
            "columnDefs": [
                    {
                        "targets": columndefs,
                        "data" : null,
                        "defaultContent": "<button type='button' class='btn btn-primary btn-sm optionbutton' id='edit'>编辑</button><button type='button' class='btn btn-danger btn-sm optionbutton' id='detele'>删除</button><button type='button' class='btn btn-default btn-sm optionbutton' id='blacklist'>拉黑</button>"
                    }
     
                ]
                            
            });

            return t;
        },

        addSearch : function(dom, table){
            $(dom).on('keyup click', function () {
                var tsval = $(dom).val()
                table.search(tsval, false, false).draw();
            });

        }

    }
    
    return {
        Table : Table
    }
});