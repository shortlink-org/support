import { Agent } from "@mastra/core/agent";
import { MCPClient } from "@mastra/mcp";
import { createOpenAI } from "@ai-sdk/openai";
import { Memory } from "@mastra/memory";
import { LibSQLStore } from "@mastra/libsql";
 
 
const SYSTEM_PROMPT = `
You are a bot that will analyze a pull request for a repository and determine if it can be auto-closed or not.
...`;

// Declare prExecutor outside the function
let prExecutor: Agent;
 
async function main() {
  const mcpGateway = new MCPClient({
    servers: {
      mcpGateway: {
        url: new URL(process.env.MCP_GATEWAY_URL || "http://localhost:8811/sse"),
      },
    },
  });
 
 
  const openai = createOpenAI({
    baseURL: process.env.OPENAI_BASE_URL_ANALYZER || "http://localhost:12434/engines/v1",
    apiKey: process.env.OPENAI_API_KEY || "not-set",
  });
 
  const model = openai(process.env.OPENAI_MODEL_ANALYZER || "ai/qwen3:8B-Q4_0");
 
  prExecutor = new Agent({
    name: 'Pull request analyzer',
    instructions: SYSTEM_PROMPT,
    model: model as any, // Type assertion to bypass version mismatch
    tools: await mcpGateway.getTools(),
    memory: new Memory({
      storage: new LibSQLStore({
        url: "file:/tmp/mastra.db",
      }),
    }),
  });
}

// Export prExecutor
export { prExecutor };

// Run the main function
main().catch(console.error); 