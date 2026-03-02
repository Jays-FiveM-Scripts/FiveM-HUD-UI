import React from "react";

function KeysContainer() {
  const KeyRow = ({ keyChar, label }) => (
    <div className="w-full flex items-center gap-4">
      {/* keycap */}
      <div
        className={[
          "w-9 h-9",
          "rounded-xl",
          "bg-zinc-900/70",
          "ring-1 ring-white/10",
          // "backdrop-blur-md",
          "shadow-[0_10px_24px_rgba(0,0,0,0.35)]",
          "flex items-center justify-center",
        ].join(" ")}
      >
        <span className="text-sm font-extrabold tracking-widest text-zinc-100">
          {keyChar}
        </span>
      </div>

      {/* label */}
      <div className="flex flex-col leading-tight text-left">
        <span className="text-sm font-semibold text-zinc-100/90">{label}</span>
      </div>

      {/* tiny divider line (optional) */}
      {/* <div className="ml-auto h-[1px] w-16 bg-white/10" /> */}
    </div>
  );

  return (
    <div
      id="keys_container"
      className="w-full px-3 mt-60 flex flex-col items-center gap-3"
    >
      {/* panel */}
      <div
        className={[
          "w-full max-w-[18rem]",
          //   "rounded-2xl",
          //   "bg-zinc-950/35",
          //   "ring-1 ring-white/10",
          //   "backdrop-blur-md",
          //   "shadow-[0_12px_30px_rgba(0,0,0,0.45)]",
          "p-3",
          "flex flex-col gap-3",
        ].join(" ")}
      >
        <span className="text-[0.62rem] text-left uppercase tracking-[0.18em] text-zinc-200/60">
          Key Bindings
        </span>
        <KeyRow keyChar="M" label="Phone" />
        <KeyRow keyChar="I" label="Inventory" />
      </div>
    </div>
  );
}

export default KeysContainer;
