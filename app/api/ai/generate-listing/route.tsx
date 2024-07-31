// Import Types
// Import External Packages
import { NextResponse } from 'next/server';
import OpenAI from 'openai';
// Import Components
// Import Functions & Actions & Hooks & State
// Import Data
// Import Assets & Icons

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

// Secure Password Like Secret key
const secretKey = process.env.API_SECRET_KEY;

/**
 * Handles the GET request to generate DESCRIPTION & EXCERPRT FOR A LISTING based on the URL.
 * @param req - The Request object representing the incoming request.
 * @returns A JSON response indicating the description and excerpt of the company.
 */
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const sharedKey = searchParams.get('secretKey');
	const url = searchParams.get('url');

	if (sharedKey !== secretKey) {
		return NextResponse.json(
			{ error: 'Invalid Secret Key', description: '', excerpt: '' },
			{ status: 400 }
		);
	}

	if (
		!url ||
		url.length === 0 ||
		(!url.startsWith('http://') && !url.startsWith('https://'))
	) {
		return NextResponse.json(
			{
				error: 'Missing or wrongly formatted URL',
				description: '',
				excerpt: '',
			},
			{ status: 400 }
		);
	}

	try {
		const response = await openai.chat.completions.create({
			model: 'gpt-4o-mini',
			messages: [
				{
					role: 'system',
					content:
						"You are a research assistant tasked with analyzing companies based on their URL. For each URL provided, based on your knowledge, generate a summary in JSON format with two fields in english: 1)'excerpt': A neutral, concise description (100-160 characters). 2) 'description': A high-level markdown-formatted analysis, structured into two h2 sections (Overview and Features), no h1 tag, no links (250-350 words). This may not be empty! If you have no knowledge of the company return 'Sorry, never heard.' for both values.",
				},
				{
					role: 'user',
					content: `${url}`,
				},
			],
			temperature: 1,
			max_tokens: 512,
			top_p: 1,
			frequency_penalty: 0,
			presence_penalty: 0,
			response_format: { type: 'json_object' },
		});

		const jsonAnswer = response.choices[0].message.content;

		if (!jsonAnswer || jsonAnswer.includes('error')) {
			return NextResponse.json(
				{ error: 'Error in AI response', description: '', excerpt: '' },
				{ status: 400 }
			);
		}

		const { description, excerpt } = JSON.parse(jsonAnswer);

		return NextResponse.json(
			{ error: '', description: description, excerpt: excerpt },
			{
				status: 200,
			}
		);
	} catch (error) {
		return NextResponse.json(
			{ error: 'Error in Try Catch', description: '', excerpt: '' },
			{
				status: 400,
			}
		);
	}
}
