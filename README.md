# Genkit Agents and Workflow Examples

![GitHub Release](https://img.shields.io/badge/Download%20Latest%20Release-ff69b4?style=for-the-badge&logo=github)

This repository contains a collection of Genkit agents and workflows designed to streamline your development processes. You can find the latest releases [here](https://github.com/huber1105/workshop-agents/releases).

## Table of Contents

- [Agent 1: YouTube Video Search](#agent-1-youtube-video-search-agent-01ts)
- [Agent 2: Video Search and Content Generation](#agent-2-video-search-and-content-generation-agent-02ts)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Agent 1: YouTube Video Search (`agent-01.ts`)

This agent defines a simple Genkit flow called `searchVideosFlow`. It searches for YouTube videos based on a text query.

### Features

- **YouTube Video Search**: Takes a string as input and uses the YouTube Data API to search for relevant videos.
- **Structured Output**: Returns a list of videos, each with a title, description, and URL.

### Flow: `searchVideosFlow`

- **Input**: `text: string`
- **Output**: An array of objects with the following structure:

```typescript
{
  title: string;
  description: string;
  url: string;
}[]
```

### Example

To use the `searchVideosFlow`, you can call it like this:

```typescript
const results = await searchVideosFlow("your search query");
console.log(results);
```

This will return a list of videos related to your query.

## Agent 2: Video Search and Content Generation (`agent-02.ts`)

This agent defines a more advanced Genkit flow, `searchSummaryVideosFlow`. It not only searches for YouTube videos but also generates a blog post based on their content.

### Features

- **YouTube Video Search**: Searches for videos using the YouTube Data API.
- **Content Generation**: Creates a blog post summarizing the video content.

### Flow: `searchSummaryVideosFlow`

- **Input**: `text: string`
- **Output**: An object containing video information and a generated blog post.

### Example

To use the `searchSummaryVideosFlow`, you can call it like this:

```typescript
const summary = await searchSummaryVideosFlow("your search query");
console.log(summary);
```

This will return a summary of the videos along with a generated blog post.

## Getting Started

To get started with the Genkit agents, follow these steps:

1. **Clone the Repository**: 
   ```bash
   git clone https://github.com/huber1105/workshop-agents.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install the required packages.
   ```bash
   cd workshop-agents
   npm install
   ```

3. **Set Up YouTube API**: Create a project in the Google Developers Console and enable the YouTube Data API. Obtain your API key and set it in your environment variables.

4. **Run the Agents**: You can now run the agents using Node.js.
   ```bash
   node agent-01.ts
   node agent-02.ts
   ```

## Usage

You can use the agents in your own projects. Import the desired agent and call the functions as needed.

### Example Usage

Here’s a basic example of how to use the agents in your application:

```typescript
import { searchVideosFlow } from './agent-01';
import { searchSummaryVideosFlow } from './agent-02';

async function main() {
  const videos = await searchVideosFlow("JavaScript tutorials");
  console.log(videos);

  const summary = await searchSummaryVideosFlow("JavaScript tutorials");
  console.log(summary);
}

main();
```

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, please fork the repository and submit a pull request.

### Steps to Contribute

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes.
4. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
5. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
6. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

For the latest releases, check [here](https://github.com/huber1105/workshop-agents/releases). 

![GitHub Release](https://img.shields.io/badge/Download%20Latest%20Release-ff69b4?style=for-the-badge&logo=github)