require.config({
    baseUrl: "../js",
    paths: {
        // "jquery": "jquery-1.11.2.min",
        "datatables": "datatables/js/jquery.dataTables.min",
        "dataTablesPlugein": "datatables/js/dataTables.bootstrap.min"
    }
});

define(["jquery", "datatables", "dataTablesPlugein"], function($) {

    $.fn.dataTable.pipeline = function(opts) {
        // Configuration options
        var conf = $.extend({
            pages: 5, // number of pages to cache
            url: '', // script url
            data: null, // function or object with parameters to send to the server
            // matching how `ajax.data` works in DataTables
            method: 'GET' // Ajax HTTP method
        }, opts);

        // Private variables for storing the cache
        var cacheLower = -1;
        var cacheUpper = null;
        var cacheLastRequest = null;
        var cacheLastJson = null;

        return function(request, drawCallback, settings) {
            var ajax = false;
            var requestStart = request.start;
            var drawStart = request.start;
            var requestLength = request.length;
            var requestEnd = requestStart + requestLength;

            if (settings.clearCache) {
                // API requested that the cache be cleared
                ajax = true;
                settings.clearCache = false;
            } else if (cacheLower < 0 || requestStart < cacheLower || requestEnd > cacheUpper) {
                // outside cached data - need to make a request
                ajax = true;
            } else if (JSON.stringify(request.order) !== JSON.stringify(cacheLastRequest.order) ||
                JSON.stringify(request.columns) !== JSON.stringify(cacheLastRequest.columns) ||
                JSON.stringify(request.search) !== JSON.stringify(cacheLastRequest.search)
            ) {
                // properties changed (ordering, columns, searching)
                ajax = true;
            }

            // Store the request for checking next time around
            cacheLastRequest = $.extend(true, {}, request);

            if (ajax) {
                // Need data from the server
                if (requestStart < cacheLower) {
                    requestStart = requestStart - (requestLength * (conf.pages - 1));

                    if (requestStart < 0) {
                        requestStart = 0;
                    }
                }

                cacheLower = requestStart;
                cacheUpper = requestStart + (requestLength * conf.pages);

                request.start = requestStart;
                request.length = requestLength * conf.pages;

                // Provide the same `data` options as DataTables.
                if ($.isFunction(conf.data)) {
                    // As a function it is executed with the data object as an arg
                    // for manipulation. If an object is returned, it is used as the
                    // data object to submit
                    var d = conf.data(request);
                    if (d) {
                        $.extend(request, d);
                    }
                } else if ($.isPlainObject(conf.data)) {
                    // As an object, the data given extends the default
                    $.extend(request, conf.data);
                }

                settings.jqXHR = $.ajax({
                    "type": conf.method,
                    "url": conf.url,
                    "data": request,
                    "dataType": "jsonp",
                    "cache": false,
                    "success": function(json) {
                        //console.log(json);
                        cacheLastJson = $.extend(true, {}, json);

                        if (cacheLower != drawStart) {
                            json.data.splice(0, drawStart - cacheLower);
                        }
                        json.data.splice(requestLength, json.data.length);

                        drawCallback(json);
                    }
                });
            } else {
                json = $.extend(true, {}, cacheLastJson);
                json.draw = request.draw; // Update the echo for each response
                json.data.splice(0, requestStart - cacheLower);
                json.data.splice(requestLength, json.data.length);

                drawCallback(json);
            }
        }
    };

    // Register an API method that will empty the pipelined data, forcing an Ajax
    // fetch on the next draw (i.e. `table.clearPipeline().draw()`)
    $.fn.dataTable.Api.register('clearPipeline()', function() {
        return this.iterator('table', function(settings) {
            settings.clearCache = true;
        });
    });

    function Table() {}
    Table.prototype.t = "";
    Table.prototype = {
        /*  
        dom : table id or class
        positon: 
        dataurlcontent: ajax tablebodydata url
        dataurltitle: ajax tabletitle url
        columns: columns init data
        columndefs: option columns num (from 0 start)
        */
        createTable: function(dom, position, dataurlcontent, dataurltitle, oprationhtml) {
            var c = null;
            $.ajax({
                url: dataurltitle,
                dataType: "json",
                type: "GET",
                async: false,
                success: function(response) {
                    var columns = response.columns;
                    var tableHead = [];
                    tableHead.push("<tr>");
                    for (var i = 0; i < columns.length; i++) {
                        if (response.title[columns[i].data]) {
                            tableHead.push("<th>" + response.title[columns[i].data] + "</th>")
                        } else {
                            tableHead.push("<th>操作</th>")
                        }
                    };
                    tableHead.push("</tr>");
                    $(dom + " thead").html(tableHead.join(""));
                    c = columns;
                }
            });
           
            console.log(c);
            this.t = $(dom).DataTable({
                "dom": position,
                "processing": true,
                "serverSide": true,
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
                "ajax": $.fn.dataTable.pipeline({
                    "url": dataurlcontent,
                    "data": dataParse,
                    "pages": 2
                }),
                "columns": c,
                "columnDefs": [{
                    "targets": c.length - 1,
                    "searchable": false,
                    "data": null,
                    "defaultContent": oprationhtml
                }]
            });

            var table = this.t;
            $(".dsearch").on('keyup click', function() {
                var tsval = $(".dsearch").val()
                table.search(tsval, false, false).draw();
            });
            return table;


            /**
             * 加入后端可以解析的排序参数
             */
            function dataParse(request) {
                var sort = {};
                if (request && request.columns && request.order) {
                    var sortEle = [];
                    $.each(request.order, function(n, value) {
                        var column_index = value["column"];
                        var dir = value["dir"];
                        var order_column = request.columns[column_index]["data"];
                        sortEle.push({
                            "column": order_column,
                            "dir": dir
                        });
                    });
                    sort.sort = sortEle;
                    
                }
                return sort;
            }
        },

        addSearch : function(dom, table){
            $(dom).on('keyup click', function () {
                var tsval = $(dom).val()
                table.search(tsval, false, false).draw();
            });

        }

    }

    return {
        Table: Table
    }
});
