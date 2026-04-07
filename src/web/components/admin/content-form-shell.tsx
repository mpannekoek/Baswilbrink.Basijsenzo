interface ContentFormShellProps {
  children: React.ReactNode;
  description: string;
  eyebrow: string;
  title: string;
}

export function ContentFormShell({
  children,
  description,
  eyebrow,
  title,
}: ContentFormShellProps) {
  return (
    <section
      className="admin-shell-panel max-w-5xl border border-[color:var(--admin-card-border)] bg-[color:var(--admin-card-bg)] p-6 sm:p-8"
      data-testid="admin-content-form-shell"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-black/46">{eyebrow}</p>
      <h1 className="display-font mt-3 text-4xl leading-none text-[color:var(--admin-ink-strong)]">
        {title}
      </h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-[color:var(--admin-ink-soft)]">
        {description}
      </p>

      <div className="mt-8">{children}</div>
    </section>
  );
}
