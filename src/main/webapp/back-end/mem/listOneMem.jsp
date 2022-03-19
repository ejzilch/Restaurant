<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mem.model.*"%>
<%@ page import="java.util.*"%>

<%
  MemVO empVO = (MemVO) request.getAttribute("memVO");
%>

<html>
<head>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
<title>�|�����</title>

<style>

	#loc{
 		position: relative;
		top: 150px;
		z-index: 10;
		font-size: 150%;
	}
	#container{
	  	margin:0 auto;
	  	width: 1300px;
	}
	
</style>

</head>
<body>
	
<div class="wrapper">
	
	<div id="content">
	
	<div id="container">
	<div id="loc" style="margin-left:100px">
	<a class="btn btn-primary" href="select_page_mem.jsp" role="button"><i class="fas fa-home" style="font-size:25px"></i></a>
	<p><p>
	<label class="btn btn-success" style="cursor:pointer"><i class="fas fa-reply" style="font-size:25px" onclick="history.back()"></i></label>
	<p><p>
	<h3>�|�����</h3>

	<table style="border:3px #cccccc solid; text-align:center; font-size: 80%;" cellpadding="10" border='1'>
		<tr>
			<th>�|���s��</th>
			<th>�|���m�W</th>
			<th>�b��</th>
			<th>�ʧO</th>
			<th>�ͤ�</th>
			<th>���</th>
			<th>�a�}</th>
			<th>e-mail</th>
			
		</tr>
		<tr>
			<td>${memVO.mem_no}</td>
			<td>${memVO.mem_name}</td>
			<td>${memVO.mem_act}</td>
			<td>${memVO.mem_gen}</td>
			<td>${memVO.mem_bir}</td>
			<td>${memVO.mem_tel}</td>
			<td>${memVO.mem_adrs}</td>
			<td>${memVO.mem_mail}</td>
				
		</tr>
		
	</table>
	
	<p><p>
	
	<h3>�|�����A</h3>
	
	<table style="border:3px #cccccc solid; text-align:center; font-size: 80%;" cellpadding="10" border='1'>
		<tr>
			<th>���Q�I��</th>
			<th>�O�_�i�q�\</th>
			<th>�O�_�i�q��</th>
			<th>�O�_�i����</th>
			<th>�O�_�i���|</th>
			<th>���v���A</th>
			<th>���A�ק�</th>
			
		</tr>
		
		<tr>
			<td>${memVO.mem_bns}</td>
			<td>${(memVO.mem_od_m == 1) ? "�i" : "���i"}</td>
			<td>${(memVO.mem_od_r == 1) ? "�i" : "���i"}</td>
			<td>${(memVO.mem_review == 1) ? "�i" : "���i"}</td>
			<td>${(memVO.mem_repo == 1) ? "�i" : "���i"}</td>
			<td>${(memVO.mem_sts == 1) ? "�����v" : "���v"}</td>
					
			<td>
				<FORM METHOD="post" ACTION="<%=request.getContextPath()%>/back-end/mem/mem.do" style="margin-bottom: 0px;">
					<label style="cursor:pointer"><i class="fas fa-wrench" style="font-size:25px"></i><input type="submit" value="���A�ק�" style="display:none"></label>
				    <input type="hidden" name="mem_no" value="${memVO.mem_no}">
				    <input type="hidden" name="action"	value="Update_sts">
				</FORM>
			</td>
				
		</tr>
	
	</table>
	</div>
	</div>
	</div>
</div>
	
	<jsp:include page="/back-end/siderbar/siderbar.jsp" />
	
</body>
</html>