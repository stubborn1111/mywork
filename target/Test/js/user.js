

$(document).ready(function () {
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
        success: function (data) {
            if (data.userId != 0) {
                $(".login").hide();
                $(".register").hide();
                $(".usermy").show();
                $(".messagemy").show();
                $("#headimage").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
                $("#header .img").append("<img src='http://localhost:8888/mywork_war_exploded/headImage/" + data.headImageUrl + "'>");
                $("#userid0").append(data.userId);
                $("#id").append(data.userId);
                $("#id").hide();
                $("#uname").append(data.username);
                $("#name").append(data.username);
                $("#grade").append("<img src='img/jifen.png'>积分：" + data.score + "分");
                $("#rank").append("<img src='img/jibie (1).png'>等级：" + data.level + "级");
                $("#estate").append(data.level + "级");
                $("#inte").append(data.score + "分");
                userid0 = data.userId;
                if (data.power == "admin") {
                    $("#header").append("<span id='word'><a href='admin.html'>管理页面</a></span>");
                }
                if (data.power == "moderator") {
                    $("#header").append("<span id='word'><a href='moderator.html'>版主页面</a></span>");
                }
                $("#userid0").hide();
            } else {
                window.location.href = "index.html";
            }
        },
        error: function () {
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
    $("#quit").click(function () {
        $.ajax({
            url: "http://localhost:8888/mywork_war_exploded/Usercontroller/logOut",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (data) {
                window.location.href = "login.html";
            },
            error: function () {
                var error = "查询数据失败！";
                console.log(error);
                //alert(error);
            }
        });
    })
    $("#logout").click(function () {
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
            success: function (data) {
                window.location.href = "login.html";
            },
            error: function () {
                var error = "查询数据失败！";
                console.log(error);
                //alert(error);
            }
        });
    })
    var userid2 = $("#userid0").text();
    console.log(userid2);
    //	个人信息获取
    var data1 = {
        "userId": parseInt(userid2)
    };
    //	截取头像,传给后端



    var clipArea = new bjj.PhotoClip("#clipArea", {
        size: [260, 260],
        outputSize: [640, 640],
        file: "#file",
        view: "#view",
        ok: "#clipBtn",
        loadStart: function () {
            console.log("照片读取中");
        },
        loadComplete: function () {
            console.log("照片读取完成");
        },
        clipFinish: function (dataURL) {
            console.log(dataURL);
            $("#header .img img").attr("src", dataURL);
            $("#headimage img").attr("src", dataURL);
            $("#change").click(function () {

                var base64Data = dataURL;
                var bytes = window.atob(dataURL.split(',')[1]);
                var array = [];
                for(var i = 0; i < bytes.length; i++) {
                    array.push(bytes.charCodeAt(i));
                }
                var blob = new Blob([new Uint8Array(array)], {
                    type: 'image/jpeg'
                });
                var fd = new FormData();
                fd.append("headImage", blob,Date.now()+'.jpg');
                console.log(fd);

                $.ajax({
                    url: "http://localhost:8888/mywork_war_exploded/person/changeheadImage",
                    type: "post",
                    async: false,
                    cache: false,
                    secureuri: false, //一般设置为false
                    processData: false, //因为data值是FormData对象，不需要对数据做处理。
                    contentType: false,
                    data: fd,
                    success: function (data) {

                    },
                    error: function () {
                        var error = "查询数据失败！";
                        console.log(error);
                        //						alert(error);
                    }
                });
            })

        }
    });
    //	收藏帖子获取
    $.ajax({
        url: "http://localhost:8888/mywork_war_exploded/person/collect",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data1),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#table1").append("<tr><td id='bl'><span id='block'>" + data[i].boardName + "</span></td><td id='topic'>" + data[i].post.title + "</td><td id='postid'>" + data[i].post.postId + "</td><td id='qx'>取消收藏</td></tr>");
            }
            $("[id=postid]").hide();
        },
        error: function () {
            var error = "查询数据失败！";
            console.log(error);
//			alert(error);
        }
    });
    //	关注的人获取
    $.ajax({
        url: "http://localhost:8888/mywork_war_exploded/person/focus",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data1),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#table2").append("<tr><td id='pic'><div class='himg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fname'>" + data[i].username + "</td><td id='userid'>" + data[i].userId + "</td><td id='cancel'>取消关注</td></tr>")
            }
        },
        error: function () {
            var error = "查询数据失败！";
            console.log(error);
//			alert(error);
        }
    });
    //	粉丝获取
    $.ajax({
        url: "http://localhost:8888/mywork_war_exploded/person/fans",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data1),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#table3").append("<tr><td id='fpic'><div class='fhimg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='fsname'>" + data[i].username + "</td><td id='userid'>" + data[i].userId + "</td><td id='focuson'>关注</td></tr>")
            }
            $("[id=userid]").hide();
        },
        error: function () {
            var error = "查询数据失败！";
            console.log(error);
//			alert(error);
        }
    });
    //	好友获取
    $.ajax({
        url: "http://localhost:8888/mywork_war_exploded/person/friend",
        type: "POST",
        dataType: "json",
        contentType: "application/json;charset=UTF-8",
        data: JSON.stringify(data1),
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                $("#table4").append("<tr><td id='fpic'><div class='fhimg'><img src='http://localhost:8888/mywork_war_exploded/headImage/" + data[i].headImageUrl + "'></div></td><td id='frname'>" + data[i].username + "</td><td id='userid'>" + data[i].userId + "</td><td id='chat'>私信</td></tr>");
            }
            $("[id=userid]").hide();
        },
        error: function () {
            var error = "查询数据失败！";
            console.log(error);
//			alert(error);
        }
    });
    //	修改密码
    $("#changep").click(function () {
        var pwd = $("#ypwd").val();
        var npwd = $("#xpwd").val();
        var data = {
            "userId": parseInt(userid0),
            "password": parseInt(pwd),
            "newpwd": parseInt(npwd)
        };
        if (npwd != "") {
            $.ajax({
                url: "http://localhost:8888/mywork_war_exploded/person/updatepassword",
                type: "POST",
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                data: JSON.stringify(data),
                success: function (data) {
                    if (data == 1) {
                        alert("修改成功");
                        window.location.href = "login.html";
                    } else {
                        alert("密码不正确");
                    }
                },
                error: function () {
                    var error = "查询数据失败！";
                    console.log(error);
//				alert(error);
                }
            });
        }


    })
    //	取消收藏
    $('body').on('click', '[id=qx]', function () {
        var id = $(this).parent().children().eq(2).text();
        $(this).parent().remove();
        var data = {
            "postId": parseInt(id),
            "userId": parseInt(userid0)
        };
         console.log(userid0);
         console.log(id);
        $.ajax({
            url: "http://localhost:8888/mywork_war_exploded/person/cancelcollect",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (data) {

            },
            error: function () {
                var error = "查询数据失败！";
                console.log(error);
//				alert(error);
            }
        });
    })
    //	取消关注
    $('body').on('click', '[id=cancel]', function () {
        var id = $(this).parent().children().eq(2).text();
        $(this).parent().remove();
        var data = {
            "userId1": parseInt(id),
            "userId": parseInt(userid0)
        };
        $.ajax({
            url: "http://localhost:8888/mywork_war_exploded/person/cancelfocus",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (data) {

            },
            error: function () {
                var error = "查询数据失败！";
                console.log(error);
//				alert(error);
            }
        });
    })
    //	关注x
    $('body').on('click', '[id=focuson]', function () {
        var id = $(this).parent().children().eq(2).text();
        $(this).parent().remove();
        var data = {
            "userId1": parseInt(id),
            "userId": parseInt(userid0)
        };
        $.ajax({
            url: "http://localhost:8888/mywork_war_exploded/person/focusPerson",
            type: "POST",
            dataType: "json",
            contentType: "application/json;charset=UTF-8",
            data: JSON.stringify(data),
            success: function (data) {

            },
            error: function () {
                var error = "查询数据失败！";
                console.log(error);
//				alert(error);
            }
        });
    })
    $("body").on("click","[id=fname]",function () {
        var id = $(this).next().text();
        window.location.href = "others.html?id=" + id;
    })
    $("body").on("click","[id=fsname]",function () {
        var id = $(this).next().text();
        window.location.href = "others.html?id=" + id;
    })
    $("body").on("click","[id=frname]",function () {
        var id = $(this).next().text();
        window.location.href = "others.html?id=" + id;
    })
    $("body").on("click","[id=topic]",function () {
        var id = $(this).next().text();
        window.location.href = "post.html?id=" + id;
    })
    //	私信x
    $("#qx").click(function () {
        var id = $(this).parent().children().eq(2).html();
        window.location.href = "chat.html?id=" + id;

    })
    $('#view').click(function () {
        $("#scr").show();
        $('#file').click(); //隐藏的input[file]的id
    })
    $("#clipBtn").click(function () {
        $("#scr").hide();
    })
    $("#scr").hide();
    $("#file").hide();
    $('#mati').show();
    $('#info').css("background-color", "#f7f7fc");
    $('#collect').hide();
    $('#focu').hide();
    $('#fan').hide();
    $('#fri').hide();
    $("#pwd").hide();
    $("#load").hide();
    $('#info').click(function () {
        $('#mati').show();
        $('#collect').hide();
        $('#focu').hide();
        $('#fan').hide();
        $('#fri').hide();
        $("#pwd").hide();
        $('#info').css("background-color", "#f7f7fc");
        $('#changepwd').css("background-color", "white");
        $('#friend').css("background-color", "white");
        $('#fans').css("background-color", "white");
        $('#focus').css("background-color", "white");
        $('#col').css("background-color", "white");
    })
    $('#col').click(function () {
        $('#mati').hide();
        $('#collect').show();
        $('#focu').hide();
        $('#fan').hide();
        $('#fri').hide();
        $('#col').css("background-color", "#f7f7fc");
        $('#info').css("background-color", "white");
        $('#friend').css("background-color", "white");
        $('#fans').css("background-color", "white");
        $('#focus').css("background-color", "white");
        $('#changepwd').css("background-color", "white");
    })
    $('#focus').click(function () {
        $('#mati').hide();
        $('#collect').hide();
        $('#focu').show();
        $('#fan').hide();
        $('#fri').hide();
        $("#pwd").hide();
        $('#focus').css("background-color", "#f7f7fc");
        $('#info').css("background-color", "white");
        $('#friend').css("background-color", "white");
        $('#fans').css("background-color", "white");
        $('#changepwd').css("background-color", "white");
        $('#col').css("background-color", "white");
    })
    $('#fans').click(function () {
        $('#mati').hide();
        $('#collect').hide();
        $('#focu').hide();
        $('#fan').show();
        $('#fri').hide();
        $("#pwd").hide();
        $('#fans').css("background-color", "#f7f7fc");
        $('#info').css("background-color", "white");
        $('#friend').css("background-color", "white");
        $('#changepwd').css("background-color", "white");
        $('#focus').css("background-color", "white");
        $('#col').css("background-color", "white");
    })
    $('#friend').click(function () {
        $('#mati').hide();
        $('#collect').hide();
        $('#focu').hide();
        $('#fan').hide();
        $('#fri').show();
        $("#pwd").hide();
        $('#friend').css("background-color", "#f7f7fc");
        $('#info').css("background-color", "white");
        $('#changepwd').css("background-color", "white");
        $('#fans').css("background-color", "white");
        $('#focus').css("background-color", "white");
        $('#col').css("background-color", "white");
    })
    $('#changepwd').click(function () {
        $('#mati').hide();
        $('#collect').hide();
        $('#focu').hide();
        $('#fan').hide();
        $('#fri').hide();
        $("#pwd").show();
        $('#changepwd').css("background-color", "#f7f7fc");
        $('#info').css("background-color", "white");
        $('#friend').css("background-color", "white");
        $('#fans').css("background-color", "white");
        $('#focus').css("background-color", "white");
        $('#col').css("background-color", "white");
    })
    $("#seek").click(function () {
        $("#hunt").css("visibility", "visible");
        $("#hunt").css("opacity", "1");
    });
    $("#close").click(function () {
        $("#hunt").css("visibility", "hidden");
        $("#hunt").css("opacity", "0");
    });
})