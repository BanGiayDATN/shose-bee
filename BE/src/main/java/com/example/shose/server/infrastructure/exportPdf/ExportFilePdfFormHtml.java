package com.example.shose.server.infrastructure.exportPdf;

import com.example.shose.server.dto.response.bill.InvoiceResponse;
import com.itextpdf.html2pdf.ConverterProperties;
import com.itextpdf.html2pdf.HtmlConverter;
import com.itextpdf.html2pdf.resolver.font.DefaultFontProvider;
import com.itextpdf.kernel.pdf.PdfWriter;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import com.itextpdf.io.source.ByteArrayOutputStream;
//import java.io.ByteArrayOutputStream;
import java.io.FileOutputStream;
import java.security.Principal;
import java.text.NumberFormat;
import java.util.*;

/**
 * @author thangdt
 */
@Component
public class ExportFilePdfFormHtml {

    public Context setData(InvoiceResponse invoice) {

        Context context = new Context();

        Map<String, Object> data = new HashMap<>();

        data.put("invoice", invoice);

        context.setVariables(data);

        return context;
    }

    public String htmlToPdf(String processedHtml, HttpServletRequest request, String code) {

//        Principal principal = request.getUserPrincipal();
//        String downloadPath = principal.getPath();
        String downloadPath = System.getProperty("user.home") + "/Downloads";

        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();

        try {

            PdfWriter pdfwriter = new PdfWriter(byteArrayOutputStream);

            DefaultFontProvider defaultFont = new DefaultFontProvider(false, true, false);

            ConverterProperties converterProperties = new ConverterProperties();

            converterProperties.setFontProvider(defaultFont);

            HtmlConverter.convertToPdf(processedHtml, pdfwriter, converterProperties);

            FileOutputStream fout = new FileOutputStream(downloadPath + "/"+code+".pdf");

            byteArrayOutputStream.writeTo(fout);
            byteArrayOutputStream.close();

            byteArrayOutputStream.flush();
            fout.close();

            return null;

        } catch(Exception ex) {

            //exception occured
        }

        return null;
    }

    public  NumberFormat formatCurrency() {
        NumberFormat formatter = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("vi-VN"));
        formatter.setCurrency(Currency.getInstance("VND"));
        return formatter;
    }
}
