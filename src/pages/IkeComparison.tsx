
import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const FORMAT = (n: number) => new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN", maximumFractionDigits: 0 }).format(n);
const FORMAT_SHORT = (n: number) => {
  if (n >= 1e6) return (n/1e6).toFixed(2).replace(".",",") + " mln zł";
  return (n/1e3).toFixed(0) + " tys. zł";
};

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; color: string; value: number }[]; label?: number }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, padding: "10px 14px", fontSize: 13 }}>
      <p style={{ color: "#94a3b8", margin: "0 0 6px" }}>Rok {label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color, margin: "2px 0" }}>
          {p.name.replace("_", " ")}: <strong>{FORMAT(p.value)}</strong>
        </p>
      ))}
    </div>
  );
}

export default function IkeComparison() {
  const [grossReturn, setGrossReturn] = useState(7);
  const [years, setYears] = useState(32);
  const annualContrib = 28260;
  const costGenerali = 1.75;
  const costETF = 0.23;

  const data = useMemo(() => {
    const rows = [];
    let genVal = 0, etfVal = 0, contributed = 0;
    const rGen = (grossReturn - costGenerali) / 100;
    const rEtf = (grossReturn - costETF) / 100;
    for (let y = 1; y <= years; y++) {
      genVal = (genVal + annualContrib) * (1 + rGen);
      etfVal = (etfVal + annualContrib) * (1 + rEtf);
      contributed += annualContrib;
      rows.push({ rok: y, Generali: Math.round(genVal), ETF_mBank: Math.round(etfVal), Wpłaty: Math.round(contributed) });
    }
    return rows;
  }, [grossReturn, years]);

  const final = data[data.length - 1];
  const diff = final.ETF_mBank - final.Generali;
  const totalContrib = annualContrib * years;

  return (
    <div style={{ background: "#0f172a", minHeight: "100vh", color: "#f1f5f9", fontFamily: "system-ui, sans-serif", padding: "24px 20px" }}>
      <h2 style={{ textAlign: "center", color: "#f1f5f9", marginBottom: 4, fontSize: 18 }}>
        IKE: Generali TFI vs ETF w mBanku
      </h2>
      <p style={{ textAlign: "center", color: "#94a3b8", fontSize: 13, marginBottom: 24 }}>
        Wpłata: <strong style={{color:"#f1f5f9"}}>28 260 zł/rok</strong> przez <strong style={{color:"#f1f5f9"}}>32 lata</strong> · Łącznie wpłacone: <strong style={{color:"#f1f5f9"}}>{FORMAT(totalContrib)}</strong>
      </p>

      {/* Slider */}
      <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px 20px", marginBottom: 24, maxWidth: 500, margin: "0 auto 24px", display: "flex", flexDirection: "column", gap: 16 }}>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>Zakładana stopa zwrotu rynku (brutto)</span>
            <span style={{ color: "#60a5fa", fontWeight: 700, fontSize: 16 }}>{grossReturn}% rocznie</span>
          </div>
          <input type="range" min={4} max={10} step={0.5} value={grossReturn}
            onChange={e => setGrossReturn(parseFloat(e.target.value))}
            style={{ width: "100%", accentColor: "#60a5fa" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginTop: 4 }}>
            <span>4% (konserwatywnie)</span><span>7% (historyczna średnia)</span><span>10% (optymistycznie)</span>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ color: "#94a3b8", fontSize: 13 }}>Liczba lat wpłat</span>
            <span style={{ color: "#a78bfa", fontWeight: 700, fontSize: 16 }}>{years} lat</span>
          </div>
          <input type="range" min={5} max={45} step={1} value={years}
            onChange={e => setYears(parseInt(e.target.value))}
            style={{ width: "100%", accentColor: "#a78bfa" }} />
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#64748b", marginTop: 4 }}>
            <span>5 lat</span><span>25 lat</span><span>45 lat</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 28, maxWidth: 700, margin: "0 auto 28px" }}>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", textAlign: "center", border: "1px solid #ef444433" }}>
          <div style={{ color: "#ef4444", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Generali TFI</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fca5a5" }}>{FORMAT_SHORT(final.Generali)}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>koszt: {costGenerali}%/rok</div>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", textAlign: "center", border: "1px solid #22c55e33" }}>
          <div style={{ color: "#22c55e", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>ETF mBank</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#86efac" }}>{FORMAT_SHORT(final.ETF_mBank)}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>koszt: {costETF}%/rok</div>
        </div>
        <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px", textAlign: "center", border: "1px solid #f59e0b33" }}>
          <div style={{ color: "#f59e0b", fontSize: 11, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Różnica</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#fcd34d" }}>{FORMAT_SHORT(diff)}</div>
          <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>więcej w mBanku</div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ background: "#1e293b", borderRadius: 12, padding: "20px 8px 12px", marginBottom: 24 }}>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colEtf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colGen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colWpl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#64748b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="rok" stroke="#64748b" fontSize={11} tickFormatter={v => `${v}r`} />
            <YAxis stroke="#64748b" fontSize={11} tickFormatter={v => v >= 1e6 ? `${(v/1e6).toFixed(1)}M` : `${(v/1000).toFixed(0)}k`} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: "#94a3b8" }} formatter={n => n.replace("_", " ")} />
            <Area type="monotone" dataKey="Wpłaty" stroke="#64748b" fill="url(#colWpl)" strokeWidth={1.5} strokeDasharray="4 4" />
            <Area type="monotone" dataKey="Generali" stroke="#ef4444" fill="url(#colGen)" strokeWidth={2} />
            <Area type="monotone" dataKey="ETF_mBank" stroke="#22c55e" fill="url(#colEtf)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown */}
      <div style={{ background: "#1e293b", borderRadius: 12, padding: "16px 20px", maxWidth: 700, margin: "0 auto" }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", marginBottom: 12 }}>Założenia kalkulacji</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, fontSize: 13 }}>
          {[
            ["Stopa zwrotu rynku (brutto)", `${grossReturn}% rocznie`],
            ["Koszty Generali (szacunek)", `${costGenerali}% rocznie`],
            ["Koszty ETF mBank", `${costETF}% rocznie`],
            ["Netto Generali", `${(grossReturn - costGenerali).toFixed(2)}% rocznie`],
            ["Netto ETF mBank", `${(grossReturn - costETF).toFixed(2)}% rocznie`],
            ["Łącznie wpłacone", FORMAT(totalContrib)],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #334155", paddingBottom: 6 }}>
              <span style={{ color: "#64748b" }}>{k}</span>
              <span style={{ color: "#f1f5f9", fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>
        <p style={{ color: "#64748b", fontSize: 11, marginTop: 12, lineHeight: 1.5 }}>
          ⚠️ Kalkulator ma charakter edukacyjny. Rzeczywiste wyniki zależą od zmienności rynku, wahań kursów i przyszłych kosztów. Przeszłe wyniki nie gwarantują przyszłych.
        </p>
      </div>
    </div>
  );
}
