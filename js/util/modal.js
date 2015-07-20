require.config({
    baseUrl: "../js",
    paths: {
        "bootstrap": "bootstrap.min"
    },
    shim: {
    	"bootstrap" : {"deps" : ["jquery"]}
    }
});

define(["jquery", "Tmpl","bootstrap"], function($, Tmpl){
	function Modal(){}
	Modal.prototype = {
		createModal : function(dom, state, html){
			$(dom).html(html);
			$(dom).modal(state);
			$(document).on("click", dom + " .addCustomData", function(){
		        Tmpl.initCustomTmpl(dom);
        		$("#CustomDataModal").modal("show");  
		    });
		},

		closeModal : function(dom){
			$(dom).modal("hide");
		},

		clearData : function(dom){
			$(dom +" .form-group input").val("");
		},

		initData : function(userinfo){
			$("#userid").val(userinfo.userid).attr("disabled", "disabled");
		    $("#username").val(userinfo.username);
		    $("#sex").val(userinfo.sex);
		    $("#tel").val(userinfo.tel);
		    $("#mail").val(userinfo.mail);
		    $("#level").val(userinfo.level);
		    $("#score").val(userinfo.score);
		},

		MakeSureModal : function(dom, title, content, state){
    		$(dom + ".modal-title").html(title);
    		$(dom +".modal-body").html(content);
    		$(dom).modal(state);
		}

	}

	return {
		Modal: Modal
	}

});


// Modal.clearUerInfo = function(){
//     $("#userid").val("");
//     $("#username").val("");
//     $("#sex").val("");
//     $("#tel").val("");
//     $("#mail").val("");
//     $("#level").val("");
//     $("#score").val("");
// },

// Modal.setEditData = function(userinfo){
//     $("#userid").val(userinfo.userid).attr("disabled", "disabled");
//     $("#username").val(userinfo.username);
//     $("#sex").val(userinfo.sex);
//     $("#tel").val(userinfo.tel);
//     $("#mail").val(userinfo.mail);
//     $("#level").val(userinfo.level);
//     $("#score").val(userinfo.score);
// },

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

// Modal.createMakeSureModal = function(title, content){
//     $("#makeSureModal .modal-title").html(title);
//     $("#makeSureModal .modal-body").html(content);
// }