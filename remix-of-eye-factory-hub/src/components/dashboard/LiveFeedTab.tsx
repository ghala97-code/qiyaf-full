import React, { useState, useMemo, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { AlertTriangle, CheckCircle, Video, Clock, Filter, Sparkles, FileText, MessageSquare } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import detectionResult1 from '@/assets/detection-result-1.jpg';
const solarDusty = detectionResult1;
const solarCracked = detectionResult1;
const solarClean = detectionResult1;
const solarSnow = detectionResult1;
const solarBirdDroppings = detectionResult1;

// Premium card styles — reusable
const cardBase =
  'relative rounded-[22px] border border-[rgba(120,150,180,0.14)] bg-[linear-gradient(180deg,#0D1521_0%,#080E17_100%)] shadow-[0_18px_45px_rgba(0,0,0,0.35),0_0_60px_rgba(0,180,255,0.04)]';

const LiveFeedTab = () => {
  const { t } = useLanguage();
  const alertsSectionRef = useRef<HTMLDivElement>(null);

  const alerts = [
    {
      id: 'SP-001',
      type: 'cracks',
      image: solarCracked,
      time: '10:32 AM',
      healthScore: 35,
      label: t.cracks,
      description: 'Visible surface cracks or fractures detected on the panel glass.',
      tagBg: 'bg-[#FF5B5B]/12 text-[#FF5B5B] border-[#FF5B5B]/30',
      boxColor: 'border-[#FF5B5B]',
      glow: 'shadow-[0_0_18px_rgba(255,91,91,0.35)]',
      isDefective: true,
      boxPosition: { top: '35%', left: '30%', width: '40%', height: '30%' },
    },
    {
      id: 'SP-002',
      type: 'snowCoverage',
      image: solarSnow,
      time: '10:25 AM',
      healthScore: 40,
      label: t.snowCoverage,
      description: 'Accumulation of snow on the panel surface blocking sunlight.',
      tagBg: 'bg-[#1DEBFF]/10 text-[#1DEBFF] border-[#1DEBFF]/30',
      boxColor: 'border-[#1DEBFF]',
      glow: 'shadow-[0_0_18px_rgba(29,235,255,0.3)]',
      isDefective: true,
      boxPosition: { top: '60%', left: '20%', width: '60%', height: '30%' },
    },
    {
      id: 'SP-003',
      type: 'birdDroppings',
      image: solarBirdDroppings,
      time: '10:20 AM',
      healthScore: 60,
      label: t.birdDroppings,
      description: 'Bird droppings on the panel surface reducing light absorption.',
      tagBg: 'bg-[#F7B52C]/12 text-[#F7B52C] border-[#F7B52C]/30',
      boxColor: 'border-[#F7B52C]',
      glow: 'shadow-[0_0_18px_rgba(247,181,44,0.3)]',
      isDefective: true,
      boxPosition: { top: '35%', left: '35%', width: '35%', height: '35%' },
    },
    {
      id: 'SP-004',
      type: 'dust',
      image: solarDusty,
      time: '10:15 AM',
      healthScore: 72,
      label: t.dust,
      description: 'Dust accumulation on the panel surface reducing efficiency.',
      tagBg: 'bg-[#F7B52C]/12 text-[#F7B52C] border-[#F7B52C]/30',
      boxColor: 'border-[#F7B52C]',
      glow: 'shadow-[0_0_18px_rgba(247,181,44,0.3)]',
      isDefective: true,
      boxPosition: { top: '20%', left: '25%', width: '50%', height: '40%' },
    },
    {
      id: 'SP-005',
      type: 'clean',
      image: solarClean,
      time: '10:05 AM',
      healthScore: 98,
      label: t.clean,
      description: 'Panel surface is clean and in optimal condition.',
      tagBg: 'bg-[#2CE5A7]/12 text-[#2CE5A7] border-[#2CE5A7]/30',
      boxColor: 'border-[#2CE5A7]',
      glow: 'shadow-[0_0_18px_rgba(44,229,167,0.3)]',
      isDefective: false,
      boxPosition: null,
    },
  ];

  const detectionTypes = [
    { key: 'cracks', label: 'Cracks', dot: 'bg-[#FF5B5B] shadow-[0_0_8px_rgba(255,91,91,0.7)]' },
    { key: 'snowCoverage', label: 'Snow', dot: 'bg-[#1DEBFF] shadow-[0_0_8px_rgba(29,235,255,0.7)]' },
    { key: 'dust', label: 'Dust', dot: 'bg-[#F7B52C] shadow-[0_0_8px_rgba(247,181,44,0.7)]' },
    { key: 'birdDroppings', label: 'Bird Droppings', dot: 'bg-[#D4A857] shadow-[0_0_8px_rgba(212,168,87,0.7)]' },
    { key: 'clean', label: 'Clean', dot: 'bg-[#2CE5A7] shadow-[0_0_8px_rgba(44,229,167,0.7)]' },
  ];

  const [selectedAlert, setSelectedAlert] = useState(alerts[0]);
  const [filterType, setFilterType] = useState<string | null>(null);

  const filteredAlerts = useMemo(() => {
    if (!filterType) return alerts;
    return alerts.filter((a) => a.type === filterType);
  }, [filterType]);

  const typeCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    detectionTypes.forEach((dt) => {
      counts[dt.key] = alerts.filter((a) => a.type === dt.key).length;
    });
    return counts;
  }, []);


  return (
    <div
      className="space-y-8 p-1 -m-1"
      style={{
        // Subtle ambient background — radial vignette + soft cyan bloom
        backgroundImage:
          'radial-gradient(1200px 600px at 12% -10%, rgba(0,180,255,0.06), transparent 60%), radial-gradient(900px 500px at 95% 110%, rgba(29,235,255,0.04), transparent 60%), radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)',
      }}
    >
      {/* Top: Image preview + Right column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LIVE CAMERA PANEL */}
        <div className="lg:col-span-2">
          <div className={`${cardBase} overflow-hidden`}>
            {/* Header strip */}
            <div className="flex items-center justify-between px-7 pt-5 pb-3">
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 text-[#1DEBFF]" />
                <h3 className="text-sm font-semibold text-white tracking-wide">Live Camera Feed</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#FF5B5B]/12 text-[#FF5B5B] border border-[#FF5B5B]/30">
                  {selectedAlert.isDefective ? 'Defective Panel' : 'Passed Panel'}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-[#2CE5A7]/10 text-[#2CE5A7] border border-[#2CE5A7]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2CE5A7] animate-pulse shadow-[0_0_6px_rgba(44,229,167,0.9)]" />
                  Live
                </span>
              </div>
            </div>

            {/* Image with cinematic darken */}
            <div className="relative mx-5 rounded-[18px] overflow-hidden border border-[rgba(29,235,255,0.10)] shadow-[inset_0_0_60px_rgba(0,0,0,0.55)]">
              <img
                src={selectedAlert.image}
                alt={`Solar Panel ${selectedAlert.id}`}
                className="w-full h-80 object-contain bg-black"
                style={{ filter: 'brightness(0.9) contrast(1.05) saturate(0.98)' }}
              />
              {/* vignette overlay */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.45)_100%)]" />

              <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-medium bg-black/55 text-white/85 border border-white/10 backdrop-blur-sm">
                Camera: Front · RGB
              </div>
            </div>
            <div className="h-7" />
          </div>
        </div>

        {/* RIGHT COLUMN — Camera Online → Detection Summary → AI Assistant */}
        <div className="space-y-[18px] flex flex-col">
          {/* Combined: Camera Online + Detection Summary in one card */}
          <div className={`${cardBase} p-7`}>
            {/* Camera Online section */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <Video className="w-4 h-4 text-[#1DEBFF]" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#2CE5A7] ring-2 ring-[#0B111C] animate-pulse" />
                </div>
                <span className="text-sm font-semibold text-white">Camera Online</span>
              </div>
              <span className="text-[10px] uppercase tracking-wider text-[#2CE5A7] font-semibold">Live</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-[rgba(120,150,180,0.10)] bg-[#0B111C]/70 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/40">Active</p>
                <p className="text-2xl font-semibold text-white mt-1 leading-none">
                  28 <span className="text-sm text-white/40 font-normal">/ 32</span>
                </p>
              </div>
              <div className="rounded-xl border border-[rgba(120,150,180,0.10)] bg-[#0B111C]/70 px-4 py-3">
                <p className="text-[10px] uppercase tracking-wider text-white/40 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Uptime
                </p>
                <p className="text-2xl font-semibold text-white mt-1 leading-none">2h 34m</p>
              </div>
            </div>

            {/* Divider */}
            <div className="my-6 h-px bg-[rgba(120,150,180,0.12)]" />

            {/* Detection Summary section */}
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center border border-[#1DEBFF]/30 bg-[#1DEBFF]/[0.06]">
                <Filter className="w-3.5 h-3.5 text-[#1DEBFF]" />
              </div>
              <h3 className="text-sm font-semibold text-white">Detection Summary</h3>
            </div>

            <div className="grid grid-cols-4 divide-x divide-[rgba(120,150,180,0.12)] rounded-xl border border-[rgba(120,150,180,0.10)] bg-[#0B111C]/70">
              {[
                { label: t.serialNumber, value: selectedAlert.id, color: 'text-white' },
                { label: t.inspectionTime, value: selectedAlert.time, color: 'text-white' },
                {
                  label: t.healthScore,
                  value: `${selectedAlert.healthScore}%`,
                  color: 'text-[#FF5B5B]',
                },
                {
                  label: t.defectiveType,
                  value: selectedAlert.label,
                  color: selectedAlert.isDefective ? 'text-[#FF5B5B]' : 'text-[#2CE5A7]',
                },
              ].map((s) => (
                <div key={s.label} className="px-2 py-2 text-center flex flex-col items-center justify-center gap-1">
                  <p className="text-[9px] uppercase tracking-wider text-white/40 leading-tight">{s.label}</p>
                  <p className={`text-xs font-semibold ${s.color} leading-tight`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant card */}
          <div className={`${cardBase} p-7`}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#1DEBFF]/10 border border-[#1DEBFF]/25 shadow-[0_0_18px_rgba(29,235,255,0.18)]">
                <Sparkles className="w-4 h-4 text-[#1DEBFF]" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white leading-tight">AI Assistant</h4>
                <p className="text-[11px] text-white/50 leading-tight mt-0.5">
                  Ask AI for insights and reporting
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <button className="flex items-center justify-center gap-2 h-11 rounded-[14px] border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-[#1DEBFF]/30 transition-all text-sm font-medium text-white/85">
                <FileText className="w-4 h-4" />
                Report
              </button>
              <button className="flex items-center justify-center gap-2 h-11 rounded-[14px] text-sm font-semibold text-[#06141c] bg-[linear-gradient(90deg,#2BE4FF_0%,#42E7B8_50%,#F6B326_100%)] shadow-[0_0_22px_rgba(29,235,255,0.35)] hover:shadow-[0_0_30px_rgba(44,229,167,0.5)] hover:brightness-110 transition-all">
                <MessageSquare className="w-4 h-4" />
                Ask AI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER BAR + Real-time Alerts */}
      <div ref={alertsSectionRef} className="space-y-5 scroll-mt-6">
        <div className="flex items-center gap-4 flex-wrap px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF5B5B] animate-pulse shadow-[0_0_8px_rgba(255,91,91,0.8)]" />
            <h2 className="text-base font-semibold text-white tracking-wide">{t.realTimeAlerts}</h2>
          </div>
          <Select
            value={filterType ?? 'all'}
            onValueChange={(v) => setFilterType(v === 'all' ? null : v)}
          >
            <SelectTrigger className="w-[220px] h-10 rounded-xl border border-[rgba(120,150,180,0.18)] bg-[linear-gradient(180deg,#0D1521_0%,#080E17_100%)] text-white/85 text-sm focus:ring-0 focus:ring-offset-0 hover:border-[#1DEBFF]/30">
              <div className="flex items-center gap-2">
                <Filter className="w-3.5 h-3.5 text-[#1DEBFF]" />
                <SelectValue placeholder="Filter by Defect Type" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-[#0B111C] border border-[rgba(120,150,180,0.18)] text-white/85">
              <SelectItem value="all">All Defect Types</SelectItem>
              <SelectItem value="cracks">Crack</SelectItem>
              <SelectItem value="snowCoverage">Snow</SelectItem>
              <SelectItem value="dust">Dust</SelectItem>
              <SelectItem value="birdDroppings">Bird Droppings</SelectItem>
              <SelectItem value="clean">Clean</SelectItem>
              <SelectItem value="others">Others</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {filteredAlerts.length === 0 ? (
          <div className={`${cardBase} p-10 text-center text-white/50`}>
            No alerts found for this category.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAlerts.map((alert) => {
              const isSelected = selectedAlert.id === alert.id;
              return (
                <div
                  key={alert.id}
                  onClick={() => setSelectedAlert(alert)}
                  className={`${cardBase} p-4 cursor-pointer transition-all hover:-translate-y-0.5 ${
                    isSelected
                      ? 'border-[#1DEBFF]/40 shadow-[0_18px_45px_rgba(0,0,0,0.35),0_0_30px_rgba(29,235,255,0.18)]'
                      : 'hover:border-[#1DEBFF]/25'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg border ${alert.tagBg}`}>
                      {alert.isDefective ? (
                        <AlertTriangle className="w-4 h-4" />
                      ) : (
                        <CheckCircle className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white">{alert.id}</p>
                      <p className="text-[11px] text-white/45">{alert.time}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-semibold border ${alert.tagBg} whitespace-nowrap`}>
                      {alert.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveFeedTab;
