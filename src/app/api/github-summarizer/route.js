import { NextResponse } from 'next/server';
import { fetchGitHubReadme, isValidGitHubUrl, parseGitHubUrl } from '../../../lib/github';
import { summarizeReadmeWithLangChain, analyzeReadmeContent } from '../../../lib/langchain';
import { authenticateApiKey } from '../../../lib/api-auth';

export async function POST(request) {
  try {
    // Authenticate API key
    const apiKey = request.headers.get('x-api-key');
    const authResult = await authenticateApiKey(apiKey);
    
    if (!authResult.valid) {
      return NextResponse.json(
        {
          error: authResult.error,
          valid: false,
          message: authResult.message
        },
        { status: authResult.status }
      );
    }

    const { keyData, usageInfo } = authResult;

    // Get request body for GitHub repository processing
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          error: 'Invalid JSON body',
          message: 'Please provide a valid JSON request body with repositoryUrl field.'
        },
        { status: 400 }
      );
    }

    const { repositoryUrl, action } = body;

    if (!repositoryUrl) {
      return NextResponse.json(
        {
          error: 'Repository URL is required',
          message: 'Please provide a GitHub repository URL to summarize.'
        },
        { status: 400 }
      );
    }

    // Validate GitHub URL format
    if (!isValidGitHubUrl(repositoryUrl)) {
      return NextResponse.json(
        {
          error: 'Invalid GitHub URL',
          message: 'Please provide a valid GitHub repository URL (e.g., https://github.com/owner/repo).'
        },
        { status: 400 }
      );
    }

    // Extract owner and repo from URL
    const { owner, repo } = parseGitHubUrl(repositoryUrl);

    // Fetch README.md content from GitHub
    const readmeResult = await fetchGitHubReadme(owner, repo);

    if (!readmeResult.success) {
      return NextResponse.json({
        success: false,
        error: readmeResult.error,
        message: readmeResult.message,
        repository: {
          owner,
          repo,
          url: repositoryUrl
        }
      }, { status: 404 });
    }

    // Perform LangChain AI summarization of README content
    const summarizationResult = await summarizeReadmeWithLangChain(
      readmeResult.content, 
      owner, 
      repo
    );

    if (!summarizationResult.success) {
      // If AI summarization fails, provide basic content analysis
      const basicAnalysis = analyzeReadmeContent(readmeResult.content);
      
      return NextResponse.json({
        success: false,
        error: summarizationResult.error,
        message: summarizationResult.message,
        errorCode: summarizationResult.errorCode,
        repository: {
          owner,
          repo,
          url: repositoryUrl
        },
        readme: {
          fileName: readmeResult.fileName,
          size: readmeResult.size,
          content: readmeResult.content,
          downloadUrl: readmeResult.downloadUrl,
          htmlUrl: readmeResult.htmlUrl,
          ...basicAnalysis
        }
      }, { status: 500 });
    }

    // Get basic content analysis for additional insights
    const basicAnalysis = analyzeReadmeContent(readmeResult.content);

    return NextResponse.json({
      success: true,
      message: 'GitHub repository analyzed successfully with AI',
      data: {
        repository: {
          owner,
          repo,
          url: repositoryUrl
        },
        action: action || 'summarize',
        keyInfo: {
          id: keyData.id,
          name: keyData.name,
          type: keyData.type,
          usageCount: usageInfo.currentUsage,
          remainingUsage: usageInfo.remainingUsage
        },
        readme: {
          fileName: readmeResult.fileName,
          size: readmeResult.size,
          content: readmeResult.content,
          downloadUrl: readmeResult.downloadUrl,
          htmlUrl: readmeResult.htmlUrl,
          ...basicAnalysis
        },
        // AI-powered analysis using LangChain
        analysis: {
          summary: summarizationResult.result.summary,
          cool_facts: summarizationResult.result.cool_facts,
          status: 'completed',
          ...summarizationResult.result.metadata
        }
      }
    });

  } catch (error) {
    console.error('GitHub summarizer API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        valid: false,
        message: 'An error occurred while processing the GitHub repository analysis.'
      },
      { status: 500 }
    );
  }
} 