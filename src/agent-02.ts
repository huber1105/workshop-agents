import { genkit, z } from "genkit";
import { googleAI, gemini20Flash } from "@genkit-ai/googleai";
import { vertexAI, imagen3Fast } from "@genkit-ai/vertexai";
import parseDataURL from "data-urls";
import { writeFile } from "node:fs/promises";
import axios from "axios";

const API_URL_BASE =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&";

const API_KEY = "AIzaSyCesArocSCxPIxI-RFSOV9AwMzaijPqSjw";

const ai = genkit({
  plugins: [googleAI(), vertexAI()],
});

const resultSearchVideos = z.object({
  videos: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
      url: z.string(),
    })
  ),
  blogTitle: z.string(),
  blogContent: z.string(),
  blogConclusions: z.string(),
  blogReferences: z.string(),
  blogImage: z.string(),
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
      console.log("Getting videos from youtube...");
      const api = `${API_URL_BASE}q=${text}&key=${API_KEY}`;
      const response = await axios.get<any>(api);
      const videos = JSON.stringify(response.data);
      console.log("List of videos: ", videos);
      return videos;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
);

const getTranscription = ai.defineTool(
  {
    name: "getTransciption",
    description: "Get Transciption from youtube",
    inputSchema: z.object({
      url: z.string(),
    }),
    outputSchema: z.string().nullable(),
  },
  async ({ url }) => {
    console.log("Getting Transciption from youtube...");
    const { text } = await ai.generate({
      prompt: [
        {
          text: "transcribe this video",
        },
        {
          media: {
            url: url,
            contentType: "video/mp4",
          },
        },
      ],
      model: gemini20Flash,
    });
    console.log("transcription created", text);
    return text;
  }
);

const getImage = ai.defineTool(
  {
    name: "getImage",
    description: "Create an image based on a text",
    inputSchema: z.object({
      text: z.string(),
    }),
    outputSchema: z.string(),
  },
  async ({ text }) => {
    console.log("Creating image...");
    console.log("prompt: ", text);

    const { media } = await ai.generate({
      model: imagen3Fast,
      prompt: `An illustration for this blog post: ${text}`,
      output: { format: "media" },
    });

    if (media?.url) {
      const parsed = parseDataURL(media.url);
      if (parsed) {
        await writeFile("blog-image.png", parsed.body);
      }
    }
    return media?.url ?? "";
  }
);

export const searchSummaryVideosFlow = ai.defineFlow(
  {
    name: "searchSummaryVideosFlow",
    inputSchema: z.object({
      text: z.string(),
    }),
    outputSchema: resultSearchVideos.nullable(),
  },
  async ({ text }) => {
    const searchVideoPrompt = await ai.prompt("search_videos_2");
    const output = searchVideoPrompt(
      {
        text,
      },
      {
        output: { schema: resultSearchVideos.nullable() },
        tools: [getYoutubeVideos, getTranscription, getImage],
      }
    );

    return (await output).output;
  }
);
