<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="com.member_review.model.*"%>
<%@ page import="com.report_appraise.model.*"%>

<%
	Member_ReviewVO member_reviewVO = (Member_ReviewVO) request.getAttribute("member_reviewVO"); //EmpServlet.java (Concroller) �s�Jreq��empVO���� (�]�A�������X��empVO, �]�]�A��J��ƿ��~�ɪ�empVO����)
%>
<jsp:useBean id="member_reviewSvc" scope="page"
	class="com.member_review.model.Member_ReviewService" />
	
<%
	Report_AppraiseVO report_appraiseVO = (Report_AppraiseVO) request.getAttribute("report_appraiseVO"); //EmpServlet.java (Concroller) �s�Jreq��empVO���� (�]�A�������X��empVO, �]�]�A��J��ƿ��~�ɪ�empVO����)
%>
<jsp:useBean id="report_appraiseSvc" scope="page"
	class="com.report_appraise.model.Report_AppraiseService" />

<html>
<head>
<title>�������|�s�W</title>

<style>
  table#table-1 {
	background-color: #CCCCFF;
    border: 2px solid black;
    text-align: center;
  }
  table#table-1 h4 {
    color: red;
    display: block;
    margin-bottom: 1px;
  }
  h4 {
    color: blue;
    display: inline;
  }
</style>

<style>
  table {
	width: 600px;
	background-color: white;
	margin-top: 5px;
	margin-bottom: 5px;
  }
  table, th, td {
    border: 1px solid #CCCCFF;
  }
  th, td {
    padding: 5px;
    text-align: center;
  }
</style>
<%@ include file="/front-end/headfinish.jsp"%>
</head>
<body bgcolor='white'>
<br>
<table align="center">
	<tr>
<!-- 		<th>���|�s��</th> -->
		<th>�����s��</th>
		<th>�|���s��</th>
		<th>���|���e</th>
		<th>���|���</th>
		<th>���A</th>
	</tr>
	<tr>
<%-- 		<td><%=report_appraiseVO.getReport_no()%></td> --%>
		<td><%=report_appraiseVO.getReview_no()%></td>
		<td><%=report_appraiseVO.getMem_no()%></td>
		<td><%=report_appraiseVO.getReport_con()%></td>
		<td><%=report_appraiseVO.getReport_date()%></td>
		<td><font color="red">�������|���\</font></td>
	</tr>
</table>
<%@ include file="/front-end/footer.jsp"%>
</body>
</html>