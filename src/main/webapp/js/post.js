function getNow(s) {
	return s < 10 ? '0' + s : s;
}
$(document).ready(function() {
	var userid0;
	$(".usermy").hide();
	$(".messagemy").hide();
    var name;
    var level;
    var score;
    var img;
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
				$("#id").append(data.userId);
				$("#uname").append(data.username);
				$("#headimage").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
				$("#userid0").append(data.userId);
				userid0 = data.userId;
				if(data.power == "admin") {
					$("#header").append("<span id='word'><a href='admin.html'>管理页面</a></span>");
				}
				if(data.power == "moderator") {
					$("#header").append("<span id='word'><a href='moderator.html'>管理页面</a></span>");
				}
				userid0=data.userId;
				name=data.username;
				level=data.level;
				score=data.score;
				img=data.headImageUrl;
				$("#userid0").hide();
			}
			userid0 = data.userId;
		},
		error: function() {
			var error = "查询数据失败！";
			// console.log(error);
			//alert(error);
		}
	});

	var data = {
		"userId":userid0
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
				// console.log(error);
				//alert(error);
			}
		});
		$("[id=m]").hide();
		$(".down1 ul li").click(function() {
			var num = $(this).children('#m').html();
			console.log(num);
			window.location.href = "message.html?num=" + num;
		})
    // var userid1=$("#userid0").text();
	// var data0 = {
	// 	"userId": userid1
	// };

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
		// var userid5 = $("#userid0").text();
		var data1 = {
			"userId": userid0
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
    // if(userid1==""){
	//     // 	userid1=0;
	// 	// }
	var local_url = document.location.href;
	//截取get字符串
	var getstr = local_url.substr(local_url.indexOf('=') + 1);
	var id0 = getstr;
	var data2 = {
		"postId": parseInt(id0),
		"userId": userid0
	};
	var url;
	//	接受帖子
	var userid1;
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/post/load",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		async: false,
		data: JSON.stringify(data2),
		success: function(data) {
			if(data.ifCollect == 1) {
				$("#table1").append("<tr><td colspan='2' id='topic'><div id='topic1'>" + data.post.title + "</div><div id='block'><div id='plate'>板块：" + data.boardName + "</div><div id='reply'><img src='img/huifu1.png'>回复 </div><div id='coll'><img src='img/shoucang1.png'>收藏 </div></div></td></tr>");
			} else {
				$("#table1").append("<tr><td colspan='2' id='topic'><div id='topic1'>" + data.post.title + "</div><div id='block'><div id='plate'>板块：" + data.boardName + "</div><div id='reply'><img src='img/huifu1.png'>回复 </div><div id='col'><img src='img/shoucang.png'>收藏 </div></div></td></tr>");
			}
			if(data.ifPraise == 1) {
				$("#table1").append("<tr><td id='user'><div id='userid'>" + data.user.userId + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.user.headImageUrl + "'></div><div id='mati'><span id='name'>" + data.user.username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.user.level + "</span><span id='inte'>积分：" + data.user.score + "</span></div></td><td id='resp'><div id='con'>" + data.post.info + "</div><div id='option'><div id='time'>" + data.post.date+ "</div><div id='tower'>楼主</div><div id='praisel1'><img src='img/dianzan (2).png'>点赞<div id='num'>" + data.post.praise + "</div></div></div></td></tr>");
			} else {
				$("#table1").append("<tr><td id='user'><div id='userid'>" + data.user.userId + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.user.headImageUrl + "'></div><div id='mati'><span id='name'>" + data.user.username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.user.level + "</span><span id='inte'>积分：" + data.user.score + "</span></div></td><td id='resp'><div id='con'>" + data.post.info + "</div><div id='option'><div id='time'>" + data.post.date + "</div><div id='tower'>楼主</div><div id='praise1'><img src='img/dianzan.png'>点赞<div id='num'>" + data.post.praise + "</div></div></div></td></tr>");

			}
			if(data.post.whetherFile == "YES") {
				$("#block").before($("<span id='file'>下载文件</span>"));
			}
			url=data.post.fileUrl;
			userid1 = data.userId;
			$("[id=userid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			// console.log(error);
			// alert(error);
		}
	})
    $("body").on("click","#file",function () {
    	var data=new FormData();
    	data.append("fileName",url);
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/person/download",
			type: "POST",
			async:false,
			cache: false,
			secureuri: false, //一般设置为false
			processData: false, //因为data值是FormData对象，不需要对数据做处理。
			contentType:false,
			data: data,
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				// console.log(error);
				// alert(error);
			}
		})
		window.location="http://localhost:8888/mywork_war_exploded/person/download?fileName="+url;

	})

	//	接收回复
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/post/reply",
		type: "POST",
		dataType: "json",
		contentType: "application/json;charset=UTF-8",
		data: JSON.stringify(data2),
		success: function(data) {
			for(var i = 0; i < data.userList.length; i++) {
				console.log(data.ifPraiseList[i]);
				n=i+1;
				if(data.ifPraiseList[i] == 1) {
					console.log(3);
					if(userid0 == data.userList[i].userId || userid0 == userid1) {
						$("#table1 tbody").append("<tr><td id='user'><div id='userid'>" + data.userList[i].userId + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.userList[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data.userList[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.userList[i].level + "</span><span id='inte'>积分：" + data.userList[i].score + "</span></div></td><td id='resp'><div id='con'>" + data.replyList[i].replyInfo + "</div><div id='option'><div id='repid'>" + data.replyList[i].replyId + "</div><div id='time'>" + data.replyList[i].date + "</div><div id='delete'>删除评论</div><div id='tower'>#" + n + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praisel'><img src='img/dianzan (2).png'>点赞<div id='num'>" + data.replyList[i].praise + "</div></div></div></td></tr>");
					} else {
						$("#table1 tbody").append("<tr><td id='user'><div id='userid'>" + data.userList[i].userId + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.userList[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data.userList[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.userList[i].level + "</span><span id='inte'>积分：" + data.userList[i].score + "</span></div></td><td id='resp'><div id='con'>" + data.replyList[i].replyInfo + "</div><div id='option'><div id='repid'>" + data.replyList[i].replyId + "</div><div id='time'>" + data.replyList[i].date + "</div><div id='tower'>#" + n + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praisel'><img src='img/dianzan (2).png'>点赞<div id='num'>" + data.replyList[i].praise + "</div></div></div></td></tr>");
					}
				} else {
					console.log(1);
					if(userid0 == data.userList[i].userId || userid0 == userid1) {
						console.log(2);
						$("#table1 tbody").append("<tr><td id='user'><div id='userid'>" + data.userList[i].userId  + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.userList[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data.userList[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.userList[i].level + "</span><span id='inte'>积分：" + data.userList[i].score + "</span></div></td><td id='resp'><div id='con'>" + data.replyList[i].replyInfo + "</div><div id='option'><div id='repid'>" + data.replyList[i].replyId + "</div><div id='time'>" + data.replyList[i].date + "</div><div id='delete'>删除评论</div><div id='tower'>#" + n + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praise'><img src='img/dianzan.png'>点赞<div id='num'>" + data.replyList[i].praise + "</div></div></div></td></tr>");
					} else {
						console.log(4);
						$("#table1 tbody").append("<tr><td id='user'><div id='userid'>" + data.userList[i].userId  + "</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.userList[i].headImageUrl + "'></div><div id='mati'><span id='name'>" + data.userList[i].username + "</span><span id='rank'><img src='img/jibie (1).png'>" + data.userList[i].level + "</span><span id='inte'>积分：" + data.userList[i].score + "</span></div></td><td id='resp'><div id='con'>" + data.replyList[i].replyInfo + "</div><div id='option'><div id='repid'>" + data.replyList[i].replyId + "</div><div id='time'>" + data.replyList[i].date + "</div><div id='tower'>#" + n + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praise'><img src='img/dianzan.png'>点赞<div id='num'>" + data.replyList[i].praise + "</div></div></div></td></tr>");
					}

				}
			}
			$("[id=userid]").hide();
			$("[id=repid]").hide();
		},
		error: function() {
			var error = "查询数据失败！";
			// console.log(error);
			// alert(error);
		}
	})
	$("[id=repid]").hide();
	var replyid2;
	$('#write').hide();
	$("[id=replyid]").hide();

	//	提交回复

	$("#btn1").click(function() {
        var kind=0;
		var content = $(".w-e-text").html();
		console.log(content);
		var replyid = $(".w-e-text #replyid1").text();
		var i = $("#table1 tr").length - 1;
		console.log(replyid);
		if(replyid == "") {
			replyid =0 ;
			kind=1;
		}
		var myDate = new Date();
		var year = myDate.getFullYear(); //获取当前年
		var month = myDate.getMonth() + 1; //获取当前月
		var date = myDate.getDate(); //获取当前日

		var h = myDate.getHours(); //获取当前小时数(0-23)
		var m = myDate.getMinutes(); //获取当前分钟数(0-59)
		var s = myDate.getSeconds();

		var now = year + '-' + getNow(month) + "-" + getNow(date) + " " + getNow(h) + ':' + getNow(m) + ":" + getNow(s);
		//		$("#table1").append("<tr><td id='user'><div id='userid'>" + 1 + "</div><div id='tou'><img src='img/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy93dmtvY0YyTVhqV3hDVmdDdzdSVVFOVmljQmhXcHVQQXlrWVhmNkd3amZlbWlhT0gxT1doS0l3UmVmM1ViekhrclFIN0ZEWWF3OWJTVDRpY1BpYzhveHp6ZFEvNjQw.png'></div><div id='mati'><span id='name'>熬夜猝死</span><span id='rank'><img src='img/jibie (1).png'>2</span><span id='inte'>积分：15</span><button id='focus'>关注</button><button id='message'>私信</button></div></td><td id='resp'>" + content + "<div id='option'><div id='repid'>3</div><div id='time'>" + now + "</div><div id='tower'>#" + i + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praise'><img src='img/dianzan.png'>点赞11 </div></div></td></tr>");
		var data=new FormData();
		data.append("replyInfo", content);
		data.append("repliedId", parseInt(replyid));
		data.append("userId",parseInt(userid0));
		data.append("kind",kind);
		data.append("postId",parseInt(id0));
		var replyid1;
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/post/postReply",
			type: "POST",
			async:false,
			cache: false,
			secureuri: false, //一般设置为false
			processData: false, //因为data值是FormData对象，不需要对数据做处理。
			contentType:false,
			data: data,
			success: function(data) {
				replyid1 = data;
			},
			error: function() {
				var error = "查询数据失败！";
				// console.log(error);
				// alert(error);
			}
		})
		$("#table1").append("<tr><td id='user'><div id='userid'>"+userid0+"</div><div id='tou'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + img + "'></div><div id='mati'><span id='name'>" + name + "</span><span id='rank'><img src='img/jibie (1).png'>" + level + "</span><span id='inte'>积分：" + score + "</span></div></td><td id='resp'>" + content + "<div id='option'><div id='repid'>" + replyid1 + "</div><div id='time'>" + now + "</div><div id='delete'>删除评论</div><div id='tower'>#" + i + "</div><div id='res'><img src='img/huifu1.png'>回复 </div><div id='praise'><img src='img/dianzan.png'>点赞<div id='num'>0</div></div></div></td></tr>");
		$("[id=repid]").hide();
		$("[id=userid]").hide();
		$(".w-e-text").empty();
		$("#write").hide();

	})
	$("[id=userid]").hide();
	//	点击回复
	$("body").on("click", "[id=res]", function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {
			$('#write').show();
			var name = $(this).parent().parent().prev().children().eq(2).children().eq(0).text();
			var floor = $(this).prev().text();
			var id = $(this).parent().children().eq(0).text();
			$("#replyid").append(id);
			console.log(name);
			var con = $(this).parent().prev().text();
			console.log(con);
			$(".w-e-text").html("<div id='replys' contenteditable='false' ><div id='replyid1'>" + id + "</div><div id='rname'>回复   " + floor + " " + name + " :</div><div id='rcon'>" + con + "</div></div><div id='con'><br></div>");
			$("html,body").animate({
				scrollTop: $("#write").offset().top
			}, 500);
			$("[id=replyid1]").hide();
		}

	})
	//	回复帖子
	$('#reply').click(function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {

			$('#write').show();
			$("html,body").animate({
				scrollTop: 200
			}, 100);
			$("html,body").animate({
				scrollTop: $("#write").offset().top
			}, 100);
		}

	})
	//	收藏帖子

	$("body").on("click", "#col", function() {
		if(userid0 == 0) {
				alert("请先登录");
		} else {
			$(this).children().eq(0).attr("src", "img/shoucang1.png");
			$(this).attr("id", "coll");
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/post/collect",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data2),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					// console.log(error);
					// alert(error);
				}
			})
		}
	})
	//	取消收藏
	$("body").on("click", "#coll", function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {
			$(this).children().eq(0).attr("src", "img/shoucang.png");
			$(this).attr("id", "col");

			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/post/cancelCollect",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data2),
				success: function (data) {

				},
				error: function () {
					var error = "查询数据失败！";
					// console.log(error);
					// alert(error);
				}
			})
		}
	})

	//点赞
	$("body").on("click", "[id=praise]", function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {
			var replyid = $(this).parent().children().eq(0).text();
			var num = parseInt($(this).children().eq(1).text());
			console.log(num);
			$(this).children().eq(0).attr("src", "img/dianzan (2).png");
			$(this).find("#num").empty();
			$(this).find("#num").append(num + 1);
			$(this).attr("id", "praisel");
			var data3 = {
				"userId":parseInt(userid0) ,
				"replyId":parseInt(replyid) ,
                "kind":0,
				"postId":parseInt(id0)
			};
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/post/praise",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data3),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					// console.log(error);
					// alert(error);
				}
			})
		}
	})
	//	取消点赞
	$("body").on("click", "[id=praisel]", function() {
		var replyid = $(this).parent().children().eq(0).text();
		var num = parseInt($(this).children().eq(1).text());
		var data3 = {
			"userId":parseInt(userid0) ,
			"replyId":parseInt(replyid) ,
			"kind":0,
			"postId":parseInt(id0)
		};
		$(this).children().eq(0).attr("src", "img/dianzan.png");
		$(this).children().eq(1).html(num - 1);
		$(this).attr("id", "praise");
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/post/cancelPraise",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data3),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				// console.log(error);
				// alert(error);
			}
		})
	})
	// 点赞楼主
	$("body").on("click", "[id=praise1]", function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {

			var num = parseInt($(this).children().eq(1).text());
			console.log(num);
			$(this).children().eq(0).attr("src", "img/dianzan (2).png");
			$(this).find("#num").empty();
			$(this).find("#num").append(num + 1);
			$(this).attr("id", "praisel1");
			var data3 = {
				"userId":parseInt(userid0) ,
				"replyId":0 ,
                "kind":1,
				"postId":id0
			};
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/post/praise",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data3),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					// console.log(error);
					// alert(error);
				}
			})
		}
	})
	// 取消点赞楼主
	$("body").on("click", "[id=praisel1]", function() {
		if(userid0 == 0) {
			alert("请先登录");
		} else {

			var num = parseInt($(this).children().eq(1).text());
			console.log(num);
			$(this).children().eq(0).attr("src", "img/dianzan.png");
			$(this).find("#num").empty();
			$(this).find("#num").append(num - 1);
			$(this).attr("id", "praise1");
			var data3 = {
				"userId":parseInt(userid0) ,
				"replyId":0 ,
				"kind":1,
				"postId":id0
			};
			$.ajax({
				url: "http://localhost:8888/mywork_war_exploded/post/cancelPraise",
				type: "POST",
				dataType: "json",
				contentType: "application/json;charset=UTF-8",
				data: JSON.stringify(data3),
				success: function(data) {

				},
				error: function() {
					var error = "查询数据失败！";
					// console.log(error);
					// alert(error);
				}
			})
		}
	})
	//	点进个人空间
	$("body").on("click","[id=name]",function () {
		var id = $(this).parent().parent().children().eq(0).text();
		window.location.href = "others.html?id=" + id;
	})
	//删除评论
	$("body").on("click","[id=delete]",function () {
		var replyid = $(this).parent().children().eq(0).text();
		$(this).parent().parent().parent().remove();
		var data3 = {
			"replyId":parseInt(replyid) 
		};
		$.ajax({
			url: "http://localhost:8888/mywork_war_exploded/post/deleteReply",
			type: "POST",
			dataType: "json",
			contentType: "application/json;charset=UTF-8",
			data: JSON.stringify(data3),
			success: function(data) {

			},
			error: function() {
				var error = "查询数据失败！";
				// console.log(error);
				// alert(error);
			}
		})
	})
	$("#seek").click(function() {
		$("#hunt").css("visibility", "visible");
		$("#hunt").css("opacity", "1");
	});
	$("#close").click(function() {
		$("#hunt").css("visibility", "hidden");
		$("#hunt").css("opacity", "0");
	});

})