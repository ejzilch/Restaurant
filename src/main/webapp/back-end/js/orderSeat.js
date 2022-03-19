/** ***************************** 日期選擇 ****************************** */
var errorText;
function ajaxSuccessFalse(xhr) {
	errorText = xhr.responseText.substr(xhr.responseText.indexOf("Message") + 12, xhr.responseText.indexOf("</p><p><b>Description") - (xhr.responseText.indexOf("Message") + 12));
}

var nowDay = new Date();

$(document).ready(function(e) {
	/**
	 * 換樓層選擇座位區更換成該樓層座位
	 * ******************************
	 */
	$("#floor_list").change(function(e) {
		e.stopImmediatePropagation();
		//		console.log("floor_list");
		$(".info.btn.btn-secondary").remove();
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: contextPath + "/res_order/ResOrderServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"floor": $("#floor_list").val(),
				"action": "floor_load",
			},
			success: function(messages) {
				$("body > div#container.container").load(contextPath + "/back-end/res_order/orderSeat.jsp div#container.container");
				$.getScript(contextPath + "/back-end/js/orderSeat.js");
				var jsonArray = JSON.parse(messages);
				$("div#container.container").empty();
				$("#time_peri_no").empty();
				$("#people").val("");
				$("#time_peri_no").append("<option class=\"lt\" value=\"-1\">--請選擇時段--</option>");
				$.each(jsonArray, function(_index, item) {
					$("<div>").attr({
						class: "drag",
						id: "drag",
					}).css({
						"position": "absolute",
						"left": item.seat_x + "px",
						"top": item.seat_y + "px",
					}).appendTo("div#container.container");

					var $drag = $("div#container.container .drag").eq(_index);
					$("<label>").attr({
						class: "imgLabel",
					}).appendTo($drag);
					var $label = $("div#container.container .drag > label:first-child").eq(_index);
					$("<input>").attr({
						type: "checkbox",
						class: "myCheckbox",
						name: "seat_checked",
						value: item.seat_no,
						disabled: true,
					}).css({
						display: "none",
					}).appendTo($label);
					$("<img>").attr({
						src: contextPath + "/seat/Seat_ObjServlet.do?seat_obj_no=" + item.seat_obj_no,
					}).appendTo($label);

					$("<label>").attr({
						class: "seatLabel",
					}).appendTo($drag);
					var $label2 = $("div#container.container .drag .seatLabel").eq(_index);
					$("<input>").attr({
						type: "text",
						class: "seatName",
						name: "seatName",
						value: item.seat_name,
					}).attr("disabled", true).appendTo($label2);
				});
			},
			error: function(xhr, ajaxOptions, thrownError) {
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		return false;
	});

	/** ***************************** 日期選擇 ****************************** */
	$.datetimepicker.setLocale('zh');	// 設定語言
	$("#res_date").datetimepicker({
		timepicker: false,
		format: 'Y-m-d',				// 時間格式
		scrollInput: false,				// 預防滾輪選取不可選取的日期
		validateOnBlur: false, 			// 失去焦點時才驗證輸入直
		defaultDate: nowDay,
		minDate: 0,						// 開始日期
		maxDate: '+1970/01/14',			// 開始日期到結束日期
	})

	changedResDate();

	$("#time_peri_no").change(function(e) {

		// 防止重複提交
		getResSeat(e);

		return false;
	});
	var isChecked = $("input:checked");
	getSeatForPopover(e, isChecked);

	$("#orderSeat").click(function(e) {
		if (chooseSeatPeople < parseInt($("#people").val())) {
			swal("來店人數還大於選擇座位人數唷！", "請在選擇座位，直到座位足夠容納來店人數", "info");
			return false;
		}
		var form = $(this).parents('form');
		swal({
			title: "請問要順便訂餐嗎?",
			text: "訂餐方便又簡單～",
			icon: "warning",
			buttons: {
				cancel: "取消!",
				catch: {
					text: "訂位就好",
					value: "res_seat",
				},
				defeat: {
					text: "我要訂餐～",
					value: "res_meal",
				},
			}
		}).then((value) => {
			switch (value) {
				case "res_meal":
					swal("來去訂餐吧～", {
						icon: "success",
					}).then(function() {
						$("<input>").attr({
							type: "hidden",
							name: "goMeal",
							value: "carry_on_res_meal",
						}).appendTo("div#orderSeatCondition.container");
						form.submit();
					});
					break;
				case "res_seat":
					swal("即將完成訂位", {
						icon: "success",
					}).then(function() {
						form.submit();
					});
					break;
				default:
					swal("不做任何選項～", "再考慮考慮吧！", "info");
			}
		});
		e.preventDefault();
		e.stopImmediatePropagation();
	});
	// popover menu
	$('#myPopover').on('show.bs.popover', function() {

	});

	$(document).on('click', '#clear_window', function() {
		console.log("clear_window");
		$('[data-toggle="popover"]').popover('hide');
	});

	//	點選popover觸發
	$(document).on('click', 'button.info.btn.btn-secondary', function() {
		//hide not this popover windows
		$('[data-toggle="popover"]').not(this).popover('hide');
	});
	// *****************入座 *****************
	$(document).on('click', '#take_a_seat', function(e) {
		e.stopImmediatePropagation();
		$('[data-toggle="popover"]').popover('hide');
		var res_date = $("#res_date").val();
		var time_peri_no = $("#time_peri_no").val();
		//		var jsonStr = $.ajax({
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: contextPath + "/res_order/ResOrderServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"action": "take_a_seat",
				"res_no": $("#popover_res_order").val(),
				"meal_order_no": $("#popover_meal_order_no").val(),
				"res_date": res_date,
				"time_peri_no": time_peri_no,
			},
			success: function(messages) {
				var jsonArray = JSON.parse(messages);
				var $myCheckbox = $(".myCheckbox");
				var seated = jsonArray.seated;
				$.each($myCheckbox, function(_index, item) {
					if (JSON.stringify(seated).indexOf($(item).val()) != -1) {
						buleFilter(item);
					}
				});
				swal("客人確認入座", "", "success");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},

		});
	});
	$(document).on('click', '#order_meal', function() {
		$('[data-toggle="popover"]').popover('hide');
	});
});

// 開局載入
$(window).load(function init() {
	var lock_time_peri_no = true;// 防止重複提交定義鎖
	if (!lock_time_peri_no) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
		return false;
	}
	lock_time_peri_no = false; // 3.進來後，立馬把鎖鎖住
	lock_time_peri_no = true;// 如果業務執行失敗，修改鎖狀態
	return false;
});

function getSeatForPopover(e, isChecked) {
	var lock_popover = true;
	$('[data-toggle="popover"]').popover({
		trigger: 'click',
		delay: { "show": 100, "hide": 100 },
		title: '<span class="text-info"><strong>訂位資訊</strong></span>',
		content: function() {

			var seat_no = $(this).closest(".drag").children(".imgLabel").find(".myCheckbox").val();

			var jsonStr = chooseGetDetail(seat_no, isChecked);

			var jsonStr2 = JSON.parse(jsonStr.responseText);
			var mem = jsonStr2.mem === undefined ? "" : JSON.parse(jsonStr2.mem);
			var res_order = jsonStr2.res_order === undefined ? "" : JSON.parse(jsonStr2.res_order);
			var time_peri = jsonStr2.time_peri === undefined ? "" : JSON.parse(jsonStr2.time_peri);
			var res_detail = jsonStr2.res_detail === undefined ? "" : JSON.parse(jsonStr2.res_detail);

			$.each(isChecked, (i, item) => {
				if (JSON.stringify(res_detail).indexOf($(item).val()) != -1) {
					$(item).closest(".drag").css({
						//pink
						filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(300deg) brightness(103%) contrast(118%)",
					});
				}
			})

			return '<div class="res_info">姓名：' + mem.mem_name + '</div>' +
				'<div class="res_info">桌名：' + $("#floor_list").val() + "樓" + "_" + $(this).closest(".drag").children(".seatLabel").find(".seatName").val() + "桌" + '</div>' +
				'<div class="res_info">時段：' + time_peri.time_start + '</div>' +
				'<div class="res_info">訂餐：' + (res_order.meal_order_no == undefined ? "未定餐" : '<a href="' + meal_order_no3 + path + "&meal_order_no=" + res_order.meal_order_no + '">這筆訂單</a>') +
				'<div class="res_info">人數：' + res_order.people + '</div>' +
				'<div class="buttonDiv">' +
				'<div class="button col-4"><a href="#" class="btn btn-primary" id="take_a_seat" onclick="return false;">' +
				'<i class="fa fa-check-circle"></i>入座</a></div>' +
				'<div class="button col-4"><a href="#" class="btn btn-success" id="order_meal" onclick="return false;">' +
				'<i class="fa fa-shopping-cart"></i>點餐</a></div>' +
				'<div class="button col-4"><a href="#" class="btn btn-danger" id="clear_window" onclick="return false;">' +
				'<i class="fa fa-window-close"></i>關閉</a></div>' +
				'</div>' +
				'<input type="hidden" id="popover_res_order" value="' + res_order.res_no + '">' +
				'<input type="hidden" id="popover_meal_order_no" value="' + res_order.meal_order_no + '">';
		}
	});
}

/** changed resDate to reload timePeri */
function changedResDate() {
	$("#res_date").change(function(e) {
		e.preventDefault();
		e.stopImmediatePropagation();
		//		console.log("res_date");
		$(".info.btn.btn-secondary").remove();
		var res_date = $("#res_date").val();
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: contextPath + "/time_peri/TimePeriServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"res_date": res_date,
				"action": "get_time_peri_for_back",
			},
			success: function(messages) {
				var jsonArray = JSON.parse(messages);
				$("#time_peri_no").empty();
				$("#time_peri_no").append("<option class=\"lt\" value=\"-1\">--請選擇時段--</option>");
				$.each(jsonArray, function(_index, item) {
					var option = $("<option/>");
					option.attr({
						value: item.time_peri_no,
					}).text(item.time_start.replace("-", ":"));
					$("#time_peri_no").append(option);
				});
				$(".labelOne").css("display", "inline-block");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		return false;
	});
}
/** page init TimePeri */
function initTimePeri() {
	$(".info.btn.btn-secondary").remove();
	var res_date = $("#res_date").val();
	$.ajax({
		// url is servlet url, ?archive_seat is tell servlet execute which
		// one judgment
		url: contextPath + "/time_peri/TimePeriServlet.do?",
		type: "post",
		// synchronize is false
		async: false,
		data: {
			"res_date": res_date,
			"action": "get_TimePeri",
		},
		success: function(messages) {
			var jsonArray = JSON.parse(messages);
			$("#time_peri_no").empty();
			$("#time_peri_no").append("<option class=\"lt\" value=\"-1\">--請選擇時段--</option>");
			$.each(jsonArray, function(_index, item) {
				var option = $("<option/>");
				option.attr({
					value: item.time_peri_no,
				}).text(item.time_start.replace("-", ":"));
				$("#time_peri_no").append(option);
			});
			$(".labelOne").css("display", "inline-block");
		},
		error: function(xhr, ajaxOptions, thrownError) {
			ajaxSuccessFalse(xhr);
			swal("儲存失敗", errorText, "warning");
		},
	});
}

function chooseGetDetail(seat_no, isChecked) {

	var res_date = $("#res_date").val();
	var time_peri_no = $("#time_peri_no").val();
	var floor = $("#floor_list").val();

	var jsonStr = $.ajax({
		// url is servlet url, ?archive_seat is tell servlet execute which
		// one judgment
		url: contextPath + "/res_order/ResOrderServlet.do?",
		type: "post",
		// synchronize is false
		async: false,
		data: {
			"action": "get_res_info",
			"floor": floor,
			"seat_no": seat_no,
			"res_date": res_date,
			"time_peri_no": time_peri_no,
		},
		success: function(messages) {
			jsonStr = JSON.parse(messages);
			lock_popover = true;
			return jsonStr;
		},
		error: function(xhr, ajaxOptions, thrownError) {
			lock_popover = true;// 如果業務執行失敗，修改鎖狀態
			ajaxSuccessFalse(xhr);
			swal("儲存失敗", errorText, "warning");
			return false
		},
	});
	// 要取訂單所有座位>點選>變色>取消>還原
	var jsonStr2 = JSON.parse(jsonStr.responseText);
	var seated = jsonStr2.seated === undefined ? "" : JSON.parse(jsonStr2.seated);
	$.each(isChecked, function(_index, item) {
		if (seated.length === 0) {
			redFilter(item);
		} else if (JSON.stringify(seated).indexOf($(item).val()) != -1) {
			buleFilter(item);
		} else {
			redFilter(item);
		}
	});
	return jsonStr;
}

function getResSeat(e) {
	e.stopImmediatePropagation();

	var time_peri_no = $("#time_peri_no").val();
	var res_date = $("#res_date").val();
	$.ajax({
		// url is servlet url, ?archive_seat is tell servlet execute which
		// one judgment
		url: contextPath + "/res_order/ResOrderServlet.do?",
		type: "post",
		// synchronize is false
		async: false,
		data: {
			"res_date": res_date,
			"time_peri_no": time_peri_no,
			"floor": $("#floor_list").val(),
			"action": "get_Res_Order_Today_For_Back",
		},
		success: function(messages) {
			$.getScript(contextPath + "/back-end/js/orderSeat.js");
			var jsonArray = JSON.parse(messages);
			var $myCheckbox = $(".myCheckbox");
			var seatNoList = jsonArray.seatNoList;
			var seated = jsonArray.seated;

			noColorFilter();

			// 全部訂位添加popover
			$.each($myCheckbox, function(_index, item) {
				$.each(seatNoList.myArrayList, function(_i, item1) {
					if ($(item).val() === item1) {
						$("<button>").attr({
							type: "button",
							container: "body",
							class: "info btn btn-secondary",
							"data-html": "true",
							"data-toggle": "popover",
							"data-placement": "top",
						}).text("資訊").appendTo($(item).closest(".imgLabel"));

						redFilter(item);
					}
				});
			});

			// 已入座
			var isChecked = $("input:checked");

			$.each(isChecked, function(_index, item) {
				if (JSON.stringify(seated.myArrayList).indexOf($(item).val()) != -1) {
					buleFilter(item);
				}
			});

			$(".labelTwo").css("display", "inline-block");
			$("#people").val("");
		},
		error: function(xhr, ajaxOptions, thrownError) {
			noColorFilter();

			$('.popover-header, .popover, .popover-body, [data-toggle="popover"]').remove();
			ajaxSuccessFalse(xhr);
			swal("警告", errorText, "warning");
		},
	});
}

// noColorFilter
function noColorFilter() {
	$(".myCheckbox").css("display", "block")
		.prop("checked", false).prop("disabled", false)
		.closest(".drag").css({ filter: "hue-rotate(0deg)", });
}

// redFilter
function redFilter(item) {
	let hasPopover = $(item).siblings('[data-toggle="popover"]');
	if (hasPopover.length > 0) {
		$(item).closest(".drag").css({
			filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(342deg) brightness(103%) contrast(118%)",
		});
		$(item).prop("disabled", true);
		$(item).prop("checked", true);
		$(item).css("display", "none");
	}
}

// buleFilter
function buleFilter(item) {
	$(item).closest(".drag").css({
		filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(180deg) brightness(103%) contrast(118%)",
	});
	$(item).prop("disabled", true);
	$(item).prop("checked", true);
	$(item).css("display", "none");
}

$(window).on('click', function(e) {
	e.stopImmediatePropagation();
	let popoverObj = $('button[aria-describedby^="popover"]');
	var isChecked = $("input:checked");
	if (popoverObj.size() > 0) {
		$('button[aria-describedby^="popover"]').popover("hide");
		//		getResSeat(e);
	}
	chooseGetDetail(null, isChecked);
});
