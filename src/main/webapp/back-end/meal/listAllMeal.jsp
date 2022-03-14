<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ page import="java.util.*"%>
<%@ page import="java.io.*"%>
<%@ page import="com.meal.model.*"%>

<%
     MealService mealSrv = new MealService(); 
     List<MealVO> list = mealSrv.getAll(); 
     request.setAttribute("list",list);
%>

<jsp:useBean id="mealCatSrv" class="com.meal_category.model.MealCatService"/>


<html>
<head>


<style>
  table {
	width: 1100px;
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
  img{
  	width:250px;
  	height:180px;
  }
  #index{
  	width:100;
  	height:32;
  }
</style>
<meta charset="BIG5">
<title>�\�I�޲z - Meal_Manage</title>
</head>
<body>
<table id="table-1">
	<tr><td>
		 <h3>�\�I�޲z</h3>
		 <h4><a  href="<%= request.getContextPath() %>/back-end/back-index.jsp"><img id="index" src="<%= request.getContextPath() %>/back-end/meal/meal_Img/back1.gif" width="100px" height="32px" border="0">�^����</a></h4>
	</td></tr>
</table>
<c:if test="${not empty errormsgs}">
	<font style="color:red">�Эץ��H�U���~:</font>
	<ul>
	    <c:forEach var="message" items="${errormsgs}">
			<li style="color:red">${message.value}</li>
		</c:forEach>
	</ul>
</c:if>
	<a href="<%= request.getContextPath() %>/back-end/meal/insertMeal.jsp">�s�W�\�I</a>
 	
	<table>
	
	<tr>
		<th>�\�I�s��</th>
		<th>�\�I�W��</th>
		<th>�\�I�y�z</th>
		<th>�Ϥ�</th>
		<th>����</th>
		<th>����</th>
		<th>�W�U�[���A</th>
		
	</tr>
	<c:forEach var="mealVO" items="${list}">
		
		<tr>
			<td>${mealVO.meal_no}</td>
			<td>${mealVO.meal_name}</td>
			<td>${mealVO.meal_info}</td>
			<td><img name="meal_img" src="<%= request.getContextPath() %>/meal/meal.showPic?meal_img=${mealVO.meal_no}"/></td>
			<td>${mealVO.meal_price}</td>
			<td>
			<c:forEach var="mealCatVO" items="${mealCatSrv.all}">
                    <c:if test="${mealVO.cat_no == mealCatVO.cat_no}">
	                    ${mealCatVO.cat_name}
                    </c:if>
                </c:forEach>
			</td>
			<c:if test="${mealVO.meal_sts == 0}">
			<td>�w�U�[</td></c:if>
			<c:if test="${mealVO.meal_sts == 1}">
			<td>�W�[��</td></c:if> 
			
			<td>
			  <FORM METHOD="post" ACTION="<%= request.getContextPath() %>/meal/meal.do" style="margin-bottom: 0px;">
			     <input type="submit" value="�ק��\�I">
			     <input type="hidden" name="meal_no"  value="${mealVO.meal_no}">
			     <input type="hidden" name="action"	value="getOneupdate"></FORM>
			</td>
			
		</tr>
	</c:forEach>
	</table>


</body>
</html>