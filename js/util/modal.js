define(["jquery", "Tmpl","bootstrap"], function($, Tmpl){
	function Modal(){}
	Modal.prototype = {
		createModal : function(dom, state, html){
			$(dom).html(html).modal(state);
			$(document).on("click", dom + " .addCustomData", function(){

		        Tmpl.initCustomTmpl(dom);
        		$("#CustomDataModal").modal("show");  
		    });
		},

		createAdvModal : function(dom, state, html, datetimepickerdomid){
			$(dom).html(html).modal(state);
			$(dom + " .panel").html(Tmpl.getAdvTemplate("a"));
            if(datetimepickerdomid){
            	$(datetimepickerdomid).datetimepicker({
                	locale: 'zh-cn'
            	});
            }
            $(document).on("change", dom + " .select-template", function(){
        		$(dom + " .panel").html(Tmpl.getAdvTemplate($(this).val()));
    		});
            
		},

		// createModal : function(dom, state, html){
		// 	$(dom).html(html).modal(state);
		// },
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
    		$(dom + " .modal-title").html(title);
    		$(dom +" .modal-body").html(content);
    		$(dom).modal(state);
		}

	}

	return {
		Modal: Modal
	}

});