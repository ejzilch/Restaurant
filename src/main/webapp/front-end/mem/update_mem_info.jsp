<%@ page contentType="text/html; charset=UTF-8" pageEncoding="Big5"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ page import="com.mem.model.*"%>

<% 
	MemVO memVO = (MemVO) request.getAttribute("memVO");
%>

<html>
<head>
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
<title>�|����ƭק�</title>

<style>
.city, .town{width: 100%;}
.f1{float:left;margin-left:5px;margin-right:5px;width:calc(5% - 10px)}
.f2{float:left;margin-left:5px;margin-right:5px;width:calc(10% - 10px)}
.f3{float:left;margin-left:5px;margin-right:5px;width:calc(15% - 10px)}
.f4{float:left;margin-left:5px;margin-right:5px;width:calc(20% - 10px)}
.f5{float:left;margin-left:5px;margin-right:5px;width:calc(25% - 10px)}
.f6{float:left;margin-left:5px;margin-right:5px;width:calc(30% - 10px)}
.f7{float:left;margin-left:5px;margin-right:5px;width:calc(35% - 10px)}
.f8{float:left;margin-left:5px;margin-right:5px;width:calc(40% - 10px)}
.f9{float:left;margin-left:5px;margin-right:5px;width:calc(45% - 10px)}
.f10{float:left;margin-left:5px;margin-right:5px;width:calc(50% - 10px)}
.f11{float:left;margin-left:5px;margin-right:5px;width:calc(55% - 10px)}
.f12{float:left;margin-left:5px;margin-right:5px;width:calc(60% - 10px)}
.f13{float:left;margin-left:5px;margin-right:5px;width:calc(65% - 10px)}
.f14{float:left;margin-left:5px;margin-right:5px;width:calc(70% - 10px)}
.f15{float:left;margin-left:5px;margin-right:5px;width:calc(75% - 10px)}
.f16{float:left;margin-left:5px;margin-right:5px;width:calc(80% - 10px)}
.f17{float:left;margin-left:5px;margin-right:5px;width:calc(85% - 10px)}
.f18{float:left;margin-left:5px;margin-right:5px;width:calc(90% - 10px)}
.f19{float:left;margin-left:5px;margin-right:5px;width:calc(95% - 10px)}
.f20{float:left;margin-left:5px;margin-right:5px;width:calc(100% - 10px)}
</style>

<style>

#container{
  padding-top: 50px;
  padding-bottom: 50px;
  margin:0 auto;
  width: 600px;
  background-color:#eee;
}

</style>

</head>
<body>
	
	<%@ include file="/front-end/headfinish.jsp"%>
	
<!-- 	<h4><a href="select_page.jsp">�^�D��</a></h4> -->

	<div id="container">
	<h3 style="text-align:center">�|����ƭק�</h3>
	
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
	
	<ul>
		<li>�|���m�W:<font color=red><b>*</b></font><input type="text" name="mem_name" size="45" value="${memVO.mem_name}" required/></li><p><p>
		
		<li>�K�X:<font color=red><b>*</b></font>&emsp;&emsp;<input type="password" name="mem_psw1" size="45" value="" required/></li><p><p>
		<li>�K�X�T�{:<font color=red><b>*</b></font><input type="password" name="mem_psw2" size="45" value="" required/></li><p><p>
		<li>�ʧO:&emsp;&emsp;&emsp;<label><input type="radio" name="mem_gen" size="45" value="�k" />�k</label>
 				<label><input type="radio" name="mem_gen" size="45" value="�k" />�k</label>
 				<label><input type="radio" name="mem_gen" size="45" value="��L" />��L</label></li><p><p>
		<li>�ͤ�:<font color=red><b>*</b></font>&emsp;&emsp;&ensp;<input type="date" name="mem_bir" size="45" value="${memVO.mem_bir}" required/></li><p><p>
		<li>���:<font color=red><b>*</b></font>&emsp;&emsp;<input type="text" name="mem_tel" size="45" value="${memVO.mem_tel}" required/></li><p><p>
		<li>e-mail:<font color=red><b>*</b></font>&ensp;<input type="email" name="mem_mail" size="45" value="${memVO.mem_mail}" required/></li><p><p>
		<li>�a�}:
			<div id="zipcode3" style="width: 800px">
 			<div class="f3" data-role="county" name="city"></div>
			<div class="f4" data-role="district" name="town"></div>
			</div>
			<br><br>
			<input name="address" type="text" size="50px" value="${memVO.mem_adrs}">
		</li>
	</ul>
	
	<input type="submit" id="ok" value="�e�X�ק�" style="margin-left:250px">
	<input type="hidden" name="mem_no" value="${memVO.mem_no}">
	<input type="hidden" name="action" value="update_i">
	</FORM>
	
	<form action="<%=request.getContextPath() %>/front-end/mem/login_success_mem.jsp">
		<input type="submit" value="�^�\��C��" style="margin-left:245px">
	</form>

	</div>
	
<script>
	$("#zipcode3").twzipcode({
	"zipcodeIntoDistrict": true,
	"css": ["city form-control", "town form-control"],
	"countyName": "city", // ���w���� select name
	"districtName": "town" // ���w�a�� select name
	});
</script>

<script>
	$("#twzipcode").twzipcode();
</script>
	
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
<script src="<%=request.getContextPath()%>/back-end/js/jquery.twzipcode.min.js"></script>	
	
	<jsp:include page="/front-end/front/footer.jsp" />



<span id="gen">${memVO.mem_gen}</span>
<script>
	
	// �ھڸ�Ʈw�w�]�ʧO
	var gen = document.getElementById("gen");
	
	var mem_gen = document.getElementsByName("mem_gen");
	
	for (let i = 0; i < mem_gen.length; i++) {
		if (mem_gen[i].value === gen.innerText) {
			mem_gen[i].checked = true;
			break;
		}
	}
	
	// �ק令�\�T��
// 	var mem_psw1 = document.getElementsByName("mem_psw1");
// 	var mem_psw2 = document.getElementsByName("mem_psw2");
// 	var ok = document.getElementById("ok");
	
// 	ok.addEventListener("click", function(e) {
// 		if (mem_psw1[0].value !== "" && mem_psw2[0].value !== "" && mem_psw1[0].value === mem_psw2[0].value) {
// 			alert("�ק令�\");
// 		}
// 	});
	
</script>

</body>
</html>