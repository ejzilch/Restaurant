<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mem.model.*"%>

<% 
	MemVO memVO = (MemVO) request.getAttribute("memVO");
%>
<%
	String x = (String) request.getAttribute("x"); // �P�_�ק令�\��
%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<title>�|�����</title>

<style>

#container{
  padding-top: 50px;
  padding-bottom: 50px;
  margin:0 auto;
  width: 800px;
}

.t{
	text-align: right;
}

</style>

</head>
<body onload="hint()">
	
	<%@ include file="/front-end/headfinish.jsp"%>
	
<!-- 	<h4><a href="select_page.jsp">�^�D��</a></h4> -->

	<div id="container">
	<h3 style="text-align:center">�|�����</h3>
	
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	
	<FORM METHOD="post" ACTION="mem.do" name="form1">
	<table border="1" style="width:600px; margin-left:100px; background-color:#eee;" class="table table-striped">
		<tr>
			<td class="t">�|���s��:&emsp;</td>
			<td>&emsp;${memVO.mem_no}</td>
		</tr>
		<tr>
			<td class="t">�|���m�W:&emsp;</td>
			<td>&emsp;${memVO.mem_name}</td>
		</tr>
		<tr>
			<td class="t">�b��:&emsp;</td>
			<td>&emsp;${memVO.mem_act}</td>
		</tr>
		<tr>
			<td class="t">�ʧO:&emsp;</td>
			<td>&emsp;${memVO.mem_gen}</td>
		</tr>
		<tr>
			<td class="t">�ͤ�:&emsp;</td>
			<td>&emsp;${memVO.mem_bir}</td>
		</tr>
		<tr>
			<td class="t">���:&emsp;</td>
			<td>&emsp;${memVO.mem_tel}</td>
		</tr>
		<tr>
			<td class="t">�a�}:&emsp;</td>
			<td>&emsp;${memVO.mem_adrs}</td>
		</tr>
		<tr>
			<td class="t">e-mail:&emsp;</td>
			<td>&emsp;${memVO.mem_mail}</td>
		</tr>
		<tr>
			<td class="t">���Q�I��:&emsp;</td>
			<td>&emsp;${(memVO.mem_bns == null) ? 0 : memVO.mem_bns}</td>
		</tr>
<!-- 		<tr> -->
<!-- 			<td class="t">�O�_�i�q�\:&emsp;</td> -->
<%-- 			<td>&emsp;${(memVO.mem_od_m == 0) ? "���i" : "�i"}</td> --%>
<!-- 		</tr> -->
<!-- 		<tr> -->
<!-- 			<td class="t">�O�_�i�q��:&emsp;</td> -->
<%-- 			<td>&emsp;${(memVO.mem_od_r == 0) ? "���i" : "�i"}</td> --%>
<!-- 		</tr> -->
<!-- 		<tr> -->
<!-- 			<td class="t">�O�_�i����:&emsp;</td> -->
<%-- 			<td>&emsp;${(memVO.mem_review == 0) ? "���i" : "�i"}</td> --%>
<!-- 		</tr> -->
<!-- 		<tr> -->
<!-- 			<td class="t">�O�_�i���|:&emsp;</td> -->
<%-- 			<td>&emsp;${(memVO.mem_repo == 0) ? "���i" : "�i"}</td> --%>
<!-- 		</tr> -->
	</table>
		
		<p><p>
		
		<input type="submit" value="�Ӹ�M�K�X�ק�" style="margin-left:335px">
		<input type="hidden" name="mem_no" value="${memVO.mem_no}">
		<input type="hidden" name="action" value="Update_info">
	
	</FORM>
	
	<form action="<%=request.getContextPath() %>/front-end/mem/login_success_mem.jsp">
		<input type="submit" value="�^�\��C��" style="margin-left:350px">
	</form>
	
	</div>
	
	<jsp:include page="/front-end/front/footer.jsp" />
	
<!--sweet alert -->
<script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>
	
<script>
	
	<!--�P�_�ק令�\��-->
	var x = `${x}`;
	function hint() {
		if (x === "success") {
// 			alert("���߱z�I�ק令�\�I");
			swal({
				  title: "���߱z�I�ק令�\�I",
				  text: "3���۰������C",
				  icon: "success",
				  timer: 3000,
				  showConfirmButton: true
				});
		}
	}
	
</script>
	
</body>
</html>