$(document).ready(function() {
     var userid0;
	$(".usermy").hide();
	$(".messagemy").hide();
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/Usercontroller/userStatusCheck",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			if(data.userId != 0 && data.power == "admin") {
				$(".login").hide();
				$(".register").hide();
				$(".usermy").show();
				$(".messagemy").show();
				$("#name").append(data.username);
				$("#header .img").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#headimage").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#userid0").append(data.userId);
				userid0 = data.userId;
				$("#userid0").hide();
			} else {
				window.location.href = "index.html";
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			//alert(error);
		}
	});
	var data0 = {
		"userId": userid0
	};
	//		新消息
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/notice/noticeNumber",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data0),
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
			data: JSON.stringify(data0),
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
	$("[id=blockid]").hide();
	//得到板块名
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/board",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#sortname").append("<option value='" + i + "'>" + data[i].boardName + "</option>");
				$("#sortname1").append("<option value='" + i + "'>" + data[i].boardName + "</option>");
				$("#adb").append("<div id='block1'><div id='blockname'>" + data[i].boardName + "</div><div id='delete'>删除</div><div id='blockid'>" + data[i].boardId + "</div></div>");
				a[i] = data[i].boardId;
			}
			$("[id=blockid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	var datalen = 0; // data数据总条数
	var dataNum = 5; // 每页展示的数据条数
	//	展示所有帖子x
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/post",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			datalen = data;
			var temp = " ";
			$("#total1").html(data.length);
			// 总页数
			var pageSize = Math.ceil(data.length / dataNum);
			$("#pageSize1").html(pageSize);
			// 当前第N页
			$("#page1").html(1);
			for(var i = 0; i < data.length; i++) {
				$("#table2").append("<tr style='display:none;'><td id='blo'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='postid'>" + data[i].post.postId + "</td><td id='del'>删除</td><td id='fav'><img src='img/dianzan.png'>" + data[i].post.praise + "</td><td id='reply'><img src='img/huifu1.png'>" + data[i].post.replyNumber + "</td></tr>");
			}
			for(var j = 0; j < dataNum; j++) {

				$("#table2 tr").eq(j).show();
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
	$("[id=userid]").hide();
	var datalen1 = 0; // data数据总条数
	var datanumber;
	//	展示所有用户x
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/user",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			$("#table1 tbody tr").remove();
			datalen1 = data;
			var temp = " ";
			$("#total").html(data.length);
			datanumber = data.length;
			// 总页数
			var pageSize = Math.ceil(data.length / dataNum);
			$("#pageSize").html(pageSize);
			// 当前第N页
			$("#page").html(1);
			for(var i = 0; i < data.length; i++) {
				if(data[i].user.power != "moderator")
					$("#table1").append("<tr style='display:none;'><td id='userid'>" + data[i].user.userId + "</td><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].user.headImageUrl + "'></div></td><td id='fname'>" + data[i].user.username + "</td><td id='cancel'>删除</td><td id='addblocker'>任命版主</td></tr>");
				else
					$("#table1").append("<tr style='display:none;'><td id='userid'>" + data[i].user.userId + "</td><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].user.headImageUrl + "'></div></td><td id='fname'>" + data[i].user.username + "</td><td id='blocker'>" + data[i].boardName + "版主</td><td id='cancel'>删除</td><td id='deblocker'>取消任命</td></tr>");
			}
			for(var j = 0; j < dataNum; j++) {

				$("#table1 tr").eq(j).show();
			}
			$("[id=userid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$("body").on("click","[id=fname]",function () {
       var id=$(this).parent().children().eq(0).text();
       window.location.href="others.html?id="+id;
	})
	$("body").on("click","[id=topic]",function () {
		var id=$(this).next().text();
		window.location.href="post.html?id="+id;
	})
	//	搜索用户
	$("#seek1").click(function() {
		var text = $("#key").val();
		if($.trim(text) != "") {
			$("#table1 tr").hide().filter(":contains('" + text + "')").show();
		} else {
			$("#table1").hide();
			alert("未输入任何信息");
		}
	})
	//搜索帖子
	$("#seek2").click(function() {
		var text = $("#key1").val();
		var block = $("#sortname1").find("option:selected").text();
		$("#table2 tr #topic").not(":contains('" + text + "')").parent().hide();
		$("#table2 tr:visible #blo").not(":contains('" + block + "')").parent().hide();
	})
	$("[id=userid0]").hide();
	//	任命版主
	var x = 0;
	$('body').on('click', '[id=addblocker]', function() {
		$("#userid1").empty();
		var id = $(this).parent().children().eq(0).text();
		var name = $(this).parent().children().eq(2).text();
		$("#table1").hide();
		$("#appoint").show();
		$("#search").hide();
		$("#user").append("用户名：" + name);
		$("#userid1").append(id);
		$(".buttons").hide();

		x++;
		$(this).parent().append("<td id='deblocker'>取消任命</td><td id='blocker" + x + "'></td>");
		$(this).remove();
	})
	//	确认任命x
	$('body').on('click', '[id=sure]', function() {
		var block = $("#sortname").val();
		var blockname = $("#sortname").find("option:selected").text();
		$("#blocker" + x).append(blockname + "版主");
		var blockid = a[block];
		var id = $("#userid1").text();
		var data = {
			"userId": parseInt(id),
			"boardId": parseInt(blockid)
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/appointboardhost",
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
		$("#table1").show();
		$("#appoint").hide();
		$("#search").show();
	})
	//	取消任命x
	$('body').on('click', '[id=deblocker]', function() {
		var id = $(this).parent().children().eq(0).text();
		var data = {
			"userId": parseInt(id)
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/cancelBoardHost",
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
		$(this).parent().children().eq(5).remove();
		$(this).parent().append("<td id='addblocker'>任命板块</td>");
		$(this).remove();
	})
	//	删除用户
	$('body').on('click', '[id=cancel]', function() {

		var id = $(this).parent().children().eq(0).text();
		var data = {
			"userId": parseInt(id)
		};
		$(this).parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/deleteuser",
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
	})
	//  删除帖子
	$('body').on('click', '[id=del]', function() {
		var postid = $(this).parent().children().eq(2).text();
		var data = {
			"postId": parseInt(postid)
		};
		$(this).parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/deletePost",
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
	})
	//删除板块
	$('body').on('click', '[id=delete]', function() {
		var blockid = $(this).next().text();
		console.log(blockid);
		var data = {
			"boardId": parseInt(blockid)
		};

		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/deleteboard",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {
				if(data.flag == 1) {
					$(this).parent().remove();
				} else {
					alert("该板块含有帖子，删除失败");
				}
			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
			}
		});
	})

	//	待审核帖子
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/postReview",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table4").append("<tr><td><div id='postid'>" + data[i].post.postId + "</div><div id='posttopic'>" + data[i].post.title + "</div><div id='postblock'>板块：" + data[i].boardName + "</div><div id='postcontent'>" + data[i].post.info + "</div><div id='agree1'>通过</div><div id='disagree1'>驳回</div></td></tr>");
			}
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$("[id=postid]").hide();
	//通过审核帖子
	$('body').on('click', '[id=agree1]', function() {

		var postid = $(this).parent().children().eq(0).text();
		console.log(postid);
		var data = {
			"postId": parseInt(postid),
			"review": 0
		};
		$(this).parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/checkPost",
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
	})
	//拒绝审核管理
	$('body').on('click', '[id=disagree1]', function() {

		var postid = $(this).parent().children().eq(0).text();
		console.log(postid);
		var data = {
			"postId": parseInt(postid),
			"review": 1
		};
		$(this).parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/checkPost",
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
	})
	//  待审核管理员
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/adiminReview",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table3").append("<tr><td id='userid1'>" + data[i].userId + "</td><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td><td><div id='agree'>同意</div></td><td><div id='disagree'>拒绝</div></td></tr>");
			}
			$("[id=userid1]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$("[id=userid1]").hide();
	//拒绝审核管理
	$('body').on('click', '[id=disagree]', function() {

		var userid = $(this).parent().parent().children().eq(0).text();
		console.log(userid);
		var data = {
			"userId": parseInt(userid),
			"review": 0
		};
		$(this).parent().parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/checkadmin",
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
	})
	//通过审核管理
	$('body').on('click', '[id=agree]', function() {
		var userid = $(this).parent().parent().children().eq(0).text();
		console.log(userid);
		var data = {
			"userId": parseInt(userid),
			"review": 1
		};
		$(this).parent().parent().remove();
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/admin/checkadmin",
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
	})
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	$('#auser').show();
	$('#aduser').css("background-color", "#f7f7fc");
	$('#apost').hide();
	$('#ablock').hide();
	$('#app').hide();
	$('#acheck').hide();
	$('#acheckpost').hide();
	$('#aduser').click(function() {
		$('#auser').show();
		$('#apost').hide();
		$('#ablock').hide();
		$('#app').hide();
		$('#acheck').hide();
		$('#aduser').css("background-color", "#f7f7fc");
		$('#adpost').css("background-color", "white");
		$('#acheckpost').hide();
		$('#checkpost').css("background-color", "white");
		$('#check').css("background-color", "white");
		$("#adblock").css("background-color", "white");
	});
	$('#adpost').click(function() {
		$('#auser').hide();
		$('#apost').show();
		$('#ablock').hide();
		$('#app').hide();
		$('#acheck').hide();
		$('#aduser').css("background-color", "white");
		$('#adpost').css("background-color", "#f7f7fc");
		$('#acheckpost').hide();
		$('#checkpost').css("background-color", "white");
		$('#check').css("background-color", "white");
		$("#adblock").css("background-color", "white");
	});
	$("#appoint").hide();
	$('#adblock').click(function() {
		$('#auser').hide();
		$('#apost').hide();
		$('#ablock').show();
		$('#app').hide();
		$('#acheck').hide();
		$('#acheckpost').hide();
		$('#checkpost').css("background-color", "white");
		$('#aduser').css("background-color", "white");
		$('#adpost').css("background-color", "white");

		$('#check').css("background-color", "white");
		$("#adblock").css("background-color", "#f7f7fc");
	});
	$('#check').click(function() {
		$('#auser').hide();
		$('#apost').hide();
		$('#ablock').hide();
		$('#app').hide();
		$('#acheck').show();
		$('#acheckpost').hide();
		$('#checkpost').css("background-color", "white");
		$('#aduser').css("background-color", "white");
		$('#adpost').css("background-color", "white");

		$('#check').css("background-color", "#f7f7fc");
		$("#adblock").css("background-color", "white");
	});
	$('#checkpost').click(function() {
		$('#auser').hide();
		$('#apost').hide();
		$('#ablock').hide();
		$('#app').hide();
		$('#acheck').hide();
		$('#acheckpost').show();
		$('#checkpost').css("background-color", "#f7f7fc");
		$('#aduser').css("background-color", "white");
		$('#adpost').css("background-color", "white");

		$('#check').css("background-color", "white");
		$("#adblock").css("background-color", "white");
	});
	$("[id=cancel]").hide();
	$("[id=addblocker]").hide();
	$("#table1 tr").hover(function() {
		$(this).children("td").eq(3).show();
		$(this).children("td").eq(4).show();
	}, function() {
		$(this).children("td").eq(3).hide();
		$(this).children("td").eq(4).hide();
	});
	$("#addb").hide();
	$("#ad").click(function() {
		$("#ad").css("border-bottom", "3px solid #0078D7");
		$("#add").css("border-bottom", "0");
		$("#adb").show();
		$("#addb").hide();
	});
	$("#add").click(function() {
		$("#add").css("border-bottom", "3px solid #0078D7");
		$("#ad").css("border-bottom", "0");
		$("#adb").hide();
		$("#addb").show();
	})
	/* 上一页 */
	$("#bt1").click(function() {
		var page = $("#page").html();
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table1 tr").hide();
			// 点击上一页时当前页数发生变化
			$("#page").html(parseInt(page) - 1);
			var count = 0;
			// 定位到上一页
			var beforePage = parseInt(page) - 1; // 假设是2
			// 显示的数据则是上上一页的后一页，即：
			var nextData = parseInt(beforePage - 1) * dataNum;
			for(var i02 = parseInt(nextData); i02 <= datalen1.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table1 tr").eq(i02).show();
				}
			}
		}

	});
	/* 下一页 */
	$("#bt2").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		// 当前页码小于总页码时
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table1 tr").hide();
			// 点击下一页时当前页数发生变化
			$("#page").html(parseInt(page) + 1);
			// 展示的数据也定位到下一页（nextData~datalen.length）
			var nextData = parseInt(page) * dataNum;
			var count = 0;
			for(var i02 = parseInt(nextData); i02 <= datalen1.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table1 tr").eq(i02).show();
				}
			}
		}

	});
	/* 首页 */
	$("#bt0").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		// 当前页码大1时
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table1 tr").hide();
			// 点击首页时当前页码定位到第一页
			$("#page").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table1 tr").eq(i0).show();
			}
		}
	});
	/* 尾页 */
	$("#bt3").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table1 tr").hide();
			// 点击尾页时页码变为最大码
			$("#page").html(pageSize);
			// 展示的数据也定位到最后一页
			var nextData = parseInt(pageSize - 1) * dataNum;
			// 从倒数第二页的最后一条往后的数据展示出来
			for(var i03 = parseInt(nextData); i03 <= datalen1.length; i03++) {
				$("#table1 tr").eq(i03).show();
			}
		}
	});
	$("#pageNumber").click(function() {
		var pagenumber = $("#number").val();
		var pageSize = $("#pageSize").html();
		if(pagenumber == "") {
			alert("未输入内容");
		} else if(pagenumber > pageSize || pagenumber < 1) {
			alert("不包含此页");
		} else {
			$("#table1 tr").hide();
			var n = (pagenumber - 1) * dataNum + 1;
			for(var i01 = n; i01 < n + dataNum; i01++) {
				$("#table1 tr").eq(i01).show();
			}
		}

	})
	/* 上一页 */
	$("#bt01").click(function() {
		var page = $("#page1").html();
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table2 tr").hide();
			// 点击上一页时当前页数发生变化
			$("#page1").html(parseInt(page) - 1);
			var count = 0;
			// 定位到上一页
			var beforePage = parseInt(page) - 1; // 假设是2
			// 显示的数据则是上上一页的后一页，即：
			var nextData = parseInt(beforePage - 1) * dataNum;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table2 tr").eq(i02).show();
				}
			}
		}

	});
	/* 下一页 */
	$("#bt02").click(function() {
		var page = $("#page1").html();
		var pageSize = $("#pageSize1").html();
		// 当前页码小于总页码时
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table2 tr").hide();
			// 点击下一页时当前页数发生变化
			$("#page1").html(parseInt(page) + 1);
			// 展示的数据也定位到下一页（nextData~datalen.length）
			var nextData = parseInt(page) * dataNum;
			var count = 0;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table2 tr").eq(i02).show();
				}
			}
		}

	});
	/* 首页 */
	$("#bt00").click(function() {
		var page = $("#page1").html();
		var pageSize = $("#pageSize1").html();
		// 当前页码大1时
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table1 tr").hide();
			// 点击首页时当前页码定位到第一页
			$("#page").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table2 tr").eq(i0).show();
			}
		}
	});
	/* 尾页 */
	$("#bt03").click(function() {
		var page = $("#page1").html();
		var pageSize = $("#pageSize1").html();
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table2 tr").hide();
			// 点击尾页时页码变为最大码
			$("#page1").html(pageSize);
			// 展示的数据也定位到最后一页
			var nextData = parseInt(pageSize - 1) * dataNum;
			// 从倒数第二页的最后一条往后的数据展示出来
			for(var i03 = parseInt(nextData); i03 <= datalen.length; i03++) {
				$("#table2 tr").eq(i03).show();
			}
		}
	});
	$("#pageNumber1").click(function() {
		var pagenumber = $("#number1").val();
		var pageSize = $("#pageSize1").html();
		if(pagenumber == "") {
			alert("未输入内容");
		} else if(pagenumber > pageSize || pagenumber < 1) {
			alert("不包含此页");
		} else {
			$("#table2 tr").hide();
			var n = (pagenumber - 1) * dataNum + 1;
			for(var i01 = n; i01 < n + dataNum; i01++) {
				$("#table2 tr").eq(i01).show();
			}
		}

	})
})