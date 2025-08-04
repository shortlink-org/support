import { createOpenAI } from "@ai-sdk/openai";
import { Agent } from "@mastra/core/agent";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
import { githubRepoTool } from "../tools/github-repo-tool";

const openai = createOpenAI({
  baseURL: process.env.OPENAI_BASE_URL_ANALYZER || "http://localhost:12434/engines/v1",
  apiKey: process.env.OPENAI_API_KEY || "not-set",
});

// Using gpt-4o which should be compatible with AI SDK 5
const model = openai("gpt-4o");

export const memory = new Memory({
  storage: new LibSQLStore({
    url: `file:./mastra.db`,
  }),
  options: {
    semanticRecall: false,
    workingMemory: {
      enabled: false,
    },
    lastMessages: 5,
  },
});

export const githubAgent: Agent = new Agent({
  name: "GitHub Insights Agent",
  instructions: `You analyse GitHub repos.
- If user omits owner/repo, ask for them.
- Return stars, forks, issues, license and last push.
- Offer a one‑sentence health summary (e.g., \"Active and well‑maintained\").`,
  model: model as any, // Type assertion to bypass version mismatch
  tools: { githubRepoTool },
  memory,
  defaultGenerateOptions: {
    maxSteps: 3,
    maxRetries: 1,
  },
  defaultStreamOptions: {
    mode: 'text',
  },
} as any); 