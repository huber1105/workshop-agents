import { genkit, z } from "genkit";
import { vertexAI, imagen3Fast } from "@genkit-ai/vertexai";
import parseDataURL from "data-urls";
import { writeFile } from "node:fs/promises";

const ai = genkit({
  plugins: [vertexAI()],
});

export const test = ai.defineFlow(
  {
    name: "test",
  },
  async () => {
    const { media } = await ai.generate({
      model: imagen3Fast,
      prompt: "An illustration a DJ dog ",
      output: { format: "media" },
    });

    console.log(media?.url);
    if (media?.url) {
      const parsed = parseDataURL(media.url);
      if (parsed) {
        await writeFile("test-image.png", parsed.body);
      }
    }
  }
);
