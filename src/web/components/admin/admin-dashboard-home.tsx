import type { AdminSessionViewModel } from "@/types/admin";

interface AdminDashboardHomeProps {
  session: AdminSessionViewModel;
}

export function AdminDashboardHome({ session }: AdminDashboardHomeProps) {
  return (
    <div className="grid gap-6" data-testid="admin-dashboard-home">
      <section className="admin-shell-panel rounded-[2rem] border border-[color:var(--admin-border)] bg-[color:var(--admin-panel)] p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[color:var(--brand-orange)]">
          Welkom
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[color:var(--admin-ink-strong)]">
          Hallo {session.displayName}, het portaal staat klaar.
        </h2>
        <p
          className="mt-4 max-w-2xl text-base leading-7 text-[color:var(--admin-ink-soft)]"
          data-testid="admin-dashboard-summary"
        >
          Dit is de eerste beheeromgeving. De authenticatiegrens, toegangscontrole en een
          uitbreidbare dashboard-structuur staan nu centraal, zodat latere modules zonder nieuwe
          layout-omslag kunnen aansluiten.
        </p>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_0.9fr]">
        <article className="admin-shell-panel rounded-[2rem] border border-[color:var(--admin-border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,245,234,0.96))] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-orange)]">
                Dummy module
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-[color:var(--admin-ink-strong)]">
                Eerste beheerkaart
              </h3>
            </div>
            <span className="rounded-full border border-[color:var(--admin-border)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[color:var(--admin-ink-soft)]">
              placeholder
            </span>
          </div>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--admin-ink-soft)]">
            Gebruik dit vlak als startpunt voor voorraad-, content- of openingstijdenbeheer. De
            shell is bewust licht gehouden zodat de eerste echte module hier zonder route- of
            layoutwijziging kan landen.
          </p>
        </article>

        <article className="admin-shell-panel rounded-[2rem] border border-[color:var(--admin-border)] bg-[color:var(--admin-panel)] p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--brand-orange)]">
            Volgende stap
          </p>
          <ul className="mt-4 grid gap-3 text-sm leading-6 text-[color:var(--admin-ink-soft)]">
            <li>Nieuwe navigatie-items kunnen onder dezelfde `/admin` layout landen.</li>
            <li>De allowlist kan later naar een persistente opslag verhuizen.</li>
            <li>De huidige pagina blijft functioneel op mobiel en desktop.</li>
          </ul>
        </article>
      </section>
    </div>
  );
}
