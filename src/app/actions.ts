'use server';

import { selectLetterhead, type SelectLetterheadInput } from '@/ai/flows/letterhead-selector';

interface SuccessOutput {
  letterheadLogoDataUri: string;
}

interface ErrorOutput {
  error: string;
}

export async function generateLetterhead(input: SelectLetterheadInput): Promise<SuccessOutput | ErrorOutput> {
  try {
    console.log(`Generating letterhead for branch: ${input.branchId}`);
    const result = await selectLetterhead(input);
    if (!result || !result.letterheadLogoDataUri) {
        console.error('GenAI flow returned empty result.');
        return { error: 'Failed to generate letterhead from AI flow.' };
    }
    console.log('Letterhead generated successfully.');
    return result;
  } catch (error) {
    console.error('Error in generateLetterhead server action:', error);
    return { error: 'An unexpected error occurred while generating the letterhead.' };
  }
}
