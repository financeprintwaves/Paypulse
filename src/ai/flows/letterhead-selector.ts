// src/ai/flows/letterhead-selector.ts
'use server';

/**
 * @fileOverview Letterhead Selector AI agent.
 *
 * - selectLetterhead - A function that handles the letterhead selection process.
 * - SelectLetterheadInput - The input type for the selectLetterhead function.
 * - SelectLetterheadOutput - The return type for the selectLetterhead function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SelectLetterheadInputSchema = z.object({
  branchId: z.string().describe('The ID of the branch for which to select a letterhead.'),
  employeeName: z.string().describe('The name of the employee whose salary slip will use the letterhead.'),
});
export type SelectLetterheadInput = z.infer<typeof SelectLetterheadInputSchema>;

const SelectLetterheadOutputSchema = z.object({
  letterheadLogoDataUri: z
    .string()
    .describe(
      'The data URI of the selected letterhead logo, which must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type SelectLetterheadOutput = z.infer<typeof SelectLetterheadOutputSchema>;

export async function selectLetterhead(input: SelectLetterheadInput): Promise<SelectLetterheadOutput> {
  return selectLetterheadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'selectLetterheadPrompt',
  input: {schema: SelectLetterheadInputSchema},
  output: {schema: SelectLetterheadOutputSchema},
  prompt: `You are an expert HR assistant. Based on the branch ID, you will select the appropriate letterhead logo for an employee's salary slip.

  The logo should be returned as a data URI.

  Branch ID: {{{branchId}}}
  Employee Name: {{{employeeName}}}
  `,
});

const selectLetterheadFlow = ai.defineFlow(
  {
    name: 'selectLetterheadFlow',
    inputSchema: SelectLetterheadInputSchema,
    outputSchema: SelectLetterheadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
