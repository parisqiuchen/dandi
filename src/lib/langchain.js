// LangChain AI service for repository analysis and summarization

import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';

/**
 * Validates if OpenAI API key is properly configured
 * @returns {boolean} - True if API key is valid
 */
export function isOpenAIConfigured() {
  return !!(process.env.OPENAI_API_KEY && !process.env.OPENAI_API_KEY.includes('your_'));
}

/**
 * Creates the output schema for repository analysis
 * @returns {Object} - Zod schema object
 */
function createAnalysisSchema() {
  return z.object({
    summary: z.string().describe("A comprehensive summary of the GitHub repository based on the README content"),
    cool_facts: z.array(z.string()).describe("A list of interesting or notable facts about the repository")
  });
}

/**
 * Creates the prompt template for repository analysis
 * @returns {PromptTemplate} - LangChain prompt template
 */
function createAnalysisPrompt() {
  return PromptTemplate.fromTemplate(`
Summarize this GitHub repository from this README file content. 

Repository: {owner}/{repo}

README Content:
{readmeContent}

Please provide:
1. A comprehensive summary of what this repository is about, its main purpose, key features, and target audience
2. A list of cool/interesting facts about the repository (technologies used, notable features, achievements, etc.)

Return your response as a JSON object with 'summary' (string) and 'cool_facts' (array of strings) fields.
`);
}

/**
 * Creates and configures the OpenAI model
 * @param {Object} options - Configuration options for the model
 * @returns {ChatOpenAI} - Configured OpenAI model instance
 */
function createOpenAIModel(options = {}) {
  const defaultOptions = {
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: "gpt-3.5-turbo",
    temperature: 0.3,
  };

  return new ChatOpenAI({ ...defaultOptions, ...options });
}

/**
 * Creates the complete LangChain analysis chain using withStructuredOutput
 * @returns {Object} - Object containing the structured model and prompt
 */
function createAnalysisChain() {
  const model = createOpenAIModel();
  const outputSchema = createAnalysisSchema();
  const promptTemplate = createAnalysisPrompt();

  // Use the modern withStructuredOutput approach
  const structuredModel = model.withStructuredOutput(outputSchema);

  const chain = promptTemplate.pipe(structuredModel);

  return { chain, outputSchema };
}

/**
 * Summarizes README content using LangChain and OpenAI
 * @param {string} readmeContent - The README content to analyze
 * @param {string} owner - Repository owner/organization
 * @param {string} repo - Repository name
 * @param {Object} options - Optional configuration
 * @returns {Promise<Object>} - Result object with success status and analysis/error
 */
export async function summarizeReadmeWithLangChain(readmeContent, owner, repo, options = {}) {
  try {
    // Check if OpenAI API key is configured
    if (!isOpenAIConfigured()) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your .env.local file with a real API key from https://platform.openai.com/api-keys');
    }

    // Create the analysis chain
    const { chain } = createAnalysisChain();

    // Execute the chain with the provided content
    const result = await chain.invoke({
      owner,
      repo,
      readmeContent
    });

    return {
      success: true,
      result: {
        summary: result.summary,
        cool_facts: result.cool_facts,
        metadata: {
          processedBy: 'LangChain + OpenAI GPT-3.5-turbo',
          processedAt: new Date().toISOString(),
          contentLength: readmeContent.length,
          wordCount: readmeContent.split(/\s+/).length
        }
      }
    };

  } catch (error) {
    console.error('LangChain summarization error:', error);
    
    // Provide specific error messages for common issues
    let errorMessage = error.message;
    if (error.code === 'invalid_api_key') {
      errorMessage = 'Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local';
    } else if (error.code === 'insufficient_quota') {
      errorMessage = 'OpenAI API quota exceeded. Please check your OpenAI account billing.';
    } else if (error.code === 'rate_limit_exceeded') {
      errorMessage = 'OpenAI API rate limit exceeded. Please try again later.';
    }

    return {
      success: false,
      error: 'Summarization failed',
      message: errorMessage,
      errorCode: error.code || 'unknown_error'
    };
  }
}

/**
 * Analyzes README content and provides basic statistics
 * @param {string} readmeContent - The README content to analyze
 * @returns {Object} - Basic analysis statistics
 */
export function analyzeReadmeContent(readmeContent) {
  const lines = readmeContent.split('\n');
  const words = readmeContent.split(/\s+/);
  const characters = readmeContent.length;
  
  // Count different types of content
  const codeBlocks = (readmeContent.match(/```/g) || []).length / 2;
  const headings = lines.filter(line => line.trim().startsWith('#')).length;
  const links = (readmeContent.match(/\[.*?\]\(.*?\)/g) || []).length;
  const images = (readmeContent.match(/!\[.*?\]\(.*?\)/g) || []).length;

  return {
    lineCount: lines.length,
    wordCount: words.length,
    characterCount: characters,
    codeBlocks,
    headings,
    links,
    images,
    estimatedReadingTime: Math.ceil(words.length / 200) // ~200 words per minute
  };
} 