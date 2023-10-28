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
	     if(userid0==""){
	     	userid0=0;
		 }
	    var data={
	    	"userId":userid0
		}
		// 新消息
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
	$("#logout").click(function(){
		var userid5=$("#userid0").text();
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

	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	$("[id=renum]").hide();
	var timer = null;
	var cur = 0;
	var len = $("#ads li").length;
	$("[id=blockid]").hide();
	//	接收板块名
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/board",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$(".right ul").append("<li id='boardname'><div>" + data[i].boardName + "</div><div id='blockid'>" + data[i].boardId + "</div></li>");
			}
			$("[id=blockid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	
	//	点进板块
	$('body').on('click', '[id=boardname]', function() {
		var boardid = $(this).children().eq(1).text();
		window.location.href = "block.html?id=" + boardid;
	})
	//	 接收热帖
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/hotPost",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table1 tbody").append("<tr><td>" + data[i].boardName + "</td><td id='title1'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='postid'>" + data[i].post.postId + "</td></tr>");
			}
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	
	//	接收板块精华
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/boardmain",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table2 tbody").append("<tr><td>" + data[i].boardName + "</td><td id='title1'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='postid'>" + data[i].post.postId + "</td></tr>");
			}
			$("[id=postid]").hide();

		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	接收推荐帖主

	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/recommendposter",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {

			for(var i = 0; i < data.length; i++) {
				$("#table3 tbody tr").append("<td><div id='userid'>" + data[i].userId + "</div><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data[i].level + "</span></div></td>");
			}
			$("[id=userid]").hide();
			// for(var i = 5; i < 8; i++) {
			// 	$("#table3 tbody").children().eq(1).append("<td><div id='userid'>" + data[i].userId + "</div><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/" + data[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.level + "</span><button id='focus'>关注</button><button id='message'>私信</button></div></td>");
			// }

		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$("[id=userid]").hide();
	//	点进帖子
	$("body").on("click","[id=title1]",function () {
		var id = $(this).parent().find("#postid").text();
		window.location.href = "post.html?id=" + id;
	})
	//	点进个人空间
	$("body").on("click","[id=name]",function () {
		var id = $(this).parent().parent().children().eq(0).text();
		window.location.href = "others.html?id=" + id;
	})

	//鼠标滑过容器停止播放
	$("#ads").hover(function() {
		clearInterval(timer);
	}, function() {
		showImg();
	});
	// 遍历所有圆点导航实现划过切换至对应的图片
	$("#ads li").click(function() {
		clearInterval(timer);
		cur = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$("#ads img").eq(cur).fadeIn(200).siblings("img").fadeOut(200);
	});

	//定义图片切换函数
	function showImg() {
		timer = setInterval(function() {
			cur++;
			if(cur >= len) {
				cur = 0;
			}
			$("#ads img").eq(cur).fadeIn(800).siblings("img").fadeOut(800);
			$("#ads li ").eq(cur).addClass("active").siblings().removeClass("active");

		}, 2000);
	}
	showImg();

	$('.top').hover(function() {
		$(this).attr('src', 'img/dingbu (1).png');

		//鼠标经过增加样式

		//鼠标离开还换为原来的图片
	}, function() {
		$(this).attr('src', 'img/dingbu.png');

		//鼠标离开减去样式
	});
	$('.top').click(function() {
		scrollTo(0, 0);
	});
	$('.service').hover(function() {
		$(this).attr('src', 'img/kefu.png');

		//鼠标经过增加样式

		//鼠标离开还换为原来的图片
	}, function() {
		$(this).attr('src', 'img/fuwupingjia-kefu.png');

		//鼠标离开减去样式
	});
	//  搜索全站
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
			async:false,
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