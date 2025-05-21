import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
    try {
        const { message } = await req.json();

        if (!message) {
            return Response.json({ error: "Message is required" }, { status: 400 });
        }

        const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
        if (!apiKey) {
            return Response.json({ error: "API key is missing" }, { status: 500 });
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      
        const result = await model.generateContent(message);
        const response = result.response.text();

        return Response.json({ reply: response });

    } catch (error) {
        console.error("Gemini API Error:", error);
        return Response.json({ error: "Failed to fetch response" }, { status: 500 });
    }
}
