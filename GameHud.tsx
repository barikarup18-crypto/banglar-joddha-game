import React from 'react';

interface GameHudProps {
  playerName?: string;
  level?: number;
  hp?: number;
  maxHp?: number;
  coins?: number;
  diamonds?: number;
  cameraMode?: 'third-person' | 'follow';
  onToggleCamera?: () => void;
}

export const GameHud: React.FC<GameHudProps> = ({
  playerName = 'ভানু',
  level = 1,
  hp = 100,
  maxHp = 100,
  coins = 2950,
  diamonds = 120,
  cameraMode = 'third-person',
  onToggleCamera,
}) => {
  const hpPercent = Math.max(0, Math.min(100, (hp / maxHp) * 100));

  return (
    <div className="pointer-events-none fixed inset-0 z-20 flex flex-col justify-between p-3 select-none">
      {/* Top Pill HUD */}
      <div className="flex items-center justify-between gap-2">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/75 px-4 py-2 text-white shadow-lg backdrop-blur-md border border-white/15">
          <div className="flex flex-col">
            <span className="text-xs font-bold text-amber-300">
              {playerName} • LV {level}
            </span>
            <div className="mt-1 h-2 w-28 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all duration-200"
                style={{ width: `${hpPercent}%` }}
              />
            </div>
          </div>
          <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold">
            HP {Math.ceil(hp)}/{maxHp}
          </span>
        </div>

        <div className="pointer-events-auto flex items-center gap-2">
          <div className="rounded-full bg-black/75 px-3.5 py-1.5 text-xs font-bold text-amber-300 border border-white/15 backdrop-blur-md">
            🪙 {coins}
          </div>
          <div className="rounded-full bg-black/75 px-3.5 py-1.5 text-xs font-bold text-cyan-300 border border-white/15 backdrop-blur-md">
            💎 {diamonds}
          </div>
          {onToggleCamera && (
            <button
              type="button"
              onClick={onToggleCamera}
              className="rounded-full bg-amber-500/90 px-3.5 py-1.5 text-xs font-bold text-slate-950 shadow active:scale-95"
            >
              ক্যামেরা: {cameraMode === 'third-person' ? '3rd Person' : 'Follow'}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Pill Status Bar */}
      <div className="flex items-center justify-center">
        <div className="rounded-full bg-black/70 px-5 py-1.5 text-[11px] font-medium text-white/85 border border-white/10 backdrop-blur-md">
          বাংলার যোদ্ধা • থার্ড-পার্সন ভিউ সক্রিয়
        </div>
      </div>
    </div>
  );
};

export default GameHud;
