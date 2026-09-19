import ai from "../config/gemini.js";

export const generateResumeReview = async (resumeText) => {
    try {
        const prompt = `
            You are an expert technical recruiter and ATS resume reviewer.

            Analyze the following resume and provide structured feedback.

            Resume:
            ${resumeText}

            Requirements:

            - Give an ATS compatibility score out of 100.
            - Write a short 2-3 sentence summary of the candidate's profile.
            - List key strengths.
            - List key weaknesses or gaps.
            - List concrete, actionable suggestions to improve the resume.
            - List important keywords missing from the resume for their likely target roles.

            Return ONLY valid JSON in exactly this shape, with no markdown formatting and no extra text:

            {
                "score": number,
                "summary": string,
                "strengths": string[],
                "weaknesses": string[],
                "suggestions": string[],
                "missingKeywords": string[]
            }
        `;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt
        });

        return parseGeminiJson(response.text);

    } catch (error) {
        console.log("Gemini Service Error: ", error);
        throw new Error("Failed to generate resume review.");
    }
};

// Robust parsing: direct JSON, markdown-fenced JSON, or a graceful fallback
const parseGeminiJson = (rawText) => {
    if (!rawText) {
        throw new Error("Empty response from Gemini.");
    }

    // 1. Try direct parse
    try {
        return JSON.parse(rawText);
    } catch (err) {
        // not raw JSON — keep trying
    }

    // 2. Try pulling JSON out of a ```json ... ``` or ``` ... ``` fenced block
    const fencedMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/i);
    if (fencedMatch && fencedMatch[1]) {
        try {
            return JSON.parse(fencedMatch[1].trim());
        } catch (err) {
            // fall through to fallback
        }
    }

    // 3. Graceful fallback — don't lose the response, just flag it as unparsed
    console.error("Failed to parse Gemini JSON response:", rawText);

    return {
        score: null,
        summary: "We couldn't fully parse the AI's review for this resume.",
        strengths: [],
        weaknesses: [],
        suggestions: [],
        missingKeywords: [],
    };
};