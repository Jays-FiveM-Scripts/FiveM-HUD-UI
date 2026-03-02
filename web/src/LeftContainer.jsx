import React, { useState, useEffect } from "react";
import { GiKevlarVest, GiHamburger } from "react-icons/gi";
import { FaHeartbeat } from "react-icons/fa";
import { RiDrinks2Fill } from "react-icons/ri";
import KeysContainer from "./KeysContainer";

// Grey theme (neutral glass) with subtle tinted fill per stat
const STAT_STYLES = {
  health: {
    ring: "ring-zinc-200/15",
    baseBg: "bg-zinc-900/70",
    fillBg: "bg-red-500/35",
    text: "text-zinc-100/90",
  },
  armour: {
    ring: "ring-zinc-200/15",
    baseBg: "bg-zinc-900/70",
    fillBg: "bg-sky-500/35",
    text: "text-zinc-100/90",
  },
  hunger: {
    ring: "ring-zinc-200/15",
    baseBg: "bg-zinc-900/70",
    fillBg: "bg-amber-500/35",
    text: "text-zinc-100/90",
  },
  thirst: {
    ring: "ring-zinc-200/15",
    baseBg: "bg-zinc-900/70",
    fillBg: "bg-emerald-500/35",
    text: "text-zinc-100/90",
  },
};

function clamp(n) {
  return Math.max(0, Math.min(100, Number(n) || 0));
}

function LeftContainer() {
  const [health, setHealth] = useState(0);
const [armour, setArmour] = useState(0);
const [hunger, setHunger] = useState(0);
const [thirst, setThirst] = useState(0);

useEffect(() => {
  const onMessage = (event) => {
    const payload = event?.data || {};
    const { type } = payload;

    // support both styles:
    // 1) { type: "healthUpdate", health: 50 }
    // 2) { type: "healthUpdate", data: { health: 50 } }
    // 3) { type: "hud:update", health: 50, armour: 20, hunger: 80, thirst: 70 }
    const d = payload.data || payload;

    if (type === "healthUpdate") setHealth(clamp(d.health));
    if (type === "armourUpdate") setArmour(clamp(d.armour));
    if (type === "hungerUpdate") setHunger(clamp(d.hunger));
    if (type === "thirstUpdate") setThirst(clamp(d.thirst));

    // bulk update (recommended from Lua)
    if (type === "hud:update") {
      if (d.health !== undefined) setHealth(clamp(d.health));
      if (d.armour !== undefined) setArmour(clamp(d.armour));
      if (d.hunger !== undefined) setHunger(clamp(d.hunger));
      if (d.thirst !== undefined) setThirst(clamp(d.thirst));
    }
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}, []);

  const getOpacity = (value) => ({
    opacity: Math.max(0.35, clamp(value) / 100), // never fully invisible
  });

  const getBlinkClass = (value) => (clamp(value) < 20 ? "blink" : "");

  const StatBubble = ({ type, value, icon }) => {
    const styles = STAT_STYLES[type];

    return (
      <div className="flex flex-col items-center gap-2">
        <div className="relative w-[2.75rem] h-[2.75rem] ">
          {/* outer glass ring */}
          <div
            className={[
              "absolute inset-0 rounded-full",
              "ring-2",
              styles.ring,
              "bg-zinc-950/35",
              // "backdrop-blur-md",
              "shadow-[0_10px_26px_rgba(0,0,0,0.45)]",
              "overflow-hidden",
            ].join(" ")}
          >
            {/* liquid fill (tinted, grey theme) */}
            <div
              className={[
                "absolute bottom-0 left-0 w-full",
                styles.fillBg,
                "transition-all duration-300 ease-out",
              ].join(" ")}
              style={{ height: `${clamp(value)}%` }}
            />

            {/* subtle gloss + vignette */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/12 to-transparent pointer-events-none" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            <div className="absolute inset-0 rounded-full shadow-[inset_0_0_18px_rgba(0,0,0,0.55)] pointer-events-none" />
          </div>

          {/* icon chip (grey) */}
          <div
            className={[
              "absolute inset-[0.25rem] rounded-full",
              styles.baseBg,
              "ring-1 ring-white/10",
              // "backdrop-blur-lg",
              "flex items-center justify-center",
              "text-zinc-100 text-[1.15rem]",
              "transition-transform duration-200",
              "hover:scale-[1.03]",
              getBlinkClass(value),
            ].join(" ")}
            style={getOpacity(value)}
            title={`${type}: ${clamp(value)}%`}
          >
            {icon}
          </div>
        </div>

        <div className={["text-xs font-semibold", styles.text, "drop-shadow"].join(" ")}>
          {clamp(value)}%
        </div>
      </div>
    );
  };

  return (
    <div id="left_container" className="flex flex-col items-center justify-between p-2">
      <KeysContainer />

      <div className="flex flex-col items-center gap-3">
        <img
          className="relative w-[17rem] rounded-[.3rem] ring-1 ring-white/10 mx-2 opacity-90 shadow-[0_10px_28px_rgba(0,0,0,0.35)]"
          src="./public/minimap2.png"
          alt=""
        />

        <div id="need_container" className=" flex w-full justify-around px-1">
          <StatBubble type="health" value={health} icon={<FaHeartbeat />} />
          <StatBubble type="armour" value={armour} icon={<GiKevlarVest />} />
          <StatBubble type="hunger" value={hunger} icon={<GiHamburger />} />
          <StatBubble type="thirst" value={thirst} icon={<RiDrinks2Fill />} />
        </div>
      </div>
    </div>
  );
}

export default LeftContainer;