import ai from "../config/gemini.js";

export const generateBlog = async ({ topic, tone, length, keywords }) => {
    try {

        const prompt = `
            You are a professional blog writer.
    
            Write a high-quality blog article.
    
            Topic:
            ${topic}
    
            Tone:
            ${tone}
    
            Length:
            ${length}
    
            Keywords:
            ${keywords}
    
            Requirements:
    
            - Write an engaging title.
            - Use proper headings.
            - Use short paragraphs.
            - Explain concepts clearly.
            - End with a conclusion.
            - Return only the article.
        `;
            
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: prompt
        });
    
        return response.text;
    } catch (error) {
        console.log("Gemini Service Error: ", error);
        throw new Error("Failed to generate blog.");
    }
};

