<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ page import="java.util.*"%>
<%@ page import="com.report_appraise.model.*"%>
<%-- �����m�߱ĥ� EL ���g�k���� --%>

<%
    Report_AppraiseService report_appraiseSvc = new Report_AppraiseService();
    List<Report_AppraiseVO> list = report_appraiseSvc.getAll();
    pageContext.setAttribute("list",list);
%>


<html>
<head>
<title>�Ҧ����|���� - listAllReport_Appraise.jsp</title>

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
	width: 800px;
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

</head>
<body bgcolor='white'>

<h4>�����m�߱ĥ� EL ���g�k����:</h4>
<table id="table-1">
	<tr><td>
		 <h3>�Ҧ����|���e - listAllReport_Appraise.jsp</h3>
		 <h4><a href="select_page.jsp"><img src="images/back1.gif" width="100" height="32" border="0">�^����</a></h4>
	</td></tr>
</table>

<%-- ���~���C --%>
<c:if test="${not empty errorMsgs}">
	<font style="color:red">�Эץ��H�U���~:</font>
	<ul>
		<c:forEach var="message" items="${errorMsgs}">
			<li style="color:red">${message}</li>
		</c:forEach>
	</ul>
</c:if>

<table>
	<tr>
		<th>���|�s��</th>
		<th>�����s��</th>
		<th>�|���s��</th>
		<th>���u�s��</th>
		<th>���|���</th>
		<th>���|���e</th>
		<th>�B�z���A</th>
		<th>�ק�</th>
		<th>�R��</th>
	</tr>
	<%@ include file="page1.file" %> 
	<c:forEach var="report_appraiseVO" items="${list}" begin="<%=pageIndex%>" end="<%=pageIndex+rowsPerPage-1%>">
		
		<tr>
			<td>${report_appraiseVO.report_no}</td>
			<td>${report_appraiseVO.review_no}</td>
			<td>${report_appraiseVO.mem_no}</td>
			<td>${report_appraiseVO.emp_no}</td>
			<td>${report_appraiseVO.report_date}</td>
			<td>${report_appraiseVO.report_con}</td>
			<td>${report_appraiseVO.reply_sts}</td> 
			
			<td>
			  <FORM METHOD="post" ACTION="<%=request.getContextPath()%>/back-end/report_appraise/forwarded" style="margin-bottom: 0px;">
			     <input type="submit" value="�ק�">
			     <input type="hidden" name="report_no"  value="${report_appraiseVO.report_no}">
			     <input type="hidden" name="action"	value="getOne_For_Update"></FORM>
			</td>
			<td>
			  <FORM METHOD="post" ACTION="<%=request.getContextPath()%>/back-end/report_appraise/forwarded" style="margin-bottom: 0px;">
			     <input type="submit" value="�R��">
			     <input type="hidden" name="report_no"  value="${report_appraiseVO.report_no}">
			     <input type="hidden" name="action" value="delete"></FORM>
			</td>
		</tr>
	</c:forEach>
</table>
<%@ include file="page2.file" %>

</body>
</html>