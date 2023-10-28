$(document).ready(function() {
	var userid0;
	$(".usermy").hide();
	$(".messagemy").hide();
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/Usercontroller/userStatusCheck",
		type: "POST",
		dataType: "json",
		async:false,
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			if(data.userId != 0) {
				$(".login").hide();
				$(".register").hide();
				$(".usermy").show();
				$(".messagemy").show();
				$("#headimage").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#userid0").append(data.userId);
				userid0 = data.userId;
				$("#userid0").hide();
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			//alert(error);
		}
	});
     var data={
     	"userId":userid0
	 }
	//		新消息
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/noticeNumber",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			if(data.replyNumber != 0) {
				$(".down1 ul li").eq(0).append("<div id='remind1'>" + data.replyNumber + "</div>");
			}
			if(data.focusNumber != 0) {
				$(".down1 ul li").eq(1).append("<div id='remind1'>" + data.focusNumber + "</div>");
			}
			if(data.praiseNumber != 0) {
				$(".down1 ul li").eq(2).append("<div id='remind1'>" + data.praiseNumber + "</div>");
			}
			var num = data.replyNumber + data.focusNumber + data.praiseNumber;
			if(num != 0) {
				$("#mess").append("<div id='remind'>" + num + "</div>");
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			//alert(error);
		}
	});
	$("[id=m]").hide();
	$(".down1 ul li").click(function() {
		var num = $(this).children('#m').html();
		console.log(num);
		window.location.href = "message.html?num=" + num;
	})
	var data = {
		"userId": userid0
	};
	$("#quit").click(function() {
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/Usercontroller/logOut",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {
				window.location.href = "login.html";
			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				//alert(error);
			}
		});
	})
	$("#logout").click(function() {
		var userid5 = $("#userid0").text();
		var data1 = {
			"userId": parseInt(userid5)
		};
		console.log(userid5);
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/person/unsubscibe",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data1),
			success: function(data) {
				window.location.href = "login.html";
			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				//alert(error);
			}
		});
	})
	var a = new Array();
	//	获得版块名
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/board",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#sortname").append("<option value='" + i + "'>" + data[i].boardName + "</option>");
				a[i] = data[i].boardId;
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});

	$("#btn1").click(function() {
		var title = $("#topic").val();
		var info = editor.txt.html();
		var board = $("#sortname").val();
		var boardid = a[board];
		var data1 = {
			"title": title,
			"info": info,
			"boardId": boardid
		};
		var whether="YES";
		var filename = $("#filename").val();
		console.log($("#filename")[0].files[0]);
		console.log($("#filename").val());
		var uploadFile = new FormData();
		if(filename==""){
			whether="NO";
			uploadFile.append("title", title);
			uploadFile.append("info", info);
			uploadFile.append("userId", userid0);
			uploadFile.append("boardId", parseInt(boardid));
			uploadFile.append("whetherFile",whether);
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/person/addPost1",
				type: "post",
				async: false,
				cache: false,
				secureuri: false, //一般设置为false
				processData: false, //因为data值是FormData对象，不需要对数据做处理。
				contentType: false,
				data: uploadFile,
				success: function(data) {
					var id = data;
					window.location.href = "post.html?id=" + id;
				},
				error: function() {
					var error = "查询数据失败！";
					console.log(error);
					// alert(error);
				}
			});
		}else{
			uploadFile.append("title", title);
			uploadFile.append("info", info);
			uploadFile.append("userId", userid0);
			uploadFile.append("boardId", parseInt(boardid));
			uploadFile.append("whetherFile",whether);
			uploadFile.append("multipartFile", $("#filename")[0].files[0]);
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/person/addPost",
				type: "post",
				async: false,
				cache: false,
				secureuri: false, //一般设置为false
				processData: false, //因为data值是FormData对象，不需要对数据做处理。
				contentType: false,
				data: uploadFile,
				success: function(data) {
					var id = data;
					window.location.href = "post.html?id=" + id;
				},
				error: function() {
					var error = "查询数据失败！";
					console.log(error);
					// alert(error);
				}
			});
		}
	})

	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
})