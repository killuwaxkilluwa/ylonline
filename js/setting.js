require.config({
    baseUrl: "../js",
    paths: {
        "tree": "bootstrap-treeview.min"
    },
    shim: {
        "tree": {"deps" : ["jquery"]}
    }
});

require(["jquery", "Table", "Modal", "Tmpl", "tree"], function ($, Table, Modal, Tmpl, tree) {
    var urlcontent = "http://121.40.103.141:8091/ylbms/users";
    var urltitle = "http://192.168.1.10:8080/ylbms/pagesconfig/users.json";
    var oprationhtml = "<button type='button' class='btn btn-primary btn-sm optionbutton' id='edit'>编辑</button><button type='button' class='btn btn-danger btn-sm optionbutton' id='detele'>删除</button>";
    var table = new Table.Table();
    var usertable = table.createTable("#dataTables", "tlpr", urlcontent, urltitle, oprationhtml);
    table.addSearch(".dsearch", usertable); 

    $("#side-menu a").click(function(){
        switch($(this).attr("id")){
            case "usermanage-nav":
                $(".settings-content2").hide();
                $(".settings-content1").show();
                $(".addinfobtn").text("添加用户").attr("id", "usermanage-addbtn");
                break;
            case "footersetting-nav":
                $(".settings-content1").hide();
                $(".settings-content2").show();
                break;
            case "branchsetting-nav":
                $(".settings-content2").hide();
                $(".settings-content1").show();
                $(".addinfobtn").text("添加分店").attr("id", "branchsetting-addbtn");
                break;

        }
    });


    $(".addinfobtn").click(function(){
        if($(this).attr("id") == "usermanage-addbtn"){
            new Modal.Modal().createModal("#usermanage-modal", "show", Tmpl.getUserManageTemplate());
        }else if($(this).attr("id") == "branchsetting-addbtn"){
            new Modal.Modal().createModal("#branchsettings-modal", "show", Tmpl.getBranchSettingTemplate());
        }
        
    });

    $(document).on("click", "#addRole", function(){
        Tmpl.initRoletypeTmpl(); 
        $("#RoleTypeModal").modal("show");    
    }); 

    function getTree() {
      var tree = [
          {
            text: "信息录入",
            nodes: [
              {
                text: "增加",
                id: "node1-1"
              },
              {
                text: "删除",
                id: "node1-1"
              },
              {
                text: "修改",
                id: "node1-1"
              },
              {
                text: "查询",
                id: "node1-1"
              },
              {
                text: "发布",
                id: "node1-1"
              }
            ]
          },
          {
            text: "会员管理",
            nodes: [
              {
                text: "增加",
              },
              {
                text: "删除"
              },
              {
                text: "修改"
              },
              {
                text: "查询"
              },
              {
                text: "拉黑"
              },
              {
                text: "查看统计信息"
              }
            ]
          },
          {
            text: "广告管理",
            nodes: [
              {
                text: "增加",
              },
              {
                text: "删除"
              },
              {
                text: "修改"
              },
              {
                text: "发布"
              }
            ]
          },
          {
            text: "订单管理",
            nodes: [
              {
                text: "处理",
              },
              {
                text: "查询"
              },
              {
                text: "取消"
              }
            ]
          },
          {
            text: "用户管理",
            nodes: [
              {
                text: "增加",
              },
              {
                text: "删除"
              },
              {
                text: "修改"
              },
              {
                text: "查询"
              }
            ]
          },
          {
            text: "分店管理",
            nodes: [
              {
                text: "增加",
              },
              {
                text: "删除"
              },
              {
                text: "修改"
              },
              {
                text: "查询"
              }
            ]
          },
          {
            text: "页脚管理",
            nodes: [
              {
                text: "增加",
              },
              {
                text: "删除"
              },
              {
                text: "修改"
              }
            ]
          }
        ];
      return tree;
    };
    //$('#tree').treeview('checkNode',{data: getTree()});

    var $checkableTree = $('#tree').treeview({
          levels: 1,
          data: getTree(),
          showIcon: false,
          showCheckbox: true,
          onNodeChecked: function(event, node) {
            console.log(node.nodes);
            if(node.nodes){
              for(var j=0; j<node.nodes.length; j++){
                $checkableTree.treeview('checkNode', [ node.nodes[j].nodeId, { silent: $('#chk-check-silent').is(':checked') }]);
              }
            }
          },
          onNodeUnchecked: function (event, node) {  
            if(node.nodes){
              for(var j=0; j<node.nodes.length; j++){
                $checkableTree.treeview('uncheckNode', [ node.nodes[j].nodeId, { silent: $('#chk-check-silent').is(':checked') }]);
              }
            }
          }
        });
    
    // var findCheckableNodess = function() {
    //     return $checkableTree.treeview('search', [ $('#input-check-node').val(), { ignoreCase: false, exactMatch: false } ]);
    // };

    //in order to fix close the second modal then the first modal cant scroll
    $("#RoleTypeModal").on("hidden.bs.modal" , function() {
        if ( $(".modal:visible").length ) {
            $("body").addClass("modal-open");
        }
    });
    
});