<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ page import="com.report_appraise.model.*"%>
<%-- �����Ƚm�߱ĥ� Script ���g�k���� --%>

<%
  Report_AppraiseVO report_appraiseVO = (Report_AppraiseVO) request.getAttribute("report_appraiseVO"); //EmpServlet.java(Concroller), �s�Jreq��empVO����
%>

<html>
<head>
<title>���u��� - listOneReport_Appraise.jsp</title>

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

</head>
<body bgcolor='white'>

<h4>�����Ƚm�߱ĥ� Script ���g�k����:</h4>
<table id="table-1">
	<tr><td>
		 <h3>���|��� - listOneReport_Appraise.jsp</h3>
		 <h4><a href="select_page.jsp"><img src="images/back1.gif" width="100" height="32" border="0">�^����</a></h4>
	</td></tr>
</table>

<table>
	<tr>
		<th>���|�s��</th>
		<th>�q�\�s��</th>
		<th>�|���s��</th>
		<th>���u�s��</th>
		<th>���|���</th>
		<th>���|���e</th>
		<th>���|���A</th>
	</tr>
	<tr>
		<td><%=report_appraiseVO.getReport_no()%></td>
		<td><%=report_appraiseVO.getReview_no()%></td>
		<td><%=report_appraiseVO.getMem_no()%></td>
		<td><%=report_appraiseVO.getEmp_no()%></td>
		<td><%=report_appraiseVO.getReport_date()%></td>
		<td><%=report_appraiseVO.getReport_con()%></td>
		<td><%=report_appraiseVO.getReply_sts()%></td>
	</tr>
</table>

</body>
</html>