import type { InnsjekkStatus } from "@/lib/status";

const STATUS_TEKST: Record<InnsjekkStatus, string> = {
  GRONN: "Innsjekket i dag",
  GUL: "Ikke sjekket inn ennå",
  ROD: "Ikke sjekket inn — fristen er passert",
};

const STATUS_KLASSE: Record<InnsjekkStatus, string> = {
  GRONN: "bg-status-gronn-bg text-status-gronn-tekst",
  GUL: "bg-status-amber-bg text-status-amber-tekst",
  ROD: "bg-status-rod-bg text-status-rod-tekst",
};

const STATUS_PRIKK: Record<InnsjekkStatus, string> = {
  GRONN: "bg-status-gronn-tekst",
  GUL: "bg-status-amber-tekst",
  ROD: "bg-status-rod-tekst",
};

export default function StatusLys({
  navn,
  status,
}: {
  navn: string;
  status: InnsjekkStatus;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl px-5 py-4 ${STATUS_KLASSE[status]}`}
    >
      <span
        aria-hidden
        className={`h-4 w-4 flex-shrink-0 rounded-full ${STATUS_PRIKK[status]}`}
      />
      <div>
        <p className="font-semibold">{navn}</p>
        <p className="text-sm">{STATUS_TEKST[status]}</p>
      </div>
    </div>
  );
}
