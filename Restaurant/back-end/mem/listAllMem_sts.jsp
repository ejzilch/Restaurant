<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.util.*"%>
<%@ page import="com.mem.model.*"%>

<%
  MemVO memVO = (MemVO) request.getAttribute("memVO");
%>

<%
	MemService memSvc = new MemService();
    List<MemVO> list = memSvc.getAll();
    pageContext.setAttribute("list",list);
%>

<html>
<head>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
<title>�Ҧ��|�����A</title>

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
	
</style>

</head>
<body>
	
<div class="wrapper">
	
	<div id="content">	

	<div id="container">
	<div id="loc"  style="margin-left:100px">
	<a class="btn btn-primary" href="select_page_mem.jsp" role="button"><i class="fas fa-home" style="font-size:25px"></i></a>
	<p><p>
	<label class="btn btn-success" style="cursor:pointer"><i class="fas fa-reply" style="font-size:25px" onclick="history.back()"></i></label>
	<p><p>
	<h3>�Ҧ��|�����A</h3>
	
	<jsp:useBean id="memSvc2" scope="page" class="com.mem.model.MemService" />
	
	<div>
		<FORM METHOD="post" ACTION="mem.do" >
	        <b>��J�|���m�W :</b>
	        <input type="text" name="mem_name" placeholder="���p��" size="6px" required>
	        <input type="hidden" name="action" value="getOne_For_Display_ByName">
	        <input type="submit" value="�e�X">
	    </FORM>
	</div>
	
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
			<c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	
	<table style="border:3px #cccccc solid; text-align:center; font-size: 80%;" cellpadding="10" border='1'>
		<tr>
			<th>�|���s��</th>
			<th>�m�W</th>
			<th>���Q�I��</th>
			<th>�O�_�i�q�\</th>
			<th>�O�_�i�q��</th>
			<th>�O�_�i����</th>
			<th>�O�_�i���|</th>
			<th>���v���A</th>
			<th>���A�ק�</th>
			
		</tr>
		<%@ include file="page1.file" %> 
		<c:forEach var="memVO" items="${list}" begin="<%=pageIndex%>" end="<%=pageIndex+rowsPerPage-1%>">
			
			<tr>
				<td>${memVO.mem_no}</td>
				<td>${memVO.mem_name}</td>
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
		</c:forEach>
	</table>
	<%@ include file="page2.file" %>
	</div>
	</div>
	</div>
</div>
	
	<jsp:include page="/back-end/siderbar/siderbar.jsp" />
	
</body>
</html>