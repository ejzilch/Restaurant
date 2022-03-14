<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="BIG5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<%
	String x = (String) request.getAttribute("x"); // �P�_�U�ت��p��
%>

<!DOCTYPE html>
<html>
<head>
<title>�|���n�J</title>

    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Great+Vibes&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/open-iconic-bootstrap.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/animate.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/owl.carousel.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/magnific-popup.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/aos.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/ionicons.min.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/bootstrap-datepicker.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/jquery.timepicker.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/flaticon.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/icomoon.css">
    <link rel="stylesheet" href="<%=request.getContextPath() %>/front-end/front/css/style.css">
    
<style>

#container{
  padding-top: 50px;
  margin:0 auto;
  width: 800px;
}

td {
	width: 100px;
}

</style>
    
</head>
<body onload="hint()">
	
	<%@ include file="/front-end/headfinish.jsp"%>
	
	<div id="container">
	<div style="margin-left: 200px;">
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	</div>
	
	<FORM METHOD="post" ACTION="<%=request.getContextPath()%>/front-end/mem/mem.do" style="margin-bottom: 0px;">
		<table style="width: 400px; margin-left: 200px; background-color:#eee;">
			<tr>
				<td colspan=2 align=center>
					<h2>�|���n�J</h2>
				</td>
			</tr>
			<tr>
				<td>
					<p align=right>
						<b style="font-size:30px;">�b��:</b>
				</td>
				<td>
					<p align=left>
						<input type=text name="account" value="${memVO2.mem_act}" size=20 required>
				</td>
			</tr>
			<tr>
				<td>
					<p align=right>
						<b style="font-size:30px;">�K�X:</b>
				</td>
				<td>
					<p align=left>
						<input type=password name="password" value="" size=20 required>
				</td>
			</tr>
			<tr>
				<td colspan=2 align=center>
					
					<input type=submit value="�n�J" >
					<input type="hidden" name="action" value="login">
					
				</td>
			</tr>
		</table>
			
		<h4 style="margin-left:350px"><a href="<%=request.getContextPath()%>/front-end/mem/forgetPsw.jsp">�ѰO�K�X?</a></h4>
			
	</FORM>
	</div>
				
		<jsp:include page="/front-end/front/footer.jsp" />

<!--sweet alert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

<script>
	
	<!--�P�_�U�ت��p��-->
	var x = `${x}`;
	function hint() {
		if (x === "success") {
// 			alert("���߱z�I���U���\�I");
			swal({
				  title: "���߱z�I���U���\�I",
				  text: "3���۰������C",
				  icon: "success",
				  timer: 3000,
				  showConfirmButton: true
				});
		} else if (x === "mail") {
// 			alert("�{�ɱK�X�w�H�X�A�Ц�email�H�c�d���I");
			swal({
				  title: "�{�ɱK�X�w�H�X�A�Ьd��email�I",
				  text: "3���۰������C",
				  icon: "success",
				  timer: 3000,
				  showConfirmButton: true
				});
		} else if (x === "quit") {
// 			alert("�z�w�Q���v�I�Ч��I�u�I");
			swal({
				  title: "�z�w�Q���v�I�G�L�k�n�J�I" + "\n" + "������ðݽЬ��ȪA�C",
				  text: "3���۰������C",
				  icon: "error",
				  timer: 3000,
				  showConfirmButton: true
				});
		} else if (x === "logfail") {
// 			alert("�b���αK�X�L�ġI�Э��s��J�I");
			swal({
				  title: "�b���αK�X�L�ġI�Э��s��J�I",
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