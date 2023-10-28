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
				$("#header").append("<div class='img'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'></div><div id='name'>" + data.username + "</div>")
			} else {
				window.location.href = "index.html";
			}
			$("[id=userid0]").hide();
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
	$("[id=m]").hide();
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
	//  创作首页数量
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/create/information",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			$("#praise #pra").append(data.praiseNumber);
			$("#collect #pra").append(data.collectNumber);
			$("#com #pra").append(data.replyNumber);
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			//alert(error);
		}
	});
	//	获得板块名
	var a = new Array();
	$("[id=blockid]").hide();
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/board",
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
	//	获得帖子
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/person/allPost",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				if(data[i].post.whetherReview=="YES"){
					if(data[i].post.review==1){
						$("#table2").append("<tr><td id='postid'>" + data[i].post.postId + "</td><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='delete1'>删除</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td><td>  （未过） </td></tr>");
					}else{
						$("#table2").append("<tr><td id='postid'>" + data[i].post.postId + "</td><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='delete1'>删除</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td><td> （已过）</td></tr>");
					}
				}else{
					$("#table2").append("<tr><td id='postid'>" + data[i].post.postId + "</td><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='delete1'>删除</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td><td> （待审）</td></tr>");
				}

			}
			var n = data.length - 1;
			$("#table1 tr").append("<td id='postid'>" + data[n].post.postId + "</td><td id='blo'><span id='block'>" + data[n].boardName + "</span></td><td id='topic'>" + data[n].post.title + "</td><td id='delete1'>删除</td><td id='fav'><img src='img/dianzan.png'>" + data[n].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[n].post.replyNumber + "</td>");
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	获得评论
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/create/allReply",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table3").append("<tr><td><div id='repost'><div id='me'>我  评论了  </div><div id='post1'> " + data[i].title + "</div><div id='postid'>" + data[i].reply.postId + "</div><div id='delete'>删除</div></div><div id='reply1'>" + data[i].reply.replyInfo + "</div><div id='replyid'>" + data[i].reply.replyId + "</div></td></tr>");
			}
			$("[id=postid]").hide();
			$("[id=replyid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	搜索
	$("#seek1").click(function() {
		var text = $("#key").val();
		var block = $("#sortname").find("option:selected").text();
		$("#table2 tr #topic").not(":contains('" + text + "')").parent().hide();
		$("#table2 tr:visible #blo").not(":contains('" + block + "')").parent().hide();
	})
	//  点进帖子
	$("body").on("click", "[id=topic]", function() {
		var id = $(this).parent().children().eq(0).text();
		window.location.href = "post.html?id=" + id;
	})
	$("body").on("click", "[id=post1]", function() {
		var id = $(this).next().text();
		window.location.href = "post.html?id=" + id;
	})
	//	删除评论x
	$("body").on("click", "[id=delete]", function() {
		var id = $(this).prev().text();
		$(this).parent().parent().parent().remove();
		var data1 = {
			"replyId":parseInt(id) 
		};
		
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/post/deleteReply",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data1),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
			}
		});
	})
	//  删除帖子
	$("body").on("click", "[id=delete1]", function() {
		var id = $(this).parent().children().eq(0).text();
		$(this).parent().remove();
		var data1 = {
			"postId":parseInt(id) 
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/deletePost",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data1),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
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
	$('#adindex').show();
	$('#index').css("background-color", "#f7f7fc");
	$('#adpost').hide();
	$('#adcom').hide();
	$('#index').click(function() {
		$('#adindex').show();
		$('#adpost').hide();
		$('#adcom').hide();
		$('#index').css("background-color", "#f7f7fc");
		$('#post').css("background-color", "white");
		$('#com1').css("background-color", "white");

	})
	$('#com1').click(function() {
		$('#adindex').hide();
		$('#adpost').hide();
		$('#adcom').show();
		$('#index').css("background-color", "white");
		$('#post').css("background-color", "white");
		$('#com1').css("background-color", "#f7f7fc");

	})
	$('#post').click(function() {
		$('#adindex').hide();
		$('#adpost').show();
		$('#adcom').hide();
		$('#index').css("background-color", "white");
		$('#post').css("background-color", "#f7f7fc");
		$('#com1').css("background-color", "white");
	})
	$("#upload").click(function() {
		window.location.href = "create.html";
	})
})