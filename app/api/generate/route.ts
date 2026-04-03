import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY || "",
  baseURL: "https://api.deepseek.com/v1",
});

export async function POST(req: NextRequest) {
  try {
    const { formData } = await req.json();
    const prompt = buildPrompt(formData);
    const completion = await openai.chat.completions.create({
      model: "deepseek-chat",
      messages: [{ role: "user", content: prompt }],
    });
    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

function buildPrompt(formData: any): string {
  const fields = `- Occasion: ${formData['occasion'] || 'Not specified'}
- Skintype: ${formData['skinType'] || 'Not specified'}
- Skintone: ${formData['skinTone'] || 'Not specified'}
- Eyecolor: ${formData['eyeColor'] || 'Not specified'}
- Faceshape: ${formData['faceShape'] || 'Not specified'}
- Skilllevel: ${formData['skillLevel'] || 'Not specified'}
- Timeavailable: ${formData['timeAvailable'] || 'Not specified'}
- Budgettier: ${formData['budgetTier'] || 'Not specified'}
- Season: ${formData['season'] || 'Not specified'}
- Skinconcerns: ${formData['skinConcerns'] || 'Not specified'}`;
  const template = `You are an expert makeup artist and beauty educator. Based on the following profile, create a comprehensive step-by-step makeup tutorial.

{fields}

Please provide:
1. Step-by-Step Tutorial (numbered steps with specific techniques)
2. Product Recommendations by Category (foundation, primer, concealer, etc.)
3. Color Palette Guide (specific shades for their skin tone and eye color)
4. Brush/Technique Tips (which brushes to use for each step)
5. Look Variations by Skill Level (simplified for beginners, enhanced for advanced)
6. Product Substitution Options (drugstore alternatives for every step)
7. Setting and Touch-Up Tips (how to make it last all day)

Format in clean markdown with numbered steps, specific product names with shade recommendations, and technique notes.`;
  return template.replace("{fields}", fields);
}
