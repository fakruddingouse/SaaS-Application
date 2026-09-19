import ai from "../config/gemini.js";

export const generateResumeReview = async () {
    try {
        /* const prompt = `
        `

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 

        }) */
    } catch (error) {
        console.log("Gemini Service Error: ", error);
        throw new Error("Failed to generate review.");
    }
}