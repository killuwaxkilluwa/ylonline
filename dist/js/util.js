var Table = {};
var Modal = {};
var map = {"userid" : "用户ID","username" : "用户名", "sex" : "性别", "tel" : "电话", "mail" : "邮箱", "level" : "等级", "score" : "积分" }

//
// Pipelining function for DataTables. To be used to the `ajax` option of DataTables
//
$.fn.dataTable.pipeline = function ( opts ) {
    // Configuration options
    var conf = $.extend( {
        pages: 5,     // number of pages to cache
        url: '',      // script url
        data: null,   // function or object with parameters to send to the server
                      // matching how `ajax.data` works in DataTables
        method: 'GET' // Ajax HTTP method
    }, opts );
 
    // Private variables for storing the cache
    var cacheLower = -1;
    var cacheUpper = null;
    var cacheLastRequest = null;
    var cacheLastJson = null;
 
    return function ( request, drawCallback, settings ) {
        var ajax          = false;
        var requestStart  = request.start;
        var drawStart     = request.start;
        var requestLength = request.length;
        var requestEnd    = requestStart + requestLength;

        if ( settings.clearCache ) {
            // API requested that the cache be cleared
            ajax = true;
            settings.clearCache = false;
        }
        else if ( cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper ) {
            // outside cached data - need to make a request
            ajax = true;
        }
        else if ( JSON.stringify( request.order )   !== JSON.stringify( cacheLastRequest.order ) ||
                  JSON.stringify( request.columns ) !== JSON.stringify( cacheLastRequest.columns ) ||
                  JSON.stringify( request.search )  !== JSON.stringify( cacheLastRequest.search )
        ) {
            // properties changed (ordering, columns, searching)
            ajax = true;
        }
       
        // Store the request for checking next time around
        cacheLastRequest = $.extend( true, {}, request );
 
        if ( ajax ) {
            // Need data from the server
            if ( requestStart < cacheLower ) {
                requestStart = requestStart - (requestLength*(conf.pages-1));
 
                if ( requestStart < 0 ) {
                    requestStart = 0;
                }
            }
             
            cacheLower = requestStart;
            cacheUpper = requestStart + (requestLength * conf.pages);
 
            request.start = requestStart;
            request.length = requestLength*conf.pages;
 
            // Provide the same `data` options as DataTables.
            if ( $.isFunction ( conf.data ) ) {
                // As a function it is executed with the data object as an arg
                // for manipulation. If an object is returned, it is used as the
                // data object to submit
                var d = conf.data( request );
                if ( d ) {
                    $.extend( request, d );
                }
            }
            else if ( $.isPlainObject( conf.data ) ) {
                // As an object, the data given extends the default
                $.extend( request, conf.data );
            }
 
            settings.jqXHR = $.ajax( {
                "type":     conf.method,
                "url":      conf.url,
                "data":     request,
                "dataType": "json",
                "cache":    false,
                "success":  function ( json ) {
                    cacheLastJson = $.extend(true, {}, json);
 
                    if ( cacheLower != drawStart ) {
                        json.data.splice( 0, drawStart-cacheLower );
                    }
                    json.data.splice( requestLength, json.data.length );
                     
                    drawCallback( json );
                }
            } );
        }
        else {
            json = $.extend( true, {}, cacheLastJson );
            json.draw = request.draw; // Update the echo for each response
            json.data.splice( 0, requestStart-cacheLower );
            json.data.splice( requestLength, json.data.length );
 
            drawCallback(json);
        }
    }
};
 
// Register an API method that will empty the pipelined data, forcing an Ajax
// fetch on the next draw (i.e. `table.clearPipeline().draw()`)
$.fn.dataTable.Api.register( 'clearPipeline()', function () {
    return this.iterator( 'table', function ( settings ) {
        settings.clearCache = true;
    } );
} );
 



/*  
dom : table id or class
positon: 
dataurl: ajax data url
columns: columns init data
columndefs: option columns num (from 0 start)
*/
Table.creatTable = function (dom, position, dataurl, columns, columndefs){
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


    var table = $(dom).DataTable({
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

    return table;
},

Table.addSearch = function(dom, table){
    $(dom).on('keyup click', function () {
            var tsval = $(dom).val()
            table.search(tsval, false, false).draw();
        });

},


Modal.clearUerInfo = function(){
    // $("#userid").val("");
    // $("#username").val("");
    // $("#sex").val("");
    // $("#tel").val("");
    // $("#mail").val("");
    // $("#level").val("");
    // $("#score").val("");
    $("#userInfoModal .form-group input").val("");
},

Modal.setEditData = function(userinfo){
    $("#userid").val(userinfo.userid).attr("disabled", "disabled");
    $("#username").val(userinfo.username);
    $("#sex").val(userinfo.sex);
    $("#tel").val(userinfo.tel);
    $("#mail").val(userinfo.mail);
    $("#level").val(userinfo.level);
    $("#score").val(userinfo.score);
},

// Modal.save = function(userid, ){
//     $.ajax({
//         type: "post",
//         url: "/storeusers/{userid}",
//         data: {'currentpage': 1 ,'pagesize': 5} ,
//         success: function(data){
//             alert(data.result);
//             //$('#page').html(data.result)
//         } 
//         //dataType: text
//     });
// },

Modal.createMakeSureModal = function(title, content){
    $("#makeSureModal .modal-title").html(title);
    $("#makeSureModal .modal-body").html(content);
}
