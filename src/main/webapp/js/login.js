$(document).ready(function() {
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/Usercontroller/hotPost",
		type: "POST",
		//		async: false,
		dataType: "json",
		data: {},
		success: function(data) {
			$("#topic").append("板块·" + data.boardName);
			$("#topic2").append(data.post.title);
			$("#content").append(data.post.info);
			$("#id").append(data.post.postId);
			$("#id").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert("错误");
		}
	});
	var isShow = true;
	$('#look').click(function() {
		$(this).toggleClass("glyphicon-eye-open glyphicon-eye-close");
		if(isShow) {
			$("#password").attr("type", "text");
			isShow = false;

		} else {
			$("#password").attr("type", "password");
			isShow = true;
		}
	});
	//眼睛图片的切换
	$("#username").blur(function() {
		var name = $("#username").val();
		var gsname = /^.{1,15}$/;
		if(gsname.test(name)) {
			$("#hintname").empty();
		} else {
			$("#hintname").html("格式错误 ");
		}
	})
	//判断用户名格式
	$("#password").blur(function() {
		var pwd0 = $("#password").val();
		var gspwd = /^[a-z0-9]{2,14}$/;
		if(gspwd.test(pwd0)) {
			$("#hintpwd").empty();
		} else {
			$("#hintpwd").html("格式错误");
		}
	})
	//判断密码格式
	$('body').on('click', '#loginok', function() {
		var userName = $("#username").val();
		var passWord = $("#password").val();
		var code = $("#verify").val();
		if(userName == "") {
			alert("请输入用户名");
			document.form.username.focus();
			return false;
		}
		if(passWord == "") {
			alert("请输入密码");
			document.form.password.focus();
			return false;
		}
		if($("#hintname").val() != "" || $("#hintpwd").val() != "") {
			return false;
		}
		if(code == "") {
			alert("请输入验证码");
			return false;

		}
		userName = String(userName);
		passWord = String(passWord);
		var data = {
			"username": userName,
			"password": passWord
		};
		$.ajax({
			// url: "/Usercontroller/login",
			url: "http://localhost:8888/mywork_war_exploded/Usercontroller/login",
			type: "POST",
			// async: false,
			contentType: "application/json;charset=UTF-8",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(data) {
				if(data.flag == 0) {
					if(data.msg == 1) alert("审核未通过");
					else alert("用户名或密码错误！");
					return false;
				} else {
					if(data.msg == 0)
						window.location.href = "index.html";
					else {
						window.location.href = "index.html";
					}
				}
			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				console.log(userName);
				// alert("错误");
			}
		});
		return false;
	})
	//判断是否填全

	$('body').on('click', '#seekok', function() {
		var info = $("#keyword").val();
		var url = "search.html";
		var data = {
			"info": info
		};
		$.ajax({
			url: "SaveWordServlet",
			type: "POST",
			dataType: "json",
			data: JSON.stringify(data),
			success: function(data) {},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
			}
		});
		window.open(url);
	})
	$("body").on("click","#topic2",function(){
		var id=$("#id").text();
		window.location.href="post.html?id="+id;
	})

})