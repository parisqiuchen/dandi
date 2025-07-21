// GitHub API service for fetching repository content

/**
 * Fetches README.md content from a GitHub repository
 * @param {string} owner - Repository owner/organization
 * @param {string} repo - Repository name
 * @returns {Promise<Object>} - Result object with success status and content/error
 */
export async function fetchGitHubReadme(owner, repo) {
  try {
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`;
    
    const response = await fetch(githubApiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Dandi-App/1.0'
      }
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: 'README not found',
          message: 'This repository does not have a README.md file.'
        };
      }
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const data = await response.json();
    
    // GitHub API returns content in base64, so we need to decode it
    const readmeContent = Buffer.from(data.content, 'base64').toString('utf-8');
    
    return {
      success: true,
      content: readmeContent,
      fileName: data.name,
      size: data.size,
      downloadUrl: data.download_url,
      htmlUrl: data.html_url
    };
    
  } catch (error) {
    console.error('Error fetching GitHub README:', error);
    return {
      success: false,
      error: 'Failed to fetch README',
      message: error.message || 'An error occurred while fetching the README file.'
    };
  }
}

/**
 * Validates if a URL is a valid GitHub repository URL
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid GitHub repository URL
 */
export function isValidGitHubUrl(url) {
  const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
  return githubUrlPattern.test(url);
}

/**
 * Extracts owner and repository name from GitHub URL
 * @param {string} repositoryUrl - GitHub repository URL
 * @returns {Object} - Object with owner and repo properties
 */
export function parseGitHubUrl(repositoryUrl) {
  const urlParts = repositoryUrl
    .replace('https://github.com/', '')
    .replace(/\/$/, '')
    .split('/');
  
  const [owner, repo] = urlParts;
  
  return { owner, repo };
} 