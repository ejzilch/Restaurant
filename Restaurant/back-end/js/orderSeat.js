/** ***************************** 日期選擇 ****************************** */
var errorText;
function ajaxSuccessFalse(xhr) {
	errorText = xhr.responseText.substr(xhr.responseText.indexOf("Message") + 12, xhr.responseText.indexOf("</p><p><b>Description") - (xhr.responseText.indexOf("Message") + 12));
}

var nowDay = new Date();
var seatedTemp;

$(document).ready(function(e) {
	/** ***************************** 人數 ****************************** */
	//	var lock_people = true;
	//	$("#people").change(function(e) {
	//		e.stopPropagation();
	//		console.log("people");
	//		if ($("#people").val() > 20 || $("#people").val() < 1) {
	//			swal("輸入的值超出範圍!", "請輸入1～20的數字!", "info");
	//			$("#people").val("");
	//		}
	//		// get all seat_no
	//		var $drag = $(".drag");
	//		var jsonDataStr = new Array();
	//		$.each($drag, function(_index, item) {
	//			var mySeat = new Object();
	//			mySeat.seat_no = $(this).find("input").attr("value");
	//			mySeat.seat_obj_no = $(item).find("img").attr("src").substr($(item).find("img").attr("src").lastIndexOf("=") + 1);
	//			// push data to JSONArray
	//			jsonDataStr.push(mySeat);
	//		});
	//		$.ajax({
	//			// url is servlet url, ?archive_seat is tell servlet execute which
	//			// one judgment
	//			url: contextPath + "/res_order/ResOrderServlet.do?",
	//			type: "post",
	//			// synchronize is false
	//			async: false,
	//			data: {
	//				"people": JSON.stringify(jsonDataStr),
	//				"action": "get_All_Seat_People",
	//			},
	//			success: function(messages) {
	//				jsonArray_people = JSON.parse(messages);
	//				setJSONArray_people(jsonArray_people);
	//				$("#container").css("display", "block");
	//				$("#orderSeat").css("display", "inline-block");
	//				/*
	//				 *************** 以下 ***************
	//				 ********** 如果人數有變動 **********
	//				 ********** 重新刷新座位區 **********
	//				 ********** 讓客人重新選擇 **********
	//				 */
	//				$("#people").change(function(e) {
	//					chooseSeatPeople = 0;
	//					e.stopPropagation();
	//					if (!lock_people) {
	//						return false;
	//					}
	//					lock_people = false;
	//					console.log("people2");
	//					var res_date = $("#res_date").val();
	//					var time_peri_no = $("#time_peri_no").val();
	//					$.ajax({
	//						// url is servlet url, ?archive_seat is tell servlet execute which
	//						// one judgment
	//						url: contextPath + "/res_order/ResOrderServlet.do?",
	//						type: "post",
	//						// synchronize is false
	//						async: false,
	//						data: {
	//							"res_date": res_date,
	//							"time_peri_no": time_peri_no,
	//							"action": "get_Res_Order_Today"
	//						},
	//						success: function(messages) {
	//							var jsonArray = JSON.parse(messages);
	//							var $myCheckbox = $(".myCheckbox");
	//
	//							$.each($myCheckbox, function(_index, item) {
	//								$(item).closest(".drag").css({
	//									filter: "hue-rotate(0deg)",
	//								});
	//								$(item).prop("disabled", false);
	//								$(item).prop("checked", false);
	//							});
	//							$.each($myCheckbox, function(_index, item) {
	//								$.each(jsonArray, function(_index, item1) {
	//									if ($(item).val() === item1) {
	//										$(item).closest(".drag").css({
	//											filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(342deg) brightness(103%) contrast(118%)",
	//										});
	//										$(item).prop("disabled", true);
	//										$(item).prop("checked", true);
	//										$(item).css("display", "none");
	//									}
	//								});
	//							});
	//							$(".labelTwo").css("display", "inline-block");
	//						},
	//						error: function(xhr, ajaxOptions, thrownError) {
	//							ajaxSuccessFalse(xhr);
	//							swal("儲存失敗", errorText, "warning");
	//						},
	//					});
	//					lock_people = true;
	//				});
	//				e.preventDefault();
	//				return false;
	//			},
	//			error: function(xhr, ajaxOptions, thrownError) {
	//				lock_people = true;// 如果業務執行失敗，修改鎖狀態
	//				ajaxSuccessFalse(xhr);
	//				swal("儲存失敗", errorText, "warning");
	//			},
	//		});
	//		return false;
	//	});
	//	var jsonArray_people;
	//	function setJSONArray_people(value) {
	//		jsonArray_people = value;
	//	}
	//	var chooseSeatPeople = 0;
	//	function addChooseSeatPeople(value) {
	//		chooseSeatPeople += value;
	//	}
	//	function lessChooseSeatPeople(value) {
	//		chooseSeatPeople -= value;
	//	}
	//	function zeroChooseSeatPeople(value) {
	//		chooseSeatPeople = value;
	//	}
	/** ***************************** 人數 ****************************** */
	//	$(".myCheckbox").change(function(e) {
	//		e.stopImmediatePropagation();
	////		console.log("myCheckbox");
	//		// 如果被選擇，該區塊div套濾鏡
	//		if ($(this).is(":checked")) {
	//			$(this).closest(".drag").css({
	//				filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(90deg) brightness(103%) contrast(118%)",
	//			});
	//		// 沒被選擇，取消率濾鏡
	//		} else {
	//			$(this).closest(".drag").css({
	//				filter: "hue-rotate(0deg)",
	//			});
	//		}
	//		var people = $("#people").val();
	//		// 請使用者輸入來店人數
	//		if (people == null) {
	//			swal("請先輸入來店人數", "", "info");
	//			$(this).closest(".drag").css({
	//				filter: "hue-rotate(0deg)",
	//			});
	//			$(this).prop("disabled", false);
	//			$(this).prop("checked", false);
	//		}
	//		var thisCheckboxValue = $(this).val();
	//		var thisCheckbox = $(this);
	//		var allNotCheckbox= $(".myCheckbox").not(":checked");
	//		// 畫面上所有位子可容納人數比對選取的位子人數
	//		$.each(jsonArray_people, function(_index, item) {
	//			let key = Object.keys(item);
	//			let value = Object.values(item);
	//			if (key[0] === thisCheckboxValue) {
	//				if (thisCheckbox.is(":checked")) {
	//					addChooseSeatPeople(value[0]);
	//				} else if (thisCheckbox.not(":checked")) {
	//					lessChooseSeatPeople(value[0]);
	//				}
	//				// 來店人數大於選擇座位可容納人數
	//				if (parseInt(people) - parseInt(chooseSeatPeople) > 0) {
	//					let nowNotCheckbox= $(".myCheckbox").not(":checked");
	//					$.each(nowNotCheckbox, function(i, item){
	//						$(item).prop("disabled", false);
	//					});
	//					console.log("people="+people);
	//					console.log("chooseSeatPeople="+chooseSeatPeople);
	//				}
	//				// 來店人數等於選擇座位人數
	//				if (parseInt(chooseSeatPeople) - parseInt(people) == 0) {
	//					swal("已經選擇適當的桌位囉！", "", "info");
	//					$.each(allNotCheckbox, function(i, item){
	//						$(item).prop("disabled", true);
	//					});
	//					console.log("people="+people);
	//					console.log("chooseSeatPeople="+chooseSeatPeople);
	//				// 選擇座位人數超過來店人數太多
	//				} else if (parseInt(chooseSeatPeople) >= parseInt(people) + 3) {
	//					swal("選擇座位人數超過來店人數太多！！", "請重新選擇相符的人數座位～", "info");
	//					thisCheckbox.closest(".drag").css({
	//						filter: "hue-rotate(0deg)",
	//					});
	//					thisCheckbox.prop("disabled", false);
	//					thisCheckbox.prop("checked", false);
	//					lessChooseSeatPeople(value[0]);
	//					console.log("people="+people);
	//					console.log("chooseSeatPeople="+chooseSeatPeople);
	//				// 符合來店人數低於選擇最為可容納人數之可接受範圍
	//				} else if(parseInt(people) - parseInt(chooseSeatPeople) < 0 ) {
	//					swal("已經選擇適當的桌位囉！", "", "info");
	//					$.each(allNotCheckbox, function(i, item){
	//						$(item).prop("disabled", true);
	//					});
	//					console.log("people="+people);
	//					console.log("chooseSeatPeople="+chooseSeatPeople);
	//				} 
	//			}
	//		});
	//		return false;
	//	});
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
		function getTimePeriNo(time) {
			if (10 <= time && time < 13) {
				return "TP0001";
			} else if (13 <= time && time < 15) {
				return "TP0002";
			} else if (15 <= time && time < 17) {
				return "TP0003";
			} else if (17 <= time && time < 19) {
				return "TP0004";
			} else if (19 <= time && time < 21) {
				return "TP0005";
			} else if (21 <= time && time < 23) {
				return "TP0006";
			} else return "TP0007";
		}
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
	function formatDate(nowDay) {
		month = '' + (nowDay.getMonth() + 1),
			day = '' + nowDay.getDate(),
			year = nowDay.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
	function getTimePeriNo(time) {
		if (10 <= time && time < 13) {
			return "TP0001";
		} else if (13 <= time && time < 15) {
			return "TP0002";
		} else if (15 <= time && time < 17) {
			return "TP0003";
		} else if (17 <= time && time < 19) {
			return "TP0004";
		} else if (19 <= time && time < 21) {
			return "TP0005";
		} else if (21 <= time && time < 23) {
			return "TP0006";
		} else return "TP0007";
	}
});

// 開局載入
$(window).load(function init() {
	var lock_time_peri_no = true;// 防止重複提交定義鎖
	if (!lock_time_peri_no) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
		return false;
	}
	lock_time_peri_no = false; // 3.進來後，立馬把鎖鎖住
	function formatDate(nowDay) {
		month = '' + (nowDay.getMonth() + 1),
			day = '' + nowDay.getDate(),
			year = nowDay.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	}
	function getTimePeriNo(time) {
		if (10 <= time && time < 13) {
			return "TP0001";
		} else if (13 <= time && time < 15) {
			return "TP0002";
		} else if (15 <= time && time < 17) {
			return "TP0003";
		} else if (17 <= time && time < 19) {
			return "TP0004";
		} else if (19 <= time && time < 21) {
			return "TP0005";
		} else if (21 <= time && time < 23) {
			return "TP0006";
		} else return "TP0007";
	}
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

	$.ajax({
		// url is servlet url, ?archive_seat is tell servlet execute which
		// one judgment
		url: contextPath + "/res_order/ResOrderServlet.do?",
		type: "post",
		// synchronize is false
		async: false,
		data: {
			"res_date": formatDate(nowDay),
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

function formatDate(nowDay) {
	month = '' + (nowDay.getMonth() + 1),
		day = '' + nowDay.getDate(),
		year = nowDay.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	return [year, month, day].join('-');
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