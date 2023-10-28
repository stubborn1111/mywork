function auto1() {
	$("#focus").trigger("click");
}

function auto() {
	$("#comment").trigger("click");
}

function auto2() {
	$("#praise").trigger("click");
}

function auto3() {
	$("#letter").trigger("click");
}
$(document).ready(function() {
	var local_url = document.location.href;
	//截取get字符串
	var getstr = local_url.substr(local_url.indexOf('=') + 1);
	var num = getstr;
	console.log(num);
	if(num != "") {
		if(num == "1") {
			window.onload = auto;
			if($("#comment #remind1").length){
				var data={
					"userId":userid0,
					"kind":"reply"
				};
				$("#comment #remind1").remove();
				$.ajax({
					url: "http://localhost:8888/mywork_war_exploded/notice/clean",
					type: "POST",
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify(data),
					success: function(data) {

					},
					error: function() {
						var error = "查询数据失败！";
						console.log(error);
						// alert(error);
					}
				});
			}
		}
		if(num == "2") {
			console.log(num);
			window.onload = auto1;
			if($("#focus #remind1").length){
				var data={
					"userId":userid0,
					"kind":"focus"
				}
				$("#focus #remind1").remove();
				$.ajax({
					url: "http://localhost:8888/mywork_war_exploded/notice/clean",
					type: "POST",
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify(data),
					success: function(data) {

					},
					error: function() {
						var error = "查询数据失败！";
						console.log(error);
						// alert(error);
					}
				});
			}
		}
		if(num == "3") {
			console.log(num);
			window.onload = auto2;
			if($("#praise #remind1").length) {
				var data = {
					"userId": userid0,
					"kind": "praise"
				}
				$("#praise #remind1").remove();
				$.ajax({
					url: "http://localhost:8888/mywork_war_exploded/notice/clean",
					type: "POST",
					dataType: "json",
					contentType: "application/json;charset=UTF-8",
					data: JSON.stringify(data),
					success: function (data) {

					},
					error: function () {
						var error = "查询数据失败！";
						console.log(error);
						// alert(error);
					}
				});
			}
		}
		if(num == "4") {
			console.log(num);
			window.onload = auto3;
		}
	}else{
		window.onload = auto;
	}
	var userid0;
	$(".usermy").hide();
	$(".messagemy").hide();
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/Usercontroller/userStatusCheck",
		type: "POST",
		dataType: "json",
		async: false,
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
				$("#header .img").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#userid0").append(data.userId);
				$("#name").append(data.username);
				$("#grade").append("<img src='img/jifen.png'>积分：" + data.score + "分");
				$("#rank").append("<img src='img/jibie (1).png'>等级：" + data.level + "级");
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
	//	新消息
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/noticeNumber",
		type: "POST",
		dataType: "json",
		async:false,
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			if(data.replyNumber != 0) {
				$(".down1 ul li").eq(0).append("<div id='remind1'>" + data.replyNumber + "</div>");
				$("#comment").append("<div id='remind1'>"+data.replyNumber+"</div>");
			}
			if(data.focusNumber != 0) {
				$(".down1 ul li").eq(1).append("<div id='remind1'>" + data.focusNumber + "</div>");
				$("#focus").append("<div id='remind1'>"+data.focusNumber+"</div>");
			}
			if(data.praiseNumber != 0) {
				$(".down1 ul li").eq(2).append("<div id='remind1'>" + data.praiseNumber + "</div>");
				$("#praise").append("<div id='remind1'>"+data.praiseNumber+"</div>");
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

	$("[id=postid]").hide();
	$("[id=userid]").hide();
	//	获得关注消息
	var data2= {
		"userId":parseInt(userid0) ,
	}
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/focus",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data2),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table2").append("<tr><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='userid'>" + data[i].userId + "</td><td id='fsname'>" + data[i].username + "  关注了你</td><td id='userid'>" + data[i].userId + "</td><td id='atten'>关注</td></tr>")
			}
			$("[id=userid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	评论了他

	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/reply",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data2),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table1").append("<tr><td id='userid'>" + data[i].user.userId + "</td><td><div id='rname'><div id='username1'>" + data[i].user.username + "</div> 回复了你</div><div id='rcon'>" + data[i].post.title + "</div></td><td id='postid'>" + data[i].post.postId + "</td></tr>")
			}
			$("[id=userid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	点赞了他

	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/praise",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data2),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table3").append("<tr><td id='userid'>" + data[i].user.userId + "</td><td><div id='rname'><div id='username1'>" + data[i].user.username + "</div> 点赞了你</div><div id='rcon'>" + data[i].post.title + "</div></td><td id='postid'>" + data[i].post.postId + "</td></tr>")
			}
			$("[id=userid]").hide();
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$("body").on("click","[id=fsname]",function(){
		var id=$(this).prev().text();
		window.location.href="others.html?id="+id;
	})
	$("body").on("click","[id=username1]",function(){
		var id=$(this).parent().parent().prev().text();
		window.location.href="others.html?id="+id;
	})
	$("body").on("click","[id=rcon]",function(){
		var id=$(this).parent().next().text();
		window.location.href="post.html?id="+id;
	})

	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	$('#discuss').show();
	$('#comment').css("background-color", "#f7f7fc");
	$('#concern').hide();
	$('#fav').hide();
	$("#chat1").hide();

	$('#comment').click(function() {

		$('#discuss').show();
		$('#concern').hide();
		$('#fav').hide();
		$("#chat1").hide();
		$('#comment').css("background-color", "#f7f7fc");
		$('#focus').css("background-color", "white");
		$('#letter').css("background-color", "white");
		$('#praise').css("background-color", "white");
		if($("#comment #remind1").length){
			var data={
				"userId":userid0,
				"kind":"reply"
			};
			$("#comment #remind1").remove();
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/notice/clean",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					console.log(error);
					// alert(error);
				}
			});
		}
	})
	$('#focus').click(function() {

		$('#discuss').hide();
		$('#concern').show();
		$('#fav').hide();
		$("#chat1").hide();
		$('#comment').css("background-color", "white");
		$('#focus').css("background-color", "#f7f7fc");
		$('#letter').css("background-color", "white");
		$('#praise').css("background-color", "white");
		if($("#focus #remind1").length){
			var data={
				"userId":userid0,
				"kind":"focus"
			}
			$("#focus #remind1").remove();
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/notice/clean",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					console.log(error);
					// alert(error);
				}
			});
		}
	})
	$('#praise').click(function() {

		$('#discuss').hide();
		$('#concern').hide();
		$('#fav').show();
		$("#chat1").hide();
		$('#comment').css("background-color", "white");
		$('#focus').css("background-color", "white");
		$('#letter').css("background-color", "white");
		$('#praise').css("background-color", "#f7f7fc");
		if($("#praise #remind1").length) {
			var data = {
				"userId": userid0,
				"kind": "praise"
			}
			$("#praise #remind1").remove();
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/notice/clean",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data),
				success: function (data) {

				},
				error: function () {
					var error = "查询数据失败！";
					console.log(error);
					// alert(error);
				}
			});
		}
	})
	$('#letter').click(function() {

		$('#discuss').hide();
		$('#concern').hide();
		$('#fav').hide();
		$("#chat1").show();
		$('#comment').css("background-color", "white");
		$('#focus').css("background-color", "white");
		$('#letter').css("background-color", "#f7f7fc");
		$('#praise').css("background-color", "white");
	})

	$('body').on('click', '#seekok', function() {
		var info = $("#keyword").val();
		console.log(info);
		var url = "search.html";
		var data4 = {
			"query": info
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/index/search",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			async: false,
			data: JSON.stringify(data4),
			success: function(data) {},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
			}
		});
		window.open(url);
	})

})