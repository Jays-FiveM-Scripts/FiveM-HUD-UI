import { FaPerson } from "react-icons/fa6";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import { FaServer, FaOrcid } from "react-icons/fa";
import { BsBank } from "react-icons/bs";
import { GiBanknote } from "react-icons/gi";
import { useEffect, useState } from "react";

function RightContainer() {
  const [time, setTime] = useState("00:00");
  const [players, setPlayers] = useState("0 / 0");
  const [serverId, setServerId] = useState("0");
  const [permId, setPermId] = useState("0");
  const [cash, setCash] = useState("£0");
  const [bank, setBank] = useState("£0");

  useEffect(() => {
  const onMessage = (event) => {
    const d = event.data || {};
    if (d.type !== "right:update") return;

    setTime(d.time)
    setPlayers(d.players)
    setServerId(d.serverId)
    setPermId(d.permId)
    setCash(d.cash)
    setBank(d.bank)
  };

  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}, []);

  const StatPill = ({ id, icon, value }) => (
    <div
      id={id}
      className={[
        "w-[6.6rem] h-9",
        "rounded-full",
        "bg-zinc-900/70",
        "ring-1 ring-white/10",
        // "backdrop-blur-md",
        "shadow-[0_8px_22px_rgba(0,0,0,0.35)]",
        "flex items-center gap-2 px-2.5",
      ].join(" ")}
    >
      <div
        className={[
          "w-7 h-7 rounded-full",
          "bg-zinc-700/60",
          "ring-1 ring-white/10",
          "flex items-center justify-center",
          "text-zinc-100",
        ].join(" ")}
      >
        {icon}
      </div>
      <div className="text-[0.72rem] font-semibold tracking-wide text-zinc-100/90">
        {value}
      </div>
    </div>
  );

  const MoneyCard = ({ id, icon, title, value }) => (
    <div
      id={id}
      className={[
        "w-[11.5rem]",
        "rounded-2xl",
        "bg-zinc-900/70",
        "ring-1 ring-white/10",
        // "backdrop-blur-md",
        "shadow-[0_10px_28px_rgba(0,0,0,0.4)]",
        "px-3 py-2.5 text-left",
        "flex items-center gap-3",
      ].join(" ")}
    >
      <div
        className={[
          "w-9 h-9 rounded-xl",
          "bg-zinc-700/60",
          "ring-1 ring-white/10",
          "flex items-center justify-center",
          "text-zinc-100",
        ].join(" ")}
      >
        {/* normalize icon sizing */}
        <span className="text-[1.15rem] leading-none">{icon}</span>
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-[0.62rem] uppercase tracking-[0.18em] text-zinc-200/60">
          {title}
        </span>
        <span className="text-sm font-semibold text-zinc-100/95">{value}</span>
      </div>
    </div>
  );

  return (
    <div className="p-5 flex flex-col items-end justify-between">
      <div className="flex items-end justify-end flex-col gap-4">
        {/* top pills row */}
        <div className="flex flex-row gap-3 w-[27rem] text-xs justify-end">
          <StatPill
            id="time"
            icon={<MdOutlineAccessTimeFilled className="text-[1.05rem]" />}
            value={time}
          />
          <StatPill
            id="players_online"
            icon={<FaPerson className="text-[0.95rem]" />}
            value={players}
          />
          <StatPill
            id="server_id"
            icon={<FaServer className="text-[0.95rem]" />}
            value={serverId}
          />
          <StatPill
            id="perm_id"
            icon={<FaOrcid className="text-[0.95rem]" />}
            value={permId}
          />
        </div>

        {/* money cards */}
        <MoneyCard id="cash" icon={<GiBanknote />} title="Cash" value={cash} />
        <MoneyCard id="bank" icon={<BsBank />} title="Bank" value={bank} />
      </div>
    </div>
  );
}

export default RightContainer;