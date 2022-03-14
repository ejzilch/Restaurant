package mem_stsfilters;

import java.io.*;
import java.util.*;

import javax.servlet.*;
import javax.servlet.http.*;

import com.emp_auth.model.Emp_authVO;
import com.mem.model.MemVO;

public class Mem_stsFilter implements Filter {

	private FilterConfig config;

	public void init(FilterConfig config) {
		this.config = config;
	}

	public void destroy() {
		config = null;
	}

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws ServletException, IOException {

		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse res = (HttpServletResponse) response;
		// 【取得 session】
		HttpSession session = req.getSession();
		// 取得使用者請求的路徑
		String path = req.getRequestURI();
		System.out.println(path);

		MemVO memVO = (MemVO) session.getAttribute("memVO2");
//		String reserve = req.getContextPath() + "/front-end/res_order/orderSeat.jsp";
//		String meal = req.getContextPath() + "/front-end/shopping/mealMenu2.jsp";
//		String review = req.getContextPath() + "";
//		String repo = req.getContextPath() + "";

		List<String> reserve = new ArrayList<>();
		reserve.add(req.getContextPath() + "/front-end/res_order/ResOrderServlet.do");
		reserve.add(req.getContextPath() + "/front-end/res_order/orderSeat.jsp");
		reserve.add(req.getContextPath() + "/front-end/res_order/getMemberResSeat.jsp");
		reserve.add(req.getContextPath() + "/front-end/res_order/getMemberResSeatEnd.jsp");
		reserve.add(req.getContextPath() + "/front-end/res_order/modifySeat.jsp");

		List<String> meal = new ArrayList<>();
		reserve.add(req.getContextPath() + "/front-end/shopping/shopping.do");
		reserve.add(req.getContextPath() + "/front-end/shopping/icon/8.png");
		reserve.add(req.getContextPath() + "/front-end/shopping/cart.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/checkout.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/mealMenu2.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/mealOrder.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/mealOrderOne.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/mealSetMenu.jsp");
		reserve.add(req.getContextPath() + "/front-end/shopping/rsvCart.jsp");

		List<String> review = new ArrayList<>();
		review.add(req.getContextPath() + "/front-end/member_review/forwarded");
		review.add(req.getContextPath() + "/front-end/member_review/addMember_Review.jsp");
		review.add(req.getContextPath() + "/front-end/member_review/listAllMember_Review.jsp");
		review.add(req.getContextPath() + "/front-end/member_review/listOneMember_Review.jsp");
		review.add(req.getContextPath() + "/front-end/member_review/select_page.jsp");

		List<String> repo = new ArrayList<>();
		repo.add(req.getContextPath() + "/front-end/report_appraise/forwarded");
		repo.add(req.getContextPath() + "/front-end/report_appraise/addReport_Appraise.jsp");
		repo.add(req.getContextPath() + "/front-end/report_appraise/listOneReport_Appraise.jsp");
		repo.add(req.getContextPath() + "/front-end/report_appraise/listAllReport_Appraise.jsp");

		Integer mem_od_r = (memVO == null) ? new Integer(0) : memVO.getMem_od_r();
		Integer mem_od_m = (memVO == null) ? new Integer(0) : memVO.getMem_od_m();
		Integer mem_review = (memVO == null) ? new Integer(0) : memVO.getMem_review();
		Integer mem_repo = (memVO == null) ? new Integer(0) : memVO.getMem_repo();

		if (mem_od_r.equals(1) && reserve.contains(path)) {
			chain.doFilter(request, response);
		} else if (mem_od_m.equals(1) && meal.contains(path)) {
			chain.doFilter(request, response);
		} else if (mem_review.equals(1) && review.contains(path)) {
			chain.doFilter(request, response);
		} else if (mem_repo.equals(1) && repo.contains(path)) {
			chain.doFilter(request, response);
		} else if (mem_repo.equals(0) && mem_review.equals(0) 
					&& mem_repo.equals(0) && mem_od_r.equals(0)) {
			res.sendRedirect(req.getContextPath() + "/front-end/mem/login_mem.jsp");
		} else {
			res.sendRedirect(req.getContextPath() + "/front-end/front_home.jsp");
		}

	}
}