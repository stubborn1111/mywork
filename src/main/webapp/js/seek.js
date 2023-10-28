$(document).ready(function() {
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
			async: false,
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