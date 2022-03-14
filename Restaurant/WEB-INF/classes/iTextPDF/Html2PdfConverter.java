package iTextPDF;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.Charset;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;

import com.itextpdf.text.Document;
import com.itextpdf.text.DocumentException;
import com.itextpdf.text.pdf.PdfWriter;
import com.itextpdf.tool.xml.XMLWorker;
import com.itextpdf.tool.xml.XMLWorkerFontProvider;
import com.itextpdf.tool.xml.XMLWorkerHelper;
import com.itextpdf.tool.xml.css.CssFile;
import com.itextpdf.tool.xml.html.CssAppliers;
import com.itextpdf.tool.xml.html.CssAppliersImpl;
import com.itextpdf.tool.xml.html.Tags;
import com.itextpdf.tool.xml.parser.XMLParser;
import com.itextpdf.tool.xml.pipeline.css.CSSResolver;
import com.itextpdf.tool.xml.pipeline.css.CssResolverPipeline;
import com.itextpdf.tool.xml.pipeline.end.PdfWriterPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipeline;
import com.itextpdf.tool.xml.pipeline.html.HtmlPipelineContext;

/**
 * A POJO responsible for converting xhtml string to pdf
 * 
 * @author Jimmy Liao
 *
 */
public class Html2PdfConverter {
	private final int defaultBuffer;
	private final String realContextPath;
	private final String cssFolder;
	private final String fontFolder;
	/**
	 * �̷өҶǤJ���ѼƲ��ͤ@�Ӫ������C
	 * <p>
	 * �YCSS�����]�w�r���A�hiText�M��w�]�|�q�t�Φr�����h�M�䦳�L�ŦX�̡A�Y���ܨϥΡA�Y�L�h�Ӧr������r�|�ܦ��ťաC
	 * ���F�F��󥭥x���ت��A��ڤW�b�ϥή����ӧ�ҥΨ쪺�r�����]�i�M�סA�M��]�wiText���n�h�t�δM��r���C
	 * �o�˴N�i�H�N�M�׹�t�Φr�����̩ۨʲ����A���Χ�r���]�i�H�W�[����ɪ��Ĳv�C
	 * @param realContextPath - �M�שҦb���t�ι�ڸ��|�A�i�H�ǥ�ServletContext.getRealPath()��k���o��ǤJ
	 * @param cssFolder - ��mCSS�ɮת��ؿ��W��(�۹��M�׮ڥؿ����۹���|)�A�ΨӰʺA���JCSS�ɨϥΡC
	 * @param fontFolder - ��m�۫��ɪ��ؿ��W��(�۹��M�׮ڥؿ����۹���|)�A�ΨӸ��J�r���ɨϥΡC
	 */
	public Html2PdfConverter(String realContextPath, String cssFolder, String fontFolder) {
		this(1024, realContextPath, cssFolder, fontFolder);
	}
	
	/**
	 * �̷өҶǤJ���ѼƲ��ͤ@�Ӫ������C
	 * <p>
	 * �YCSS�����]�w�r���A�hiText�M��w�]�|�q�t�Φr�����h�M�䦳�L�ŦX�̡A�Y���ܨϥΡA�Y�L�h�Ӧr������r�|�ܦ��ťաC
	 * ���F�F��󥭥x���ت��A��ڤW�b�ϥή����ӧ�ҥΨ쪺�r�����]�i�M�סA�M��]�wiText���n�h�t�δM��r���C
	 * �o�˴N�i�H�N�M�׹�t�Φr�����̩ۨʲ����A���Χ�r���]�i�H�W�[����ɪ��Ĳv�C
	 * @param defaultBuffer - �w�]PDF�ɮ׽w�Ĥj�p�A�Y�����|�ۦ�W�j�C�]�w�@�ӻP��X�ɮ׹w���j�p���񪺼Ʀr�i�H�W�[����į�C
	 * @param realContextPath - �M�שҦb���t�ι�ڸ��|�A�i�H�ǥ�ServletContext.getRealPath()��k���o��ǤJ
	 * @param cssFolder - ��mCSS�ɮת��ؿ��W��(�۹��M�׮ڥؿ����۹���|)�A�ΨӰʺA���JCSS�ɨϥΡC
	 * @param fontFolder - ��m�۫��ɪ��ؿ��W��(�۹��M�׮ڥؿ����۹���|)�A�ΨӸ��J�r���ɨϥΡC
	 */
	public Html2PdfConverter(int defaultBuffer, String realContextPath, String cssFolder, String fontFolder) {
		super();
		this.defaultBuffer = defaultBuffer;
		this.realContextPath = realContextPath;
		this.cssFolder = cssFolder;
		this.fontFolder = fontFolder;
	}
	/**
	 * �Q�θ�������API�Ӷi��PDF���ഫ�A�{���XStep1-5���x��d�ҩҼХܪ��B�J�A�򥻤W����k���e�P�x��d�ҬۦP�C
	 * @param html - �n�Q�ഫ��PDF��XHTML
	 * @return ���s�X��PDF�ɮ�
	 * @throws IOException - �Y���s�L�{���PIO�����y�{�X�{���~
	 * @throws DocumentException - �Y���s�L�{����l��PdfWriter�X�{���~
	 */
	public byte[] simpleConvert(String html) throws DocumentException, IOException {
		printHtmlToConsole(html);

		ByteArrayOutputStream baos = new ByteArrayOutputStream(defaultBuffer);
		ByteArrayInputStream bain = new ByteArrayInputStream(html.getBytes("UTF-8"));

		/** Step 1 **/
		Document document = new Document();

		/** Step 2 **/
		PdfWriter pdfWriter = PdfWriter.getInstance(document, baos);

		/** Step 3 **/
		document.open();

		/** Step 4 **/
		XMLWorkerHelper.getInstance().parseXHtml(pdfWriter, document, bain, Charset.forName("UTF-8"));

		/** Step 5 **/
		document.close();

		byte[] pdf = baos.toByteArray();
		baos.close();

		System.out.println();
		System.out.println("*** Pdf creation via simpleConvert successed ***");
		return pdf;
	}
	/**
	 * �Q�θ��C����API�Ӷi��PDF���ഫ�A�{���XStep1-5���x��d�ҩҼХܪ��B�J�A�򥻤W����k���e�P�x��d�ҬۦP�C
	 * <p>
	 * �Բӻ����Ш��{���X�������ѡC
	 * @param html - �n�Q�ഫ��PDF��XHTML
	 * @return ���s�X��PDF�ɮ�
	 * @throws IOException - �Y���s�L�{���PIO�����y�{�X�{���~
	 * @throws DocumentException - �Y���s�L�{����l��PdfWriter�X�{���~
	 */
	public byte[] detailedConvert(String html) throws IOException, DocumentException {

		printHtmlToConsole(html);

		ByteArrayInputStream bain = new ByteArrayInputStream(html.getBytes("UTF-8"));
		ByteArrayOutputStream baos = new ByteArrayOutputStream(defaultBuffer);

		/** Step 1 **/
		Document document = new Document();

		/** Step 2 **/
		PdfWriter pdfWriter = PdfWriter.getInstance(document, baos);

		/** Step 3 **/
		document.open();

		/** Step 4 **/
		// CSS
		CSSResolver cssResolver =
				XMLWorkerHelper.getInstance().getDefaultCssResolver(true);
		CssFile cssFile = XMLWorkerHelper.getCSS(new FileInputStream(realContextPath +"/"+ cssFolder + "/pdf-extra.css"));
		// �B�~���J�@��CSS�ɮ�
		cssResolver.addCss(cssFile);

		// HTML
		// �o�̥i�H�I�s new XMLWorkerFontProvider(XMLWorkerFontProvider.DONTLOOKFORFONTS)�ӹF�����{���h�t�Χ�r�����ĪG�C
		XMLWorkerFontProvider fontProvider = new XMLWorkerFontProvider();
		// ���U�r���A�o�̦]���S���]�w�����n�h�t�Χ�r���ҥH�o�殳���]�L�ҿסC
		fontProvider.register(realContextPath +"/"+ fontFolder + "/Monaco.ttf",
				"Monaco");
		CssAppliers appliers = new CssAppliersImpl(fontProvider);
		HtmlPipelineContext pipelineContext = new HtmlPipelineContext(appliers);
		pipelineContext.setTagFactory(Tags.getHtmlTagProcessorFactory());

		// Pipelines
		PdfWriterPipeline writerPipeline = new PdfWriterPipeline(document, pdfWriter);
		HtmlPipeline htmlPipeline = new HtmlPipeline(pipelineContext, writerPipeline);
		CssResolverPipeline cssResolverPipeline = new CssResolverPipeline(cssResolver, htmlPipeline);
		
		// Parse XHTML
		XMLWorker worker = new XMLWorker(cssResolverPipeline, true);
		XMLParser p = new XMLParser(worker);
		p.parse(bain, Charset.forName("UTF-8"));

		/** Step 5 **/
		document.close();

		byte[] pdf = baos.toByteArray();
		baos.close();

		System.out.println();
		System.out.println("*** Pdf creation via detailedConvert() successed ***");
		return pdf;

	}
	/**
	 * �@�L�����N�O��n�Q�ഫ��XHTML�L��Console�W
	 * @param html - �n�Q�L��XHTML
	 */
	private void printHtmlToConsole(String html) {
		System.out.println("*** Create pdf from the html below ***");
		html = html == null ? html : html.trim();
		System.out.println(html);
	}
}
