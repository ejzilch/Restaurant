package iTextPDF;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletResponse;

import com.itextpdf.text.DocumentException;

/**
 * �B�z�N�^��HTML�নPDF��Filter�C
 */
public class Html2PdfFilter implements Filter {
	private String contextRealPath;
	private String cssFolder;
	private String fontFolder;
	private Html2PdfConverter converter;


	/**
	 * ��l�Ʃһݭn�������ܼơA�]���䤤�@���ഫ��k���n�H�{�����覡�B�~���JCSS�ɨӮM�ΡA
	 * �]���o���ǥ�Filter��InitParameter���o��mCSS�Φr���ɪ��ؿ��W�١C
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		contextRealPath = fConfig.getServletContext().getRealPath("/");
		cssFolder = fConfig.getInitParameter("cssFolder");
		fontFolder = fConfig.getInitParameter("fontFolder");

		converter = new Html2PdfConverter(1024, contextRealPath, cssFolder, fontFolder);
	}

	/**
	 * �o�Ӥ�k�O�M�w�O�_���sPDF���P�_�P����a�I
	 */
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain chain) throws IOException, ServletException {
		// ���o�P�O�Ϊ��ШD�Ѽ�
		String pdfParam = request.getParameter("pdf");
		// �p�G�S���n���sPDF�A�h�i��@�륿�`���ШD/�^���B�z�y�{�A��������z�w
		if (pdfParam == null) {
			chain.doFilter(request, response);
			return;
		}
		// �{���X�p�G�]��o�̥N��pdfParam != null�A�Y�ݭn���sPDF
		// �o�ɭԴN�Q�έ쥻��response�Ӳ��ͤ@�Ӧۭq��Html2PdfServletResponse����
		Html2PdfServletResponse wrappedResponse = new Html2PdfServletResponse((HttpServletResponse) response);
		/*** Incoming above ***/

		// �N�ۭq��Html2PdfServletResponse����ǵ�����ШD/�^���B�z�y�{
		chain.doFilter(request, wrappedResponse);

		/*** Outgoing below ***/

		// �ШD/�^���B�z�y�{�����A�^��o��Filter��A�qHtml2PdfServletResponse��������oJSP���^�����e�C
		StringBuffer html = wrappedResponse.getResponseString();

		// �NJSP�^�����e�ഫ��PDF�A�o�̷̨ӽШD�Ѽƪ����e�ӧP�_�n�I�s���Ӳ��sPDF����k�C
		byte[] pdf;
		try {
			if ("detail".equals(pdfParam)) {
				pdf = converter.detailedConvert(html.toString());
			} else {
				pdf = converter.simpleConvert(html.toString());
			}

		} catch (DocumentException e) {
			e.printStackTrace();
			throw new ServletException("Failed to generate pdf for the incoming request", e);
		}
		// �]�w���T��Content-Type�ӧi�D�s�����^�����e��PDF
		response.setContentType("application/pdf");
		// �NPDF�ǥ�OutputStream�^�ǵ��s����
		response.getOutputStream().write(pdf);

	}

	@Override
	public void destroy() {
		// do nothing
	}

}
