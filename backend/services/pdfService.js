import { PDFParse } from 'pdf-parse';

export const uploadPdf = async (pdfLink) => {
    try {
        if (!file || !file.buffer) {
            throw new Error("Invalid PDF file!");
        }
        
        const data = await PDFParse(file.buffer);

        return data.text;

    } catch (error) {
        console.error(error);
        throw new Error("Cannot upload PDF!")
    }
}

