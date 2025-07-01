import { genkit, z } from "genkit";
import { googleAI, gemini25FlashPreview0417 } from "@genkit-ai/googleai";
import axios from "axios";

const API_URL_BASE =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&";

const API_KEY = "AIzaSyCesArocSCxPIxI-RFSOV9AwMzaijPqSjw";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini25FlashPreview0417,
});

const resultSearchVideos = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string(),
});

const getYoutubeVideos = ai.defineTool(
  {
    name: "getYoutubeVideos",
    description: "Get videos from youtube",
    inputSchema: z.object({
      text: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ text }) => {
    try {
      const api = `${API_URL_BASE}q=${text}&key=${API_KEY}`;
      const response = await axios.get<any>(api);
      return JSON.stringify(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

export const searchVideosFlow = ai.defineFlow(
  {
    name: "searchVideosFlow",
    inputSchema: z.object({
      text: z.string(),
    }),
    outputSchema: resultSearchVideos.array().nullable(),
  },
  async ({ text }) => {
    const searchVideoPrompt = await ai.prompt("search_videos");
    const output = searchVideoPrompt(
      {
        text,
      },
      {
        output: { schema: resultSearchVideos.array().nullable() },
        tools: [getYoutubeVideos],
      }
    );

    return (await output).output;
  }
);
