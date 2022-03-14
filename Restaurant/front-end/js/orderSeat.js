$(document).ready(function() {
	// // 控制資料庫拉出物件的checkbox
	// $(".myCheckbox").click(function() {
	// if ($(this).is(":checked"))
	// $(this).show();
	// else
	// $(this).hide();
	// });
	/** *************** 獲得座位物件資訊，使用ajax傳送給servlet **************** */
	// sweet alert messages

	/** ***************************** 日期選擇 ****************************** */
	var errorText;
	var ajaxURL = (window.location.pathname).substr(0, (window.location.pathname).indexOf("/", (window.location.pathname).indexOf("/") + 1));
	function ajaxSuccessFalse(xhr) {
		errorText = xhr.responseText.substr(xhr.responseText.indexOf("Message") + 12, xhr.responseText.indexOf("</p><p><b>Description") - (xhr.responseText.indexOf("Message") + 12));
	}
	// var lock_ = true;//防止重複提交定義鎖
	// $("#").change(function() {
	// if (!lock_) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
	// return false;
	// }
	// lock_ = false; //3.進來後，立馬把鎖鎖住
	// $.ajax({
	// // url is servlet url, ?archive_seat is tell servlet execute which one
	// judgment
	// url: ajaxURL + "/orderSeat/ResOrderServlet.do?action=XXXXXXXXXXX",
	// type: "post",
	// // synchronize is false
	// async: false,
	// data: {
	// "res_date": res_date,
	// "time_peri_no": time_peri_no,
	// },
	// success: function(messages) {
	// $.each($myCheckbox, function(_index, item) {
	// });
	// lock_ = true;//如果業務執行成功，修改鎖狀態
	// },
	// error: function(xhr, ajaxOptions, thrownError) {
	// lock_ = true;//如果業務執行失敗，修改鎖狀態
	// ajaxSuccessFalse(xhr);
	// swal("儲存失敗", errorText, "warning");
	// },
	// });
	// return false;
	// });
	/** ***************************** 人數 ****************************** */
	var lock_people = true;// 防止重複提交定義鎖
	$("#people").change(function(e) {
		e.preventDefault();
		if (!lock_people) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
			return false;
		}
		lock_people = false; // 3.進來後，立馬把鎖鎖住
		if ($("#people").val() > 20 || $("#people").val() < 1) {
			swal("輸入的值超出範圍!", "請輸入1～20的數字!", "info");
			$("#people").val("");
		}
		// get all seat_no
		var $drag = $(".drag");
		var jsonDataStr = new Array();
		$.each($drag, function(_index, item) {
			var mySeat = new Object();
			mySeat.seat_no = $(this).find("input").attr("value");
			mySeat.seat_obj_no = $(item).find("img").attr("src").substr($(item).find("img").attr("src").lastIndexOf("=") + 1);
			// push data to JSONArray
			jsonDataStr.push(mySeat);
		});

		// console.log(jsonDataStr);
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: ajaxURL + "/res_order/ResOrderServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"people": JSON.stringify(jsonDataStr),
				"action": "get_All_Seat_People",
			},
			success: function(messages) {
				jsonArray_people = JSON.parse(messages);
				setJSONArray_people(jsonArray_people);
				$("#container").css("display", "block");
				$("#orderSeat").css("display", "inline-block");

				/*
				 *************** 以下 ***************
				 ********** 如果人數有變動 **********
				 ********** 重新刷新座位區 **********
				 ********** 讓客人重新選擇 **********
				 ************************************
				 */
				var lock_people_change = true;// 防止重複提交定義鎖
				$("#people").change(function(e) {
					e.preventDefault();
					if (!lock_people_change) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
						return false;
					}
					lock_people_change = false; // 3.進來後，立馬把鎖鎖住
					var res_date = $("#res_date").val();
					var time_peri_no = $("#time_peri_no").val();
					$.ajax({
						// url is servlet url, ?archive_seat is tell servlet execute which
						// one judgment
						url: ajaxURL + "/res_order/ResOrderServlet.do?",
						type: "post",
						// synchronize is false
						async: false,
						data: {
							"res_date": res_date,
							"time_peri_no": time_peri_no,
							"action": "get_Res_Order_Today"
						},
						success: function(messages) {
							var jsonArray = JSON.parse(messages);
							var $myCheckbox = $(".myCheckbox");
							var seatNoList = jsonArray.seatNoList;
							var seated = jsonArray.seated;

							$.each($myCheckbox, function(_index, item) {
								$(item).closest(".drag").css({
									filter: "hue-rotate(0deg)",
								});
								$(item).prop("disabled", false);
								$(item).prop("checked", false);
							});
							$.each($myCheckbox, function(_index, item) {
								$.each(seatNoList.myArrayList, function(_index, item1) {
									if ($(item).val() === item1) {
										$(item).closest(".drag").css({
											filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(342deg) brightness(103%) contrast(118%)",
										});
										$(item).prop("disabled", true);
										$(item).prop("checked", true);
										$(item).css("display", "none");
									}
								});
							});
							zeroChooseSeatPeople(0);
							$(".labelTwo").css("display", "inline-block");
						},
						error: function(xhr, ajaxOptions, thrownError) {
							ajaxSuccessFalse(xhr);
							swal("儲存失敗", errorText, "warning");
						},
					});
					lock_people_change = true;// 如果業務執行失敗，修改鎖狀態 for 再次更改用餐人數
					return false;
				});
			},
			error: function(xhr, ajaxOptions, thrownError) {
				lock_people = true;// 如果業務執行失敗，修改鎖狀態
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		lock_people = true;// 如果業務執行成功，修改鎖狀態
		return false;
	});
	var jsonArray_people;
	function setJSONArray_people(value) {
		jsonArray_people = value;
	}
	var chooseSeatPeople = 0;
	function addChooseSeatPeople(value) {
		chooseSeatPeople += value;
	}
	function lessChooseSeatPeople(value) {
		chooseSeatPeople -= value;
	}
	function zeroChooseSeatPeople(value) {
		chooseSeatPeople = value;
	}
	/** ***************************** 人數 ****************************** */
	var lock_checked = true;
	$(".myCheckbox").change(function() {
		// 如果被選擇，該區塊div套濾鏡
		if ($(this).is(":checked")) {
			$(this).closest(".drag").css({
				filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(90deg) brightness(103%) contrast(118%)",
			});
			// 沒被選擇，取消率濾鏡
		} else {
			$(this).closest(".drag").css({
				filter: "hue-rotate(0deg)",
			});
		}
		var people = $("#people").val();
		// 請使用者輸入來店人數
		if ($("#people").val().length === 0) {
			swal("請先輸入來店人數", "", "info");
			$(this).closest(".drag").css({
				filter: "hue-rotate(0deg)",
			});
			$(this).prop("disabled", false);
			$(this).prop("checked", false);
		}
		var thisCheckboxValue = $(this).val();
		var thisCheckbox = $(this);
		var allNotCheckbox = $(".myCheckbox").not(":checked");
		// 畫面上所有位子可容納人數比對選取的位子人數
		$.each(jsonArray_people, function(_index, item) {
			let key = Object.keys(item);
			let value = Object.values(item);
			if (key[0] === thisCheckboxValue) {
				if (thisCheckbox.is(":checked")) {
					addChooseSeatPeople(value[0]);
				} else if (thisCheckbox.not(":checked")) {
					lessChooseSeatPeople(value[0]);
				}
				// 來店人數大於選擇座位可容納人數
				if (parseInt(people) - chooseSeatPeople > 0) {
					let nowNotCheckbox = $(".myCheckbox").not(":checked");
					$.each(nowNotCheckbox, function(i, item) {
						$(item).prop("disabled", false);
					});
				}
				// 來店人數等於選擇座位人數
				if (parseInt(chooseSeatPeople) - parseInt(people) == 0) {
					swal("已經選擇適當的桌位囉！", "", "info");
					$.each(allNotCheckbox, function(i, item) {
						$(item).prop("disabled", true);
					});
					// 選擇座位人數超過來店人數太多
				} else if (parseInt(chooseSeatPeople) >= parseInt(people) + 3) {
					swal("選擇座位人數超過來店人數太多！！", "請重新選擇相符的人數座位～", "info");
					thisCheckbox.closest(".drag").css({
						filter: "hue-rotate(0deg)",
					});
					thisCheckbox.prop("disabled", false);
					thisCheckbox.prop("checked", false);
					lessChooseSeatPeople(value[0]);
					// 符合來店人數低於選擇最為可容納人數之可接受範圍
				} else if (parseInt(people) - parseInt(chooseSeatPeople) < 0) {
					swal("已經選擇適當的桌位囉！", "", "info");
					$.each(allNotCheckbox, function(i, item) {
						$(item).prop("disabled", true);
					});
				}
				//				else if (chooseSeatPeople > parseInt(people) + 5) {
				//					swal("123！", "", "info");
				//					thisCheckbox.closest(".drag").css({
				//						filter: "hue-rotate(0deg)",
				//					});
				//					thisCheckbox.prop("disabled", false);
				//					thisCheckbox.prop("checked", false);
				//					lessChooseSeatPeople(value[0]);
				//					return false;
				//				}
				return false;
			}
		});
		$("#chooseSeatPeople").text(" " + chooseSeatPeople + " ");
		console.log(chooseSeatPeople);
		return false;
	});

	/**
	 * ********************************
	 * 換樓層選擇座位區更換成該樓層座位
	 * ********************************
	 */
	var lock_floor_list = true;// 防止重複提交定義鎖
	$("#floor_list").change(function() {
		if (!lock_floor_list) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
			return false;
		}
		lock_floor_list = false; // 3.進來後，立馬把鎖鎖住
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: ajaxURL + "/res_order/ResOrderServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"floor": $("#floor_list").val(),
				"action": "floor_load",
			},
			success: function(messages) {
				$("body > div#container.container").load(ajaxURL + "/front-end/res_order/orderSeat.jsp div#container.container");
				//				$.getScript(ajaxURL + "/js/jquery-1.12.4.js");
				$.getScript(ajaxURL + "/front-end/js/orderSeat.js");
				//				$.getScript(ajaxURL + "/js/sweetalert.min.js");
				// console.log(messages);
				var jsonArray = JSON.parse(messages);
				$("div#container.container").empty();
				$("#time_peri_no").empty();
				$("#people").val("");
				$("#res_date").val("--請選擇日期--");
				$("#time_peri_no").append("<option class=\"lt\" value=\"-1\">--請先選擇日期--</option>");
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
					$("<label>").appendTo($drag);
					var $label = $("div#container.container .drag > label:first-child").eq(_index);
					$("<input>").attr({
						type: "checkbox",
						class: "myCheckbox",
						name: "seat_checked",
						value: item.seat_no,
					}).appendTo($label);
					$("<img>").attr({
						src: ajaxURL + "/seat/Seat_ObjServlet.do?seat_obj_no=" + item.seat_obj_no,
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
				$(".labelOne").css("display", "none");
				$(".labelTwo").css("display", "none");
				$("#container").css("display", "none");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				lock_floor_list = true;// 如果業務執行失敗，修改鎖狀態
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		return false;
	});

	/** 當日期改變，載入時段選擇欄位 **/
	var lock_order_date = true;// 防止重複提交定義鎖
	$("#res_date").change(function() {
		if (!lock_order_date) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
			return false;
		}
		lock_order_date = false; // 3.進來後，立馬把鎖鎖住
		var res_date = $("#res_date").val();
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: ajaxURL + "/time_peri/TimePeriServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"res_date": res_date,
				"action": "get_TimePeri",
			},
			success: function(messages) {
				// console.log(messages);
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
				lock_order_date = true;// 如果業務執行成功，修改鎖狀態
			},
			error: function(xhr, ajaxOptions, thrownError) {
				lock_order_date = true;// 如果業務執行失敗，修改鎖狀態
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		return false;
	});

	var lock_time_peri_no = true;// 防止重複提交定義鎖
	$("#time_peri_no").change(function() {
		if (!lock_time_peri_no) {// 2.判斷該鎖是否開啟，如果是關閉的，則直接返回
			return false;
		}
		lock_time_peri_no = false; // 3.進來後，立馬把鎖鎖住
		var res_date = $("#res_date").val();
		var time_peri_no = $("#time_peri_no").val();
		$.ajax({
			// url is servlet url, ?archive_seat is tell servlet execute which
			// one judgment
			url: ajaxURL + "/res_order/ResOrderServlet.do?",
			type: "post",
			// synchronize is false
			async: false,
			data: {
				"res_date": res_date,
				"time_peri_no": time_peri_no,
				"action": "get_Res_Order_Today",
			},
			success: function(messages) {
				var jsonArray = JSON.parse(messages);
				var $myCheckbox = $(".myCheckbox");
				var seatNoList = jsonArray.seatNoList;

				$.each($myCheckbox, function(_index, item) {
					$(item).closest(".drag").css({
						filter: "hue-rotate(0deg)",
					});
					$(item).prop("disabled", false);
					$(item).prop("checked", false);
					$(item).css("display", "block");
				});
				$.each($myCheckbox, function(_index, item) {
					$.each(seatNoList.myArrayList, function(_index, item1) {
						if ($(item).val() === item1) {
							$(item).closest(".drag").css({
								filter: "invert(23%) sepia(98%) saturate(6242%) hue-rotate(342deg) brightness(103%) contrast(118%)",
							});
							$(item).prop("disabled", true);
							$(item).prop("checked", true);
							$(item).css("display", "none");
						}
					});
				});
				$(".labelTwo").css("display", "inline-block");
				$("#people").val("");
			},
			error: function(xhr, ajaxOptions, thrownError) {
				ajaxSuccessFalse(xhr);
				swal("儲存失敗", errorText, "warning");
			},
		});
		lock_time_peri_no = true;// 最後將鎖打開，修改鎖狀態
		return false;
	});
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
});


/** ***************************** 日期選擇 ****************************** */
$.datetimepicker.setLocale('zh');	// 設定語言
var somedate = new Date();
$("#res_date").datetimepicker({
	timepicker: false,
	format: 'Y-m-d',				// 時間格式
	scrollInput: false,				// 預防滾輪選取不可選取的日期
	validateOnBlur: false, 			// 失去焦點時才驗證輸入直
	minDate: 0,						// 開始日期
	maxDate: '+1970/01/14',			// 開始日期到結束日期
});