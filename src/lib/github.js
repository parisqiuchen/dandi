// GitHub API service for fetching repository content and metadata

/**
 * Fetches repository metadata (stars, latest version, etc.)
 * @param {string} owner - Repository owner/organization
 * @param {string} repo - Repository name
 * @returns {Promise<Object>} - Result object with success status and metadata/error
 */
export async function fetchGitHubRepoMetadata(owner, repo) {
  try {
    // Fetch basic repository information
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Dandi-App/1.0'
      }
    });

    if (!repoResponse.ok) {
      if (repoResponse.status === 404) {
        return {
          success: false,
          error: 'Repository not found',
          message: 'The specified repository does not exist or is private.'
        };
      }
      throw new Error(`GitHub API error: ${repoResponse.status}`);
    }

    const repoData = await repoResponse.json();

    // Fetch latest release information
    let latestVersion = null;
    let latestVersionError = null;
    
    try {
      const releaseResponse = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Dandi-App/1.0'
        }
      });

      if (releaseResponse.ok) {
        const releaseData = await releaseResponse.json();
        latestVersion = {
          tag: releaseData.tag_name,
          name: releaseData.name,
          publishedAt: releaseData.published_at,
          url: releaseData.html_url,
          isPrerelease: releaseData.prerelease,
          isDraft: releaseData.draft
        };
      } else if (releaseResponse.status === 404) {
        latestVersionError = 'No releases found';
      }
    } catch (error) {
      latestVersionError = 'Failed to fetch release information';
    }

    return {
      success: true,
      metadata: {
        name: repoData.name,
        fullName: repoData.full_name,
        description: repoData.description,
        homepage: repoData.homepage,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        watchers: repoData.watchers_count,
        language: repoData.language,
        topics: repoData.topics || [],
        createdAt: repoData.created_at,
        updatedAt: repoData.updated_at,
        pushedAt: repoData.pushed_at,
        size: repoData.size,
        isPrivate: repoData.private,
        isFork: repoData.fork,
        isArchived: repoData.archived,
        defaultBranch: repoData.default_branch,
        license: repoData.license ? {
          name: repoData.license.name,
          spdxId: repoData.license.spdx_id,
          url: repoData.license.url
        } : null,
        latestVersion: latestVersion,
        latestVersionError: latestVersionError,
        owner: {
          login: repoData.owner.login,
          type: repoData.owner.type,
          url: repoData.owner.html_url,
          avatarUrl: repoData.owner.avatar_url
        }
      }
    };

  } catch (error) {
    console.error('Error fetching GitHub repository metadata:', error);
    return {
      success: false,
      error: 'Failed to fetch repository metadata',
      message: error.message || 'An error occurred while fetching repository information.'
    };
  }
}

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