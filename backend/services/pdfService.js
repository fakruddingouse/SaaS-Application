import { PDFParse } from 'pdf-parse';

export const uploadPdf = async (file) => {
    try {
        if (!file || !file.buffer) {
            throw new Error("Invalid PDF file!");
        }
        
        const parser = new PDFParse({ data: file.buffer });
        const data = await parser.getText();
        await parser.destroy();

        return data.text;

    } catch (error) {
        console.error("PDF Parsing Inner Error:", error);
        throw new Error("Cannot upload PDF!")
    }
}

