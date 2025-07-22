
'use server';
/**
 * @fileOverview An AI agent for calculating employee loan eligibility.
 *
 * - calculateLoanEligibility - A function that determines the maximum loan amount for an employee.
 * - LoanEligibilityInput - The input type for the calculateLoanEligibility function.
 * - LoanEligibilityOutput - The return type for the calculateLoanEligibility function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const LoanEligibilityInputSchema = z.object({
  employeeId: z.string().describe('The unique identifier for the employee.'),
  currentSalary: z.number().describe("The employee's current monthly net salary."),
  outstandingBalance: z.number().describe('Any existing outstanding loan or advance balance for the employee.'),
});
export type LoanEligibilityInput = z.infer<typeof LoanEligibilityInputSchema>;

// We need to add `currentDate` to the prompt's input schema.
const LoanEligibilityPromptInputSchema = LoanEligibilityInputSchema.extend({
    currentDate: z.string().describe("Today's date."),
});

const LoanEligibilityOutputSchema = z.object({
  eligibleAmount: z.number().describe('The calculated maximum loan amount the employee is eligible for.'),
  reasoning: z.string().describe('A brief explanation of how the eligibility was determined.'),
});
export type LoanEligibilityOutput = z.infer<typeof LoanEligibilityOutputSchema>;

export async function calculateLoanEligibility(input: LoanEligibilityInput): Promise<LoanEligibilityOutput> {
  return loanEligibilityFlow(input);
}

const prompt = ai.definePrompt({
  name: 'loanEligibilityPrompt',
  input: {schema: LoanEligibilityPromptInputSchema},
  output: {schema: LoanEligibilityOutputSchema},
  prompt: `You are an expert financial analyst for an HR department. Your task is to calculate the maximum loan (advance) an employee is eligible for based on their financial data.

  **Policy Rules:**
  1.  The maximum loan is calculated on a pro-rata basis of the employee's monthly net salary. For example, if it's the 15th day of a 30-day month, the employee has earned half their salary, so the base for the loan calculation is 50% of their net salary.
  2.  The maximum loan amount cannot exceed the pro-rata earnings.
  3.  Any existing outstanding balance must be subtracted from the maximum possible pro-rata loan amount.
  4.  The final eligible amount cannot be negative. If the calculation results in a negative number, the eligibility is 0.
  5.  Use today's date, which is {{{currentDate}}}, to determine the number of days worked this month.

  **Employee Data:**
  - Employee ID: {{{employeeId}}}
  - Current Monthly Salary: {{{currentSalary}}}
  - Outstanding Advance/Loan Balance: {{{outstandingBalance}}}

  Calculate the final eligible amount based on these rules and provide a brief reasoning, explaining the pro-rata calculation.
  `,
});

const loanEligibilityFlow = ai.defineFlow(
  {
    name: 'loanEligibilityFlow',
    inputSchema: LoanEligibilityInputSchema,
    outputSchema: LoanEligibilityOutputSchema,
  },
  async input => {
    const {output} = await prompt({
      ...input,
      currentDate: new Date().toLocaleDateString(),
    });
    return output!;
  }
);
