package com.wait_seat.model;

import java.util.List;

public interface Wait_seatDAO_interface {
	public void insert(Wait_seatVO wait_seatVO);
	public void update(Wait_seatVO wait_seatVO);
	public void update2(Wait_seatVO wait_seatVO,String wait_seat_no);
	public void delete(String wait_seat_no);
	public Wait_seatVO findByPrimaryKey(String wait_seat_no);
	public List<Wait_seatVO> getAll();
	public List<Wait_seatVO> getAllForUser();
	public Wait_seatVO getFirst();
}
