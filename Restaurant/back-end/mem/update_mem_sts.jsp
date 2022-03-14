<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mem.model.*"%>

<%
  MemVO memVO = (MemVO) request.getAttribute("memVO");
%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
<title>�|�����A�ק�</title>

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
	<div id="loc" style="margin-left:135px">
	<a class="btn btn-primary" href="select_page_mem.jsp" role="button"><i class="fas fa-home" style="font-size:25px"></i></a>
	<p><p>
	<label class="btn btn-success" style="cursor:pointer"><i class="fas fa-reply" style="font-size:25px" onclick="history.back()"></i></label>
	<p><p>
	<h3 style="font-size: 120%;">�|�����A�ק�</h3>
	
	<h5 style="font-size: 120%;">���A�ק�:</h5>
	
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
	<table style="font-size: 120%;">
		<tr>
			<td><i class="fas fa-user"></i>&ensp;�|���s��:</td>
			<td><%=memVO.getMem_no()%></td>
		</tr>
		<tr>
			<td><i class="fas fa-user"></i>&ensp;�|���m�W:</td>
			<td><%=memVO.getMem_name()%></td>
		</tr>
		
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;���Q�I��:<font color=red><b>*</b></font></td>
			<td><input type="text" size="5px" name="mem_bns" value="${memVO.mem_bns}"></td>
		</tr>
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;�O�_�i�q�\:<font color=red><b>*</b></font></td>
			<td><select size="1" name="mem_od_m">
				<option value="${(memVO.mem_od_m == 1) ? 1 : 0}" >${(memVO.mem_od_m == 1) ? "�i" : "���i"}
				<option value="${(memVO.mem_od_m == 1) ? 0 : 1}" >${(memVO.mem_od_m == 1) ? "���i" : "�i"}
			</select></td>
		</tr>
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;�O�_�i�q��:<font color=red><b>*</b></font></td>
			<td><select size="1" name="mem_od_r">
				<option value="${(memVO.mem_od_r == 1) ? 1 : 0}" >${(memVO.mem_od_r == 1) ? "�i" : "���i"}
				<option value="${(memVO.mem_od_r == 1) ? 0 : 1}" >${(memVO.mem_od_r == 1) ? "���i" : "�i"}
			</select></td>
		</tr>
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;�O�_�i����:<font color=red><b>*</b></font></td>
			<td><select size="1" name="mem_review">
				<option value="${(memVO.mem_review == 1) ? 1 : 0}" >${(memVO.mem_review == 1) ? "�i" : "���i"}
				<option value="${(memVO.mem_review == 1) ? 0 : 1}" >${(memVO.mem_review == 1) ? "���i" : "�i"}
			</select></td>
		</tr>
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;�O�_�i���|:<font color=red><b>*</b></font></td>
			<td><select size="1" name="mem_repo">
				<option value="${(memVO.mem_repo == 1) ? 1 : 0}" >${(memVO.mem_repo == 1) ? "�i" : "���i"}
				<option value="${(memVO.mem_repo == 1) ? 0 : 1}" >${(memVO.mem_repo == 1) ? "���i" : "�i"}
			</select></td>
		</tr>
		<tr>
			<td><i class="fas fa-hand-point-right"></i>&ensp;���v���A:<font color=red><b>*</b></font></td>
			<td><select size="1" name="mem_sts">
				<option value="${(memVO.mem_sts == 1) ? 1 : 0}" >${(memVO.mem_sts == 1) ? "�����v" : "���v"}
				<option value="${(memVO.mem_sts == 1) ? 0 : 1}" >${(memVO.mem_sts == 1) ? "���v" : "�����v"}
			</select></td>
		</tr>
		
	</table>
	<br>
	<input type="hidden" name="action" value="update_s">
	<input type="hidden" name="mem_no" value="${memVO.mem_no}">
	<input type="submit" id="ok" class="btn btn-outline-primary" value="�e�X�ק�">
	</FORM>
	</div>
	</div>
	</div>
</div>
	
	<jsp:include page="/back-end/siderbar/siderbar.jsp" />
	
</body>
</html>