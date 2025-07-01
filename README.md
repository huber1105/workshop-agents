# Genkit Agents and Evaluators

This directory contains a collection of Genkit agents and evaluators designed to perform various tasks, from searching for videos to translating text with self-correction.

## Agent 1: YouTube Video Search (`agent-01.ts`)

This agent defines a simple Genkit flow called `searchVideosFlow` that searches for YouTube videos based on a text query.

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

## Agent 2: Video Search and Content Generation (`agent-02.ts`)

This agent defines a more advanced Genkit flow, `searchSummaryVideosFlow`, that not only searches for YouTube videos but also generates a blog post based on their content.

### Features

- **YouTube Video Search**: Searches for videos using the `getYoutubeVideos` tool.
- **Video Transcription**: Transcribes the content of a video using the `getTransciption` tool.
- **Image Generation**: Creates a relevant image for the blog post using the `getImage` tool with Imagen.
- **Content Creation**: Generates a full blog post, including a title, content, conclusions, and references.

### Flow: `searchSummaryVideosFlow`

- **Input**: `text: string`
- **Output**: An object containing the generated blog post and video details:
  ```typescript
  {
    videos: { title: string; description: string; url: string; }[];
    blogTitle: string;
    blogContent: string;
    blogConclusions: string;
    blogReferences: string;
    blogImage: string;
  }
  ```

## Evaluator: Self-Correcting Translator (`evaluator-optimizer.ts`)

This file implements a self-correcting translation flow called `translationflow`, which translates text from Spanish to English and iteratively improves the translation based on feedback.

### Features

- **Automated Translation**: Translates Spanish text to English.
- **Self-Correction Loop**:
  1.  Generates an initial translation.
  2.  Evaluates the translation based on accuracy, fluency, and grammatical correctness.
  3.  If the translation is rated as "Bad," it re-prompts the model with the feedback to generate a better translation.
  4.  The loop continues until the translation is rated "Good."

### Flow: `translationflow`

- **Input**: `text: string` (in Spanish)
- **Output**: `string` (the final, corrected English translation)
