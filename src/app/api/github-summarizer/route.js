import { NextResponse } from 'next/server';
import { fetchGitHubReadme, fetchGitHubRepoMetadata, isValidGitHubUrl, parseGitHubUrl } from '../../../lib/github';
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

    // Fetch README.md content and repository metadata from GitHub in parallel
    const [readmeResult, metadataResult] = await Promise.all([
      fetchGitHubReadme(owner, repo),
      fetchGitHubRepoMetadata(owner, repo)
    ]);

    if (!readmeResult.success) {
      return NextResponse.json({
        error: readmeResult.error,
        message: readmeResult.message
      }, { status: 404 });
    }

    // Perform LangChain AI summarization of README content
    const summarizationResult = await summarizeReadmeWithLangChain(
      readmeResult.content, 
      owner, 
      repo
    );

    if (!summarizationResult.success) {
      return NextResponse.json({
        error: summarizationResult.error,
        message: summarizationResult.message
      }, { status: 500 });
    }

    // Create simplified response with only essential fields
    const responseData = {
      summary: summarizationResult.result.summary,
      cool_facts: summarizationResult.result.cool_facts,
    };

    // Add repository metadata if available
    if (metadataResult.success) {
      responseData.stars = metadataResult.metadata.stars;
      responseData.latestVersion = metadataResult.metadata.latestVersion?.tag || null;
      responseData.websiteUrl = metadataResult.metadata.homepage || `https://github.com/${owner}/${repo}`;
      responseData.licenseType = metadataResult.metadata.license?.spdxId || null;
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('GitHub summarizer API error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'An error occurred while processing the GitHub repository analysis.'
      },
      { status: 500 }
    );
  }
} 