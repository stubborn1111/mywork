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
    var data={
    	"userId":userid0
	}
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
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/board",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$(".right1 ul").append("<li id='boardname'>" + data[i].boardName + "<div id='blockid'>" + data[i].boardId + "</div></li>");
			}
			$("[id=blockid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	var datalen = 0; // data数据总条数
	var datalen1 = 0;
	var dataNum = 5; // 每页展示的数据条数
	var ha="";
	var data6={"data":ha};
	//	获得搜索出来的内容
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/searchResult1",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data6),
		success: function(data) {
			$("#table1 tbody tr").remove();
			datalen = data;
			var temp = " ";
			// 总条数
			$("#total").html(data.length);
			// 总页数
			var pageSize = Math.ceil(data.length / dataNum);
			$("#pageSize").html(pageSize);
			// 当前第N页
			$("#page").html(1);
			for(var i = 0; i < data.length; i++) {
				$("#table1 tbody").append("<tr style='display:none;'><td>" + data[i].boardName + "</td><td id='title1'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='id'>" + data[i].post.postId + "</tr>");
			}
			// 默认第一页展示的数据
			for(var i = 0; i < dataNum; i++) {

				$("#table1 tbody tr").eq(i).show();
			}
			$("[id=id]").hide();

		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	搜到的用户

	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/searchResult2",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data6),
		success: function(data) {
			$("#table2 tbody").empty();
			datalen1 = data;
			var temp = " ";
			// 总条数
			$("#total1").html(data.length);
			// 总页数
			var pageSize = Math.ceil(data.length / dataNum);
			$("#pageSize1").html(pageSize);
			// 当前第N页
			$("#page1").html(1);
			for(var i = 0; i < data.length; i++) {
				$("#table2 tbody").append("<tr style='display:none;'><td id='userid'>" + data[i].userId + "</td><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td></tr>");
			}
			// 默认第一页展示的数据
			for(var i = 0; i < dataNum; i++) {

				$("#table2 tbody tr").eq(i).show();
			}
			$("[id=userid]").hide();

		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	搜索
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
	//	搜索帖子
	// $("#table1").children().eq(1).children().eq(0).hide();
	// console.log($("#table1").find("tr:visible").length);

	$("#hunt1").on('click', function() {
		var info = $("#seek1").val();
		var data={
			"query":info
		}
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/index/searchResult3",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {
				$("#table1 tbody tr").remove();
				datalen = data;
				var temp = " ";
				// 总条数
				$("#total").html(data.length);
				// 总页数
				var pageSize = Math.ceil(data.length / dataNum);
				$("#pageSize").html(pageSize);
				// 当前第N页
				$("#page").html(1);
				for(var i = 0; i < data.length; i++) {
					$("#table1 tbody").append("<tr style='display:none;'><td>" + data[i].boardName + "</td><td id='title1'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='id'>" + data[i].post.postId + "</tr>");
				}
				// 默认第一页展示的数据
				for(var i = 0; i < dataNum; i++) {

					$("#table1 tbody tr").eq(i).show();
				}
				$("[id=id]").hide();

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				// alert(error);
			}
		});

	})
	//	搜索用户
	$("#hunt2").on('click', function() {
		var info = $("#seek2").val();
		var data={
			"query":info
		}
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/index/searchResult4",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data),
			success: function(data) {
				$("#table2 tbody").empty();
				datalen1 = data;
				var temp = " ";
				// 总条数
				$("#total1").html(data.length);
				// 总页数
				var pageSize = Math.ceil(data.length / dataNum);
				$("#pageSize1").html(pageSize);
				// 当前第N页
				$("#page1").html(1);
				for(var i = 0; i < data.length; i++) {
					$("#table2 tbody").append("<tr style='display:none;'><td id='userid'>" + data[i].userId + "</td><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td></tr>");
				}
				// 默认第一页展示的数据
				for(var i = 0; i < dataNum; i++) {

					$("#table2 tbody tr").eq(i).show();
				}
				$("[id=userid]").hide();

			},
			error: function() {
				var error = "查询数据失败！";
				console.log(error);
				alert(error);
			}
		});
	})

	//  点击到板块
	$('body').on('click', '[id=boardname]', function() {
		var boardid = $(this).children("#boardid").text();
		window.location.href = "block.html?id=" + boardid;
	})
	$('body').on('click', '[id=title1]', function() {
		var id = $(this).parent().children().eq(4).text();
		window.location.href = "post.html?id=" + id;
	});
	$('body').on('click', '[id=fname]', function() {
		var id = $(this).parent().children().eq(0).text();
		window.location.href = "others.html?id=" + id;
	});
	$("[id=userid]").hide();
	$("#user").hide();
	$("#item").click(function() {
		$(".post").show();
		$("#user").hide();
		$("#item").css("color", " #94070A");
		$("#item1").css("color", " rgb(51 74 114)");
	})
	$("#item1").click(function() {
		$(".post").hide();
		$("#user").show();
		$("#item1").css("color", " #94070A");
		$("#item").css("color", " rgb(51 74 114)");
	})

	/* 上一页 */
	$("#bt1").click(function() {
		var page = $("#page").html();
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table1 tbody tr").hide();
			// 点击上一页时当前页数发生变化
			$("#page").html(parseInt(page) - 1);
			var count = 0;
			// 定位到上一页
			var beforePage = parseInt(page) - 1; // 假设是2
			// 显示的数据则是上上一页的后一页，即：
			var nextData = parseInt(beforePage - 1) * dataNum;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table1 tbody tr").eq(i02).show();
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
			$("#table1 tbody tr").hide();
			// 点击下一页时当前页数发生变化
			$("#page").html(parseInt(page) + 1);
			// 展示的数据也定位到下一页（nextData~datalen.length）
			var nextData = parseInt(page) * dataNum;
			var count = 0;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table1 tbody tr").eq(i02).show();
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
			$("#table1 tbody tr").hide();
			// 点击首页时当前页码定位到第一页
			$("#page").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table1 tbody tr").eq(i0).show();
			}
		}
	});
	/* 尾页 */
	$("#bt3").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table1 tbody tr").hide();
			// 点击尾页时页码变为最大码
			$("#page").html(pageSize);
			// 展示的数据也定位到最后一页
			var nextData = parseInt(pageSize - 1) * dataNum;
			// 从倒数第二页的最后一条往后的数据展示出来
			for(var i03 = parseInt(nextData); i03 <= datalen.length; i03++) {
				$("#table1 tbody tr").eq(i03).show();
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
			$("#table1 tbody tr").hide();
			var n = (pagenumber - 1) * dataNum + 1;
			for(var i01 = n; i01 < n + dataNum; i01++) {
				$("#table1 tbody tr").eq(i01).show();
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
			for(var i02 = parseInt(nextData); i02 <= datalen1.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table2 tbody tbody tr").eq(i02).show();
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
			for(var i02 = parseInt(nextData); i02 <= datalen1.length; i02++) {
				count += 1;
			if(count <= dataNum) {
				$("#table2 tbody tr").eq(i02).show();
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
		$("#table2 tr").hide();
		// 点击首页时当前页码定位到第一页
		$("#page1").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table2 tbody tr").eq(i0).show();
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
			for(var i03 = parseInt(nextData); i03 <= datalen1.length; i03++) {
				$("#table2 tbody tr").eq(i03).show();
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
				$("#table2 tbody tr").eq(i01).show();
			}
		}

	})
});