$(document).ready(function() {
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
				userid0 = data.userId;
				$("#userid0").hide();
			}
			userid0 = data.userId;
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			//alert(error);
		}
	});
	var data = {
		"userId": userid0
	};
//	新消息
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
	$(".down ul li").eq(1).click(function () {
          var id=userid0;
          window.location.href="others.html?id="+id;
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
	var local_url = document.location.href;
	//截取get字符串
	var getstr = local_url.substr(local_url.indexOf('=') + 1);
	var id = getstr;
	$("#userid").append(id);
	var data = {
		"userId": parseInt(id)
	};
	$("[id=id]").hide();
	//	是否关注
	var data2 = {
		"userId": parseInt(userid0),
		"userId1":  parseInt(id)
	}
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/ifSelf",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data2),
		success: function(data) {
			if(data == 0) {
				$("#header").append("<button id='focuon1'>关注</button>")
			} else {
				$("#header").append("<button id='focuon2'>取消关注</button>")
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	var data1 = {
		"userId": parseInt(id)
	}
	//	获得他人信息
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/information",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data1),
		success: function(data) {
			$(".img").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl+"'>");
			$("#name").append(data.username);
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	//	获得帖子
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/create/postManage",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data1),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table1 tbody").append("<tr><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td><td id='id'>" + data[i].post.postId + "</td></tr>");
			}
			$("[id=id]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	//	获得收藏
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/collect",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data1),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table2 tbody").append("<tr><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td><td id='id'>" + data[i].post.postId + "</td></tr>");
			}
			$("[id=id]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	//	获得关注
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/focus",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data1),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table3 tbody").append("<tr><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td><td id='id'>" + data[i].userId + "</td></tr>");
			}
			$("[id=id]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	//	获得粉丝
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/fans",
		type: "POST",
		dataType: "json",
		data: JSON.stringify(data1),
		contentType: "application/json;charset=UTF-8",
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table4 tbody").append("<tr><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td><td id='id'>" + data[i].userId + "</td></tr>");
			}
			$("[id=id]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	//	点进帖子
	$("body").on("click","[id=topic]",function () {
		var id = $(this).parent().children().eq(4).html();
		window.location.href = "post.html?id=" + id;
	})
	//	点进用户
	$("body").on("click","[id=fname]",function () {
		var id = $(this).parent().children().eq(2).html();
		window.location.href = "others.html?id=" + id;
	})
	
	//	关注
	$("body").on("click", "#focuon1", function() {
		var id = $("#userid").text();
		var data = {
			"userId1": parseInt(id),
			"userId": parseInt(userid0)
		};
		$(this).remove();
		$("#header").append("<button id='focuon2'>取消关注</button>")
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/person/focusPerson",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				alert(error);
			}
		});
	})
	//	取消关注
	$("body").on("click", "#focuon2", function() {
		var id = $("#userid").html();
		var data = {
			"userId1": parseInt(id),
			"userId": parseInt(userid0)
		};
		$(this).remove();
		$("#header").append("<button id='focuon1'>关注</button>")
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/person/cancelFocus",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				alert(error);
			}
		});
	})
	//	私信
	$("#chat").click(function() {
		var id = $("#userid").html();
		window.location.href = "chat.html?id=" + id;
	});

	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});

	$('#con1').show();
	$('#item1').css("background-color", "#f7f7fc");
	$('#con2').hide();
	$('#con3').hide();
	$('#con4').hide();
	$('#item1').click(function() {
		$('#con1').show();
		$('#con2').hide();
		$('#con3').hide();
		$('#con4').hide();
		$('#item1').css("background-color", "#f7f7fc");
		$('#item2').css("background-color", "white");
		$('#item3').css("background-color", "white");
		$('#item4').css("background-color", "white");

	})
	$('#item2').click(function() {
		$('#con2').show();
		$('#con1').hide();
		$('#con3').hide();
		$('#con4').hide();
		$('#item2').css("background-color", "#f7f7fc");
		$('#item1').css("background-color", "white");
		$('#item3').css("background-color", "white");
		$('#item4').css("background-color", "white");

	})
	$('#item3').click(function() {
		$('#con3').show();
		$('#con2').hide();
		$('#con1').hide();
		$('#con4').hide();
		$('#item3').css("background-color", "#f7f7fc");
		$('#item2').css("background-color", "white");
		$('#item1').css("background-color", "white");
		$('#item4').css("background-color", "white");

	})
	$('#item4').click(function() {
		$('#con4').show();
		$('#con2').hide();
		$('#con3').hide();
		$('#con1').hide();
		$('#item4').css("background-color", "#f7f7fc");
		$('#item2').css("background-color", "white");
		$('#item3').css("background-color", "white");
		$('#item1').css("background-color", "white");

	})
})