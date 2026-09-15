import OpenAI from "openai";

const embeddingModel = process.env.BRAINSTORMING_EMBEDDING_MODEL ?? "text-embedding-3-small";

let openAiClient: OpenAI | null = null;

function getOpenAiClient() {
  if (!process.env.OPENAI_API_KEY) return null;
  openAiClient ??= new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  return openAiClient;
}

export function isEmbeddingConfigured() {
  return Boolean(process.env.OPENAI_API_KEY);
}

export async function createBrainstormingEmbedding(input: string) {
  const client = getOpenAiClient();
  if (!client) return null;

  const response = await client.embeddings.create({
    model: embeddingModel,
    input,
  });

  return response.data[0]?.embedding ?? null;
}

export function embeddingToSqlVector(embedding: number[]) {
  return `[${embedding.join(",")}]`;
}
