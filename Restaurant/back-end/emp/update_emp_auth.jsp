<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.emp.model.*"%>
<%@ page import="com.emp_auth.model.*"%>
<%@ page import="com.fun_auth.model.*"%>
<%@ page import="java.util.*"%>

<%
  EmpVO empVO = (EmpVO) request.getAttribute("empVO"); //EmpServlet.java (Concroller) �s�Jreq��empVO���� (�]�A�������X��empVO, �]�]�A��J��ƿ��~�ɪ�empVO����)
%>

<%
  List<Fun_authVO> fun_authVO = (List<Fun_authVO>) request.getAttribute("fun_authVO");
%>

<% 
  List<Emp_authVO> emp_authVO = (List<Emp_authVO>) request.getAttribute("emp_authVO");
%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
<title>���u�v���ק�</title>

<style>

	#loc{
 		position: relative;
		top: 150px;
		z-index: 10;
		font-size: 150%;
	}
	#container{
	  	margin:0 auto;
	  	width: 1200px;
	}
	
	td {
		width: 300px;
	}
	
</style>

</head>
<body>

<div class="wrapper">
	
	<div id="content">

	<div id="container">
	<div id="loc">
	<a class="btn btn-primary" href="select_page.jsp" role="button"><i class="fas fa-home" style="font-size:25px"></i></a>
	<p><p>
	<label class="btn btn-success" style="cursor:pointer"><i class="fas fa-reply" style="font-size:25px" onclick="history.back()"></i></label>
	<p><p>
	<h3 style="font-size: 120%;">���u�v���ק�</h3>

	<h5 style="font-size: 100%;">�v���ק�:</h5>
	
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>

	<FORM METHOD="post" ACTION="emp.do" name="form1">
	<table style="font-size: 120%;">
		<tr>
			<td><i class="fas fa-user"></i>&ensp;���u�s��:</td>
			<td><%=empVO.getEmp_no()%></td>
		</tr>
		<tr>
			<td><i class="fas fa-user"></i>&ensp;���u�m�W:</td>
			<td><%=empVO.getEmp_name()%></td>
		</tr>
	</table>
		<p><p>
		
		<jsp:useBean id="fun_authSvc" scope="page" class="com.fun_auth.model.Fun_authService" />
		
		�v���s�W:<font color=red><b>*</b></font><p><p>
	<table style="font-size: 80%;">
		<tr>
			<c:forEach var="fun_authVO" items="${fun_authSvc.all}" begin="0" end="4">
				<td><span class="textcolor"><label><input class="check1" name="fun_no[]" type="checkbox" value="${fun_authVO.fun_no}">${fun_authVO.fun_name}&emsp;</label></span></td>
			</c:forEach>
		</tr>
		<tr>
			<c:forEach var="fun_authVO" items="${fun_authSvc.all}" begin="5" end="9">
				<td><span class="textcolor"><label><input class="check1" name="fun_no[]" type="checkbox" value="${fun_authVO.fun_no}">${fun_authVO.fun_name}&emsp;</label></span></td>
			</c:forEach>
		</tr>
		<tr>
			<c:forEach var="fun_authVO" items="${fun_authSvc.all}" begin="10" end="14">
				<td><span class="textcolor"><label><input class="check1" name="fun_no[]" type="checkbox" value="${fun_authVO.fun_no}">${fun_authVO.fun_name}&emsp;</label></span></td>
			</c:forEach>
		</tr>
		<tr>
			<c:forEach var="fun_authVO" items="${fun_authSvc.all}" begin="15" end="19">
				<td><span class="textcolor"><label><input class="check1" name="fun_no[]" type="checkbox" value="${fun_authVO.fun_no}">${fun_authVO.fun_name}&emsp;</label></span></td>
			</c:forEach>
		</tr>
		<tr>
			<c:forEach var="fun_authVO" items="${fun_authSvc.all}" begin="20" end="24">
				<td><span class="textcolor"><label><input class="check1" name="fun_no[]" type="checkbox" value="${fun_authVO.fun_no}">${fun_authVO.fun_name}&emsp;</label></span></td>
			</c:forEach>
		</tr>
	</table>		
	<input type="hidden" name="action" value="update_a">
	<input type="hidden" name="emp_no" value="<%=empVO.getEmp_no()%>">
	<input type="hidden" name="emp_name" value="<%=empVO.getEmp_name()%>">
	<input type="hidden" name="emp_sts" value="<%=empVO.getEmp_sts()%>">
	<input type="submit" id="ok" class="btn btn-outline-primary" value="�e�X�s�W">
	
	<div id="fun" style="display:none">
		<c:forEach var="emp_authVO" items="${emp_authVO}">
			<span class="check2">${emp_authVO.fun_no}</span>
		</c:forEach>
	</div>
	</FORM>
	</div>
	</div>
	</div>
</div>

	<jsp:include page="/back-end/siderbar/siderbar.jsp" />
	
<script>
	
	// �ϳQ��L���v�����Ĩ���ܬ���
	var check1 = document.getElementsByClassName("check1");
	var arr1 = [];
	for (let i = 0; i < check1.length; i++) {
		var x = check1[i].value;
		arr1.push(x);
	}
	
	var check2 = document.getElementsByClassName("check2");
	var arr2 = [];
	for (let i = 0; i < check2.length; i++) {
		var y = check2[i].innerText;
		arr2.push(y);
	}
	
	var textcolor = document.getElementsByClassName("textcolor");
	
	for (let i = 0; i < arr1.length; i++) {
		for (let j = 0; j < arr2.length; j++) {
			if (arr1[i] === arr2[j]) {
				check1[i].checked = true;
				textcolor[i].style.color = 'red';
			}
		}
	}
	
	// �b�S�Ŀ�����v�������p�U�L�k�e�X
// 	var btn = document.getElementById("ok");
	
// 	btn.onclick = function(e){
// 	    var obj = document.getElementsByName("fun_no[]");
// 	    var selected = [];
// 	    for (var i = 0; i < obj.length; i++) {
// 	        if (obj[i].checked) {
// 	            selected.push(obj[i].value);
// 	        }
// 	    }
// 	    if(selected.length === 0) {
// 	      	alert('�Цܤ֤Ŀ�@���v���I');
// 	      	e.preventDefault();
// 	    }
// 	};
	      
</script>

</body>
</html>