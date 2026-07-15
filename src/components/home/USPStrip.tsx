import { usps } from "@/data/site";
import { ClockIcon, LockIcon, ShieldIcon, TruckIcon } from "@/components/ui/Icons";

const icons = {
  truck: TruckIcon,
  shield: ShieldIcon,
  lock: LockIcon,
  clock: ClockIcon,
} as const;

export default function USPStrip() {
  return (
    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
      {usps.map((u) => {
        const Icon = icons[u.icon as keyof typeof icons];
        return (
          <div key={u.title} className="flex flex-col items-center gap-3 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold-500/10 text-gold-600 ring-1 ring-gold-500/30">
              <Icon size={24} />
            </span>
            <div>
              <h3 className="font-semibold text-ink-950">{u.title}</h3>
              <p className="mt-1 text-sm text-ink-500">{u.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
