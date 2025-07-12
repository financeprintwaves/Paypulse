
'use server';

import { selectLetterhead, type SelectLetterheadInput } from '@/ai/flows/letterhead-selector';
import { calculateLoanEligibility, type LoanEligibilityInput } from '@/ai/flows/loan-eligibility-flow';

interface LetterheadSuccessOutput {
  letterheadLogoDataUri: string;
}

interface LoanSuccessOutput {
  eligibleAmount: number;
}


interface ErrorOutput {
  error: string;
}

export async function generateLetterhead(input: SelectLetterheadInput): Promise<LetterheadSuccessOutput | ErrorOutput> {
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

export async function getLoanEligibility(input: LoanEligibilityInput): Promise<LoanSuccessOutput | ErrorOutput> {
    try {
        console.log(`Calculating loan eligibility for employee: ${input.employeeId}`);
        const result = await calculateLoanEligibility(input);
        if (result === null || result.eligibleAmount === undefined) {
            console.error('GenAI flow for loan eligibility returned empty result.');
            return { error: 'Failed to calculate loan eligibility from AI flow.' };
        }
        console.log(`Loan eligibility calculated: ${result.eligibleAmount}`);
        return result;
    } catch (error) {
        console.error('Error in getLoanEligibility server action:', error);
        return { error: 'An unexpected error occurred while calculating loan eligibility.' };
    }
}
