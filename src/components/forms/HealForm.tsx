"use client";

import { useId, useState } from "react";
import { useForm, type FieldValues, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { formStates } from "@/content/forms";
import { formConfigs, type FieldDef } from "@/lib/forms/config";
import { schemas, type FormKind } from "@/lib/forms/schemas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { FileField } from "./FileField";
import { useTurnstile } from "./useTurnstile";

const control =
  "w-full rounded-input border border-control bg-surface px-4 text-ink placeholder:text-muted " +
  "text-[length:max(16px,var(--t-body))] transition-colors duration-300 ease-heal " +
  "hover:border-ink focus-visible:border-brand aria-[invalid=true]:border-danger";

/**
 * One form component for all four forms (PLAYBOOK §8). Fields come from
 * lib/forms/config.ts, validation from the shared zod schema (zodResolver),
 * submission through the Server Action with an invisible Turnstile token.
 *
 * States: errors under each field (aria-describedby), "Sending…" on the
 * button, success swaps the form for a thank-you panel (0.2s fade), a send
 * error keeps every input and shows the error copy.
 *
 * `layout="inline"`: one row (stock check).
 */
export function HealForm({
  kind,
  layout = "card",
  className,
}: {
  kind: FormKind;
  layout?: "card" | "inline";
  className?: string;
}) {
  const config = formConfigs[kind];
  const formId = useId();
  const { ref: turnstileRef, token, reset: resetTurnstile } = useTurnstile();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    resolver: zodResolver(schemas[kind]) as unknown as Resolver<FieldValues>,
    mode: "onTouched",
  });

  const onSubmit = async (values: FieldValues) => {
    setStatus("idle");
    const result = await config.action(values, token ?? undefined);
    if (result.ok) {
      setStatus("success");
      return;
    }
    if (result.error === "validation") {
      for (const [field, message] of Object.entries(result.fieldErrors))
        setError(field, { message });
      return;
    }
    resetTurnstile();
    setStatus("error");
  };

  const errorOf = (name: string) => {
    const e = errors[name];
    return typeof e?.message === "string" ? e.message : undefined;
  };

  const inline = layout === "inline";

  return (
    <div
      className={cn(
        !inline &&
          "rounded-card border border-hairline bg-canvas p-6 md:p-[calc(36*var(--multiplier))]",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="done"
            role="status"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 py-6"
          >
            <span className="grid size-12 place-items-center rounded-full bg-brand text-on-brand">
              <Icon name="arrow" />
            </span>
            <p className="type-h3 text-ink">{formStates.successTitle}</p>
            <p className="type-body max-w-[40ch] text-body">{formStates.success}</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              inline
                ? "flex flex-col gap-4 md:flex-row md:items-start"
                : "grid grid-cols-1 gap-x-gutter gap-y-5 md:grid-cols-2",
            )}
          >
            {config.fields.map((field) => (
              <div
                key={field.name}
                className={cn(inline ? "md:flex-1" : field.wide && "md:col-span-2")}
              >
                {field.kind === "files" ? (
                  <FileField
                    label={field.label}
                    hint={field.hint}
                    button={field.placeholder ?? field.label}
                    onChange={(files) => setValue("files", files)}
                    onBusyChange={setUploading}
                  />
                ) : (
                  <Field
                    field={field}
                    id={`${formId}-${field.name}`}
                    error={errorOf(field.name)}
                    register={register}
                  />
                )}
              </div>
            ))}

            <div
              className={cn(
                "flex flex-col gap-3",
                !inline && "md:col-span-2",
                inline && "md:pt-[1.9rem]",
              )}
            >
              {status === "error" && (
                <p role="alert" className="type-small text-danger">
                  {formStates.error}
                </p>
              )}
              <div ref={turnstileRef} />
              <Button
                type="submit"
                disabled={isSubmitting || uploading}
                icon={isSubmitting ? null : "arrow"}
                block
                className="md:w-fit"
              >
                {isSubmitting ? formStates.sending : config.submit}
              </Button>
              {!inline && <p className="type-small text-muted">{formStates.spamNote}</p>}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  field,
  id,
  error,
  register,
}: {
  field: FieldDef;
  id: string;
  error?: string;
  register: ReturnType<typeof useForm<FieldValues>>["register"];
}) {
  const errorId = `${id}-error`;
  const aria = {
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    "aria-required": field.required || undefined,
  };

  const label = (
    <>
      {field.label}
      {field.required ? (
        <span className="text-brand" aria-hidden="true">
          {" "}
          *
        </span>
      ) : (
        <span className="text-muted"> ({formStates.optional.toLowerCase()})</span>
      )}
    </>
  );

  const errorText = error && (
    <p id={errorId} className="mt-2 type-small text-danger">
      {error}
    </p>
  );

  if (field.kind === "chips") {
    return (
      <fieldset {...aria}>
        <legend className="mb-3 type-small text-ink">{label}</legend>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => (
            <label key={option} className="relative">
              <input
                type="radio"
                value={option}
                className="peer sr-only"
                {...register(field.name)}
              />
              <span className="inline-flex min-h-11 cursor-pointer items-center rounded-full border border-control px-4 type-small text-ink transition-colors duration-300 ease-heal peer-checked:border-ink peer-checked:bg-ink peer-checked:text-canvas peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus hover:border-ink">
                {option}
              </span>
            </label>
          ))}
        </div>
        {errorText}
      </fieldset>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="type-small text-ink">
        {label}
      </label>
      {field.kind === "textarea" ? (
        <textarea
          id={id}
          rows={5}
          placeholder={field.placeholder}
          className={cn(control, "min-h-36 resize-y py-3")}
          {...aria}
          {...register(field.name)}
        />
      ) : field.kind === "select" ? (
        <div className="relative">
          <select
            id={id}
            defaultValue=""
            className={cn(control, "min-h-12 appearance-none pr-10")}
            {...aria}
            {...register(field.name)}
          >
            <option value="">{formStates.optional}</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <Icon
            name="arrow-down"
            className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
          />
        </div>
      ) : (
        <input
          id={id}
          type={field.kind}
          autoComplete={field.autoComplete}
          placeholder={field.placeholder}
          inputMode={field.kind === "tel" ? "tel" : field.kind === "email" ? "email" : undefined}
          className={cn(control, "min-h-12")}
          {...aria}
          {...register(field.name)}
        />
      )}
      {errorText}
    </div>
  );
}
