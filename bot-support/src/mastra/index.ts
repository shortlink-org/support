import { Mastra } from "@mastra/core";
import { ConsoleLogger } from "@mastra/core/logger";
import { githubAgent } from "./agents/github";

export const mastra = new Mastra({
  agents: { githubAgent },
  aiSdkCompat: "v5",
  logger: new ConsoleLogger(),
  server: {
    build: {
      openAPIDocs: true,
      swaggerUI: true,
    },
  },
} as any); 