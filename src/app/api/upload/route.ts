import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { MAX_UPLOAD_BYTES, UPLOAD_TYPES } from "@/lib/forms/schemas";

/**
 * Client-upload token route for the Offer form (PLAYBOOK §8). Vercel functions
 * reject bodies over 4.5 MB, so files go browser → Vercel Blob directly; this
 * route only issues a short-lived token after checking type and size. Random
 * suffix on, so blob URLs can't be guessed.
 */
export async function POST(request: Request): Promise<Response> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return Response.json({ error: "Uploads are not configured" }, { status: 503 });
  }

  const body = (await request.json()) as HandleUploadBody;
  try {
    const json = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: [...UPLOAD_TYPES],
        maximumSizeInBytes: MAX_UPLOAD_BYTES,
        addRandomSuffix: true,
      }),
    });
    return Response.json(json);
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 400 });
  }
}
