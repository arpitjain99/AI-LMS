import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE } from "../../../configs/schema";
import { db } from "../../../configs/db";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";
import { STUDY_TYPE_CONTENT_TABLE } from "../../../configs/schema";
import {
  GenerateQaAiModel,
  GenerateQuizAiModel,
  GenerateStudyTypeContentAiModel,
} from "../../../configs/AiModelWrapper";

function safeParseJSON(text) {
  let cleaned = text.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned
      .replace(/^```(?:json)?\s*\n?/, "")
      .replace(/\n?```\s*$/, "");
  }

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    let repaired = cleaned;
    const openBraces = (repaired.match(/{/g) || []).length;
    const closeBraces = (repaired.match(/}/g) || []).length;
    const openBrackets = (repaired.match(/\[/g) || []).length;
    const closeBrackets = (repaired.match(/\]/g) || []).length;
    const lastQuoteIndex = repaired.lastIndexOf('"');

    if (lastQuoteIndex > 0) {
      const afterLastQuote = repaired.substring(lastQuoteIndex + 1);
      if (!/[}\],]/.test(afterLastQuote.trim())) {
        repaired = repaired.substring(0, lastQuoteIndex) + '"';
      }
    }

    for (let i = 0; i < openBrackets - closeBrackets; i++) repaired += "]";
    for (let i = 0; i < openBraces - closeBraces; i++) repaired += "}";

    return JSON.parse(repaired);
  }
}

async function generateStudyTypeContent({ courseId, studyType }) {
  const [course] = await db
    .select()
    .from(STUDY_MATERIAL_TABLE)
    .where(eq(STUDY_MATERIAL_TABLE.courseId, courseId));

  if (!course) {
    throw new Error("Course not found for content generation");
  }

  let prompt = "";
  let model = null;

  if (studyType === "Flashcard") {
    prompt = `Generate flashcards for the topic: "${course.topic}" with course type: "${course.courseType}". Create 10-15 flashcards with front and back content in JSON format.`;
    model = GenerateStudyTypeContentAiModel;
  } else if (studyType === "Quiz") {
    prompt = `Generate a Quiz on the topic: "${course.topic}" with course type: "${course.courseType}". Create 10 questions with multiple choice options and correct answers in JSON format.`;
    model = GenerateQuizAiModel;
  } else if (studyType === "Question/Answer") {
    prompt = `Generate Q&A pairs for the topic: "${course.topic}" with course type: "${course.courseType}". Create 10-15 question and answer pairs with detailed explanations in JSON format.`;
    model = GenerateQaAiModel;
  }

  if (!model) {
    throw new Error(`Unsupported study type: ${studyType}`);
  }

  const response = await model.sendMessage(prompt);
  const data = safeParseJSON(response.response.text());

  const existing = await db
    .select()
    .from(STUDY_TYPE_CONTENT_TABLE)
    .where(
      and(
        eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
      )
    );

  if (existing.length > 0) {
    await db
      .update(STUDY_TYPE_CONTENT_TABLE)
      .set({ content: data, status: "Ready" })
      .where(eq(STUDY_TYPE_CONTENT_TABLE.id, existing[0].id));

    return { ...existing[0], content: data, status: "Ready" };
  }

  const inserted = await db
    .insert(STUDY_TYPE_CONTENT_TABLE)
    .values({
      courseId,
      content: data,
      type: studyType,
      status: "Ready",
    })
    .returning();

  return inserted[0];
}

// Helper function to retry database operations
async function retryDbOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      console.log(`Database operation failed, retrying... (${i + 1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1))); // Exponential backoff
    }
  }
}

export async function POST(req) {
  try {
    const { courseId, studyType } = await req.json();

    // Validate input
    if (!courseId) {
      return NextResponse.json(
        { error: "The 'courseId' field is required." },
        { status: 400 }
      );
    }

    console.log("Incoming Data:", { courseId, studyType });

    // Handling "ALL" case
    if (studyType === "ALL") {
      const notes = await retryDbOperation(() => 
        db.select()
          .from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId))
      );

      console.log("Fetched Notes:", notes);

      const contentList = await retryDbOperation(() =>
        db.select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId))
      );

      console.log("Fetched Study Content:", contentList);

      const result = {
        notes: notes || [],
        flashcard: (contentList || []).filter((item) => item.type === "Flashcard"),
        quiz: (contentList || []).filter((item) => item.type === "Quiz"),
        qa: (contentList || []).filter((item) => item.type === "Question/Answer"),
      };

      return NextResponse.json(result);
    }

    // Handling specific study types
    else if (studyType === "notes") {
      const notes = await retryDbOperation(() =>
        db.select()
          .from(CHAPTER_NOTES_TABLE)
          .where(eq(CHAPTER_NOTES_TABLE.courseId, courseId))
      );

      console.log("Notes for courseId:", courseId, notes);

      return NextResponse.json(notes || []);
    } else {
      const result = await retryDbOperation(() =>
        db.select()
          .from(STUDY_TYPE_CONTENT_TABLE)
          .where(
            and(
              eq(STUDY_TYPE_CONTENT_TABLE.courseId, courseId),
              eq(STUDY_TYPE_CONTENT_TABLE.type, studyType)
            )
          )
      );

      const readyContent = (result || []).find((item) => item?.content && item?.status === "Ready");
      const content = readyContent || (result || [])[0] || null;
      console.log(`Content for type ${studyType}:`, content);

      if (!content || !content.content || content.status !== "Ready") {
        const generated = await generateStudyTypeContent({ courseId, studyType });
        return NextResponse.json(generated || null);
      }

      return NextResponse.json(content);
    }
  } catch (error) {
    console.error("Error in POST /api/study-type:", error.message);
    console.error("Full error details:", error); // Log full error details

    return NextResponse.json(
      { error: "Failed to fetch study materials. Please try again later." },
      { status: 500 }
    );
  }
}
