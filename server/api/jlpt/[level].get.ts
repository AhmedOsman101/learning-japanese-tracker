type Level = "N1" | "N2" | "N3" | "N4" | "N5";

export default defineEventHandler(async event => {
  const level = event.context.params?.level;

  if (!level || !["N5", "N4", "N3", "N2", "N1"].includes(level)) {
    return sendError(
      event,
      createError({ statusCode: 400, statusMessage: "Invalid JLPT level" })
    );
  }

  try {
    const progress = await ProgressModel.findOne()
      .select(`jlpt.${level}`)
      .lean();
    return progress?.jlpt[level as Level];
  } catch (err) {
    console.error("[API /jlpt/:level]", err);
    return sendError(
      event,
      createError({ statusCode: 500, statusMessage: "DB query failed" })
    );
  }
});
