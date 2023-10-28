$(document).ready(function() {
	$("[id=blockid]").hide();
	$("[id=postid]").hide();
	$("#table2").hide();
	$("#table1").show();
	$(".buttons").hide();
	var local_url = document.location.href;
	//截取get字符串
	var getstr = local_url.substr(local_url.indexOf('=') + 1);
	var id = getstr;
	var datalen = 0; // data数据总条数
	var dataNum = 5; // 每页展示的数据条数
	var data = {
		"boardId": parseInt(id)
	};
	var board;
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/board/boardName",
		type: "POST",
		dataType: "json",
		async:false,
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			$(".h2").append("板块·"+data.flag);
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	接受该板块所有帖子x
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/board/allPost",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			$("#table2 tbody tr").remove();
			datalen = data;
			var temp = " ";
			$("#total").html(data.length);
			// 总页数
			var pageSize = Math.ceil(data.length / dataNum);
			$("#pageSize").html(pageSize);
			// 当前第N页
			$("#page").html(1);

			for(var i=0; i < data.length; i++) {
				$("#table2 tbody").append("<tr style='display:none;'><td>" +data[i].boardName + "</td><td id='title'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='postid'>" + data[i].post.postId + "</td></tr>");
			}
			for(var j = 0; j < dataNum; j++) {

				$("#table2 tbody tr").eq(j).show();
			}
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/board/hotPost",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$("#table1 tbody").append("<tr><td>" + data[i].boardName + "</td><td id='title'>" + data[i].post.title + "</td><td>" + data[i].username + "</td><td>" + data[i].post.replyNumber + "</td><td id='postid'>" + data[i].post.postId + "</td></tr>");
			}
            $("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			// alert(error);
		}
	});
	//	接受所有板块
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/index/board",
		type: "POST",
		dataType: "json",
		data: {},
		success: function(data) {
			for(var i = 0; i < data.length; i++) {
				$(".right1 ul").append("<li id='boardname'><div>" + data[i].boardName + "</div><div id='blockid'>" + data[i].boardId + "</div></li>");
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
		var id = $(this).children().eq(1).text();
		window.location.href = "block.html?id=" + id;
	});
	//	点进帖子
	$('body').on('click', '[id=title]', function() {
		var id = $(this).parent().children().eq(4).text();
		window.location.href = "post.html?id=" + id;
	});
	$("#hot").click(function() {
		$("#table1").show();
		$("#table2").hide();
		$(".buttons").hide();
	});
	$("#other").click(function() {
		$("#table2").show();
		$("#table1").hide();
		$(".buttons").show();
	});
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	$("#hot").click(function() {
		$("#hot").css("background-color", "white");
		$("#hot").css("border-top", "3px solid #FFA500");
		$("#hot").css("color", "#555666");
		$("#other").css("background-color", "rgba(0,0,0,0)");
		$("#other").css("border-top", "none");
		$("#other").css("color", "white");
	});
	$("#other").click(function() {
		$("#other").css("background-color", "white");
		$("#other").css("border-top", "3px solid #FFA500");
		$("#other").css("color", "#555666");
		$("#hot").css("background-color", "rgba(0,0,0,0)");
		$("#hot").css("border-top", "none");
		$("#hot").css("color", "white");
	});
	var datalen = 0; // data数据总条数
	var dataNum = 5; // 每页展示的数据条数
	
	

	/* 上一页 */
	$("#bt1").click(function() {
		var page = $("#page").html();
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table2 tbody tr").hide();
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
					$("#table2 tbody tr").eq(i02).show();
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
			$("#table2 tbody tr").hide();
			// 点击下一页时当前页数发生变化
			$("#page").html(parseInt(page) + 1);
			// 展示的数据也定位到下一页（nextData~datalen.length）
			var nextData = parseInt(page) * dataNum;
			var count = 0;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table2 tbody tr").eq(i02).show();
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
			$("#table2 tbody tr").hide();
			// 点击首页时当前页码定位到第一页
			$("#page").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table2 tbody tr").eq(i0).show();
			}
		}
	});
	/* 尾页 */
	$("#bt3").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table2 tbody tr").hide();
			// 点击尾页时页码变为最大码
			$("#page").html(pageSize);
			// 展示的数据也定位到最后一页
			var nextData = parseInt(pageSize - 1) * dataNum;
			// 从倒数第二页的最后一条往后的数据展示出来
			for(var i03 = parseInt(nextData); i03 <= datalen.length; i03++) {
				$("#table2 tbody tr").eq(i03).show();
			}
		}
	});
	$("#pageNumber").click(function() {
		var pagenumber = $("#number").val();
		var pageSize = $("#pageSize").html();
		$("#page").html(pagenumber);
		if(pagenumber == "") {
			alert("未输入内容");
		} else if(pagenumber > pageSize || pagenumber < 1) {
			alert("不包含此页");
		} else {
			$("#table2 tbody tr").hide();
			var n = (pagenumber - 1) * dataNum + 1;
			for(var i01 = n; i01 < n + dataNum; i01++) {
				$("#table2 tbody tr").eq(i01).show();
			}
		}

	})
});