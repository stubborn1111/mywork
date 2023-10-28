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
		async: false,
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
			alert("错误");
		}
	});

	$("#username").blur(function() {
		var name = $("#username").val();
		var gsname = /^[a-zA-Z0-9]{1,15}$/;
		if(gsname.test(name)) {
			$("#hintname2").empty();
		} else {
			$("#hintname2").html("格式错误 ");
		}
	})
	//判断用户名格式
	$("#password1").blur(function() {
		var pwd0 = $("#password1").val();
		var gspwd = /[a-zA-Z0-9]{6,14}$/;
		var gspwd1 = /[a-zA-Z]{6,14}$/;
		var gspwd2 = /[0-9]{6,14}$/;
		if(gspwd.test(pwd0)) {
			if(gspwd1.test(pwd0)) {
				$("#hintpwd2").html("只包含字母，安全度较低");
				return false;
			}
			if(gspwd2.test(pwd0)) {
				$("#hintpwd2").html("只包含数字，安全度较低");
				return false;
			}
			$("#hintpwd2").html("包含字母和数字，安全度较高");

		} else {
			$("#hintpwd2").html("格式错误");
		}

	})
	//判断密码格式
	$("#password2").blur(function() {
		var pwd = $("#password1").val();
		var pwd1 = $("#password2").val();
		if(pwd != pwd1) {
			$("#hint").html("两次密码不相同");

		} else {
			$("#hint").empty();
		}
	})
	$('body').on('click', '#registerok', function()

		{
			var name = $("#username").val();
			var pwd = $("#password1").val();
			var manager;
			var code = $("#verify").val();
			if($('#manager').is(':checked')) {
				manager = "1";
			} else {
				manager = "0";
			}
			if(name == "") {
				alert("未填写用户名");
				document.form.username.focus();
				return false;
			}
			if(pwd == "") {
				alert("未填写密码");
				document.form.password.focus();
				return false;
			}
			if($("#hintname2").html() != "" || $("#hintpwd2").html() == "格式错误" || $("#hint").html() != "") {
				return false;
			}
			var data = {
				"username": name,
				"password": pwd,
				"msg": manager
			};
			$.ajax({
				// url: "/Usercontroller/regist",
				url: "http://localhost:8888/mywork_war_exploded/Usercontroller/regist",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data),
				success: function(data) {
					console.log(data.flag);
					// alert("haha");
					if(data.flag == "0") {
						alert("用户名已被注册");
						console.log(data.flag);
						return false;
					} else {
						console.log(data.message);
						if(data.message == "1") {
							alert("注册管理员需要等待审核，审核过后即可登录");
							return false;
						} else if(data.message == "0") {
							alert("注册成功！返回登录");
							window.location.href = "login.html";
							return true;
						}
					}

				},
				error: function() {
					var error = "查询数据失败！";
					console.log(error);
					alert(error);
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
				alert(error);
			}
		});
		window.open(url);
	})
	$("body").on("click","#topic2",function(){
		var id=$("#id").text();
		window.location.href="post.html?id="+id;
	})
	$(".checkbox").hide();
	$(".bbs").click(function(){
		$(".checkbox").show();
	})


})