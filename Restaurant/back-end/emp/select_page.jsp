<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<html>
<head>
<title>���u�޲z�D��</title>
<script src="https://kit.fontawesome.com/d6c1e36c40.js" crossorigin="anonymous"></script>
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
	<div id="loc"  style="margin-left:100px">
	
	<h3 style="margin-left:135px">���u�޲z�D��</h3>
	
	<%-- ���~��C --%>
	<c:if test="${not empty errorMsgs}">
		<font style="color:red">�Эץ��H�U���~:</font>
		<ul>
		    <c:forEach var="message" items="${errorMsgs}">
				<li style="color:red">${message}</li>
			</c:forEach>
		</ul>
	</c:if>
	
	
	<h5>��Ƭd��:</h5>
	
	<ul>
	  <li>
	    <FORM METHOD="post" ACTION="emp.do" >
	        <b>��J���u�s�� :</b>
	        <input type="text" name="emp_no" placeholder="EMP0001" size="6px" required>
	        <input type="hidden" name="action" value="getOne_For_Display">
	        <input type="submit" value="�e�X">
	    </FORM>
	  </li>
	  
	  <li>
	    <FORM METHOD="post" ACTION="emp.do" >
	        <b>��J���u�m�W :</b>
	        <input type="text" name="emp_name" placeholder="���p��" size="6px" required>
	        <input type="hidden" name="action" value="getOne_For_Display_ByName">
	        <input type="submit" value="�e�X">
	    </FORM>
	  </li>
	  
	  <jsp:useBean id="empSvc" scope="page" class="com.emp.model.EmpService" />
	   
	  <li>
	     <FORM METHOD="post" ACTION="emp.do" >
	       <b>��ܭ��u�s��:</b>
	       <select size="1" name="emp_no">
	         <c:forEach var="empVO" items="${empSvc.all}" > 
	          <option value="${empVO.emp_no}">${empVO.emp_no}
	         </c:forEach>   
	       </select>
	       <input type="hidden" name="action" value="getOne_For_Display">
	       <input type="submit" value="�e�X">
	    </FORM>
	  </li>
	  
	  <li>
	     <FORM METHOD="post" ACTION="emp.do" >
	       <b>��ܭ��u�m�W:</b>
	       <select size="1" name="emp_no">
	         <c:forEach var="empVO" items="${empSvc.all}" > 
	          <option value="${empVO.emp_no}">${empVO.emp_name}
	         </c:forEach>   
	       </select>
	       <input type="hidden" name="action" value="getOne_For_Display">
	       <input type="submit" value="�e�X">
	     </FORM>
	  </li>
	</ul>

	&emsp;&emsp;&ensp;<a class="btn btn-outline-secondary" href="listAllEmp.jsp" role="button"><i class="fas fa-file-alt" style="font-size:20px"></i>&ensp;�Ҧ����u�C��</a>
	<p><p>
	
	<h5>���u�޲z:</h5>
	
	  &emsp;&emsp;&ensp;<a class="btn btn-outline-secondary" href="addEmp.jsp" role="button"><i class="fas fa-user-plus" style="font-size:20px"></i>&ensp;�s�W���u</a>
	  
	</div>
	</div>
	</div>
</div>
	
	<jsp:include page="/back-end/siderbar/siderbar.jsp" />

</body>
</html>