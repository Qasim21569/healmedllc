"use client";

import { useId, useRef, useState } from "react";
import { upload } from "@vercel/blob/client";
import { formStates } from "@/content/forms";
import { MAX_UPLOAD_BYTES, UPLOAD_TYPES } from "@/lib/forms/schemas";
import { Icon } from "@/components/ui/Icon";

export type UploadedFile = { url: string; name: string; size: number };

type Item = {
  key: string;
  name: string;
  size: number;
  status: "uploading" | "done" | "error";
  url?: string;
  message?: string;
};

const ACCEPT = ".xlsx,.xls,.csv,.jpg,.jpeg,.png,.pdf";

/**
 * Offer form uploads (PLAYBOOK §8). Files go from the browser straight to
 * Vercel Blob (`upload()` + /api/upload token route), never through the
 * Server Action. Only the resulting URLs are handed to the form.
 */
export function FileField({
  label,
  hint,
  button,
  onChange,
  onBusyChange,
}: {
  label: string;
  hint?: string;
  button: string;
  onChange: (files: UploadedFile[]) => void;
  onBusyChange: (busy: boolean) => void;
}) {
  const id = useId();
  const input = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);

  const commit = (next: Item[]) => {
    setItems(next);
    onChange(
      next
        .filter((i) => i.status === "done" && i.url)
        .map((i) => ({ url: i.url!, name: i.name, size: i.size })),
    );
    onBusyChange(next.some((i) => i.status === "uploading"));
  };

  const onFiles = async (list: FileList | null) => {
    if (!list) return;
    let current = [...items];
    const queue: { item: Item; file: File }[] = [];
    for (const file of Array.from(list)) {
      const item: Item = {
        key: `${file.name}-${file.size}-${Date.now()}`,
        name: file.name,
        size: file.size,
        status: "uploading",
      };
      if (file.size > MAX_UPLOAD_BYTES)
        Object.assign(item, { status: "error", message: formStates.fileTooBig });
      else if (file.type && !(UPLOAD_TYPES as readonly string[]).includes(file.type))
        Object.assign(item, { status: "error", message: formStates.fileType });
      else queue.push({ item, file });
      current.push(item);
    }
    commit(current);

    await Promise.all(
      queue.map(async ({ item, file }) => {
        let patch: Partial<Item>;
        try {
          const blob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/upload",
            multipart: file.size > 5 * 1024 * 1024,
          });
          patch = { status: "done", url: blob.url };
        } catch {
          patch = { status: "error", message: formStates.uploadFailed };
        }
        current = current.map((i) => (i.key === item.key ? { ...i, ...patch } : i));
        commit(current);
      }),
    );
    if (input.current) input.current.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      <span id={`${id}-label`} className="type-small text-ink">
        {label}
      </span>
      <label
        htmlFor={id}
        className="flex min-h-14 cursor-pointer items-center justify-between gap-4 rounded-input border border-dashed border-control bg-surface px-4 py-3 transition-colors duration-300 ease-heal hover:border-brand focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-focus"
      >
        <span className="flex items-center gap-3 type-small text-body">
          <Icon name="upload" className="text-brand" />
          {button}
        </span>
        {hint && <span className="type-eyebrow text-muted">{hint}</span>}
        <input
          ref={input}
          id={id}
          type="file"
          multiple
          accept={ACCEPT}
          aria-labelledby={`${id}-label`}
          className="sr-only"
          onChange={(e) => onFiles(e.target.files)}
        />
      </label>
      {items.length > 0 && (
        <ul className="flex flex-col gap-1" aria-live="polite">
          {items.map((item) => (
            <li key={item.key} className="flex items-center justify-between gap-3 type-small">
              <span className="truncate text-ink">
                {item.name}
                <span className="ml-2 text-muted">
                  {item.status === "uploading"
                    ? formStates.uploading
                    : `${Math.ceil(item.size / 1024)} KB`}
                </span>
                {item.message && <span className="block text-danger">{item.message}</span>}
              </span>
              {item.status !== "uploading" && (
                <button
                  type="button"
                  className="min-h-11 shrink-0 text-muted underline-offset-4 hover:text-ink hover:underline"
                  onClick={() => commit(items.filter((i) => i.key !== item.key))}
                >
                  {formStates.removeFile}
                  <span className="sr-only"> {item.name}</span>
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
