<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="BIG5"%>

<%
	String x = (String) request.getAttribute("x");
%>

<html>
<head>
<title>�ѰO�K�X</title>

<style>

#container{
  padding-top: 50px;
  padding-bottom: 50px;
  margin:0 auto;
  width: 600px;
}

</style>

</head>
<body onload="hint()">
	
	<%@ include file="/front-end/headfinish.jsp"%>
	
	<div id="container">
	<h3 style="text-align:center">�ѰO�K�X</h3>
	
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	
	<form method="post" action="<%=request.getContextPath()%>/front-end/mem/mem.do">
		<span>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;�п�Jemail:</span>
		<input type="email" name="mem_mail" value="${memVO2.mem_mail}" required>
		<p><p>
		<input type="submit" id="ok" value="�e�X" style="margin-left:275px">
		<input type="hidden" name="action" value="forget_psw">
	</form>
	
	<span style="color: red;">&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;�����U�e�X�N�|�H�X�{�ɱK�X�A�Шϥ��{�ɱK�X�n�J</span>
	</div>
	
	<jsp:include page="/front-end/front/footer.jsp" />

<!--sweet alert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<script>

// 	var mem_mail = document.getElementsByName("mem_mail");
// 	var ok = document.getElementById("ok");
	
// 	ok.addEventListener("click", function() {
// 		if (mem_mail[0].value !== "") {
// 			alert("�{�ɱK�X�w�H�X�A�Ц�email�H�c�d���I");
// 		}
// 	});

	var x = `${x}`;
	console.log(x);
	function hint() {
		if (x === "notfound") {
// 			alert("�d�L��email�I�Э��s��J�I");
			swal({
				  title: "�d�L��email�I�Э��s��J�I",
				  text: "3���۰������C",
				  icon: "error",
				  timer: 3000,
				  showConfirmButton: true
				});
		}
	}

</script>

</body>
</html>