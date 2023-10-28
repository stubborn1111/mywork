$(document).ready(function() {
	var all = new Array();
	var n;
	$.ajax({
		url: "http://localhost:8888/mywork_war_exploded/admin/post",
		type: "POST",
		dataType: "json",
		async:false,
		data: {},
		success: function(data) {
			n=data.length;
			for(var i=0;i<data.length;i++){
				all.push(data[i].post.title);
				$("#table2").append("<tr style='display:none;'><td id='postid'>"+data[i].post.postId+"</td><td><div id='h'>"+data[i].post.title+"</div><div id='content'>"+data[i].post.info+"</div></td></tr>");
			}
			console.log(n);
		},
		error: function() {
			var error = "查询数据失败！";
			console.log(error);
			alert(error);
		}
	});
	var arr=$("#topic1").text();
	var ddd = arr.replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
	var speak = ddd.split('').sort();
	var listCount = new Array();
	var percent = new Array();
	var list = new Array();
	for(var i = 0; i < all.length; i++) {

		console.log(all.length);
		var count = 0;
		var no = all[i].replace(/[\ |\“|\：|\；|\‘|\！|\？|\。|\，|\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "");
		var ch = no.split('').sort()
		var da = ch.length;
		for(var j = 0; j < speak.length; j++) {
			var isExit = $.inArray(speak[j], ch);
			if(isExit != -1) {
				ch.splice(isExit, 1);
				if(speak.length <= 0) {
					break;
				}
				count++
			}
		}
		if(list.length < 4) {
			listCount.push(count);
			list.push(all[i]);
			percent.push((count / da * 100).toFixed(2) + "%");
		} else {
			listCount.push(count);
			list.push(all[i]);
			var small = Math.min.apply(null, listCount);
			var index = $.inArray(small, listCount);
			listCount.splice(index, 1);
			list.splice(index, 1);
		}

	}
	// debugger
	for(var j=0;j<n;j++){
		var title=$("#table2 tbody tr").eq(j).children().eq(1).children().eq(0).text();
		console.log(title);
		for(var i=0;i<4;i++){
			console.log(list[i]);
			if($.trim(list[i])==$.trim(title)&&arr!=title){
				$("#table2 tbody tr").eq(j).show();
				$("[id=postid]").hide();
			}
		}
		
	}
	$("body").on("click","[id=h]",function () {
		var id=$(this).parent().prev().text();
		window.location.href="post.html?id="+id;
	})
})