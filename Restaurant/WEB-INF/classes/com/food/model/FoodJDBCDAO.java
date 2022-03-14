package com.food.model;

import java.util.*;
import java.sql.*;

public class FoodJDBCDAO implements FoodDAO_interface {
	String driver = "oracle.jdbc.driver.OracleDriver";
	String url = "jdbc:oracle:thin:@localhost:1521:XE";
	String userid = "EA103G7";
	String passwd = "123456";

	private static final String INSERT_STMT = 
			"INSERT INTO FOOD (FD_NO,FD_NAME,FD_ISDEL,FD_STK,STK_LL,CAL,PROT,CARB,FAT) VALUES ('FD'||LPAD(SEQ_FD_NO.NEXTVAL,4,0),?,?,?,?,?,?,?,?)";
	private static final String DELETE = 
			"UPDATE FOOD SET FD_ISDEL='0' WHERE FD_NO = ?";
	private static final String GET_ALL_STMT = 
			"SELECT FD_NO,FD_NAME,FD_ISDEL,FD_STK,STK_LL,CAL,PROT,CARB,FAT FROM FOOD WHERE FD_ISDEL='1'";
	private static final String GET_ONE_STMT = 
			"SELECT FD_NAME,FD_ISDEL,FD_STK,STK_LL,CAL,PROT,CARB,FAT FROM FOOD WHERE FD_NO = ? AND FD_ISDEL='1'";
	private static final String UPDATE = 
			"UPDATE FOOD SET FD_NAME=?,FD_ISDEL=?,FD_STK=?,STK_LL=?,CAL=?,PROT=?,CARB=?,FAT=? WHERE FD_NO = ?";
	private static final String Statistics =
			"select f.fd_no,fd_name,to_char(order_time,'yyyy')as s_year,to_char(order_time,'mm') as s_month, sum(qty)*fd_gw as qty from meal_order_detail meod " +
			"join meal_order mo on mo.meal_order_no=meod.meal_order_no " +
			"join meal_part mp on mp.meal_no=meod.meal_no " +
			"join food f on f.fd_no=mp.fd_no " +
			"where meod.meal_no is not null " +
			"group by meod.meal_no,to_char(order_time,'yyyy'),to_char(order_time,'mm'),f.fd_no ,fd_name,fd_gw " +
			"union all " +
			"select f.fd_no,fd_name,to_char(order_time,'yyyy')as s_year,to_char(order_time,'mm')as s_month, sum(qty)*msc.meal_qty*fd_gw as qty from meal_order_detail meod " +
			"join meal_order mo on mo.meal_order_no=meod.meal_order_no " +
			"join meal_set_consist msc on msc.meal_set_no=meod.meal_set_no " +
			"join meal_part mp on mp.meal_no=msc.meal_no " +
			"join food f on f.fd_no=mp.fd_no " +
			"where meod.meal_set_no is not null " +
			"group by msc.meal_no,to_char(order_time,'yyyy'),to_char(order_time,'mm'),meal_qty,f.fd_no ,fd_name,fd_gw " +
			"order by fd_no,s_year,s_month";
	 
	@Override
	public void insert(FoodVO foodVO) {

		Connection con = null;
		PreparedStatement pstmt = null;

		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(INSERT_STMT);
			pstmt.setString(1, foodVO.getFd_name());
			pstmt.setInt(2, foodVO.getFd_isdel());
			pstmt.setInt(3, foodVO.getFd_stk());
			pstmt.setInt(4, foodVO.getStk_ll());
			pstmt.setDouble(5, foodVO.getCal());
			pstmt.setDouble(6, foodVO.getProt());
			pstmt.setDouble(7, foodVO.getCarb());
			pstmt.setDouble(8, foodVO.getFat());
			pstmt.executeUpdate();

			// Handle any driver errors
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}

	}

	@Override
	public void update(FoodVO foodVO) {
		Connection con = null;
		PreparedStatement pstmt = null;

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(UPDATE);

			pstmt.setString(1, foodVO.getFd_name());
			pstmt.setInt(2, foodVO.getFd_isdel());
			pstmt.setInt(3, foodVO.getFd_stk());
			pstmt.setInt(4, foodVO.getStk_ll());
			pstmt.setDouble(5, foodVO.getCal());
			pstmt.setDouble(6, foodVO.getProt());
			pstmt.setDouble(7, foodVO.getCarb());
			pstmt.setDouble(8, foodVO.getFat());
			pstmt.setString(9, foodVO.getFd_no());

			pstmt.executeUpdate();

			// Handle any driver errors
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}

	}

	@Override
	public void delete(String fd_no) {

		Connection con = null;
		PreparedStatement pstmt = null;

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(DELETE);
			pstmt.setString(1, fd_no);
			pstmt.executeUpdate();

			// Handle any driver errors
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}

	}

	@Override
	public FoodVO findByPrimaryKey(String fd_no) {

		FoodVO foodVO = null;
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(GET_ONE_STMT);

			pstmt.setString(1, fd_no);

			rs = pstmt.executeQuery();

			while (rs.next()) {
				// Vo 也稱為 Domain objects
				foodVO = new FoodVO();
				foodVO.setFd_no(fd_no);
				foodVO.setFd_name(rs.getString("FD_NAME"));
				foodVO.setFd_isdel(rs.getInt("FD_ISDEL"));
				foodVO.setFd_stk(rs.getInt("FD_STK"));
				foodVO.setStk_ll(rs.getInt("STK_LL"));
				foodVO.setCal(rs.getDouble("CAL"));
				foodVO.setProt(rs.getDouble("PROT"));
				foodVO.setCarb(rs.getDouble("CARB"));
				foodVO.setFat(rs.getDouble("FAT"));				
			}
			// Handle any driver errors
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return foodVO;
	}

	@Override
	public List<FoodVO> getAll() {
		List<FoodVO> list = new ArrayList<FoodVO>();
		FoodVO foodVO = null;

		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;

		try {

			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(GET_ALL_STMT);
			rs = pstmt.executeQuery();

			while (rs.next()) {
				// VO 也稱為 Domain objects
				foodVO = new FoodVO();
				foodVO.setFd_no(rs.getString("FD_NO"));
				foodVO.setFd_name(rs.getString("FD_NAME"));
				foodVO.setFd_isdel(rs.getInt("FD_ISDEL"));
				foodVO.setFd_stk(rs.getInt("FD_STK"));
				foodVO.setStk_ll(rs.getInt("STK_LL"));
				foodVO.setCal(rs.getDouble("CAL"));
				foodVO.setProt(rs.getDouble("PROT"));
				foodVO.setCarb(rs.getDouble("CARB"));
				foodVO.setFat(rs.getDouble("FAT"));	
				list.add(foodVO);
			}

			// Handle any driver errors
		} catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return list;
	}

	@Override
	public String getFdnameByFdno(String fd_no) {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(GET_ONE_STMT);
			pstmt.setString(1, fd_no);
			rs = pstmt.executeQuery();
			rs.next();
			return rs.getString("fd_name");
		}catch (ClassNotFoundException e) {
			throw new RuntimeException("Couldn't load database driver. " + e.getMessage());
			// Handle any SQL errors
		} catch (SQLException se) {
			throw new RuntimeException("A database error occured. " + se.getMessage());
			// Clean up JDBC resources
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
	}
	
	public List<List<String>> oneMonthFoodStatistics(){
		FoodJDBCDAO dao=new FoodJDBCDAO();
		List<List<String>> list =dao.Statistics();
		List<List<String>> statList=new ArrayList<>();
		List<String> statData=null; //統整資料，一筆資料就有1~12個月(為了前端畫統計圖的元件需要)
		List<FoodVO> fList=dao.getAll();
		for(int i=0;i<fList.size();i++) {
			statData=new ArrayList<>();
			statData.add(fList.get(i).getFd_no());//編號
			statData.add(fList.get(i).getFd_name());//食材名稱
			statData.add("2020");//年，寫死，只有一年
			for(int j=0;j<12;j++) {
				statData.add("0");//使用量初始化，1~12個月
			}
			statList.add(statData);				
		}
		//--------------------------------------------
//		for(List<String> l: statList) {
//			for(int i=0;i<l.size();i++) {
//				System.out.printf("%10s",l.get(i));
//			}
//			System.out.println();
//		}
		//--------------------------------------------
		for(int i=0;i<list.size();i++) {
			for(int j=0;j<statList.size();j++) {
//				System.out.println("list="+list.get(i).get(0));
//				System.out.println("statList"+statList.get(j).get(0) );
				if(list.get(i).get(0).equals( statList.get(j).get(0) )) {
					int month=Integer.valueOf(list.get(i).get(3));
//					System.out.println(month);
//					System.out.println(list.get(i).get(3));
					if(statList.get(j).get(month+2).equals("0")) {
						statList.get(j).set(month+2,list.get(i).get(4));
						break;
					}else {
						statList.get(j).set(month+2,list.get(i).get(4)+Double.valueOf(statList.get(j).get(month+3)));
						break;
					}
				}
			}
		}
//		System.out.println(statList);
//		for(List<String> data1:list) {
//			System.out.println("編號"+data1.get(0)+" 食材"+data1.get(1)+"年分"+data1.get(2)+"月份"+data1.get(3)+"使用量"+data1.get(4));
//		}
		return statList;
	}
	
	public List<List<String>> eachMonthFoodStatistics(){
		FoodJDBCDAO dao=new FoodJDBCDAO();
		List<List<String>> list =dao.Statistics();
		List<List<String>> statList=new ArrayList<>();
		List<String> statData=null; //統整資料，一筆資料就有1~12個月(為了前端畫統計圖的元件需要)
		List<FoodVO> fList=dao.getAll();
		for(int i=0;i<fList.size();i++) {
			statData=new ArrayList<>();
			statData.add(fList.get(i).getFd_no());//編號
			statData.add(fList.get(i).getFd_name());//食材名稱
			statData.add("2020");//年，寫死，只有一年
			for(int j=0;j<12;j++) {
				statData.add("0");//使用量初始化，1~12個月
			}
			statList.add(statData);				
		}
		//--------------------------------------------
//		for(List<String> l: statList) {
//			for(int i=0;i<l.size();i++) {
//				System.out.printf("%10s",l.get(i));
//			}
//			System.out.println();
//		}
		//--------------------------------------------
		for(int i=0;i<list.size();i++) {
			for(int j=0;j<statList.size();j++) {
//				System.out.println("list="+list.get(i).get(0));
//				System.out.println("statList"+statList.get(j).get(0) );
				if(list.get(i).get(0).equals( statList.get(j).get(0) )) {
					int month=Integer.valueOf(list.get(i).get(3));
//					System.out.println(month);
//					System.out.println(list.get(i).get(3));
					if(statList.get(j).get(month+2).equals("0")) {
						statList.get(j).set(month+2,list.get(i).get(4));
						break;
					}else {
						statList.get(j).set(month+2,list.get(i).get(4)+Double.valueOf(statList.get(j).get(month+3)));
						break;
					}
				}
			}
		}
//		System.out.println(statList);
//		for(List<String> data1:list) {
//			System.out.println("編號"+data1.get(0)+" 食材"+data1.get(1)+"年分"+data1.get(2)+"月份"+data1.get(3)+"使用量"+data1.get(4));
//		}
		return statList;
	}
	
	@Override
	public List<List<String>> Statistics() {
		Connection con = null;
		PreparedStatement pstmt = null;
		ResultSet rs = null;
		List<String> data;
		List<List<String>> list=new ArrayList<>();
		List<List<String>> statList=null;
		try {
			Class.forName(driver);
			con = DriverManager.getConnection(url, userid, passwd);
			pstmt = con.prepareStatement(Statistics);
			rs = pstmt.executeQuery();
			boolean flag=false;
			//select f.fd_no,fd_name,to_char(order_time,'yyyy')as s_year,to_char(order_time,'mm') as s_month, sum(qty)*fd_gw as qty
			FoodJDBCDAO dao=new FoodJDBCDAO();
			List<FoodVO> fList=dao.getAll();
			for(int i=0;i<fList.size();i++) {
				for(int j=1;j<13;j++) {//12月
					data=new ArrayList<>();
					data.add(fList.get(i).getFd_no());//編號
					data.add(fList.get(i).getFd_name());//食材名稱
					data.add("2020");//年，寫死，只有一年
					data.add("0");//初始化
					data.add("0");//使用量初始化
					if(j<10)data.set(3,"0"+j);
					else data.set(3,""+j);
					list.add(data);
				}
			}
//			System.out.println("------------------------------------------------");
//			for(List l:list) {
//				System.out.print("編號="+l.get(0));
//				System.out.print("  名稱="+l.get(1));
//				System.out.print("  年份="+l.get(2));
//				System.out.print("  月份="+l.get(3));
//				System.out.println("  使用量="+l.get(4));
//			}
//			System.out.println("------------------------------------------------");
			while(rs.next()) {

				flag=false;
				int index=0;
				data=new ArrayList<>();
				data.add(rs.getString("fd_no"));//編號
				data.add(rs.getString("fd_name"));//食材名稱
				data.add(rs.getString("s_year"));//年
				data.add(rs.getString("s_month"));//月
				data.add(rs.getString("qty"));
				for(int i=0;i<list.size();i++) {//檢查有沒有這項
					if(//如果已經有值
						list.get(i).get(0).equals(data.get(0)) &&
						list.get(i).get(2).equals(data.get(2)) && 
						list.get(i).get(3).equals(data.get(3)) ) {
						flag=true; //已經有此項了
						index=i;
						break;
					}
				}
				if(flag) { //已經有此項了
					Double temp=rs.getDouble(5)+Double.valueOf(list.get(index).get(4));
					list.get(index).set(4,temp.toString());
//					System.out.println(list.get(index).set(4,temp.toString()));
				}else {
//					System.out.println("-------"+data+"-------");
					list.add(data);
				}
//				System.out.println(list.get(index).get(3)+"   "+list.get(index).get(4));
			}
//			System.out.println("------------------------------------------------");
//			for(List<String> l:list) {
//				System.out.print("編號="+l.get(0));
//				System.out.print("  名稱="+l.get(1));
//				System.out.print("  年份="+l.get(2));
//				System.out.print("  月份="+l.get(3));
//				System.out.println("  使用量="+l.get(4));
//			}
//			System.out.println("------------------------------------------------");
			
		}catch (SQLException se) {
				throw new RuntimeException("A database error occured. " + se.getMessage());
				// Clean up JDBC resources
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		} finally {
			if (rs != null) {
				try {
					rs.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (pstmt != null) {
				try {
					pstmt.close();
				} catch (SQLException se) {
					se.printStackTrace(System.err);
				}
			}
			if (con != null) {
				try {
					con.close();
				} catch (Exception e) {
					e.printStackTrace(System.err);
				}
			}
		}
		return list;
	}
	
	public static void main(String[] args) {

		FoodJDBCDAO dao = new FoodJDBCDAO();

		// 新增
		FoodVO foodVO1 = new FoodVO();
		foodVO1.setFd_name("AABBCC");
		foodVO1.setFd_isdel(1);
		foodVO1.setFd_stk(100);
		foodVO1.setStk_ll(30);
		foodVO1.setCal(new Double(10));
		foodVO1.setProt(new Double(20));
		foodVO1.setCarb(new Double(30));
		foodVO1.setFat(new Double(40));
//		dao.insert(foodVO1);

		// 修改
		FoodVO foodVO2 = new FoodVO();
		foodVO2.setFd_no("FD0017");
		foodVO2.setFd_name("吳永志17");
		foodVO2.setFd_isdel(0); //測試用，實際上不會讓人用修改的方式改這個值
		foodVO2.setFd_stk(100);
		foodVO2.setStk_ll(20);
		foodVO2.setCal(new Double(40.4));
		foodVO2.setProt(new Double(30.3));
		foodVO2.setCarb(new Double(20.2));
		foodVO2.setFat(new Double(10.1));
//		dao.update(foodVO2);

		// 刪除
//		dao.delete("FD0020");

		// 查詢
//		FoodVO foodVO3 = dao.findByPrimaryKey("FD0003");
//		System.out.print(foodVO3.getFd_no() + ",");
//		System.out.print(foodVO3.getFd_name() + ",");
//		System.out.print(foodVO3.getFd_isdel() + ",");
//		System.out.print(foodVO3.getFd_stk() + ",");
//		System.out.print(foodVO3.getStk_ll());
//		System.out.print(foodVO3.getCal());
//		System.out.print(foodVO3.getProt());
//		System.out.print(foodVO3.getCarb());
//		System.out.print(foodVO3.getFat());
//		System.out.println();
//		System.out.println("---------------------");

		// 查詢
//		List<FoodVO> list = dao.getAll();
//		for (FoodVO aFood : list) {
//			System.out.print(aFood.getFd_no() + ",");
//			System.out.print(aFood.getFd_name() + ",");
//			System.out.print(aFood.getFd_isdel() + ",");
//			System.out.print(aFood.getFd_stk() + ",");
//			System.out.print(aFood.getStk_ll() + ",");
//			System.out.print(aFood.getCal() + ",");
//			System.out.print(aFood.getProt() + ",");
//			System.out.print(aFood.getCarb() + ",");
//			System.out.print(aFood.getFat());
//			System.out.println();
//		}
		//查詢
//		System.out.print(dao.getFdnameByFdno("FD0003"));

		//統計
//		List<List<String>> list=dao.StatisticsForMeal();
//		for(List<String> str:list) {
//			System.out.println("編號:"+str.get(0)+" 食材:"+str.get(1)+" 年分:"+str.get(2)+" 月份:"+str.get(3)+" 使用量:"+str.get(4));
//		}
		//統計
		List<List<String>> list2=dao.Statistics();
		for(List<String> str:list2) {
			System.out.printf("編號=%6s 食材=%5s 年=%5s 1月使用量=%6s  2月使用量=%6s  3月使用量=%6s 4月使用量=%6s 5月使用量=%6s 6月使用量=%6s 7月使用量=%6s 8月使用量=%6s 9月使用量=%6s 10月使用量=%6s 11月使用量=%6s 12月使用量=%6s",str.get(0),str.get(1),str.get(2),str.get(3),str.get(4),str.get(5),str.get(6),str.get(7),str.get(8),str.get(9),str.get(10),str.get(11),str.get(12),str.get(13),str.get(14));
			System.out.println();
		}
		
	}
}