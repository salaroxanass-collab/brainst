import { createClient } from "@supabase/supabase-js";
import OpenAI from "openai";
import { brainstormReferences, brainstormSources } from "../src/lib/brainstorming";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const embeddingModel = process.env.BRAINSTORMING_EMBEDDING_MODEL ?? "text-embedding-3-small";

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error("Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY before seeding.");
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
}).schema("brainstorming");

const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

async function main() {
  const sourceIdBySlug = new Map<string, string>();

  for (const source of brainstormSources) {
    const { data, error } = await supabase
      .from("sources")
      .upsert(
        {
          slug: source.id,
          name: source.name,
          homepage_url: source.homepage,
          status: source.status,
          permission_status: "limited",
          permission_notes: source.focus,
          allowed_content: {
            title: true,
            designer: true,
            location: true,
            snippet: true,
            thumbnail: false,
            image_url: false,
            source_url: true,
          },
          attribution_template: `Project reference from ${source.name}. View original: {source_url}.`,
        },
        { onConflict: "slug" }
      )
      .select("id, slug")
      .single();

    if (error || !data) throw new Error(error?.message ?? `Could not seed source ${source.name}`);
    sourceIdBySlug.set(data.slug, data.id);
  }

  for (const reference of brainstormReferences) {
    const sourceId = sourceIdBySlug.get(reference.sourceId);
    if (!sourceId) throw new Error(`Missing source ${reference.sourceId}`);

    const sourceUrl = `${reference.sourceUrl.replace(/\/$/, "")}/brainstorming-seed/${reference.id}`;
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .upsert(
        {
          source_id: sourceId,
          source_project_id: reference.id,
          source_url: sourceUrl,
          canonical_url: sourceUrl,
          title: reference.title.en,
          title_i18n: reference.title,
          designer: reference.designer,
          collaborators: [],
          location: reference.location.en,
          description_snippet: reference.snippet.en,
          description_i18n: reference.snippet,
          attribution: `${reference.designer}. Source: ${sourceUrl}`,
          status: "published",
          metadata: {
            seed_id: reference.id,
            source_slug: reference.sourceId,
          },
        },
        { onConflict: "source_id,source_url" }
      )
      .select("id")
      .single();

    if (projectError || !project) {
      throw new Error(projectError?.message ?? `Could not seed project ${reference.id}`);
    }

    const { error: metadataError } = await supabase.from("project_ai_metadata").upsert(
      {
        project_id: project.id,
        typology: reference.typology,
        landscape_typology: reference.typology,
        materials: reference.materials,
        planting_style: reference.plantingStyle,
        atmosphere: reference.atmosphere,
        climate: reference.climate,
        colour_palette: reference.colourPalette,
        project_scale: reference.scale,
        spatial_character: reference.atmosphere,
        design_elements: reference.tags,
        sustainability_features: reference.nbs,
        nature_based_solutions: reference.nbs,
        public_health_themes: reference.healthThemes,
        client_facing_keywords: reference.tags,
        ai_summary: reference.aiSummary.en,
        ai_model: "seed",
        confidence: 1,
      },
      { onConflict: "project_id" }
    );

    if (metadataError) throw new Error(metadataError.message);

    const { error: imageError } = await supabase.from("project_images").upsert(
      {
        project_id: project.id,
        source_id: sourceId,
        image_url: reference.imageUrl,
        thumbnail_url: reference.imageUrl,
        alt_text: reference.title.en,
        caption: reference.snippet.en,
        credit: reference.imageCredit,
        permission_status: "limited",
        status: "approved",
        dominant_colours: reference.colourPalette,
        sort_order: 0,
      },
      { onConflict: "project_id,image_url" }
    );

    if (imageError) throw new Error(imageError.message);

    for (const tag of reference.tags) {
      const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const { data: tagRow, error: tagError } = await supabase
        .from("tags")
        .upsert(
          {
            slug,
            label: tag,
            category: "seed",
            is_ai_generated: true,
          },
          { onConflict: "slug" }
        )
        .select("id")
        .single();

      if (tagError || !tagRow) throw new Error(tagError?.message ?? `Could not seed tag ${tag}`);

      const { error: projectTagError } = await supabase.from("project_tags").upsert(
        {
          project_id: project.id,
          tag_id: tagRow.id,
          confidence: 1,
          source: "seed",
        },
        { onConflict: "project_id,tag_id" }
      );

      if (projectTagError) throw new Error(projectTagError.message);
    }

    if (openai) {
      const content = [
        reference.title.en,
        reference.designer,
        reference.location.en,
        reference.snippet.en,
        reference.aiSummary.en,
        reference.tags.join(", "),
        reference.materials.join(", "),
        reference.nbs.join(", "),
      ].join("\n");

      const embedding = await openai.embeddings.create({
        model: embeddingModel,
        input: content,
      });

      const vector = embedding.data[0]?.embedding;
      if (vector) {
        const { error: deleteEmbeddingError } = await supabase
          .from("embeddings")
          .delete()
          .eq("project_id", project.id)
          .eq("embedding_model", embeddingModel);

        if (deleteEmbeddingError) throw new Error(deleteEmbeddingError.message);

        const { error: embeddingError } = await supabase.from("embeddings").insert({
          subject: "project",
          project_id: project.id,
          content,
          embedding: `[${vector.join(",")}]`,
          embedding_model: embeddingModel,
          metadata: { seed_id: reference.id },
        });

        if (embeddingError) throw new Error(embeddingError.message);
      }
    }

    console.log(`Seeded ${reference.title.en}`);
  }

  console.log(
    openai
      ? "BrainStorming seed complete with embeddings."
      : "BrainStorming seed complete without embeddings. Set OPENAI_API_KEY to add vector search."
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
