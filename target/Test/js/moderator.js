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
			if(data.userId != 0 && data.power == "moderator") {
				$(".login").hide();
				$(".register").hide();
				$(".usermy").show();
				$(".messagemy").show();
				$("#headimage").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#userid0").append(data.userId);
				$("#header").append("<div class='img'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'></div><div id='name'>" + data.username + "</div>")
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
	$("[id=postid]").hide();
	$("#postid1").hide();

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
				$("#sortname1").append("<option value='" + i + "'>" + data[i].boardName + "</option>");
				a[i] = data[i].boardId;
			}
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});

	//	展示所有帖子x
	var data={
		"userId":userid0
	};
	var dataNum=5;
	var datalen;
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/boardHost/boardHostPost",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data),
		success: function(data) {
			$("#table4 tbody tr").remove();
			datalen = data.postList;
			var temp = " ";
			$("#total").html(data.postList.length);
			// 总页数
			var pageSize = Math.ceil(data.postList.length / dataNum);
			$("#pageSize").html(pageSize);
			// 当前第N页
			$("#page").html(1);
			for(var i = 0; i < data.postList.length; i++) {
				if(data.postList[i].whetherTop==1){
					$("#table4 tbody").append("<tr style='display:none;'><td id='postid'>" + data.postList[i].postId + "</td><td><div id='posttopic'>" + data.postList[i].title + "</div><div id='item'><div id='postblock'>板块：" + data.boardName + "</div><div id='writer'>发帖人：" + data.usernameList[i] + "</div></div><div id='postcontent'>内容：" + data.postList[i].info + "</div><div id='canceltop'>取消置顶</div><div id='disagree1'>删除</div><div id='move'>移动</div></td></tr>");
				}else{
					$("#table4 tbody").append("<tr style='display:none;'><td id='postid'>" + data.postList[i].postId + "</td><td><div id='posttopic'>" + data.postList[i].title + "</div><div id='item'><div id='postblock'>板块：" + data.boardName + "</div><div id='writer'>发帖人：" + data.usernameList[i] + "</div></div><div id='postcontent'>内容：" + data.postList[i].info + "</div><div id='agree1'>置顶</div><div id='disagree1'>删除</div><div id='move'>移动</div></td></tr>");
				}
			}
			for(var j = 0; j < dataNum; j++) {

				$("#table4 tbody tr").eq(j).show();
			}
			$("[id=postid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	$("#seek1").click(function() {
		var text = $("#key").val();
		$("#table4 tr #topic").not(":contains('" + text + "')").parent().hide();
	})
	$("#move1").hide();
	$("body").on("click", "[id=move]", function() {
		$("#move1").show();
		$("#acheckpost").hide();
		var id = $(this).parent().parent().children().eq(0).text();
		$("#postid1").empty();
		$("#postid1").append(id);
	})
	//	确认移动
	$("#moveok").click(function() {
		var board = $("#sortname1").val();
		var boardid = a[board];
		var id = $("#postid1").text();
		$("#table4 tr").find('td').each(function() {
			if($(this).index() == "0") {
				if($(this).text() == id) {
					$(this).parent().empty();
				}
			}
		})
		$("#move1").hide();
		$("#acheckpost").show();
		var data = {
			"postId":parseInt(id) ,
			"boardId":parseInt(boardid)
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/boardHost/movePost",
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
	$("body").on("click","[id=cancel]",function(){
		$("#move1").hide();
		$("#acheckpost").show();
	})
//	置顶
    $("body").on("click", "[id=agree1]", function() {
    	var postid=$(this).parent().prev().text();
    	var top = $(this).parent().parent(); 
    	$(this).empty();
    	$(this).append("取消置顶");
    	$(this).attr("id","canceltop");
        $("#table4").prepend(top); 
    	var data = {
			"postId":parseInt(postid) 
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/boardHost/topPost",
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
    $("body").on("click", "[id=canceltop]", function() {
    	$(this).empty();
    	$(this).append("置顶");
    	$(this).attr("id","agree1");
    	var postid=$(this).parent().prev().text();
    	var data = {
			"postId":parseInt(postid) 
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/boardHost/cancelTopPost",
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
    $("body").on("click", "[id=disagree1]", function() {
    	$(this).parent().parent().remove();
    	var postid=$(this).parent().prev().text();
    	var data = {
			"postId":parseInt(postid) 
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/boardHost/deletePost",
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
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});
	/* 上一页 */
	$("#bt1").click(function() {
		var page = $("#page").html();
		if(parseInt(page) > 1) {
			// 先隐藏所有的行（数据）
			$("#table4 tbody tr").hide();
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
					$("#table4 tbody tr").eq(i02).show();
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
			$("#table4 tbody tr").hide();
			// 点击下一页时当前页数发生变化
			$("#page").html(parseInt(page) + 1);
			// 展示的数据也定位到下一页（nextData~datalen.length）
			var nextData = parseInt(page) * dataNum;
			var count = 0;
			for(var i02 = parseInt(nextData); i02 <= datalen.length; i02++) {
				count += 1;
				if(count <= dataNum) {
					$("#table4 tbody tr").eq(i02).show();
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
			$("#table4 tbody tr").hide();
			// 点击首页时当前页码定位到第一页
			$("#page").html(1);
			// 展示的数据也定位到第一页（1~dataNum条）
			for(var i0 = 0; i0 < dataNum; i0++) {
				$("#table4 tbody tr").eq(i0).show();
			}
		}
	});
	/* 尾页 */
	$("#bt3").click(function() {
		var page = $("#page").html();
		var pageSize = $("#pageSize").html();
		if(parseInt(page) < parseInt(pageSize)) {
			// 先隐藏所有的行（数据）
			$("#table4 tbody tr").hide();
			// 点击尾页时页码变为最大码
			$("#page").html(pageSize);
			// 展示的数据也定位到最后一页
			var nextData = parseInt(pageSize - 1) * dataNum;
			// 从倒数第二页的最后一条往后的数据展示出来
			for(var i03 = parseInt(nextData); i03 <= datalen.length; i03++) {
				$("#table4 tbody tr").eq(i03).show();
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
			$("#table4 tbody tr").hide();
			var n = (pagenumber - 1) * dataNum + 1;
			for(var i01 = n; i01 < n + dataNum; i01++) {
				$("#table4 tbody tr").eq(i01).show();
			}
		}

	})

})