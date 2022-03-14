<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="BIG5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
<title>���u�n�J</title>

<style>
	#loc{
 		position: relative;
		top: 150px;
		z-index: 10;
		font-size: 150%;
	}
	#container{
	  	margin:0 auto;
	  	width: 600px;
	}
</style>

</head>
<body>
	
<div class="wrapper">
	
	<div id="content">
	
	<div id="container">
	<div id="loc">
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	
	<FORM METHOD="post" ACTION="<%=request.getContextPath()%>/back-end/emp/emp.do" style="margin-bottom: 0px;">
		<table style="margin-left:100px">
				<tr>
					<td colspan=2 align=center>
						<h4>��&ensp;�u&ensp;�n&ensp;�J</h4>
					</td>
				</tr>

				<tr>
					<td>
						<p align=right>
							<b><i class="fas fa-user"></i>&ensp;���u�s��:</b>
					</td>
					<td>
						<p>
							<input type=text name="account" value="" size=15 required>
					</td>
				</tr>

				<tr>
					<td>
						<p align=right>
							<b><i class="fas fa-user"></i>&ensp;���u�K�X:</b>
					</td>
					<td>
						<p>
							<input type=password name="password" value="" size=15 required>
					</td>
				</tr>

				<tr>
					<td colspan=2 align=center>
						
						<label style="cursor:pointer"><i class="fas fa-sign-in-alt" style="font-size:40px"></i><input type="submit" value="�n�J" style="display:none"></label>
						<input type="hidden" name="action" value="login">
						
					</td>
				</tr>
			</table>
		</FORM>
		</div>
	</div>
	</div>
</div>
		<jsp:include page="/back-end/siderbar/siderbar.jsp" />
		
</body>
</html>