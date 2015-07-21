define(["jquery", "baiduTemplate"], function($, bt){
	var tmplate = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button><h4 class="modal-title"><%=modaltitle%></h4></div><div class="modal-body"><%if(shops.length>1){%><div class="form-group"><label>发布范围 :  </label><%for(var i=0; i<shops.length; i++){%><label class="checkbox-inline"> <input type="checkbox"> <%=shops[i]%></label><%}%></div><%}%><%if(domid == "roomInfoModal"){%><div class="form-group custom-search-form"><label>客房类型 : </label><div><select class="form-control custom-select" id="select-roomtype"><%for(var j=0; j<roomtype.length; j++){%><option><%=roomtype[j]%></option><%}%></select><a type="button" class="btn btn-default" id="addRoomType">添加客房类型</a></div></div><%}%><%if(inputs.length>1){ %> <%for(var k=0; k<inputs.length; k++){%><%if(inputs[k].type == "file"){%><div class="form-group"><label for="<%=inputs[k].id%>"><%=inputs[k].title%></label><input type="<%=inputs[k].type%>" id="<%=inputs[k].id%>" placeholder="<%=inputs[k].title%>"></div><%}else{%><div class="form-group"><label for="<%=inputs[k].id%>"><%=inputs[k].title%></label><input type="<%=inputs[k].type%>" class="form-control" id="<%=inputs[k].id%>" placeholder="<%=inputs[k].title%>"></div><%}%><%}}%><a type="button" class="btn btn-default addCustomData">添加自定义字段</a><%if(customdata.length > 0){for (var m=0; m<customdata.length; m++){%><div class="form-group customadd"><label><%=customdata[m].title%></label><input type="<%=customdata[m].type%>" class="form-control" placeholder="<%=customdata[m].title%>"></div><%}}%></div><div class="modal-footer"><a type="button" class="btn btn-default" data-dismiss="modal">关闭</a><a data-toggle="modal" href="#<%=domid%>" type="button" class="btn btn-primary" id="<%=save%>">确定</a></div></div>';
	var tmplateadvtmp = '<div class="panel-body row"><div class="col-md-7"><div class="templatecontent"><%for(var i=0;i<inputs.length;i++){%><div class="form-group"><label for="<%=inputs[i].id%>"><%=inputs[i].title%></label><input type="<%=inputs[i].type%>" class="form-control" id="<%=inputs[i].id%>" placeholder="<%=inputs[i].title%>"></div><%}%></div></div><div class="col-md-5"><img src="<%=pic%>" alt="" width="250" class="img-thumbnail"></div></div>';
    var templateadv = '<div class="modal-dialog"><div class="modal-content"><div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button><h4 class="modal-title"><%=modaltitle%></h4></div><div class="modal-body"><%for(var i=0; i<inputs.length;i++){%><%if(inputs[i].title == "有效期"){%><div class="form-group"><label for="<%=inputs[i].id%>">有效期: </label><div class="input-group date" id="<%=inputs[i].id%>"><input type="<%=inputs[i].type%>" class="form-control" /><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div></div><%}else{%><div class="form-group"><label for="<%=inputs[i].id%>"><%=inputs[i].title%></label><input type="<%=inputs[i].type%>" class="form-control" id="<%=inputs[i].id%>" placeholder="<%=inputs[i].title%>"></div><%}}%><div class="form-group"><label>发布范围 :  </label><%for(var j=0; j<shops.length; j++){%><label class="checkbox-inline"><input type="checkbox"><%=shops[j]%></label><%}%></div><%if(template.length>0){%><div class="form-group template"><label>点击上传图片跳转页面设置</label><div class="form-group width-half"><label>选择模版 : </label><div><select class="form-control select-template"><%for(var k=0; k<template.length; k++){%><option value="<%=template[k]%>"><%=template[k]%></option><%}%></select></div></div><div class="panel panel-default"></div></div><%}%></div><div class="modal-footer"><button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button><a data-toggle="modal" href="#<%=domid%>" type="button" class="btn btn-primary" id="<%=save%>">保存</a></div></div></div></div>';

	var bt=baidu.template;

	function getRoomTmplate(){	
		var room = {
	    	domid: "roomInfoModal",
			modaltitle: "插入客房信息",
			shops: [" shop1"," shop2"],
			roomtype:["标准间","豪华间"],
			inputs: [
			{id: "pic",title: "上传图片(至少一张图片):",type: "file"},
			{id: "price",title: "单价:",type: "number"},
			{id: "num",title: "数量:",type: "number"},
			{id: "people",title: "可住人数:",type: "number"},
			{id: "mianji",title: "面积:",type: "text"},
			{id: "smoke",title: "是否无烟:",type: "text"},
			{id: "wifi",title: "宽带:",type: "text"},
			{id: "bed",title: "床型:",type: "text"},
			{id: "bed",title: "是否可加床:",type: "text"},
			{id: "des",title: "详细介绍:",type: "area"}],
			customdata: [{title: "test",type:"text"},{title: "tests",type: "number"}],
			save: "saveRoomInfo"
		}
		var html=bt(tmplate, room);
		return html;
	}

	function getServiceTmplate(){
		var service = {
			domid: "serviceInfoModal",
			modaltitle: "插入服务信息",
			shops: [" shop1"," shop2"],
			inputs: [
			{id: "s-name", title: "服务名称", type: "text"},
			{id: "s-pic", title: "上传图片(可以不上传)", type: "file"},
			{id:"s-price", title: "单价", type: "number"},
			{id:"s-des", title: "详情介绍", type: "area"}],
			customdata: [{title: "test",type:"text"},{title: "tests",type: "number"}],
			save: "saveServiceInfo"
		}
		return bt(tmplate, service);
	}

	function getMenuTmplate(){
		var menu = {
			domid: "menuInfoModal",
			modaltitle: "插入菜单信息",
			shops: [" shop1"," shop2"],
			inputs: [
			{id: "m-name", title: "菜单名称", type: "text"},
			{id: "m-pic", title: "上传图片(可以不上传)", type: "file"},
			{id:"m-price", title: "单价", type: "number"},
			{id:"m-des", title: "详情介绍", type: "area"}],
			customdata: [{title: "test",type:"text"},{title: "tests",type: "number"}],
			save: "saveMenuInfo"
		}
		return bt(tmplate, menu);
	}

	function getFpslideadvTmplate(){
		var adv = {
			domid: "fpslideadv-modal",
			modaltitle: "首页轮播广告",
			shops: [" shop1"," shop2"],
			inputs: [
			{id: "fptitle", title: "标题", type: "text"},
			{id: "fppic", title: "上传图片", type: "file"},
			{id:"fpdate", title: "有效期", type: "text"}],
			template: ["a","b"],
			save: "fpslideadv-save"
		}
		return bt(templateadv, adv);
	}

	function getStartadvTmplate(){
		var adv = {
			domid: "startadv-modal",
			modaltitle: "启动画面",
			shops: [" shop1"," shop2"],
			inputs: [
			{id: "stpic", title: "上传图片", type: "file"},
			{id:"stdate", title: "有效期", type: "text"}],
			template: [],
			save: "startadv-save"
		}
		return bt(templateadv, adv);
	}

	function getFpcontentadvTmplate(){
		var adv = {
			domid: "fpcontentadv-modal",
			modaltitle: "首页内容区广告",
			shops: [" shop1"," shop2"],
			inputs: [
			{id: "fpctitle", title: "标题", type: "text"},
			{id: "fpcsubtitle", title: "子标题", type: "text"},
			{id: "fpcpic", title: "上传图片", type: "file"},
			{id:"fpcdate", title: "有效期", type: "text"}],
			template: ["a","b"],
			save: "fpcontentadv-save"
		}
		return bt(templateadv, adv);
	}

	function getAdvTemplate(template){
		var templateA = {
			inputs: [
			{id: "a-title1", title: "标题1", type: "text"},
			{id: "a-content1", title: "文本内容1", type: "text"},
			{id: "a-pic1", title: "上传图片1", type: "file"},
			{id: "a-title2", title: "标题2", type: "text"},
			{id: "a-content2", title: "文本内容2", type: "text"},
			{id: "a-pic2", title: "上传图片2", type: "file"}],
			pic: "../img/test3.png"
		},
		templateB = {
			inputs: [
			{id: "b-title1", title: "标题1", type: "text"},
			{id: "b-content1", title: "文本内容1", type: "text"},
			{id: "b-pic1", title: "上传图片1", type: "file"}],
			pic: "../img/test1.png"
		}
		if(template == "a"){
			return bt(tmplateadvtmp, templateA);
		}else{
			return bt(tmplateadvtmp, templateB);
		}
		
	}

	//点击保存自定义字段
	function insertCustomData(name, inputtype, parent){
		var arr = [];
		arr.push('<label>'+ name +': </label>');
		arr.push('<input type="'+ inputtype +'" class="form-control" placeholder="'+ name +'">');
		var $row = $("<div>")
                    .addClass("form-group customadd")
                    .html(arr.join(""))
                    .appendTo(parent); 
        arr = [];  
	}

	//输入自定义字段，点击添加触发事件
	function creatListTmpl(type, parent){
		//console.log(type);
		var arr = [];
		arr.push('<h5 class="modal-title col-md-8">' + type + '</h5>');
        arr.push('<div class="col-md-3 col-md-offset-1 delete">删除</div>');
        var $row = $("<div>")
                    .addClass("row")
                    .html(arr.join(""))
                    .appendTo(parent); 
        arr = [];  
	}
	//parent参数为自定义字段所在的modal的父母节点。也就是#roomInfoModal ＃serviceInfoModal #menuInfoModal
	function initCustomTmpl(parent){
		$("#CustomDataModal .list").html("");
        $(parent + " .customadd").each(function(){
        	creatListTmpl($(this).children("label").text() + " : " + $(this).children("input").attr("type"), $("#CustomDataModal .list"));
        });

        $("#CustomDataModal .list .delete").click(function(){
            $(this).parent(".row").remove();
        });

        if($(".addcustominfo:has(button)").length == 0){
	        var $addbtn = $("<button>").addClass("btn btn-primary").text("添加").appendTo(".addcustominfo").click(function(){
		        if($("#CustomDataModal .addcustominfo input").val()){
		            var name = $("#CustomDataModal .addcustominfo input").val() + ":" + $("#CustomDataModal .addcustominfo select").val();
		            creatListTmpl(name , $("#CustomDataModal .list"));
		        }
		    });
	    };

	    $("#CustomSave").unbind("click").bind("click" , function(){
	        if($(parent + " .modal-body .customadd")){
	            $(parent + " .modal-body .customadd").remove();
	        }
	        $("#CustomDataModal .list .modal-title").each(function(){
	            var name = $(this).text().split(":");                
	            insertCustomData(name[0], name[1], $(parent + " .modal-body"));
	        });
	    });

	    $("#CustomDataModal .addcustominfo input").unbind("focus").bind("focus", function(e){
	        $(this).val("");
	    });
	}


	function initRoomtypeTmpl(){
		var arr = [];
		//arr.push('<div class="modal fade" id="RoomTypeModal"  tabindex="-1" remote="true" aria-hidden="true" style="display:none;" role="dialog" aria-labelledby="mySmallModalLabel">');
		arr.push('<div class="modal-dialog modal-sm">');
		arr.push('<div class="modal-content"><div class="modal-header">');
		arr.push('<button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>');
		arr.push('<h4 class="modal-title">编辑客房信息</h4></div><div class="modal-body"><div class="list"></div>');
		arr.push('<div class="row addroominfo">');
		arr.push('<input type="text" class="form-control width-half col-md-8 input-sm" placeholder="添加类型">');
		arr.push('<button class="col-md-3 col-md-offset-2 btn btn-primary btn-sm">添加</button></div></div><div class="modal-footer">');
		arr.push('<button class="btn" data-dismiss="modal" aria-hidden="true">关闭</button>');
		arr.push('<a data-toggle="modal" href="#RoomTypeModal" type="button" class="btn btn-primary">保存</a></div></div></div>');
		$("#RoomTypeModal").html(arr.join(""));

		//$("#RoomTypeModal .list").html("");
        //将已经存在的类型传入添加客房信息modal
        $("#select-roomtype").children("option").each(function(){
            creatListTmpl($(this).text(), $("#RoomTypeModal .list"));
        });
        $("#RoomTypeModal .list .delete").unbind("click").bind("click", function(){
            $(this).parent(".row").remove();
        });    
        

         //添加房间类型moudal里面的添加按钮
	    $("#RoomTypeModal .addroominfo button").unbind("click").bind("click", function(){
	        if($("#RoomTypeModal .addroominfo input").val()){
	            creatListTmpl($("#RoomTypeModal .addroominfo input").val(), $("#RoomTypeModal .list"));
	            $("#RoomTypeModal .list .delete").click(function(){
	                $(this).parent(".row").remove();
	            });
	        }
	    });

	    $("#RoomTypeModal .addroominfo input").unbind("focus").bind("focus", function(){
	        $(this).val("");
	    });      
	}

	return{
		creatListTmpl : creatListTmpl,
		insertCustomData : insertCustomData,
		getRoomTmplate : getRoomTmplate,
		getServiceTmplate : getServiceTmplate,
		getMenuTmplate : getMenuTmplate,
		initCustomTmpl : initCustomTmpl,
		initRoomtypeTmpl : initRoomtypeTmpl,
		getAdvTemplate : getAdvTemplate,
		getFpslideadvTmplate : getFpslideadvTmplate,
		getStartadvTmplate : getStartadvTmplate,
		getFpcontentadvTmplate : getFpcontentadvTmplate
	}
});