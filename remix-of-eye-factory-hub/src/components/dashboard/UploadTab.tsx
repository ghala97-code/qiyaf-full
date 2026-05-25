import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Upload, Loader2, Zap, Snowflake, Lightbulb, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { predictInspection } from '@/lib/api';
import solarPanelImg from '@/assets/detection-result-2.jpg';

type Severity = 'critical' | 'warning' | 'normal';

interface Detection {
  id: string;
  label: 'Cracks' | 'Snow' | 'Dust' | 'Bird Droppings' | 'Clean';
  severity: Severity;
  box: { left: number; top: number; width: number; height: number };
}

type RecTone = 'red' | 'blue' | 'amber';

interface Recommendation {
  title: string;
  description: string;
  priority: 'High Priority' | 'Medium Priority' | 'Low Priority';
  cta: string;
  icon: React.ReactNode;
  tone: RecTone;
}

const recTones: Record<RecTone, { card: string; iconWrap: string; pill: string; button: string }> = {
  red: {
    card: 'border-red-500/40 bg-gradient-to-br from-red-950/40 via-[#1a0a10] to-[#0a0508] shadow-[0_0_25px_rgba(239,68,68,0.08)] hover:shadow-[0_0_30px_rgba(239,68,68,0.18)]',
    iconWrap: 'text-red-400',
    pill: 'bg-red-500/15 text-red-400 border-red-500/40',
    button: 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/40',
  },
  blue: {
    card: 'border-blue-500/40 bg-gradient-to-br from-blue-950/40 via-[#0a1424] to-[#05080f] shadow-[0_0_25px_rgba(59,130,246,0.08)] hover:shadow-[0_0_30px_rgba(59,130,246,0.18)]',
    iconWrap: 'text-blue-400',
    pill: 'bg-blue-500/15 text-blue-400 border-blue-500/40',
    button: 'bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/40',
  },
  amber: {
    card: 'border-amber-500/40 bg-gradient-to-br from-amber-950/30 via-[#1a1408] to-[#0a0805] shadow-[0_0_25px_rgba(251,191,36,0.08)] hover:shadow-[0_0_30px_rgba(251,191,36,0.18)]',
    iconWrap: 'text-amber-400',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
    button: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/40',
  },
};

interface RecentUpload {
  fileName: string;
  sector: string;
  uploadedAt: string;
  result: 'Cracks' | 'Snow' | 'Clean' | 'Dust' | 'Bird Droppings';
}

const severityStyles: Record<Severity, { dot: string; pill: string; border: string; label: string }> = {
  critical: {
    dot: 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]',
    pill: 'bg-red-500/15 text-red-400 border-red-500/30',
    border: 'border-red-500/70 shadow-[0_0_12px_rgba(239,68,68,0.5)]',
    label: 'Critical',
  },
  warning: {
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]',
    pill: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    border: 'border-amber-400/70 shadow-[0_0_12px_rgba(251,191,36,0.5)]',
    label: 'Warning',
  },
  normal: {
    dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]',
    pill: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
    border: 'border-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.5)]',
    label: 'Normal',
  },
};


const recommendations: Recommendation[] = [
  {
    title: 'Repair Cracked Panels',
    description: 'Surface cracks compromise the panel and should be inspected and replaced by a maintenance engineer.',
    priority: 'High Priority',
    cta: 'Dispatch Engineer',
    icon: <Zap className="w-5 h-5" />,
    tone: 'red',
  },
  {
    title: 'Clear Snow',
    description: 'Remove snow coverage from the panel surface to restore optimal sunlight exposure.',
    priority: 'Medium Priority',
    cta: 'Schedule Cleaning',
    icon: <Snowflake className="w-5 h-5" />,
    tone: 'blue',
  },
  {
    title: 'Clean Panels',
    description: 'Remove dust or bird droppings from the surface to improve efficiency.',
    priority: 'Medium Priority',
    cta: 'Schedule Cleaning',
    icon: <Lightbulb className="w-5 h-5" />,
    tone: 'amber',
  },
];

const recentUploads: RecentUpload[] = [
  { fileName: 'panel_A12.jpg', sector: 'Sector A', uploadedAt: '2026-04-28 09:14', result: 'Cracks' },
  { fileName: 'panel_B07.jpg', sector: 'Sector B', uploadedAt: '2026-04-28 09:02', result: 'Snow' },
  { fileName: 'panel_C21.jpg', sector: 'Sector C', uploadedAt: '2026-04-28 08:48', result: 'Clean' },
  { fileName: 'panel_A05.jpg', sector: 'Sector A', uploadedAt: '2026-04-28 08:30', result: 'Dust' },
  { fileName: 'panel_D14.jpg', sector: 'Sector D', uploadedAt: '2026-04-28 08:11', result: 'Bird Droppings' },
];

const resultStyles: Record<RecentUpload['result'], string> = {
  'Cracks': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Snow': 'bg-blue-500/15 text-blue-400 border-blue-500/30',
  'Clean': 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
  'Dust': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Bird Droppings': 'bg-yellow-500/15 text-yellow-400 border-yellow-500/30',
};

const priorityStyles: Record<Recommendation['priority'], string> = {
  'High Priority': 'bg-red-500/15 text-red-400 border-red-500/30',
  'Medium Priority': 'bg-amber-500/15 text-amber-400 border-amber-500/30',
  'Low Priority': 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

const UploadTab = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [detections, setDetections] = useState<Detection[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const handleFiles = (files: FileList) => {
    if (files.length === 0) return;
    const file = files[0];
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(URL.createObjectURL(file));
    setSelectedFile(file);
    setHasResult(false);
  };

  const handleBrowse = () => fileInputRef.current?.click();

  const handleAnalyze = async () => {
    if (!selectedFile) {
      handleBrowse();
      return;
    }
    setIsAnalyzing(true);
    setHasResult(false);
    try {
      const result = await predictInspection([selectedFile]);
      if (result?.detections) {
  setDetections(result.detections);
}
      console.log('Inspection prediction result:', result);
      setHasResult(true);
    } catch (err) {
      console.error('Inspection prediction failed:', err);
      const description = err instanceof Error
        ? err.message
        : (typeof err === 'string' ? err : JSON.stringify(err));
      toast({
        title: 'Analysis failed',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleClear = () => {
    setHasResult(false);
    setIsAnalyzing(false);
    setSelectedFile(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const showImageState = isAnalyzing || hasResult;

  return (
    <div className="space-y-6">
      {/* Unified Upload / Analysis Result card */}
      <div
        className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-6 flex flex-col"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {showImageState
              ? (t.analysisResults || 'Analysis Result')
              : (t.uploadFiles || 'Upload File')}
          </h3>
          {hasResult && !isAnalyzing && (
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-wider text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-2 py-0.5">
                AI Detected
              </span>
              <button
                onClick={handleClear}
                aria-label="Remove image"
                className="w-7 h-7 rounded-full bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 text-muted-foreground hover:text-red-400 flex items-center justify-center transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {isAnalyzing ? (
          <div className="border-2 border-dashed border-cyan-500/20 rounded-xl flex-1 flex items-center justify-center min-h-[360px]">
            <div className="text-center">
              <Loader2 className="w-16 h-16 mx-auto text-primary animate-spin mb-4" />
              <p className="text-muted-foreground">Analyzing image...</p>
            </div>
          </div>
        ) : hasResult ? (
          <div className="relative rounded-xl overflow-hidden border border-white/10 mx-auto w-full max-w-[640px] bg-black">
            <img src={previewUrl ?? solarPanelImg} alt="Analyzed solar panel" className="w-full h-[320px] object-contain" />
          </div>
        ) : (
          <>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors flex-1 flex flex-col items-center justify-center min-h-[360px] ${
                isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
              }`}
            >
              <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-foreground font-medium mb-2">{t.dropFilesHere}</p>
              <p className="text-sm text-muted-foreground mb-4">{t.supportedFormat}</p>
              <p className="text-muted-foreground mb-4">{t.or}</p>
              <button onClick={handleBrowse} className="text-primary hover:underline font-medium">
                {t.browseFiles}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-3 truncate">
                Selected: <span className="text-foreground">{selectedFile.name}</span>
              </p>
            )}

            <Button
              className="w-full mt-4"
              disabled={isAnalyzing || !selectedFile}
              onClick={handleAnalyze}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze File'}
            </Button>
          </>
        )}
      </div>

      {/* Recommendations + Detection Summary (below) */}
      {hasResult && !isAnalyzing && (
        <div className="space-y-5">
          {/* Recommendations */}
          <div>
            <p className="text-sm font-semibold text-foreground mb-3">Recommendations</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((r, i) => {
                const tn = recTones[r.tone];
                return (
                  <div
                    key={i}
                    className={`rounded-xl border p-4 transition-all duration-300 backdrop-blur-sm flex flex-col ${tn.card}`}
                  >
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className={tn.iconWrap}>{r.icon}</span>
                      <p className="text-sm font-semibold text-foreground">{r.title}</p>
                    </div>
                    <span
                      className={`self-start text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border mb-2 ${tn.pill}`}
                    >
                      {r.priority}
                    </span>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4 flex-1">
                      {r.description}
                    </p>
                    <button
                      className={`w-full h-9 rounded-md text-xs font-semibold transition-colors ${tn.button}`}
                    >
                      {r.cta}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Detection Summary Table */}
          <div
            className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-5"
            
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-foreground">Detection Summary</p>
              <span className="text-xs text-muted-foreground">{detections.length} detections</span>
            </div>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-[11px] uppercase tracking-wider text-muted-foreground border-b border-white/5">
                  <th className="py-2.5 px-3 font-medium">ID</th>
                  <th className="py-2.5 px-3 font-medium">Type</th>
                  <th className="py-2.5 px-3 font-medium">Severity</th>
                </tr>
              </thead>
              <tbody>
                {detections.map((d, i) => {
                  const s = severityStyles[d.severity];
                  return (
                    <tr
                      key={i}
                      className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3 px-3 text-foreground font-mono text-xs">{d.id}</td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                          <span className="text-foreground">{d.label}</span>
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span
                          className={`inline-block text-[11px] px-2.5 py-1 rounded-full border ${s.pill}`}
                        >
                          {s.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Uploads Table */}
      <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] backdrop-blur-sm shadow-[0_0_30px_rgba(0,108,158,0.06)] hover:shadow-[0_0_40px_rgba(34,211,238,0.12)] transition p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Recent Uploads</h3>
          <span className="text-xs text-muted-foreground">{recentUploads.length} files</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="py-3 px-3 font-medium">File Name</th>
                <th className="py-3 px-3 font-medium">Sector</th>
                <th className="py-3 px-3 font-medium">Uploaded At</th>
                <th className="py-3 px-3 font-medium">Result</th>
              </tr>
            </thead>
            <tbody>
              {recentUploads.map((row, i) => (
                <tr
                  key={i}
                  className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 px-3 text-foreground font-medium">{row.fileName}</td>
                  <td className="py-3 px-3 text-muted-foreground">{row.sector}</td>
                  <td className="py-3 px-3 text-muted-foreground">{row.uploadedAt}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`inline-block text-[11px] px-2.5 py-1 rounded-full border ${resultStyles[row.result]}`}
                    >
                      {row.result}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UploadTab;
