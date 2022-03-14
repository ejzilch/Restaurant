package iTextPDF;

import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

/**
 * �Ȼs�ƪ�ServletResponse�A�Ψ��^��Response����r�C
 * <p>
 * �bServlet���Ҥ��p�G�Q�n�Ȼs��HttpServletResponse�Ϊ̬OHttpServletRequest�A
 * �h�i�H�~��HttpServletResponseWrapper�Ϊ̬OHttpServletRequestWrapper�C
 * �]��Request�MResponse����@�O�Ѯe�����ѡA�ڭ̥u�ϥΤ����A�]���S��k������Request�H��Response��@�i���~�ӨӽƼg��k�C
 * �o������O�ǥѥ]�qRequest�H��Response�ñN��k�e�����ҥ]�q������ӹF���@�������ĪG�C
 * �ڭ̥i�H�ǥѽƼg�o������O����k�F��Ȼs��Request�H��Response���ت��C
 * <p>
 * �o���ǥѽƼggetWriter()��k�A�N�쥻���ӭn�^�Ǫ�Writer�⴫������StringWriter��PrintWriter�C
 * �o�˺����^�������e�N�|�Q�g�����O����ұa��StringWriter���A�Ӥ��|�����^�����Ȥ�ݡC
 * ����A�ǥѩI�sgetResponseString()�Ө��o�^�����e�A�@�i�@�B���B�z (�নPDF��^�����Ȥ��)�C
 * 
 * @author Jimmy Liao
 *
 */
public class Html2PdfServletResponse extends HttpServletResponseWrapper {
	private PrintWriter pw;
	private StringWriter sw;

	public Html2PdfServletResponse(HttpServletResponse response) {
		super(response);
		sw = new StringWriter();
		pw = new PrintWriter(sw);
	}

	@Override
	public ServletOutputStream getOutputStream() throws IOException {
		return super.getOutputStream();
	}

	@Override
	public PrintWriter getWriter() throws IOException {
		return pw;
	}
	/**
	 * ���o�x�s�����O��������^����r���e
	 * @return �^����r���e
	 */
	public StringBuffer getResponseString() {
		return sw.getBuffer();
	}

}
