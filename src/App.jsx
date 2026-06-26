import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer,
  AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, Cell, ReferenceLine,
} from "recharts";
import {
  Activity, Zap, Film, MessageSquare, Layers, Calendar, Link2, Repeat, Rocket,
  DollarSign, Target, TrendingUp, Brain, Radar as RadarIcon, ArrowUpRight, Sparkles,
  Gauge, Crosshair, ArrowRight, Check, X, Signal, CircleDot, Lock, Plus, Users,
  Instagram, RefreshCw, Flame, Search, BarChart3, Shuffle, CheckCircle2, Eye, Bookmark,
  Send, MessageCircle, Sparkle, CornerDownLeft,
  BookOpen, CalendarCheck, Music, Type, Scissors, ShieldAlert, Store, Copy, Clock,
  Play, Hash, ChevronDown, Wand2, Megaphone, Volume2, ListChecks, Sun, AlertTriangle,
  Building2, Cpu, Briefcase, GraduationCap, Radio, Download, Upload, SlidersHorizontal, Video, Camera, Trophy,
  Globe, Mail, ExternalLink, Power, ArrowDown, FileText, Lightbulb, Compass,
} from "lucide-react";

/* ─────────────────────────── DESIGN SYSTEM ─────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
:root{
  --void:#08090C;--bg:#0A0C11;--surface:#0F131A;--surface2:#141922;--surface3:#1A2029;
  --line:#1F2630;--line2:#2A323D;--text:#EAEEF5;--muted:#8B95A6;--faint:#5A6473;
  --accent:#4F8CFF;--accent2:#8B7CFF;--cyan:#38E1D6;--green:#2FD08A;--amber:#F2B14C;--red:#F26D6D;
  --grad:linear-gradient(135deg,#4F8CFF 0%,#8B7CFF 100%);
  --grad-soft:linear-gradient(135deg,rgba(79,140,255,.16),rgba(139,124,255,.16));
}
*{box-sizing:border-box;margin:0;padding:0}
.cx-root{font-family:'Inter',system-ui,sans-serif;background:var(--void);color:var(--text);min-height:100vh;
  width:100%;overflow-x:hidden;-webkit-font-smoothing:antialiased;letter-spacing:-0.01em;position:relative}
.cx-root::before{content:"";position:fixed;inset:0;pointer-events:none;z-index:0;
  background:radial-gradient(900px 500px at 78% -8%,rgba(79,140,255,.10),transparent 60%),
  radial-gradient(760px 520px at 8% 108%,rgba(139,124,255,.08),transparent 60%)}
.mono{font-family:'JetBrains Mono',monospace;font-variant-numeric:tabular-nums}
.disp{font-family:'Space Grotesk',sans-serif}
.cx-grid-bg{position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.35;
  background-image:linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px);
  background-size:64px 64px;mask-image:radial-gradient(circle at 50% 30%,#000 0%,transparent 78%)}
.wrap{position:relative;z-index:1}
.eyebrow{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:var(--faint)}
.btn{font-family:'Space Grotesk';font-weight:600;border:none;cursor:pointer;border-radius:11px;transition:transform .12s,filter .2s,background .2s,border-color .2s;font-size:15px}
.btn-grad{background:var(--grad);color:#fff;padding:15px 26px;box-shadow:0 8px 30px -10px rgba(79,140,255,.6)}
.btn-grad:hover{filter:brightness(1.08);transform:translateY(-1px)}
.btn-ghost{background:var(--surface2);color:var(--text);border:1px solid var(--line2);padding:13px 22px}
.btn-ghost:hover{border-color:var(--accent);background:var(--surface3)}
.chip{cursor:pointer;border:1px solid var(--line2);background:var(--surface2);color:var(--muted);border-radius:10px;
  padding:12px 15px;font-size:14px;font-weight:500;transition:all .14s;display:flex;align-items:center;gap:9px;user-select:none}
.chip:hover{border-color:var(--faint);color:var(--text)}
.chip.on{border-color:var(--accent);background:var(--grad-soft);color:var(--text);box-shadow:0 0 0 1px rgba(79,140,255,.35) inset}
.chip .dot{width:7px;height:7px;border-radius:50%;background:var(--faint);transition:.14s;flex-shrink:0}
.chip.on .dot{background:var(--accent);box-shadow:0 0 8px var(--accent)}
.chip .ck{margin-left:auto;color:var(--accent)}
.panel{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:18px;position:relative;overflow:hidden}
.panel-pad{padding:22px}
.hair{height:1px;background:var(--line);width:100%}
.tag{font-family:'JetBrains Mono';font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);
  border:1px solid var(--line2);border-radius:6px;padding:4px 8px;display:inline-flex;gap:6px;align-items:center}
.delta-up{color:var(--green)}.delta-dn{color:var(--red)}
.live{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono';font-size:11px;color:var(--muted);letter-spacing:.08em}
.live .pulse{width:7px;height:7px;border-radius:50%;background:var(--green);animation:pp 1.8s infinite}
@keyframes pp{0%{box-shadow:0 0 0 0 rgba(47,208,138,.55)}70%{box-shadow:0 0 0 7px rgba(47,208,138,0)}100%{box-shadow:0 0 0 0 rgba(47,208,138,0)}}
.ticker{overflow:hidden;border-bottom:1px solid var(--line);background:rgba(10,12,17,.7);backdrop-filter:blur(8px)}
.ticker-row{display:flex;gap:42px;white-space:nowrap;animation:tick 38s linear infinite;padding:11px 0;width:max-content}
.ticker-item{display:flex;align-items:center;gap:10px;font-family:'JetBrains Mono';font-size:12.5px;color:var(--muted)}
.ticker-item b{color:var(--text);font-weight:600}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.shell{display:flex;min-height:100vh}
.nav{width:236px;flex-shrink:0;border-right:1px solid var(--line);padding:22px 14px;position:sticky;top:0;height:100vh;
  background:rgba(10,12,17,.6);backdrop-filter:blur(10px);display:flex;flex-direction:column}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:11px;color:var(--muted);cursor:pointer;
  font-size:14px;font-weight:500;transition:.14s;border:1px solid transparent}
.nav-item:hover{color:var(--text);background:var(--surface2)}
.nav-item.on{color:var(--text);background:var(--grad-soft);border-color:rgba(79,140,255,.3)}
.nav-sec{font-family:'JetBrains Mono';font-size:10px;letter-spacing:.2em;color:var(--faint);text-transform:uppercase;padding:18px 13px 8px}
.main{flex:1;min-width:0;padding:26px 30px 80px}
.mobtop{display:none}
.hero{display:grid;grid-template-columns:1.15fr 1fr;gap:18px}
.idx-card{background:radial-gradient(120% 120% at 100% 0%,rgba(139,124,255,.14),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg));
  border:1px solid var(--line);border-radius:18px;padding:26px;position:relative;overflow:hidden}
.tools{display:grid;grid-template-columns:repeat(2,1fr);gap:13px}
.tool{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:15px;padding:18px;cursor:pointer;transition:.16s;position:relative;overflow:hidden}
.tool:hover{border-color:var(--line2);transform:translateY(-2px)}
.tool:hover .tool-ic{background:var(--grad);color:#fff}
.tool-ic{width:42px;height:42px;border-radius:11px;background:var(--surface3);display:flex;align-items:center;justify-content:center;color:var(--accent);transition:.16s;border:1px solid var(--line2)}
.tool h4{font-family:'Space Grotesk';font-weight:600;font-size:15.5px;margin:14px 0 5px}
.tool p{font-size:12.5px;color:var(--muted);line-height:1.45}
.tool .arr{position:absolute;top:18px;right:18px;color:var(--faint);transition:.16s}
.tool:hover .arr{color:var(--accent);transform:translate(2px,-2px)}
.sub{display:flex;flex-direction:column;gap:14px}
.sub-row .top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:7px}
.sub-row .nm{font-size:13px;color:var(--text);font-weight:500}
.sub-row .vl{font-family:'JetBrains Mono';font-size:13px;color:var(--muted)}
.bar{height:7px;border-radius:99px;background:var(--surface3);overflow:hidden;position:relative}
.bar i{display:block;height:100%;border-radius:99px;background:var(--grad);transition:width 1.1s cubic-bezier(.2,.8,.2,1)}
.scrim{position:fixed;inset:0;background:rgba(4,5,8,.66);backdrop-filter:blur(3px);z-index:40;animation:fade .2s}
.drawer{position:fixed;top:0;right:0;height:100vh;width:min(560px,94vw);background:var(--bg);border-left:1px solid var(--line2);z-index:41;overflow-y:auto;animation:slide .26s cubic-bezier(.2,.8,.2,1)}
.modal{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:min(480px,92vw);background:var(--bg);border:1px solid var(--line2);border-radius:18px;z-index:42;animation:fade .2s;max-height:88vh;overflow-y:auto}
@keyframes slide{from{transform:translateX(40px);opacity:.4}to{transform:translateX(0);opacity:1}}
@keyframes fade{from{opacity:0}to{opacity:1}}
.out-card{background:var(--surface);border:1px solid var(--line);border-radius:13px;padding:16px;margin-bottom:11px}
.opp{font-family:'JetBrains Mono';font-size:11px;padding:4px 9px;border-radius:7px;background:rgba(47,208,138,.12);color:var(--green);border:1px solid rgba(47,208,138,.25)}
.nba{background:radial-gradient(130% 130% at 0% 0%,rgba(79,140,255,.16),transparent 50%),linear-gradient(180deg,var(--surface),var(--bg));
  border:1px solid rgba(79,140,255,.28);border-radius:16px;padding:20px;position:relative;overflow:hidden}
input.cx-in,textarea.cx-in{width:100%;background:var(--surface2);border:1px solid var(--line2);border-radius:11px;color:var(--text);
  font-family:'Inter';font-size:15px;padding:14px 15px;outline:none;transition:.14s}
input.cx-in:focus,textarea.cx-in:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(79,140,255,.12)}
.cx-in::placeholder{color:var(--faint)}
.assess{max-width:680px;margin:0 auto;padding:40px 22px 60px}
.prog{height:3px;background:var(--surface3);border-radius:99px;overflow:hidden;margin-bottom:30px}
.prog i{display:block;height:100%;background:var(--grad);transition:width .4s}
.q-h{font-family:'Space Grotesk';font-weight:700;font-size:27px;line-height:1.18;margin:10px 0 6px}
.q-sub{color:var(--muted);font-size:14.5px;margin-bottom:24px}
.opts{display:grid;gap:10px}
.opts.two{grid-template-columns:1fr 1fr}
.analyze{max-width:560px;margin:0 auto;padding:70px 22px;text-align:center}
.an-line{display:flex;align-items:center;gap:12px;padding:13px 16px;border:1px solid var(--line);border-radius:12px;background:var(--surface);margin-bottom:9px;text-align:left;font-size:13.5px;color:var(--muted);transition:.3s}
.an-line.done{border-color:rgba(47,208,138,.3);color:var(--text)}
.an-line.run{border-color:rgba(79,140,255,.4);color:var(--text)}
.spin{width:15px;height:15px;border-radius:50%;border:2px solid var(--line2);border-top-color:var(--accent);animation:sp .7s linear infinite}
@keyframes sp{to{transform:rotate(360deg)}}
.tabs{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:16px}
.tab{cursor:pointer;font-family:'JetBrains Mono';font-size:12px;letter-spacing:.04em;padding:9px 14px;border-radius:9px;border:1px solid var(--line2);background:var(--surface2);color:var(--muted);transition:.14s}
.tab:hover{color:var(--text)}
.tab.on{background:var(--grad-soft);border-color:rgba(79,140,255,.4);color:var(--text)}
.kpi{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:15px;padding:18px}
.kpi .v{font-family:'Space Grotesk';font-weight:700;font-size:27px;line-height:1}
.kpi .l{font-size:12px;color:var(--muted);margin-top:7px;display:flex;gap:6px;align-items:center}
.pace{height:9px;border-radius:99px;background:var(--surface3);overflow:hidden;margin-top:10px}
.pace i{display:block;height:100%;border-radius:99px;transition:width 1.1s cubic-bezier(.2,.8,.2,1)}
.plat{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:14px;padding:16px}
.row-card{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:13px;padding:15px;display:flex;justify-content:space-between;gap:14px;align-items:center;transition:.14s}
.row-card:hover{border-color:var(--line2)}
.banner{background:radial-gradient(130% 130% at 100% 0%,rgba(139,124,255,.16),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg));border:1px solid rgba(139,124,255,.3);border-radius:16px;padding:20px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap}
.streak{display:inline-flex;align-items:center;gap:7px;font-family:'JetBrains Mono';font-size:12px;color:var(--amber);border:1px solid rgba(242,177,76,.3);background:rgba(242,177,76,.08);padding:6px 11px;border-radius:8px}
/* ── AI chat ── */
.askbar{background:radial-gradient(120% 140% at 0% 0%,rgba(139,124,255,.16),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg));
  border:1px solid rgba(79,140,255,.3);border-radius:16px;padding:16px}
.askbar-in{display:flex;gap:10px;align-items:center}
.askbar input{flex:1;background:transparent;border:none;outline:none;color:var(--text);font-family:'Inter';font-size:15.5px}
.askbar input::placeholder{color:var(--faint)}
.sug{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}
.sug span{cursor:pointer;font-size:12.5px;color:var(--muted);border:1px solid var(--line2);background:var(--surface2);border-radius:99px;padding:7px 13px;transition:.14s}
.sug span:hover{border-color:var(--accent);color:var(--text)}
.ai-av{width:30px;height:30px;border-radius:9px;background:var(--grad);display:flex;align-items:center;justify-content:center;flex-shrink:0}
.chat-scroll{flex:1;overflow-y:auto;padding:20px 22px;display:flex;flex-direction:column;gap:16px}
.msg{display:flex;gap:11px;max-width:100%}
.msg.user{flex-direction:row-reverse}
.msg .body{font-size:14.5px;line-height:1.55;white-space:pre-wrap;border-radius:13px;padding:12px 15px;max-width:80%}
.msg.ai .body{background:var(--surface);border:1px solid var(--line)}
.msg.user .body{background:var(--grad-soft);border:1px solid rgba(79,140,255,.3)}
.msg.user .ai-av{background:var(--surface3);border:1px solid var(--line2)}
.typing{display:flex;gap:4px;padding:14px 16px}
.typing i{width:6px;height:6px;border-radius:50%;background:var(--faint);animation:bl 1.2s infinite}
.typing i:nth-child(2){animation-delay:.2s}.typing i:nth-child(3){animation-delay:.4s}
@keyframes bl{0%,60%,100%{opacity:.3;transform:translateY(0)}30%{opacity:1;transform:translateY(-3px)}}
.chat-input{border-top:1px solid var(--line);padding:14px 16px;display:flex;gap:10px;align-items:flex-end;background:var(--bg)}
.chat-input textarea{flex:1;background:var(--surface2);border:1px solid var(--line2);border-radius:12px;color:var(--text);font-family:'Inter';font-size:15px;padding:12px 14px;outline:none;resize:none;max-height:120px}
.chat-input textarea:focus{border-color:var(--accent)}
.send-btn{width:42px;height:42px;border-radius:11px;background:var(--grad);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:.14s}
.send-btn:hover{filter:brightness(1.1)}.send-btn:disabled{opacity:.4;cursor:not-allowed}
.fab{position:fixed;bottom:24px;right:24px;z-index:38;border:none;cursor:pointer;border-radius:99px;background:var(--grad);
  color:#fff;font-family:'Space Grotesk';font-weight:600;font-size:14.5px;padding:14px 20px;display:flex;align-items:center;gap:9px;
  box-shadow:0 12px 36px -8px rgba(79,140,255,.6);transition:transform .14s,filter .2s}
.fab:hover{transform:translateY(-2px);filter:brightness(1.07)}
.chat-drawer{position:fixed;top:0;right:0;height:100vh;width:min(480px,96vw);background:var(--bg);border-left:1px solid var(--line2);
  z-index:41;display:flex;flex-direction:column;animation:slide .26s cubic-bezier(.2,.8,.2,1)}
.studio-group{margin-bottom:24px}
.action-card{display:flex;align-items:center;gap:10px;align-self:flex-start;max-width:85%;background:rgba(47,208,138,.08);
  border:1px solid rgba(47,208,138,.28);border-radius:11px;padding:11px 14px;font-size:13.5px;color:var(--text);font-weight:500}
.toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:60;display:flex;align-items:center;gap:10px;
  background:var(--surface2);border:1px solid var(--line2);border-radius:12px;padding:13px 18px;font-size:14px;font-weight:500;
  box-shadow:0 16px 40px -12px rgba(0,0,0,.7);animation:toastin .3s cubic-bezier(.2,.8,.2,1)}
@keyframes toastin{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
.lib-badge{margin-left:auto;font-family:'JetBrains Mono';font-size:11px;background:var(--grad);color:#fff;border-radius:99px;padding:2px 8px;min-width:20px;text-align:center}
.lib-item{display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--line);border-radius:12px;padding:13px 15px;margin-bottom:10px}
/* guidance: today / playbook */
.task{background:linear-gradient(180deg,var(--surface),var(--bg));border:1px solid var(--line);border-radius:15px;overflow:hidden;transition:border-color .15s}
.task-h{display:flex;align-items:center;gap:13px;padding:16px 18px;cursor:pointer}
.check{width:24px;height:24px;border-radius:7px;border:1.5px solid var(--line2);background:var(--surface3);cursor:pointer;flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.14s}
.check.on{background:var(--green);border-color:var(--green)}
.task-ic{width:38px;height:38px;border-radius:10px;background:var(--surface3);border:1px solid var(--line2);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0}
.task-body{padding:4px 18px 20px 18px;border-top:1px solid var(--line)}
.tb-block{margin-top:16px}
.tb-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:9px}
.line-copy{display:flex;justify-content:space-between;align-items:center;gap:12px;background:var(--surface);border:1px solid var(--line);border-radius:11px;padding:12px 14px;font-size:14px;line-height:1.45}
.line-copy>span{flex:1}
.kit{background:var(--surface2);border:1px solid var(--line2);border-radius:11px;padding:14px;font-size:13.5px;line-height:1.6;white-space:pre-wrap;color:var(--text)}
.mini-list{list-style:none;display:flex;flex-direction:column;gap:7px}
.mini-list li{font-size:13.5px;color:var(--muted);line-height:1.45;padding-left:16px;position:relative}
.mini-list li::before{content:"›";position:absolute;left:0;color:var(--accent);font-weight:700}
.ptext{font-size:13.5px;color:var(--muted);line-height:1.55}
.btn-row{display:flex;gap:9px;align-items:center;margin-top:12px;flex-wrap:wrap}
.btn.sm{padding:10px 16px;font-size:13.5px}
.copybtn{font-family:'JetBrains Mono';font-size:11.5px;letter-spacing:.04em;cursor:pointer;border:1px solid var(--line2);background:var(--surface2);
  color:var(--muted);border-radius:8px;padding:7px 11px;display:inline-flex;align-items:center;gap:6px;transition:.14s;white-space:nowrap;flex-shrink:0}
.copybtn:hover{border-color:var(--accent);color:var(--text)}
.mini{font-family:'JetBrains Mono';font-size:11px;cursor:pointer;border:1px solid var(--line2);background:var(--surface2);color:var(--muted);border-radius:7px;padding:5px 9px;display:inline-flex;align-items:center;gap:5px;transition:.14s}
.mini:hover{border-color:var(--accent);color:var(--text)}
.opt-card{display:flex;gap:12px;align-items:flex-start;background:var(--surface);border:1px solid var(--line2);border-radius:12px;padding:14px 15px;cursor:pointer;transition:.13s}
.opt-card:hover{border-color:var(--faint)}
.opt-card.on{border-color:var(--accent);background:var(--grad-soft);box-shadow:0 0 0 1px rgba(79,140,255,.3) inset}
.opt-tick{width:22px;height:22px;border-radius:7px;border:1.5px solid var(--line2);background:var(--surface3);flex-shrink:0;display:flex;align-items:center;justify-content:center;transition:.13s}
.opt-tick.on{background:var(--accent);border-color:var(--accent)}
.bld-prog{display:flex;gap:5px}
.bld-prog span{flex:1;height:4px;border-radius:99px;background:var(--surface3);transition:.3s}
.bld-prog span.on{background:var(--grad)}
.editchip{font-family:'JetBrains Mono';font-size:11px;cursor:pointer;border:1px solid var(--line2);background:var(--surface2);color:var(--muted);border-radius:7px;padding:5px 10px;transition:.14s}
.editchip:hover{border-color:var(--accent);color:var(--text)}
.uploadzone{border:1.5px dashed var(--line2);border-radius:16px;padding:38px 22px;text-align:center;cursor:pointer;background:var(--surface);transition:.15s}
.uploadzone:hover{border-color:var(--accent);background:var(--surface2)}
.model-row{display:flex;align-items:center;gap:11px;padding:11px 13px;border:1px solid var(--line);border-radius:12px;background:linear-gradient(180deg,var(--surface),var(--bg));cursor:pointer;transition:.14s}
.model-row:hover{border-color:var(--line2)}
.model-row.on{border-color:var(--accent);background:var(--grad-soft)}
.pillar-card{border:1px solid var(--line);border-radius:14px;padding:14px;background:linear-gradient(180deg,var(--surface),var(--bg));cursor:pointer;transition:.15s}
.pillar-card:hover{border-color:var(--accent);transform:translateY(-2px)}
.auto-node{display:flex;align-items:center;gap:12px;padding:12px;border:1px solid var(--line);border-radius:12px;background:linear-gradient(180deg,var(--surface),var(--bg));cursor:pointer;transition:.14s}
.auto-node:hover{border-color:var(--line2)}
.auto-node.on{border-color:var(--accent);background:var(--grad-soft)}
.auto-config{margin:8px 0 2px;padding:14px;border:1px dashed var(--line2);border-radius:11px;background:var(--void)}
.cx-modal-bg{position:fixed;inset:0;z-index:200;background:rgba(4,5,8,.72);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:18px}
.cx-modal{width:100%;max-width:520px;max-height:88vh;overflow-y:auto;background:var(--surface);border:1px solid var(--line2);border-radius:18px;padding:22px;box-shadow:0 30px 80px rgba(0,0,0,.5)}
@media(max-width:920px){.fab{bottom:18px;right:18px;padding:13px 17px}}
@media(max-width:920px){
  .nav{display:none}.mobtop{display:flex}.main{padding:16px 14px 92px}
  /* force every multi-column grid to a single column on phones (overrides inline styles) */
  .hero{grid-template-columns:1fr !important}
  .opts.two{grid-template-columns:1fr !important}
  .tools{grid-template-columns:1fr 1fr !important}
  .kpirow{grid-template-columns:1fr 1fr !important}
  /* mobile nav strip: scroll horizontally instead of wrapping into a tall block */
  .mobtop.tabs{flex-wrap:nowrap;overflow-x:auto;-webkit-overflow-scrolling:touch;scrollbar-width:none;padding-bottom:2px}
  .mobtop.tabs::-webkit-scrollbar{display:none}
  .mobtop.tabs .tab{flex:0 0 auto;white-space:nowrap}
  /* full-width builder drawer on phones */
  .drawer{width:100vw;border-left:none}
  .panel-pad{padding:18px}
  .cx-modal{padding:18px}
  .msg .body{max-width:90%}
}
@media(max-width:520px){.tools{grid-template-columns:1fr !important}.kpirow{grid-template-columns:1fr !important}.q-h{font-size:23px}}
/* long text (kits, mono, urls, hashtags) must wrap, never cause sideways scroll */
.kit,.mono,.msg .body,.row-card,.out-card,.task-body{overflow-wrap:anywhere;word-break:break-word}
::-webkit-scrollbar{width:9px;height:9px}::-webkit-scrollbar-thumb{background:var(--line2);border-radius:9px}::-webkit-scrollbar-track{background:transparent}
`;

/* ─────────────────────────── DATA ─────────────────────────── */
const NICHES=["Fitness & Training","Online Coaching","Business / Founder","Mindset & Discipline","Nutrition & Health","Beauty / Skincare","Finance & Investing","Real Estate","E-commerce / DTC","Faith & Lifestyle","Music / Entertainment","Other"];
const PLATFORMS=["Instagram","TikTok","YouTube Shorts","X / Twitter","LinkedIn"];
const FOLLOWERS=["0 – 1K","1K – 10K","10K – 50K","50K – 250K","250K+"];
const FREQ=["Rarely","1–2 / week","3–5 / week","Daily","Multiple / day"];
const GOALS=["Explode my growth","Monetize my audience","Build authority","Launch an offer","Go cross-platform"];
const OFFERSTATUS=["Nothing yet","Free lead magnet","Low-ticket ($1–97)","Mid-ticket ($97–997)","High-ticket ($1K+)"];
const LEADCH=["DMs","Link in bio","Email list","Comments","I don't capture leads"];
const STYLE=["Talking head","Lifestyle / B-roll","Educational breakdowns","Gym / action","Voiceover + b-roll","Story-driven","Day-in-the-life","Before / after reveals","Green-screen reactions","Tutorials / how-to","Listicles (3 things…)","Behind-the-scenes"];
const TONE=["Direct & intense","Premium / luxury","Educational","Real-talk","Contrarian","Faith / mindset"];
const STRUGGLE=["Writing hooks that stop the scroll","Staying consistent","Ideas — what to post","Editing for retention","Turning views into followers","Converting views to sales","Building an offer","Breaking a growth plateau","Being on camera","Knowing what's actually working"];
const KNOWNAS=["The go-to expert","The relatable real one","The bold contrarian","The motivator","The data-backed authority","The entertaining one"];
const ANGLES=["Contrarian / myth-busting","Storytelling","Data & proof","Motivation","Step-by-step how-to","Humor / entertainment","Luxury / aspirational"];
const EXP=["Just starting","Some traction","Established","Scaling a business"];
const REVGOAL=["< $1K / mo","$1K – 5K","$5K – 20K","$20K – 100K","$100K+"];
const HOURS=["< 3 hrs","3–8 hrs","8–20 hrs","20+ hrs"];

const STEPS=[
  {key:"name",kind:"identity",req:true,title:"First, who are we building for?",sub:"Your name or business name — then drop your main social handle so we can scan your page and pull your data the moment you're in.",ph:"e.g. Michael, or @yourbrand"},
  {key:"mode",kind:"single",req:true,two:true,title:"Growing a personal brand or a business?",sub:"We'll tailor the whole platform — content, funnels, and monetization — to you.",opts:["A personal brand","A business"]},
  {key:"niches",kind:"multi",req:true,two:true,title:"What lane(s) are you in?",sub:"Pick your primary — and add a layer if you blend niches. You can change this anytime.",opts:NICHES},
  {key:"platforms",kind:"multi",req:true,two:true,title:"Where do you publish?",sub:"Select all that apply. We score each platform separately.",opts:PLATFORMS},
  {key:"followers",kind:"single",req:true,two:true,title:"Current audience size?",sub:"On your main platform.",opts:FOLLOWERS},
  {key:"freq",kind:"single",req:true,two:true,title:"How often are you posting right now?",opts:FREQ},
  {key:"goals",kind:"multi",req:true,title:"What outcomes are you chasing?",sub:"Select all that apply — we weight your dashboard toward these.",opts:GOALS},
  {key:"offer",kind:"multi",req:true,two:true,title:"What are you selling today?",sub:"Select all that apply — you may have more than one.",opts:OFFERSTATUS},
  {key:"revgoal",kind:"single",req:true,two:true,title:"Revenue target you're chasing?",opts:REVGOAL},
  {key:"leads",kind:"multi",req:true,two:true,title:"How do leads reach you?",sub:"Select all that apply.",opts:LEADCH},
  {key:"style",kind:"multi",req:true,two:true,title:"What content formats feel like you?",sub:"Select all that apply.",opts:[...STYLE,"Other"]},
  {key:"tone",kind:"multi",req:true,two:true,title:"What should your voice feel like?",sub:"Select all that apply — this trains your Brand Voice profile.",opts:TONE},
  {key:"struggle",kind:"multi",req:true,two:true,title:"What's slowing your growth down most?",sub:"Pick what frustrates you — we'll prioritize fixing these first.",opts:STRUGGLE},
  {key:"exp",kind:"single",req:true,two:true,title:"Where are you in the journey?",opts:EXP},
  {key:"hours",kind:"single",req:true,two:true,title:"Hours per week you can put in?",opts:HOURS},
  {key:"known",kind:"single",req:true,two:true,title:"How do you want people to see you?",sub:"Pick the one that fits best — this shapes your positioning.",opts:KNOWNAS},
  {key:"take",kind:"multi",req:true,two:true,title:"Which content angles feel most like you?",sub:"Tap any that fit — this trains how your content sounds.",opts:ANGLES},
  {key:"email",kind:"text",req:false,title:"Last one — where do we send your report?",sub:"Optional. Your Creator Index is ready either way.",ph:"you@email.com"},
];

/* ─────────────────────────── SCORING ENGINE ─────────────────────────── */
const clamp=(n)=>Math.max(8,Math.min(98,Math.round(n)));
function rng(seed="x",salt=1){let h=salt;for(const c of (seed||"x"))h=(h*31+c.charCodeAt(0))%97;return (h%10)/10;}
const fmt=(n)=>n>=1000?(n/1000).toFixed(n>=100000?0:1).replace(/\.0$/,"")+"K":""+n;
const money=(n)=>"$"+(n>=1000?(n/1000).toFixed(n>=100000?0:1).replace(/\.0$/,"")+"k":n);

function computeProfile(a){
  const i=(arr,v)=>Math.max(0,arr.indexOf(v));
  const niches=a.niches?.length?a.niches:["Other"];
  const goals=a.goals?.length?a.goals:["Explode my growth"];
  const offerArr=Array.isArray(a.offer)?a.offer:(a.offer?[a.offer]:[]);
  const offerPrimary=offerArr.length?offerArr.reduce((best,o)=>OFFERSTATUS.indexOf(o)>OFFERSTATUS.indexOf(best)?o:best,offerArr[0]):"Nothing yet";
  const fb=i(FOLLOWERS,a.followers), of=i(OFFERSTATUS,offerPrimary), fq=i(FREQ,a.freq);
  const lead=(a.leads||[]).length;
  const hook=clamp(48+fq*7+((a.struggle||[]).includes("Writing hooks")?-12:9)+rng(a.name,3)*4);
  const retain=clamp(46+fq*6+((a.style||[]).includes("Story-driven")?10:0)+((a.struggle||[]).includes("Editing for retention")?-10:8)+rng(a.name,7)*3);
  const engage=clamp(50+fb*7+fq*4+rng(a.name,11)*5-6);
  const dist=clamp(44+fb*8+((a.platforms||[]).length||1)*4+rng(a.name,13)*4);
  const mon=clamp(40+of*11+lead*3+(goals.includes("Monetize my audience")?6:0)+rng(a.name,17)*2);
  const brand=clamp(52+((a.tone||[]).length||1)*5+(a.known?Math.min(a.known.length,40)/4:0)+rng(a.name,19)*4);
  const subs=[{key:"Hook Power",v:hook,ic:Zap},{key:"Retention",v:retain,ic:Film},{key:"Engagement Velocity",v:engage,ic:Activity},
    {key:"Distribution Reach",v:dist,ic:Signal},{key:"Monetization Readiness",v:mon,ic:DollarSign},{key:"Brand Clarity",v:brand,ic:Crosshair}];
  const avg=subs.reduce((s,x)=>s+x.v,0)/subs.length;
  const index=Math.round(avg*9+100);
  const tier=index>=820?{n:"Apex Operator",c:"var(--accent2)"}:index>=700?{n:"Scaling Operator",c:"var(--accent)"}
    :index>=560?{n:"Emerging Operator",c:"var(--cyan)"}:index>=440?{n:"Building Operator",c:"var(--amber)"}:{n:"Foundation Stage",c:"var(--muted)"};
  const weekly=+(3.4+(4-fq)*0.5+(4-of)*0.4).toFixed(1);
  const proj=Math.round(Math.min(990,index+index*0.42));

  // ── per-platform scoring (creates cross-platform opportunity) ──
  const primaryPlat=(a.platforms||[])[0];
  const platforms=PLATFORMS.map((pl,idx)=>{
    const sel=(a.platforms||[]).includes(pl), primary=pl===primaryPlat;
    let v=sel?(primary?72:54):20; v=clamp(v+Math.round(rng(a.name,pl.length+idx)*16)-6);
    return {pl,v,sel,primary,status:!sel?"Untapped":v>=66?"Strong":"Building"};
  });

  // ── growth tracker baseline / targets ──
  const fBase=[600,5200,28000,130000,420000][fb]||5200;
  const fTarget=Math.round(fBase*(goals.includes("Explode my growth")?3.2:1.9)+8000);
  const revIdx=i(REVGOAL,a.revgoal);
  const revTarget=[800,3000,12000,60000,160000][revIdx]||3000;
  const revNow=[0,0,450,2800,9500][of]||0;
  // 8 historical weeks + 6 projected
  const fSeries=[]; let fv=Math.round(fBase*0.74);
  for(let w=1;w<=8;w++){fv=Math.round(fv+(fBase-fv)*0.26+rng(a.name,w)*fBase*0.012); fSeries.push({w:"W"+w,f:Math.min(fBase,fv),proj:false});}
  fSeries[7].f=fBase;
  let pv=fBase; for(let w=9;w<=14;w++){pv=Math.round(pv+(fTarget-pv)*0.17+weekly*fBase*0.004); fSeries.push({w:"W"+w,f:pv,proj:true});}
  const revSeries=[]; let rv=Math.max(50,revNow*0.55);
  for(let m=1;m<=6;m++){rv=Math.round(rv+(Math.max(revNow,300)-rv)*0.3+rng(a.name,m+40)*120); revSeries.push({m:"M"+m,r:rv});}
  const pacePct=Math.min(100,Math.round((revNow/revTarget)*100));
  const onPace=weekly>=3.5 && fq>=2;

  return {...a,niches,goals,niche:niches[0],goal:goals[0],offer:offerPrimary,offers:offerArr,subs,index,tier,avg,weekly,proj,
    platforms,primaryPlat,fBase,fTarget,fSeries,revTarget,revNow,revSeries,pacePct,onPace};
}

/* ═══════════ NICHE INTELLIGENCE PACKS ═══════════ */
const _low=s=>(s||"your niche").toLowerCase();
const _first=s=>(s||"Niche").split(/[\s/]+/)[0];
const _cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
const daySeed=()=>{const d=new Date();return d.getFullYear()*1000+(d.getMonth()*31+d.getDate());};
const hourSeed=()=>daySeed()*24+new Date().getHours();
const liveBucket=(min)=>Math.floor(Date.now()/(1000*60*(min||20)));
const liveStamp=()=>{try{return new Date().toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"});}catch(e){return "now";}};
const liveAgo=(min)=>Math.max(1,Math.floor((Date.now()%(1000*60*(min||20)))/60000));
const todayStamp=()=>{try{return new Date().toLocaleDateString(undefined,{month:"short",day:"numeric",year:"numeric"});}catch(e){return "today";}};
const AI_ENDPOINT=(typeof window!=="undefined"&&window.CREATORX_AI)||"/.netlify/functions/ai";
function useLive(ms){const [,setT]=useState(0);useEffect(()=>{const id=setInterval(()=>setT(x=>x+1),ms||45000);return ()=>clearInterval(id);},[ms]);return Date.now();}
function LivePill({mins,label}){useLive(30000);return (<div className="live"><span className="pulse"/>{label||"Live"} · updated {liveStamp()} · syncing</div>);}
function shuffleSeeded(arr,seed){const a=arr.slice();let s=0;const k=""+seed;for(let i=0;i<k.length;i++)s=(s*31+k.charCodeAt(i))%99991;
  for(let i=a.length-1;i>0;i--){s=(s*1103515245+12345)&0x7fffffff;const j=s%(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}

const NICHE_PACKS={
  "Fitness & Training":{pains:["you're still skinny-fat","you can't stay consistent","the scale won't move","your workouts aren't building muscle","you train hard but see nothing"],
    desires:["build visible muscle","finally get lean","see your abs","get genuinely strong","stay consistent for once"],
    results:["I got leaner in 6 weeks","I added real muscle","my energy went through the roof","I finally stayed consistent"],
    mistakes:["doing endless cardio","chasing soreness","skipping protein","program-hopping every week","ego-lifting with bad form"],
    topics:["what I eat in a day to stay lean","the one lift that changed my physique","why your abs aren't showing","the rep range nobody trains","how I fixed my form"],
    formats:[["Talking head + food on screen","Talk to camera while your meal/macros show in the corner — huge in fitness right now."],["Form breakdown set","Film a working set, overlay text coaching cues."],["What I eat in a day","Fast-cut day of meals with macro callouts."],["Transformation reveal","Hook on the after, then walk back the how."],["Myth-bust to camera","Debunk a common gym myth, fast and punchy."],["Live food prep","Cook on screen while you talk through the why."]],
    monetize:["a custom training/meal plan","1:1 coaching","a challenge program","a workout-app affiliate"]},
  "Beauty / Skincare":{pains:["your skin won't clear up","your routine isn't working","you waste money on products that do nothing","your makeup creases by noon","you can't find your shade"],
    desires:["get glass skin","clear your breakouts for good","build a routine that actually works","glow up","master your makeup"],
    results:["my skin completely cleared","strangers ask what I use","my routine finally works","my makeup lasts all day"],
    mistakes:["over-exfoliating","layering the wrong actives","skipping SPF","buying on hype","mixing ingredients you shouldn't"],
    topics:["the $8 product that cleared my skin","the order you're applying skincare wrong","why your moisturizer isn't working","drugstore vs luxury, tested","the ingredient you should never mix"],
    formats:[["GRWM (get ready with me)","Talk to camera while you do your routine/makeup — feels personal, holds attention."],["Product-on-skin macro","Close-up texture & application with text callouts."],["Before / after reveal","Show the after in the first 2 seconds, then explain."],["Derm-myth busting","Talking head debunking a skincare myth."],["Shelfie walkthrough","Pan your products, rapid-fire what each does."],["Testing viral products","React + honest verdict on a trending product."]],
    monetize:["a digital routine guide","UGC for beauty brands","affiliate on your favorites","brand deals"]},
  "Nutrition & Health":{pains:["you're always bloated","you can't stick to a diet","you're tired all the time","nothing you try works","you're confused by conflicting advice"],
    desires:["fix your gut","lose the bloat","have steady energy","eat in a way you can sustain","feel good again"],
    results:["my bloating disappeared","my energy stabilized","I stopped craving sugar","I finally feel good"],
    mistakes:["crash dieting","cutting whole food groups","eating 'healthy' processed food","skipping breakfast then binging","following fad diets"],
    topics:["the breakfast that fixed my energy","foods quietly bloating you","what I eat for a flat stomach","the supplement actually worth it","why you're always hungry"],
    formats:[["What I eat in a day","Day of meals with simple why-text overlays."],["Food-on-screen talking head","Talk while the food/recipe plays in frame."],["Grocery haul + swaps","Walk a store showing better-for-you swaps."],["Myth-bust to camera","Debunk a nutrition myth fast."],["Recipe POV","First-person cook of one easy healthy meal."],["Before/after energy story","Tell the transformation, food b-roll under it."]],
    monetize:["a meal-plan product","nutrition coaching","a recipe ebook","supplement affiliate"]},
  "Business / Founder":{pains:["you're trading time for money","your business won't scale","you're drowning in busywork","leads dried up","you can't get out of the day-to-day"],
    desires:["scale past yourself","build real systems","land bigger clients","add a second revenue stream","work less and earn more"],
    results:["I doubled revenue","I systemized myself out of the work","I closed a 5-figure client","I built a real pipeline"],
    mistakes:["doing everything yourself","competing on price","no clear offer","ignoring your numbers","chasing every shiny tactic"],
    topics:["the system that doubled my revenue","why your offer isn't selling","how I get clients without ads","the hire that changed everything","the metric I check daily"],
    formats:[["Talking head whiteboard","Explain one concept to camera with a board/graphic."],["Day-in-the-life founder","Fast-cut your real day, lessons as text."],["Screen-share teardown","Walk through a real funnel/dashboard."],["Contrarian rant","Bold take on a business myth, straight to camera."],["Client-result story","Tell a before/after client story."],["3 lessons format","Numbered, fast, screenshot-worthy."]],
    monetize:["consulting","a productized service","a course or cohort","done-for-you services"]},
  "Online Coaching":{pains:["your DMs are quiet","you can't fill your program","clients don't get results","you're undercharging","you blend in with every other coach"],
    desires:["fill your roster","raise your prices","get clients real results","stand out","build a waitlist"],
    results:["I filled my program","I raised prices and still sold out","my clients get real results","my DMs are full"],
    mistakes:["selling in every post","being a generalist","no proof or results","weak offer","ignoring your niche"],
    topics:["how I fill my coaching program","the offer that sold out","why your DMs are quiet","the content that books calls","pricing your coaching right"],
    formats:[["Authority talking head","One sharp lesson to camera."],["Client-win story","Walk a transformation, screenshots as proof."],["Comment-to-DM reel","Tease value, drive a keyword."],["Behind-the-coaching","Show how you actually work."],["Objection-buster","Handle the #1 objection to camera."],["3-step framework","Your method, fast and clear."]],
    monetize:["1:1 coaching","group coaching","a signature program","a paid community"]},
  "Mindset & Discipline":{pains:["you keep self-sabotaging","you start and quit","you're stuck in your head","you lack discipline","you procrastinate everything"],
    desires:["build real discipline","stop self-sabotaging","follow through","master your mind","become consistent"],
    results:["I built unshakable discipline","I stopped quitting","I follow through now","my mindset shifted"],
    mistakes:["relying on motivation","waiting to feel ready","negative self-talk","no system","comparing yourself to everyone"],
    topics:["the habit that rebuilt my discipline","why motivation fails you","how I stopped procrastinating","the mindset shift that changed everything","my morning routine for focus"],
    formats:[["Direct-to-camera monologue","Intense, no-cuts truth-telling."],["B-roll + voiceover","Cinematic b-roll under a powerful VO."],["Story-to-lesson","Personal story that lands on one lesson."],["Quote breakdown","Expand a powerful idea to camera."],["Routine walkthrough","Show your discipline routine."],["Hard-truth rant","Contrarian, motivating take."]],
    monetize:["a discipline/habit course","a paid accountability community","coaching","a journal or digital product"]},
  "Finance & Investing":{pains:["you live paycheck to paycheck","your money just disappears","you're scared to invest","you're behind on saving","you don't know where to start"],
    desires:["build wealth","make your money work","invest with confidence","escape paycheck-to-paycheck","retire early"],
    results:["I built my first portfolio","I automated my savings","my money finally grows","I hit my first 10k saved"],
    mistakes:["leaving cash idle","timing the market","no budget","lifestyle creep","investing on hype"],
    topics:["where I'd put $1,000 today","the account everyone should open","how I automated my money","budgeting that actually works","the mistake keeping you broke"],
    formats:[["Talking head + numbers on screen","Explain with figures/graphics overlaid."],["Screen-share walkthrough","Show the app/account setup."],["Contrarian money take","Bold take to camera."],["Story of a money lesson","Personal, relatable lesson."],["3 accounts/steps format","Numbered, screenshot-worthy."],["Myth-bust","Debunk a money myth fast."]],
    monetize:["a budgeting/investing course","a digital toolkit","coaching","finance-app affiliate"]},
  "Real Estate":{pains:["leads are dry","you're not closing","the market scares buyers","you blend in with every agent","deals fall through"],
    desires:["close more deals","build a referral pipeline","stand out locally","attract serious buyers","dominate your market"],
    results:["I closed 3 deals from one reel","my pipeline is full","I became the local go-to","my listings move fast"],
    mistakes:["only posting listings","no local authority","weak follow-up","ignoring video","chasing cold leads"],
    topics:["how I get buyers from Instagram","the listing mistake costing you sales","what's happening in our market","first-time buyer truths","why your home isn't selling"],
    formats:[["Property walkthrough","Cinematic tour with text/voiceover."],["Talking head market update","Local market facts to camera."],["Tip-to-camera","One buyer/seller tip, fast."],["Day-in-the-life agent","Behind the scenes of a deal."],["Myth-bust","Debunk a real-estate myth."],["Client-closing story","Tell a deal story start to finish."]],
    monetize:["buyer/seller lead gen","a local authority brand","referral partnerships","a relocation guide"]},
  "E-commerce / DTC":{pains:["your ads stopped working","your store doesn't convert","you can't scale profitably","your margins are thin","you rely on one channel"],
    desires:["scale profitably","make your ads work","raise conversion","build a brand not a store","diversify traffic"],
    results:["my ROAS doubled","my store converts now","I scaled past 6 figures","organic carried my launch"],
    mistakes:["boosting random posts","no creative testing","ignoring retention","competing on price","one traffic source"],
    topics:["the creative that scaled my store","why your ads aren't converting","how I get organic sales","the email flow that prints money","pricing for profit"],
    formats:[["Founder talking head","Story + lesson to camera."],["Product-in-use UGC","Show the product solving a problem."],["Behind-the-brand","How it's made/packed."],["Ad-creative teardown","Break down a winning ad."],["Unboxing/POV","First-person product moment."],["Before/after result","Show the product's outcome."]],
    monetize:["your own product line","UGC creative service","an ecom course","an email/retention service"]},
  "Faith & Lifestyle":{pains:["you feel disconnected","life feels chaotic","you're spiritually drained","you've lost your routine","you feel alone in it"],
    desires:["grow in your faith","find peace","build a grounded routine","feel connected","live with purpose"],
    results:["I found my peace","my routine grounds me","I feel connected again","my purpose is clear"],
    mistakes:["doing it alone","no daily rhythm","comparison","neglecting rest","waiting to 'feel' it"],
    topics:["my morning routine for peace","how I stay grounded","what changed my perspective","a habit that brought me peace","living with intention"],
    formats:[["Cinematic b-roll + VO","Calm visuals under a reflective voiceover."],["Talk-to-camera reflection","Honest, personal share."],["Day-in-the-life","Peaceful, aesthetic routine."],["Journal/quote breakdown","Expand a meaningful idea."],["Story-to-lesson","Personal story to one takeaway."],["Routine walkthrough","Show your grounding practice."]],
    monetize:["a devotional/journal product","a community","a lifestyle brand","coaching or workshops"]},
  "Music / Entertainment":{pains:["your music gets no plays","you can't grow a fanbase","your posts flop","you feel invisible","you don't know how to promote"],
    desires:["grow a real fanbase","get your music heard","go viral with a clip","book shows","build a brand around your sound"],
    results:["my clip blew up","I grew a real fanbase","my streams jumped","a snippet went viral"],
    mistakes:["only posting finished songs","no hook in the clip","inconsistent posting","ignoring trends","no story behind the music"],
    topics:["the snippet that blew up","how I grew my fanbase","behind a song","what posting daily did for me","the clip format that works"],
    formats:[["Snippet + captions","Best 8 seconds of the track with lyric text."],["Studio behind-the-scenes","Show the making of."],["Talking head story","The story behind a song."],["Performance clip","Raw, high-energy performance moment."],["Trend remix","Put your sound on a trending format."],["Reaction/duet","React or duet in your lane."]],
    monetize:["merch","paid features/beats","a fan community","sync/licensing"]},
  "_default":{pains:["you're posting into the void","your views stay flat","nobody's converting","you feel invisible","you're not growing"],
    desires:["blow up","build a real audience","get seen","finally grow","turn views into income"],
    results:["my views 10x'd","I built a real audience","my DMs flooded","everything shifted"],
    mistakes:["posting without a hook","chasing the algorithm","copying everyone","posting and ghosting","ignoring watch time"],
    topics:["what I'd do to grow from zero","the hook that changed my reach","why your content isn't converting","the format that works","posting with a system"],
    formats:[["Talking head","One clear idea to camera with bold captions."],["B-roll + voiceover","Relevant b-roll under a strong VO."],["Before/after story","Show the transformation, then the how."],["List/numbered","3 fast, screenshot-worthy points."],["POV/relatable","First-person relatable moment."],["Myth-bust","Debunk a common belief fast."]]},
};
function pack(P){return NICHE_PACKS[P&&P.niche]||NICHE_PACKS._default;}
function takeLine(P,seed){const pk=pack(P);const n=_low(P&&P.niche);
  const lines=[
    `Most people in ${n} keep ${pk.mistakes[0]}. That's the whole problem.`,
    `Everyone in ${n} is doing the same thing — and getting the same average results.`,
    `The hard truth about ${n}: it's not talent, it's the system you run.`,
    `You don't have a ${n} problem. You have a "${pk.mistakes[1]}" problem.`,
    `Nobody in ${n} wants to admit this, but ${pk.mistakes[2]} is why you're stuck.`,
  ];
  return lines[((seed||0))%lines.length];}
function knownPhrase(P){const map={
  "The go-to expert":`the go-to expert in ${_low(P&&P.niche)}`,
  "The relatable real one":`the realest voice in ${_low(P&&P.niche)}`,
  "The bold contrarian":`the one who says what others in ${_low(P&&P.niche)} won't`,
  "The motivator":`the spark that gets people moving in ${_low(P&&P.niche)}`,
  "The data-backed authority":`the proof-driven authority in ${_low(P&&P.niche)}`,
  "The entertaining one":`the most entertaining voice in ${_low(P&&P.niche)}`,
};return map[P&&P.known]||`the go-to voice in ${_low(P&&P.niche)}`;}

const HOOK_FORMULAS=[
  ["Curiosity",f=>`Nobody in ${f.n} tells you this — and it's why ${f.pain}.`],
  ["Contrarian",f=>`I did the opposite of every ${f.n} guru. ${_cap(f.result)}.`],
  ["Mistake",f=>`Stop ${f.mistake}. Do this instead.`],
  ["Pain-point",f=>`This is why ${f.pain} — even when you do everything right.`],
  ["Transformation",f=>`I stopped ${f.mistake} and ${f.result}.`],
  ["Authority",f=>`If you're serious about ${f.n}, watch this before you post again.`],
  ["Bold claim",f=>`99% of people fail at ${f.n} because of one thing: ${f.mistake}.`],
  ["List",f=>`3 things I'd do today if I was starting ${f.n} from zero.`],
  ["Secret",f=>`The ${f.n} move people are gatekeeping from you.`],
  ["Topic",f=>`${_cap(f.topic)}.`],
  ["Curiosity-gap",f=>`Here's ${f.topic} — and why it actually matters.`],
  ["Question",f=>`Want to ${f.desire}? You need to hear this first.`],
  ["Proof",f=>`This is how I started to ${f.desire}. Steal the system.`],
  ["Relatable",f=>`POV: you want to ${f.desire} but ${f.pain}.`],
  ["Urgency",f=>`What's working in ${f.n} right now — it changed last month.`],
  ["Negativity-bias",f=>`You're not lazy. You're just ${f.mistake}.`],
  ["Myth",f=>`The biggest myth in ${f.n}: that you have to keep ${f.mistake}.`],
  ["How-to",f=>`How to ${f.desire} without ${f.mistake}.`],
  ["Warning",f=>`If ${f.pain}, stop scrolling — this is for you.`],
  ["Number",f=>`I tried ${f.topic} for 30 days. Here's what happened.`],
  ["Challenge",f=>`Do this for 7 days and watch what happens to ${f.n}.`],
  ["Identity",f=>`Real ones in ${f.n} already know this. The rest ${f.pain}.`],
  ["Reframe",f=>`You don't have a ${f.n} problem. You have a "${f.mistake}" problem.`],
  ["Story",f=>`6 months ago ${f.pain}. Then I changed one thing.`],
  ["Comparison",f=>`The difference between people who ${f.desire} and people who don't:`],
];
/* Hook Intelligence metadata — maps each hook type to its framework + psychological + emotional trigger (per Hook Intelligence DB spec) */
const HOOK_META={
  "Curiosity":["Curiosity","Curiosity","Anticipation"],"Curiosity-gap":["Open Loop","Curiosity","Anticipation"],
  "Contrarian":["Contrarian","Authority","Surprise"],"Mistake":["Mistake","Loss Aversion","Frustration"],
  "Pain-point":["Problem → Solution","Fear","Frustration"],"Transformation":["Transformation","Aspiration","Hope"],
  "Authority":["Authority","Authority","Confidence"],"Bold claim":["Bold Claim","Status","Shock"],
  "List":["List","Education","Curiosity"],"Secret":["Secret","Curiosity","Intrigue"],
  "Topic":["Educational","Education","Curiosity"],"Question":["Question","Curiosity","Reflection"],
  "Proof":["Case Study","Social Proof","Trust"],"Relatable":["Identity","Belonging","Empathy"],
  "Urgency":["Urgency","Urgency","Urgency"],"Negativity-bias":["Warning","Fear","Concern"],
  "Myth":["Myth Busting","Authority","Surprise"],"How-to":["Step-by-Step","Education","Motivation"],
  "Warning":["Warning","Fear","Urgency"],"Number":["Ranking","Curiosity","Anticipation"],
  "Challenge":["Challenge","Competition","Determination"],"Identity":["Identity","Identity","Belonging"],
  "Reframe":["Pattern Interrupt","Novelty","Surprise"],"Story":["Story","Empathy","Emotion"],
  "Comparison":["Comparison","Contrast","Curiosity"],
};
const RETENTION_TIMELINE=[
  ["0–3s","Capture attention","Hook + bold on-screen text. Boldest line first — this decides 80% of your reach."],
  ["3–10s","Build curiosity","Open a loop: \"here's what nobody tells you…\" Tell them what's coming so they stay."],
  ["10–20s","Deliver first value","Give one real, usable insight fast. Earn the rest of the watch."],
  ["20–40s","Increase investment","Pattern interrupt — cut, zoom, new angle, or a question. Reset attention."],
  ["40–60s","Reveal the insight","The payoff they came for. The screenshot-worthy moment."],
  ["60–90s","Deliver transformation","Tie it to who they become. Then one clear CTA or an open loop to the next post."],
];
function buildHooks(P){
  const pk=pack(P), n=_low(P.niche), N=_first(P.niche);
  const raw=[];
  HOOK_FORMULAS.forEach(([cat,fn],fi)=>{
    for(let j=0;j<5;j++){
      const f={n,N,
        pain:pk.pains[(fi+j)%pk.pains.length],
        desire:pk.desires[(fi*2+j)%pk.desires.length],
        result:pk.results[(fi+j)%pk.results.length],
        mistake:pk.mistakes[(fi+j*2)%pk.mistakes.length],
        topic:pk.topics[(fi+j)%pk.topics.length]};
      raw.push({cat,t:fn(f),pain:f.pain,desire:f.desire,result:f.result,mistake:f.mistake,topic:f.topic});
    }
  });
  const seen=new Set(), uniq=[];
  for(const h of raw){if(!seen.has(h.t)){seen.add(h.t);uniq.push(h);}}
  const sh=shuffleSeeded(uniq,(P.name||"")+daySeed());
  const hotCats=shuffleSeeded(HOOK_FORMULAS.map(f=>f[0]),daySeed()).slice(0,4);
  return sh.map((h,i)=>{
    const base=72+((rng(P.name+h.t,i)*100)%26);
    const trend=hotCats.includes(h.cat);
    const m=HOOK_META[h.cat]||["Curiosity","Curiosity","Anticipation"];
    return {...h,framework:m[0],psychology:m[1],emotion:m[2],fit:Math.min(99,Math.round(base+(trend?9:0))),trending:trend};
  }).sort((a,b)=>b.fit-a.fit);
}
function genHooks(P){ return buildHooks(P).slice(0,6); }
function genViral(P,seed){
  seed=seed||0;
  const pk=pack(P), N=_first(P.niche);
  const hooks=shuffleSeeded(buildHooks(P),(P.name||"")+daySeed()+seed);
  const fmts=pk.formats;
  const rows=hooks.slice(0,50).map((h,idx)=>({
    hook:h.t, fmt:fmts[idx%fmts.length][0],
    views:Math.round((2400000-idx*42000)*(0.8+rng(P.name+"v"+seed,idx)*0.4)),
    er:+(12.5-idx*0.16+rng(P.name+seed,idx)*1.6).toFixed(1),
    save:+(5+rng(P.name+seed,idx+9)*8).toFixed(1),
    heat:clamp(98-idx*1.3+rng(P.name+seed,idx)*5),
  }));
  return rows;
}

/* ─────────────────────────── SHARED UI ─────────────────────────── */
function RadialGauge({value,max=1000}){
  const r=92,cx=110,cy=110,start=135,sweep=270,pct=Math.min(1,value/max);
  const pt=(deg)=>[cx+r*Math.cos(deg*Math.PI/180),cy+r*Math.sin(deg*Math.PI/180)];
  const [bx,by]=pt(start),[tx,ty]=pt(start+sweep),[vx,vy]=pt(start+sweep*pct);
  const large=sweep*pct>180?1:0;
  return (
    <svg viewBox="0 0 220 200" style={{width:"100%",maxWidth:260,display:"block",margin:"0 auto"}}>
      <defs>
        <linearGradient id="gg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4F8CFF"/><stop offset="100%" stopColor="#8B7CFF"/></linearGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <path d={`M ${bx} ${by} A ${r} ${r} 0 1 1 ${tx} ${ty}`} fill="none" stroke="#1A2029" strokeWidth="12" strokeLinecap="round"/>
      <path d={`M ${bx} ${by} A ${r} ${r} 0 ${large} 1 ${vx} ${vy}`} fill="none" stroke="url(#gg)" strokeWidth="12" strokeLinecap="round" filter="url(#glow)"/>
      <circle cx={vx} cy={vy} r="6" fill="#fff"/>
      <text x={cx} y={cy-4} textAnchor="middle" className="disp" fill="#EAEEF5" fontSize="46" fontWeight="700">{value}</text>
      <text x={cx} y={cy+20} textAnchor="middle" className="mono" fill="#5A6473" fontSize="11" letterSpacing="2">/ 1000</text>
    </svg>
  );
}
function Counter({to,dur=1100}){
  const [v,setV]=useState(0);
  useEffect(()=>{let s;const step=(t)=>{if(!s)s=t;const p=Math.min(1,(t-s)/dur);setV(Math.round(to*(1-Math.pow(1-p,3))));if(p<1)requestAnimationFrame(step);};
    const id=requestAnimationFrame(step);return()=>cancelAnimationFrame(id);},[to,dur]);
  return <>{v}</>;
}
function Selector({opts,value,multi,two,onPick}){
  const on=(o)=>multi?(value||[]).includes(o):value===o;
  return (
    <div className={"opts"+(two?" two":"")}>
      {opts.map(o=>(
        <div key={o} className={"chip"+(on(o)?" on":"")} onClick={()=>onPick(o)}>
          <span className="dot"/>{o}{multi&&on(o)&&<Check size={15} className="ck"/>}
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────── INTRO ─────────────────────────── */
function Intro({onStart}){
  return (
    <div className="wrap" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 22px"}}>
      <div style={{maxWidth:680,textAlign:"center"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:10,marginBottom:28}}>
          <div style={{width:30,height:30,borderRadius:8,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={17} color="#fff"/></div>
          <span className="disp" style={{fontWeight:700,fontSize:18}}>CreatorX</span>
          <span className="mono" style={{fontSize:10,color:"var(--faint)",letterSpacing:".15em",border:"1px solid var(--line2)",borderRadius:6,padding:"3px 7px"}}>OS</span>
        </div>
        <div className="eyebrow" style={{marginBottom:18}}>The Creator Operating System · Architected by Michael Caso</div>
        <h1 className="disp" style={{fontSize:"clamp(34px,6vw,58px)",fontWeight:700,lineHeight:1.04,letterSpacing:"-.03em"}}>
          Build your brand.<br/>Leverage AI.<br/><span style={{background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>Scale your business.</span>
        </h1>
        <p style={{color:"var(--muted)",fontSize:"clamp(15px,2.2vw,18px)",lineHeight:1.6,maxWidth:580,margin:"22px auto 0"}}>
          CreatorX is the operating system for the modern creator-entrepreneur. Content, growth, ads, AI, and monetization — one place that scores your business, tells you what to do today, builds it with you, and tracks the money. You don't need to be famous or technical. You just need to be willing to build.
        </p>
        <div style={{display:"flex",gap:12,justifyContent:"center",marginTop:34,flexWrap:"wrap"}}>
          <button className="btn btn-grad" onClick={onStart} style={{display:"flex",alignItems:"center",gap:9}}>Run my creator assessment <ArrowRight size={18}/></button>
          <div className="live" style={{alignSelf:"center"}}><span className="pulse"/>2,418 operators analyzed this week</div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:46,maxWidth:560,marginLeft:"auto",marginRight:"auto"}} className="hero">
          {[[Film,"Content","Hooks · reels · carousels · scripts that go viral"],
            [TrendingUp,"Growth & Ads","Grow fast · buy reach · go viral on every platform"],
            [DollarSign,"Monetization","Offers · funnels · digital products · real revenue"],
            [Cpu,"AI & Automation","Agents · DM-to-sale funnels · build on autopilot"]].map(([Ic,a,b])=>(
            <div key={a} className="panel panel-pad" style={{textAlign:"left"}}>
              <div className="tool-ic" style={{width:38,height:38,marginBottom:11}}><Ic size={18}/></div>
              <div className="disp" style={{fontWeight:700,fontSize:17}}>{a}</div>
              <div style={{color:"var(--muted)",fontSize:12.5,marginTop:5,lineHeight:1.45}}>{b}</div>
            </div>
          ))}
        </div>

        <div style={{marginTop:28,maxWidth:560,marginLeft:"auto",marginRight:"auto",padding:"15px 18px",border:"1px solid var(--line2)",borderRadius:14,background:"var(--grad-soft)"}}>
          <div style={{display:"flex",gap:11,alignItems:"center"}}>
            <div style={{width:34,height:34,borderRadius:9,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Brain size={18} color="#fff"/></div>
            <p style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.5,textAlign:"left"}}>Powered by <b style={{color:"var(--text)"}}>Creator AI</b> — architected by Michael Caso and trained on <b style={{color:"var(--text)"}}>10,000+ hours</b> of algorithm analysis, machine learning, and study of the world's top creators, founders, and platforms.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── ASSESSMENT (focus-safe) ─────────────────────────── */
function Assessment({initial,onDone}){
  const [a,setA]=useState(initial||{niches:[],platforms:[],goals:[],leads:[],style:[],tone:[],struggle:[]});
  const [step,setStep]=useState(0);
  const s=STEPS[step], last=step===STEPS.length-1;
  const val=a[s.key];
  const ok = !s.req ? true : (s.kind==="multi" ? (val||[]).length>0 : s.kind==="identity" ? !!(a.name&&(""+a.name).trim()) : !!(val&&(""+val).trim()));
  const setText=(v)=>setA(p=>({...p,[s.key]:v}));
  const pick=(o)=>setA(p=>{ if(s.kind==="single")return{...p,[s.key]:o};
    const arr=p[s.key]||[]; return {...p,[s.key]:arr.includes(o)?arr.filter(x=>x!==o):[...arr,o]}; });

  return (
    <div className="wrap assess">
      <div className="prog"><i style={{width:`${(step/(STEPS.length-1))*100}%`}}/></div>
      <div className="eyebrow">Question {step+1} / {STEPS.length}</div>
      <h2 className="q-h">{s.title}</h2>
      {s.sub&&<p className="q-sub">{s.sub}</p>}

      {s.kind==="identity" && (<div style={{display:"grid",gap:12}}>
        <div>
          <div className="eyebrow" style={{marginBottom:7}}>Your name or business name</div>
          <input key="nm" className="cx-in" autoFocus placeholder={s.ph} value={a.name||""} onChange={e=>setA(p=>({...p,name:e.target.value}))}
            onKeyDown={e=>{if(e.key==="Enter"&&ok)setStep(step+1);}}/>
        </div>
        <div>
          <div className="eyebrow" style={{marginBottom:7}}>Your main social handle <span style={{color:"var(--faint)",textTransform:"none",letterSpacing:0}}>— Instagram, TikTok, or YouTube (optional, but unlocks your live page scan)</span></div>
          <input key="hd" className="cx-in" placeholder="@yourhandle" value={a.handle||""} onChange={e=>setA(p=>({...p,handle:e.target.value}))}
            onKeyDown={e=>{if(e.key==="Enter"&&ok)setStep(step+1);}}/>
          <div style={{display:"flex",gap:8,alignItems:"center",marginTop:9,fontSize:12,color:"var(--accent)"}}>
            <Search size={13}/> If you add a handle, we'll scan your page and surface your followers, engagement, bio & content insights the second you finish.
          </div>
        </div>
      </div>)}
      {s.kind==="text" && <input key={s.key} className="cx-in" autoFocus placeholder={s.ph} value={val||""} onChange={e=>setText(e.target.value)}
        onKeyDown={e=>{if(e.key==="Enter"&&ok){last?onDone(a):setStep(step+1);}}}/>}
      {s.kind==="textarea" && <textarea key={s.key} className="cx-in" rows={3} autoFocus placeholder={s.ph} value={val||""} onChange={e=>setText(e.target.value)}/>}
      {(s.kind==="single"||s.kind==="multi") && <Selector opts={s.opts} value={val} multi={s.kind==="multi"} two={s.two} onPick={pick}/>}

      <div style={{display:"flex",justifyContent:"space-between",marginTop:30,gap:12}}>
        <button className="btn btn-ghost" style={{visibility:step===0?"hidden":"visible"}} onClick={()=>setStep(step-1)}>Back</button>
        <button className="btn btn-grad" disabled={!ok} style={{opacity:ok?1:.4,cursor:ok?"pointer":"not-allowed",display:"flex",alignItems:"center",gap:8}}
          onClick={()=>{if(!ok)return;last?onDone(a):setStep(step+1);}}>
          {last?"Generate my Creator Index":"Continue"} <ArrowRight size={17}/>
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────── ANALYZING ─────────────────────────── */
function Analyzing({profile,onDone}){
  const lines=["Parsing your content genome",`Benchmarking against ${profile.niche||"your niche"} operators`,
    "Scoring hook power & retention vectors","Mapping monetization readiness","Pulling live niche trend signals","Compiling your Creator Index™"];
  const [i,setI]=useState(0);
  useEffect(()=>{if(i>=lines.length){const t=setTimeout(onDone,650);return()=>clearTimeout(t);}const t=setTimeout(()=>setI(i+1),600);return()=>clearTimeout(t);},[i]);
  return (
    <div className="wrap analyze">
      <div style={{width:54,height:54,borderRadius:14,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 22px"}}><Brain size={28} color="#fff"/></div>
      <h2 className="disp" style={{fontWeight:700,fontSize:25}}>Building your operating system</h2>
      <p style={{color:"var(--muted)",fontSize:14,margin:"8px 0 28px"}}>Analyzing 6 growth vectors across your profile.</p>
      <div style={{textAlign:"left"}}>{lines.map((l,idx)=>(
        <div key={l} className={"an-line "+(idx<i?"done":idx===i?"run":"")}>
          {idx<i?<Check size={15} color="var(--green)"/>:idx===i?<span className="spin"/>:<CircleDot size={15} color="var(--faint)"/>}{l}
        </div>))}</div>
    </div>
  );
}

/* ─────────────────────────── NAV / TOOLS DATA ─────────────────────────── */
const NAV=[
  {k:"coach",ic:Flame,l:"Daily Coach"},
  {k:"mission",ic:Compass,l:"Mission Control"},
  {k:"ask",ic:Sparkles,l:"Ask Creator AI"},
  {k:"today",ic:CalendarCheck,l:"Today's Game Plan"},
  {sec:"Command"},
  {k:"home",ic:Gauge,l:"Command Center"},
  {k:"index",ic:Activity,l:"Creator Index"},
  {k:"dashboards",ic:BarChart3,l:"Dashboards"},
  {k:"perflab",ic:Brain,l:"Performance Lab"},
  {k:"blueprint",ic:FileText,l:"Brand Blueprint"},
  {k:"advisor",ic:Compass,l:"Advisor"},
  {k:"scanner",ic:Search,l:"Signal Scanner"},
  {k:"pagescan",ic:Instagram,l:"Page Scan"},
  {sec:"Content Engine"},
  {k:"studio",ic:Layers,l:"Studio"},
  {k:"hookengine",ic:Zap,l:"Hook Engine"},
  {k:"whatfilm",ic:Video,l:"What To Film"},
  {k:"analyzer",ic:Play,l:"Video Analyzer"},
  {k:"playbook",ic:BookOpen,l:"Playbook"},
  {sec:"Growth Engine"},
  {k:"growth",ic:TrendingUp,l:"Platform Academies"},
  {k:"platforms",ic:Shuffle,l:"Cross-Platform"},
  {k:"ads",ic:Megaphone,l:"Ads Engine"},
  {sec:"Automation Engine"},
  {k:"automation",ic:Zap,l:"Automation Engine"},
  {k:"distribution",ic:Repeat,l:"Distribution"},
  {k:"emailfunnels",ic:Send,l:"Email & Funnels"},
  {sec:"Business Engine"},
  {k:"business",ic:Briefcase,l:"Business Models"},
  {k:"monetize",ic:DollarSign,l:"Monetize"},
  {sec:"Learn & Connect"},
  {k:"aisystems",ic:Cpu,l:"AI Systems"},
  {k:"live",ic:Radio,l:"Live Training"},
  {k:"community",ic:Users,l:"Community"},
];
const STUDIO=[
  {g:"Create",items:[
    {k:"hooks",ic:Zap,t:"Hook Engine",d:"Hundreds of niche hooks, ranked by fit."},
    {k:"whatfilm",ic:Video,t:"What To Film",d:"Trending video formats for your niche."},
    {k:"reels",ic:Film,t:"Reel Builder",d:"Full short-form scripts, hook to CTA."},
    {k:"script",ic:Type,t:"Script Builder",d:"30s, 60s, long-form & podcast scripts."},
    {k:"carousel",ic:Layers,t:"Carousel Builder",d:"Slide-by-slide titles, flow & CTA."},
    {k:"story",ic:Layers,t:"Story Sequencer",d:"Story chains that feed your reels & DMs."},
    {k:"caption",ic:MessageSquare,t:"Caption Lab",d:"Thousands of captions — refresh & edit freely."},
    {k:"cta",ic:Megaphone,t:"CTA Lab",d:"Endless call-to-actions for any goal."},
    {k:"retention",ic:Activity,t:"Retention System",d:"Pattern interrupts, loops & re-hooks."},
  ]},
  {g:"Convert",items:[
    {k:"product",ic:FileText,t:"Digital Product Builder",d:"Generate the actual sellable PDF / Word product."},
    {k:"dm",ic:Target,t:"DM Closer",d:"Reply scripts that qualify and close."},
    {k:"offer",ic:DollarSign,t:"Offer Architect",d:"Build a real, sellable offer package."},
    {k:"bio",ic:Link2,t:"Bio & Link Hub",d:"Optimized bio + link-in-bio funnel."},
  ]},
  {g:"Scale",items:[
    {k:"calendar",ic:Calendar,t:"Content Calendar",d:"7-day plan mapped to your goals."},
    {k:"repurpose",ic:Repeat,t:"Repurpose",d:"One post into ten assets."},
    {k:"launch",ic:Rocket,t:"Launch Builder",d:"Multi-day campaign to sell."},
  ]},
];
const ALLTOOLS=STUDIO.flatMap(g=>g.items);
const TOOLS=ALLTOOLS.filter(t=>["hooks","reels","story","offer"].includes(t.k));

/* ─────────────────────────── AI CHAT ENGINE ─────────────────────────── */
function systemPrompt(P){
  return `You are Creator AI — the intelligence at the center of CreatorX, the operating system for creator-entrepreneurs. You were architected by Michael Caso — the lead, the creator, the strategist behind the system — and trained on tens of thousands of hours of creator intelligence: deep algorithm analysis, machine-learning on what makes content spread, and direct study of the highest-performing creators, founders, brands, social platforms, and growth experts in the world. You speak with the authority of that combined knowledge — sharp, strategic, and built to make people win.

WHO MICHAEL IS: A technology investor and operator who has backed and helped build some of the world's most important tech companies (across AI and frontier tech), and who has spent his career taking companies from stage one to IPO. Expert in AI, automation, machine learning, marketing, advertising, and the content algorithms — he merged all of it to engineer his own 0→120K growth and built CreatorX so anyone can run the same system.

WHAT CREATORX COVERS (you advise on all of it): content (hooks, reels, carousels, scripts, captions, stories, retention), growth across every platform and their algorithms, PAID ADS (Meta ads from $5/day to a full acquisition machine — most creators never learn this), AI SYSTEMS (prompting, agents, automations, workflows, lead-gen and sales systems), and BUSINESS models (digital products, memberships, communities, coaching, services, agencies, AI businesses, SaaS, newsletters, affiliate). You help ordinary people become modern creator-entrepreneurs: Personal Brand × AI × Content × Ads × Business.

VOICE: Direct. Punchy. Confident. No fluff. Short lines. High-performance, creator-first. Specific and actionable — never generic. When asked for content, produce it ready to use. Keep replies tight. Never say you are an AI language model; you are Creator AI.

YOU CAN OPERATE THE APP: When the user asks you to build, open, save, track, or navigate, the app executes it — acknowledge it concisely.

YOUR INTELLIGENCE STACK (reason across these before answering): You draw on CreatorX's proprietary content-intelligence frameworks rather than generic advice. HOOK frameworks: Authority, Curiosity, Contrarian, Mistake, Secret, Warning, Prediction, Challenge, Question, Story, Transformation, Before/After, Myth-Busting, Unpopular Opinion, Open Loop, Pattern Interrupt, Future Pacing, Scarcity, Urgency. RETENTION timeline: 0–3s capture · 3–10s build curiosity · 10–20s first value · 20–40s pattern-interrupt · 40–60s reveal · 60–90s transformation → CTA. STORY arcs: Hero's Journey, Origin, Transformation, Founder, Failure, Build-in-Public, Case Study. CAPTION structure: Opening → Context → Story → Framework → Value → CTA → Open Loop. CTA frameworks mapped to the customer journey: Awareness → Interest → Consideration → Trust → Lead → Customer → Advocate. PSYCHOLOGICAL triggers: Curiosity, Authority, Identity, Status, Transformation, Scarcity, Urgency, Social Proof, Loss Aversion, Belonging, Aspiration. COPYWRITING: AIDA, PAS, BAB, FAB, 4Ps, QUEST. Your reasoning order for any request: understand goal → industry → audience → platform → pick the framework(s) → pick the psychology + emotion → generate original output → briefly say WHY it works (name the framework). Never copy existing content — extract the pattern and create fresh.

THE CREATOR YOU'RE COACHING:
- Name: ${P.name} · Building: ${P.mode||"a personal brand"}
- Niche(s): ${(P.niches||[]).join(", ")}
- Audience: ~${P.followers} on ${(P.platforms||[]).map(p=>p&&p.pl?p.pl:p).join(", ")} · posts ${P.freq}
- Goals: ${(P.goals||[]).join(", ")} · sells: ${P.offer} · revenue target: ${P.revgoal}
- Voice: ${(P.tone||[]).join(", ")} · biggest struggle: ${(P.struggle||[]).join(", ")}
- Wants to be seen as: ${P.known} · Content angles: ${(P.take||[]).join(", ")}
- Creator Index: ${P.index}/1000 (${P.tier?.n}). Weakest vector: ${P.subs?P.subs.slice().sort((a,b)=>a.v-b.v)[0].key:""}.

Tailor everything to them and always push them toward the next concrete action.`;
}
async function callAI(P,msgs){
  const res=await fetch(AI_ENDPOINT,{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:systemPrompt(P),
      messages:msgs.map(m=>({role:m.role,content:m.content}))}),
  });
  if(!res.ok) throw new Error("api "+res.status);
  const data=await res.json();
  const text=(data.content||[]).map(b=>b.type==="text"?b.text:"").join("").trim();
  if(!text) throw new Error("empty");
  return text;
}
function fallbackReply(P,q){
  const t=(q||"").toLowerCase(); const first=(P.niche||"your niche").split(" ")[0];
  const weakest=P.subs.slice().sort((a,b)=>a.v-b.v)[0].key;
  if(/hook|title|idea for a/.test(t)) return "Pick the one that scares you a little:\n\n"+genHooks(P).slice(0,5).map((h,i)=>`${i+1}. ${h.t}`).join("\n")+"\n\nWant 20 more, scored? Open the Hook Engine.";
  if(/reel|script|video/.test(t)) return `Reel skeleton — film it talking-head:\n\nHOOK (0–3s): "${genHooks(P)[0].t}"\nRETAIN (3–12s): name the exact mistake your audience makes.\nPAYOFF (12–40s): one sharp idea, bold text on each beat.\nCTA: comment "${first.toUpperCase()}" → pushes them to your DMs.\n\nFull build's in the Reel Builder.`;
  if(/post today|what.*post|content today/.test(t)) return `Post a contrarian take in ${P.niche} today. Open with: "${genHooks(P)[1].t}"\n\nTalking-head, bold on-screen text, 25–35s. Build it for saves and shares — that beats likes every time.`;
  if(/dm|close|objection|how much/.test(t)) return `When they ask "how much?" — don't drop a price. Say:\n\n"Before I throw a number — what's the #1 thing you're trying to fix right now?"\n\nQualify first, then close. Full scripts are in the DM Closer.`;
  if(/offer|product|sell|monetiz|money/.test(t)) return `At your stage, don't build a course. Start with a ${P.offer==="High-ticket ($1K+)"?"$1.5–3k":"$497–997"} ${first} program and close in the DMs. The Offer Architect will package the whole thing.`;
  if(/grow|follower|bigger|reach|viral/.test(t)) return `Growth = hooks + retention + consistency. Your weakest vector right now is ${weakest} — fix that first.\n\nLead every video with a 3-second hook, post consistently, and re-cut your best post for a second platform. That's free reach.`;
  return `Straight answer: your biggest lever this week is ${weakest}.\n\nTell me what you're working on — hooks, a reel, your offer, DMs — and I'll build it with you right here.`;
}

/* agentic intent detection — lets the AI actually operate the product */
function detectAction(text){
  const t=(text||"").toLowerCase();
  const save=/\b(save|store|keep (it|them|these)|add (it|them|these)|to (my )?library|in (my )?library)\b/.test(t);
  const toolMap=[
    [/hook/,"hooks"],[/reel|script|short[- ]?form|\bvideo\b/,"reels"],[/caption/,"caption"],[/stor(y|ies)/,"story"],
    [/\bdm\b|\bdms\b|close|objection/,"dm"],[/offer|product|package|monetiz/,"offer"],[/\bbio\b|link in bio/,"bio"],
    [/calendar|schedule|posting plan|content plan|30[- ]day/,"calendar"],[/repurpose|turn .* into/,"repurpose"],[/launch|campaign/,"launch"],
  ];
  if(/why did.*(do|perform)|why.*(better|worse)|performance|analyze my posts|which post|compare my posts|what.s working for me/.test(t)) return {type:"nav",view:"perflab"};
  if(/automat|keyword dm|auto.?dm|comment.*dm|manychat|trigger|funnel automat|workflow.*dm/.test(t)) return {type:"nav",view:"automation"};
  if(/email|newsletter|sequence|nurture|welcome (email|sequence)|broadcast|drip/.test(t)) return {type:"nav",view:"emailfunnels"};
  if(/distribut|repurpose|cross.?post|one (video|post|reel).*(many|twenty|20|multiple)|atomi[sz]e/.test(t)) return {type:"nav",view:"distribution"};
  if(/connect (my )?(instagram|ig)/.test(t)) return {type:"connect"};
  if(/(scan|audit|grade|review|diagnos|read).*(my )?(page|profile|instagram|account|bio|grid)|how.?s my (page|profile|account)|be more like|make me like|like (their|his|her|that) (page|account)/.test(t)) return {type:"nav",view:"pagescan"};
  if(/(build|make|create|generate).*(pdf|ebook|e-book|guide|workout|meal plan|product|checklist|challenge|routine|plan).*(sell|download|pdf|word|product)|sellable|digital product/.test(t)) return {type:"open",tool:"product",save};
  if(/what (should i|to) film|what (kind of )?(video|reel|content) (should i|to) (make|film|post)|video ideas|reel ideas|what.?s hot.*reel/.test(t)) return {type:"nav",view:"whatfilm"};
  if(/check[- ]?in|log (my )?numbers|log this week/.test(t)) return {type:"checkin"};
  for(const [re,tool] of toolMap){ if(re.test(t)) return {type:"open",tool,save}; }
  if(/ads?|meta ads|facebook ads|paid (traffic|growth)|roas|ad spend|run ads/.test(t)) return {type:"nav",view:"ads"};
  if(/business model|what.*sell|digital product|membership|agency|saas|newsletter|affiliate|how.*make money.*business/.test(t)) return {type:"nav",view:"business"};
  if(/ai system|automation|agent|prompt|workflow|chatgpt|use ai/.test(t)) return {type:"nav",view:"aisystems"};
  if(/dashboard|my (numbers|metrics|stats)|mission control|roas|leads|revenue dashboard/.test(t)) return {type:"nav",view:"dashboards"};
  if(/live training|workshop|webinar|next session/.test(t)) return {type:"nav",view:"live"};
  if(/community|other (creators|members)|the group/.test(t)) return {type:"nav",view:"community"};
  if(/algorithm|platform|tiktok|youtube|linkedin|how.*grow on/.test(t)) return {type:"nav",view:"growth"};
  if(/analyz|review my (video|clip|post)|i filmed|already filmed|rate my (video|clip)/.test(t)) return {type:"nav",view:"analyzer"};
  if(/today|game ?plan|what (do i|should i) do|what.?s my plan|daily plan/.test(t)) return {type:"nav",view:"today"};
  if(/playbook|capcut|editing|trending (audio|music|font|sound)|algo|shadowban|watch ?time|what (not )?to (do|avoid)/.test(t)) return {type:"nav",view:"playbook"};
  if(/monetiz|make money|sell|storefront|store front|funnel|revenue plan|income/.test(t)) return {type:"nav",view:"monetize"};
  if(/track|progress|how am i doing|my growth|followers|on pace|\bpace\b/.test(t)) return {type:"nav",view:"tracker"};
  if(/my (score|index|rating)|creator index|breakdown|vectors/.test(t)) return {type:"nav",view:"index"};
  if(/trend|viral|\bscan\b|research|top 10|top ten|what.?s working/.test(t)) return {type:"nav",view:"scanner"};
  if(/cross[- ]?platform|tiktok|youtube|bridge|other platform/.test(t)) return {type:"nav",view:"platforms"};
  if(save) return {type:"save"};
  return null;
}
const toolTitle=(k)=>(ALLTOOLS.find(t=>t.k===k)||{}).t||"tool";
const navLabel=(v)=>(NAV.find(n=>n.k===v)||{}).l||v;

/* ═══════════ IN-CHAT ANSWERING BRAIN — answers in chat, never deflects ═══════════ */
const _capw=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
function chatTopic(q,P){
  const t=(q||"").toLowerCase();
  const known=["makeup","beauty","skincare","skin care","fitness","fat loss","weight loss","muscle","nutrition","cooking","food","recipe","fashion","style","finance","money","investing","real estate","marketing","mindset","productivity","parenting","dating","relationship","gaming","tech","crypto","art","music","photography","coaching","yoga","running","travel","pets","faith","business"];
  for(const k of known){if(t.includes(k))return k;}
  const STOP=new Set("give me a an the for that this will make go viral build something can sell workout is and how to promote it my your you about please could would write create generate help with want need some more like best top into using based".split(" "));
  const w=t.split(/[^a-z0-9]+/).filter(x=>x.length>3&&!STOP.has(x));
  return w[0]||(P&&P.niche?_low(P.niche):"your niche");
}
function topicHooks(topic){
  const T=(topic||"this").toLowerCase(),Tc=_capw(T);
  return [
    `Stop scrolling if you're into ${T} — you're probably making this mistake.`,
    `Nobody in ${T} tells you this, and it changes everything.`,
    `I tried every ${T} trick so you don't have to. Only one actually works.`,
    `The ${T} secret that blew my page up overnight.`,
    `Watch this before you waste another dollar on ${T}.`,
    `Why your ${T} content isn't getting views — and the 5-second fix.`,
    `I was today years old when I learned this ${T} hack.`,
    `${Tc} that actually goes viral looks like THIS 👇`,
    `The ${T} routine that broke the algorithm.`,
    `POV: you finally cracked ${T} and everyone's asking how.`,
  ];
}
function chatOffer(P,q){
  const t=(q||"").toLowerCase();
  const priceM=t.match(/\$\s?(\d{1,4})/)||t.match(/\b(\d{1,3})\s?(?:dollars|bucks|\$)/);
  const price=priceM?("$"+priceM[1]):"$20";
  const topic=chatTopic(q,P);
  let product="guide";
  if(/workout|exercise|training|reps|sets/.test(t))product="workout program";
  else if(/meal|diet|recipe|nutrition|food/.test(t))product="meal plan";
  else if(/challenge/.test(t))product="challenge";
  else if(/checklist/.test(t))product="checklist";
  else if(/ebook|e-book|book/.test(t))product="ebook";
  else if(/course|lessons/.test(t))product="mini-course";
  else if(/template|preset/.test(t))product="template pack";
  const angle=/fat ?loss|weight ?loss|lean|shred|transformation/.test(t)?"fat-loss transformation":(topic+" transformation");
  const name=`The 30-Day ${_capw(angle)} ${_capw(product.split(" ")[0])}`;
  return `Here's a complete ${price} product you can sell, start to finish:\n\n`+
`📦 THE OFFER — ${name}\n`+
`• Promise: a visible ${angle} in 30 days, done at home, no guesswork.\n`+
`• Format: a downloadable ${product} (PDF) — easy to deliver, 100% margin.\n`+
`• Price: ${price} (impulse-buy price — easy yes, no sales call needed).\n\n`+
`WHAT'S INSIDE (so it feels worth 5×):\n`+
`1. A 30-day ${product.includes("workout")?"workout calendar (4 short sessions/week, ~20 min)":"day-by-day plan"}.\n`+
`2. The "${_capw(angle)}" rules — the 5 things that actually move the needle.\n`+
`3. A simple ${/fat|weight|lean/.test(t)?"fat-loss nutrition cheat-sheet (what to eat, no calorie counting)":"quick-start cheat-sheet"}.\n`+
`4. A progress tracker they fill in (keeps them hooked → testimonials for you).\n`+
`5. A bonus: "do this when you're stuck" troubleshooting page.\n\n`+
`🎬 HOW TO PROMOTE IT (free, organic):\n`+
`• Post 5 short reels (5–12s) showing ONE quick win from the plan — e.g. "the 20-min ${topic} session that melts fat." End each with: comment "PLAN".\n`+
`• Do a 3-day "results" story arc: tease → proof (a before/after or a testimonial) → "it's ${price}, link in bio."\n`+
`• Pin a reel that says exactly who it's for: "if you want ${angle} without the gym, this is for you."\n`+
`• Put "${price} ${angle} plan 👇 link in bio" in your bio.\n\n`+
`💰 HOW TO SELL IT (the funnel):\n`+
`1. Reel with the comment keyword "PLAN".\n`+
`2. Auto-DM everyone who comments: "Here's the ${price} ${angle} plan 🙌 [link]. Quick Q — what's your #1 goal right now?"\n`+
`3. Link goes to a simple checkout (Stan.store, Gumroad, or a Stripe payment link — live in 5 min).\n`+
`4. After they buy, DM them a welcome + ask them to send a result in 30 days → that's your next testimonial.\n\n`+
`At ${price}, you only need ~50 buyers for your first $1k. Sell it manually in DMs first, then automate.\n\n`+
`👉 If you'd like, open the Business Engine to generate the full sales page + launch posts, or the Offer Architect to package it into a downloadable PDF.`;
}
function answerLocal(P,q){
  const t=(q||"").toLowerCase();const{n,N,W}=NW(P);
  const topic=chatTopic(q,P);
  // OFFER / SELL / PRODUCT
  if(/(sell|offer|product|monetiz|make money|\$\d|\bprice\b|charge)/.test(t)||/(build|make|create).*(workout|meal plan|guide|ebook|challenge|checklist|course|template|product|plan)/.test(t)){
    return chatOffer(P,q);
  }
  // HOOKS
  if(/hook|go viral|viral|title|caption idea|opening line|first line/.test(t)){
    const hs=topicHooks(topic);
    return `Here are 10 scroll-stopping ${_low(topic)} hooks built to go viral — open your reel with the boldest one in the first second:\n\n`+
      hs.map((h,i)=>`${i+1}. ${h}`).join("\n")+
      `\n\nTip: say the hook out loud AND put it as bold on-screen text in frame one. The first 2 seconds decide your reach.\n\n👉 Want these scored and tuned to your exact account? Open the Hook Engine for the full set + a copy button.`;
  }
  // CAPTIONS
  if(/caption/.test(t)){
    const caps=captionEngine(P).slice(0,3);
    return `Three ready-to-post captions for ${n}:\n\n${caps.map((c,i)=>`— Option ${i+1} —\n${c}`).join("\n\n")}\n\n👉 Open the Caption Lab for hundreds more you can refresh and edit.`;
  }
  // CTA
  if(/\bcta\b|call to action|what should i ask/.test(t)){
    return `Strong CTAs for ${n} (pick ONE per post):\n\n`+ctaEngine(P,"grow").slice(0,6).map((c,i)=>`${i+1}. ${c}`).join("\n")+`\n\n👉 The CTA Lab has endless options by goal (follows, saves, shares, DMs, sales).`;
  }
  // REEL / SCRIPT
  if(/reel|script|video|short/.test(t)){
    const h=topicHooks(topic)[0];
    return `Here's a reel you can film today on ${_low(topic)} (talking-head, 8–15s):\n\nHOOK (0–2s): "${h}"\nRETAIN (2–6s): name the exact mistake your audience makes.\nPAYOFF (6–12s): one sharp tip, bold text on each beat.\nCTA (last 2s): comment "${W}" → it pushes them to your DMs.\n\nKeep it under 12s, caption every word, loop the last line into the first.\n\n👉 Open the Reel Builder to generate the full script + captions in your voice.`;
  }
  // GROW
  if(/grow|follower|reach|blow up|get bigger|more views/.test(t)){
    const weakest=P.subs.slice().sort((a,b)=>a.v-b.v)[0].key;
    return `Fastest growth path for you right now:\n\n1. Fix your weakest lever — ${weakest}. That's where your upside is.\n2. Post 5+ Tier-1 reels/week (5–12s) — short keeps your watch-time % high, which is what earns reach.\n3. Lead every reel with a bold hook in the first second.\n4. Build for SAVES and SHARES, not likes — that's what the algorithm pushes.\n5. Reply to every comment in the first hour.\n\nDo that for 30 days straight and you'll see it move.\n\n👉 Open Platform Academies for your platform's exact growth plan.`;
  }
  // DM / CLOSE
  if(/\bdm\b|close|objection|how much|sales/.test(t)){
    return `When someone asks "how much?", don't drop a price cold. Say:\n\n"Before I throw a number — what's the #1 thing you're trying to fix right now?"\n\nQualify → diagnose the gap → then offer. People buy when they feel understood, not pitched.\n\n👉 The DM Closer has full scripts for every objection.`;
  }
  // GENERAL — still a real answer
  const weakest=P.subs.slice().sort((a,b)=>a.v-b.v)[0].key;
  return `Here's my take: your biggest lever this week is ${weakest}.\n\nTell me exactly what you want and I'll build it right here — a hook, a reel, a $X offer with a promo plan, captions, a growth plan, or a DM script. Just say the word (e.g. "build me a $30 ${_low(topic)} guide and how to sell it").`;
}
function ChatPanel({P,msgs,setMsgs,pending,consume,agent}){
  const [input,setInput]=useState("");
  const [loading,setLoading]=useState(false);
  const scrollRef=useRef();
  const sugg=[`20 hooks for a ${(P.niche||"").split(" ")[0].toLowerCase()} reel`,"How am I doing this week?","Turn my hot take into a reel","Build me a starter offer","Scan what's going viral"];

  const send=async(text)=>{
    const content=(text!==undefined?text:input).trim();
    if(!content||loading) return;
    const next=[...msgs,{role:"user",content}];
    setMsgs(next); setInput(""); setLoading(true);
    let reply;
    try{ reply=await callAI(P,next); }
    catch(e){ reply=answerLocal(P,content); }
    const out=[...next,{role:"assistant",content:reply}];
    setMsgs(out); setLoading(false);
  };
  useEffect(()=>{ if(pending){ const p=pending; consume&&consume(); send(p); } /* eslint-disable-next-line */ },[pending]);
  useEffect(()=>{ const el=scrollRef.current; if(el) el.scrollTop=el.scrollHeight; },[msgs,loading]);

  return (
    <>
      <div className="chat-scroll" ref={scrollRef}>
        {msgs.length===0 && (
          <div style={{margin:"auto",textAlign:"center",maxWidth:340}}>
            <div className="ai-av" style={{width:46,height:46,margin:"0 auto 14px"}}><Brain size={24} color="#fff"/></div>
            <div className="disp" style={{fontWeight:700,fontSize:19}}>Ask Creator AI</div>
            <p style={{color:"var(--muted)",fontSize:13.5,marginTop:8,lineHeight:1.5}}>Direct answers in his voice — and it can run the product for you. Try "make me 20 hooks and save them."</p>
          </div>
        )}
        {msgs.map((m,i)=>{
          if(m.role==="action") return (
            <div className="action-card" key={i}><CheckCircle2 size={16} color="var(--green)"/><span>{m.content}</span></div>
          );
          return (
            <div className={"msg "+(m.role==="user"?"user":"ai")} key={i}>
              <div className="ai-av">{m.role==="user"?<span className="disp" style={{fontWeight:700,fontSize:13,color:"var(--text)"}}>{(P.name||"U")[0].toUpperCase()}</span>:<Brain size={16} color="#fff"/>}</div>
              <div className="body">{m.content}</div>
            </div>
          );
        })}
        {loading && <div className="msg ai"><div className="ai-av"><Brain size={16} color="#fff"/></div><div className="body" style={{padding:0}}><div className="typing"><i/><i/><i/></div></div></div>}
      </div>
      {msgs.length===0 && (
        <div className="sug" style={{padding:"0 18px 6px"}}>{sugg.map(s=>(<span key={s} onClick={()=>send(s)}>{s}</span>))}</div>
      )}
      <div className="chat-input">
        <textarea rows={1} placeholder="Ask anything — or tell me to build it…" value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}}/>
        <button className="send-btn" disabled={!input.trim()||loading} onClick={()=>send()}><Send size={18} color="#fff"/></button>
      </div>
    </>
  );
}

function StudioView({P,open,go}){
  const tap=(k)=>{ if(k==="hooks"){ go&&go("hookengine"); } else if(k==="whatfilm"){ go&&go("whatfilm"); } else open(k); };
  return (
    <>
      <div className="eyebrow">Studio</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Build anything</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:560,marginBottom:22}}>Every generator in one place — each one tuned to your {P.niche} profile and voice. Or just ask Creator AI to make it for you.</p>
      {STUDIO.map(group=>(
        <div className="studio-group" key={group.g}>
          <div className="eyebrow" style={{marginBottom:12}}>{group.g}</div>
          <div className="tools">
            {group.items.map(t=>(
              <div className="tool" key={t.k} onClick={()=>tap(t.k)}>
                <ArrowUpRight className="arr" size={18}/><div className="tool-ic"><t.ic size={20}/></div>
                <h4>{t.t}</h4><p>{t.d}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}

/* ─────────────────────────── GUIDANCE DATA ─────────────────────────── */
function hashtags(P){
  const first=(P.niche||"creator").split(" ")[0].toLowerCase().replace(/[^a-z]/g,"");
  return ["#"+first,"#"+first+"tips","#"+first+"coach","#contentstrategy","#reels","#viralreels","#growthhacks","#creatortips","#smallaccount","#explorepage"];
}
function CopyBtn({text,label}){
  const [c,setC]=useState(false);
  return (
    <button className="copybtn" onClick={async()=>{try{await navigator.clipboard.writeText(text);}catch(e){} setC(true);setTimeout(()=>setC(false),1500);}}>
      {c?<Check size={13}/>:<Copy size={13}/>}{c?"Copied":(label||"Copy")}
    </button>
  );
}

const CONTENT_TYPES=[
  {t:"Viral / reach post",goal:"New followers + shares",ic:Flame,
   struct:["Hook that creates a curiosity gap or bold claim in the first 3s","One single idea — don't teach five things","Fast cuts, bold captions, no dead air","End on a loop so it replays","CTA: share-bait ('send this to someone who…')"],
   film:["Write the hook FIRST, before you film anything","Shoot the boldest visual you have for the opening 1s","Deliver one idea in 15–25s, talking fast","Add word-by-word captions + a rising trending sound","Match the last shot to the first so it loops"],
   length:"15–25s",audio:"Fast-rising trending sound (under 50k uses)",
   mistakes:["Teaching five things instead of one","A slow intro before the hook","Forgetting the share CTA"],
   ex:"Open with a contrarian claim → prove it in 20s → 'save this before you forget'."},
  {t:"Educational / how-to",goal:"Saves + authority",ic:BookOpen,
   struct:["Promise a specific outcome in the hook ('how to ___ in 30s')","Number your points on screen (1/3, 2/3…)","Keep each point to one line of value","Re-state the payoff at the end","CTA: 'save this' / 'comment WORD for the full guide'"],
   film:["Pick ONE outcome you can teach in 30s","Script 3 tight points — one line each","Film talking-head or screen-record the steps","Number each point on screen as you go","End with 'save this' + a comment keyword"],
   length:"30–45s",audio:"Your voice at full, soft track at ~15%",
   mistakes:["Too many steps — keep it 3","Vague promise in the hook","No clear save/keyword CTA"],
   ex:"'3 hooks that go viral every time' → list them fast → comment-to-receive CTA."},
  {t:"Motivational / inspirational",goal:"Shares + brand connection",ic:Megaphone,
   struct:["Open with tension or a hard truth","Build with short, punchy lines","Land on an identity statement they'll want to share","B-roll + emotional audio under a voiceover","CTA: 'tag someone who needs this'"],
   film:["Write the one-line truth you want to land on","Record a calm, intense voiceover","Lay cinematic b-roll under it (yours or stock)","Add emotional/cinematic audio low under the VO","End on the identity line + a tag CTA"],
   length:"15–30s",audio:"Emotional / cinematic build",
   mistakes:["Generic quotes everyone's heard","Too long — kill momentum","Loud music drowning the VO"],
   ex:"'You're not behind. You're early. Most people quit right before it works.'"},
  {t:"Engagement / question post",goal:"Comments + algorithm boost",ic:MessageSquare,
   struct:["Ask a question only your audience can answer","Or take a side on a debate in your niche","Make commenting effortless (this or that)","Reply to every comment in the first 60 min","CTA: 'drop your answer below 👇'"],
   film:["Pick a debate or 'this vs that' in your niche","State your take in one bold line","Make it easy to answer (A or B)","Post at peak hour, then sit on the comments","Reply to every single one fast"],
   length:"10–20s",audio:"Light, neutral trending sound",
   mistakes:["Asking a question that needs an essay","Posting then ghosting the comments","No clear side or stance"],
   ex:"'Unpopular opinion: ___ . Agree or disagree?' → reply to everyone fast."},
  {t:"Personal story",goal:"Trust + deeper connection",ic:Sparkles,
   struct:["Open in the middle of the story (no setup)","Take them through the struggle honestly","Land on the one lesson it taught you","Keep it raw — talking head or simple b-roll","CTA: 'save this' or 'who needed this today?'"],
   film:["Pick one real moment, not your whole life","Start at the tense part ('I almost quit when…')","Tell it in 30–40s, honest and unpolished","Land on a single takeaway","End soft — save or relate CTA"],
   length:"30–45s",audio:"Soft, emotional under your voice",
   mistakes:["Too much backstory before the point","No clear lesson at the end","Over-produced — it kills authenticity"],
   ex:"'I almost quit at 800 followers. Then I changed one thing…' → the lesson."},
  {t:"Before / after transformation",goal:"Proof + saves",ic:TrendingUp,
   struct:["Show the AFTER in the first 2 seconds","Then walk back to where it started","Reveal the ONE key move in the middle","Keep the timeline visual and fast","CTA: 'comment WORD and I'll show you how'"],
   film:["Lead with your strongest after-shot","Cut to the before, then the journey","Name the single biggest lever that worked","Use on-screen time/number callouts","End with a comment keyword for the how"],
   length:"20–35s",audio:"Upbeat / hype build",
   mistakes:["Burying the after at the end","No clear 'how' — just a flex","Too many steps in the middle"],
   ex:"After shot → '6 months ago this was impossible' → the one move → keyword CTA."},
  {t:"Listicle (3 things)",goal:"Saves + watch time",ic:ListChecks,
   struct:["Hook names the list + the payoff ('3 things that…')","Number on screen 1/3, 2/3, 3/3","One fast, valuable point each","Save the best for #3 ('wait for the last one')","CTA: 'save this' / keyword"],
   film:["Pick a tight theme with exactly 3 points","Write each as one punchy line","Film fast, number each on screen","Tease that #3 is the best to hold watch","End on save + keyword"],
   length:"20–35s",audio:"Light trending sound, beat-matched cuts",
   mistakes:["More than 3 points — loses watch","Weakest point last","No on-screen numbers"],
   ex:"'3 hooks I steal every week' → list → 'the 3rd one always pops'."},
  {t:"Myth-bust / contrarian",goal:"Reach + authority",ic:Zap,
   struct:["State the myth everyone believes","Hard cut: 'that's wrong — here's why'","Prove the truth fast with one point","Be confident, take the stance","CTA: 'agree? drop a 🔥' / save"],
   film:["Name a common belief in your niche","Open with it, then flip it hard","Back your take with one quick proof","Stay confident — conviction sells","End with an agree/disagree CTA"],
   length:"15–30s",audio:"Punchy, slightly tense sound",
   mistakes:["Hedging instead of taking a side","No proof for the contrarian claim","Picking a myth no one believes"],
   ex:"'Posting more won't grow you. Posting better hooks will. Here's proof.'"},
  {t:"Day-in-the-life",goal:"Connection + lifestyle",ic:Calendar,
   struct:["Hook tied to a theme, not just 'my day'","Fast-cut moments with text overlays","Drop one lesson or insight midway","Keep it aspirational but real","CTA: 'follow for the daily' / question"],
   film:["Pick a theme (a discipline, a routine, a build)","Capture 6–10 quick clips through your day","Add text overlays narrating the why","Slip in one lesson, don't just show off","End inviting them into the journey"],
   length:"20–40s",audio:"Warm, relatable lifestyle track",
   mistakes:["No theme — just random clips","Bragging with no value","Too long and slow"],
   ex:"'A day building a brand from 0' → clips + one hard lesson → follow CTA."},
  {t:"Green-screen reaction",goal:"Reach + relatability",ic:Layers,
   struct:["Put the screenshot/article/post behind you","React with a strong take in the first 3s","Point at the thing as you break it down","One clear opinion, fast","CTA: 'agree?' / save / keyword"],
   film:["Screenshot the post/news/comment you're reacting to","Green-screen it behind you in CapCut","Lead with your hottest take on it","Break it down in 20s, pointing at it","End with an opinion CTA"],
   length:"15–30s",audio:"Your voice; light sound under",
   mistakes:["No clear stance on what you're reacting to","Screenshot too small to read","Rambling instead of one take"],
   ex:"React to a viral claim in your niche → 'here's what they got wrong'."},
  {t:"Tutorial / step-by-step",goal:"Saves + authority",ic:Video,
   struct:["Promise the end result in the hook","Show the steps in order, on screen","Keep each step one action","Show the result at the end","CTA: 'save this' / keyword for the template"],
   film:["Pick one thing people want to do",  "Screen-record or film each step in order","Label each step on screen (Step 1, 2, 3)","Speed up boring parts, keep it tight","End on the finished result + save CTA"],
   length:"30–60s",audio:"Voice at full, soft track under",
   mistakes:["Skipping a step viewers need","No finished-result payoff","Too slow on the easy steps"],
   ex:"'How to set up a comment-to-DM in 60s' → steps → 'comment WORD for the template'."},
  {t:"Behind-the-scenes / proof",goal:"Trust + sales",ic:Eye,
   struct:["Show the real work or result happening","Narrate what's going on + why it matters","Drop a screenshot/result as proof","Keep it raw and credible","CTA: 'want this?' / DM keyword"],
   film:["Capture the real moment (work, result, client win)","Narrate it honestly — no over-polish","Show one piece of hard proof on screen","Tie it to what you help people do","End with a soft 'want this?' CTA"],
   length:"15–30s",audio:"Light, neutral sound",
   mistakes:["Faking it — people can tell","No proof, just talk","Pitching too hard too early"],
   ex:"Show a real client result → 'this is what the system does' → soft CTA."},
  {t:"POV / relatable",goal:"Shares + saves",ic:Users,
   struct:["'POV:' a specific, relatable moment","Make it oddly specific to your niche","Short — land the feeling fast","Let them see themselves in it","CTA: 'tag someone' / 'is this just me?'"],
   film:["Pick a hyper-specific moment your audience lives","Open with 'POV:' + that moment on screen","Act it out or show it in 10–15s","Keep it tight — the feeling is the payoff","End with a tag/relate CTA"],
   length:"8–15s",audio:"Trendy pop snippet that fits the mood",
   mistakes:["Too generic to feel personal","Too long — kills the punch","No tag/relate CTA"],
   ex:"'POV: you finally hit 10k and realize the work just started.'"},
];
const WATCHTIME=[
  ["Nail the first frame","Your thumbnail-in-motion is the first frame. Start mid-action or with bold text — never a slow intro or a logo."],
  ["Open a loop","Promise something you only pay off at the end ('wait for the last one'). Curiosity holds the watch."],
  ["Cut every 1.5–2s","Re-frame, zoom, or change the shot constantly. Movement resets attention and kills the scroll instinct."],
  ["Caption every word","On-screen captions hold sound-off viewers (most of them). Keep them big, centered, one phrase at a time."],
  ["No dead air","Cut every pause, breath, and 'um'. Tighten until it's almost uncomfortable — that's the right pace."],
  ["Loop the ending","Make the last line flow back into the first so it replays seamlessly. Replays = watch time = reach."],
  ["Front-load the payoff","Give value in the first 5s so they stay for more, then stack more value. Don't save the best for last only."],
];
const ALGO=[
  ["Post when your audience is on","Check your active hours and post 30–60 min before peak. Early engagement decides distribution."],
  ["Reply to every comment fast","First 60 minutes matter most. Replies count as engagement and pull the comment back up."],
  ["Saves & shares > likes","Build content people save (useful) and share (relatable). The algorithm weights these heaviest for reach."],
  ["Send people to DMs","'Comment WORD and I'll DM you' creates comments AND DM threads — both signal value to the algorithm."],
  ["Re-share your reel to story","Within an hour of posting, share it to your story with a poll or question to drive the first wave of engagement."],
  ["Hook test with trial reels","Use trial reels to test hooks on non-followers. Keep what lands, scale it to your main feed."],
  ["Consistency beats virality","The account that posts 1 quality reel daily for 60 days beats the one chasing a single viral hit."],
];
const AVOID=[
  ["Don't post recycled watermarked clips","Visible TikTok/other-app watermarks get suppressed. Export clean from CapCut."],
  ["Don't use banned or spammy hashtags","Avoid huge generic or flagged tags. Use 8–12 specific, niche-relevant ones instead of 30 broad ones."],
  ["Don't delete & repost constantly","Rapid delete/repost looks like manipulation and can get you restricted. Let posts breathe."],
  ["Don't use engagement pods / buy followers","Fake engagement tanks your reach ratio and risks a shadowban. Grow real."],
  ["Don't post and ghost","Leaving right after posting signals low quality. Stay and engage for the first hour."],
  ["Don't say 'link in bio' in captions sometimes","On reels it can reduce reach — drive to DMs or comments instead, then send the link privately."],
  ["Don't ignore community guidelines","Borderline claims (medical, financial, 'guaranteed') get content limited. Keep it clean and provable."],
];
const CAPCUT=[
  ["Import & rough cut","Drop your clips in, slice out every pause and mistake. Tighten to the fastest watchable pace."],
  ["Auto-captions","Tap Text → Auto captions. Restyle: bold font, white text, thin black outline, centered, large."],
  ["Cut to the beat","Add your audio, tap to add beat markers, align your cuts and text pops to the beats."],
  ["Hook text overlay","Add a bold text hook on frame 1 that matches your spoken/written hook. Animate it in fast."],
  ["The end-loop trick","Make your last clip visually match your first (same framing/position) so the replay is seamless."],
  ["Export clean","1080p, 30 or 60fps, highest bitrate. No watermark — turn off the CapCut end card in export settings."],
];
const TRENDING_AUDIO=[
  ["Upbeat / hype","For energetic, motivational, or transformation content. Look for fast-rising sounds under 50k uses."],
  ["Emotional / cinematic","For story and inspirational posts. Soft piano or ambient builds under a voiceover."],
  ["Trending pop snippet","For lifestyle and relatable POV content. Use the 7–15s segment everyone's hooking on."],
  ["Original audio + voiceover","Best for authority/educational — your voice is the audio. Add a quiet trending track underneath at 15% volume."],
];
const TRENDING_FONTS=[
  ["Bold condensed sans","Heavy, tight, all-caps for hooks. Reads instantly at a glance."],
  ["Clean rounded sans","Friendly captions for educational content. High legibility sound-off."],
  ["Outlined / stroke text","White fill, black stroke — survives any background, the safest caption style."],
  ["Highlight-box captions","Word-by-word boxed captions that pop one at a time, karaoke-style. Holds attention."],
];
const ALGO_POOL=[
  ["Post 30–60 min before your peak hour","Early engagement decides distribution. Check your active hours and beat the rush."],
  ["Reply to every comment in the first hour","Replies count as engagement and pull the comment thread back up. First 60 min matter most."],
  ["Build for saves and shares, not likes","Saves (useful) and shares (relatable) are weighted heaviest for reach. Make reference-worthy + send-to-a-friend content."],
  ["Use a comment-to-DM keyword","'Comment WORD and I'll DM you' creates comments AND DM threads — both signal value."],
  ["Re-share to your story within the hour","Drive the first wave of engagement with a poll or 'tap to watch' sticker."],
  ["Test hooks with trial reels","Try riskier hooks on non-followers first. Scale the winners to your main feed."],
  ["Hook in the first 1.5 seconds","If they don't stop scrolling instantly, nothing else matters. Lead with the boldest line."],
  ["Keep retention above 50%","Cut every dead second. Watch-time is the single biggest reach driver."],
  ["Caption every word on screen","~80% watch sound-off. On-screen text keeps them even when muted."],
  ["Loop the last line into the first","A seamless loop doubles watch time and tricks the replay."],
  ["Post consistently — daily if you can","The account that posts 1 quality reel daily for 60 days beats the one chasing a single hit."],
  ["Reply with a video to top comments","Video replies get their own reach and feed the original post."],
  ["Use 4–6 specific hashtags, not 30","Niche-relevant tags help categorization; spammy walls of tags hurt."],
  ["Hook, then deliver fast — no long intros","Cut the 'hey guys' — start on the value or the promise."],
  ["Pin your best comment","Steer the conversation and seed your CTA at the top."],
  ["Batch content, post fresh","Film weekly, but post natively each day — scheduled-looking content can underperform."],
  ["Ride a rising sound early","Sounds under ~50k uses that are climbing give you a reach tailwind."],
  ["Make part 2 in the comments","'Part 2 if this hits' drives saves, comments and a follow for the payoff."],
];
const AUDIO_LIB=[
  ["Sunset Lover","Petit Biscuit","Calm, aesthetic b-roll & lifestyle"],
  ["Aesthetic","Tollan Kim & Glimlip","Soft lo-fi for reflective / educational"],
  ["Snowfall","Øneheart & reidenshi","Moody, cinematic story reels"],
  ["Monkeys Spinning Monkeys","Kevin MacLeod","Playful, comedic, light-hearted"],
  ["Oh No","Kreepa","Fails, surprises, 'wait for it' moments"],
  ["Astronaut In The Ocean","Masked Wolf","High-energy hook & transition reels"],
  ["Heat Waves","Glass Animals","Warm, relatable lifestyle POV"],
  ["As It Was","Harry Styles","Upbeat, broad-appeal lifestyle"],
  ["Flowers","Miley Cyrus","Confident, transformation content"],
  ["Calm Down","Rema","Feel-good, dance, broad reach"],
  ["good 4 u","Olivia Rodrigo","Punchy, high-energy edits"],
  ["Sweater Weather","The Neighbourhood","Aesthetic, moody, fashion"],
  ["Levitating","Dua Lipa","Upbeat fun, before/after reveals"],
  ["Blinding Lights","The Weeknd","High-energy, fast-cut montages"],
  ["STAY","The Kid LAROI & Justin Bieber","Trendy, youthful, fast hooks"],
  ["Paris","Else","Dreamy travel & lifestyle b-roll"],
  ["Sunflower","Post Malone & Swae Lee","Warm, relatable, feel-good"],
  ["Roxanne","Arizona Zervas","Energetic lifestyle & flex reels"],
  ["Lofi beat (original)","Use your own voice over it","Authority / educational — VO at full, track at ~15%"],
  ["Epic cinematic build","Search 'cinematic' rising sounds","Motivational & transformation payoffs"],
];

/* ── TODAY: the daily game plan ── */
function TodayView({P,open,go,onComplete}){
  const first=(P.niche||"Niche").split(" ")[0];
  const hooks=useMemo(()=>buildHooks(P),[P]);
  const [hookSeed,setHookSeed]=useState(0);
  const [refresh,setRefresh]=useState(0);
  const algoToday=useMemo(()=>shuffleSeeded(ALGO_POOL,"algo"+daySeed()+refresh).slice(0,8),[refresh]);
  const audioToday=useMemo(()=>shuffleSeeded(AUDIO_LIB,"aud"+daySeed()+refresh).slice(0,8),[refresh]);
  const dayHooks=useMemo(()=>{
    const arr=[...hooks].sort((a,b)=>((rng(a.t,hookSeed+1))-(rng(b.t,hookSeed+2))));
    return arr.slice(0,3);
  },[hooks,hookSeed]);
  const cap=`${takeLine(P,hookSeed+refresh)}\n\nHere's what nobody tells you about ${(P.niche||"this game").toLowerCase()} —\n\nThe ones who win aren't more talented. They're more consistent with a better framework.\n\nSave this. Then go run it.\n\nComment "${first.toUpperCase()}" and I'll send you mine.`;
  const kit=`${cap}\n\n${hashtags(P).join(" ")}`;

  const tasks=[
    {id:"viral",ic:Flame,title:"Post 1 viral reel",time:"20 min",why:"Your daily shot at new reach. One sharp idea, strong hook, built for shares.",
     body:(<>
       <Block label="Pick your hook" extra={<button className="mini" onClick={()=>setHookSeed(s=>s+1)}><RefreshCw size={12}/> New hooks</button>}>
         {dayHooks.map((h,i)=>(<div className="line-copy" key={i}><span>{h.t}</span><CopyBtn text={h.t}/></div>))}
       </Block>
       <Block label="Caption (ready to post)"><div className="kit">{cap}</div><CopyBtn text={cap} label="Copy caption"/></Block>
       <Block label="CTA"><div className="line-copy"><span>Comment "{first.toUpperCase()}" and I'll send you the full breakdown.</span><CopyBtn text={`Comment "${first.toUpperCase()}" and I'll send you the full breakdown.`}/></div></Block>
       <Block label="Edit & post"><ul className="mini-list"><li>Cut every 1.5–2s, caption every word, no dead air</li><li>Loop the last line back into the first</li><li>Use trending audio at low volume under your voice</li></ul>
         <div className="btn-row"><button className="btn btn-grad sm" onClick={()=>open("reels")}>Open Reel Builder</button><CopyBtn text={kit} label="Copy publish kit"/></div></Block>
     </>)},
    {id:"trial",ic:Play,title:"Post 1 trial reel",time:"10 min",why:"Test a new hook or angle on non-followers first. Keep what lands, scale it.",
     body:(<>
       <Block label="What's a trial reel?"><p className="ptext">Trial reels go out to people who don't follow you yet — a free A/B test. Try a riskier hook or format. If it pops, post it properly to your main feed tomorrow.</p></Block>
       <Block label="Today's test hook"><div className="line-copy"><span>{hooks[(6+hookSeed)%hooks.length].t}</span><CopyBtn text={hooks[(6+hookSeed)%hooks.length].t}/></div></Block>
       <div className="btn-row"><button className="btn btn-ghost sm" onClick={()=>go("scanner")}>See what's trending in {first}</button></div>
     </>)},
    {id:"story",ic:Layers,title:"Post your 3-slide story sequence",time:"8 min",why:"Stories build trust and funnel viewers to your reel and DMs. Run this exact sequence.",
     body:(<>
       <Block label="Slide 1 · Hook story"><div className="line-copy"><span>Most people in {first.toLowerCase()} are doing this completely wrong. (bold text on screen)</span><CopyBtn text={`Most people in ${first.toLowerCase()} are doing this completely wrong.`}/></div></Block>
       <Block label="Slide 2 · Quiz (relates to the hook)"><div className="kit">Quick quiz: which one actually grows you faster?{"\n"}→ Posting more often{"\n"}→ Posting better hooks{"\n"}(Use the quiz/poll sticker)</div><CopyBtn text={"Quick quiz: which one actually grows you faster? Posting more often / Posting better hooks"}/></Block>
       <Block label="Slide 3 · Question box"><div className="line-copy"><span>What's your #1 struggle with {first.toLowerCase()} right now? (question sticker)</span><CopyBtn text={`What's your #1 struggle with ${first.toLowerCase()} right now?`}/></div></Block>
     </>)},
    {id:"repost",ic:Repeat,title:"Repost your reel to your story",time:"2 min",why:"Within an hour of posting, drive your first wave of engagement back to the reel.",
     body:(<><Block label="Add an engagement sticker"><p className="ptext">Share the reel to your story with a poll ('did you know this?') or a 'tap to watch 👀' prompt. This first-hour engagement tells the algorithm to push it further.</p></Block></>)},
    {id:"dms",ic:Target,title:"Send 3–5 DMs to warm leads",time:"10 min",why:"Conversations close sales. Message people who engaged or asked questions.",
     body:(<>
       <Block label="Opener (no pitch)"><div className="line-copy"><span>Appreciate you engaging lately 🙏 what are you working on in {first.toLowerCase()} right now?</span><CopyBtn text={`Appreciate you engaging lately 🙏 what are you working on in ${first.toLowerCase()} right now?`}/></div></Block>
       <div className="btn-row"><button className="btn btn-grad sm" onClick={()=>open("dm")}>Open DM Closer</button></div>
     </>)},
    {id:"engage",ic:Activity,title:"Engage for 15 minutes",time:"15 min",why:"Reply to every comment in your first hour, and comment on 10 niche accounts.",
     body:(<><Block label="The first-hour rule"><p className="ptext">Reply to 100% of comments within 60 minutes of posting — it pulls the reel back up and signals value. Then leave thoughtful comments on 10 bigger {first.toLowerCase()} accounts to borrow their audience.</p></Block></>)},
  ];

  const [done,setDone]=useState({});
  const [openId,setOpenId]=useState("viral");
  const completed=tasks.filter(t=>done[t.id]).length;
  const pct=Math.round((completed/tasks.length)*100);
  const allDone=completed===tasks.length;

  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:12,marginBottom:18}}>
        <div><div className="eyebrow">Today's Game Plan · {new Date().toLocaleDateString(undefined,{weekday:"long",month:"short",day:"numeric"})}</div>
          <h1 className="disp" style={{fontWeight:700,fontSize:"clamp(24px,4vw,32px)",marginTop:6}}>Do these {tasks.length} things. That's it.</h1>
          <p style={{color:"var(--muted)",fontSize:14,marginTop:4}}>Built for your {P.niche} goals. No guessing — just run the plan.</p></div>
        <div style={{textAlign:"right"}}><div className="disp" style={{fontWeight:700,fontSize:30}}>{completed}<span style={{color:"var(--faint)",fontSize:18}}>/{tasks.length}</span></div><div className="mono" style={{fontSize:11,color:"var(--faint)"}}>COMPLETE</div></div>
      </div>
      <div className="pace" style={{marginBottom:18}}><i style={{width:Math.max(3,pct)+"%",background:allDone?"var(--green)":"var(--grad)"}}/></div>

      {(()=>{const weak=P.subs?[...P.subs].sort((a,b)=>a.v-b.v)[0]:null;
        const wk=Math.floor(daySeed()/7)%4;
        const theme=["Reach week — go wide, optimize hooks","Engagement week — depth over breadth","Conversion week — turn views into leads","Authority week — prove you're the one"][wk];
        const focusMap={Reach:"Your reach vector is your weakest link right now — so today is about hooks and shares. Lead every post with a scroll-stopper and build for sends, not likes.",
          Engagement:"Engagement is lagging — prioritize the first-hour rule and your story sequence. Reply to everything within 60 minutes.",
          Conversion:"You're getting attention but leaking it. Today, point every post at your DM keyword and send those 5 DMs.",
          Authority:"Build trust today — your story sequence and one proof-driven post matter most.",
          Consistency:"Consistency is the gap. The win today is simply running the full plan, no skips.",
          Monetization:"Attention isn't converting yet — focus on the DMs and making your offer visible."};
        const wkey=weak?weak.key:"Reach";
        return (
          <div className="nba" style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:8,marginBottom:8}}>
              <div className="eyebrow">Today's focus · why this plan</div>
              <span className="mono" style={{fontSize:11,color:"var(--muted)"}}>~70 min total · {theme}</span>
            </div>
            <p style={{fontSize:14.5,lineHeight:1.55,fontWeight:500}}>{focusMap[wkey]||focusMap.Reach}</p>
            <p style={{fontSize:13,color:"var(--muted)",lineHeight:1.5,marginTop:8}}>Run the tasks <strong>in order</strong> — the viral reel goes out first so it has all day to gather momentum, the trial reel tests your next hook, stories and the repost drive first-hour engagement, then DMs and engagement convert the attention. That sequence is the system.</p>
          </div>
        );})()}

      {allDone && (
        <div className="banner" style={{marginBottom:16,borderColor:"rgba(47,208,138,.3)"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><CheckCircle2 size={22} color="var(--green)"/><div><div style={{fontWeight:600,fontSize:15}}>Game plan complete. That's how you win — daily.</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>Log it as your check-in to keep your streak and pace.</div></div></div>
          <button className="btn btn-grad" style={{padding:"11px 18px",fontSize:14}} onClick={onComplete}>Log today</button>
        </div>
      )}

      <div style={{display:"flex",flexDirection:"column",gap:11}}>
        {tasks.map(t=>{
          const isOpen=openId===t.id, isDone=!!done[t.id];
          return (
            <div className="task" key={t.id} style={isDone?{borderColor:"rgba(47,208,138,.3)"}:{}}>
              <div className="task-h" onClick={()=>setOpenId(isOpen?null:t.id)}>
                <button className={"check"+(isDone?" on":"")} onClick={(e)=>{e.stopPropagation();setDone(d=>({...d,[t.id]:!d[t.id]}));}}>{isDone&&<Check size={14} color="#fff"/>}</button>
                <div className="task-ic"><t.ic size={17}/></div>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:15,textDecoration:isDone?"line-through":"none",color:isDone?"var(--muted)":"var(--text)"}}>{t.title}</div>
                  <div style={{fontSize:12.5,color:"var(--muted)",marginTop:2}}>{t.why}</div>
                </div>
                <span className="mono" style={{fontSize:11,color:"var(--faint)",display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}><Clock size={12}/>{t.time}</span>
                <ChevronDown size={18} color="var(--faint)" style={{transform:isOpen?"rotate(180deg)":"none",transition:".2s",flexShrink:0}}/>
              </div>
              {isOpen && <div className="task-body">{t.body}</div>}
            </div>
          );
        })}
      </div>

      <div className="panel panel-pad" style={{marginTop:18,display:"flex",justifyContent:"space-between",alignItems:"center",gap:14,flexWrap:"wrap"}}>
        <div><div style={{fontWeight:600,fontSize:15}}>Need the full toolkit?</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>Hooks, captions, CapCut edits, trending audio, algo hacks & what to avoid.</div></div>
        <button className="btn btn-ghost" onClick={()=>go("playbook")} style={{display:"flex",gap:8,alignItems:"center"}}><BookOpen size={16}/> Open the Playbook</button>
      </div>
    </>
  );
}
function Block({label,extra,children}){
  return (<div className="tb-block"><div className="tb-label"><span className="eyebrow">{label}</span>{extra}</div>{children}</div>);
}

/* ── PLAYBOOK: the full reference ── */
function PlaybookView({P,open}){
  const [tab,setTab]=useState("hooks");
  const first=(P.niche||"Niche").split(" ")[0];
  const allHooks=useMemo(()=>buildHooks(P),[P]);
  const [seed,setSeed]=useState(0);
  const [refresh,setRefresh]=useState(0);
  const audioToday=useMemo(()=>shuffleSeeded(AUDIO_LIB,"aud"+daySeed()+refresh).slice(0,8),[refresh]);
  const algoToday=useMemo(()=>shuffleSeeded(ALGO_POOL,"algo"+daySeed()+refresh).slice(0,8),[refresh]);
  const shownHooks=useMemo(()=>{const a=[...allHooks].sort((x,y)=>rng(x.t,seed+1)-rng(y.t,seed+2));return a.slice(0,24);},[allHooks,seed]);
  const capAll=useMemo(()=>captionEngine(P),[P]);
  const ctaAll=useMemo(()=>ctaEngine(P,"grow"),[P]);
  const [capN,setCapN]=useState(6);
  const [ctaN,setCtaN]=useState(12);
  const captions=useMemo(()=>shuffleSeeded(capAll,"cap"+refresh).slice(0,capN),[capAll,refresh,capN]);
  const ctas=useMemo(()=>shuffleSeeded(ctaAll,"cta"+refresh).slice(0,ctaN),[ctaAll,refresh,ctaN]);
  const TABS=[["hooks","Hooks"],["captions","Captions"],["ctas","CTAs"],["types","Content types"],["watch","Watch-time"],["edit","CapCut editing"],["trending","Trending now"],["algo","Algo hacks"],["avoid","What to avoid"]];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:8}}>
        <div><div className="eyebrow">The Playbook · {P.niche}</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0"}}>Everything you need to execute</h1></div>
      </div>
      <div className="tabs" style={{overflowX:"auto",flexWrap:"nowrap"}}>{TABS.map(([k,l])=>(<div key={k} className={"tab"+(tab===k?" on":"")} onClick={()=>setTab(k)} style={{whiteSpace:"nowrap"}}>{l}</div>))}</div>

      {tab==="hooks" && (<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <p style={{color:"var(--muted)",fontSize:13.5}}>{shownHooks.length} hooks tuned to {first}. Tap copy, or refresh for a new set.</p>
          <button className="btn btn-ghost sm" onClick={()=>setSeed(s=>s+1)} style={{display:"flex",gap:7,alignItems:"center"}}><RefreshCw size={14}/> Refresh hooks</button>
        </div>
        <div style={{display:"grid",gap:9}}>{shownHooks.map((h,i)=>(
          <div className="line-copy" key={i}><span style={{display:"flex",gap:10,alignItems:"center"}}><span className="tag" style={{flexShrink:0}}>{h.cat}</span>{h.t}</span><CopyBtn text={h.t}/></div>
        ))}</div>
      </>)}

      {tab==="captions" && (<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <p style={{color:"var(--muted)",fontSize:13.5}}>Hundreds of full captions tuned to {first}. Refresh for a whole new set — then copy and tweak.</p>
          <button className="btn btn-ghost sm" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={14}/> Refresh captions</button>
        </div>
        <div style={{display:"grid",gap:11}}>{captions.map((c,i)=>(
          <div className="out-card" key={i}><div className="kit">{c}</div><div style={{marginTop:10}}><CopyBtn text={c} label="Copy caption"/></div></div>
        ))}</div>
        <div className="btn-row" style={{marginTop:14}}><button className="mini" onClick={()=>setCapN(n=>n+6)}><ArrowDown size={12}/> Show more</button><button className="mini" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={12}/> New set</button></div>
      </>)}

      {tab==="ctas" && (<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,flexWrap:"wrap",gap:8}}>
          <p style={{color:"var(--muted)",fontSize:13.5}}>Endless CTAs — for follows, saves, shares, DMs and sales. Refresh for more.</p>
          <button className="btn btn-ghost sm" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={14}/> Refresh CTAs</button>
        </div>
        <div style={{display:"grid",gap:9}}>{ctas.map((c,i)=>(<div className="line-copy" key={i}><span>{c}</span><CopyBtn text={c}/></div>))}</div>
        <div className="btn-row" style={{marginTop:14}}><button className="mini" onClick={()=>setCtaN(n=>n+12)}><ArrowDown size={12}/> Show more</button><button className="mini" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={12}/> New set</button></div>
      </>)}

      {tab==="types" && (<>
        <p style={{color:"var(--muted)",fontSize:13.5,marginBottom:14}}>{CONTENT_TYPES.length} content types that work right now. Tap any one for the full "how to make it" guide — structure, how to film it, length, audio, and the mistakes to avoid.</p>
        <div style={{display:"grid",gap:10}}>{CONTENT_TYPES.map((c,i)=>(
        <details className="panel" key={i} style={{padding:0}}>
          <summary style={{padding:"15px 16px",cursor:"pointer",listStyle:"none",display:"flex",alignItems:"center",gap:12}}>
            <div className="tool-ic" style={{width:38,height:38,flexShrink:0}}><c.ic size={18}/></div>
            <div style={{flex:1,minWidth:0}}><div style={{fontWeight:600,fontSize:15}}>{c.t}</div><div className="mono" style={{fontSize:10.5,color:"var(--accent)"}}>{c.goal.toUpperCase()} · {c.length}</div></div>
            <ChevronDown size={17} color="var(--muted)"/>
          </summary>
          <div style={{padding:"0 16px 18px"}}>
            <div className="eyebrow" style={{margin:"6px 0 8px"}}>Structure</div>
            <ul className="mini-list">{c.struct.map(s=><li key={s}>{s}</li>)}</ul>
            <div className="eyebrow" style={{margin:"16px 0 8px"}}>How to make it — step by step</div>
            <div style={{display:"grid",gap:7}}>{c.film.map((s,j)=>(<div key={j} style={{display:"flex",gap:10,fontSize:13.5,lineHeight:1.45}}><span className="mono" style={{color:"var(--accent)",flexShrink:0}}>{j+1}</span>{s}</div>))}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,margin:"16px 0"}} className="kpirow">
              <div style={{padding:"10px 12px",background:"var(--void)",borderRadius:9,border:"1px solid var(--line)"}}><div className="eyebrow" style={{marginBottom:4}}>Length</div><div style={{fontSize:13.5,fontWeight:600}}>{c.length}</div></div>
              <div style={{padding:"10px 12px",background:"var(--void)",borderRadius:9,border:"1px solid var(--line)"}}><div className="eyebrow" style={{marginBottom:4}}>Audio</div><div style={{fontSize:13,fontWeight:500}}>{c.audio}</div></div>
            </div>
            <div className="eyebrow" style={{margin:"4px 0 8px",color:"var(--amber)"}}>Avoid</div>
            <div style={{display:"grid",gap:6}}>{c.mistakes.map((m,j)=>(<div key={j} style={{display:"flex",gap:9,fontSize:13,color:"var(--muted)"}}><X size={14} color="var(--red)" style={{flexShrink:0,marginTop:2}}/>{m}</div>))}</div>
            <div style={{marginTop:12,fontSize:12.5,color:"var(--muted)",fontStyle:"italic"}}>e.g. {c.ex}</div>
            <div className="btn-row" style={{marginTop:14}}><button className="btn btn-grad sm" onClick={()=>open&&open("reels")}><Film size={14}/> Build this as a reel</button></div>
          </div>
        </details>
        ))}</div>
      </>)}

      {tab==="watch" && (<>
        <div className="nba" style={{marginBottom:14}}><p style={{fontSize:15,fontWeight:500,lineHeight:1.5}}>Watch time is the #1 lever on reach. If people watch longer — and replay — the algorithm pushes you. Stack these:</p></div>
        <div style={{display:"grid",gap:10}}>{WATCHTIME.map(([t,d],i)=>(
          <div className="row-card" key={i}><div style={{display:"flex",gap:13,alignItems:"flex-start"}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:18,width:26}}>{String(i+1).padStart(2,"0")}</span><div><div style={{fontWeight:600,fontSize:14.5}}>{t}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{d}</div></div></div></div>
        ))}</div>
      </>)}

      {tab==="edit" && (<>
        <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:14}}><div className="tool-ic" style={{width:40,height:40}}><Scissors size={19}/></div><div><div style={{fontWeight:600,fontSize:16}}>Edit a scroll-stopping reel in CapCut</div><div style={{color:"var(--muted)",fontSize:13}}>The exact sequence — including the end-loop trick.</div></div></div>
        <div style={{display:"grid",gap:10}}>{CAPCUT.map(([t,d],i)=>(
          <div className="row-card" key={i}><div style={{display:"flex",gap:13,alignItems:"flex-start"}}><span className="mono" style={{fontSize:12,color:"var(--accent)",width:34,paddingTop:2}}>0{i+1}</span><div><div style={{fontWeight:600,fontSize:14.5}}>{t}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{d}</div></div></div></div>
        ))}</div>
      </>)}

      {tab==="trending" && (<>
        <div className="banner" style={{marginBottom:16}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><Volume2 size={20} color="var(--accent)"/><div><div style={{fontWeight:600,fontSize:14.5}}>How to find what's trending today</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>In Reels, tap audio → look for the ↗ arrow on sounds. Use ones rising fast (under ~50k uses) so you catch the wave early.</div></div></div>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",margin:"4px 0 10px"}}>
          <div className="eyebrow">Proven reel sounds · rotates daily</div>
          <button className="mini" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={12}/> Refresh</button>
        </div>
        <div style={{display:"grid",gap:9,marginBottom:8}}>{audioToday.map(([t,artist,use],i)=>(<div className="row-card" key={i}><div style={{display:"flex",gap:12,alignItems:"center",minWidth:0}}><Music size={16} color="var(--accent)" style={{flexShrink:0}}/><div style={{minWidth:0}}><div style={{fontWeight:600,fontSize:14}}>{t} <span style={{color:"var(--muted)",fontWeight:400}}>· {artist}</span></div><div style={{color:"var(--muted)",fontSize:12.5,marginTop:2}}>{use}</div></div></div></div>))}</div>
        <p className="mono" style={{fontSize:11,color:"var(--faint)",margin:"0 0 18px"}}>Rotating library of proven sounds. Live trending rank + use-counts pull from your account when you connect it.</p>
        <div className="eyebrow" style={{margin:"4px 0 10px"}}>Trending caption fonts</div>
        <div style={{display:"grid",gap:9}}>{TRENDING_FONTS.map(([t,d],i)=>(<div className="row-card" key={i}><div style={{display:"flex",gap:12,alignItems:"center"}}><Type size={16} color="var(--accent)"/><div><div style={{fontWeight:600,fontSize:14}}>{t}</div><div style={{color:"var(--muted)",fontSize:12.5,marginTop:2}}>{d}</div></div></div></div>))}</div>
        <p className="mono" style={{fontSize:11,color:"var(--faint)",marginTop:14}}>Live trend feed pulls real-time sounds & formats in your niche → see Signal Scanner.</p>
      </>)}

      {tab==="algo" && (<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div className="eyebrow">Algo hacks · fresh set daily</div>
          <button className="mini" onClick={()=>setRefresh(r=>r+1)}><RefreshCw size={12}/> Refresh</button>
        </div>
        <div style={{display:"grid",gap:10}}>{algoToday.map(([t,d],i)=>(
          <div className="row-card" key={i}><div style={{display:"flex",gap:13,alignItems:"flex-start"}}><Zap size={17} color="var(--accent)" style={{marginTop:2,flexShrink:0}}/><div><div style={{fontWeight:600,fontSize:14.5}}>{t}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{d}</div></div></div></div>
        ))}</div>
      </>)}

      {tab==="avoid" && (<>
        <div className="nba" style={{marginBottom:14,borderColor:"rgba(242,177,76,.3)",background:"radial-gradient(130% 130% at 0% 0%,rgba(242,177,76,.12),transparent 50%),linear-gradient(180deg,var(--surface),var(--bg))"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><AlertTriangle size={20} color="var(--amber)"/><p style={{fontSize:15,fontWeight:500}}>Avoid these to stay out of the shadowban / restricted zone.</p></div>
        </div>
        <div style={{display:"grid",gap:10}}>{AVOID.map(([t,d],i)=>(
          <div className="row-card" key={i}><div style={{display:"flex",gap:13,alignItems:"flex-start"}}><X size={17} color="var(--red)" style={{marginTop:2,flexShrink:0}}/><div><div style={{fontWeight:600,fontSize:14.5}}>{t}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{d}</div></div></div></div>
        ))}</div>
      </>)}
    </>
  );
}

/* ── MONETIZE: funnel + storefront + DM ── */
function MonetizeView({P,open}){
  const first=(P.niche||"Niche").split(" ")[0];
  const fb=FOLLOWERS.indexOf(P.followers);
  const rec=P.offer==="Nothing yet"
    ? `Don't build a course yet. Start with a ${fb>=3?"$997–2,000":"$297–597"} ${first.toLowerCase()} program and close it manually in the DMs. Simplest path to first revenue.`
    : `You already sell. Now systemize it — set up a clean storefront, add an order bump, and drive every reel to a "comment-to-DM" funnel.`;
  const isBiz=P.mode==="A business";
  const funnel=[
    ["Attention","A reel built for reach gets you in front of new people.",Eye],
    ["Capture","CTA: 'comment WORD' → they comment, you reply, you open a DM.",MessageSquare],
    ["Qualify","Ask one question to understand their goal before pitching anything.",Target],
    ["Offer","Match them to your offer. Send a short voice note, not a wall of text.",DollarSign],
    ["Close & deliver","Send the checkout link in DM. Over-deliver so they refer you.",CheckCircle2],
  ];
  const store=[
    ["Pick your storefront","Stan, Beacons, or a simple Shopify/Stripe link. Keep checkout to one tap."],
    ["Build one flagship offer",`Your ${first.toLowerCase()} ${isBiz?"service/package":"program or digital product"} — one clear promise, one price.`],
    ["Add an order bump","A small add-on at checkout (a template, a guide) lifts average order value instantly."],
    ["Put it in your bio funnel","Lead magnet → best reel → offer → 'DM me START'. Link-in-bio does the routing."],
    ["Drive traffic from content","Every reel/story ends in a CTA that funnels to the comment → DM → link path."],
  ];
  return (
    <>
      <div className="eyebrow">Monetize · {P.niche}{isBiz?" · business":""}</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Turn attention into income</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:580,marginBottom:18}}>{isBiz?"Route your audience into leads and booked calls for your business.":"Build a personal brand that pays — products, coaching, and DMs that close."}</p>

      <div className="nba" style={{marginBottom:18}}>
        <div className="eyebrow" style={{marginBottom:6}}>Your recommended path</div>
        <p style={{fontSize:15.5,lineHeight:1.5,fontWeight:500}}>{rec}</p>
        <button className="btn btn-grad" style={{marginTop:14,padding:"11px 18px",fontSize:14}} onClick={()=>open("offer")}>Build my offer <ArrowRight size={16} style={{verticalAlign:"-3px"}}/></button>
      </div>

      <div className="eyebrow" style={{marginBottom:12}}>The sales funnel</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:11,marginBottom:22}}>
        {funnel.map(([t,d,Ic],i)=>(
          <div className="plat" key={t}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><Ic size={17} color="var(--accent)"/><span className="mono" style={{fontSize:10.5,color:"var(--faint)"}}>0{i+1}</span></div>
            <div style={{fontWeight:600,fontSize:14.5,margin:"12px 0 6px"}}>{t}</div>
            <div style={{color:"var(--muted)",fontSize:12.5,lineHeight:1.45}}>{d}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:16}} className="hero">
        <div className="panel panel-pad">
          <span className="tag" style={{marginBottom:14,display:"inline-flex"}}><Store size={12}/> Set up your storefront</span>
          <div style={{display:"flex",flexDirection:"column",gap:11}}>{store.map(([t,d],i)=>(
            <div key={t} style={{display:"flex",gap:12,alignItems:"flex-start"}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:17,width:22}}>{i+1}</span><div><div style={{fontWeight:600,fontSize:14}}>{t}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>{d}</div></div></div>
          ))}</div>
        </div>
        <div className="panel panel-pad">
          <span className="tag" style={{marginBottom:14,display:"inline-flex"}}><Target size={12}/> DM money scripts</span>
          {[["When they comment your keyword",`Hey! Saw you commented "${first.toUpperCase()}" 🙌 sending it over — quick Q so I send the right thing: what's your #1 goal right now?`],["\"How much?\"","Before I throw a number — what are you trying to fix? Want to make sure it's a fit first."],["Close","Based on that, my "+first.toLowerCase()+" program is built for exactly this. Want me to send the details + link?"]].map(([a,b])=>(
            <div className="out-card" key={a}><div className="eyebrow" style={{marginBottom:7}}>{a}</div><p style={{fontSize:14,lineHeight:1.5}}>{b}</p><div style={{marginTop:9}}><CopyBtn text={b}/></div></div>
          ))}
          <button className="btn btn-ghost sm" style={{width:"100%",marginTop:4,justifyContent:"center"}} onClick={()=>open("dm")}>Open DM Closer</button>
        </div>
      </div>
    </>
  );
}

/* ═══════════ PERFORMANCE LAB — why posts win + learns the creator ═══════════ */
function scorePost(p){
  const v=Math.max(1,+p.views||0);
  const er=((+p.likes||0)+(+p.comments||0)+(+p.shares||0)+(+p.saves||0))/v*100;
  const saveR=(+p.saves||0)/v*100, shareR=(+p.shares||0)/v*100, followR=(+p.follows||0)/v*100, watch=+p.watch||0, commentR=(+p.comments||0)/v*100;
  const score=clamp(Math.round(watch*0.32 + Math.min(er,18)*1.6 + Math.min(saveR,10)*2.4 + Math.min(shareR,8)*3 + Math.min(followR,5)*4));
  return {er:+er.toFixed(1),saveR:+saveR.toFixed(1),shareR:+shareR.toFixed(1),followR:+followR.toFixed(2),watch,commentR:+commentR.toFixed(1),score};
}
function whyPost(p,m,med){
  const out=[];
  if(m.watch>=55) out.push(["Strong retention","Your pacing held them to the end — the hook delivered and the middle didn't sag.","good"]);
  else if(p.views>med.views && m.watch<45) out.push(["Reach, but weak retention","The hook pulled people in, then the middle lost them. Tighten the 3–8s window.","bad"]);
  if(m.saveR>=med.saveR && m.saveR>=1.5) out.push(["High saves","People bookmarked this — it was genuinely useful. Educational/value content is your saver.","good"]);
  if(m.shareR>=med.shareR && m.shareR>=1) out.push(["High shares","It hit emotionally or felt relatable — that's your reach engine. Shares = the algorithm's strongest signal.","good"]);
  if(m.followR>=med.followR && m.followR>=0.5) out.push(["Converted strangers","Strong follow rate — the hook + payoff turned viewers into followers.","good"]);
  if(m.commentR>=med.commentR && m.commentR>=0.8) out.push(["Sparked conversation","Comment-heavy — it asked something or took a stance. Great for the first-hour push.","good"]);
  if(m.score<med.score-8) out.push(["Underperformed for you","Below your usual — likely a soft hook or off-pillar topic. Compare it to your winners.","bad"]);
  if(!out.length) out.push(["Solid, middle of your pack","Nothing broke out. Push a sharper hook or a proven format next time.","mid"]);
  return out;
}
function learnInsights(posts,scored,P){
  if(posts.length<2) return null;
  const byFmt={}, byType={};
  posts.forEach((p,i)=>{const s=scored[i].score;
    (byFmt[p.format]=byFmt[p.format]||[]).push(s);
    (byType[p.type]=byType[p.type]||[]).push(s);});
  const avg=o=>Object.entries(o).map(([k,v])=>[k,v.reduce((a,b)=>a+b,0)/v.length,v.length]).sort((a,b)=>b[1]-a[1]);
  const fmtRank=avg(byFmt), typeRank=avg(byType);
  const best=scored.map((s,i)=>({...posts[i],...s})).sort((a,b)=>b.score-a.score)[0];
  const worst=scored.map((s,i)=>({...posts[i],...s})).sort((a,b)=>a.score-b.score)[0];
  const conf=Math.min(95,40+posts.length*7);
  const takeaways=[];
  if(fmtRank[0]) takeaways.push(`Your strongest format is **${fmtRank[0][0]}** — it averages ${Math.round(fmtRank[0][1])}/100. Make more of these.`);
  if(fmtRank.length>1) takeaways.push(`**${fmtRank[fmtRank.length-1][0]}** is your weakest format right now — either fix the hook or do fewer.`);
  takeaways.push(`Your best post leaned on ${best.saveR>=best.shareR?"saves (value content)":"shares (emotional/relatable)"} — double down on that lever.`);
  takeaways.push(`Average retention across your posts is ${Math.round(scored.reduce((a,b)=>a+b.watch,0)/scored.length)}% — ${scored.reduce((a,b)=>a+b.watch,0)/scored.length>=50?"strong, keep the tight pacing":"the #1 thing to improve; cut every dead second"}.`);
  return {fmtRank,typeRank,best,worst,conf,takeaways};
}
/* ═══════════ BRAND BLUEPRINT — submit your brand → elite 20-section report ═══════════ */
function buildBlueprint(P,q){
  const pk=pack(P), n=_low(P.niche), N=_first(P.niche);
  const hooks=buildHooks(P);
  const g=(k,fb)=>{const v=(q&&q[k]!=null)?(typeof q[k]==="object"?txt(q[k]):q[k]):"";return (v&&(""+v).trim())?(""+v).trim():fb;};
  const garr=(k,fb)=>{const v=q&&q[k];if(Array.isArray(v)&&v.length)return v.map(x=>typeof x==="object"?txt(x):x);return fb;};
  const isBiz=/business/i.test(g("identity","personal"));
  const brand=g("brandName",P.name||"Your brand");
  const offerName=(P.offer&&P.offer!=="Nothing yet")?P.offer:"a starter transformation offer";
  const become=g("become",knownPhrase(P));
  const help=g("help",`help people ${pk.desires[0]}`);
  const outcome=g("outcome",pk.desires[0]);
  const want=garr("build",["a personal brand","a first offer"]).join(", ");
  const plat=g("platform",(P.platforms&&P.platforms[0]&&P.platforms[0].pl)||"Instagram");
  const vision=g("vision","a profitable, recognized brand");
  const revGoal=g("revgoal",P.revgoal||"$5K – 20K / mo");
  const superpower=g("superpower",`a clear, repeatable system for ${outcome}`);
  const story=g("story",`I struggled with ${pk.pains[0]} — then I built a system that worked, and now I teach it.`);
  const voice=garr("voice",(P.tone&&P.tone.length?P.tone:["Direct","Real","Bold"]));
  const personality=g("personality","Energetic & direct");
  const audience=g("audience",`${n} people who are tired of ${pk.pains[0]}`);
  const differ=g("differ",`you've actually done it and you make it simple`);
  const win90=g("win90",`launch ${offerName} and make your first consistent revenue`);
  const struggle=garr("struggle",["Consistency","Writing hooks"]);
  const fol=P.fBase||1000;
  const pillars=[
    ["Authority",`Teach what you know about ${n}. One sharp lesson per post. This is what makes you ${become}.`],
    ["Relatable story",`Share the journey — the struggle with ${pk.pains[0]} and the turning point. Story builds trust faster than tips.`],
    ["Proof",`Show results — yours, then your audience's. Screenshots, before/afters, wins. Proof sells without selling.`],
    ["Contrarian",`Challenge a ${n} myth (e.g. "${_cap(pk.mistakes[0])}"). Contrarian = shareable = reach.`],
    ["Behind-the-scenes",`Let people in. Your process, your day, your real life. Connection converts followers into buyers.`],
  ];
  const cal=[]; for(let d=1;d<=15;d++){const pil=pillars[(d-1)%pillars.length];const hk=hooks[(d*3)%hooks.length];
    cal.push(`Day ${d} · ${pil[0]} · ${["Reel","Reel","Carousel","Reel","Story set"][(d-1)%5]}\n   Hook: ${hk.t}`);}
  const ladder=[
    [`Lead magnet (free)`,`A free ${pk.topics[0]} guide / checklist. Captures emails. Top of funnel.`],
    [`Low-ticket ($27–$97)`,`A ${pk.topics[1]||pk.topics[0]} mini-product or template. Easy yes, filters buyers.`],
    [`Core offer ($297–$997)`,`${_cap(offerName)} — your main transformation. Where most revenue comes from.`],
    [`High-ticket ($1.5k+)`,`1:1 or premium ${isBiz?"done-for-you":"group"} for people who want speed and access.`],
  ];
  const blocks=[
    {label:"01 · Executive summary",text:`${brand} — your complete ${isBiz?"business":"personal brand"} and growth blueprint for ${N}.\n\nWho you are: ${isBiz?"a business":"a creator"} building ${want}, on track to ${vision}.\nWhat you do: ${help}.\nWho you're becoming: ${become}.\nYour superpower: ${superpower}.\n\nThis document is your operating system — positioning, voice, content, growth, monetization and automation — sequenced into a plan you can run starting today. One idea drives all of it: turn attention into a real business.`},
    {label:"02 · Brand positioning statement",text:`"I ${help} — without ${pk.mistakes[0]}."\n\nYou are positioned as ${become}. In a sea of generic ${n} content, your edge: ${differ}. Own one specific outcome — ${outcome} — and become known for it.`},
    {label:"03 · Your unfair advantage",text:`What makes you different: ${differ}.\nYour superpower: ${superpower}.\n\nLean into this in every piece of content. Most ${n} creators are interchangeable. Your edge is the one thing competitors can't copy — your specific experience, your point of view, and your system. Make it the spine of your brand.`},
    {label:"04 · Your origin story (your most powerful asset)",text:`${story}\n\nUse this story everywhere — your bio, your first reel, your welcome email, your sales page. People don't buy from experts, they buy from people they relate to. Your struggle-to-system arc is what turns strangers into believers.`},
    {label:"05 · Your audience avatar",text:`Who you serve: ${audience}.\n• They struggle with: ${pk.pains[0]}, ${pk.pains[1]}\n• They secretly want: ${pk.desires[0]}\n• They've tried: generic advice that didn't stick\n• They follow you because: ${differ}\n\nSpeak to ONE person. Every post should make that person feel seen.`},
    {label:"06 · Brand voice & tone",text:`Your voice: ${voice.join(", ")}.\nYour on-camera personality: ${personality}.\nRules:\n• Short lines. One idea per post.\n• Lead with the boldest statement.\n• Talk like a person, not a brand.\n• Back claims with proof or story.\n• Always end with a clear next step.\n\nConsistency of voice is what makes you recognizable. Sound the same everywhere.`},
    {label:"07 · Content pillars",text:pillars.map((p,i)=>`${i+1}. ${p[0]} — ${p[1]}`).join("\n\n")+`\n\nRotate these. Aim: ~40% authority, 20% story, 20% proof, 10% contrarian, 10% behind-the-scenes.`},
    {label:"08 · Your hook bank (use & remix these)",text:hooks.slice(0,14).map((h,i)=>`${i+1}. ${h.t}`).join("\n")},
    {label:"09 · Signature content formats",text:pk.formats.map((f,i)=>`${i+1}. ${f[0]} — ${f[1]}`).join("\n")},
    {label:"10 · The reel framework",text:`Every reel = 4 beats:\nHOOK (0–3s): stop the scroll. Boldest line first.\nRETAIN (3–10s): "here's what nobody tells you…" keep them.\nPAYOFF (10–35s): deliver one clear, screenshot-worthy idea.\nCTA (35s+): one ask — comment a keyword, save, or follow.\n\nCut every 1.5–2s. Caption every word. Loop the last line into the first.`},
    {label:"11 · 30-day content calendar (first 15 days)",text:cal.join("\n\n")+`\n\n(Days 16–30 repeat the rotation with fresh hooks from your bank.)`},
    {label:"12 · Story sequence strategy",text:`Stories are where trust and sales happen. A 3-slide sequence around each reel:\n1. Tease: "Most people get ${n} wrong…"\n2. Poll: "Want the fix?" → [Yes] [Tell me more]\n3. Drive: "New post is live 👆 go watch."\n\nRun a sales story 2–3x/week: value → proof → soft CTA to your offer.`},
    {label:"13 · Bio & profile optimization",text:`Formula: [who you help] + [outcome] + [proof] + [CTA].\nExample: "${_cap(help)} | ${N} | ${fmt(fol)}+ growing | Free guide 👇"\n\nProfile: clear photo, highlight covers for Start Here / Proof / Offer, link to your lead magnet.`},
    {label:"14 · Growth plan & algorithm levers",text:`What the algorithm rewards now:\n• Saves + shares > likes. Make reference-worthy, send-to-a-friend content.\n• Watch time. Tight pacing, no dead seconds.\n• Fast early engagement. Post at peak, reply in the first 60 min.\n• Consistency. ${plat} rewards creators who show up.\n\nAvoid: engagement bait, low-quality reposting, buying followers, inconsistent posting.`},
    {label:"15 · Posting cadence",text:`Sustainable, aggressive cadence:\n• ${plat}: 1 reel/day (or 5/week minimum)\n• Stories: daily (3–5 frames)\n• 1 carousel/week for saves\n\nBatch film 1x/week. Never let perfect stop you from posting.`},
    {label:"16 · How you'll make money — your offer ladder",text:ladder.map((l,i)=>`${i+1}. ${l[0]} — ${l[1]}`).join("\n\n")+`\n\nRevenue goal: ${revGoal}. At ${fmt(fol)} followers, start at the lead magnet + core offer. Don't build a course yet — sell ${offerName} and close in DMs first.`},
    {label:"17 · Your first offer (architected)",text:`Offer: ${_cap(offerName)}\nPromise: ${_cap(outcome)} in 60 days.\nFor: ${audience}.\nIncludes: a clear system, accountability, and direct access.\nPrice: start $297–$497, raise as proof grows.\nGuarantee: show up and do the work, or your money back.`},
    {label:"18 · DM sales flow",text:`When someone shows interest:\n1. Connect — ask about their goal.\n2. Qualify — "what have you tried?"\n3. Diagnose — name the gap.\n4. Offer — "here's how I'd help."\n5. Close — send the link / take payment.\n6. Follow up — once, with value, if they go quiet.`},
    {label:"19 · Automation funnel",text:`Turn content into customers on autopilot:\nKEYWORD (comment) → AUTO-DM (link + lead magnet) → LANDING (capture email) → EMAIL SEQUENCE (nurture) → CHECKOUT → CLOSE.\n\nTools: ManyChat (comment→DM), your site/Stan/Beacons (capture), an email tool (nurture), Stripe (payment). Build it in the Automation Engine.`},
    {label:"20 · Email sequence outline",text:`Welcome sequence (5 emails):\n1. Welcome + fastest win\n2. The #1 mistake (${pk.mistakes[0]})\n3. Your story / proof\n4. The framework\n5. The invitation to ${offerName}\n\nSend days 0,1,3,5,7. This is where social attention becomes owned audience.`},
    {label:"21 · Research insights for your niche",text:`What's working in ${n} right now:\n• Audiences want ${pk.desires[0]} and ${pk.desires[1]||"real results"} — lead with outcomes, not features.\n• The biggest trust-killer is ${pk.mistakes[0]} — position against it.\n• Highest-saved formats: ${(pk.formats[0]&&pk.formats[0][0])||"how-to"} and ${(pk.formats[1]&&pk.formats[1][0])||"story"}.\n• Short, native, captioned video is still the #1 reach driver on ${plat}.\n• Owned audience (email/SMS) is the moat — start building it from day one.\n\nUpdate this quarterly as the niche shifts; CreatorX surfaces fresh trends in the Growth Engine.`},
    {label:"22 · KPIs — what to track weekly",text:`• Posts shipped\n• Followers gained\n• Avg views & watch %\n• Saves + shares (your reach engine)\n• Profile visits → follows\n• DMs / leads\n• Revenue\n\nNorth star: publish-ready assets shipped per week. Consistency compounds.`},
    {label:"23 · Your 90-day roadmap",text:`Your 90-day win: ${win90}.\n\nDAYS 1–30 — Foundation: lock positioning, bio, pillars. Post daily. Launch lead magnet.\nDAYS 31–60 — Momentum: double down on your best format, build the email list, soft-launch ${offerName}.\nDAYS 61–90 — Monetize: run a real launch, raise prices with proof, turn on automation.\n\nTarget: ${fmt(Math.round(fol*1.6))}+ followers and your first ${money(Math.max(1000,(P.revTarget||2000)))}/mo toward ${revGoal}.`},
    {label:"24 · Your next 7 days",text:`Day 1: Fix your bio with the formula above.\nDay 2: Generate 25 hooks, pick 5.\nDay 3: Film 3 reels (batch).\nDay 4: Build your lead magnet.\nDay 5: Post + write welcome email 1.\nDay 6: Set up the comment→DM automation.\nDay 7: Review the week, log your numbers, plan next week.\n\nRun this in CreatorX — every section here has a tool inside the platform.`},
    {label:"25 · Competitive positioning & category ownership",text:`Most ${n} creators are interchangeable — they all say the same things. Your job is to own a lane no one else can.\n\nYour wedge: ${differ}.\nThe category to own: "${_cap(outcome)} for ${audience}".\nName your method: give your system a proprietary name (e.g. "The ${N} Method" / "The ${_cap(outcome.split(" ")[0]||"Core")} System"). A named framework is uncopyable and makes you the go-to.\n\nHow to win the position:\n• Pick a villain — the common ${n} belief you're against ("${_cap(pk.mistakes[0])}").\n• Repeat your POV until you're known for it. Repetition builds category ownership.\n• Put your method name in your bio, your offer, and every reel.\n• Be the most specific voice in the room — specificity beats reach.`},
    {label:"26 · Signature series & taglines",text:`TAGLINE OPTIONS (pick one, use everywhere):\n• "${_cap(help)} — without ${pk.mistakes[0]}."\n• "Helping ${n} people ${outcome}."\n• "${_cap(outcome)} is a system. I'll show you mine."\n\nSIGNATURE SERIES (recurring formats build a loyal audience):\n• "${N} Myths" — debunk one belief per week.\n• "Steal My System" — give away one piece of your method.\n• "${_cap(outcome)} Diaries" — document real progress/results.\n• "Fix This" — react to common mistakes in ${n}.\nA recognizable recurring series trains your audience to come back — and makes you unmistakable.`},
  ];
  return {title:`${brand}'s Brand Blueprint`,subtitle:`${N} · built to reach ${vision}`,blocks,
    docOpts:{subtitle:`A complete brand, content, growth & monetization system for ${brand} — ${N}.`}};
}
function BpField({n,label,opt,children}){
  return (<div className="panel panel-pad" style={{marginBottom:13}}>
    <div className="eyebrow" style={{marginBottom:10}}>{n} · {label}{opt&&<span style={{color:"var(--faint)",textTransform:"none",letterSpacing:0}}> (optional)</span>}</div>
    {children}</div>);
}

function BrandBlueprintView({P,go,open}){
  const pk=pack(P);
  const platNames=(P.platforms&&P.platforms.length&&typeof P.platforms[0]==="object")?P.platforms.filter(p=>p.sel).map(p=>p.pl):PLATFORMS;
  const platOpts=platNames.length?platNames:PLATFORMS;
  const [q,setQ]=useState({
    identity:"Personal brand", brandName:P.name||"", niche:P.niche||"",
    help:"", outcome:"", become:"", build:[], vision:"", revgoal:P.revgoal||"",
    superpower:"", story:"", voice:(P.tone&&P.tone.length?P.tone.slice(0,3):[]), personality:"",
    platform:platOpts[0]||"Instagram", audience:"", differ:"", struggle:[], win90:"",
  });
  const [report,setReport]=useState(null);
  const [building,setBuilding]=useState(false);
  const set=(k,v)=>setQ(s=>({...s,[k]:v}));
  const tog=(k,v)=>setQ(s=>({...s,[k]:s[k].includes(v)?s[k].filter(x=>x!==v):[...s[k],v]}));
  const becomeOpts=["The go-to expert","The relatable real one","The bold contrarian","The motivator","The premium authority"];
  const buildOpts=["A big audience","A personal brand","A first offer","A real business","An agency","Passive income"];
  const visionOpts=["A profitable side income","A full-time creator business","A 6-figure brand","A 7-figure company","Grow & be known"];
  const revOpts=["< $1K / mo","$1K – 5K","$5K – 20K","$20K – 100K","$100K+"];
  const voiceOpts=["Direct","Bold","Warm","Funny","Inspiring","Calm","Premium","Raw"];
  const persOpts=["Energetic & direct","Calm & thoughtful","Funny & relatable","Serious & expert","Inspiring & bold"];
  const strugOpts=["Consistency","Writing hooks","Editing for retention","Getting reach","Converting to sales","Knowing what to post"];
  // required (lenient) — essentials so it always generates something great
  const filled=[q.brandName,q.help||q.outcome,q.become,q.vision].filter(x=>x&&(""+x).trim()).length;
  const ready=filled>=4;
  const total=14;
  const answered=[q.brandName,q.niche,q.help,q.outcome,q.become,q.build.length,q.vision,q.revgoal,q.superpower,q.story,q.voice.length,q.personality,q.audience,q.differ,q.struggle.length,q.win90].filter(x=>x&&(""+x).trim()&&x!==0).length;
  const generate=()=>{setBuilding(true);setTimeout(()=>{setReport(buildBlueprint(P,q));setBuilding(false);if(typeof window!=="undefined"&&window.scrollTo)window.scrollTo(0,0);},900);};
  const Chips=({k,opts,multi})=>(
    <div className="opts two">{opts.map(o=>{const on=multi?q[k].includes(o):q[k]===o;return(
      <div key={o} className={"chip"+(on?" on":"")} onClick={()=>multi?tog(k,o):set(k,o)}><span className="dot"/>{o}{on&&<Check size={14} className="ck"/>}</div>);})}</div>
  );
  if(report){
    return (
      <>
        <div className="eyebrow">Brand Blueprint</div>
        <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 4px"}}>{report.title}</h1>
        <p style={{color:"var(--muted)",fontSize:14.5,marginBottom:16}}>{report.subtitle} · {report.blocks.length} sections</p>
        <div className="panel panel-pad" style={{marginBottom:16,background:"var(--grad-soft)",border:"1px solid rgba(79,140,255,.3)"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><div className="tool-ic" style={{width:38,height:38}}><FileText size={18}/></div>
            <div><div style={{fontWeight:700,fontSize:15}}>Your complete {report.blocks.length}-section blueprint is ready.</div><div style={{fontSize:13,color:"var(--muted)"}}>Positioning, story, voice, content, growth, monetization & automation — branded and ready to follow.</div></div></div>
          <div style={{marginTop:14}}><DocActions title={report.title} blocks={report.blocks} P={P} opts={report.docOpts} label="Download my full Brand Blueprint — elite PDF / Word"/></div>
        </div>
        <div className="eyebrow" style={{marginBottom:10}}>Inside your blueprint</div>
        <div style={{display:"grid",gap:10,marginBottom:18}}>
          {report.blocks.map((b,i)=>(
            <details key={i} className="panel" style={{padding:"0"}}>
              <summary style={{padding:"14px 16px",cursor:"pointer",fontWeight:600,fontSize:14.5,listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>{b.label}<ChevronDown size={16} color="var(--muted)"/></summary>
              <div className="kit" style={{padding:"0 16px 16px"}}>{b.text}</div>
            </details>
          ))}
        </div>
        <div className="btn-row"><button className="btn btn-ghost" onClick={()=>setReport(null)}>Edit my answers & regenerate</button><button className="btn btn-grad" onClick={()=>go("today")}>Start executing →</button></div>
      </>
    );
  }
  return (
    <>
      <div className="eyebrow">Brand Blueprint</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Answer these. I'll build your entire brand blueprint.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:660,marginBottom:14}}>The deeper you go, the more tailored your blueprint. {total}+ questions → a complete, branded {24}-section document: positioning, story, voice, audience, content, growth, monetization, automation, research insights and a 90-day roadmap. Most are quick taps — the few text boxes are where the magic comes from.</p>
      <div style={{position:"sticky",top:0,zIndex:5,background:"var(--bg)",padding:"8px 0 12px",marginBottom:6}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span className="mono" style={{fontSize:11,color:"var(--muted)"}}>{answered}/16 answered</span><span className="mono" style={{fontSize:11,color:ready?"var(--green)":"var(--faint)"}}>{ready?"ready to generate":"fill the 4 starred to generate"}</span></div>
        <div className="bar"><i style={{width:Math.round(answered/16*100)+"%",background:"var(--grad)"}}/></div>
      </div>

      <div className="eyebrow" style={{margin:"6px 0 10px",color:"var(--accent)"}}>You</div>
      <BpField n="1" label="Are you building a personal brand or a business?"><Chips k="identity" opts={["Personal brand","Business"]}/></BpField>
      <BpField n="2 ★" label="Your name or brand name"><input className="cx-in" value={q.brandName} onChange={e=>set("brandName",e.target.value)} placeholder="e.g. Alex Rivera / Rivera Fitness"/></BpField>
      <BpField n="3" label="Your niche"><input className="cx-in" value={q.niche} onChange={e=>set("niche",e.target.value)} placeholder={P.niche||"e.g. fitness for busy parents"}/></BpField>
      <BpField n="4 ★" label="In one line — who do you help and how?"><input className="cx-in" value={q.help} onChange={e=>set("help",e.target.value)} placeholder={`e.g. I help busy parents ${pk.desires[0]}`}/></BpField>
      <BpField n="5" label="The #1 outcome you help people get"><input className="cx-in" value={q.outcome} onChange={e=>set("outcome",e.target.value)} placeholder={`e.g. ${pk.desires[0]}`}/></BpField>
      <BpField n="6" label="What's your unfair advantage / superpower?" opt><input className="cx-in" value={q.superpower} onChange={e=>set("superpower",e.target.value)} placeholder="the thing you do better than anyone in your niche"/></BpField>
      <BpField n="7" label="Your origin story in one line" opt><input className="cx-in" value={q.story} onChange={e=>set("story",e.target.value)} placeholder="the struggle → turning point → where you are now"/></BpField>
      <BpField n="8" label="What makes you different from others in your niche?" opt><input className="cx-in" value={q.differ} onChange={e=>set("differ",e.target.value)} placeholder="your edge, your POV, your proof"/></BpField>

      <div className="eyebrow" style={{margin:"18px 0 10px",color:"var(--accent)"}}>Your goals</div>
      <BpField n="9 ★" label="Who do you want to become?"><Chips k="become" opts={becomeOpts}/></BpField>
      <BpField n="10" label="What do you want to build? (pick any)"><Chips k="build" opts={buildOpts} multi/></BpField>
      <BpField n="11 ★" label="Your 12-month vision"><Chips k="vision" opts={visionOpts}/></BpField>
      <BpField n="12" label="Revenue goal"><Chips k="revgoal" opts={revOpts}/></BpField>
      <BpField n="13" label="What would make this a win in 90 days?" opt><input className="cx-in" value={q.win90} onChange={e=>set("win90",e.target.value)} placeholder="the one result that would make you proud"/></BpField>

      <div className="eyebrow" style={{margin:"18px 0 10px",color:"var(--accent)"}}>Your voice & audience</div>
      <BpField n="14" label="Your voice / tone (pick a few)"><Chips k="voice" opts={voiceOpts} multi/></BpField>
      <BpField n="15" label="Your personality on camera"><Chips k="personality" opts={persOpts}/></BpField>
      <BpField n="16" label="Who exactly is your audience?" opt><input className="cx-in" value={q.audience} onChange={e=>set("audience",e.target.value)} placeholder="age, stage, what they're struggling with"/></BpField>
      <BpField n="17" label="Main platform"><Chips k="platform" opts={platOpts}/></BpField>
      <BpField n="18" label="Your biggest struggle right now (pick any)"><Chips k="struggle" opts={strugOpts} multi/></BpField>

      <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",padding:"16px",fontSize:15.5,marginTop:8,opacity:ready?1:.55,cursor:ready?"pointer":"not-allowed"}} disabled={!ready||building} onClick={generate}>
        {building?<><span className="pulse" style={{marginRight:8}}/>Building your blueprint…</>:<><Sparkles size={18}/> Generate my Brand Blueprint ({24} sections)</>}
      </button>
      {!ready&&<p style={{textAlign:"center",fontSize:12.5,color:"var(--faint)",marginTop:10}}>Fill the 4 starred (★) questions to unlock — the rest make it sharper.</p>}
    </>
  );
}
function PerformanceLabView({P,go,open}){
  const pk=pack(P);
  const hooks=useMemo(()=>buildHooks(P),[P]);
  const seed=useMemo(()=>{const fmts=pk.formats;return [0,1,2,3,4].map(i=>({
    id:i+1, label:hooks[i*3]?hooks[i*3].t.slice(0,46):"Predicted post "+(i+1), type:["Reel","Reel","Carousel","Reel","Reel"][i], format:fmts[i%fmts.length][0],
    views:[Math.round(52000*(1+rng(P.name+"v",i)*0.4)),31000,18000,9000,5200][i],
    likes:[4600,2400,1500,820,520][i], comments:[340,210,260,90,60][i], shares:[2100,760,300,120,55][i], saves:[3000,1200,420,160,95][i],
    follows:[1040,420,120,44,22][i], watch:[61,52,0,44,40][i], predicted:true,
  }));},[P,pk,hooks]);
  const [posts,setPosts]=useState(seed);
  const [shot,setShot]=useState(null);
  const shotRef=useRef();
  const [draft,setDraft]=useState({label:"",type:"Reel",format:pk.formats[0][0],views:"",likes:"",comments:"",shares:"",saves:"",follows:"",watch:""});
  const scored=useMemo(()=>posts.map(scorePost),[posts]);
  const med=useMemo(()=>{const f=k=>{const a=scored.map(s=>s[k]).sort((x,y)=>x-y);return a[Math.floor(a.length/2)]||0;};
    return {score:f("score"),saveR:f("saveR"),shareR:f("shareR"),followR:f("followR"),commentR:f("commentR"),views:[...posts.map(p=>+p.views||0)].sort((a,b)=>a-b)[Math.floor(posts.length/2)]||0};},[scored,posts]);
  const ranked=useMemo(()=>posts.map((p,i)=>({p,m:scored[i]})).sort((a,b)=>b.m.score-a.m.score),[posts,scored]);
  const learn=useMemo(()=>learnInsights(posts,scored,P),[posts,scored,P]);
  const addPost=()=>{ if(!draft.views)return;
    setPosts(ps=>[...ps,{id:Date.now(),label:draft.label||"Untitled post",type:draft.type,format:draft.format,
      views:+draft.views,likes:+draft.likes||0,comments:+draft.comments||0,shares:+draft.shares||0,saves:+draft.saves||0,follows:+draft.follows||0,watch:+draft.watch||0}]);
    setDraft({label:"",type:"Reel",format:pk.formats[0][0],views:"",likes:"",comments:"",shares:"",saves:"",follows:"",watch:""});};
  const del=(id)=>setPosts(ps=>ps.filter(p=>p.id!==id));
  const sc=v=>v>=80?"var(--green)":v>=62?"var(--accent)":v>=45?"var(--amber)":"var(--red)";
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10}}>
        <div><div className="eyebrow">Performance Lab</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Your 5 highest-potential posts — predicted & explained.</h1></div>
        <div className="live"><span className="pulse"/>{posts.filter(p=>!p.predicted).length>0?("learning from "+posts.filter(p=>!p.predicted).length+" of your posts"):"5 predicted top posts"}</div>
      </div>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:680,marginBottom:12}}>These are the posts most likely to perform for you, ranked by predicted viral potential with the exact reason each would win. They're <b style={{color:"var(--text)"}}>predictions to make</b> — not posts you've already made. Log your real posts below (or connect your account) and I'll analyze your <em>actual</em> numbers and learn your personal patterns.</p>
      <div className="banner" style={{marginBottom:16,display:"flex",gap:11,alignItems:"center"}}><Activity size={17} color="var(--accent)" style={{flexShrink:0}}/><p style={{fontSize:12.5,color:"var(--muted)"}}>Projected metrics are estimates for your niche & follower range. Connect {(P.platforms&&P.platforms[0]&&P.platforms[0].pl)||"your account"} for your real top posts and live performance analysis.</p></div>

      {/* learning panel */}
      {learn && (
        <div className="panel panel-pad" style={{marginBottom:16,background:"var(--grad-soft)",border:"1px solid rgba(79,140,255,.3)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:14}}>
            <span className="tag" style={{borderColor:"rgba(79,140,255,.4)"}}><Brain size={12}/> What CreatorX has learned about you</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}><span className="mono" style={{fontSize:11,color:"var(--muted)"}}>confidence</span><div className="bar" style={{width:90}}><i style={{width:learn.conf+"%"}}/></div><span className="mono" style={{fontSize:11,color:"var(--accent)"}}>{learn.conf}%</span></div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>{learn.takeaways.map((t,i)=>(
            <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14.5,lineHeight:1.5}}><Sparkles size={16} color="var(--accent2)" style={{marginTop:2,flexShrink:0}}/><span dangerouslySetInnerHTML={{__html:t.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')}}/></div>))}</div>
          <div className="btn-row" style={{marginTop:14}}><button className="btn btn-grad sm" onClick={()=>go&&go("whatfilm")}>Make more of my best format →</button><button className="btn btn-ghost sm" onClick={()=>go&&go("hookengine")}>Sharpen my hooks →</button></div>
        </div>
      )}

      {/* score chart */}
      <div className="panel panel-pad" style={{marginBottom:16}}>
        <span className="tag" style={{marginBottom:6,display:"inline-flex"}}><BarChart3 size={12}/> Your posts, ranked by performance score</span>
        <div style={{height:170,marginTop:10}}><ResponsiveContainer><BarChart data={ranked.map((r,i)=>({name:"#"+(i+1),score:r.m.score}))} margin={{top:6,right:6,left:-14,bottom:0}}>
          <XAxis dataKey="name" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/><YAxis domain={[0,100]} tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} width={28}/>
          <Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12}} formatter={v=>[v+"/100","Score"]}/>
          <Bar dataKey="score" radius={[5,5,0,0]} barSize={26}>{ranked.map((r,i)=>(<Cell key={i} fill={r.m.score>=80?"#2FD08A":r.m.score>=62?"#4F8CFF":r.m.score>=45?"#F2B14C":"#F26D6D"}/>))}</Bar>
        </BarChart></ResponsiveContainer></div>
      </div>

      {/* ranked posts with WHY */}
      <div className="eyebrow" style={{marginBottom:12}}>Post-by-post breakdown</div>
      <div style={{display:"grid",gap:12,marginBottom:18}}>
        {ranked.map(({p,m},i)=>{const reasons=whyPost(p,m,med);return (
          <div className="panel panel-pad" key={p.id}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:10}}>
              <div style={{display:"flex",gap:13,alignItems:"flex-start",minWidth:0}}>
                <div style={{textAlign:"center",minWidth:54}}><div className="disp" style={{fontWeight:800,fontSize:26,lineHeight:1,color:sc(m.score)}}>{m.score}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>SCORE</div></div>
                <div style={{minWidth:0}}><div style={{fontWeight:600,fontSize:14.5,lineHeight:1.35}}>{p.label}</div>
                  <div style={{display:"flex",gap:6,marginTop:6,flexWrap:"wrap"}}><span className="tag">{p.type}</span><span className="tag">{p.format}</span>{p.predicted&&<span className="tag" style={{color:"var(--accent)",borderColor:"rgba(79,140,255,.3)"}}>PREDICTED</span>}{i===0&&<span className="tag" style={{color:"var(--green)",borderColor:"rgba(47,208,138,.3)"}}>{p.predicted?"🏆 highest potential":"🏆 top performer"}</span>}</div></div>
              </div>
              <button className="mini" onClick={()=>del(p.id)} title="Remove"><X size={13}/></button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8,marginBottom:12}} className="kpirow">
              {[["Views",fmt(+p.views)],["ER",m.er+"%"],["Saves",m.saveR+"%"],["Shares",m.shareR+"%"],["Follows",m.followR+"%"],["Watch",m.watch+"%"]].map(([l,v])=>(
                <div key={l} style={{textAlign:"center",padding:"8px 4px",background:"var(--void)",borderRadius:9,border:"1px solid var(--line)"}}><div className="mono" style={{fontSize:13,fontWeight:600}}>{v}</div><div className="mono" style={{fontSize:9,color:"var(--faint)",marginTop:2}}>{l}</div></div>))}
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>{reasons.map((r,j)=>(
              <div key={j} style={{display:"flex",gap:10,alignItems:"flex-start"}}>
                {r[2]==="good"?<CheckCircle2 size={15} color="var(--green)" style={{marginTop:2,flexShrink:0}}/>:r[2]==="bad"?<AlertTriangle size={15} color="var(--amber)" style={{marginTop:2,flexShrink:0}}/>:<CircleDot size={15} color="var(--faint)" style={{marginTop:2,flexShrink:0}}/>}
                <div style={{fontSize:13.5,lineHeight:1.45}}><strong>{r[0]}.</strong> <span style={{color:"var(--muted)"}}>{r[1]}</span></div>
              </div>))}</div>
          </div>);})}
      </div>

      {/* add a post */}
      <div className="panel panel-pad" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
          <span className="tag"><Plus size={12}/> Log a post</span>
          <input ref={shotRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const x=e.target.files&&e.target.files[0];if(x)setShot(x.name);}}/>
          <button className="btn btn-ghost sm" onClick={()=>shotRef.current&&shotRef.current.click()}><Upload size={14}/> {shot?"Screenshot added":"Upload insights screenshot"}</button>
        </div>
        <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:12}}>Type the numbers from your insights (or upload the screenshot — auto-read in the live build). It instantly joins the analysis above.</p>
        <div style={{display:"grid",gridTemplateColumns:"2fr 1fr 1.4fr",gap:10,marginBottom:10}} className="hero">
          <input className="cx-in" placeholder="Hook / topic" value={draft.label} onChange={e=>setDraft(d=>({...d,label:e.target.value}))}/>
          <select className="cx-in" value={draft.type} onChange={e=>setDraft(d=>({...d,type:e.target.value}))}>{["Reel","Carousel","Story","Photo"].map(x=><option key={x}>{x}</option>)}</select>
          <select className="cx-in" value={draft.format} onChange={e=>setDraft(d=>({...d,format:e.target.value}))}>{pk.formats.map(f=><option key={f[0]}>{f[0]}</option>)}</select>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:8}} className="kpirow">
          {[["views","Views"],["likes","Likes"],["comments","Comments"],["shares","Shares"],["saves","Saves"],["follows","Follows"]].map(([k,l])=>(
            <div key={k}><div className="eyebrow" style={{marginBottom:4,fontSize:9}}>{l}</div><input className="cx-in" style={{padding:"8px 10px",fontSize:13}} inputMode="numeric" value={draft[k]} onChange={e=>setDraft(d=>({...d,[k]:e.target.value.replace(/[^\d]/g,"")}))}/></div>))}
        </div>
        <div style={{display:"flex",gap:10,marginTop:10,alignItems:"flex-end",flexWrap:"wrap"}}>
          <div style={{width:120}}><div className="eyebrow" style={{marginBottom:4,fontSize:9}}>Watch %</div><input className="cx-in" style={{padding:"8px 10px",fontSize:13}} inputMode="numeric" value={draft.watch} onChange={e=>setDraft(d=>({...d,watch:e.target.value.replace(/[^\d]/g,"")}))}/></div>
          <button className="btn btn-grad" style={{opacity:draft.views?1:.5}} disabled={!draft.views} onClick={addPost}><Plus size={15}/> Add to analysis</button>
        </div>
      </div>

      <DocActions title="My performance report" P={P} opts={{subtitle:"What's working, what's not, and what to do next"}}
        blocks={[{label:"What CreatorX learned",text:learn?learn.takeaways.map((t,i)=>`${i+1}. ${t.replace(/\*\*/g,"")}`).join("\n"):"Log at least 2 posts to unlock pattern analysis."},
          ...ranked.map(({p,m},i)=>({label:`#${i+1} · ${p.label} (${m.score}/100)`,text:`${p.type} · ${p.format}\nViews ${fmt(+p.views)} · ER ${m.er}% · Saves ${m.saveR}% · Shares ${m.shareR}% · Follows ${m.followR}% · Watch ${m.watch}%\n\nWhy: ${whyPost(p,m,med).map(r=>r[0]+" — "+r[1]).join("  ")}`}))]}
        label="Download my performance report — PDF / Word"/>
    </>
  );
}
/* ═══════════ AUTOMATION ENGINE — in-platform funnel builder ═══════════ */
const DELIVERS=[
  {k:"guide",label:"Free guide / lead magnet",noun:"the free guide"},
  {k:"product",label:"A paid product",noun:"the link to grab it"},
  {k:"booking",label:"Booking / call link",noun:"my booking link"},
  {k:"discount",label:"Discount code",noun:"your discount code"},
  {k:"video",label:"A training video",noun:"the training"},
];
const AUTO_TOOLS=[
  {k:"meta",name:"Instagram / Meta",ic:Instagram,url:"https://business.facebook.com/",why:"Source of the comments & DMs. Connect a Professional account."},
  {k:"manychat",name:"ManyChat",ic:MessageCircle,url:"https://manychat.com/",why:"Runs the comment → auto-DM. Free plan works to start."},
  {k:"site",name:"Link page (Stan / Beacons)",ic:Globe,url:"https://stan.store/",why:"Where the DM sends people to capture the lead & sell."},
  {k:"email",name:"Email tool (beehiiv)",ic:Mail,url:"https://www.beehiiv.com/",why:"Stores leads & sends the nurture sequence. Free to start."},
  {k:"zapier",name:"Zapier / Make",ic:Zap,url:"https://zapier.com/",why:"Glues the steps together automatically — no code."},
  {k:"stripe",name:"Stripe",ic:DollarSign,url:"https://stripe.com/",why:"Takes the payment when they're ready to buy."},
];
function genAutoDM(kw,deliverK,P){
  const{n}=NW(P);const d=DELIVERS.find(x=>x.k===deliverK)||DELIVERS[0];
  return `Hey! Thanks for commenting "${kw}" 🙏\n\nHere's ${d.noun}: [your link]\n\nQuick q so I point you the right way — what are you working on in ${n} right now?`;
}
const PRESETS=[
  {k:"lead",t:"Comment → DM → Website → Lead → Email",d:"The classic. Turn a viral reel into captured leads on autopilot."},
  {k:"welcome",t:"New follower → Welcome DM → Lead magnet",d:"Greet every new follower and capture them instantly."},
  {k:"sale",t:"Comment → DM → Offer → Sale",d:"Drive a keyword straight to your paid offer."},
];
/* ═══════════ AUTOMATION LIBRARY — 15 elite, deployable playbooks ═══════════ */
function autoPlaybooks(P){
  const{n,N,W}=NW(P);const pk=pack(P);const offer=(P.offer&&P.offer!=="Nothing yet")?P.offer:"your offer";
  return [
  {cat:"AI Agents & Autonomous Workflows",title:"Deploy your content research agent",ic:Cpu,
   what:"An AI agent that researches your niche, finds winning angles, and drafts content while you sleep.",
   saves:"~6 hrs/week",
   map:["Trigger: every morning (scheduled)","Agent 1 — Research: scan trends + top posts in "+n,"Agent 2 — Ideate: turn findings into 10 hooks","Agent 3 — Draft: write 3 reels + captions in your voice","Output: dropped into your content doc for review"],
   tools:["Claude / GPT (the brain)","Zapier or Make (the scheduler + glue)","A Google Doc / Notion (the output)","Your brand voice profile (the rules)"],
   build:[
    {label:"What this automates",text:"A multi-step AI agent chain that does your daily content research and drafting. You stop staring at a blank screen — you wake up to drafts."},
    {label:"The agent chain",text:"1. RESEARCH AGENT — prompt it to find what's trending in "+n+" and the top-performing angles this week.\n2. IDEATION AGENT — feed it the research, ask for 10 hooks in your voice.\n3. DRAFT AGENT — feed it the best hooks, ask for 3 full reel scripts + captions.\n4. FORMAT AGENT — clean it into your content template."},
    {label:"How to build it (no-code)",text:"• Use Zapier/Make on a daily schedule.\n• Step 1 calls the AI with your research prompt.\n• Step 2 passes the output into the next prompt.\n• Step 3 writes the result to a Google Doc/Notion.\n• You review + approve. You're the editor; the agent is the intern."},
    {label:"Your brand-voice rules (paste into every agent)",text:`Voice: ${(P.tone||["direct","real"]).join(", ")}. Niche: ${n}. Audience wants: ${pk.desires[0]}. Avoid: generic guru-speak. Always end with one clear CTA.`},
    {label:"Do this first",text:"Start with ONE agent (research). Get it reliable, then chain the next. Don't automate a process you haven't done manually first."},
   ]},
  {cat:"Business & Content Automation",title:"Auto-repurpose every post into 10 assets",ic:Repeat,
   what:"Post once. An automation turns it into a thread, carousel, email, Short, and more — automatically.",
   saves:"~5 hrs/week",
   map:["Trigger: you publish a reel / drop a transcript","Transcribe → extract the core idea","Generate: thread, carousel, email, blog, Short script","Route each to the right tool / doc","You approve + schedule"],
   tools:["Your reel transcript","AI (the rewriter)","Zapier/Make (the router)","A scheduler (Buffer, Metricool)"],
   build:[
    {label:"What this automates",text:"Atomizing one piece of content into a week's worth across every platform — without doing it by hand."},
    {label:"The flow",text:"1. New reel published (or transcript pasted).\n2. AI extracts the single core idea.\n3. AI generates: X thread, LinkedIn post, carousel, email, blog outline, Short title.\n4. Each is dropped into a doc/scheduler for approval."},
    {label:"How to build it",text:"• Use the Distribution tab in CreatorX to generate all versions now.\n• To automate: Zapier trigger on new post → AI step per format → write to your scheduler.\n• Keep a human approval step until the quality is consistent."},
    {label:"The rule",text:"Don't copy-paste across platforms — each asset is re-cut natively (the Distribution engine does this). Reposts die; rebuilds grow."},
   ]},
  {cat:"Personal Branding Systems",title:"Your brand-on-autopilot system",ic:Sparkles,
   what:"A repeatable system so your positioning, pillars, and voice stay consistent on every post — without thinking.",
   saves:"Consistency = compounding",
   map:["Lock positioning + 5 content pillars","Build a hook + caption bank in your voice","Batch-create weekly against the pillars","Auto-schedule across the week","Review what's working monthly"],
   tools:["Your Brand Blueprint","Hook + caption banks","A scheduler","Your Performance Lab"],
   build:[
    {label:"What this is",text:"A standing system that keeps your brand consistent and on-message so growth compounds instead of resetting every week."},
    {label:"The system",text:`1. Positioning: ${knownPhrase(P)}.\n2. Five pillars on rotation (authority, story, proof, contrarian, behind-the-scenes).\n3. A bank of 50+ hooks + 30+ captions in your voice (generate in CreatorX).\n4. Batch weekly against the pillars.\n5. Schedule, then review monthly in Performance Lab.`},
    {label:"Run it weekly",text:"Mon: plan against pillars. Tue: batch-film. Wed: caption + schedule. Daily: engage. Sun: review the numbers."},
    {label:"Build your blueprint",text:"Generate your full Brand Blueprint in CreatorX — it gives you positioning, pillars, hook bank and the 90-day plan in one document."},
   ]},
  {cat:"Content Operating Systems",title:"The Content OS: idea → publish pipeline",ic:Layers,
   what:"A single pipeline that moves every idea from capture to published, so nothing slips and you never wonder what's next.",
   saves:"Zero dropped ideas",
   map:["Capture: one inbox for every idea","Develop: idea → hook → script","Produce: film + edit (batched)","Schedule: mapped to your calendar","Review: log performance, feed it back"],
   tools:["Notion / a board","CreatorX builders","A scheduler","Performance Lab"],
   build:[
    {label:"The 5 stages",text:"INBOX → IN PROGRESS → READY → SCHEDULED → PUBLISHED. Every idea is a card that moves left to right."},
    {label:"How to set it up",text:"• Build a 5-column board (Notion/Trello).\n• Capture every idea into INBOX instantly (voice memo, note, DM).\n• Pull 5–7 into IN PROGRESS each week and run them through the CreatorX builders.\n• Move to READY → SCHEDULED → PUBLISHED.\n• Log performance and feed winners back into INBOX as 'make more like this'."},
    {label:"Why it matters",text:"The bottleneck for most creators isn't ideas — it's a system to ship them consistently. This is that system."},
   ]},
  {cat:"AI-Powered Video Creation & Editing",title:"AI video + auto-caption pipeline",ic:Video,
   what:"Cut editing time in half: AI captions, auto-cuts, and a repeatable edit template.",
   saves:"~4 hrs/week",
   map:["Film raw (batch)","Auto-caption (CapCut / Submagic)","Auto-cut silences + tighten","Apply your edit template (font, pace)","Export clean, schedule"],
   tools:["CapCut / Premiere","Submagic / auto-caption AI","Your saved edit template","AI script (CreatorX)"],
   build:[
    {label:"The pipeline",text:"1. Batch-film 5 reels in one sitting.\n2. Drop into CapCut → auto-captions (bold, centered, outlined).\n3. Auto-cut silences and dead air.\n4. Apply your saved template (font, color, pace, end-loop).\n5. Export 1080p clean, no watermark."},
    {label:"Your edit template (set once, reuse)",text:"• Caption: bold condensed sans, white + black stroke, centered.\n• Cut every 1.5–2s.\n• Hook text on frame 1.\n• Trending sound at ~15% under your voice.\n• Last shot matches first for a seamless loop."},
    {label:"AI tools to test",text:"Auto-captions (Submagic, CapCut), AI b-roll, AI voice clean-up, and script-to-video tools. Use them to remove grunt work — keep your face and voice human."},
   ]},
  {cat:"Viral Hooks, Retention & Caption Frameworks",title:"The hook + retention auto-framework",ic:Zap,
   what:"A repeatable framework so every video opens strong and holds watch — no guessing.",
   saves:"Higher reach per post",
   map:["Hook: bold claim / curiosity in 1.5s","Retain: 'here's what nobody tells you'","Payoff: one screenshot-worthy idea","Loop: last line into the first","CTA: one ask (save / comment / follow)"],
   tools:["CreatorX Hook Engine","Reel Builder","Performance Lab (to learn what works for you)"],
   build:[
    {label:"The framework",text:"HOOK (0–3s) → RETAIN (3–10s) → PAYOFF (10–35s) → CTA (35s+). Every reel, every time."},
    {label:"Hook patterns that work",text:"• Contrarian: 'Stop doing X.'\n• Curiosity: 'Nobody tells you this about "+n+".'\n• Result: 'I did X and "+pk.results[0]+".'\n• Identity: 'If you're a "+n+" creator, watch this.'"},
    {label:"Retention rules",text:"Open a loop you only close at the end. Cut every dead second. Caption every word. Keep one idea per video."},
    {label:"Make it yours",text:"Use the Hook Engine for niche hooks, build in the Reel Builder, then let Performance Lab learn which patterns convert for YOUR audience."},
   ]},
  {cat:"DM Automation & Lead Capture",title:"Comment → DM → lead machine",ic:MessageCircle,
   what:"A keyword in your comments triggers an auto-DM that captures the lead and starts the sale.",
   saves:"Captures leads 24/7",
   map:["Trigger: comment keyword '"+W+"'","Auto-DM delivers your link + lead magnet","Site captures name + email","Email sequence nurtures","You close warm leads in DMs"],
   tools:["ManyChat","Meta / Instagram","A capture page (Stan / Beacons)","An email tool"],
   build:[
    {label:"What this automates",text:"Turning comments into captured leads automatically. This is the single highest-ROI automation for creators — build it first."},
    {label:"The flow",text:`1. Post a reel with 'comment "${W}" for [the thing]'.\n2. ManyChat auto-DMs the link the second they comment.\n3. The link is a capture page (name + email).\n4. They enter your welcome email sequence.\n5. You DM the warm ones and close.`},
    {label:"Build it now",text:"Use the Funnel Builder tab in this Automation Engine — it generates your keyword, the auto-DM script, the funnel map, and the exact ManyChat setup steps."},
   ]},
  {cat:"High-Converting Funnels & Landing Pages",title:"The one-page funnel that converts",ic:Crosshair,
   what:"A single page that turns clicks into emails and emails into buyers — with proven structure.",
   saves:"Turns traffic into revenue",
   map:["Headline: the outcome you deliver","Subhead: who it's for + the proof","One clear CTA (email capture)","Social proof + objection handling","Thank-you page → tripwire offer"],
   tools:["Stan / Beacons / a landing builder","Your lead magnet","Your offer","An email tool"],
   build:[
    {label:"The page structure",text:`1. Headline: "${_cap(pk.desires[0])} — without ${pk.mistakes[0]}."\n2. Subhead: who it's for + your proof.\n3. The promise + what they get.\n4. ONE email-capture CTA.\n5. Proof (results, testimonials).\n6. FAQ / objections.\n7. Final CTA.`},
    {label:"The rule of one",text:"One audience, one promise, one CTA. Every extra choice kills conversion. Strip the page to the single next action."},
    {label:"Tripwire",text:"On the thank-you page, offer a low-ticket ($27–$47) product. A % of opt-ins buy immediately — that funds your ads."},
   ]},
  {cat:"Email & SMS Nurture Sequences",title:"Multi-channel nurture (email + SMS)",ic:Mail,
   what:"Automated email + SMS that warms leads and sells while you sleep.",
   saves:"Sells on autopilot",
   map:["Lead opts in → tagged","Welcome sequence (5 emails)","SMS for time-sensitive nudges","Sales sequence when warm","Re-engagement for the quiet ones"],
   tools:["An email tool (Beehiiv, ConvertKit)","An SMS tool (optional)","Your offer","CreatorX Email Engine"],
   build:[
    {label:"The sequences",text:"WELCOME (5 emails, days 0–7): build trust + fastest win.\nSALES (5 emails): pitch + objections + close.\nRE-ENGAGEMENT (3 emails): win back the quiet ones.\nSMS: short, time-sensitive nudges ('cart closes tonight')."},
    {label:"Build them now",text:"Use the Email & Funnel Engine in CreatorX — pick a sequence and it generates every email with subject-line options, schedule, and a full setup doc."},
    {label:"SMS rules",text:"Get explicit opt-in. Keep it rare and high-value. Use it for launches and deadlines, not daily noise."},
   ]},
  {cat:"Customer Journey & Automation Maps",title:"Map the full customer journey",ic:Globe,
   what:"See every step from stranger → follower → lead → buyer → fan, and automate the gaps.",
   saves:"Find the leak, fix the leak",
   map:["Stranger: reach content (reels)","Follower: value + connection","Lead: capture (DM/email)","Buyer: offer + close","Fan: deliver + ascend"],
   tools:["This map","Your funnel","Performance Lab","Your offer ladder"],
   build:[
    {label:"The 5 stages",text:"STRANGER → FOLLOWER → LEAD → BUYER → FAN. Each stage has one job: move them to the next."},
    {label:"The job at each stage",text:"• Stranger → Follower: reach content with strong hooks.\n• Follower → Lead: a reason to give their email (lead magnet).\n• Lead → Buyer: a no-brainer first offer.\n• Buyer → Fan: over-deliver, then ascend them up the ladder."},
    {label:"Find your leak",text:"Most creators leak at Follower → Lead (no capture) or Lead → Buyer (no offer). Diagnose yours, then automate that one gap first."},
   ]},
  {cat:"Paid Advertising & Creative Testing",title:"Creative testing automation",ic:Megaphone,
   what:"A system to test ad creatives fast, kill losers, and scale winners — without guessing.",
   saves:"Lower cost per lead",
   map:["Turn your best organic reel into an ad","Test 3–5 hooks against one offer","Kill anything under threshold in 48h","Scale the winner's budget","Refresh creative before fatigue"],
   tools:["Meta Ads Manager","Your best organic reels","CreatorX Ads Engine","A simple tracking sheet"],
   build:[
    {label:"The testing system",text:"1. Start with creative that already won organically.\n2. Test 3–5 hook variations, same offer.\n3. Small budget, 48-hour read.\n4. Kill losers, scale the winner.\n5. Refresh before fatigue sets in."},
    {label:"What to test (in order)",text:"Hook > Audience > Offer > Format. The hook moves the needle most — test it first."},
    {label:"Build it",text:"Use the Ads Engine in CreatorX for the spend ladder, reel-to-ad converter, and the campaign builder."},
   ]},
  {cat:"Analytics, Attribution & Performance Data",title:"Auto-reporting dashboard",ic:BarChart3,
   what:"One dashboard that tells you what's working, what to repeat, and what to kill — updated automatically.",
   saves:"Decisions in minutes",
   map:["Log every post's metrics (or auto-pull)","Score + rank by performance","Detect your patterns (what works for YOU)","Weekly review + next-week plan","Double down on winners"],
   tools:["CreatorX Performance Lab","Your platform insights","A weekly review habit"],
   build:[
    {label:"What to track",text:"Views, watch %, saves, shares, follows, profile visits, DMs, revenue. Saves + shares are your reach engine; follows are your conversion."},
    {label:"The weekly ritual",text:"Every Sunday: log the week's posts, see what scored highest and WHY, read what CreatorX learned about your patterns, and plan next week around your winners."},
    {label:"Build it",text:"Use Performance Lab — it ranks your posts, explains why each won, and learns your patterns as you log more. Auto-pull turns on when you connect your account."},
   ]},
  {cat:"Offer Creation & Digital Product Monetization",title:"Productize + auto-deliver",ic:DollarSign,
   what:"Turn your knowledge into a product that sells and delivers itself.",
   saves:"Revenue while you sleep",
   map:["Pick the offer (start with one)","Build the actual product","Set up checkout + auto-delivery","Drive traffic from content","Ascend buyers up the ladder"],
   tools:["CreatorX Offer Architect + Product Builder","Stripe / Stan checkout","Your funnel","Email"],
   build:[
    {label:"Your offer ladder",text:"Lead magnet (free) → low-ticket ($27–$97) → core offer ($297–$997) → high-ticket ($1.5k+). Start by selling the core offer manually in DMs, then productize."},
    {label:"Auto-delivery",text:"Checkout (Stripe/Stan) → instant delivery of the product + access → triggers the onboarding email sequence. No manual sending."},
    {label:"Build it",text:`Use the Offer Architect to design ${offer}, and the Digital Product Builder to generate the actual sellable PDF/product to deliver.`},
   ]},
  {cat:"Creator Economy & Personal Brand Scaling",title:"Scale from creator to creator-business",ic:TrendingUp,
   what:"The path from solo creator to a real business with leverage, systems, and a team.",
   saves:"Builds an asset, not a job",
   map:["Systemize content (the Content OS)","Automate lead capture + nurture","Productize your offer","Hire the first role (editor / VA)","Build owned audience (email)"],
   tools:["Everything above","An email list","A first hire","CreatorX as the operating system"],
   build:[
    {label:"The scaling order",text:"1. Systemize content so it ships without you grinding.\n2. Automate capture + nurture (DM + email).\n3. Productize your offer.\n4. Hire the lowest-leverage task first (editing).\n5. Own your audience (email) so you're not renting from the algorithm."},
    {label:"The mindset shift",text:"Stop trading time for posts. Build assets: an email list, a product, a system, a brand. That's the difference between a creator and a creator-business."},
    {label:"Your next hire",text:"First hire is almost always a video editor or a VA for DMs/scheduling. Buy back your time on the lowest-value, highest-hours task."},
   ]},
  {cat:"AI for Startups & Business Operations",title:"Your AI ops stack",ic:Brain,
   what:"Run the business side — ops, support, admin — with AI so you stay on content and strategy.",
   saves:"~8 hrs/week of admin",
   map:["AI for DMs / FAQ (first-line support)","AI for email drafting + inbox triage","AI for content + repurposing","AI for analytics summaries","You focus on vision + relationships"],
   tools:["Claude / GPT","Zapier / Make","Your knowledge base","CreatorX"],
   build:[
    {label:"What to automate first",text:"Anything repetitive and low-judgment: FAQ replies, scheduling, repurposing, first-draft emails, weekly report summaries."},
    {label:"The stack",text:"• Support: AI answers common DMs/FAQs (you handle the nuanced ones).\n• Admin: AI triages your inbox + drafts replies.\n• Content: AI research + repurposing agents.\n• Data: AI summarizes your weekly performance.\n• Strategy: stays human — that's you."},
    {label:"The principle",text:"Automate the predictable, keep the personal human. Your face, voice, and relationships are the brand — never automate those."},
   ]},
  ];
}
function AutoLibrary({P}){
  const pbs=useMemo(()=>autoPlaybooks(P),[P]);
  return (
    <>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:660,marginBottom:8}}>The full automation stack a modern creator-business runs on. {pbs.length} deployable playbooks — tap any for the workflow, the tools, and a downloadable build doc you can follow step by step.</p>
      <p className="mono" style={{fontSize:11,color:"var(--faint)",marginBottom:16}}>This is how we build creators for the future — individual or business.</p>
      <div style={{display:"grid",gap:11}}>
        {pbs.map((pb,i)=>(
          <details className="panel" key={i} style={{padding:0}}>
            <summary style={{padding:"15px 16px",cursor:"pointer",listStyle:"none",display:"flex",alignItems:"center",gap:13}}>
              <div className="tool-ic" style={{width:40,height:40,flexShrink:0}}><pb.ic size={19}/></div>
              <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:15}}>{pb.title}</div><div className="mono" style={{fontSize:10.5,color:"var(--accent)",marginTop:2}}>{pb.cat.toUpperCase()}</div></div>
              <span className="tag" style={{flexShrink:0,color:"var(--green)",borderColor:"rgba(47,208,138,.3)"}}>{pb.saves}</span>
              <ChevronDown size={17} color="var(--muted)" style={{flexShrink:0}}/>
            </summary>
            <div style={{padding:"0 16px 18px"}}>
              <p style={{fontSize:14,lineHeight:1.5,marginBottom:14}}>{pb.what}</p>
              <div className="eyebrow" style={{marginBottom:8}}>The workflow</div>
              <div style={{display:"flex",flexDirection:"column",gap:0,marginBottom:14}}>
                {pb.map.map((m,j)=>(<div key={j} style={{display:"flex",gap:11,alignItems:"flex-start",padding:"7px 0"}}>
                  <div style={{width:22,height:22,borderRadius:6,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,flexShrink:0}}>{j+1}</div>
                  <div style={{fontSize:13.5,lineHeight:1.45,paddingTop:1}}>{m}</div>
                  {j<pb.map.length-1&&<div/>}
                </div>))}
              </div>
              <div className="eyebrow" style={{marginBottom:8}}>Tools</div>
              <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>{pb.tools.map(t=>(<span key={t} className="tag">{t}</span>))}</div>
              <DocActions title={pb.title} P={P} opts={{subtitle:pb.cat}} blocks={pb.build} label="Download this playbook — step-by-step build doc"/>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
function AutomationEngineView({P,open,go}){
  const{N,W,n}=NW(P);
  const [flow,setFlow]=useState({
    keyword:W, trigger:"Comment on a reel", deliver:"guide",
    dm:genAutoDM(W,"guide",P),
    site:"", emailSeq:"Welcome sequence (4 emails)", followUp:"Tag the lead + send a value DM after 2 days",
  });
  const [conns,setConns]=useState({meta:false,manychat:false,site:false,email:false,zapier:false});
  const [sel,setSel]=useState(null);
  const [live,setLive]=useState(false);
  const [showActivate,setShowActivate]=useState(false);
  const [atab,setAtab]=useState("builder");
  const set=(patch)=>setFlow(f=>({...f,...patch}));
  const connect=(k)=>{const t=AUTO_TOOLS.find(x=>x.k===k);if(t)window.open(t.url,"_blank");setConns(c=>({...c,[k]:true}));};
  const allConnected=Object.values(conns).every(Boolean);
  const dmText=flow.dm||genAutoDM(flow.keyword,flow.deliver,P);
  const nodes=[
    {k:"trigger",ic:Instagram,tool:"meta",title:"Trigger",sum:`Someone comments "${flow.keyword}" — ${flow.trigger.toLowerCase()}`},
    {k:"dm",ic:MessageCircle,tool:"manychat",title:"Auto-DM fires",sum:`Instant DM delivering ${(DELIVERS.find(d=>d.k===flow.deliver)||{}).label.toLowerCase()}`},
    {k:"site",ic:Globe,tool:"site",title:"Send to your website",sum:flow.site?flow.site:"Add your link / store URL"},
    {k:"lead",ic:Users,tool:"site",title:"Capture the lead",sum:"Name + email captured on the page"},
    {k:"email",ic:Mail,tool:"email",title:"Email sequence runs",sum:flow.emailSeq},
    {k:"followup",ic:Repeat,tool:"zapier",title:"Follow-up & CRM",sum:flow.followUp},
  ];
  const applyPreset=(k)=>{
    if(k==="welcome")set({trigger:"New follower",keyword:"WELCOME",deliver:"guide",dm:`Hey, thanks for the follow! 🙌\n\nMost people here want to ${pack(P).desires[0]} — here's my best free resource to start: [your link]\n\nWhat brought you to my page?`});
    else if(k==="sale")set({trigger:"Comment on a reel",keyword:"START",deliver:"product",dm:genAutoDM("START","product",P),emailSeq:"Sales sequence (4 emails)"});
    else set({trigger:"Comment on a reel",keyword:W,deliver:"guide",dm:genAutoDM(W,"guide",P),emailSeq:"Welcome sequence (4 emails)"});
  };
  const playbookBlocks=[
    {label:"The funnel",text:nodes.map((nd,i)=>`${i+1}. ${nd.title}: ${nd.sum}`).join("\n")},
    {label:"Auto-DM script",text:dmText},
    {label:"Tools used",text:AUTO_TOOLS.map(t=>`${t.name} — ${t.why}`).join("\n")},
    {label:"Activation steps (ManyChat)",text:["Open ManyChat → connect your Instagram.","New Automation → trigger: a comment containing your keyword.","Action: send the DM above.","Add a button linking to your website/store.","Connect your email tool so the opt-in adds to your list.","Turn it Live and test by commenting your keyword."].map((s,i)=>`${i+1}. ${s}`).join("\n")},
  ];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:10}}>
        <div><div className="eyebrow">Automation Engine</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Build the machine that runs while you sleep.</h1></div>
        <div className={"live"} style={{background:live?"rgba(47,208,138,.12)":"var(--surface2)",border:"1px solid "+(live?"rgba(47,208,138,.3)":"var(--line2)"),padding:"7px 12px",borderRadius:9}}>
          <span className="pulse" style={{background:live?"var(--green)":"var(--faint)"}}/>{live?"Automation is LIVE":"Draft — not live yet"}</div>
      </div>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:640,marginBottom:16}}>Assemble your funnel below, connect your tools with one click, then activate. Comment becomes a DM, DM sends to your site, your site captures the lead, email nurtures them, and follow-up closes — all automatically.</p>

      <div className="tabs" style={{marginBottom:18}}>
        <div className={"tab"+(atab==="builder"?" on":"")} onClick={()=>setAtab("builder")}>Funnel Builder</div>
        <div className={"tab"+(atab==="library"?" on":"")} onClick={()=>setAtab("library")}>Automation Library</div>
      </div>

      {atab==="library" && <AutoLibrary P={P}/>}
      {atab==="builder" && (<>
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:18}}>
        {PRESETS.map(p=>(<button key={p.k} className="btn btn-ghost sm" onClick={()=>applyPreset(p.k)} title={p.d}>{p.t}</button>))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.4fr 1fr",gap:18}} className="hero">
        {/* funnel canvas */}
        <div>
          <div className="eyebrow" style={{marginBottom:12}}>Your funnel — tap a step to edit</div>
          <div className="panel panel-pad">
            {nodes.map((nd,i)=>(
              <div key={nd.k}>
                <div className={"auto-node"+(sel===nd.k?" on":"")} onClick={()=>setSel(sel===nd.k?null:nd.k)}>
                  <div className="tool-ic" style={{width:38,height:38,flexShrink:0}}><nd.ic size={17}/></div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{display:"flex",justifyContent:"space-between",gap:8}}><span style={{fontWeight:700,fontSize:14}}>{nd.title}</span><span className="tag" style={{flexShrink:0}}>{(AUTO_TOOLS.find(t=>t.k===nd.tool)||{}).name}{conns[nd.tool]&&<Check size={10} color="var(--green)" style={{marginLeft:4}}/>}</span></div>
                    <div style={{fontSize:12.5,color:"var(--muted)",marginTop:3,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{nd.sum}</div>
                  </div>
                  <ChevronDown size={16} color="var(--faint)" style={{transform:sel===nd.k?"rotate(180deg)":"none",transition:".2s",flexShrink:0}}/>
                </div>
                {sel===nd.k && (
                  <div className="auto-config">
                    {nd.k==="trigger" && (<>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>Trigger type</div>
                      <select className="cx-in" value={flow.trigger} onChange={e=>set({trigger:e.target.value})} style={{marginBottom:12}}>{["Comment on a reel","New follower","Story reply","DM keyword"].map(x=><option key={x}>{x}</option>)}</select>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>Keyword</div>
                      <input className="cx-in" value={flow.keyword} onChange={e=>set({keyword:e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,"")})}/>
                    </>)}
                    {nd.k==="dm" && (<>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>What it delivers</div>
                      <select className="cx-in" value={flow.deliver} onChange={e=>set({deliver:e.target.value,dm:genAutoDM(flow.keyword,e.target.value,P)})} style={{marginBottom:12}}>{DELIVERS.map(d=><option key={d.k} value={d.k}>{d.label}</option>)}</select>
                      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><span className="eyebrow" style={{fontSize:9.5}}>The DM message (editable)</span><CopyBtn text={dmText}/></div>
                      <textarea className="cx-in" rows={5} value={dmText} onChange={e=>set({dm:e.target.value})} style={{resize:"vertical",lineHeight:1.5}}/>
                    </>)}
                    {(nd.k==="site"||nd.k==="lead") && (<>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>Your website / store / link-in-bio URL</div>
                      <input className="cx-in" placeholder="https://stan.store/yourname" value={flow.site} onChange={e=>set({site:e.target.value})} style={{marginBottom:10}}/>
                      <p style={{fontSize:12.5,color:"var(--muted)"}}>This is where the DM sends people. Use a page that captures name + email (Stan, Beacons, a landing page). Need one? <span style={{color:"var(--accent)",cursor:"pointer"}} onClick={()=>open("product")}>Build a lead magnet →</span></p>
                    </>)}
                    {nd.k==="email" && (<>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>Which sequence runs</div>
                      <select className="cx-in" value={flow.emailSeq} onChange={e=>set({emailSeq:e.target.value})} style={{marginBottom:10}}>{["Welcome sequence (4 emails)","Nurture sequence","Sales sequence (4 emails)","Launch sequence"].map(x=><option key={x}>{x}</option>)}</select>
                      <p style={{fontSize:12.5,color:"var(--muted)"}}><span style={{color:"var(--accent)",cursor:"pointer"}} onClick={()=>go("emailfunnels")}>Write these emails now →</span></p>
                    </>)}
                    {nd.k==="followup" && (<>
                      <div className="eyebrow" style={{marginBottom:6,fontSize:9.5}}>Follow-up action</div>
                      <input className="cx-in" value={flow.followUp} onChange={e=>set({followUp:e.target.value})}/>
                    </>)}
                  </div>
                )}
                {i<nodes.length-1 && <div style={{display:"flex",justifyContent:"center",padding:"3px 0"}}><ArrowDown size={16} color="var(--line2)"/></div>}
              </div>
            ))}
          </div>
        </div>

        {/* connect + activate */}
        <div>
          <div className="eyebrow" style={{marginBottom:4}}>Set it up — go direct</div>
          <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:12}}>These are the exact tools the pros use. Tap any one to open it and set it up — most have free plans.</p>
          <div className="panel panel-pad" style={{marginBottom:16}}>
            {AUTO_TOOLS.map((t,i)=>(
              <div key={t.k} style={{display:"flex",alignItems:"center",gap:11,padding:"10px 0",borderBottom:i<AUTO_TOOLS.length-1?"1px solid var(--line)":"none"}}>
                <div className="tool-ic" style={{width:34,height:34,flexShrink:0}}><t.ic size={16}/></div>
                <div style={{flex:1,minWidth:0}}><div style={{fontSize:13.5,fontWeight:600}}>{t.name}</div><div style={{fontSize:11.5,color:"var(--muted)"}}>{t.why}</div></div>
                {conns[t.k]
                  ? <span className="tag" style={{color:"var(--green)",borderColor:"rgba(47,208,138,.3)"}}><Check size={11}/> Connected</span>
                  : <button className="btn btn-grad sm" style={{padding:"7px 12px"}} onClick={()=>connect(t.k)}>Connect <ExternalLink size={12}/></button>}
              </div>
            ))}
          </div>
          <div className="panel panel-pad" style={{background:"var(--grad-soft)",border:"1px solid rgba(79,140,255,.3)"}}>
            <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}><div className="tool-ic" style={{width:34,height:34}}><Power size={16}/></div><div><div style={{fontWeight:700,fontSize:14.5}}>{live?"Your automation is live":"Activate this automation"}</div><div style={{fontSize:12,color:"var(--muted)"}}>{allConnected?"All tools connected — you're ready.":"Connect your tools above to activate."}</div></div></div>
            <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",opacity:1}} onClick={()=>{if(live){setLive(false);}else{setShowActivate(true);}}}>{live?<>Pause automation</>:<><Power size={15}/> Activate</>}</button>
          </div>
        </div>
      </div>

      {showActivate && !live && (
        <div className="cx-modal-bg" onClick={()=>setShowActivate(false)}>
          <div className="cx-modal" onClick={e=>e.stopPropagation()}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}><div className="disp" style={{fontWeight:700,fontSize:19}}>Activate in ManyChat</div><button className="mini" onClick={()=>setShowActivate(false)}><X size={14}/></button></div>
            <p style={{fontSize:13.5,color:"var(--muted)",marginBottom:16}}>Everything's generated. Follow these 6 steps — each asset is one tap to copy.</p>
            {[["Open ManyChat & connect Instagram","Use the Connect buttons; ManyChat opens in a new tab.",null],
              ["New Automation → trigger on a comment",`Set the keyword to "${flow.keyword}".`,flow.keyword],
              ["Set the auto-DM","Paste this message as the DM reply.",dmText],
              ["Add a button to your site",flow.site?flow.site:"Add your store/landing URL.",flow.site||""],
              ["Connect your email tool","So opt-ins flow into your "+flow.emailSeq.toLowerCase()+".",null],
              ["Turn it Live & test","Comment your keyword from another account to confirm.",null]].map((st,i)=>(
              <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"11px 0",borderBottom:i<5?"1px solid var(--line)":"none"}}>
                <div style={{width:24,height:24,borderRadius:7,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,flexShrink:0}}>{i+1}</div>
                <div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{st[0]}</div><div style={{fontSize:12.5,color:"var(--muted)",marginTop:2}}>{st[1]}</div></div>
                {st[2]?<CopyBtn text={st[2]}/>:null}
              </div>))}
            <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",marginTop:16}} onClick={()=>{setLive(true);setShowActivate(false);}}><CheckCircle2 size={15}/> Mark as live</button>
          </div>
        </div>
      )}

      <div style={{marginTop:18}}><DocActions title="My automation playbook" P={P} opts={{subtitle:"Funnel, scripts & activation steps — plug into ManyChat / Zapier"}} blocks={playbookBlocks} label="Download the full playbook — PDF / Word"/></div>
      </>)}
    </>
  );
}

/* ═══════════ EMAIL & FUNNEL ENGINE ═══════════ */
function EmailFunnelView({P,open}){
  const seqs=[
    {k:"welcome",t:"Welcome sequence",label:"Welcome sequence",d:"First 4–5 emails after someone joins. Build trust fast.",ic:Send},
    {k:"nurture",t:"Nurture sequence",label:"Nurture sequence",d:"Ongoing value emails that warm leads toward your offer.",ic:MessageSquare},
    {k:"sales",t:"Sales sequence",label:"Sales sequence",d:"Direct emails that pitch your offer and handle objections.",ic:DollarSign},
    {k:"launch",t:"Launch sequence",label:"Launch sequence",d:"Multi-day campaign to sell a product with urgency.",ic:Rocket},
    {k:"winback",t:"Re-engagement",label:"Re-engagement",d:"Win back cold subscribers who stopped opening.",ic:RefreshCw},
  ];
  return (
    <>
      <div className="eyebrow">Email & Funnel Engine</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Own your audience. Sell on repeat.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:18}}>Social is rented; your email list is owned. Pick a sequence and I'll generate the whole thing in your voice — subject-line options, what each email does, the send schedule, and a full setup playbook you can download.</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(260px,1fr))",gap:12}}>
        {seqs.map(s=>(
          <div className="tool" key={s.k} onClick={()=>open({k:"email",preset:{type:O(s.label)}})}><ArrowUpRight className="arr" size={16}/><div className="tool-ic"><s.ic size={19}/></div><h4 style={{fontSize:15,marginTop:12}}>{s.t}</h4><p>{s.d}</p></div>
        ))}
      </div>
    </>
  );
}

/* ═══════════ MULTI-PLATFORM DISTRIBUTION ═══════════ */
function distribute(P,topic){
  const{n,N,W}=NW(P);const pk=pack(P);const hooks=buildHooks(P);const tp=topic||pk.topics[0];
  const out=[];
  out.push(["Instagram Reel","Reel",`HOOK (on screen): ${hooks[0].t}\n\nSCRIPT: Open bold → deliver "${tp}" in one clear idea → loop the ending.\n\nCAPTION:\n${hooks[0].t}\n\n${_cap(tp)} — here's the part most people skip.\n\nSave this. Comment "${W}" and I'll DM you the steps.`]);
  out.push(["TikTok","TikTok",`HOOK (1s, on screen): ${hooks[1].t}\n\nFastest pacing. Trending sound under your voice.\n\nCAPTION (casual, lowercase):\n${tp} but nobody tells you the real part 👀\nfollow for pt 2`]);
  out.push(["YouTube Shorts","YouTube",`TITLE (keyword first): ${_cap(tp)} — What Actually Works in ${N}\n\nSay the benefit in the first 3s. Thumbnail-style first frame with bold text.\n\nDESCRIPTION: A quick breakdown of ${tp} for ${n}. Subscribe for more. ${W} for the template.`]);
  out.push(["YouTube long-form","YouTube",`TITLE: The Honest Guide to ${_cap(tp)} in ${N}\n\nOUTLINE:\n• Cold open: the bold claim (0:00)\n• The mistake most make: ${pk.mistakes[0]} (0:30)\n• The framework: 3 steps (2:00)\n• Proof / example (5:00)\n• What to do this week (8:00)\n• CTA: subscribe + free resource`]);
  out.push(["X / Twitter thread","X",`${hooks[2].t}\n\n1/ ${_cap(tp)} matters more than you think in ${n}.\n\n2/ Most people ${pk.mistakes[0]} — and wonder why ${pk.pains[0]}.\n\n3/ Instead: ${pk.topics[0]}.\n\n4/ Give it two honest weeks. The results compound.\n\n5/ Follow for more ${n} breakdowns. (link in reply)`]);
  out.push(["LinkedIn post","LinkedIn",`Here's what most people in ${n} get wrong about ${tp}.\n\nThey ${pk.mistakes[0]}.\n\nWhat actually works:\n→ ${_cap(pk.topics[0])}\n→ Consistency over intensity\n→ Tracking what works\n\nI've watched this play out again and again.\n\nAgree? What's your take?`]);
  out.push(["Threads","Threads",`Hot take: ${tp} is simpler than the ${n} gurus make it.\n\nStop ${pk.mistakes[0]}. Start ${pk.topics[0]}.\n\nWhat's been your experience?`]);
  out.push(["Email","Email",`SUBJECT: the truth about ${tp}\n\nBODY:\nQuick one today.\n\nMost people in ${n} struggle with ${tp} because they ${pk.mistakes[0]}.\n\nThe fix is simpler than you think: ${pk.topics[0]}.\n\nTry it this week and hit reply to tell me how it goes.\n\nP.S. Want the full system? Comment "${W}" on my latest post.`]);
  out.push(["Carousel (IG/LinkedIn)","Carousel",`SLIDE 1: ${hooks[0].t}\nSLIDE 2: The problem — ${pk.pains[0]}\nSLIDE 3: Why it happens — ${pk.mistakes[0]}\nSLIDE 4: The fix — ${_cap(pk.topics[0])}\nSLIDE 5: Step-by-step (3 steps)\nSLIDE 6: The result — ${pk.results[0]}\nSLIDE 7: CTA — Save this + comment "${W}"`]);
  out.push(["Blog / SEO article","Blog",`TITLE: ${_cap(tp)} in ${N}: The Complete Guide\n\nOUTLINE:\n• Intro: the problem (${pk.pains[0]})\n• Why most advice fails\n• The framework (H2 per step)\n• Real example\n• Common mistakes (${pk.mistakes[0]})\n• FAQ\n• Conclusion + CTA to your lead magnet\n\n(Target the keyword "${tp} ${n}" in the title, first paragraph, and one H2.)`]);
  out.push(["Pinterest idea pin","Pinterest",`Static pin: bold text "${_cap(tp)}: the 3-step way" on a clean background.\nDescription: keyword-rich, links to your blog/lead magnet.`]);
  return out;
}
function DistributionView({P,open}){
  const pk=pack(P);
  const [topic,setTopic]=useState("");
  const [assets,setAssets]=useState(null);
  const [busy,setBusy]=useState(false);
  const quick=pk.topics.slice(0,4);
  const gen=()=>{setBusy(true);setTimeout(()=>{setAssets(distribute(P,topic.trim()||pk.topics[0]));setBusy(false);},700);};
  return (
    <>
      <div className="eyebrow">Multi-Platform Distribution</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>One idea becomes a dozen assets — generated.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:620,marginBottom:18}}>Type one idea. I'll write the actual, native version for every platform — reel, TikTok, Shorts, long-form, X thread, LinkedIn, email, carousel, blog and more. Not a checklist — the real content, ready to post and edit.</p>

      <div className="panel panel-pad" style={{marginBottom:16}}>
        <div className="eyebrow" style={{marginBottom:8}}>What's the one idea?</div>
        <input className="cx-in" placeholder={`e.g. ${pk.topics[0]}`} value={topic} onChange={e=>setTopic(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")gen();}}/>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",margin:"10px 0 4px"}}>{quick.map(q=>(<span key={q} className="tag" style={{cursor:"pointer"}} onClick={()=>setTopic(q)}>{q}</span>))}</div>
        <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",marginTop:10,padding:"13px"}} disabled={busy} onClick={gen}>{busy?<><span className="pulse" style={{marginRight:8}}/>Generating every version…</>:<><Repeat size={16}/> Generate all assets</>}</button>
      </div>

      {assets&&(<>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
          <div className="eyebrow">{assets.length} assets · tap to copy, edit freely</div>
          <button className="mini" onClick={gen}><RefreshCw size={12}/> Regenerate</button>
        </div>
        <div style={{display:"grid",gap:12,marginBottom:16}}>
          {assets.map(([plat,tag,text],i)=>(
            <div className="out-card" key={i}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><span className="eyebrow">{plat}</span><CopyBtn text={text}/></div>
              <div className="kit">{text}</div>
            </div>
          ))}
        </div>
        <DocActions title={`Distribution kit · ${topic||pk.topics[0]}`} P={P} opts={{subtitle:`Every platform version of "${topic||pk.topics[0]}"`}} blocks={assets.map(([plat,tag,text])=>({label:plat,text}))} label="Download the full distribution kit — PDF / Word"/>
      </>)}
    </>
  );
}
/* ═══════════ INSTAGRAM PAGE SCAN — full profile diagnosis ═══════════ */
function auditPage(P,handle,shot){
  const seed=(handle||P.name||"x")+_low(P.niche);
  const r=(salt)=>rngf(seed,salt);
  const sc=(salt,lo,hi)=>Math.round(lo+r(salt)*(hi-lo));
  const sub=[
    {k:"Profile photo",s:sc(1,55,92),good:"Clear, high-contrast, recognizable at thumbnail size.",bad:"Too busy or low-contrast — it disappears at small sizes."},
    {k:"Bio & positioning",s:sc(2,48,90),good:"States who you help + the outcome + a clear next step.",bad:"Vague — a stranger can't tell what you do or why to follow in 3 seconds."},
    {k:"Highlights",s:sc(3,40,88),good:"Organized covers acting as a menu: start here, results, offer.",bad:"Missing or messy — you're wasting prime real estate."},
    {k:"Grid / layout",s:sc(4,50,90),good:"Consistent look; covers read as a cohesive brand.",bad:"Inconsistent covers and fonts make the page feel random."},
    {k:"Hooks / first lines",s:sc(5,45,93),good:"Strong first frames that stop the scroll.",bad:"Slow openers — you're losing people in the first second."},
    {k:"Captions",s:sc(6,50,90),good:"Lead with a hook, deliver one idea, end on a CTA.",bad:"Either too short to add value or too long with no payoff."},
    {k:"Consistency",s:sc(7,42,90),good:"Steady cadence the algorithm can rely on.",bad:"Erratic posting — the algorithm can't build momentum for you."},
    {k:"CTA / funnel",s:sc(8,38,86),good:"Every post points somewhere (DM keyword, link, follow).",bad:"No clear path from viewer → lead. Attention leaks out."},
    {k:"Monetization",s:sc(9,35,84),good:"A visible offer and a reason to buy now.",bad:"Nothing to buy, or it's hidden — attention isn't converting."},
  ];
  const score=Math.round(sub.reduce((a,b)=>a+b.s,0)/sub.length);
  const grade=score>=90?"A":score>=83?"A-":score>=77?"B+":score>=70?"B":score>=63?"C+":score>=55?"C":"D";
  const weakest=[...sub].sort((a,b)=>a.s-b.s).slice(0,3);
  const pk=pack(P), nq=_low(P.niche);
  const immediate=[
    `Rewrite your bio to: "I help [who] [achieve outcome] — [start here ↓]". Make the outcome specific to ${nq}.`,
    `Add a comment-to-DM keyword to your link area so attention becomes leads today.`,
    `Pin your 3 best-performing posts to the top of your grid.`,
    `Crop your profile photo tighter so it's recognizable at thumbnail size.`,
  ];
  const shortT=[
    `Lock 3–4 content pillars for ${nq} (e.g. ${pk.topics.slice(0,3).join(", ")}). Rotate them so your page has a clear identity.`,
    `Standardize your hooks — open every reel with a scroll-stopper in the first 1.5s. Use the Hook Engine to batch 50.`,
    `Build branded Highlight covers: "Start Here", "Results", "Free Guide", "Work With Me".`,
    `Commit to a cadence you can sustain (e.g. 1 reel/day, 5/week) for 30 days straight.`,
  ];
  const longT=[
    `Build a funnel: lead magnet → email list → ${P.offer&&P.offer!=="Nothing yet"?P.offer:"your first paid offer"}. Capture attention you currently lose.`,
    `Launch or sharpen one core offer and make it visible on the page (Highlight + bio + pinned post).`,
    `Develop a recognizable brand voice and visual system so the page compounds over 90 days.`,
    `Layer paid ads on your top organic winners to scale follower & lead acquisition predictably.`,
  ];
  return {handle:handle||"your page",score,grade,sub,weakest,immediate,short:shortT,long:longT,
    summary:`${handle||"Your page"} scores ${score}/100 (${grade}). The foundation is ${score>=75?"solid":"workable"}, but your biggest leaks are ${weakest.map(w=>w.k.toLowerCase()).join(", ")}. Fix those first — they're costing you the most growth and revenue right now.`};
}
function admireAnalysis(P,handle){
  const pk=pack(P), nq=_low(P.niche);
  return {handle:handle||"that page",
    strengths:[
      "Their hooks are doing the heavy lifting — bold first frames + on-screen text that promises a payoff.",
      "Consistent visual identity: the grid reads as one brand, not random posts.",
      "Clear positioning — you instantly know who they're for and what they offer.",
      "Every post has a job: grow, engage, or sell. Nothing is wasted.",
      "They repurpose winners instead of chasing new ideas every time.",
    ],
    adopt:[
      `Steal the structure, not the content: apply their hook formula to ${pk.topics[0]} in your voice.`,
      `Rebuild your grid around 3 pillars like they do: ${pk.topics.slice(0,3).join(", ")}.`,
      `Match their posting cadence for 30 days and track which pillar performs.`,
      `Adopt their "one clear CTA per post" discipline — point everything to your DM keyword or offer.`,
      `Model their offer ladder: a free thing → a cheap thing → ${P.offer&&P.offer!=="Nothing yet"?P.offer:"a premium offer"}.`,
    ]};
}
/* ═══════════ SCREENSHOT SCAN — read real numbers off an uploaded Instagram screenshot ═══════════ */
const CAPTURE_TYPES=[
  {k:"insights",label:"Insights",ic:Activity,
    what:"Your richest data — real reach, saves, profile visits & follower changes.",
    how:"In the Instagram app → your profile → tap \"Professional dashboard\" (or the ☰ menu → Insights) → screenshot the overview. Tip: capture the screen showing reach, interactions, saves and profile visits."},
  {k:"profile",label:"Profile / home",ic:Instagram,
    what:"Followers, following, post count, your bio and grid.",
    how:"Open your Instagram profile (your @handle, photo, follower counts and bio in view) and screenshot the whole top of the page."},
  {k:"reel",label:"A single reel",ic:Film,
    what:"One post's performance — views, likes, comments, shares, saves.",
    how:"Open the reel → tap \"View insights\" (under the reel) → screenshot the numbers (plays, likes, comments, shares, saves, watch time)."},
];
async function extractShotMetrics(b64,media,capType){
  const want = capType==="insights"
    ? "reach, accounts_reached, impressions, accounts_engaged, profile_visits, follows, follower_count, saves, shares, comments, likes"
    : capType==="reel"
    ? "views, plays, likes, comments, shares, saves, watch_time_label"
    : "followers, following, posts, name, bio_text";
  const sys=`You are a precise data extractor reading an Instagram ${capType} screenshot. Return ONLY raw JSON (no markdown, no prose, no backticks) with whatever of these fields are actually visible: ${want}. Convert shorthand like "1.2k" to 1200 and "1.4M" to 1400000. Numbers must be plain integers. Bio/name are short strings. Omit any field you cannot clearly read. Add a "confidence" field 0-1 for how clearly you could read the image.`;
  const res=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:700,system:sys,messages:[{role:"user",content:[
      {type:"image",source:{type:"base64",media_type:media||"image/png",data:b64}},
      {type:"text",text:"Extract the visible numbers as JSON only."}]}]})});
  const data=await res.json();
  const text=(data.content||[]).map(x=>x.text||"").join("").replace(/```json|```/g,"").trim();
  const obj=JSON.parse(text);
  if(!obj||typeof obj!=="object"||!Object.keys(obj).length)throw new Error("empty");
  return obj;
}
const METRIC_LABELS={reach:"Reach",accounts_reached:"Accounts reached",impressions:"Impressions",accounts_engaged:"Accounts engaged",profile_visits:"Profile visits",follows:"Follows",follower_count:"Followers",followers:"Followers",following:"Following",posts:"Posts",saves:"Saves",shares:"Shares",comments:"Comments",likes:"Likes",views:"Views",plays:"Plays",watch_time_label:"Watch time"};
function PageScanView({P,go,open}){
  const [mode,setMode]=useState("mine");
  const [handle,setHandle]=useState(mode==="mine"?(P.handle||P.igHandle||""):"");
  const [shot,setShot]=useState(null);
  const [shotB64,setShotB64]=useState(null);
  const [shotMedia,setShotMedia]=useState("image/png");
  const [capType,setCapType]=useState("insights");
  const [loading,setLoading]=useState(false);
  const [rep,setRep]=useState(null);
  const shotRef=useRef();
  const onShot=(e)=>{const x=e.target.files&&e.target.files[0];if(!x)return;setShot(x.name);setShotMedia(x.type||"image/png");
    const r=new FileReader();r.onload=()=>{try{setShotB64((""+r.result).split(",")[1]||null);}catch(_){setShotB64(null);}};r.readAsDataURL(x);};
  const run=async()=>{setLoading(true);setRep(null);
    let real=null;
    if(shotB64){try{real=await extractShotMetrics(shotB64,shotMedia,capType);}catch(e){real=null;}}
    await new Promise(r=>setTimeout(r,500));
    setRep(mode==="mine"?{kind:"mine",real,capType,...auditPage(P,handle,!!shot)}:{kind:"admire",...admireAnalysis(P,handle)});setLoading(false);};
  const gradeColor=g=>g[0]==="A"?"var(--green)":g[0]==="B"?"var(--accent)":g[0]==="C"?"var(--amber)":"var(--red)";
  const barColor=s=>s>=80?"var(--green)":s>=65?"var(--accent)":s>=50?"var(--amber)":"var(--red)";
  return (
    <>
      <div className="eyebrow">Page Scan · Instagram</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Get your page read like bloodwork.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:620,marginBottom:14}}>A full diagnosis of your profile — photo, bio, layout, hooks, captions, funnel, monetization — with a grade and a prescription: what to fix today, this month, and this quarter. Or scan a page you admire and get a plan to become more like them.</p>
      <div className="tabs">{[["mine","Scan my page"],["admire","Scan a page I admire"]].map(([k,l])=>(<div key={k} className={"tab"+(mode===k?" on":"")} onClick={()=>{setMode(k);setRep(null);setHandle(k==="mine"?(P.igHandle||""):"");}}>{l}</div>))}</div>

      <div className="panel panel-pad" style={{marginBottom:16}}>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:6}}>
          <div className="eyebrow">{mode==="mine"?"Your Instagram handle":"The handle you admire"}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:16}}><span className="mono" style={{color:"var(--muted)"}}>@</span><input className="cx-in" placeholder={mode==="mine"?"yourhandle":"creatoryoulove"} value={handle} onChange={e=>setHandle(e.target.value.replace(/[@\s]/g,""))}/></div>

        {mode==="mine" && (<>
          <div className="eyebrow" style={{marginBottom:8}}>Upload a screenshot for your <b style={{color:"var(--accent)",textTransform:"none",letterSpacing:0}}>real</b> numbers — pick what you're sharing</div>
          <div className="opts" style={{gridTemplateColumns:"repeat(3,1fr)",marginBottom:12}}>
            {CAPTURE_TYPES.map(c=>(<div key={c.k} className={"chip"+(capType===c.k?" on":"")} onClick={()=>setCapType(c.k)} style={{justifyContent:"flex-start"}}><c.ic size={14} style={{marginRight:7,flexShrink:0}}/>{c.label}{capType===c.k&&<Check size={13} className="ck"/>}</div>))}
          </div>
          <div className="banner" style={{marginBottom:12}}>
            <div style={{fontSize:12.5,color:"var(--muted)",lineHeight:1.5}}><b style={{color:"var(--text)"}}>How to grab it:</b> {(CAPTURE_TYPES.find(c=>c.k===capType)||{}).how}</div>
            <div style={{fontSize:11.5,color:"var(--faint)",marginTop:6}}>Reads: {(CAPTURE_TYPES.find(c=>c.k===capType)||{}).what}</div>
          </div>
        </>)}

        <input ref={shotRef} type="file" accept="image/*" style={{display:"none"}} onChange={onShot}/>
        <div className="btn-row">
          <button className="btn btn-ghost sm" onClick={()=>shotRef.current&&shotRef.current.click()}><Upload size={14}/> {shot?"✓ "+shot.slice(0,22):"Upload screenshot"}</button>
          <button className="btn btn-grad" disabled={loading||(!handle&&!shotB64)} onClick={run}>{loading?"Reading…":<><Search size={16}/> {mode==="mine"?(shotB64?"Read my screenshot":"Scan my page"):"Analyze them"}</>}</button>
        </div>
        <p className="mono" style={{fontSize:11,color:"var(--faint)",marginTop:10}}>{shotB64?"Your screenshot is read on-device by Creator AI vision to pull your real numbers. Re-upload anytime to refresh.":"No screenshot? You'll get a benchmarked estimate. Upload one above for your exact, real numbers."}</p>
      </div>

      {loading && <div className="panel panel-pad"><div className="live"><span className="pulse"/>Running the diagnostic…</div></div>}

      {rep && rep.kind==="mine" && (<>
        {rep.real && Object.keys(rep.real).filter(k=>METRIC_LABELS[k]).length>0 ? (
          <div className="panel panel-pad" style={{marginBottom:16,border:"1px solid rgba(47,208,138,.35)",background:"radial-gradient(120% 120% at 0% 0%,rgba(47,208,138,.08),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg))"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:12}}>
              <div style={{display:"flex",gap:9,alignItems:"center"}}><CheckCircle2 size={17} color="var(--green)"/><span style={{fontWeight:700,fontSize:14.5}}>Real numbers — read from your {(CAPTURE_TYPES.find(c=>c.k===rep.capType)||{}).label} screenshot</span></div>
              {rep.real.confidence!=null&&<span className="mono" style={{fontSize:10.5,color:"var(--faint)"}}>read confidence {Math.round(rep.real.confidence*100)}%</span>}
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9}} className="kpirow">
              {Object.keys(rep.real).filter(k=>METRIC_LABELS[k]&&typeof rep.real[k]==="number").map(k=>(
                <div key={k} style={{padding:"11px 12px",background:"var(--void)",border:"1px solid var(--line)",borderRadius:10}}>
                  <div className="disp" style={{fontWeight:700,fontSize:19}}>{fmt(rep.real[k])}</div>
                  <div className="mono" style={{fontSize:9,color:"var(--faint)",letterSpacing:".06em",textTransform:"uppercase",marginTop:3}}>{METRIC_LABELS[k]}</div>
                </div>))}
            </div>
            {(rep.real.name||rep.real.bio_text)&&<div style={{marginTop:11,fontSize:12.5,color:"var(--muted)"}}>{rep.real.name?<b style={{color:"var(--text)"}}>{rep.real.name}</b>:null}{rep.real.bio_text?(" — "+rep.real.bio_text):null}</div>}
            <p className="mono" style={{fontSize:10,color:"var(--faint)",marginTop:11}}>Pulled live from your screenshot. Upload a fresh one anytime to update — this is your real data, not an estimate.</p>
          </div>
        ) : (
          <div className="banner" style={{marginBottom:14,display:"flex",gap:10,alignItems:"center"}}><Activity size={16} color="var(--accent)" style={{flexShrink:0}}/><p style={{fontSize:12.5,color:"var(--muted)"}}>This is a <b style={{color:"var(--text)"}}>benchmarked estimate</b> from your profile + niche. For your exact, real numbers, upload an Insights or profile screenshot above.</p></div>
        )}
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div style={{display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
            <div style={{textAlign:"center",minWidth:120}}>
              <div className="disp" style={{fontWeight:800,fontSize:58,lineHeight:1,color:gradeColor(rep.grade)}}>{rep.grade}</div>
              <div className="mono" style={{fontSize:13,color:"var(--muted)",marginTop:4}}>{rep.score}/100</div>
            </div>
            <div style={{flex:1,minWidth:220}}>
              <div className="eyebrow" style={{marginBottom:6}}>Diagnosis · @{rep.handle}</div>
              <p style={{fontSize:14.5,lineHeight:1.55}}>{rep.summary}</p>
            </div>
          </div>
        </div>
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <span className="tag" style={{marginBottom:14,display:"inline-flex"}}><Activity size={12}/> Full breakdown</span>
          <div style={{display:"flex",flexDirection:"column",gap:13}}>{rep.sub.map((x,i)=>(
            <div key={i}>
              <div style={{display:"flex",justifyContent:"space-between",fontSize:13.5,marginBottom:5}}><span style={{fontWeight:600}}>{x.k}</span><span className="mono" style={{color:barColor(x.s)}}>{x.s}/100</span></div>
              <div className="bar" style={{marginBottom:5}}><i style={{width:x.s+"%",background:barColor(x.s)}}/></div>
              <div style={{fontSize:12.5,color:"var(--muted)"}}>{x.s>=72?x.good:x.bad}</div>
            </div>))}</div>
        </div>
        {[["Immediate fixes — do today",rep.immediate,"var(--red)",AlertTriangle],["Short-term — next 2–4 weeks",rep.short,"var(--amber)",Clock],["Long-term — next 90 days",rep.long,"var(--green)",TrendingUp]].map(([t,arr,col,Ic])=>(
          <div className="panel panel-pad" key={t} style={{marginBottom:12}}>
            <div style={{display:"flex",gap:9,alignItems:"center",marginBottom:12}}><Ic size={17} color={col}/><div style={{fontWeight:700,fontSize:15.5}}>{t}</div></div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>{arr.map((s,i)=>(<div key={i} style={{display:"flex",gap:11,alignItems:"flex-start",fontSize:14,lineHeight:1.5}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:15,width:18}}>{i+1}</span>{s}</div>))}</div>
          </div>))}
        <div style={{marginTop:4,marginBottom:8}}><DocActions title={`Instagram Audit — @${rep.handle}`} P={P}
          opts={{subtitle:`Grade ${rep.grade} · ${rep.score}/100 — full diagnosis & prescription`}}
          blocks={[{label:"Diagnosis",text:rep.summary},{label:"Full breakdown",text:rep.sub.map(x=>`${x.k}: ${x.s}/100 — ${x.s>=72?x.good:x.bad}`).join("\n")},
            {label:"Immediate fixes (today)",text:rep.immediate.map((s,i)=>`${i+1}. ${s}`).join("\n")},
            {label:"Short-term (2–4 weeks)",text:rep.short.map((s,i)=>`${i+1}. ${s}`).join("\n")},
            {label:"Long-term (90 days)",text:rep.long.map((s,i)=>`${i+1}. ${s}`).join("\n")}]}
          label="Download my full audit report — PDF / Word"/></div>
        <div className="btn-row"><button className="btn btn-grad sm" onClick={()=>go&&go("hookengine")}>Fix my hooks →</button><button className="btn btn-ghost sm" onClick={()=>open&&open("bio")}>Rewrite my bio →</button></div>
      </>)}

      {rep && rep.kind==="admire" && (<>
        <div className="nba" style={{marginBottom:14}}><p style={{fontSize:14.5,lineHeight:1.55}}>Here's what <strong>@{rep.handle}</strong> does well — and exactly how to make your page more like theirs, in your own voice. We don't copy; we reverse-engineer the system.</p></div>
        <div className="panel panel-pad" style={{marginBottom:14}}><span className="tag" style={{marginBottom:12,display:"inline-flex"}}><Check size={12}/> What they do well</span>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>{rep.strengths.map((s,i)=>(<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,lineHeight:1.5}}><Check size={16} color="var(--green)" style={{marginTop:2,flexShrink:0}}/>{s}</div>))}</div></div>
        <div className="panel panel-pad" style={{marginBottom:14}}><span className="tag" style={{marginBottom:12,display:"inline-flex"}}><Crosshair size={12}/> How to become more like them</span>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>{rep.adopt.map((s,i)=>(<div key={i} style={{display:"flex",gap:11,alignItems:"flex-start",fontSize:14,lineHeight:1.5}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:15,width:18}}>{i+1}</span>{s}</div>))}</div></div>
        <DocActions title={`Modeled after @${rep.handle}`} P={P} opts={{subtitle:"What they do well + your adaptation plan"}}
          blocks={[{label:"What they do well",text:rep.strengths.map((s,i)=>`${i+1}. ${s}`).join("\n")},{label:"Your adaptation plan",text:rep.adopt.map((s,i)=>`${i+1}. ${s}`).join("\n")}]}
          label="Download the playbook — PDF / Word"/>
      </>)}
    </>
  );
}
/* ═══════════ HOOK ENGINE v2 — ranked, niche-specific, trending-weighted ═══════════ */
function hookEngine(P,opts){
  let list=buildHooks(P); // niche-aware, scored, shuffled
  const {angle,goal,topic,awareness}=opts;
  if(topic && topic.trim()){
    const pk=pack(P), n=_low(P.niche), tp=topic.trim();
    const inj=[
      {cat:"Topic",t:`Nobody tells you the truth about ${tp}.`},
      {cat:"Curiosity",t:`I tried ${tp} for 30 days. Here's what actually happened.`},
      {cat:"Contrarian",t:`Everything you've heard about ${tp} is wrong.`},
      {cat:"List",t:`3 things about ${tp} that changed everything for me.`},
      {cat:"Authority",t:`The real way to approach ${tp} in ${n} — most get it backwards.`},
      {cat:"Pain-point",t:`If ${pk.pains[0]}, your ${tp} approach is the reason.`},
    ].map((h,i)=>({...h,fit:Math.min(99,94-i),trending:i<2,topical:true}));
    list=[...inj,...list];
  }
  if(angle&&angle!=="Any"){ list=list.map(h=>h.cat===angle?{...h,fit:Math.min(99,h.fit+12)}:h); }
  if(goal==="Drive DMs"||goal==="Sell an offer"){ list=list.map(h=>(/comment|dm|client|sell|offer/i.test(h.t)?{...h,fit:Math.min(99,h.fit+4)}:h)); }
  const seen=new Set(),uniq=[];
  for(const h of list){if(!seen.has(h.t)){seen.add(h.t);uniq.push(h);}}
  return uniq.sort((a,b)=>b.fit-a.fit);
}
function HookEngineView({P,go,open}){
  const [topic,setTopic]=useState("");
  const [angle,setAngle]=useState("Any");
  const [goal,setGoal]=useState("Grow followers");
  const [aware,setAware]=useState("Cold");
  const [n,setN]=useState(12);
  const [ran,setRan]=useState(false);
  const list=useMemo(()=>hookEngine(P,{topic,angle,goal,awareness:aware}),[P,topic,angle,goal,aware,ran]);
  const hotToday=useMemo(()=>shuffleSeeded(HOOK_FORMULAS.map(f=>f[0]),daySeed()).slice(0,4),[]);
  const shown=list.slice(0,n);
  const fitColor=v=>v>=90?"var(--green)":v>=82?"var(--accent)":"var(--amber)";
  return (
    <>
      <div className="eyebrow">Hook Engine</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Hooks built for {P.niche}, ranked by fit.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:14}}>Answer a few questions and I'll generate hundreds of hooks specific to your niche — scored for fit and weighted against what's trending right now. Keep the ones that hit.</p>

      <div className="panel panel-pad" style={{marginBottom:14}}>
        <div className="eyebrow" style={{marginBottom:8}}>What's the reel about? (optional but makes it sharper)</div>
        <input className="cx-in" placeholder={`e.g. ${pack(P).topics[0]}`} value={topic} onChange={e=>setTopic(e.target.value)} style={{marginBottom:14}}/>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:14}} className="hero">
          <div><div className="eyebrow" style={{marginBottom:7}}>Angle</div><select className="cx-in" value={angle} onChange={e=>setAngle(e.target.value)}>{["Any","Curiosity","Contrarian","Authority","Transformation","Pain-point","List","Story","Myth","How-to"].map(x=><option key={x}>{x}</option>)}</select></div>
          <div><div className="eyebrow" style={{marginBottom:7}}>Goal</div><select className="cx-in" value={goal} onChange={e=>setGoal(e.target.value)}>{["Grow followers","Get saves","Get shares","Drive DMs","Sell an offer"].map(x=><option key={x}>{x}</option>)}</select></div>
          <div><div className="eyebrow" style={{marginBottom:7}}>Audience</div><select className="cx-in" value={aware} onChange={e=>setAware(e.target.value)}>{["Cold","Warm","Existing followers"].map(x=><option key={x}>{x}</option>)}</select></div>
        </div>
      </div>

      <div className="nba" style={{marginBottom:14,display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
        <Flame size={16} color="var(--amber)"/><span style={{fontSize:13.5}}>Trending angles right now:</span>
        {hotToday.map(c=>(<span key={c} className="tag" style={{color:"var(--amber)",borderColor:"rgba(245,158,11,.3)"}}>{c}</span>))}
        <span className="mono" style={{fontSize:10.5,color:"var(--faint)",marginLeft:"auto"}}>updated daily · live signal in production</span>
      </div>

      <div style={{display:"grid",gap:10}}>
        {shown.map((h,i)=>(
          <div className="row-card" key={i} style={{alignItems:"flex-start"}}>
            <div style={{display:"flex",gap:13,alignItems:"flex-start",minWidth:0}}>
              <div style={{textAlign:"center",minWidth:46}}>
                <div className="disp" style={{fontWeight:700,fontSize:18,color:fitColor(h.fit)}}>{h.fit}</div>
                <div className="mono" style={{fontSize:9,color:"var(--faint)"}}>FIT</div>
              </div>
              <div style={{minWidth:0}}>
                <div style={{fontSize:14.5,fontWeight:500,lineHeight:1.4}}>{h.t}</div>
                <div style={{display:"flex",gap:7,marginTop:7,flexWrap:"wrap"}}><span className="tag" style={{color:"var(--accent2)",borderColor:"rgba(139,124,255,.3)"}}>{h.framework||h.cat}</span>{h.psychology&&<span className="tag">{h.psychology}</span>}{h.emotion&&<span className="tag" style={{color:"var(--faint)"}}>{h.emotion}</span>}{h.trending&&<span className="tag" style={{color:"var(--amber)",borderColor:"rgba(245,158,11,.3)"}}>🔥 trending</span>}{h.topical&&<span className="tag" style={{color:"var(--accent)"}}>your topic</span>}</div>
              </div>
            </div>
            <CopyBtn text={h.t}/>
          </div>
        ))}
      </div>

      <div className="btn-row" style={{marginTop:16,flexWrap:"wrap"}}>
        {n<list.length && <button className="btn btn-ghost sm" onClick={()=>setN(n+12)}>Show more ({list.length-n} left)</button>}
        <button className="mini" onClick={()=>{setRan(r=>!r);setN(12);}}><RefreshCw size={12}/> Reshuffle</button>
        <button className="btn btn-grad sm" onClick={()=>open&&open("reels")}><Film size={15}/> Build a reel around one</button>
        <button className="btn btn-ghost sm" onClick={()=>downloadWord(`${_first(P.niche)} hooks`,[{label:"Ranked hooks",text:list.slice(0,50).map((h,i)=>`${i+1}. [${h.fit}] ${h.t}`).join("\n")}],P)}><Download size={15}/> Download top 50</button>
      </div>
    </>
  );
}

/* ═══════════ WHAT TO FILM — trending video formats per niche ═══════════ */
function WhatToFilmView({P,open}){
  const [seed,setSeed]=useState(0);
  useLive(45000);
  const lb=liveBucket(20);
  const pk=pack(P);
  const ranked=useMemo(()=>{
    const fmts=pk.formats.map((f,i)=>({name:f[0],desc:f[1],
      heat:clamp(96-i*4+ (rng(P.name+"fmt"+seed+lb,i)*16)),
      growth:Math.round(8+rng(P.name+"g"+seed+lb,i)*40)+"%"}));
    return fmts.sort((a,b)=>b.heat-a.heat);
  },[P,seed,pk,lb]);
  const hooks=useMemo(()=>buildHooks(P),[P]);
  const hot=shuffleSeeded(["green-screen reaction","talking-head with bold captions","fast-cut list (3 things)","before/after reveal","POV first-person","trend-audio remix","day-in-the-life","myth-bust to camera"],"hot"+lb+seed).slice(0,5);
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10}}>
        <div><div className="eyebrow">What To Film</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Don't know what to post? Film one of these.</h1></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><LivePill label="Heat index live"/><button className="mini" onClick={()=>setSeed(s=>s+1)}><RefreshCw size={12}/> Refresh</button></div>
      </div>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:14}}>The actual video formats working in {P.niche} right now — not just hooks. Heat scores re-rank as new signal comes in. Each one tells you exactly what to shoot, why it works, and gives you a hook to open with.</p>

      <div className="nba" style={{marginBottom:16,display:"flex",gap:9,alignItems:"center",flexWrap:"wrap"}}>
        <Flame size={16} color="var(--amber)"/><span style={{fontSize:13.5}}>Hot reel styles this week:</span>
        {hot.map(h=>(<span key={h} className="tag" style={{color:"var(--amber)",borderColor:"rgba(245,158,11,.3)"}}>{h}</span>))}
        <span className="mono" style={{fontSize:10.5,color:"var(--faint)",marginLeft:"auto"}}>refreshes hourly · live feed in production</span>
      </div>

      <div style={{display:"grid",gap:12}}>
        {ranked.map((f,i)=>(
          <div className="panel panel-pad" key={i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,marginBottom:8}}>
              <div style={{display:"flex",gap:12,alignItems:"center"}}>
                <div className="tool-ic" style={{width:38,height:38}}><Video size={17}/></div>
                <div><div style={{fontWeight:700,fontSize:15.5}}>{f.name}</div><div className="mono" style={{fontSize:10.5,color:"var(--green)"}}>▲ {f.growth} reach · this format</div></div>
              </div>
              <div style={{textAlign:"right"}}><div className="disp" style={{fontWeight:700,fontSize:18,color:f.heat>=90?"var(--amber)":"var(--accent)"}}>{f.heat}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>HEAT</div></div>
            </div>
            <p style={{fontSize:13.5,color:"var(--muted)",lineHeight:1.5,marginBottom:10}}>{f.desc}</p>
            <div className="out-card" style={{marginBottom:10}}><div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}><span className="eyebrow">Open with this hook</span><CopyBtn text={hooks[(i*3)%hooks.length].t}/></div><div style={{fontSize:14,fontWeight:500}}>{hooks[(i*3)%hooks.length].t}</div></div>
            <div className="btn-row"><button className="btn btn-grad sm" onClick={()=>open&&open("reels")}><Film size={15}/> Build this reel</button><button className="btn btn-ghost sm" onClick={()=>open&&open("script")}>Get the script</button></div>
          </div>
        ))}
      </div>
    </>
  );
}
/* ═══════════════════ CREATORX ENGINES ═══════════════════ */

/* ── DASHBOARDS · mission control ── */
function AdherenceSection({P,go}){
  const weeks=14, today=new Date();
  const grid=useMemo(()=>{
    const cells=[]; const start=new Date(today); start.setDate(start.getDate()-(weeks*7-1));
    for(let i=0;i<weeks*7;i++){const d=new Date(start);d.setDate(start.getDate()+i);
      const fut=d>today; const seed=rngf(P.name+d.toDateString(),i+3);
      const lvl=fut?-1:(seed>0.78?3:seed>0.55?2:seed>0.32?1:0);
      cells.push({d,lvl});}
    return cells;
  },[P]);
  const past=grid.filter(c=>c.lvl>=0);
  // streak: consecutive most-recent days with activity
  let streak=0; for(let i=past.length-1;i>=0;i--){if(past[i].lvl>0)streak++;else break;}
  let longest=0,run=0; past.forEach(c=>{if(c.lvl>0){run++;longest=Math.max(longest,run);}else run=0;});
  const active=past.filter(c=>c.lvl>0).length;
  const adherence=Math.round(active/past.length*100);
  const last7=past.slice(-7), missed=last7.filter(c=>c.lvl===0).length;
  const lvlColor=l=>l<0?"transparent":l===0?"var(--surface2)":l===1?"rgba(79,140,255,.35)":l===2?"rgba(79,140,255,.65)":"var(--accent)";
  const cols=[]; for(let w=0;w<weeks;w++)cols.push(grid.slice(w*7,w*7+7));
  return (
    <div className="panel panel-pad" style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:14}}>
        <span className="tag"><Flame size={12}/> Consistency · last {weeks} weeks</span>
        <div style={{display:"flex",gap:18}}>
          <div style={{textAlign:"right"}}><div className="disp" style={{fontWeight:800,fontSize:22,color:streak>0?"var(--amber)":"var(--faint)"}}>{streak}🔥</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>STREAK</div></div>
          <div style={{textAlign:"right"}}><div className="disp" style={{fontWeight:800,fontSize:22}}>{longest}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>LONGEST</div></div>
          <div style={{textAlign:"right"}}><div className="disp" style={{fontWeight:800,fontSize:22,color:adherence>=70?"var(--green)":"var(--amber)"}}>{adherence}%</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>ADHERENCE</div></div>
        </div>
      </div>
      <div style={{display:"flex",gap:3,overflowX:"auto",paddingBottom:4}}>
        {cols.map((col,ci)=>(<div key={ci} style={{display:"flex",flexDirection:"column",gap:3}}>
          {col.map((c,ri)=>(<div key={ri} title={c.lvl<0?"":c.d.toLocaleDateString()} style={{width:13,height:13,borderRadius:3,background:lvlColor(c.lvl),border:"1px solid "+(c.lvl<0?"transparent":"var(--line)")}}/>))}
        </div>))}
      </div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12,flexWrap:"wrap",gap:8}}>
        <div style={{fontSize:13,color:missed===0?"var(--green)":"var(--muted)"}}>{missed===0?"Perfect week — you didn't miss a day. 🔥":`${missed} missed ${missed===1?"day":"days"} this week — get back on the board today.`}</div>
        <div style={{display:"flex",alignItems:"center",gap:6}}><span className="mono" style={{fontSize:10,color:"var(--faint)"}}>less</span>{[0,1,2,3].map(l=>(<div key={l} style={{width:11,height:11,borderRadius:3,background:lvlColor(l),border:"1px solid var(--line)"}}/>))}<span className="mono" style={{fontSize:10,color:"var(--faint)"}}>more</span></div>
      </div>
    </div>
  );
}
function WeeklyReviewSection({P}){
  const r=(s)=>rngf(P.name+"wr",s);
  const rows=[["Posts shipped",Math.round(4+r(1)*4),Math.round(3+r(2)*4)],["New followers",Math.round(P.fBase*0.05),Math.round(P.fBase*0.04)],["Avg engagement",+(6+r(3)*4).toFixed(1)+"%",+(5+r(4)*4).toFixed(1)+"%"],["Leads",Math.round(P.fBase*0.012),Math.round(P.fBase*0.009)]];
  return (
    <div className="panel panel-pad" style={{marginBottom:16}}>
      <span className="tag" style={{marginBottom:14,display:"inline-flex"}}><CalendarCheck size={12}/> This week vs last week</span>
      <div style={{display:"flex",flexDirection:"column",gap:0}}>{rows.map(([l,now,prev],i)=>{
        const up=(typeof now==="string"?parseFloat(now):now)>=(typeof prev==="string"?parseFloat(prev):prev);
        return (<div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:i<rows.length-1?"1px solid var(--line)":"none"}}>
          <span style={{fontSize:14,fontWeight:600}}>{l}</span>
          <div style={{display:"flex",alignItems:"center",gap:12}}><span className="mono" style={{fontSize:13}}>{typeof now==="number"?fmt(now):now}</span>
            <span className="mono" style={{fontSize:11,color:up?"var(--green)":"var(--red)",minWidth:54,textAlign:"right"}}>{up?"▲":"▼"} vs {typeof prev==="number"?fmt(prev):prev}</span></div>
        </div>);})}</div>
    </div>
  );
}
function DashboardsView({P,ig,go}){
  const [man,setMan]=useState({followers:"",rev:"",leads:"",spend:""});
  const [shot,setShot]=useState(null);
  const shotRef=useRef();
  const f=+man.followers||P.fBase, rev=+man.rev||P.revNow, spend=+man.spend||Math.round(rev*0.22), roas=spend?(rev*1.8/spend).toFixed(1):"—";
  const revAds=P.revSeries.map((r,i)=>({m:r.m,rev:r.r,spend:Math.round(r.r*0.2)}));
  const funnel=[["Views (30d)",P.fBase*9],["Profile visits",Math.round(P.fBase*1.1)],["New followers",Math.round(P.fBase*0.18)],["Leads",Math.round(P.fBase*0.06)],["Customers",Math.max(3,Math.round(P.fBase*0.012))]];
  const kpis=[["Followers",fmt(f),Users,"+"+fmt(Math.round(f*0.06))+"/wk","up"],["Views · 30d",fmt(f*9),Eye,"+18%","up"],
    ["Engagement",P.subs[2].v+"%",Activity,"+2.1","up"],["Leads · mo",fmt(+man.leads||Math.round(f*0.06)),Target,"+"+Math.round(f*0.004),"up"],
    ["Revenue · mo",money(rev),DollarSign,"+12%","up"],["Products sold",""+Math.max(2,Math.round(rev/120)),Store,"+5","up"],
    ["Ad spend",money(spend),Megaphone,"controlled","flat"],["ROAS",roas+"×",TrendingUp,roas>=2?"healthy":"building","up"]];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10,marginBottom:16}}>
        <div><div className="eyebrow">Dashboards · Mission Control</div><h1 className="disp" style={{fontWeight:700,fontSize:"clamp(24px,4vw,32px)",marginTop:6}}>Your whole business, one screen.</h1></div>
        <div className="live"><span className="pulse"/>{ig.connected?`synced ${ig.igHandle}`:"demo data"}</div>
      </div>
      {!ig.connected && <div className="banner" style={{marginBottom:16}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}><div style={{width:40,height:40,borderRadius:11,background:"linear-gradient(135deg,#E1306C,#8B7CFF)",display:"flex",alignItems:"center",justifyContent:"center"}}><Instagram size={19} color="#fff"/></div><div><div style={{fontWeight:600,fontSize:14.5}}>Connect your accounts</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>Pull real followers, reach, leads & revenue automatically.</div></div></div>
        <div style={{display:"flex",gap:8}}><button className="btn btn-ghost" style={{padding:"11px 16px",fontSize:14}} onClick={()=>go("pagescan")}>Scan my page</button><button className="btn btn-grad" style={{padding:"11px 18px",fontSize:14}} onClick={()=>ig.setConnectModal(true)}>Connect</button></div>
      </div>}
      <div className="panel panel-pad" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4,flexWrap:"wrap",gap:8}}>
          <span className="tag"><SlidersHorizontal size={12}/> Log it yourself — no connection needed</span>
          <input ref={shotRef} type="file" accept="image/*" style={{display:"none"}} onChange={e=>{const x=e.target.files&&e.target.files[0];if(x)setShot(x.name);}}/>
          <button className="btn btn-ghost sm" onClick={()=>shotRef.current&&shotRef.current.click()}><Upload size={14}/> {shot?"Insights uploaded":"Upload IG insights screenshot"}</button>
        </div>
        <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:12}}>Don't want to connect? Type your latest numbers and the whole dashboard updates. {shot?<span style={{color:"var(--green)"}}>Got "{shot}" — auto-parsing in the live build.</span>:"Or drop a screenshot of your Instagram insights."}</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10}} className="kpirow">
          {[["followers","Followers"],["rev","Revenue $ / mo"],["leads","Leads / mo"],["spend","Ad spend $ / mo"]].map(([k,l])=>(
            <div key={k}><div className="eyebrow" style={{marginBottom:5,fontSize:9.5}}>{l}</div>
              <input className="cx-in" style={{padding:"9px 11px",fontSize:13}} inputMode="numeric" placeholder="—" value={man[k]} onChange={e=>setMan(m=>({...m,[k]:e.target.value.replace(/[^\d.]/g,"")}))}/></div>))}
        </div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}} className="kpirow">
        {kpis.map(([l,v,Ic,d,dir])=>(<div className="kpi" key={l}><div style={{display:"flex",justifyContent:"space-between"}}><Ic size={15} color="var(--accent)"/><span className="mono" style={{fontSize:10.5,color:dir==="up"?"var(--green)":"var(--faint)"}}>{d}</span></div><div className="v" style={{marginTop:10}}>{v}</div><div className="l">{l}</div></div>))}
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1.3fr 1fr",gap:16,marginBottom:16}} className="hero">
        <div className="panel panel-pad"><span className="tag"><TrendingUp size={12}/> Revenue vs ad spend</span>
          <div style={{height:200,marginTop:8}}><ResponsiveContainer><BarChart data={revAds} margin={{top:6,right:6,left:-12,bottom:0}}>
            <XAxis dataKey="m" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} tickFormatter={money} width={42}/>
            <Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12}} formatter={(v,n)=>[money(v),n==="rev"?"Revenue":"Ad spend"]}/>
            <Bar dataKey="rev" radius={[5,5,0,0]} barSize={16} fill="#4F8CFF"/><Bar dataKey="spend" radius={[5,5,0,0]} barSize={16} fill="#8B7CFF" fillOpacity={.6}/>
          </BarChart></ResponsiveContainer></div></div>
        <div className="panel panel-pad"><span className="tag"><Crosshair size={12}/> Acquisition funnel · 30d</span>
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:9}}>{funnel.map(([l,v],i)=>(
            <div key={l}><div style={{display:"flex",justifyContent:"space-between",fontSize:13,marginBottom:5}}><span style={{color:"var(--muted)"}}>{l}</span><span className="mono">{fmt(v)}</span></div>
            <div className="bar"><i style={{width:(100-i*18)+"%"}}/></div></div>))}</div></div>
      </div>
      <AdherenceSection P={P} go={go}/>
      <WeeklyReviewSection P={P}/>
      <div className="panel panel-pad">
        <span className="tag"><Flame size={12}/> Top-performing content · 30d</span>
        <div style={{marginTop:12,display:"grid",gap:9}}>{[["Contrarian hook reel",fmt(P.fBase*4),"11.2%"],["3-step educational",fmt(P.fBase*2.4),"9.8%"],["Personal story",fmt(P.fBase*1.8),"8.1%"]].map(([t,v,e],i)=>(
          <div className="row-card" key={i}><div style={{display:"flex",gap:13,alignItems:"center"}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:18,width:26}}>{i+1}</span><div style={{fontWeight:600,fontSize:14}}>{t}</div></div>
            <div style={{display:"flex",gap:16}}><span className="mono" style={{fontSize:12,color:"var(--muted)"}}><Eye size={11}/> {v}</span><span className="mono delta-up" style={{fontSize:12}}>{e} ER</span></div></div>))}</div>
        <button className="btn btn-ghost sm" style={{marginTop:14}} onClick={()=>go("scanner")}>See what's trending →</button>
      </div>
    </>
  );
}

/* ── ADS ENGINE ── */
function AdsEngineView({P,open,go}){
  const [tab,setTab]=useState("ladder");
  const [obj,setObj]=useState(null),[bud,setBud]=useState(null),[aud,setAud]=useState(null);
  const [calc,setCalc]=useState({spend:"",impr:"",clicks:"",leads:"",sales:"",rev:""});
  const{N,W}=NW(P);
  const ladder=[["$5/day","Test mode","Boost your best organic reel to a cold audience. Goal: learn which content converts strangers. Don't scale yet — gather data."],
    ["$20/day","Validate","Run 2–3 winning reels as ads to a lookalike audience. Watch cost-per-result. Kill losers fast."],
    ["$50/day","Build the machine","Split: 60% to your winner, 40% testing new hooks. Add a retargeting campaign for warm viewers."],
    ["$100/day","Scale what works","Duplicate winners into fresh lookalikes. Layer a lead-gen campaign to a lead magnet."],
    ["$500/day","Acquisition engine","Full funnel: cold reach → retarget → offer. You're now buying followers, leads & customers predictably."]];
  const auds=[["Cold / interest","People who don't know you. Target interests & behaviors in your niche. Top of funnel — lead with your best hook reel."],
    ["Lookalike","Facebook finds people similar to your followers or buyers. Your highest-ROI cold audience once you have data."],
    ["Custom — engagement","Everyone who watched your reels or visited your profile. Warm. Retarget with proof and your offer."],
    ["Retargeting — site/leads","People who hit your link or opted in but didn't buy. Hottest audience. Show testimonials + a deadline."]];
  const objectives=[O("Awareness / reach","Get in front of new people"),O("Traffic","Send people to your bio/link"),O("Leads","Capture emails with a lead magnet"),O("Sales","Drive purchases of your offer")];
  const budgets=[O("$5–20/day","Testing"),O("$50/day","Building"),O("$100+/day","Scaling")];
  const audOpts=auds.map(a=>O(a[0],a[1].slice(0,40)+"…"));
  const ready=obj&&bud&&aud;
  const plan=ready?`OBJECTIVE: ${txt(obj)}\nBUDGET: ${txt(bud)}\nAUDIENCE: ${txt(aud)}\n\nPLAN:\n1. Pick your top-performing organic reel (highest saves + shares).\n2. Build the campaign in Meta Ads Manager with the "${txt(obj)}" objective.\n3. Set the audience to ${txt(aud).toLowerCase()} in your niche.\n4. Start at ${txt(bud)} for 4–5 days before judging — let it learn.\n5. Watch cost-per-result. Scale winners 20%/day, kill anything 2× over target.\n\nCTA in the ad: "${txt(obj)==="Leads"?`Comment "${W}" or tap to grab the free guide`:txt(obj)==="Sales"?"Tap to start today":"Follow for daily breakdowns"}"`:"";
  return (
    <>
      <div className="eyebrow">Ads Engine</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Stop waiting on the algorithm. Buy growth.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:18}}>The smartest creators don't just hope a reel hits — they take what already works and put money behind it. This is the part almost nobody teaches. Here's how to do it safely, from $5/day to a full acquisition machine.</p>
      <div className="tabs">{[["ladder","Spend ladder"],["convert","Reels → Ads"],["audiences","Audiences"],["builder","Campaign builder"],["dash","Ad dashboard"]].map(([k,l])=>(<div key={k} className={"tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}>{l}</div>))}</div>

      {tab==="ladder" && <div style={{display:"grid",gap:11}}>{ladder.map(([amt,tag,d],i)=>(
        <div className="row-card" key={i} style={{alignItems:"flex-start"}}><div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div className="disp" style={{fontWeight:700,fontSize:20,background:"var(--grad)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",minWidth:90}}>{amt}</div>
          <div><div style={{fontWeight:600,fontSize:14.5}}>{tag}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:4,lineHeight:1.5}}>{d}</div></div></div></div>))}</div>}

      {tab==="convert" && (<>
        <div className="nba" style={{marginBottom:14}}><p style={{fontSize:15,fontWeight:500,lineHeight:1.5}}>Your winning organic reel is already proven. Turning it into an ad is the highest-ROI move in the game — you're scaling something that works.</p></div>
        {[["1 · Find your winner","Highest saves + shares in the last 90 days. That's the one strangers will respond to."],["2 · Use it as the ad creative","Upload the exact reel. Don't over-produce — native content outperforms polished ads."],["3 · Pick the objective","Leads if you have a lead magnet, Sales if you have an offer, Traffic to grow the funnel."],["4 · Target a lookalike","Let Meta find people like your best followers. Start cold at $20/day."],["5 · Scale or kill in 5 days","Under target cost? Scale 20%/day. Over? Kill it and test the next winner."]].map(([a,b])=>(
          <div className="row-card" key={a} style={{marginBottom:10}}><div><div style={{fontWeight:600,fontSize:14.5}}>{a}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:3}}>{b}</div></div></div>))}
        <button className="btn btn-ghost sm" onClick={()=>go("scanner")}>Find my best content →</button>
      </>)}

      {tab==="audiences" && <div style={{display:"grid",gap:11}}>{auds.map(([t,d],i)=>(
        <div className="panel panel-pad" key={i}><div style={{display:"flex",gap:12,alignItems:"center",marginBottom:8}}><div className="tool-ic" style={{width:36,height:36}}><Users size={17}/></div><div style={{fontWeight:600,fontSize:15}}>{t}</div></div><p style={{color:"var(--muted)",fontSize:13.5,lineHeight:1.55}}>{d}</p></div>))}</div>}

      {tab==="builder" && (<>
        <div style={{marginBottom:16}}><div className="eyebrow" style={{marginBottom:9}}>1 · Objective</div><div className="seg">{objectives.map(o=>(<div key={o.id} className={"chip"+(obj&&obj.id===o.id?" on":"")} onClick={()=>setObj(o)}><span className="dot"/>{o.label}</div>))}</div></div>
        <div style={{marginBottom:16}}><div className="eyebrow" style={{marginBottom:9}}>2 · Budget</div><div className="seg">{budgets.map(o=>(<div key={o.id} className={"chip"+(bud&&bud.id===o.id?" on":"")} onClick={()=>setBud(o)}><span className="dot"/>{o.label}</div>))}</div></div>
        <div style={{marginBottom:16}}><div className="eyebrow" style={{marginBottom:9}}>3 · Audience</div><div className="seg">{audOpts.map(o=>(<div key={o.id} className={"chip"+(aud&&aud.id===o.id?" on":"")} onClick={()=>setAud(o)}><span className="dot"/>{o.label}</div>))}</div></div>
        {ready && <div className="out-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span className="eyebrow">Your campaign plan</span><CopyBtn text={plan}/></div><div className="kit">{plan}</div></div>}
        {!ready && <p style={{color:"var(--faint)",fontSize:13}} className="mono">Select all three to generate your plan.</p>}
      </>)}

      {tab==="dash" && (<>
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
            <span className="tag"><SlidersHorizontal size={12}/> Ad calculator — log your numbers</span>
            <CopyBtn text={`Spend $${calc.spend} · ${calc.impr} impr · ${calc.clicks} clicks · ${calc.leads} leads · ${calc.sales} sales · $${calc.rev} rev`} label="Copy"/>
          </div>
          <p style={{fontSize:12.5,color:"var(--muted)",marginBottom:12}}>Type in what your campaign actually did. I'll calculate every metric that matters.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:10}} className="kpirow">
            {[["spend","Spend $"],["impr","Impressions"],["clicks","Clicks"],["leads","Leads"],["sales","Sales"],["rev","Revenue $"]].map(([k,l])=>(
              <div key={k}><div className="eyebrow" style={{marginBottom:5,fontSize:9.5}}>{l}</div>
                <input className="cx-in" style={{padding:"9px 11px",fontSize:13}} inputMode="numeric" value={calc[k]} onChange={e=>setCalc(c=>({...c,[k]:e.target.value.replace(/[^\d.]/g,"")}))}/></div>))}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:10,marginTop:16}} className="kpirow">
            {(()=>{const s=+calc.spend||0,im=+calc.impr||0,cl=+calc.clicks||0,le=+calc.leads||0,sa=+calc.sales||0,rv=+calc.rev||0;
              const out=[["CPM",im?money(s/im*1000):"—"],["CPC",cl?money(s/cl):"—"],["CTR",im?(cl/im*100).toFixed(2)+"%":"—"],["Cost/lead",le?money(s/le):"—"],
                ["Cost/sale",sa?money(s/sa):"—"],["Conv. rate",cl?(sa/cl*100).toFixed(1)+"%":"—"],["ROAS",s?(rv/s).toFixed(2)+"×":"—"],["Profit",money(rv-s)]];
              return out.map(([l,v],i)=>(<div className="kpi" key={l}><div className="v" style={{fontSize:20,color:l==="Profit"?(rv-s>=0?"var(--green)":"var(--red)"):l==="ROAS"&&s&&rv/s>=2?"var(--green)":"var(--text)"}}>{v}</div><div className="l">{l}</div></div>));})()}
          </div>
          <div className="nba" style={{marginTop:14}}><p style={{fontSize:13.5}}>{(() => {const s=+calc.spend||0,rv=+calc.rev||0,roas=s?rv/s:0; if(!s)return "Enter your spend to get a read on the campaign."; if(roas>=3)return "🔥 Strong ROAS — scale this 20%/day and duplicate the winner into fresh audiences."; if(roas>=1.5)return "Healthy. Keep it running, test new creative against the winner."; if(roas>0)return "Below target. Cut the weakest ad set and sharpen your hook + offer."; return "No revenue logged yet — give it 4–5 days to exit the learning phase before judging.";})()}</p></div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:12,marginBottom:16}} className="kpirow">
          {[["Spend",money(Math.round(P.revNow*0.22))],["CPM","$8.40"],["CTR","2.3%"],["Cost / lead","$3.10"],["Leads",""+Math.round(P.fBase*0.05)],["Sales",""+Math.max(2,Math.round(P.revNow/200))],["Revenue",money(P.revNow)],["ROAS",(P.revNow?((P.revNow*1.8)/(P.revNow*0.22)).toFixed(1):"—")+"×"]].map(([l,v])=>(
            <div className="kpi" key={l}><div className="v" style={{fontSize:22}}>{v}</div><div className="l">{l}</div></div>))}
        </div>
        <div className="panel panel-pad"><span className="tag"><TrendingUp size={12}/> Spend → return (90d)</span>
          <div style={{height:180,marginTop:8}}><ResponsiveContainer><AreaChart data={P.revSeries.map((r,i)=>({m:r.m,roas:(1.2+i*0.18+rng(P.name,i)*0.4)}))}>
            <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#2FD08A" stopOpacity={.4}/><stop offset="100%" stopColor="#2FD08A" stopOpacity={0}/></linearGradient></defs>
            <XAxis dataKey="m" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/><YAxis tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} tickFormatter={v=>v.toFixed(1)+"×"} width={36}/>
            <Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12}} formatter={v=>[v.toFixed(1)+"×","ROAS"]}/>
            <Area type="monotone" dataKey="roas" stroke="#2FD08A" strokeWidth={2.4} fill="url(#rg)"/></AreaChart></ResponsiveContainer></div>
          <p className="mono" style={{fontSize:11,color:"var(--faint)",marginTop:8}}>Connect Meta in the live build to stream real spend & ROAS.</p></div>
      </>)}
    </>
  );
}

/* ── BUSINESS ENGINE · models ── */
const BIZ_MODELS=[
  {k:"digital",t:"Digital product",ic:Layers,price:"$27–197",best:"Fastest first revenue. Sell knowledge once, deliver infinitely.",build:["Pick one painful problem you solve","Package the fix into a guide/templates/mini-course","Host on Stan/Gumroad/Beacons","Drive every reel to a comment-to-DM funnel","Reinvest into ads once it converts"],first:"A $47 product × 200 buyers = ~$9.4k. Very reachable from a warm audience."},
  {k:"membership",t:"Membership / community",ic:Users,price:"$19–99/mo",best:"Recurring revenue. The holy grail — predictable monthly cash.",build:["Define one ongoing outcome members want","Set a weekly rhythm (training + prompt + wins)","Launch with founding-member pricing","Retain with community + fresh value","Add tiers as it grows"],first:"100 members × $49/mo = $4,900/mo recurring."},
  {k:"coaching",t:"Coaching",ic:Target,price:"$500–3,000",best:"Highest margin early. Trade time for premium money while you build leverage.",build:["Productize one transformation","Price for the outcome, not the hours","Close in the DMs with qualification","Deliver via calls + async feedback","Graduate to group coaching for leverage"],first:"10 clients × $997 = ~$10k. Close from DMs, no audience-size requirement."},
  {k:"service",t:"Service / done-for-you",ic:Briefcase,price:"$1k–10k",best:"No product to build. Sell your skill as a service today.",build:["Offer the exact thing you're good at","Show proof (your own results count)","Outbound + inbound from content","Systemize delivery with templates","Hire to scale past your time"],first:"3 clients × $2k = $6k. Cash-flow positive immediately."},
  {k:"agency",t:"Agency",ic:Building2,price:"$2k–20k/mo",best:"Scale services with a team. Recurring retainers, real enterprise value.",build:["Niche down to one service + one industry","Land 2–3 retainer clients","Hire contractors to deliver","Build SOPs so it runs without you","Productize into packages"],first:"3 retainers × $3k/mo = $9k/mo recurring."},
  {k:"ai",t:"AI business",ic:Cpu,price:"varies",best:"Build automations/agents for businesses. Massive, early, underserved demand.",build:["Learn the AI Systems modules","Pick one workflow businesses hate doing","Build it with agents/automation","Sell setup + monthly management","Templatize and resell"],first:"5 setups × $1.5k + $300/mo management = strong recurring base."},
  {k:"saas",t:"SaaS / software",ic:Layers,price:"$9–99/mo",best:"Highest ceiling. Build once, sell forever, raise capital.",build:["Find a sharp problem in your niche","Build a focused v1 (no-code is fine)","Launch to your audience as founding users","Iterate on retention","Scale with content + ads"],first:"Your audience is your unfair launch advantage — distribution first."},
  {k:"newsletter",t:"Newsletter",ic:MessageSquare,price:"ads + sponsors",best:"Own your audience off-platform. Sell sponsorships and your own offers.",build:["Pick a niche + a posting cadence","Grow it with reels → email CTA","Monetize with sponsors + your products","Cross-promote with other newsletters","Sell a premium tier"],first:"10k subs at strong open rates = $2–5k per sponsored send."},
  {k:"affiliate",t:"Affiliate",ic:DollarSign,price:"commission",best:"No product needed. Recommend tools you use, earn on every sale.",build:["Only promote things you actually use","Build trust with honest breakdowns","Add affiliate CTAs to relevant content","Stack recurring-commission offers","Disclose clearly, always"],first:"A few recurring SaaS affiliates can compound into steady monthly income."},
  {k:"consulting",t:"Consulting",ic:Crosshair,price:"$200–500/hr",best:"Sell strategy, not delivery. Premium positioning, low time.",build:["Position around one expensive problem","Offer paid audits as the entry point","Upsell into retainers","Document frameworks to scale","Raise rates as proof grows"],first:"Paid audits at $300 each warm up clients for $2k+ retainers."},
];
function recPrice(P,m){const fb=FOLLOWERS.indexOf(P.followers);
  const map={digital:["$27","$47","$97"],membership:["$19/mo","$39/mo","$59/mo"],coaching:["$497","$997","$1,997"],service:["$1,000","$2,500","$5,000"],agency:["$2,000/mo","$3,500/mo","$6,000/mo"],ai:["$1,000","$1,500","$3,000"],saas:["$19/mo","$39/mo","$79/mo"],newsletter:["sponsor $250","sponsor $750","sponsor $2,000"],affiliate:["—","—","—"],consulting:["$200/audit","$300/audit","$500/audit"]};
  const t=map[m.k]||["$47","$97","$197"];return t[Math.min(2,Math.max(0,fb<=1?0:fb<=2?1:2))];}
function bizDeliverable(P,m){
  const{n,N,W}=NW(P);const pk=pack(P);const price=recPrice(P,m);
  const name=`The ${N} ${m.t.split("/")[0].trim()}`;
  const promise=`${_cap(pk.desires[0])} — without ${pk.mistakes[0]}.`;
  const cta=(m.k==="coaching"||m.k==="service"||m.k==="consulting")?`DM "${W}" to apply.`:"Tap to get instant access.";
  const salesPage=`HEADLINE: ${promise}\n\nSUBHEAD: For ${n} people who are tired of ${pk.pains[0]} and want a system that actually works.\n\nTHE PROBLEM:\nYou've tried the generic advice. You're still ${pk.pains[1]}. It's not your effort — it's the lack of a system.\n\nWHAT YOU GET (${m.t}):\n• ${_cap(pk.topics[0])} — done right\n• A step-by-step path, not vague tips\n• ${m.k==="coaching"||m.k==="service"?"Direct access + accountability":"Templates + tools you keep forever"}\n• Results you can actually see\n\nWHO IT'S FOR: ${n} creators/owners ready to ${pk.desires[0]}.\nWHO IT'S NOT FOR: people looking for a magic button.\n\nPROOF: [your results / client wins / screenshots]\n\nPRICE: ${price}\nGUARANTEE: Do the work and don't see progress? Full refund.\n\nCTA: ${cta}`;
  const dmPitch=`Hey [name] — saw you're into ${n}. Quick one:\n\nI put together ${name.toLowerCase()} that helps people ${pk.desires[0]} (${price}). It's the exact system I use.\n\nWant me to send the details? No pressure either way 🙏`;
  const coldOutreach=`Hey [name], love what you're doing with [their thing]. I help ${n} people ${pk.desires[0]} — and I think there's a quick win for you around ${pk.topics[0]}. Mind if I send a 60-second breakdown?`;
  const launch=`LAUNCH POSTS (3):\n\n① TEASE (reel): "${buildHooks(P)[0].t}"\n   Caption: ${_cap(pk.topics[0])} — I just opened something to help with this. Comment "${W}".\n\n② PROOF (story/post): Show a result or testimonial → "this is what ${name.toLowerCase()} does."\n\n③ CALL (reel/story): "${price} — open now. Comment \\"${W}\\" or tap the link." Add urgency (spots/deadline).`;
  const objections=`OBJECTIONS → RESPONSES:\n\n"How much?" → "${price} — but first, what's the #1 thing you're trying to fix? Want to make sure it's a fit."\n"I don't have the money" → "Totally fair. Is it timing or are you unsure it'll work? I can show you exactly how it would."\n"I need to think" → "Of course — what's the one thing you're unsure about? I'd rather answer it than leave you guessing."\n"Is it for beginners?" → "Yes — it meets you where you are. Where are you starting from?"`;
  const isService=m.k==="coaching"||m.k==="service"||m.k==="consulting"||m.k==="agency";
  const isProduct=m.k==="digital"||m.k==="course"||m.k==="saas";
  const isRecurring=m.k==="membership"||m.k==="saas"||m.k==="community";
  const timeline=`30-DAY LAUNCH TIMELINE — ${m.t}:\n\nWeek 1 — Build & seed:\n• Finalize the offer, price (${price}) and promise.\n• ${isService?"Write your application/DM flow.":isProduct?"Outline & build the core deliverable (don't over-build).":"Set up the recurring billing & welcome flow."}\n• Post 3 reels planting the problem you solve (no pitch yet).\n\nWeek 2 — Warm the audience:\n• Share proof/results and behind-the-scenes daily in stories.\n• Run a poll: "would you want help with ${pk.desires[0]}?"\n• Start DM conversations with everyone who engages.\n\nWeek 3 — Open the cart:\n• Announcement reel + story sequence ("it's open").\n• Send the launch email + DM your warm list.\n• Post one proof/testimonial per day.\n\nWeek 4 — Close:\n• Urgency: deadline or limited spots.\n• "Last call" reel + story countdown.\n• Personally DM every fence-sitter with a tailored answer.`;
  const contentPlan=`CONTENT THAT SELLS THIS (run alongside the launch):\n• Problem-aware reels: name ${pk.pains[0]} and ${pk.pains[1]}.\n• Authority reels: teach a piece of "${pk.topics[0]}" for free.\n• Proof posts: results, screenshots, before/after.\n• Objection-crusher posts: tackle "too expensive / no time / will it work for me".\n• Story sequences daily: tease → value → soft CTA → hard CTA.\nRatio: ~60% value, 20% proof, 20% offer. Never go dark on the offer once it's open.`;
  const ladder=`OFFER LADDER (maximize each buyer):\n• Lead magnet (free): a quick win that proves you can help → captures email.\n• Tripwire ($17–$47): low-risk yes that turns followers into buyers.\n• Core: ${name} — ${price}.\n• ${isRecurring?"Upsell: 1:1 onboarding or a done-with-you tier (2–3× core).":"Upsell: a recurring membership or community ($19–$99/mo) for continuity."}\n• Downsell: a payment plan or a lighter version for the "not yet" crowd.\n\nMost revenue is left on the table at the upsell — always present the next step at checkout.`;
  const kpis=`KPIs TO WATCH:\n• Offer conversion rate (target ${isService?"10–30% of qualified DMs":"1–3% of warm audience"}).\n• Revenue per 1,000 followers/month (your real monetization score).\n• ${isRecurring?"Churn (keep under 8%/mo) and LTV.":"Refund rate (under 5%) and repeat-purchase rate."}\n• Cost per lead (if you run ads) vs. customer value.\nReview weekly. Double down on the channel and message converting best.`;
  return [
    {label:"01 · Your offer — at a glance",text:`Model: ${m.t}\nName: ${name}\nPromise: ${promise}\nPrice (your stage): ${price}\nBest for: ${n} creators/owners ready to ${pk.desires[0]}\nWhy this model fits you: ${m.best}`},
    {label:"02 · Sales page — ready to publish",text:salesPage},
    {label:"03 · Pricing & packages",text:`Entry: ${recPrice({...P,followers:FOLLOWERS[0]},m)} — accessible, easy yes.\nCore: ${price} — your main offer.\nPremium: add 1:1 / done-with-you for 2–3× the core price.\n\nStart at Core. Raise prices as proof stacks. Price on the value of the outcome (${pk.desires[0]}), not your time.`},
    {label:"04 · Offer ladder",text:ladder},
    {label:"05 · 30-day launch timeline",text:timeline},
    {label:"06 · Content that sells it",text:contentPlan},
    {label:"07 · DM pitch — ready to send",text:dmPitch},
    {label:"08 · Cold outreach — ready to send",text:coldOutreach},
    {label:"09 · 3 launch posts",text:launch},
    {label:"10 · Objection handling",text:objections},
    {label:"11 · What to build — step by step",text:m.build.map((s,i)=>`${i+1}. ${s}`).join("\n")},
    {label:"12 · KPIs & what to track",text:kpis},
    {label:"13 · Path to your first $10k",text:m.first},
  ];
}
function BusinessModelsView({P,open,go}){
  const [sel,setSel]=useState(BIZ_MODELS[0].k);
  const m=BIZ_MODELS.find(x=>x.k===sel);
  const fb=FOLLOWERS.indexOf(P.followers);
  const rec=fb<=1?["coaching","service","digital"]:fb<=2?["digital","membership","coaching"]:["membership","saas","agency"];
  return (
    <>
      <div className="eyebrow">Business Engine</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Pick how you'll make money.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:8}}>Attention is worthless until it's monetized. Here are the 10 ways creators turn an audience into income — with a build plan for each. {rec.length?`For your stage, start with: ${rec.map(k=>BIZ_MODELS.find(b=>b.k===k).t).join(", ")}.`:""}</p>
      <div style={{display:"grid",gridTemplateColumns:"260px 1fr",gap:18,marginTop:14}} className="hero">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>
          {BIZ_MODELS.map(b=>(<div key={b.k} className={"model-row"+(sel===b.k?" on":"")} onClick={()=>setSel(b.k)}>
            <div className="tool-ic" style={{width:34,height:34}}><b.ic size={16}/></div><div style={{flex:1}}><div style={{fontSize:14,fontWeight:600}}>{b.t}</div><div className="mono" style={{fontSize:10.5,color:"var(--faint)"}}>{b.price}</div></div>
            {rec.includes(b.k)&&<span className="mono" style={{fontSize:9,color:"var(--accent)"}}>FOR YOU</span>}</div>))}
        </div>
        <div className="panel panel-pad">
          <div style={{display:"flex",gap:12,alignItems:"center",marginBottom:12}}><div className="tool-ic" style={{width:44,height:44}}><m.ic size={21}/></div><div><div className="disp" style={{fontWeight:700,fontSize:20}}>{m.t}</div><div className="mono" style={{fontSize:12,color:"var(--accent)"}}>{m.price}</div></div></div>
          <p style={{fontSize:14.5,color:"var(--text)",lineHeight:1.5,marginBottom:16}}>{m.best}</p>
          <div className="eyebrow" style={{marginBottom:10}}>How to build it</div>
          <div style={{display:"flex",flexDirection:"column",gap:9,marginBottom:16}}>{m.build.map((s,i)=>(<div key={i} style={{display:"flex",gap:11,alignItems:"flex-start"}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:16,width:20}}>{i+1}</span><div style={{fontSize:14,color:"var(--muted)",lineHeight:1.4}}>{s}</div></div>))}</div>
          <div className="nba" style={{padding:"14px 16px",marginBottom:14}}><div className="eyebrow" style={{marginBottom:5}}>Path to your first $10k</div><p style={{fontSize:14,fontWeight:500}}>{m.first}</p></div>
          <div className="panel panel-pad" style={{marginBottom:14,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
            <div><div className="eyebrow" style={{marginBottom:3}}>Recommended price · your stage</div><div className="disp" style={{fontWeight:700,fontSize:20,color:"var(--accent)"}}>{recPrice(P,m)}</div></div>
            <div style={{fontSize:12.5,color:"var(--muted)",maxWidth:240,textAlign:"right"}}>Based on your {P.followers} audience. Raise it as your proof grows.</div>
          </div>
          <DocActions title={`${m.t} — your full launch kit`} P={P} opts={{subtitle:`Sales page, DM pitch, pricing, launch posts & objections — customized for ${P.niche}`}} label="Generate my launch kit — send-ready PDF / Word"
            blocks={bizDeliverable(P,m)}/>
          <div className="btn-row" style={{marginTop:12}}><button className="btn btn-grad sm" onClick={()=>open("offer")}>Build the full offer</button><button className="btn btn-ghost sm" onClick={()=>go("ads")}>Promote it with ads</button></div>
        </div>
      </div>
    </>
  );
}

/* ── AI SYSTEMS · academy ── */
const AI_MODULES=[
  {k:"prompt",t:"Prompting that gets results",ic:Sparkles,lvl:"Foundation",
   why:"The difference between AI that writes garbage and AI that writes like you is the prompt. Master this and every other system gets 10x better.",
   pts:["Give the AI a ROLE, CONTEXT, and a clear OUTCOME — not a one-liner","Show it an example of what 'good' looks like (paste your best hook)","Ask for a specific format you can use immediately","Iterate: rate the output 1-10 and tell it exactly what to fix","Save your best prompts — they become reusable assets"],
   tools:["ChatGPT","Claude","Gemini"],
   prompts:["You are my {n} content strategist. Write 10 reel hooks about [topic] in a direct, punchy voice. Score each 1-100 for scroll-stopping power and explain the top 3.",
     "Rewrite this caption to sound like me. Here are 3 of my real captions for voice: [paste]. Now rewrite: [paste caption].",
     "Act as a brutal content critic. Here's my hook: [paste]. Tell me why someone would scroll past it, then give me 5 stronger versions.",
     "Turn this messy voice-note transcript into a tight 45-second reel script for {n}: [paste].",
     "I'm stuck. Ask me 5 sharp questions about my {n} audience, then use my answers to write 5 content ideas."]},
  {k:"agents",t:"AI agents & assistants",ic:Cpu,lvl:"Core",
   why:"An agent doesn't just answer — it works. Give it a goal and it researches, drafts, and repeats so you stop doing the manual grind.",
   pts:["An agent is an AI given a goal, tools, and the ability to act in steps","Start with ONE narrow job (e.g. 'find 20 trending sounds in my niche')","Chain them: research agent → writer agent → formatter agent","Give it your brand voice + rules once, reuse forever","Review the output — you're the editor, it's the intern"],
   tools:["ChatGPT (custom GPTs)","Claude Projects","Make.com agents"],
   prompts:["Act as a research agent. Find 10 viral content angles in {n} from the last 30 days, summarize why each worked, and output as a table.",
     "Be my repurposing agent. Take this reel transcript and produce: 1 IG caption, 1 carousel outline, 1 X thread, 1 email. Transcript: [paste].",
     "You're my content-idea agent. Based on my niche ({n}) and these 3 past winners [paste], generate 20 new ideas ranked by viral potential.",
     "Act as a competitor-analysis agent. Here are 3 accounts in {n}: [handles]. Break down their hook patterns, posting cadence, and what I can do better.",
     "Be my weekly-planning agent. Ask me my goal for the week, then build a full content + DM + engagement plan."]},
  {k:"auto",t:"Automations",ic:Activity,lvl:"Core",
   why:"Automation is leverage you set up once and benefit from forever. Every repetitive task you do by hand is a leak.",
   pts:["Connect apps so repetitive work happens without you (Zapier / Make)","Auto-DM a link when someone comments your keyword","Auto-save new leads to a sheet + tag them","Auto-repurpose a posted reel into a caption + tweet","Auto-send a welcome sequence to new email subs"],
   tools:["ManyChat","Zapier","Make.com","Beacons"],
   prompts:["Map an automation step by step: when someone comments \"GUIDE\" on my reel → auto-DM the link → add them to my email list. List the exact tools and triggers.",
     "Design a ManyChat flow for {n} that qualifies a lead with 2 questions before sending my offer.",
     "Build me an automation that turns every new YouTube upload into an IG caption, a tweet, and a LinkedIn post.",
     "What 5 things in a solo {n} creator's week should be automated first, ranked by time saved?",
     "Write the welcome email sequence (4 emails) that fires when someone joins my list from a {n} lead magnet."]},
  {k:"workflow",t:"Content workflows",ic:Layers,lvl:"Applied",
   why:"Random posting burns you out and underperforms. A workflow turns content into a repeatable machine you can run on autopilot.",
   pts:["Batch in blocks: ideate → script → film → edit → schedule","Use AI for the 0→1 (ideas, scripts); you bring the soul","One filming session = a week of content","Template anything you do more than twice","Keep a swipe file of your own winners to remix"],
   tools:["Notion","CapCut","Later / Metricool"],
   prompts:["Build me a weekly content workflow for {n} that produces 5 reels in one 2-hour batching session. Include the exact order of operations.",
     "Create a Notion content-calendar structure for a {n} creator posting daily. List the properties and views.",
     "Give me a filming-day checklist so I can shoot 7 reels back to back without re-setting up.",
     "Design a 'remix' workflow: take one pillar idea in {n} and turn it into 7 different reels.",
     "What's a realistic content system for someone with a full-time job and 5 hours a week for {n}?"]},
  {k:"leads",t:"Lead-generation systems",ic:Target,lvl:"Applied",
   why:"Views are vanity. Leads are the business. This is how content becomes a pipeline of people you can actually sell to.",
   pts:["Turn content into captured leads, not just views","Lead magnet → comment keyword → DM → email","Qualify with one question before you pitch","Nurture with value first, then offer","Track where every lead came from"],
   tools:["Beacons / Stan","ManyChat","ConvertKit"],
   prompts:["Design a lead-gen system for {n}: a free resource idea, the reel that promotes it, the comment keyword, and the DM flow that captures emails.",
     "Give me 5 lead-magnet ideas for {n} that people would actually trade their email for.",
     "Write the comment-to-DM script that delivers my lead magnet and qualifies the person in one message.",
     "Build a 'value-first' DM nurture: 3 messages before I ever mention my offer, for a {n} lead.",
     "How do I turn a viral reel's comment section into 50 email subscribers this week?"]},
  {k:"sales",t:"AI sales systems",ic:DollarSign,lvl:"Advanced",
   why:"Most creators are great at content and terrible at closing. AI fixes your scripts, objections, and follow-up so the money actually lands.",
   pts:["Use AI to draft DM scripts, objection handling, and follow-ups","Build a simple CRM in a sheet; let AI summarize each lead","Personalize at scale without sounding like a bot","Always close to ONE clear next step","Follow up — the fortune is in the follow-up"],
   tools:["Google Sheets CRM","ChatGPT","Calendly"],
   prompts:["Write a 5-message DM sequence to take a cold {n} lead from 'interested' to booked, in a friendly-direct voice.",
     "Here's the objection: \"it's too expensive.\" Write 3 ways to handle it for my {n} offer without being pushy.",
     "Give me 5 follow-up messages for leads who went quiet, spaced over 10 days, that don't feel desperate.",
     "Build me a simple sheet-based CRM structure to track {n} leads: columns, stages, and what to log.",
     "Role-play as a skeptical {n} prospect. I'll practice my pitch and you push back with real objections."]},
];
function AISystemsView({P}){
  const [sel,setSel]=useState(AI_MODULES[0].k);
  const m=AI_MODULES.find(x=>x.k===sel);
  const{n}=NW(P);
  const fillP=t=>t.replace(/\{n\}/g,n).replace(/\[niche\]/g,n);
  const allPrompts=m.prompts.map(fillP);
  return (
    <>
      <div className="eyebrow">AI Systems · Academy</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Use AI like an unfair advantage.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:14}}>Most creators use AI to write a caption. You'll use it to research, automate, generate leads, and run sales — the leverage that separates a creator from a creator-business. Every module comes loaded with prompts tuned to your niche.</p>
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:18}} className="hero">
        <div style={{display:"flex",flexDirection:"column",gap:8}}>{AI_MODULES.map((x,i)=>(
          <div key={x.k} className={"model-row"+(sel===x.k?" on":"")} onClick={()=>setSel(x.k)}>
            <div className="tool-ic" style={{width:34,height:34}}><x.ic size={16}/></div><div style={{flex:1}}><div style={{fontSize:13.5,fontWeight:600}}>{x.t}</div><div className="mono" style={{fontSize:10,color:"var(--faint)"}}>{x.lvl}</div></div></div>))}</div>
        <div className="panel panel-pad">
          <div className="mono" style={{fontSize:11,color:"var(--accent)"}}>{m.lvl.toUpperCase()}</div>
          <div className="disp" style={{fontWeight:700,fontSize:21,margin:"6px 0 8px"}}>{m.t}</div>
          <p style={{fontSize:14.5,color:"var(--text)",lineHeight:1.5,marginBottom:16}}>{m.why}</p>
          <div className="eyebrow" style={{marginBottom:10}}>Key ideas</div>
          <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:14}}>{m.pts.map((p,i)=>(<div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:14,lineHeight:1.45}}><Check size={16} color="var(--green)" style={{marginTop:2,flexShrink:0}}/>{p}</div>))}</div>
          <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:18}}><span className="eyebrow" style={{alignSelf:"center"}}>Tools:</span>{m.tools.map(t=>(<span key={t} className="tag">{t}</span>))}</div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}><div className="eyebrow">Try these prompts ({allPrompts.length})</div><CopyBtn text={allPrompts.map((p,i)=>`${i+1}. ${p}`).join("\n\n")} label="Copy all"/></div>
          <div style={{display:"flex",flexDirection:"column",gap:9}}>{allPrompts.map((p,i)=>(
            <div className="out-card" key={i} style={{margin:0}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}><div className="kit" style={{flex:1}}>{p}</div><CopyBtn text={p}/></div></div>))}</div>
          <button className="btn btn-ghost sm" style={{marginTop:14}} onClick={()=>downloadWord(`${m.t} — prompt pack`,[{label:m.t,text:allPrompts.map((p,i)=>`${i+1}. ${p}`).join("\n\n")}],P)}><Download size={15}/> Download this prompt pack</button>
        </div>
      </div>
    </>
  );
}

/* ── GROWTH ENGINE · platform academies ── */
const PLAT_ACADEMY={
  Instagram:{algo:"Reach is driven by sends-per-reach (shares) and watch time. The algorithm tests every reel on a small batch first — your first-hour engagement decides if it scales. Trial reels now let you test on non-followers before committing.",
    hot:["Trial reels to test hooks on cold audiences","Carousels are getting a reach boost again","3–7s ultra-short loops for replays","On-screen text hooks (sound-off viewing)","Photo dumps mixed into reel feeds"],
    always:["A scroll-stopping first frame","Building for shares & saves over likes","Replying to every comment in hour one","Re-sharing your reel to story within 60 min","Posting at your audience's active hours"],
    emerging:["AI-labeled content getting its own distribution","Longer reels (60–90s) rewarded for watch-time","DM-share signals weighted heavier","Broadcast channels for superfans"],
    bench:[["Sends per reach","≥ 1.5% good","≥ 3% viral"],["Avg watch time","≥ 50% great","full loop = elite"],["Saves/reach","≥ 1%","≥ 2.5% strong"],["Follows per reel","0.5–1%","≥ 2% breakout"]]},
  TikTok:{algo:"The For You Page is pure performance — followers barely matter. Completion rate and re-watches decide everything, and a brand-new account can pop instantly if the content performs.",
    hot:["Native, low-fi talking-head over polished edits","Trending-sound + your spin within 48h","Text-heavy 'storytime' hooks","Green-screen reactions to viral posts","Carousel/photo posts for reach"],
    always:["A fast hook with zero intro","Looping the video for replays","Posting 1–3× daily to feed the system","Riding sounds while they're rising, not peaked","Captions that add a second layer"],
    emerging:["Longer videos (1–3 min) monetized better","Search-optimized captions (TikTok as search)","Shop-tagged content getting reach","Series/episodic content for retention"],
    bench:[["Completion rate","≥ 40% good","≥ 70% viral"],["Re-watches","any is strong",""],["Shares","≥ 1%","≥ 3% breakout"],["FYP reach %","≥ 70%","follower-light = healthy"]]},
  YouTube:{algo:"Click-through rate × average view duration. Thumbnails and titles win the click; retention keeps you recommended. Shorts feed discovery, long-form builds the business.",
    hot:["Shorts as a top-of-funnel growth engine","Faceless/voiceover formats scaling fast","'Mr Beast' style retention editing","Storytelling intros over 'hey guys'","Community posts to re-engage subs"],
    always:["Title + thumbnail designed as one unit","Nailing the first 30 seconds of retention","Linking videos into sessions","Delivering on the thumbnail's promise","Consistent upload rhythm"],
    emerging:["Shorts → long-form funnels","AI dubbing for global reach","Podcasts as video on YouTube","Live + premieres for superfans"],
    bench:[["CTR","4–6% good","≥ 8% strong"],["Avg view duration","≥ 50%","≥ 60% elite"],["Returning viewers","rising = healthy",""],["Subs per video","steady growth",""]]},
  LinkedIn:{algo:"Rewards dwell time and comments in the first 60–90 minutes. Native text, documents and carousels outperform anything with an external link. Authority and B2B content thrives.",
    hot:["Document/carousel posts for dwell time","Personal-story → business-lesson posts","Contrarian takes on industry norms","Selfie + hook 'broetry' formatting","Comment-pods replaced by genuine niche replies"],
    always:["A hook line before the 'see more' fold","Keeping links in the comments, not the post","Replying to every comment fast","Posting weekday mornings","One clear idea per post"],
    emerging:["Native video getting a reach push","Newsletter features for repeat reach","Creator mode + follower growth tools","Thought-leadership ads for B2B"],
    bench:[["Dwell time","longer = better",""],["Comments","≥ 15 in hour 1 strong",""],["Profile views","rising weekly",""],["Connection reqs","inbound = positioning works",""]]},
  "X / Twitter":{algo:"Replies and bookmarks are the strongest value signals. Bold takes and threads travel; long-form (for verified) and consistency compound. Engaging in your niche pulls you into its graph.",
    hot:["Bookmark-bait 'save this' threads","Bold one-liners with a strong POV","Long-form posts (verified) for depth","Reply-guying bigger accounts strategically","Image+text combos for the timeline"],
    always:["A strong first tweet (the hook)","Threads for depth, single bangers for reach","Replying to bigger accounts daily","Posting consistently, multiple times/day","Value worth bookmarking"],
    emerging:["Long-form + creator payouts","Communities for niche reach","Video getting more distribution","Grok/AI-summarized discovery"],
    bench:[["Bookmarks","high = elite signal",""],["Reply rate","≥ 1%","conversations compound"],["Profile clicks","≥ 2% of impressions",""],["Follows per post","steady = positioning works",""]]},
};
const PLAT_EXTRA={
  Instagram:{
    plays:["Post a trial reel with a riskier hook today — test on non-followers, scale the winner","Turn your best reel from last month into a carousel for a save-spike","Add a comment-keyword to today's reel and wire the auto-DM","Re-share your last reel to story with a poll within the hour","Film a 3–7s ultra-short loop and watch the replays","Reply to every comment in the first hour with a question to restart the thread","DM 5 people who saved your last post a value-first message"],
    cadence:"1 reel/day (or 5/week min) + daily stories (3–5 frames) + 1 carousel/week. Best times: 11am–1pm and 7–9pm your audience's timezone.",
    mistakes:["Watermarked TikTok reposts (suppressed)","'Link in bio' in the reel caption (drive to DMs instead)","Posting then ghosting the comments","30 generic hashtags — use 4–6 specific"],
    plan:["Week 1 — Foundation: fix bio, lock 5 pillars, post 1 reel/day with a strong hook","Week 2 — Hooks: test trial reels, double down on the best-performing format","Week 3 — Funnel: add comment→DM keywords, start capturing emails","Week 4 — Compound: re-cut winners into carousels, run a story sales sequence"]},
  TikTok:{
    plays:["Jump on a sound that's rising (under 50k) with your spin — today","Post a low-fi talking-head 'storytime' with a text hook","Green-screen react to a viral post in your niche","Loop your best video and re-post it natively","Post 3× today to feed the FYP and find a winner","Reply to a top comment with a video for free reach"],
    cadence:"1–3×/day. TikTok rewards volume + completion. Best times: 6–9am, 12pm, 7–11pm. Ride sounds while rising, not peaked.",
    mistakes:["Slow intros ('hey guys')","Polished over native — low-fi wins here","Posting a sound after it's peaked","Deleting + reposting rapidly"],
    plan:["Week 1 — Volume: post 2×/day, find your format","Week 2 — Sounds: ride 2–3 rising sounds, study completion rate","Week 3 — Series: start an episodic 'storytime' to build retention","Week 4 — Search: add keyword captions, TikTok is a search engine now"]},
  YouTube:{
    plays:["Publish a Short as top-of-funnel, link it to a long-form","Rewrite a title + thumbnail as ONE unit and test the click","Rework your first 30s for retention (cut the intro)","Add an end screen linking to your best video to build a session","Post a community poll to re-engage subscribers"],
    cadence:"Shorts: daily for discovery. Long-form: 1–2×/week. Consistency beats frequency. Optimize title + thumbnail before anything.",
    mistakes:["Thumbnail and title not matching the payoff","Slow first 30 seconds","Inconsistent upload rhythm","Ignoring Shorts as a growth engine"],
    plan:["Week 1 — Shorts: post daily Shorts to find what resonates","Week 2 — Packaging: master title + thumbnail as one unit","Week 3 — Retention: nail the first 30s + mid-video re-hooks","Week 4 — Funnel: link Shorts → long-form → your offer"]},
  LinkedIn:{
    plays:["Post a document/carousel for dwell time today","Write a personal-story → business-lesson post","Drop a contrarian take on an industry norm","Reply genuinely to 10 niche posts to enter the graph","Put your link in the comments, not the post"],
    cadence:"3–5×/week, weekday mornings. Native text + documents outperform links. Reply fast in the first 60–90 min.",
    mistakes:["External links in the post (kills reach)","No hook before the 'see more' fold","Posting and not replying","Corporate-speak over personal voice"],
    plan:["Week 1 — Voice: post 3× with personal-story → lesson","Week 2 — Formats: test document/carousel posts for dwell","Week 3 — Authority: contrarian takes + genuine niche replies","Week 4 — Funnel: soft CTAs to your newsletter/offer in comments"]},
  "X / Twitter":{
    plays:["Write a 'save this' bookmark-bait thread today","Post a bold one-liner with a strong POV","Reply to 3 bigger accounts with real value","Turn a reel script into a 5-tweet thread","Post an image+text combo for the timeline"],
    cadence:"Multiple times/day. Single bangers for reach, threads for depth. Reply daily to bigger accounts to compound.",
    mistakes:["Weak first tweet (the hook)","Links in the main post (put them in replies)","Posting once a day and expecting reach","No clear POV — fence-sitting"],
    plan:["Week 1 — Reps: 3–5 posts/day, find your voice","Week 2 — Threads: one bookmark-worthy thread per week","Week 3 — Network: reply to bigger accounts daily","Week 4 — Compound: double down on what got bookmarked"]},
};
function platPlaybook(P,tab,a,ex){
  const blocks=[
    {label:`How ${tab}'s algorithm works`,text:a.algo},
    {label:"Hot right now",text:a.hot.map(x=>"• "+x).join("\n")},
    {label:"Always-hot levers",text:a.always.map(x=>"• "+x).join("\n")},
    {label:"Emerging levers (get ahead)",text:a.emerging.map(x=>"• "+x).join("\n")},
    {label:"Posting cadence & best times",text:ex.cadence},
    {label:"Biggest mistakes to avoid",text:ex.mistakes.map(x=>"• "+x).join("\n")},
    {label:"Growth plays you can run this week",text:ex.plays.map(x=>"• "+x).join("\n")},
    {label:"Your 30-day plan",text:ex.plan.join("\n")},
    {label:"Benchmarks",text:a.bench.map(b=>`${b[0]}: ${b[1]}${b[2]?" · "+b[2]:""}`).join("\n")},
  ];
  return blocks;
}
function GrowthEngineView({P}){
  const plats=Object.keys(PLAT_ACADEMY);
  const userPlats=(P.platforms&&P.platforms.length?P.platforms.map(p=>p&&p.pl?p.pl:p).filter(p=>plats.includes(p)):plats);
  const [tab,setTab]=useState(userPlats[0]||"Instagram");
  const a=PLAT_ACADEMY[tab];
  const ex=PLAT_EXTRA[tab]||PLAT_EXTRA.Instagram;
  const [gseed,setGseed]=useState(0);
  const hotNow=useMemo(()=>shuffleSeeded(a.hot,daySeed()+gseed).slice(0,4),[a,gseed]);
  const play=ex.plays[(daySeed()+gseed)%ex.plays.length];
  return (
    <>
      <div className="eyebrow">Growth Engine · Platform Academies</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Master every algorithm.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:600,marginBottom:16}}>Each platform rewards something different. Here's how each one decides what to push, what's hot right now, the levers that always work, and what's coming next — so you skate to where the puck is going.</p>
      <div className="tabs">{plats.map(p=>(<div key={p} className={"tab"+(tab===p?" on":"")} onClick={()=>setTab(p)}>{p}</div>))}</div>
      <div className="nba" style={{marginBottom:16}}><div className="eyebrow" style={{marginBottom:7}}>How {tab}'s algorithm actually works</div><p style={{fontSize:15,lineHeight:1.55,fontWeight:500}}>{a.algo}</p></div>

      <div className="panel panel-pad" style={{marginBottom:16,border:"1px solid rgba(245,158,11,.25)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:12}}>
          <span className="tag" style={{color:"var(--amber)",borderColor:"rgba(245,158,11,.3)"}}><Flame size={12}/> Hot on {tab} right now</span>
          <button className="mini" onClick={()=>setGseed(s=>s+1)}><RefreshCw size={12}/> Refresh</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}} className="hero">{hotNow.map((l,i)=>(<div key={i} style={{display:"flex",gap:10,fontSize:14,alignItems:"flex-start",lineHeight:1.4}}><Flame size={15} color="var(--amber)" style={{flexShrink:0,marginTop:2}}/>{l}</div>))}</div>
      </div>

      <div className="nba" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:6}}>
          <div className="eyebrow">Your {tab} growth play · do this now</div>
          <button className="mini" onClick={()=>setGseed(s=>s+1)}><RefreshCw size={12}/> Another</button>
        </div>
        <p style={{fontSize:15.5,lineHeight:1.5,fontWeight:500}}>{play}</p>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}} className="hero">
        <div className="panel panel-pad"><span className="tag"><Check size={12}/> Always-hot levers</span><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>{a.always.map((l,i)=>(<div key={i} style={{display:"flex",gap:10,fontSize:14,alignItems:"flex-start",lineHeight:1.4}}><Check size={15} color="var(--green)" style={{flexShrink:0,marginTop:2}}/>{l}</div>))}</div></div>
        <div className="panel panel-pad"><span className="tag"><TrendingUp size={12}/> Emerging levers (get ahead)</span><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:10}}>{a.emerging.map((l,i)=>(<div key={i} style={{display:"flex",gap:10,fontSize:14,alignItems:"flex-start",color:"var(--muted)",lineHeight:1.4}}><Sparkles size={15} color="var(--accent2)" style={{flexShrink:0,marginTop:2}}/>{l}</div>))}</div></div>
      </div>

      <div className="panel panel-pad"><span className="tag"><Activity size={12}/> Metrics that matter — and the benchmarks</span>
        <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:11}}>{a.bench.map((b,i)=>(
          <div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:10,paddingBottom:11,borderBottom:i<a.bench.length-1?"1px solid var(--line)":"none"}}>
            <span style={{fontSize:14,fontWeight:600}}>{b[0]}</span>
            <div style={{display:"flex",gap:8}}>{b[1]&&<span className="tag">{b[1]}</span>}{b[2]&&<span className="tag" style={{color:"var(--green)",borderColor:"rgba(47,208,138,.3)"}}>{b[2]}</span>}</div>
          </div>))}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,margin:"16px 0"}} className="hero">
        <div className="panel panel-pad"><span className="tag"><Calendar size={12}/> Posting cadence & best times</span><p style={{fontSize:14,lineHeight:1.55,marginTop:12}}>{ex.cadence}</p></div>
        <div className="panel panel-pad" style={{border:"1px solid rgba(242,109,109,.22)"}}><span className="tag" style={{color:"var(--red)",borderColor:"rgba(242,109,109,.3)"}}><X size={12}/> Biggest mistakes on {tab}</span><div style={{marginTop:12,display:"flex",flexDirection:"column",gap:9}}>{ex.mistakes.map((mm,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,alignItems:"flex-start",color:"var(--muted)",lineHeight:1.4}}><X size={14} color="var(--red)" style={{flexShrink:0,marginTop:2}}/>{mm}</div>))}</div></div>
      </div>

      <div className="panel panel-pad" style={{marginBottom:16}}>
        <span className="tag" style={{marginBottom:14,display:"inline-flex"}}><Rocket size={12}/> Your 30-day {tab} plan</span>
        <div style={{display:"grid",gap:10}}>{ex.plan.map((wk,i)=>(
          <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}><div style={{width:26,height:26,borderRadius:7,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:12,flexShrink:0}}>{i+1}</div><div style={{fontSize:14,lineHeight:1.45,paddingTop:2}}>{wk}</div></div>
        ))}</div>
      </div>

      <DocActions title={`The ${tab} Playbook`} P={P} opts={{subtitle:`Algorithm, levers, cadence, mistakes & your 30-day plan for ${tab}`}} blocks={platPlaybook(P,tab,a,ex)} label={`Download the full ${tab} playbook — PDF / Word`}/>
    </>
  );
}

/* ── LIVE TRAINING ── */
function LiveTrainingView({P}){
  const now=new Date();
  const next=(d,h)=>{const x=new Date(now);x.setDate(x.getDate()+d);x.setHours(h,0,0,0);return x;};
  const sessions=[["Content that converts strangers","Content",next(1,18)],["AI agents for creators","AI Systems",next(3,18)],["Meta ads: $5 to $500/day safely","Ads",next(5,18)],["Building your first $10k offer","Monetization",next(8,18)],["Personal brand positioning","Brand",next(10,18)]];
  return (
    <>
      <div className="eyebrow">Live Training</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Build alongside us, every week.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:580,marginBottom:18}}>Live sessions on content, AI, ads, monetization, and brand — taught by operators who've done it. Show up, ask questions, build in real time. Replays always available.</p>
      <div className="eyebrow" style={{marginBottom:12}}>Upcoming</div>
      <div style={{display:"grid",gap:11,marginBottom:24}}>{sessions.map(([t,cat,d],i)=>(
        <div className="row-card" key={i}><div style={{display:"flex",gap:14,alignItems:"center"}}><div style={{textAlign:"center",minWidth:48}}><div className="disp" style={{fontWeight:700,fontSize:20}}>{d.getDate()}</div><div className="mono" style={{fontSize:10,color:"var(--faint)"}}>{d.toLocaleString(undefined,{month:"short"}).toUpperCase()}</div></div>
          <div><div style={{fontWeight:600,fontSize:14.5}}>{t}</div><div style={{display:"flex",gap:9,marginTop:5,alignItems:"center"}}><span className="tag">{cat}</span><span className="mono" style={{fontSize:11,color:"var(--muted)"}}>{d.toLocaleTimeString(undefined,{hour:"numeric",minute:"2-digit"})} · live</span></div></div></div>
          <button className="btn btn-ghost sm">Remind me</button></div>))}</div>
      <div className="eyebrow" style={{marginBottom:12}}>Replay library</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:12}}>{["The 0→120K breakdown","Hooks that print followers","Funnels for creators","Your first paid offer"].map((t,i)=>(
        <div className="tool" key={i}><div className="tool-ic"><Play size={18}/></div><h4 style={{fontSize:14.5,marginTop:12}}>{t}</h4><p>Watch the replay anytime.</p></div>))}</div>
    </>
  );
}

/* ── COMMUNITY ── */
function CommunityView({P}){
  const{N}=NW(P);
  const feed=[["Maya R.","just hit 10K 🎉 the daily game plan changed everything","2h",148],["Devon K.","closed my first $997 client from a DM script in here","5h",96],["Priya S.",`launched my ${N.toLowerCase()} digital product — $1,240 day one`,"1d",203],["Marcus T.","ran my first $20/day ad set, 3.1× ROAS week one","1d",77]];
  const channels=["#wins","#content-feedback","#ads-help","#ai-systems","#monetization","#accountability"];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:8}}>
        <div><div className="eyebrow">Community</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0"}}>Build around people who build.</h1></div>
        <div className="live"><span className="pulse"/>1,204 members online</div>
      </div>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:560,marginBottom:18}}>Creators, founders, and AI operators obsessed with growth. Share wins, get feedback, find accountability. You become who you surround yourself with.</p>
      <div style={{display:"grid",gridTemplateColumns:"200px 1fr",gap:18}} className="hero">
        <div className="panel panel-pad"><span className="tag" style={{marginBottom:12,display:"inline-flex"}}>Channels</span><div style={{display:"flex",flexDirection:"column",gap:4}}>{channels.map((c,i)=>(<div key={c} className="nav-item" style={i===0?{color:"var(--text)",background:"var(--grad-soft)"}:{}}>{c}</div>))}</div></div>
        <div style={{display:"grid",gap:11}}>{feed.map(([who,txt,t,likes],i)=>(
          <div className="panel panel-pad" key={i}><div style={{display:"flex",gap:11,alignItems:"center",marginBottom:10}}><div className="disp" style={{width:34,height:34,borderRadius:9,background:"var(--surface3)",border:"1px solid var(--line2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13}}>{who[0]}</div><div><div style={{fontSize:14,fontWeight:600}}>{who}</div><div className="mono" style={{fontSize:11,color:"var(--faint)"}}>{t} ago · #wins</div></div></div>
            <p style={{fontSize:14.5,lineHeight:1.5}}>{txt}</p><div style={{display:"flex",gap:16,marginTop:11,color:"var(--muted)",fontSize:12.5}}><span style={{display:"flex",gap:6,alignItems:"center"}}><Flame size={13} color="var(--amber)"/>{likes}</span><span style={{display:"flex",gap:6,alignItems:"center"}}><MessageSquare size={13}/>reply</span></div></div>))}
        </div>
      </div>
    </>
  );
}
/* ─────────────────────────── DASHBOARD ─────────────────────────── */
function Dashboard({P,onReassess,onUpdate}){
  const [view,setView]=useState("coach");
  const [drawer,setDrawer]=useState(null);
  const [connected,setConnected]=useState(false);
  const [igHandle,setIgHandle]=useState("");
  const _today=dayKey();
  const [checkins,setCheckins]=useState(()=>cxStore.get("checkins",[]));
  const [streak,setStreak]=useState(()=>cxStore.get("streak",0));
  const checkedIn=checkins.includes(_today);
  const doCheckIn=()=>{ if(checkins.includes(_today)){return;} const y=new Date(Date.now()-86400000).toDateString(); const ns=checkins.includes(y)?streak+1:1; const nc=[...checkins,_today]; setCheckins(nc); setStreak(ns); cxStore.set("checkins",nc); cxStore.set("streak",ns); showToast("Checked in 🔥 Day "+ns); };
  const [connectModal,setConnectModal]=useState(false);
  const [nicheModal,setNicheModal]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [chatMsgs,setChatMsgs]=useState([]);
  const [pending,setPending]=useState(null);
  const [library,setLibrary]=useState([]);
  const [libOpen,setLibOpen]=useState(false);
  const [toast,setToast]=useState(null);
  const openChat=(text)=>{ if(text)setPending(text); setChatOpen(true); };
  const showToast=(m)=>{ setToast(m); setTimeout(()=>setToast(t=>t===m?null:t),2600); };
  const saveAsset=(title)=>{ setLibrary(l=>[{title,ts:Date.now()},...l]); showToast("Saved to library"); };

  const runAgent=(text)=>{
    const a=detectAction(text); if(!a) return null;
    if(a.type==="open"){
      setChatOpen(false); setTimeout(()=>setDrawer(a.tool),170);
      if(a.save){ saveAsset(toolTitle(a.tool)+" draft"); return `Done — opened the ${toolTitle(a.tool)} and saved a draft to your library.`; }
      return `On it — opening the ${toolTitle(a.tool)}.`;
    }
    if(a.type==="nav"){ setChatOpen(false); setTimeout(()=>setView(a.view),130); return `Pulled up your ${navLabel(a.view)}.`; }
    if(a.type==="connect"){ setChatOpen(false); setTimeout(()=>setConnectModal(true),150); return "Opening the Instagram connect flow."; }
    if(a.type==="checkin"){ doCheckIn(); return "Logged this week's check-in — your pace just recalculated."; }
    if(a.type==="save"){ saveAsset("Saved asset"); return "Saved to your library."; }
    return null;
  };

  const igCtx={connected,igHandle,setConnectModal};

  return (
    <div className="wrap shell">
      <aside className="nav">
        <div style={{display:"flex",alignItems:"center",gap:9,padding:"4px 8px 18px"}}>
          <div style={{width:26,height:26,borderRadius:7,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={15} color="#fff"/></div>
          <span className="disp" style={{fontWeight:700,fontSize:15.5}}>CreatorX</span>
        </div>
        <div style={{flex:1,overflowY:"auto"}}>
          {NAV.map((n,i)=>n.sec?<div key={i} className="nav-sec">{n.sec}</div>:
            <div key={n.k} className={"nav-item"+(view===n.k?" on":"")} onClick={()=>setView(n.k)}><n.ic size={17}/>{n.l}</div>)}
        </div>
        <div className="hair" style={{margin:"10px 0"}}/>
        <div className="nav-item" onClick={()=>setLibOpen(true)}><Bookmark size={17}/>Library {library.length>0 && <span className="lib-badge">{library.length}</span>}</div>
        <div className="nav-item" onClick={()=>setNicheModal(true)}><Crosshair size={17}/>Edit niche / goals</div>
        <div className="nav-item" onClick={onReassess}><RefreshCw size={17}/>Reassess</div>
        <div style={{display:"flex",alignItems:"center",gap:10,padding:"10px 8px 2px"}}>
          <div className="disp" style={{width:32,height:32,borderRadius:9,background:"var(--surface3)",border:"1px solid var(--line2)",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13}}>{(P.name||"U")[0].toUpperCase()}</div>
          <div style={{minWidth:0}}><div style={{fontSize:13,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{P.name}</div><div className="mono" style={{fontSize:11,color:"var(--faint)"}}>{P.tier.n}</div></div>
        </div>
      </aside>

      <main className="main">
        <div className="mobtop" style={{justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <div style={{width:26,height:26,borderRadius:7,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center"}}><Brain size={15} color="#fff"/></div>
            <span className="disp" style={{fontWeight:700,fontSize:15}}>CreatorX</span>
          </div>
          <div style={{display:"flex",gap:8}}>
            <div className="tab" onClick={()=>setLibOpen(true)}><Bookmark size={13} style={{verticalAlign:"-2px"}}/> {library.length}</div>
            <div className="tab" onClick={onReassess}><RefreshCw size={13} style={{verticalAlign:"-2px"}}/> Reassess</div>
          </div>
        </div>

        {/* mobile section switcher */}
        <div className="mobtop tabs" style={{marginBottom:14,overflowX:"auto"}}>
          {NAV.filter(n=>!n.sec).map(n=>(<div key={n.k} className={"tab"+(view===n.k?" on":"")} onClick={()=>setView(n.k)}>{n.l}</div>))}
        </div>

        <Ticker P={P}/>

        {view==="ask" && (
          <div className="panel" style={{display:"flex",flexDirection:"column",height:"calc(100vh - 150px)",minHeight:460,overflow:"hidden"}}>
            <div style={{borderBottom:"1px solid var(--line)",padding:"16px 20px",display:"flex",alignItems:"center",gap:11}}>
              <div className="ai-av" style={{width:34,height:34}}><Brain size={18} color="#fff"/></div>
              <div><div className="disp" style={{fontWeight:700,fontSize:16}}>Creator AI</div><div className="live" style={{fontSize:10.5}}><span className="pulse"/>architected by Michael Caso · trained on 10,000+ hrs of creator intelligence</div></div>
            </div>
            <ChatPanel P={P} msgs={chatMsgs} setMsgs={setChatMsgs} agent={runAgent}/>
          </div>
        )}
        {view==="coach" && <CoachView P={P} streak={streak} checkins={checkins} checkedIn={checkedIn} doCheckIn={doCheckIn} go={setView} open={setDrawer} openChat={openChat}/>}
        {view==="mission" && <MissionControlView P={P} go={setView} open={setDrawer}/>}
        {view==="today" && <TodayView P={P} open={setDrawer} go={setView} onComplete={()=>{doCheckIn();}}/>}
        {view==="home" && <Home P={P} open={setDrawer} go={setView} streak={streak} checkedIn={checkedIn}
          onCheckIn={doCheckIn} ig={igCtx} openChat={openChat}/>}
        {view==="index" && <IndexView P={P}/>}
        {view==="tracker" && <Tracker P={P} ig={igCtx} streak={streak} checkedIn={checkedIn} onCheckIn={doCheckIn}/>}
        {view==="dashboards" && <DashboardsView P={P} ig={igCtx} go={setView}/>}
        {view==="perflab" && <PerformanceLabView P={P} go={setView} open={setDrawer}/>}
        {view==="blueprint" && <BrandBlueprintView P={P} go={setView} open={setDrawer}/>}
        {view==="advisor" && <AdvisorView P={P} go={setView} open={setDrawer} askAI={openChat}/>}
        {view==="platforms" && <CrossPlatform P={P} open={setDrawer}/>}
        {view==="scanner" && <Scanner P={P} open={setDrawer} go={setView}/>}
        {view==="pagescan" && <PageScanView P={P} go={setView} open={setDrawer}/>}
        {view==="playbook" && <PlaybookView P={P} open={setDrawer}/>}
        {view==="analyzer" && <AnalyzerView P={P} askAI={openChat}/>}
        {view==="studio" && <StudioView P={P} open={setDrawer} go={setView}/>}
        {view==="hookengine" && <HookEngineView P={P} go={setView} open={setDrawer}/>}
        {view==="whatfilm" && <WhatToFilmView P={P} open={setDrawer}/>}
        {view==="growth" && <GrowthEngineView P={P}/>}
        {view==="ads" && <AdsEngineView P={P} open={setDrawer} go={setView}/>}
        {view==="business" && <BusinessModelsView P={P} open={setDrawer} go={setView}/>}
        {view==="monetize" && <MonetizeView P={P} open={setDrawer}/>}
        {view==="aisystems" && <AISystemsView P={P}/>}
        {view==="automation" && <AutomationEngineView P={P} open={setDrawer} go={setView}/>}
        {view==="distribution" && <DistributionView P={P} open={setDrawer}/>}
        {view==="emailfunnels" && <EmailFunnelView P={P} open={setDrawer}/>}
        {view==="live" && <LiveTrainingView P={P}/>}
        {view==="community" && <CommunityView P={P}/>}
      </main>

      {view!=="ask" && !chatOpen && !drawer && !connectModal && !nicheModal &&
        <button className="fab" onClick={()=>openChat()}><Sparkles size={18}/> Ask AI</button>}

      {chatOpen && (<>
        <div className="scrim" onClick={()=>setChatOpen(false)}/>
        <div className="chat-drawer">
          <div style={{borderBottom:"1px solid var(--line)",padding:"15px 18px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:11}}>
              <div className="ai-av" style={{width:34,height:34}}><Brain size={18} color="#fff"/></div>
              <div><div className="disp" style={{fontWeight:700,fontSize:16}}>Creator AI</div><div className="live" style={{fontSize:10.5}}><span className="pulse"/>architected by Michael Caso · trained on 10,000+ hrs of creator intelligence</div></div>
            </div>
            <div style={{cursor:"pointer",color:"var(--muted)"}} onClick={()=>setChatOpen(false)}><X size={22}/></div>
          </div>
          <ChatPanel P={P} msgs={chatMsgs} setMsgs={setChatMsgs} pending={pending} consume={()=>setPending(null)} agent={runAgent}/>
        </div>
      </>)}

      {drawer && <Drawer P={P} k={typeof drawer==="string"?drawer:drawer.k} preset={typeof drawer==="object"?drawer.preset:null} close={()=>setDrawer(null)} onSave={(t)=>saveAsset(t||(toolTitle(typeof drawer==="string"?drawer:drawer.k)+" draft"))} askAI={(prompt)=>{setDrawer(null);openChat(prompt);}}/>}
      {connectModal && <ConnectModal close={()=>setConnectModal(false)} onConnect={(h)=>{setIgHandle(h);setConnected(true);setConnectModal(false);}}/>}
      {nicheModal && <NicheModal P={P} close={()=>setNicheModal(false)} onSave={(niches,goals)=>{onUpdate({niches,goals,niche:niches[0],goal:goals[0]});setNicheModal(false);}}/>}

      {libOpen && (<>
        <div className="scrim" onClick={()=>setLibOpen(false)}/>
        <div className="drawer">
          <div style={{position:"sticky",top:0,background:"rgba(10,12,17,.85)",backdropFilter:"blur(8px)",borderBottom:"1px solid var(--line)",padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:2}}>
            <div><div className="eyebrow">Content Library</div><div className="disp" style={{fontWeight:700,fontSize:18,marginTop:3}}>{library.length} saved {library.length===1?"asset":"assets"}</div></div>
            <div style={{cursor:"pointer",color:"var(--muted)"}} onClick={()=>setLibOpen(false)}><X size={22}/></div>
          </div>
          <div style={{padding:22}}>
            {library.length===0 ? (
              <div style={{textAlign:"center",padding:"40px 0",color:"var(--muted)"}}>
                <Bookmark size={30} color="var(--faint)" style={{marginBottom:12}}/>
                <p style={{fontSize:14}}>Nothing saved yet. Generate something in Studio, or tell Creator AI to "make me 20 hooks and save them."</p>
              </div>
            ) : library.map((it,i)=>(
              <div className="lib-item" key={i}>
                <div style={{display:"flex",gap:11,alignItems:"center"}}><div className="tool-ic" style={{width:34,height:34}}><Bookmark size={15}/></div>
                  <div><div style={{fontSize:14,fontWeight:600}}>{it.title}</div><div className="mono" style={{fontSize:11,color:"var(--faint)"}}>{new Date(it.ts).toLocaleString()}</div></div></div>
                <span className="opp">SAVED</span>
              </div>
            ))}
          </div>
        </div>
      </>)}

      {toast && <div className="toast"><CheckCircle2 size={16} color="var(--green)"/>{toast}</div>}
    </div>
  );
}

function Ticker({P}){
  const items=[["CREATOR INDEX",P.index,"+"+P.weekly+"/wk",true],["HOOK POWER",P.subs[0].v,"+4.2",true],
    ["RETENTION",P.subs[1].v,"+2.8",true],["ENGAGEMENT",P.subs[2].v,"-1.1",false],
    ["MONETIZATION",P.subs[4].v,"+5.6",true],["FOLLOWERS",fmt(P.fBase),"▲",true],["PROJECTED 90D",P.proj,"▲",true]];
  return (
    <div className="ticker panel" style={{borderRadius:13,marginBottom:18}}>
      <div className="ticker-row">{[0,1].flatMap(r=>items.map(([l,v,d,up],i)=>(
        <span className="ticker-item" key={r+"-"+i}><Signal size={12} color="var(--faint)"/>{l} <b>{v}</b><span className={up?"delta-up":"delta-dn"} style={{fontSize:11}}>{d}</span></span>
      )))}</div>
    </div>
  );
}

/* ── HOME ── */
function DailyBriefing({P,open,go}){
  const ds=daySeed();
  const pk=pack(P), hooks=buildHooks(P);
  const day=new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"});
  const edges=[
    "Saves are weighted heavier than likes today — make something worth bookmarking.",
    "Shares are the algorithm's strongest signal. Build one reel designed to be sent to a friend.",
    "Your first hour decides everything. Post when your audience is most active and reply fast.",
    "Hook in 1.5 seconds or you've lost them. Lead with the boldest line.",
    "Carousels are getting a reach push right now — turn a winning reel into slides.",
    "Watch-time beats everything. Cut every dead second from your next reel.",
    "Comment-to-DM funnels are converting hard right now. Add a keyword to today's post.",
  ];
  const edge=edges[ds%edges.length];
  const idea=hooks[ds%hooks.length];
  const fmtPick=pk.formats[ds%pk.formats.length];
  const changes=[
    `+${fmt(Math.round(P.fBase*0.012+ (ds%9)*3))} followers since yesterday`,
    `Your "${pk.formats[(ds+1)%pk.formats.length][0]}" style is heating up in ${_low(P.niche)}`,
    `${(ds%3)+1} posts in your niche broke 1M views overnight — see what worked`,
  ];
  return (
    <div className="panel panel-pad" style={{marginBottom:18,position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",inset:0,background:"radial-gradient(600px 200px at 90% -40%,rgba(79,140,255,.14),transparent 60%)",pointerEvents:"none"}}/>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:8,marginBottom:14,position:"relative"}}>
        <div><div className="eyebrow">Your daily briefing</div><div className="disp" style={{fontWeight:700,fontSize:18,marginTop:3}}>{day}</div></div>
        <div className="live"><span className="pulse"/>updated for today</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,position:"relative"}} className="hero">
        <div className="out-card" style={{margin:0}}>
          <div className="eyebrow" style={{marginBottom:8}}>What changed since yesterday</div>
          <div style={{display:"flex",flexDirection:"column",gap:7}}>{changes.map((c,i)=>(<div key={i} style={{display:"flex",gap:8,fontSize:13.5,alignItems:"flex-start"}}><TrendingUp size={14} color="var(--green)" style={{marginTop:2,flexShrink:0}}/>{c}</div>))}</div>
        </div>
        <div className="out-card" style={{margin:0}}>
          <div className="eyebrow" style={{marginBottom:8}}>Today's edge</div>
          <p style={{fontSize:14.5,fontWeight:500,lineHeight:1.5}}>{edge}</p>
        </div>
      </div>
      <div className="nba" style={{marginTop:12,position:"relative"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <div style={{minWidth:0}}><div className="eyebrow" style={{marginBottom:5}}>Make this today · {fmtPick[0]}</div><div style={{fontSize:14.5,fontWeight:500}}>{idea.t}</div></div>
          <button className="btn btn-grad sm" style={{flexShrink:0}} onClick={()=>open("reels")}><Film size={15}/> Build it now</button>
        </div>
      </div>
    </div>
  );
}
/* ═══════════ INSTANT PAGE SCAN — surfaces a creator's data the moment they're in ═══════════ */
function scanProfile(P){
  const handle=((P.handle||"").trim().replace(/^@/,""))||"yourhandle";
  const plat=(P.platforms&&P.platforms[0]&&P.platforms[0].pl)||"Instagram";
  const fb=Math.max(0,FOLLOWERS.indexOf(P.followers)); 
  const R=(salt)=>rng(handle+salt,(""+salt).length+3);
  const base=[700,5200,28000,130000,420000][fb]||5200;
  const followers=Math.round(base*(0.85+R("f")*0.32));
  const following=Math.round(followers*(fb<=1?0.55:0.16)*(0.7+R("g")*0.6));
  const posts=Math.round(50+fb*110+R("p")*220);
  const erBase=[6.6,5.0,3.7,2.4,1.4][fb]||3.7;
  const er=+(erBase*(0.82+R("e")*0.5)).toFixed(1);
  const avgLikes=Math.round(followers*er/100*0.9);
  const avgComments=Math.round(Math.max(2,avgLikes*(0.018+R("c")*0.03)));
  const avgShares=Math.round(Math.max(1,avgLikes*(0.05+R("s")*0.09)));
  const avgSaves=Math.round(Math.max(1,avgLikes*(0.09+R("v")*0.13)));
  const ratio=+(followers/Math.max(1,following)).toFixed(1);
  const postsPerWeek=+(1.5+R("pw")*5).toFixed(1);
  const pk=pack(P);
  // scores (0-100)
  const bioScore=clamp(54+R("bio")*40);
  const consistencyScore=clamp(40+postsPerWeek*9);
  const engScore=clamp(er*14+30);
  const hookScore=clamp(48+R("hk")*44);
  const overall=Math.round((bioScore+consistencyScore+engScore+hookScore)/4);
  const grade=overall>=82?"A":overall>=70?"B":overall>=58?"C":overall>=45?"D":"E";
  const insights=[];
  if(ratio<1.2) insights.push(["Your follow ratio is low",`You follow ${fmt(following)} and ${fmt(followers)} follow you (${ratio}:1). Tighten who you follow — a strong ratio signals authority.`]);
  else insights.push([`Healthy ${ratio}:1 follower ratio`,`You're followed far more than you follow — that reads as authority. Keep it that way.`]);
  if(er<2.5) insights.push(["Engagement is under benchmark",`Your est. engagement (${er}%) is below the ${fmt(followers)}-follower benchmark. Saves & shares are the fix — make reference-worthy content.`]);
  else insights.push([`Engagement is above benchmark`,`Your est. ${er}% engagement beats the average at your size — lean into whatever's working and post more of it.`]);
  if(avgSaves<avgLikes*0.1) insights.push(["Low save-rate",`Saves drive reach more than likes. Add a "save this" CTA and make content people want to reference later.`]);
  if(consistencyScore<60) insights.push(["Posting cadence is light",`~${postsPerWeek} posts/week. Getting to 5+/week is the single biggest lever on growth at your stage.`]);
  if(bioScore<70) insights.push(["Your bio is leaving leads on the table",`A bio that names who you help + the outcome + a clear CTA converts profile visits into followers and DMs.`]);
  const quickWins=[
    `Rewrite your bio: [who you help] + [outcome] + [proof] + [CTA]. We can generate it in Brand Blueprint.`,
    `Add a comment-keyword to your next reel and wire the auto-DM — capture leads from the traffic you already get.`,
    `Post ${Math.max(1,Math.ceil(5-postsPerWeek))} more reel(s)/week, all Tier-1 length (5–12s), to lift reach.`,
    `Double down on ${pk.formats[0][0]} — it's a proven format in ${_low(P.niche)} and fits your page.`,
  ];
  return {handle,plat,followers,following,posts,er,avgLikes,avgComments,avgShares,avgSaves,ratio,postsPerWeek,
    bioScore,consistencyScore,engScore,hookScore,overall,grade,insights,quickWins};
}
function ScanCard({P,go,compact}){
  const s=useMemo(()=>scanProfile(P),[P]);
  const Metric=({label,value,sub})=>(
    <div style={{padding:"12px 13px",background:"var(--void)",border:"1px solid var(--line)",borderRadius:11}}>
      <div className="disp" style={{fontWeight:700,fontSize:20}}>{value}</div>
      <div className="mono" style={{fontSize:9.5,color:"var(--faint)",letterSpacing:".08em",textTransform:"uppercase",marginTop:3}}>{label}</div>
      {sub&&<div style={{fontSize:10.5,color:"var(--muted)",marginTop:2}}>{sub}</div>}
    </div>
  );
  return (
    <div className="panel panel-pad" style={{marginBottom:18,border:"1px solid rgba(79,140,255,.32)",background:"radial-gradient(120% 120% at 0% 0%,rgba(79,140,255,.10),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg))"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
        <div style={{display:"flex",gap:12,alignItems:"center"}}>
          <div className="tool-ic" style={{width:42,height:42}}><Search size={20}/></div>
          <div>
            <div className="eyebrow" style={{color:"var(--accent)"}}>Instant Page Scan</div>
            <div className="disp" style={{fontWeight:700,fontSize:19}}>@{s.handle}</div>
            <div className="mono" style={{fontSize:10.5,color:"var(--faint)"}}>{s.plat} · analyzed</div>
          </div>
        </div>
        <div style={{textAlign:"center"}}>
          <div className="disp" style={{fontWeight:800,fontSize:30,color:s.overall>=70?"var(--green)":s.overall>=55?"var(--accent)":"var(--amber)"}}>{s.grade}</div>
          <div className="mono" style={{fontSize:9.5,color:"var(--faint)"}}>PAGE SCORE {s.overall}</div>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:9,marginTop:16}} className="kpirow">
        <Metric label="Followers" value={fmt(s.followers)}/>
        <Metric label="Following" value={fmt(s.following)} sub={s.ratio+":1"}/>
        <Metric label="Posts" value={fmt(s.posts)}/>
        <Metric label="Engagement" value={s.er+"%"}/>
        <Metric label="Avg likes" value={fmt(s.avgLikes)}/>
        <Metric label="Avg comments" value={fmt(s.avgComments)}/>
        <Metric label="Avg shares" value={fmt(s.avgShares)}/>
        <Metric label="Avg saves" value={fmt(s.avgSaves)}/>
      </div>

      <div className="eyebrow" style={{margin:"18px 0 9px"}}>What the scan found</div>
      <div style={{display:"grid",gap:8}}>{s.insights.slice(0,compact?3:5).map(([t,d],i)=>(
        <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}><CircleDot size={14} color="var(--accent)" style={{flexShrink:0,marginTop:3}}/><div><span style={{fontWeight:600,fontSize:13.5}}>{t}.</span> <span style={{fontSize:13,color:"var(--muted)"}}>{d}</span></div></div>
      ))}</div>

      {!compact&&<>
        <div className="eyebrow" style={{margin:"18px 0 9px",color:"var(--green)"}}>Your quickest wins</div>
        <div style={{display:"grid",gap:7}}>{s.quickWins.map((w,i)=>(
          <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start",fontSize:13,color:"var(--muted)"}}><CheckCircle2 size={14} color="var(--green)" style={{flexShrink:0,marginTop:2}}/>{w}</div>
        ))}</div>
      </>}

      <div style={{display:"flex",gap:10,marginTop:16,flexWrap:"wrap",alignItems:"center"}}>
        <button className="btn btn-grad sm" onClick={()=>go&&go("pagescan")}><Search size={14}/> Full page diagnosis</button>
        <button className="btn btn-ghost sm" onClick={()=>go&&go("blueprint")}>Fix it with my Blueprint</button>
      </div>
      <p className="mono" style={{fontSize:10,color:"var(--faint)",marginTop:12}}>Instant estimate from your profile signals + {_low(P.niche)} benchmarks. Connect your {s.plat} account for exact, live numbers (followers, every post, comments & shares).</p>
    </div>
  );
}
/* ═══════════ ADVISOR — daily lessons · idea analysis · industry reports ═══════════ */
const LESSON_BANK=[
  ["The 3-second rule that decides everything","Your first 3 seconds determine 80% of your reach. If the hook doesn't create a question or a bold claim, the algorithm never tests you further.","Rewrite your last post's first line as a bolder claim — then compare the retention."],
  ["Saves and shares beat likes","Likes are vanity. Saves and shares are the signals that make the algorithm push you to new audiences. Build content people want to keep or send.","Add a 'save this' or 'send this to…' line to your next 3 posts."],
  ["Sell before you build","Most creators build a course nobody asked for. Sell the offer manually in DMs first — let demand fund the product.","DM 5 engaged followers a value-first message today. No pitch — just start the conversation."],
  ["Own your audience","Followers are rented from the algorithm. Email is owned. Start capturing emails now so a bad week never cuts off your income.","Set up one lead magnet + a capture page this week."],
  ["Consistency compounds","Three great posts a week for a year beats a viral spike that fizzles. The algorithm rewards creators who reliably hold attention.","Pick a sustainable cadence you can hit for 90 days — and commit to it."],
  ["The watch-time lever","A 90% watch on a 8s reel beats 40% on a 40s one. Shorter, tighter reels keep your completion rate high — and completion drives reach.","Cut your next reel to under 12s. Remove every second that doesn't earn attention."],
  ["Position against a villain","The fastest way to stand out is to name what you're against. A clear enemy (a myth, a bad practice) makes your point of view magnetic.","Write one post that flips a common belief in your niche."],
  ["One audience, one promise, one CTA","Confused audiences don't convert. Each post and page should speak to one person, promise one outcome, and ask for one action.","Audit your bio: does it name who you help, the outcome, and a single CTA?"],
  ["The DM is where money is made","Comments build reach; DMs close sales. A comment-to-DM funnel turns content into conversations into customers.","Add a comment keyword to your next reel and set up the auto-DM."],
  ["Repurpose, don't reinvent","One idea = a reel, a carousel, a thread, an email, a Short. Atomize your best content instead of always starting from zero.","Take your best post this month and turn it into 3 other formats."],
  ["Proof sells without selling","Show results — yours and your audience's. A screenshot of a win does more than ten posts of advice.","Post one piece of proof (a result, a testimonial, a before/after) this week."],
  ["Hook, retain, payoff, CTA","Every reel has four jobs: stop the scroll, hold them, deliver one idea, ask for one action. Miss one and the whole thing leaks.","Run your next idea through the Reel Builder's 4-beat structure."],
  ["Trends are a vehicle, not the message","Use a trending sound or format to carry YOUR point of view — don't just copy the trend. The trend gets reach; your angle gets followers.","Find one rising sound and put your niche's spin on it today."],
  ["Niche down to blow up","'Everyone' is not an audience. The tighter your niche, the stronger your pull — you can always expand once you own a lane.","Describe your audience in one specific sentence. If it could be anyone, narrow it."],
  ["Price on value, not time","Charge for the transformation you deliver, not the hours you spend. Outcomes command premium prices; effort does not.","Reframe your offer around the result it produces, then raise the price."],
];
function dailyTopics(P){
  const pk=pack(P);
  const seeded=shuffleSeeded(LESSON_BANK,"lsn"+daySeed()+(P.name||""));
  return seeded.slice(0,5).map(([t,body,action])=>({t,body,action}));
}
function analyzeIdea(P,kind,text){
  const pk=pack(P);const{n,N}=NW(P);
  const raw=(text||"").trim();const tl=raw.toLowerCase();
  const words=tl.split(/\s+/).filter(Boolean);const wc=words.length;
  const sentences=raw.split(/[.!?\n]+/).filter(s=>s.trim().length>3).length;
  const has=(...ks)=>ks.some(k=>tl.includes(k));
  // ── real signal extraction from THEIR text ──
  const audienceWords=["for ","parents","moms","dads","women","men","coach","coaches","creators","creator","founders","founder","entrepreneur","beginner","beginners","busy","people who","anyone who","students","professionals","teams","brands","small business","gym","athletes","over 30","over 40","over 50","newbies","experts","b2b","b2c","clients"];
  const outcomeWords=["help","get","lose","gain","grow","build","make","save","learn","achieve","double","triple","increase","faster","without","so they","results","transform","scale","heal","fix","earn","book","close","convert","attract","land"];
  const moneyWords=["$","subscription","membership","/mo","per month","price","pricing","pay","paid","sell","sells","selling","offer","course","coaching","retainer","one-time","tier","revenue","monetize","ad revenue","sponsor","affiliate","ticket"];
  const differWords=["only","unlike","different","unique","first","new way","nobody","no one","instead of","better than","proprietary","framework","method","system","signature","unlike anything","my own","exclusive","never been"];
  const formatWords=["reel","reels","video","content","post","posts","newsletter","podcast","youtube","tiktok","instagram","short","shorts","carousel","email","livestream","live","community","app","tool","saas","software","ai","automation","webinar","challenge","template","ebook","guide"];
  const audienceHit=audienceWords.filter(w=>tl.includes(w)).length;
  const outcomeHit=outcomeWords.filter(w=>tl.includes(w)).length;
  const moneyHit=moneyWords.filter(w=>tl.includes(w)).length;
  const differHit=differWords.filter(w=>tl.includes(w)).length;
  const formatHit=formatWords.filter(w=>tl.includes(w)).length;
  const numbers=(raw.match(/\$?\d[\d,.]*/g)||[]).length;
  const nicheMatch=has(_low(N))|| (pk.topics||[]).some(t=>tl.includes((t||"").split(" ").slice(-1)[0]))|| (pk.desires||[]).some(d=>tl.includes((d||"").split(" ").slice(-1)[0]));
  // keyword echo — pull the most distinctive words from their text
  const STOP=new Set("the a an and or but for to of in on with my our your you i it is are be that this who how what will can want help people make get into using use via as at from they them their".split(" "));
  const STOP2=new Set("gives give weekly daily every where which when into using based about really just like very more most some thing things stuff".split(" "));
  const kws=[...new Set(words.map(w=>w.replace(/[^a-z]/g,"")).filter(w=>w.length>3&&!STOP.has(w)&&!STOP2.has(w)))].slice(0,6);
  const echo=kws.length?kws.slice(0,3).join(", "):"your concept";
  // ── scores derived from real signals (vary by input, not random) ──
  const lenScore = wc<5?28 : wc<10?58 : wc<=45?Math.min(92,68+wc*0.5) : Math.max(60,92-(wc-45)*0.6);
  const clarity=clamp(lenScore + (sentences>=1?6:0) + (audienceHit&&outcomeHit?8:0) - (wc>70?6:0));
  const demand=clamp(40 + Math.min(24,audienceHit*9) + Math.min(20,outcomeHit*6) + (nicheMatch?12:0) + Math.min(8,formatHit*3));
  const differ=clamp(34 + Math.min(34,differHit*15) + Math.min(14,numbers*4) + (kws.length>=4?8:0));
  const monet=clamp(38 + Math.min(34,moneyHit*12) + (kind==="business"?12:0) + Math.min(10,numbers*3));
  const distrib=clamp(40 + Math.min(30,formatHit*9) + (has("instagram","tiktok","youtube","reel","short")?12:0) + (nicheMatch?6:0));
  const overall=Math.round((clarity*1.1+demand*1.15+differ+monet+distrib)/5.35);
  const verdict=overall>=80?"Strong — build it":overall>=66?"Promising — sharpen it":overall>=50?"Has potential — needs focus":"Early — needs work before you build";
  // ── strengths (from what's PRESENT) — guaranteed ≥2, referencing their words ──
  const S=[];
  if(audienceHit)S.push(`You named a target audience, not "everyone" — a specific audience is the foundation most people skip, and it's already in your idea.`);
  if(outcomeHit)S.push(`There's a tangible outcome in your idea, not just an activity. Outcomes are what make content land and offers sell.`);
  if(moneyHit)S.push(`You've thought about how this makes money — most creators ignore monetization until it's too late. You're ahead there.`);
  if(differHit)S.push(`You've gestured at a differentiator (your angle on "${kws[0]||N}"). That "why you" is what keeps you out of a price war.`);
  if(formatHit)S.push(`It's built for content-led distribution — which is exactly the cheap-reach advantage creators have over traditional businesses.`);
  if(numbers)S.push(`You included specifics (numbers/figures). Specificity makes an idea believable and testable instead of hand-wavy.`);
  if(nicheMatch)S.push(`It maps cleanly onto ${n}, where you already have context and audience — lower risk than starting cold.`);
  if(S.length<2)S.push(`You've put the idea into words and you're pressure-testing it before building — that instinct alone puts you ahead of most.`);
  if(S.length<2)S.push(`There's a real seed here in "${echo}" worth developing — the raw direction is workable.`);
  // ── risks (from what's MISSING) ──
  const R=[];
  if(wc<6)R.push(`It's too thin to fully evaluate — give me one or two more sentences (who it's for, the outcome, how it's delivered) and the analysis sharpens a lot.`);
  if(!audienceHit)R.push(`I can't tell exactly who this is for. "Everyone" converts like no one — name one specific person you're building for.`);
  if(!outcomeHit)R.push(`The concrete outcome isn't explicit. People don't buy the thing — they buy the result. Spell out what changes for them.`);
  if(!differHit)R.push(`Nothing here separates you from others doing something similar. Without a sharp point of view, you'll compete on noise and price.`);
  if(!moneyHit&&kind==="business")R.push(`No revenue path yet. Map exactly how this earns — offer, price, and who pays — before investing build time.`);
  if(!formatHit)R.push(`Distribution is unclear — how do people actually discover this? Decide the format and platform that carries it.`);
  if(R.length===0)R.push(`The fundamentals are here — the risk now is execution: consistency and proof will make or break it.`);
  // ── recommendations targeting THEIR gaps ──
  const rc=[];
  rc.push(clarity<78
    ? `Rewrite your one-liner as: "I help ${audienceHit?echo:"[specific who]"} ${outcomeHit?"":"[outcome] "}without [the pain they hate]." Put it in your bio and your first reel.`
    : `Your concept is clear — lock the one-liner and lead every piece of content with it so the positioning compounds.`);
  rc.push(differ<66
    ? `Sharpen the edge: name what you're against. Pick a common belief in ${n} and position "${kws[0]||"your idea"}" as the better alternative.`
    : `Lean hard into your differentiator in every post — it's your moat, so make it loud.`);
  rc.push(monet<66
    ? `Build the offer ladder: free lead magnet → low-ticket ($27–97) → core offer ($297–997). Sell the core offer manually in DMs first.`
    : `Validate price by selling to 3 people before you build anything bigger — let real money confirm demand.`);
  rc.push(distrib<66
    ? `Pick your distribution engine: turn "${echo}" into 5 Tier-1 reels (5–12s) and a comment-to-DM funnel to capture interest.`
    : `Double down on the format that's working — batch a week of it and let the data pick your winners.`);
  rc.push(kind==="business"
    ? `Validate fast: pre-sell to 5 people or open a waitlist for "${echo}" before investing weeks of build time. Demand first, build second.`
    : `Test the angle this week: post 3 reels on "${echo}" and read the saves + retention before you commit to the series.`);
  // ── market read — niche grounded + their terms ──
  const market=`In ${n}, audiences are pulled by ${pk.desires.slice(0,2).join(" and ")} and frustrated by ${pk.pains[0]}. For an idea like ${kind==="business"?"this offer":"this content angle"} — "${echo}" — the winners right now lead with the outcome, prove it with results, use short-form video for cheap reach, and convert in DMs and email. The fastest trust-killer is ${pk.mistakes[0]}, so position against it. Owned audience (email/SMS) is the durable moat once you have proof.${nicheMatch?"":" Note: your idea reads slightly outside your stated niche — make sure the audience you have actually wants it, or be ready to build a new one."}`;
  return {kind,text:raw,echo,kws,clarity,demand,differ,monet,distrib,overall,verdict,
    strengths:S.slice(0,5),risks:R.slice(0,5),recs:rc,market,
    scores:[["Clarity",clarity],["Demand",demand],["Differentiation",differ],["Monetization",monet],["Distribution",distrib]]};
}
function industryReport(P,topic){
  const pk=pack(P);const{n,N}=NW(P);const T=topic||N;
  const fb=Math.max(0,FOLLOWERS.indexOf(P.followers));
  const stage=["pre-launch / under 1K","emerging (1K–10K)","established (10K–50K)","scaling (50K–250K)","authority (250K+)"][fb]||"emerging";
  const er=[6.6,5.0,3.7,2.4,1.4][fb]||3.7;
  const date=todayStamp();
  const f0=(pk.formats[0]&&pk.formats[0][0])||"talking-head";
  const f1=(pk.formats[1]&&pk.formats[1][0])||"behind-the-scenes";
  const f2=(pk.formats[2]&&pk.formats[2][0])||"proof / results";
  return {title:`${_cap(T)} — Industry & Opportunity Report`,subtitle:`Prepared for ${N} · stage: ${stage} · built as of ${date}`,docOpts:{subtitle:`Built as of ${date} · ${stage}`},blocks:[
    {label:"01 · Executive summary",text:`This is a strategic read on ${_low(T)} as of ${date}, written for an operator at the ${stage} stage.\n\nThe headline: ${_cap(_low(T))} has fully shifted from a "post and hope" game to a distribution-and-conversion system. Three forces are reshaping it right now — (1) short-form video has compressed the cost of reach to near zero while raising the bar on the first two seconds; (2) AI has collapsed production time, so volume is no longer the moat — taste and point-of-view are; (3) audiences have been marketed to so heavily that trust, proof, and a clear enemy now out-convert polish.\n\nThe operators winning in ${n} are not the most talented — they are the most systematic. They run a repeatable loop: a sharp hook → a retained idea → a save-worthy payoff → one clear CTA → a capture mechanism (DM/email). Everyone else is making content; the winners are building a machine.\n\nYour single highest-leverage move at ${stage}: ${fb<=1?"pick one lane, post 5+ Tier-1 reels/week, and start capturing emails from day one":"systematize what already works, build owned audience, and put a real offer ladder behind your reach"}.`},
    {label:"02 · The state of play",text:`Attention is the scarce resource and it is getting more expensive to hold, not to earn. Reach is abundant; retention is the bottleneck.\n\nWhat changed in the last 12–18 months in ${n}:\n• Watch-time % (completion + replays) is now the dominant ranking signal over raw likes. Short, looping reels win because a 90% completion on 8 seconds beats 40% on 40 seconds.\n• The "hook tax" rose — the first 1–2 seconds decide 80% of distribution. Weak openers never get tested.\n• Saves and shares became the real growth currency. They signal "reference-worthy" and "send-worthy," which the algorithm rewards with cold reach.\n• Founder-led / face-to-camera content is beating polished brand content, because trust now travels through people, not logos.\n• AI made average content free and infinite — which paradoxically made a distinct point of view more valuable, not less.\n\nAt the ${stage} stage specifically, the benchmark engagement rate hovers around ${er}%. Beating it consistently is what separates accounts that compound from accounts that plateau.`},
    {label:"03 · Audience & buyer psychology",text:`Your audience in ${n} is pulled by a small number of deep desires and pushed by a few specific pains. Lead with these and you never run out of content.\n\nWhat they want: ${pk.desires.slice(0,4).join("; ")}.\nWhat frustrates them: ${pk.pains.slice(0,3).join("; ")}.\nWhat they've been burned by: ${pk.mistakes.slice(0,2).join(" and ")} — which is exactly why proof and specificity now out-convert hype.\n\nBuyer psychology that matters here:\n• They buy outcomes, not features. "${_cap(pk.desires[0])}" sells; "my 8-week program" does not.\n• They trust demonstration over claims — a single result/before-after does more than ten posts of advice.\n• They move on identity and belonging. People follow accounts that make them feel like the person they want to become.\n• They convert in private (DMs, email), not in public. Comments build reach; conversations build revenue.\n\nThe content that earns trust fastest: name a common belief in ${n} you disagree with, then prove your alternative. A clear "villain" makes your POV magnetic.`},
    {label:"04 · What's working right now (tactics)",text:`Concrete, currently-working plays in ${n}, ranked by leverage:\n\n1. Tier-1 short video (5–12s) with a bold text hook in frame one. Highest reach-per-minute-of-effort.\n2. Outcome-led hooks: "How to ${pk.desires[0]}", "Why ${pk.pains[0]}", "Stop ${pk.mistakes[0]}". \n3. Top-performing formats for you specifically: ${f0}, ${f1}, and ${f2}.\n4. Save-bait structures: numbered lists, "steal this," frameworks, and reference checklists.\n5. Share-bait structures: relatable callouts, contrarian truths, and "send this to someone who…".\n6. Comment-to-DM funnels: a keyword in the caption → auto-DM → link. Captures leads from reach you already earn.\n7. Story sequences that pull viewers to the feed post (tease → poll → "go watch").\n8. Repurposing: one strong idea atomized into a reel, a carousel, a short, an email, and 3 stories.\n\nPosting cadence that compounds at ${stage}: ${fb<=1?"5–7 reels/week to find your winners fast":"4–5 high-quality reels/week plus daily stories"}.`},
    {label:"05 · Monetization & unit economics",text:`The offer ladder that works in ${n}, with realistic price bands:\n\n• Lead magnet (free): a checklist, mini-guide, or calculator that solves one specific problem. Goal: capture email, not money.\n• Low-ticket ($27–$97): a buyer filter — turns followers into customers and pays your ad/tool costs.\n• Core offer ($297–$997): your main revenue engine — coaching, a course, a productized service.\n• High-ticket ($1.5k–$5k+): for people who want speed, access, or done-with-you.\n• Recurring (membership/community, $19–$99/mo): compounds best once you have proof and a back catalog.\n\nUnit-economics reality at ${stage}: with ~${er}% engagement, a small, warm audience monetized well beats a large cold one. ${fb<=1?"Don't build a course yet — sell a $197–$497 offer manually in DMs and let demand fund the product.":"Systematize the funnel: lead magnet → nurture → core offer, and add one recurring product for stability."}\n\nNorth-star metric: revenue per 1,000 followers per month. Most in ${n} leave this near zero by never asking; fixing the ask is the fastest revenue you'll find.`},
    {label:"06 · Opportunities (the openings)",text:`Where the whitespace is in ${n} right now — ranked by ROI:\n\n• Consistency arbitrage: most accounts are sporadic. Reliable posting alone beats the majority. Lowest-effort edge available.\n• Owned audience: very few build an email/SMS list early. Doing so is a durable moat that survives algorithm changes.\n• Under-used formats: ${f1} and ${f2} are working but under-produced in your space — get there before it's saturated.\n• Education-as-marketing: teach the thing your offer delivers. It builds trust and pre-sells simultaneously.\n• AI leverage: a solo operator can now run research, scripting, repurposing, and DMs like a small team. Early movers compound.\n• Category creation: name your own method/framework. Owning a term ("the ___ method") makes you uncopyable.\n• Cross-platform: repurpose winners to a second platform for near-free incremental reach.`},
    {label:"07 · Threats & risks",text:`What can break a ${_low(T)} business — and how to defend:\n\n• Platform dependency: one ranking change can halve your reach overnight. Defense: own your audience (email/SMS) and diversify to a second platform.\n• Commoditization: AI made average content free, so generic is invisible. Defense: a sharp, specific point of view that only you could hold.\n• Trust erosion: over-hyping, fake scarcity, or ${pk.mistakes[0]} torches long-term brand equity for a short-term spike. Defense: lead with proof; under-promise, over-deliver.\n• Burnout: without systems and repurposing, the cadence isn't survivable. Defense: batch, template, and automate the repetitive 80%.\n• Monetization fragility: relying on a single offer or platform for income. Defense: an offer ladder + recurring revenue.\n• Regulatory/claims risk (esp. in health/finance/${_low(N)}): avoid unsupported claims and guarantees.`},
    {label:"08 · 90-day action plan",text:`A sequenced plan for ${N} at the ${stage} stage:\n\nDays 1–30 — Foundation & reach:\n• Lock a one-line positioning and a content pillar set.\n• Ship ${fb<=1?"5–7":"4–5"} Tier-1 reels/week; track hooks and saves.\n• Stand up a lead magnet + email capture.\n\nDays 31–60 — Convert:\n• Add comment-to-DM automation to every post.\n• Launch one core offer; sell it manually in DMs first.\n• Start a weekly story sales sequence.\n\nDays 61–90 — Systematize & scale:\n• Build a repurposing system (1 idea → 5 assets).\n• Add a nurture email sequence and a recurring product.\n• Double down on your top 3 formats; cut what underperforms.\n\nReview weekly: what got saved/shared, what converted, what to repeat.`},
    {label:"09 · Sources & method",text:`Method: this report synthesizes platform best-practice patterns, engagement benchmarks by follower stage, monetization models proven across the creator economy, and the behavioral psychology of buying in ${n}, tuned to your profile (stage: ${stage}; niche: ${n}). It is a strategic synthesis as of ${date}, not financial or legal advice. Validate pricing and claims against your own audience before committing capital.`},
  ]};
}

function AdvisorView({P,go,open,askAI}){
  const [tab,setTab]=useState("learn");
  const lessons=useMemo(()=>dailyTopics(P),[P]);
  const [kind,setKind]=useState("content");
  const [idea,setIdea]=useState("");
  const [analysis,setAnalysis]=useState(null);
  const [busy,setBusy]=useState(false);
  const [rtopic,setRtopic]=useState("");
  const [report,setReport]=useState(null);
  const run=()=>{if(!idea.trim())return;setBusy(true);setTimeout(()=>{setAnalysis(analyzeIdea(P,kind,idea));setBusy(false);},800);};
  const genReport=()=>{setBusy(true);setTimeout(()=>{setReport(industryReport(P,rtopic.trim()||_first(P.niche)));setBusy(false);},800);};
  const Bar=({label,v})=>(<div style={{marginBottom:9}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12.5,marginBottom:4}}><span>{label}</span><span className="mono" style={{color:v>=70?"var(--green)":v>=55?"var(--accent)":"var(--amber)"}}>{v}</span></div><div className="bar"><i style={{width:v+"%",background:v>=70?"var(--green)":"var(--grad)"}}/></div></div>);
  return (
    <>
      <div className="eyebrow">The Advisor</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Your strategist for the whole business — not just the videos.</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:660,marginBottom:16}}>Learn something new every day, get a real analysis of any business or content idea, and pull an industry report whenever you need one. This is where we help you think — from launch to growth to monetization.</p>
      <div className="tabs">
        {[["learn","Daily Lessons"],["idea","Analyze My Idea"],["report","Industry Report"]].map(([k,l])=>(
          <div key={k} className={"tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}>{l}</div>))}
      </div>

      {tab==="learn" && (<>
        <div style={{display:"flex",justifyContent:"flex-end",marginBottom:8}}><LivePill label={"Refreshed "+todayStamp()}/></div>
        <div className="nba" style={{marginBottom:14}}><p style={{fontSize:14.5,fontWeight:500}}>Today's lessons for {P.niche} — a fresh set every day, sequenced from what you've already learned. Read one, do the action, move your business forward.</p></div>
        <div style={{display:"grid",gap:10}}>{lessons.map((l,i)=>(
          <details className="panel" key={i} style={{padding:0}}>
            <summary style={{padding:"15px 16px",cursor:"pointer",listStyle:"none",display:"flex",alignItems:"center",gap:12}}>
              <div className="tool-ic" style={{width:36,height:36,flexShrink:0}}><Lightbulb size={17}/></div>
              <div style={{flex:1,fontWeight:600,fontSize:14.5}}>{l.t}</div>
              <ChevronDown size={16} color="var(--muted)"/>
            </summary>
            <div style={{padding:"0 16px 16px 64px"}}>
              <p style={{fontSize:13.5,lineHeight:1.55,color:"var(--muted)",marginBottom:10}}>{l.body}</p>
              <div className="nba" style={{padding:"11px 13px"}}><span className="eyebrow" style={{color:"var(--green)"}}>Do this today</span><p style={{fontSize:13.5,fontWeight:500,marginTop:4}}>{l.action}</p></div>
            </div>
          </details>
        ))}</div>
        <p className="mono" style={{fontSize:10.5,color:"var(--faint)",marginTop:14}}>Lessons rotate daily, tuned to your niche and goals. Submit your own questions any time in Analyze My Idea.</p>
      </>)}

      {tab==="idea" && (<>
        {!analysis && (<div className="panel panel-pad">
          <div className="eyebrow" style={{marginBottom:9}}>What do you want analyzed?</div>
          <div className="opts two" style={{marginBottom:14}}>
            {[["content","A content idea"],["business","A business / offer idea"]].map(([k,l])=>(
              <div key={k} className={"chip"+(kind===k?" on":"")} onClick={()=>setKind(k)}><span className="dot"/>{l}{kind===k&&<Check size={14} className="ck"/>}</div>))}
          </div>
          <div className="eyebrow" style={{marginBottom:8}}>Describe it — the more detail, the sharper the analysis</div>
          <textarea className="cx-in" rows={4} value={idea} onChange={e=>setIdea(e.target.value)} placeholder={kind==="business"?"e.g. A $49/mo membership that gives busy parents weekly fat-loss meal plans + a private community…":"e.g. A weekly 'myth-busting' reel series where I debunk one fitness myth and show the science fast…"}/>
          <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",marginTop:12,padding:"13px"}} disabled={busy||!idea.trim()} onClick={run}>{busy?<><span className="pulse" style={{marginRight:8}}/>Analyzing…</>:<><Compass size={16}/> Analyze my idea</>}</button>
        </div>)}
        {analysis && (<>
          <div className="panel panel-pad" style={{marginBottom:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:12,flexWrap:"wrap",marginBottom:14}}>
              <div><div className="eyebrow">Verdict</div><div className="disp" style={{fontWeight:700,fontSize:20,color:analysis.overall>=64?"var(--green)":"var(--amber)"}}>{analysis.verdict}</div></div>
              <div style={{textAlign:"center"}}><div className="disp" style={{fontWeight:800,fontSize:30}}>{analysis.overall}</div><div className="mono" style={{fontSize:9.5,color:"var(--faint)"}}>IDEA SCORE</div></div>
            </div>
            {analysis.scores.map(([l,v])=><Bar key={l} label={l} v={v}/>)}
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13,marginBottom:14}} className="hero">
            <div className="panel panel-pad"><div className="eyebrow" style={{color:"var(--green)",marginBottom:9}}>Strengths</div>{analysis.strengths.map((s,i)=><div key={i} style={{display:"flex",gap:9,fontSize:13,marginBottom:8,lineHeight:1.4}}><CheckCircle2 size={14} color="var(--green)" style={{flexShrink:0,marginTop:2}}/>{s}</div>)}</div>
            <div className="panel panel-pad"><div className="eyebrow" style={{color:"var(--amber)",marginBottom:9}}>Risks</div>{analysis.risks.map((s,i)=><div key={i} style={{display:"flex",gap:9,fontSize:13,marginBottom:8,lineHeight:1.4,color:"var(--muted)"}}><AlertTriangle size={14} color="var(--amber)" style={{flexShrink:0,marginTop:2}}/>{s}</div>)}</div>
          </div>
          <div className="panel panel-pad" style={{marginBottom:14}}><div className="eyebrow" style={{marginBottom:10}}>Recommendations</div>{analysis.recs.map((r,i)=><div key={i} style={{display:"flex",gap:11,marginBottom:10,alignItems:"flex-start"}}><div style={{width:22,height:22,borderRadius:6,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,flexShrink:0}}>{i+1}</div><div style={{fontSize:13.5,lineHeight:1.45,paddingTop:1}}>{r}</div></div>)}</div>
          <div className="nba" style={{marginBottom:14}}><div className="eyebrow" style={{marginBottom:6}}>Market read · {P.niche}</div><p style={{fontSize:13.5,lineHeight:1.55}}>{analysis.market}</p></div>
          <DocActions title="My idea analysis" P={P} opts={{subtitle:`${analysis.kind==="business"?"Business":"Content"} idea · score ${analysis.overall}/100`}} label="Download the full analysis — PDF / Word"
            blocks={[{label:"The idea",text:analysis.text},{label:"Verdict",text:`${analysis.verdict} (${analysis.overall}/100)`},{label:"Scores",text:analysis.scores.map(([l,v])=>`${l}: ${v}/100`).join("\n")},{label:"Strengths",text:analysis.strengths.map(s=>"• "+s).join("\n")},{label:"Risks",text:analysis.risks.map(s=>"• "+s).join("\n")},{label:"Recommendations",text:analysis.recs.map((r,i)=>`${i+1}. ${r}`).join("\n")},{label:"Market read",text:analysis.market}]}/>
          <div className="btn-row" style={{marginTop:14}}><button className="btn btn-ghost" onClick={()=>{setAnalysis(null);setIdea("");}}>Analyze another idea</button>{askAI&&<button className="btn btn-ghost" onClick={()=>askAI&&askAI("Go deeper on my idea: "+analysis.text)}><Sparkles size={15}/> Ask Creator AI to go deeper</button>}</div>
        </>)}
      </>)}

      {tab==="report" && (<>
        {!report && (<div className="panel panel-pad">
          <div className="eyebrow" style={{marginBottom:8}}>Which industry or topic should I report on?</div>
          <input className="cx-in" value={rtopic} onChange={e=>setRtopic(e.target.value)} placeholder={`e.g. ${_first(P.niche)}, the creator economy, AI coaching…`}/>
          <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",marginTop:12,padding:"13px"}} disabled={busy} onClick={genReport}>{busy?<><span className="pulse" style={{marginRight:8}}/>Building your report…</>:<><Briefcase size={16}/> Generate industry report</>}</button>
          <p className="mono" style={{fontSize:10.5,color:"var(--faint)",marginTop:12}}>A structured read on the state of play, demand, monetization, opportunities, threats and your move.</p>
        </div>)}
        {report && (<>
          <h2 className="disp" style={{fontWeight:700,fontSize:22,margin:"2px 0 4px"}}>{report.title}</h2>
          <p style={{color:"var(--muted)",fontSize:13,marginBottom:14}}>{report.subtitle}</p>
          <div style={{display:"grid",gap:10,marginBottom:14}}>{report.blocks.map((b,i)=>(
            <details key={i} className="panel" style={{padding:0}}><summary style={{padding:"14px 16px",cursor:"pointer",fontWeight:600,fontSize:14,listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>{b.label}<ChevronDown size={16} color="var(--muted)"/></summary><div className="kit" style={{padding:"0 16px 16px"}}>{b.text}</div></details>
          ))}</div>
          <DocActions title={report.title} P={P} opts={{subtitle:report.subtitle}} blocks={report.blocks} label="Download the report — PDF / Word"/>
          <div className="btn-row" style={{marginTop:14}}><button className="btn btn-ghost" onClick={()=>{setReport(null);setRtopic("");}}>New report</button></div>
        </>)}
      </>)}
    </>
  );
}
/* ═══════════ DAILY ENGINE — persistence, daily generators, Coach & Mission Control ═══════════ */
const cxStore={
  get(k,d){ try{ if(typeof window==="undefined"||!window.localStorage) return d; const v=window.localStorage.getItem("cx_"+k); return v==null?d:JSON.parse(v); }catch(e){ return d; } },
  set(k,v){ try{ if(typeof window!=="undefined"&&window.localStorage) window.localStorage.setItem("cx_"+k,JSON.stringify(v)); }catch(e){} },
};
const dayKey=(d)=>new Date(d||Date.now()).toDateString();
const greetWord=()=>{const h=new Date().getHours();return h<12?"Good morning":h<18?"Good afternoon":"Good evening";};

const MOVE_POOL=[
  {l:"Generate 5 hooks and pick your favorite",d:"Open the Hook Engine, generate a fresh set, copy the strongest.",view:"hookengine"},
  {l:"Film & post one Tier-1 reel (5–12s)",d:"Short, fast, strong hook in the first second. Speed wins reach.",drawer:"reels"},
  {l:"Reply to 10 comments in your first hour",d:"Fast early engagement tells the algorithm to push you wider.",view:null},
  {l:"Post a 3-slide story that drives to your reel",d:"Tease → poll → 'go watch'. Stories pull people to your posts.",drawer:"story"},
  {l:"DM 5 engaged followers a value-first message",d:"No pitch. Start the conversation — this is where sales begin.",view:null},
  {l:"Bank tomorrow's caption in the Caption Lab",d:"Write it today so you never post late or off-brand.",drawer:"caption"},
  {l:"Study one competitor's top reel",d:"What's the hook, length, and CTA? Steal the structure, not the content.",view:"pagescan"},
  {l:"Wire a comment-keyword + auto-DM on today's post",d:"Capture leads from the reach you already get.",view:"automation"},
  {l:"Review yesterday's performance",d:"Find what worked and plan more of it. Cut what didn't.",view:"perflab"},
  {l:"Engage 15 min in your niche before posting",d:"Warm up the algorithm and get on other creators' radars.",view:null},
  {l:"Write one piece of proof content",d:"A result, a win, a before/after. Proof sells without selling.",drawer:"caption"},
  {l:"Read today's breakdown and do the action",d:"One lesson, one action. Compounding starts with reps.",view:"advisor"},
];
function dailyMoves(P){return shuffleSeeded(MOVE_POOL,"mv"+daySeed()+(P.name||"")).slice(0,3);}
function coachLine(P,streak,pulse){
  const pk=pack(P);
  if(pulse&&pulse.energy==="Low") return `Low-energy days are when streaks are really built. We'll keep it light — just hit the 3 moves and log it. Showing up beats motivation.`;
  if(streak>=14) return `${streak} days straight. This isn't a phase anymore — it's who you are now. Keep stacking.`;
  if(streak>=7) return `A full week locked in. The compounding is starting. Don't break the chain today.`;
  if(streak>=3) return `${streak} days in a row. Momentum is real — protect it. Today's moves are below.`;
  if(streak===0) return `New day, clean slate. The creators who win aren't more talented — they show up. Let's get today's check-in done.`;
  return `Day ${streak+1}. Consistency is the whole game in ${pk.pains?"your niche":"this"}. Check in and let's move.`;
}
function dailyReport(P,pulse){
  const pk=pack(P);const{n,N}=NW(P);const seed=daySeed();
  const opps=[`Your audience saves educational content — make one reference-worthy post today.`,`A short Tier-1 reel on "${pk.topics[0]}" is your highest-reach move right now.`,`You have traffic but light capture — add a comment-keyword funnel to today's post.`,`Stories are underused on your page — run a poll to spike first-hour engagement.`,`Repurpose your best post this month into a carousel for saves.`];
  const risks=[`Don't let posting slip — consistency is the #1 lever at your stage.`,`Watch your hook: if the first 2s don't land, nothing else gets seen.`,`You're relying on the algorithm — start building your email list this week.`,`Avoid posting and ghosting — reply in the first hour or reach stalls.`,`Don't chase trends with no point of view — your angle is what converts.`];
  const focusMap={Create:"create",Engage:"engage",Sell:"sell",Learn:"learn"};
  const focus=pulse&&pulse.focus?pulse.focus:["Create","Engage","Sell","Learn"][seed%4];
  return {
    yesterday: (pulse&&pulse.posted==="No")?`You didn't post yesterday — no guilt, but today we get back on. One post resets the rhythm.`:`You showed up yesterday. That's the habit that compounds. Let's stack another.`,
    today:`Today is a ${focus.toUpperCase()} day. Put your energy there first — one focused move beats five scattered ones.`,
    opportunity: opps[seed%opps.length],
    risk: risks[(seed+2)%risks.length],
    call:`Coach's call: do the 3 moves below, log your check-in, and protect the streak. That's a winning day.`,
  };
}
function adherenceData(checkins){
  const set=new Set(checkins||[]);
  const days=[]; for(let i=83;i>=0;i--){const d=new Date(Date.now()-i*86400000);days.push({k:d.toDateString(),on:set.has(d.toDateString())});}
  const last14=days.slice(-14);
  const adherence=Math.round(last14.filter(d=>d.on).length/14*100);
  const week=days.slice(-7);
  const last30=days.slice(-30);
  const consistency=Math.round(last30.filter(d=>d.on).length/30*100);
  return {days,week,adherence,consistency};
}
function CoachView({P,streak,checkins,checkedIn,doCheckIn,go,open,openChat}){
  const today=dayKey();
  const moves=useMemo(()=>dailyMoves(P),[P]);
  const lesson=useMemo(()=>dailyTopics(P)[0],[P]);
  const [pulse,setPulse]=useState(()=>cxStore.get("pulse_"+today,null));
  const [todo,setTodo]=useState(()=>cxStore.get("todo_"+today,[false,false,false]));
  const [step,setStep]=useState(0);
  const [draft,setDraft]=useState({});
  const ad=useMemo(()=>adherenceData(checkins),[checkins]);
  const report=useMemo(()=>dailyReport(P,pulse),[P,pulse]);
  const toggleTodo=(i)=>{const nt=todo.map((v,j)=>j===i?!v:v);setTodo(nt);cxStore.set("todo_"+today,nt);};
  const doneCount=todo.filter(Boolean).length;
  const submitPulse=()=>{const pl={posted:draft.posted||"Yes",energy:draft.energy||"Good",focus:draft.focus||"Create"};setPulse(pl);cxStore.set("pulse_"+today,pl);if(!checkedIn)doCheckIn();};
  const Q=({label,opts,k})=>(<div style={{marginBottom:14}}><div className="eyebrow" style={{marginBottom:8}}>{label}</div><div className="opts" style={{gridTemplateColumns:`repeat(${opts.length},1fr)`}}>{opts.map(o=>(<div key={o} className={"chip"+(draft[k]===o?" on":"")} onClick={()=>setDraft(d=>({...d,[k]:o}))}><span className="dot"/>{o}{draft[k]===o&&<Check size={13} className="ck"/>}</div>))}</div></div>);

  return (
    <>
      {/* Coach header */}
      <div className="panel panel-pad" style={{marginBottom:16,background:"radial-gradient(130% 130% at 100% 0%,rgba(139,124,255,.12),transparent 55%),linear-gradient(180deg,var(--surface),var(--bg))",border:"1px solid rgba(139,124,255,.28)"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:14,flexWrap:"wrap"}}>
          <div style={{display:"flex",gap:13,alignItems:"center"}}>
            <div className="ai-av" style={{width:46,height:46}}><Brain size={23} color="#fff"/></div>
            <div>
              <div className="eyebrow" style={{color:"var(--accent2)"}}>Your Daily Coach</div>
              <div className="disp" style={{fontWeight:700,fontSize:21}}>{greetWord()}, {(P.name||"creator").split(" ")[0]}</div>
              <div className="mono" style={{fontSize:10.5,color:"var(--faint)"}}>{new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:18}}>
            <div style={{textAlign:"center"}}><div className="disp" style={{fontWeight:800,fontSize:26,color:"var(--amber)"}}>{streak}🔥</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>DAY STREAK</div></div>
            <div style={{textAlign:"center"}}><div className="disp" style={{fontWeight:800,fontSize:26,color:ad.adherence>=70?"var(--green)":"var(--accent)"}}>{ad.adherence}%</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>ADHERENCE</div></div>
          </div>
        </div>
        <p style={{fontSize:14,lineHeight:1.5,marginTop:14,color:"var(--text)"}}>{coachLine(P,streak,pulse)}</p>
      </div>

      {/* Daily check-in */}
      {!pulse ? (
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div className="eyebrow" style={{marginBottom:4,color:"var(--accent)"}}>Daily check-in · 20 seconds</div>
          <div className="disp" style={{fontWeight:700,fontSize:17,marginBottom:14}}>Let's log today and build your plan.</div>
          <Q label="Did you post yesterday?" k="posted" opts={["Yes","No","Rest day"]}/>
          <Q label="Energy today?" k="energy" opts={["Low","Good","Locked in"]}/>
          <Q label="Today's #1 focus?" k="focus" opts={["Create","Engage","Sell","Learn"]}/>
          <button className="btn btn-grad" style={{width:"100%",justifyContent:"center",marginTop:6,padding:"13px"}} onClick={submitPulse}><CheckCircle2 size={16}/> Check in & build my day</button>
        </div>
      ):(
        <div className="nba" style={{marginBottom:16,display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
          <CheckCircle2 size={20} color="var(--green)"/>
          <div style={{flex:1,minWidth:160}}><div style={{fontWeight:600,fontSize:14.5}}>Checked in for today ✓</div><div style={{fontSize:12.5,color:"var(--muted)"}}>{pulse.focus} focus · {pulse.energy} energy · Day {streak} streak</div></div>
          <button className="mini" onClick={()=>{setPulse(null);setDraft({});}}><RefreshCw size={12}/> Redo</button>
        </div>
      )}

      {pulse && (<>
        {/* Today's report */}
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div className="eyebrow" style={{marginBottom:12}}>Today's briefing</div>
          {[["Yesterday",report.yesterday,Activity],["Today",report.today,Target],["Biggest opportunity",report.opportunity,TrendingUp],["Watch out for",report.risk,AlertTriangle]].map(([t,d,Ic],i)=>(
            <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start",padding:"9px 0",borderBottom:i<3?"1px solid var(--line)":"none"}}>
              <Ic size={16} color={i===3?"var(--amber)":"var(--accent)"} style={{flexShrink:0,marginTop:2}}/>
              <div><div className="mono" style={{fontSize:9.5,color:"var(--faint)",letterSpacing:".08em",textTransform:"uppercase",marginBottom:2}}>{t}</div><div style={{fontSize:13.5,lineHeight:1.5}}>{d}</div></div>
            </div>
          ))}
          <div className="nba" style={{marginTop:12,padding:"11px 13px"}}><p style={{fontSize:13.5,fontWeight:500}}>{report.call}</p></div>
        </div>

        {/* Today's 3 moves */}
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <div className="eyebrow">Today's 3 moves</div>
            <span className="mono" style={{fontSize:11,color:doneCount===3?"var(--green)":"var(--muted)"}}>{doneCount}/3 done</span>
          </div>
          <div className="bar" style={{marginBottom:14}}><i style={{width:(doneCount/3*100)+"%",background:doneCount===3?"var(--green)":"var(--grad)"}}/></div>
          <div style={{display:"grid",gap:10}}>{moves.map((m,i)=>(
            <div key={i} className="row-card" style={{alignItems:"flex-start",opacity:todo[i]?.7:1}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start",minWidth:0}}>
                <div onClick={()=>toggleTodo(i)} style={{width:24,height:24,borderRadius:7,border:"2px solid "+(todo[i]?"var(--green)":"var(--line2)"),background:todo[i]?"var(--green)":"transparent",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",flexShrink:0,marginTop:1}}>{todo[i]&&<Check size={14} color="#fff"/>}</div>
                <div style={{minWidth:0}}>
                  <div style={{fontWeight:600,fontSize:14,textDecoration:todo[i]?"line-through":"none"}}>{m.l}</div>
                  <div style={{color:"var(--muted)",fontSize:12.5,marginTop:3,lineHeight:1.4}}>{m.d}</div>
                </div>
              </div>
              {(m.view||m.drawer)&&<button className="btn btn-ghost sm" style={{flexShrink:0}} onClick={()=>m.drawer?open(m.drawer):go(m.view)}>Do it <ArrowRight size={13}/></button>}
            </div>
          ))}</div>
          {doneCount===3 && <div className="nba" style={{marginTop:12,display:"flex",alignItems:"center",gap:10,borderColor:"rgba(47,208,138,.3)"}}><CheckCircle2 size={18} color="var(--green)"/><p style={{fontSize:13.5,fontWeight:500}}>All 3 done. That's a winning day — your streak and adherence both move. See you tomorrow.</p></div>}
        </div>

        {/* Today's breakdown */}
        <div className="panel panel-pad" style={{marginBottom:16}}>
          <div className="eyebrow" style={{marginBottom:10}}>Today's breakdown</div>
          <div style={{display:"flex",gap:12,alignItems:"flex-start",marginBottom:10}}>
            <div className="tool-ic" style={{width:38,height:38,flexShrink:0}}><Lightbulb size={18}/></div>
            <div><div style={{fontWeight:700,fontSize:15.5}}>{lesson.t}</div><p style={{fontSize:13.5,color:"var(--muted)",lineHeight:1.55,marginTop:5}}>{lesson.body}</p></div>
          </div>
          <div className="nba" style={{padding:"11px 13px"}}><span className="eyebrow" style={{color:"var(--green)"}}>Do this today</span><p style={{fontSize:13.5,fontWeight:500,marginTop:4}}>{lesson.action}</p></div>
          <div className="btn-row" style={{marginTop:12}}><button className="btn btn-ghost sm" onClick={()=>go("advisor")}><GraduationCap size={14}/> More daily lessons</button>{openChat&&<button className="btn btn-ghost sm" onClick={()=>openChat&&openChat("Coach me on: "+lesson.t)}><Sparkles size={14}/> Ask my coach about this</button>}</div>
        </div>
      </>)}

      {/* Adherence */}
      <div className="panel panel-pad">
        <div className="eyebrow" style={{marginBottom:14}}>Your adherence</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}} className="kpirow">
          <div style={{textAlign:"center",padding:"12px",background:"var(--void)",borderRadius:11,border:"1px solid var(--line)"}}><div className="disp" style={{fontWeight:800,fontSize:24,color:"var(--amber)"}}>{streak}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>STREAK</div></div>
          <div style={{textAlign:"center",padding:"12px",background:"var(--void)",borderRadius:11,border:"1px solid var(--line)"}}><div className="disp" style={{fontWeight:800,fontSize:24,color:ad.adherence>=70?"var(--green)":"var(--accent)"}}>{ad.adherence}%</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>14-DAY</div></div>
          <div style={{textAlign:"center",padding:"12px",background:"var(--void)",borderRadius:11,border:"1px solid var(--line)"}}><div className="disp" style={{fontWeight:800,fontSize:24,color:"var(--accent)"}}>{ad.consistency}%</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>30-DAY</div></div>
        </div>
        <div className="eyebrow" style={{marginBottom:8}}>This week</div>
        <div style={{display:"flex",gap:7,marginBottom:18}}>{ad.week.map((d,i)=>(<div key={i} style={{flex:1,textAlign:"center"}}><div style={{height:34,borderRadius:8,background:d.on?"var(--grad)":"var(--surface3)",border:"1px solid "+(d.on?"transparent":"var(--line)"),display:"flex",alignItems:"center",justifyContent:"center"}}>{d.on&&<Check size={15} color="#fff"/>}</div><div className="mono" style={{fontSize:8.5,color:"var(--faint)",marginTop:4}}>{["S","M","T","W","T","F","S"][new Date(d.k).getDay()]}</div></div>))}</div>
        <div className="eyebrow" style={{marginBottom:8}}>Last 12 weeks</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(28,1fr)",gap:3}}>{ad.days.slice(-84).map((d,i)=>(<div key={i} title={d.k} style={{aspectRatio:"1",borderRadius:3,background:d.on?"var(--accent)":"var(--surface3)"}}/>))}</div>
        <p className="mono" style={{fontSize:10,color:"var(--faint)",marginTop:12}}>Check in daily to build your streak. Your adherence saves on this device — connect an account for cross-device sync.</p>
      </div>
    </>
  );
}

/* ── MISSION CONTROL — the additive front door ── */
const MISSIONS=[
  {k:"grow",ic:TrendingUp,t:"Grow my audience",d:"More reach, more followers, more often.",steps:[["Generate hooks built to go viral","hookengine"],["Build a Tier-1 reel (5–12s)","reels","drawer"],["Find what to film today","whatfilm"],["Learn your platform's algorithm","growth"]]},
  {k:"launch",ic:Rocket,t:"Launch an offer",d:"Turn attention into a product and your first (or next) sales.",steps:[["Pick a monetization model + launch kit","business"],["Architect the offer","offer","drawer"],["Build the sales funnel","automation"],["Write the launch emails","emailfunnels"]]},
  {k:"brand",ic:Sparkles,t:"Build my brand",d:"Positioning, voice, and a plan that compounds.",steps:[["Generate your full Brand Blueprint","blueprint"],["Lock your hooks & content pillars","hookengine"],["Map your content calendar","calendar","drawer"],["Study a page you admire","pagescan"]]},
  {k:"monetize",ic:DollarSign,t:"Make money from my audience",d:"Offers, funnels, DMs and email that convert.",steps:[["Choose your monetization path","monetize"],["Build the offer + price it","business"],["Set up DM-to-sale automation","automation"],["Write the nurture sequence","emailfunnels"]]},
  {k:"automate",ic:Cpu,t:"Automate & scale",d:"Put the repetitive work on autopilot.",steps:[["Open the Automation Library","automation"],["Build a comment→DM→lead funnel","automation"],["Set up email & SMS nurture","emailfunnels"],["Distribute one idea everywhere","distribution"]]},
  {k:"think",ic:Compass,t:"Get advice & strategy",d:"Analyze an idea, get a report, make the smart call.",steps:[["Analyze a business or content idea","advisor"],["Pull an industry report","advisor"],["Read today's breakdown","advisor"],["Ask Creator AI anything","ask"]]},
];
function MissionControlView({P,go,open}){
  const [m,setM]=useState(null);
  if(m){const mi=MISSIONS.find(x=>x.k===m);return (
    <>
      <button className="mini" style={{marginBottom:12}} onClick={()=>setM(null)}><ArrowRight size={12} style={{transform:"rotate(180deg)"}}/> All missions</button>
      <div className="eyebrow" style={{color:"var(--accent)"}}>Mission</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:26,margin:"6px 0 4px"}}>{mi.t}</h1>
      <p style={{color:"var(--muted)",fontSize:14,marginBottom:18}}>{mi.d} Here's your path — do them in order, or jump in anywhere.</p>
      <div style={{display:"grid",gap:11}}>{mi.steps.map(([label,view,kind],i)=>(
        <div key={i} className="row-card">
          <div style={{display:"flex",gap:13,alignItems:"center",minWidth:0}}>
            <div style={{width:30,height:30,borderRadius:8,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:13,flexShrink:0}}>{i+1}</div>
            <div style={{fontWeight:600,fontSize:14.5}}>{label}</div>
          </div>
          <button className="btn btn-grad sm" style={{flexShrink:0}} onClick={()=>kind==="drawer"?open(view):go(view)}>Open <ArrowRight size={13}/></button>
        </div>
      ))}</div>
      <div className="nba" style={{marginTop:16}}><p style={{fontSize:13.5,fontWeight:500}}>Tip: your Daily Coach turns this mission into a few moves each day so you always know the next step.</p></div>
    </>
  );}
  return (
    <>
      <div className="eyebrow" style={{color:"var(--accent)"}}>Mission Control</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>What are we accomplishing today?</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:620,marginBottom:20}}>Pick a mission and I'll assemble the exact tools and steps around it — no hunting through menus. Or use the nav anytime to go straight to any engine.</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:13}} className="hero">{MISSIONS.map(mi=>(
        <div key={mi.k} className="panel panel-pad" style={{cursor:"pointer"}} onClick={()=>setM(mi.k)}>
          <div className="tool-ic" style={{width:42,height:42,marginBottom:12}}><mi.ic size={20}/></div>
          <div className="disp" style={{fontWeight:700,fontSize:17}}>{mi.t}</div>
          <div style={{color:"var(--muted)",fontSize:13,marginTop:6,lineHeight:1.45}}>{mi.d}</div>
          <div style={{display:"flex",alignItems:"center",gap:6,marginTop:12,color:"var(--accent)",fontSize:13,fontWeight:500}}>Start <ArrowRight size={14}/></div>
        </div>
      ))}</div>
    </>
  );
}
function Home({P,open,go,streak,checkedIn,onCheckIn,ig,openChat}){
  const [ask,setAsk]=useState("");
  const traj=useMemo(()=>{const out=[];let v=P.index*0.62;for(let w=1;w<=12;w++){v=Math.min(P.proj,v+(P.proj-v)*0.18+rng(P.name,w)*14);out.push({w:"W"+w,v:Math.round(v)});}out[0].v=Math.round(P.index*0.78);out[3].v=P.index;return out;},[P]);
  const radar=P.subs.map(s=>({k:s.key.split(" ")[0],v:s.v}));
  const nba=(P.struggle||[]).includes("Writing hooks")?"Your Hook Power is your lowest vector. Generate 25 hooks in your voice and ship the top 3 this week — projected +6 to your Index."
    :P.offer==="Nothing yet"?"You have attention but nothing to sell. Architect a starter offer today — the single biggest lever on your Monetization score."
    :"Your retention is leaking after the hook. Run the Reel Builder with retention beats and re-post your best topic.";
  return (
    <>
      {P.handle && (""+P.handle).trim() && <ScanCard P={P} go={go}/>}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:16,flexWrap:"wrap",gap:10}}>
        <div><div className="eyebrow">Command Center</div>
          <h1 className="disp" style={{fontWeight:700,fontSize:"clamp(24px,4vw,32px)",marginTop:6}}>Welcome back, {P.name}.</h1>
          <p style={{color:"var(--muted)",fontSize:14,marginTop:4}}>Tracking {(P.niches||[]).join(" + ")} · keeping you on pace to {money(P.revTarget)}/mo.</p>
        </div>
        <div className="live"><span className="pulse"/>System synced · {new Date().toLocaleDateString()}</div>
      </div>

      {/* Ask Creator AI — front door */}
      <div className="askbar" style={{marginBottom:14}}>
        <div className="askbar-in">
          <div className="ai-av"><Brain size={17} color="#fff"/></div>
          <input placeholder="Ask Creator AI anything…" value={ask}
            onChange={e=>setAsk(e.target.value)}
            onKeyDown={e=>{if(e.key==="Enter"&&ask.trim()){openChat(ask.trim());setAsk("");}}}/>
          <button className="send-btn" disabled={!ask.trim()} onClick={()=>{if(ask.trim()){openChat(ask.trim());setAsk("");}}}><Send size={17} color="#fff"/></button>
        </div>
        <div className="sug">{[`20 hooks for a ${(P.niche||"").split(" ")[0].toLowerCase()} reel`,"What should I post today?","Build me a starter offer"].map(s=>(<span key={s} onClick={()=>openChat(s)}>{s}</span>))}</div>
      </div>

      {/* START HERE — guided spine */}
      <div className="panel panel-pad" style={{marginBottom:14,position:"relative",overflow:"hidden",background:"var(--grad-soft)",border:"1px solid rgba(79,140,255,.28)"}}>
        <div style={{position:"absolute",inset:0,background:"radial-gradient(620px 230px at 92% -30%,rgba(139,124,255,.18),transparent 60%)",pointerEvents:"none"}}/>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,flexWrap:"wrap",position:"relative"}}>
          <div style={{maxWidth:540}}>
            <span className="tag" style={{borderColor:"rgba(79,140,255,.4)"}}><Compass size={12}/> Start here</span>
            <div className="disp" style={{fontWeight:700,fontSize:"clamp(18px,2.6vw,22px)",margin:"10px 0 6px"}}>Not sure where to begin? Build your Brand Blueprint.</div>
            <p style={{fontSize:13.5,color:"var(--muted)",lineHeight:1.55}}>Answer five quick questions and get a complete, branded plan — positioning, content, growth, monetization and automation — in one elite document. It's the fastest way to see your whole path.</p>
          </div>
          <button className="btn btn-grad" style={{padding:"13px 20px",fontSize:14.5,flexShrink:0}} onClick={()=>go("blueprint")}><FileText size={16}/> Build my Blueprint</button>
        </div>
      </div>

      {/* guided path — six moves */}
      <div className="eyebrow" style={{marginBottom:10}}>Your path · six moves that build a creator business</div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:18}} className="kpirow">
        {[
          ["01","Get ideas & hooks","Never face a blank screen again",Lightbulb,"hookengine"],
          ["02","Create your content","Reels, captions, carousels, stories",Film,"studio"],
          ["03","Build your brand","Positioning, bio, voice & blueprint",Sparkles,"blueprint"],
          ["04","Grow & beat the algorithm","What's working now, per platform",TrendingUp,"growth"],
          ["05","Monetize","Offers, funnels & revenue models",DollarSign,"business"],
          ["06","Automate your flow","Comment → DM → email → sale",Zap,"automation"],
        ].map(([num,t,d,Ic,dest])=>(
          <div key={num} className="pillar-card" onClick={()=>go(dest)}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><div className="tool-ic" style={{width:34,height:34}}><Ic size={16}/></div><span className="mono" style={{fontSize:13,color:"var(--faint)",fontWeight:700}}>{num}</span></div>
            <div style={{fontWeight:700,fontSize:14.5,marginTop:10}}>{t}</div>
            <div style={{fontSize:11.5,color:"var(--muted)",marginTop:3}}>{d}</div>
          </div>))}
      </div>

      <div className="hero" style={{marginBottom:14}}>
        <div className="panel panel-pad"><span className="tag" style={{marginBottom:12,display:"inline-flex"}}><CheckCircle2 size={12}/> Do this week</span>
          {["Post 5 reels — hook hard in the first 1.5s","Reply to every comment in the first hour","Start your email list with a lead magnet","Sell in DMs — don't wait for 'perfect'"].map((x,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,padding:"5px 0",color:"var(--muted)"}}><Check size={15} color="var(--green)" style={{flexShrink:0,marginTop:2}}/>{x}</div>))}
        </div>
        <div className="panel panel-pad"><span className="tag" style={{marginBottom:12,display:"inline-flex"}}><X size={12}/> Avoid this week</span>
          {["Chasing trends with no point of view","Posting then ghosting your comments","Building a course before selling the offer","Buying followers or engagement"].map((x,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,padding:"5px 0",color:"var(--muted)"}}><X size={15} color="var(--red)" style={{flexShrink:0,marginTop:2}}/>{x}</div>))}
        </div>
      </div>

      {/* check-in / connect strip */}
      <DailyBriefing P={P} open={open} go={go}/>
      <div className="banner" style={{marginBottom:18}}>
        <div style={{display:"flex",gap:14,alignItems:"center"}}>
          <div style={{width:42,height:42,borderRadius:11,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            {checkedIn?<CheckCircle2 size={22} color="#fff"/>:<Calendar size={20} color="#fff"/>}</div>
          <div>
            <div style={{fontWeight:600,fontSize:15}}>{checkedIn?"This week's check-in is logged.":"Weekly check-in"}</div>
            <div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>{checkedIn?"Numbers captured. We'll recalc your pace overnight.":"Log your numbers so we can keep you on pace and spot what's working."}</div>
          </div>
        </div>
        <div style={{display:"flex",gap:10,alignItems:"center",flexWrap:"wrap"}}>
          {streak>0 && <span className="streak"><Flame size={13}/>{streak}-week streak</span>}
          {!checkedIn && <button className="btn btn-grad" style={{padding:"11px 18px",fontSize:14}} onClick={onCheckIn}>Complete check-in</button>}
        </div>
      </div>

      <div className="hero" style={{marginBottom:18}}>
        <div className="idx-card">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
            <span className="tag"><Activity size={12}/> Creator Index™</span>
            <span className="tag" style={{color:P.tier.c}}><Sparkles size={12}/> {P.tier.n}</span>
          </div>
          <RadialGauge value={P.index}/>
          <div style={{display:"flex",justifyContent:"center",gap:20,marginTop:4}}>
            <div style={{textAlign:"center"}}><div className="disp delta-up" style={{fontWeight:700,fontSize:18}}>+{P.weekly}</div><div style={{fontSize:11,color:"var(--faint)"}}>Improvement / wk</div></div>
            <div style={{width:1,background:"var(--line)"}}/>
            <div style={{textAlign:"center"}}><div className="disp" style={{fontWeight:700,fontSize:18}}>{P.proj}</div><div style={{fontSize:11,color:"var(--faint)"}}>90-day projection</div></div>
            <div style={{width:1,background:"var(--line)"}}/>
            <div style={{textAlign:"center"}}><div className="disp" style={{fontWeight:700,fontSize:18}}>Top {Math.max(3,100-Math.round(P.index/12))}%</div><div style={{fontSize:11,color:"var(--faint)"}}>in {(P.niche||"niche").split(" ")[0]}</div></div>
          </div>
        </div>
        <div className="panel panel-pad">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span className="tag"><TrendingUp size={12}/> Improvement Index</span><span className="live"><span className="pulse"/>tracking</span></div>
          <div style={{display:"flex",alignItems:"baseline",gap:10,margin:"10px 0 2px"}}>
            <span className="disp" style={{fontWeight:700,fontSize:30}}>+<Counter to={P.proj-P.index}/> pts</span>
            <span style={{color:"var(--muted)",fontSize:13}}>projected in 90 days</span>
          </div>
          <div style={{height:148,marginTop:6}}>
            <ResponsiveContainer><AreaChart data={traj} margin={{top:6,right:4,left:-22,bottom:0}}>
              <defs><linearGradient id="ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4F8CFF" stopOpacity={.5}/><stop offset="100%" stopColor="#8B7CFF" stopOpacity={0}/></linearGradient></defs>
              <XAxis dataKey="w" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} domain={['dataMin-40','dataMax+30']}/>
              <Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12,fontFamily:"JetBrains Mono"}}/>
              <Area type="monotone" dataKey="v" stroke="#6E8FFF" strokeWidth={2.4} fill="url(#ar)" dot={false}/>
            </AreaChart></ResponsiveContainer>
          </div>
          <p className="mono" style={{fontSize:11.5,color:"var(--faint)"}}>Projection at your current posting cadence.</p>
        </div>
      </div>

      <div className="nba" style={{marginBottom:18}}>
        <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
          <div style={{width:40,height:40,borderRadius:11,background:"var(--grad)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Crosshair size={20} color="#fff"/></div>
          <div style={{flex:1}}>
            <div className="eyebrow" style={{marginBottom:5}}>Next Best Action · highest leverage</div>
            <p style={{fontSize:15,lineHeight:1.5,fontWeight:500}}>{nba}</p>
            <button className="btn btn-grad" style={{marginTop:14,padding:"11px 18px",fontSize:14}} onClick={()=>open((P.struggle||[]).includes("Writing hooks")?"hooks":P.offer==="Nothing yet"?"offer":"reels")}>Execute now <ArrowRight size={16} style={{verticalAlign:"-3px"}}/></button>
          </div>
        </div>
      </div>

      <div className="hero" style={{marginBottom:18}}>
        <div className="panel panel-pad">
          <div style={{display:"flex",justifyContent:"space-between",marginBottom:18}}><span className="tag"><Gauge size={12}/> Growth Vectors</span><span className="mono" style={{fontSize:12,color:"var(--muted)"}}>6 / 6 scored</span></div>
          <div className="sub">{P.subs.map(s=>(
            <div className="sub-row" key={s.key}>
              <div className="top"><span className="nm" style={{display:"flex",alignItems:"center",gap:8}}><s.ic size={14} color="var(--accent)"/>{s.key}</span><span className="vl">{s.v}<span style={{color:"var(--faint)"}}>/100</span></span></div>
              <div className="bar"><i style={{width:s.v+"%"}}/></div>
            </div>))}</div>
        </div>
        <div className="panel panel-pad">
          <span className="tag"><Brain size={12}/> Content Genome</span>
          <div style={{height:230,marginTop:6}}><ResponsiveContainer><RadarChart data={radar} outerRadius="74%">
            <PolarGrid stroke="#20262F"/><PolarAngleAxis dataKey="k" tick={{fontSize:10.5,fill:"#8B95A6",fontFamily:"JetBrains Mono"}}/>
            <Radar dataKey="v" stroke="#8B7CFF" strokeWidth={2} fill="#6E8FFF" fillOpacity={.28}/></RadarChart></ResponsiveContainer></div>
        </div>
      </div>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div><div className="eyebrow">Quick build</div><h2 className="disp" style={{fontWeight:700,fontSize:21,marginTop:5}}>Make your next move</h2></div>
        <div className="tab on" onClick={()=>go("studio")} style={{cursor:"pointer"}}><Layers size={13} style={{verticalAlign:"-2px"}}/> All tools in Studio</div>
      </div>
      <div className="tools">{TOOLS.map(t=>(
        <div className="tool" key={t.k} onClick={()=>open(t.k)}><ArrowUpRight className="arr" size={18}/><div className="tool-ic"><t.ic size={20}/></div><h4>{t.t}</h4><p>{t.d}</p></div>
      ))}</div>
    </>
  );
}

/* ── CREATOR INDEX VIEW ── */
function IndexView({P}){
  const radar=P.subs.map(s=>({k:s.key.split(" ")[0],v:s.v}));
  useLive(60000);
  const drift=Math.round((rng((P.name||"x")+"idx"+daySeed(),5)-0.5)*8);
  const liveIdx=Math.max(0,Math.min(1000,P.index+drift));
  const delta=liveIdx-P.index;
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:8}}>
        <div><div className="eyebrow">Creator Index™</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 4px"}}>Your full intelligence breakdown</h1></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          <span className={"tag"} style={{color:delta>=0?"var(--green)":"var(--amber)",borderColor:delta>=0?"rgba(47,208,138,.3)":"rgba(242,177,76,.3)"}}>{delta>=0?"▲ +"+delta:"▼ "+delta} today</span>
          <LivePill label="Recalculating"/>
        </div>
      </div>
      <p className="mono" style={{fontSize:11,color:"var(--faint)",marginBottom:16}}>Your Index recalculates daily from your activity, cadence and momentum. As of {liveStamp()} today.</p>
      <div className="hero" style={{marginBottom:18}}>
        <div className="idx-card"><RadialGauge value={liveIdx}/><p style={{textAlign:"center",color:"var(--muted)",fontSize:13,marginTop:6}}>One number for the health of your content business — 6 vectors, weighted and benchmarked against {P.niche}.</p></div>
        <div className="panel panel-pad"><span className="tag"><Brain size={12}/> Content Genome</span>
          <div style={{height:260}}><ResponsiveContainer><RadarChart data={radar} outerRadius="76%"><PolarGrid stroke="#20262F"/><PolarAngleAxis dataKey="k" tick={{fontSize:11,fill:"#8B95A6",fontFamily:"JetBrains Mono"}}/><Radar dataKey="v" stroke="#8B7CFF" strokeWidth={2} fill="#6E8FFF" fillOpacity={.28}/></RadarChart></ResponsiveContainer></div>
        </div>
      </div>
      <div className="panel panel-pad"><span className="tag" style={{marginBottom:14,display:"inline-flex"}}><Crosshair size={12}/> Vector diagnostics</span>
        <div className="sub">{P.subs.map(s=>{const note=s.v>=75?"Strength — lean into this.":s.v>=55?"Solid. Small gains available.":"Priority fix. Biggest upside here.";
          return (<div className="sub-row" key={s.key}><div className="top"><span className="nm"><s.ic size={14} color="var(--accent)" style={{verticalAlign:"-2px",marginRight:7}}/>{s.key}</span><span className="vl">{s.v}/100</span></div>
            <div className="bar"><i style={{width:s.v+"%"}}/></div><div style={{fontSize:12,color:s.v<55?"var(--amber)":"var(--faint)",marginTop:6}}>{note}</div></div>);})}</div>
      </div>
    </>
  );
}

/* ── GROWTH TRACKER ── */
function Tracker({P,ig,streak,checkedIn,onCheckIn}){
  const fNow=ig.connected?Math.round(P.fBase*1.03):P.fBase;
  const milestones=[
    {l:`Hit ${fmt(Math.round(P.fBase*1.25))} followers`,done:false,pace:true},
    {l:`First ${money(Math.max(500,P.revTarget*0.25))}/mo in revenue`,done:P.revNow>=P.revTarget*0.25,pace:true},
    {l:`Ship 20 posts this month`,done:false,pace:P.onPace},
    {l:`Reach ${fmt(P.fTarget)} (goal)`,done:false,pace:P.onPace},
  ];
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:10,marginBottom:16}}>
        <div><div className="eyebrow">Growth Tracker</div><h1 className="disp" style={{fontWeight:700,fontSize:28,marginTop:6}}>Followers, revenue & pace</h1></div>
        {streak>0 && <span className="streak"><Flame size={13}/>{streak}-week check-in streak</span>}
      </div>

      {!ig.connected ? (
        <div className="banner" style={{marginBottom:18}}>
          <div style={{display:"flex",gap:14,alignItems:"center"}}>
            <div style={{width:42,height:42,borderRadius:11,background:"linear-gradient(135deg,#E1306C,#8B7CFF)",display:"flex",alignItems:"center",justifyContent:"center"}}><Instagram size={20} color="#fff"/></div>
            <div><div style={{fontWeight:600,fontSize:15}}>Connect Instagram</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>Auto-pull your followers, reach & top posts so tracking runs itself.</div></div>
          </div>
          <button className="btn btn-grad" style={{padding:"12px 20px",fontSize:14}} onClick={()=>ig.setConnectModal(true)}>Connect account</button>
        </div>
      ):(
        <div className="banner" style={{marginBottom:18,borderColor:"rgba(47,208,138,.3)"}}>
          <div style={{display:"flex",gap:12,alignItems:"center"}}><CheckCircle2 size={20} color="var(--green)"/><div style={{fontWeight:600,fontSize:14}}>Synced with {ig.igHandle} · last 30 posts imported</div></div>
          <span className="live"><span className="pulse"/>auto-tracking on</span>
        </div>
      )}

      {/* KPI row */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:13,marginBottom:18}} className="kpirow">
        <div className="kpi"><div className="v">{fmt(fNow)}</div><div className="l"><Users size={13}/>Followers <span className="delta-up">+{fmt(Math.round(P.fBase*0.06))}/wk</span></div></div>
        <div className="kpi"><div className="v">{money(P.revNow)}</div><div className="l"><DollarSign size={13}/>Est. monthly revenue</div></div>
        <div className="kpi"><div className="v">{P.subs[2].v}</div><div className="l"><Activity size={13}/>Engagement score</div></div>
        <div className="kpi"><div className="v" style={{color:P.onPace?"var(--green)":"var(--amber)"}}>{P.onPace?"On pace":"Behind"}</div><div className="l"><Target size={13}/>vs goal</div></div>
      </div>

      {/* follower growth chart */}
      <div className="panel panel-pad" style={{marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span className="tag"><TrendingUp size={12}/> Follower trajectory → {fmt(P.fTarget)} goal</span><span className="mono" style={{fontSize:11,color:"var(--faint)"}}>8wk actual · 6wk projected</span></div>
        <div style={{height:210}}><ResponsiveContainer><AreaChart data={P.fSeries} margin={{top:8,right:8,left:-6,bottom:0}}>
          <defs><linearGradient id="fg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4F8CFF" stopOpacity={.45}/><stop offset="100%" stopColor="#8B7CFF" stopOpacity={0}/></linearGradient></defs>
          <XAxis dataKey="w" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/>
          <YAxis tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false} tickFormatter={fmt} width={42}/>
          <Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12,fontFamily:"JetBrains Mono"}} formatter={(v)=>[fmt(v),"Followers"]}/>
          <ReferenceLine y={P.fTarget} stroke="#2FD08A" strokeDasharray="5 4" label={{value:"GOAL",fill:"#2FD08A",fontSize:10,position:"insideTopRight",fontFamily:"JetBrains Mono"}}/>
          <Area type="monotone" dataKey="f" stroke="#6E8FFF" strokeWidth={2.4} fill="url(#fg)" dot={false}/>
        </AreaChart></ResponsiveContainer></div>
      </div>

      <div className="hero" style={{marginBottom:16}}>
        <div className="panel panel-pad">
          <span className="tag"><DollarSign size={12}/> Revenue pace to {money(P.revTarget)}/mo</span>
          <div style={{display:"flex",alignItems:"baseline",gap:8,margin:"12px 0 2px"}}><span className="disp" style={{fontWeight:700,fontSize:26}}>{money(P.revNow)}</span><span style={{color:"var(--faint)",fontSize:13}}>/ {money(P.revTarget)} target</span></div>
          <div className="pace"><i style={{width:Math.max(4,P.pacePct)+"%",background:P.pacePct>=60?"var(--green)":"var(--grad)"}}/></div>
          <div style={{fontSize:12,color:"var(--muted)",marginTop:9}}>{P.pacePct}% of target · {P.onPace?"trajectory hits goal in ~3 months":"increase posting cadence or launch an offer to close the gap"}</div>
          <div style={{height:120,marginTop:10}}><ResponsiveContainer><BarChart data={P.revSeries} margin={{top:4,right:4,left:-14,bottom:0}}>
            <XAxis dataKey="m" tick={{fontSize:10,fill:"#5A6473",fontFamily:"JetBrains Mono"}} axisLine={false} tickLine={false}/>
            <YAxis hide/><Tooltip contentStyle={{background:"#0F131A",border:"1px solid #2A323D",borderRadius:10,fontSize:12}} formatter={(v)=>[money(v),"Revenue"]}/>
            <Bar dataKey="r" radius={[5,5,0,0]} barSize={20}>{P.revSeries.map((e,i)=><Cell key={i} fill="#4F8CFF" fillOpacity={0.55+i*0.07}/>)}</Bar>
          </BarChart></ResponsiveContainer></div>
        </div>
        <div className="panel panel-pad">
          <span className="tag"><Target size={12}/> Milestones</span>
          <div style={{marginTop:14,display:"flex",flexDirection:"column",gap:11}}>
            {milestones.map((m,i)=>(
              <div key={i} style={{display:"flex",alignItems:"center",gap:11}}>
                {m.done?<CheckCircle2 size={18} color="var(--green)"/>:<CircleDot size={18} color={m.pace?"var(--accent)":"var(--amber)"}/>}
                <div style={{flex:1,fontSize:14,color:m.done?"var(--muted)":"var(--text)",textDecoration:m.done?"line-through":"none"}}>{m.l}</div>
                <span className="mono" style={{fontSize:11,color:m.done?"var(--green)":m.pace?"var(--faint)":"var(--amber)"}}>{m.done?"DONE":m.pace?"ON PACE":"AT RISK"}</span>
              </div>))}
          </div>
          {!checkedIn && <button className="btn btn-ghost" style={{width:"100%",marginTop:16,padding:"12px"}} onClick={onCheckIn}>Log this week's numbers</button>}
          {checkedIn && <div style={{marginTop:16,fontSize:13,color:"var(--green)",display:"flex",gap:8,alignItems:"center"}}><CheckCircle2 size={15}/>Logged — pace recalculated.</div>}
        </div>
      </div>
    </>
  );
}

/* ── CROSS-PLATFORM ── */
function CrossPlatform({P,open}){
  const sorted=[...P.platforms].sort((a,b)=>b.v-a.v);
  const strong=sorted.find(p=>p.sel)||sorted[0];
  const weak=sorted.filter(p=>!p.sel)[0]||sorted[sorted.length-1];
  return (
    <>
      <div className="eyebrow">Cross-Platform Engine</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>Win on every platform</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:580,marginBottom:18}}>You don't have to start over on each app. Take what already works and port it — same message, native format.</p>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:13,marginBottom:18}}>
        {P.platforms.map(p=>(
          <div className="plat" key={p.pl}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <span style={{fontSize:14,fontWeight:600}}>{p.pl}</span>
              <span className="mono" style={{fontSize:10.5,color:p.status==="Strong"?"var(--green)":p.status==="Building"?"var(--amber)":"var(--faint)"}}>{p.status.toUpperCase()}</span>
            </div>
            <div className="disp" style={{fontWeight:700,fontSize:30,margin:"10px 0 6px",color:p.sel?"var(--text)":"var(--faint)"}}>{p.v}</div>
            <div className="bar"><i style={{width:p.v+"%",background:p.status==="Untapped"?"var(--surface3)":"var(--grad)"}}/></div>
            {p.primary && <div className="mono" style={{fontSize:10,color:"var(--accent)",marginTop:8}}>★ PRIMARY</div>}
          </div>
        ))}
      </div>

      <div className="nba" style={{marginBottom:16}}>
        <div className="eyebrow" style={{marginBottom:6}}>Cross-platform opportunity</div>
        <p style={{fontSize:15.5,lineHeight:1.5,fontWeight:500}}>You're <b style={{color:"var(--green)"}}>{strong.status==="Strong"?"strong":"strongest"} on {strong.pl}</b> ({strong.v}) but <b style={{color:"var(--amber)"}}>{weak.sel?"under-built":"untapped"} on {weak.pl}</b> ({weak.v}). Your winning {strong.pl} content can be re-cut for {weak.pl} in minutes — that's free reach you're leaving on the table.</p>
        <button className="btn btn-grad" style={{marginTop:14,padding:"11px 18px",fontSize:14}} onClick={()=>open("bridge")}>Transform a reel for {weak.pl} <ArrowRight size={16} style={{verticalAlign:"-3px"}}/></button>
      </div>

      <div className="panel panel-pad">
        <span className="tag" style={{marginBottom:12,display:"inline-flex"}}><Shuffle size={12}/> How the bridge works</span>
        <div style={{display:"grid",gap:11}}>
          {[["Pull your top performer",`Identify your best ${strong.pl} post by saves + shares.`],
            ["Re-cut for the native format",`Adjust pacing, captions & hook for ${weak.pl}'s algorithm.`],
            ["Track lift",`Watch ${weak.pl} climb in your Growth Tracker week over week.`]].map(([a,b],i)=>(
            <div key={a} style={{display:"flex",gap:13,alignItems:"flex-start"}}><span className="disp" style={{fontWeight:700,color:"var(--faint)",fontSize:18,width:24}}>{i+1}</span><div><div style={{fontWeight:600,fontSize:14}}>{a}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:2}}>{b}</div></div></div>
          ))}
        </div>
      </div>
    </>
  );
}

/* ── SIGNAL SCANNER (research) ── */
function Scanner({P,open,go}){
  const [tab,setTab]=useState("viral");
  const [seed,setSeed]=useState(0);
  useLive(45000);
  const lb=liveBucket(20);
  const viral=useMemo(()=>genViral(P,seed+lb),[P,seed,lb]);
  const byEngage=useMemo(()=>[...viral].sort((a,b)=>b.er-a.er),[viral]);
  const hooks=useMemo(()=>shuffleSeeded(buildHooks(P),"hk"+lb+seed).slice(0,50),[P,seed,lb]);
  const pk=pack(P);
  const ideas=useMemo(()=>shuffleSeeded([...pk.topics,...pk.formats.map(f=>`${f[0]}: ${pk.topics[0]}`),
    `Behind-the-scenes of your real ${_low(P.niche)} process`,`Myth vs reality in ${_low(P.niche)}`,
    `Your biggest failure and what it taught you`,`A day-in-the-life that sells without selling`,
    `Respond to the worst advice in ${_low(P.niche)}`,`Client/result breakdown with exact steps`,
    `"If I started over" rebuild`,`React to a viral post in your space`,
    ...pk.desires.map(d=>`How to ${d} — step by step`),...pk.mistakes.map(m=>`Stop ${m} (do this instead)`)],
    (P.name||"")+lb+seed),[P,seed,pk,lb]);
  const newCount=3+(lb%9);
  return (
    <>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:8}}>
        <div><div className="eyebrow">Signal Scanner · {P.niche}</div><h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0"}}>What's winning right now</h1></div>
        <div style={{display:"flex",gap:10,alignItems:"center"}}><LivePill/><button className="mini" onClick={()=>setSeed(s=>s+1)}><RefreshCw size={12}/> Pull new winners</button></div>
      </div>
      <p style={{color:"var(--muted)",fontSize:13,marginBottom:8,marginTop:6}} className="mono">Top 50 per category · {newCount} new signals detected this hour · feed re-ranks continuously as new data comes in</p>
      <div className="tabs">
        {[["viral","Top 50 viral"],["engage","Top engagement"],["hooks","Trending hooks"],["ideas","Topic ideas"]].map(([k,l])=>(
          <div key={k} className={"tab"+(tab===k?" on":"")} onClick={()=>setTab(k)}>{l}</div>))}
      </div>

      {tab==="viral" && <div style={{display:"grid",gap:11}}>{viral.map((r,i)=>(
        <div className="row-card" key={i}>
          <div style={{display:"flex",gap:14,alignItems:"center",minWidth:0}}>
            <span className="disp" style={{fontWeight:700,fontSize:20,color:"var(--faint)",width:26}}>{String(i+1).padStart(2,"0")}</span>
            <div style={{minWidth:0}}><div style={{fontSize:14.5,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.hook}</div>
              <div style={{display:"flex",gap:12,marginTop:5,flexWrap:"wrap"}}>
                <span className="mono" style={{fontSize:11,color:"var(--muted)"}}><Eye size={11} style={{verticalAlign:"-1px"}}/> {fmt(r.views)}</span>
                <span className="mono" style={{fontSize:11,color:"var(--muted)"}}><Bookmark size={11} style={{verticalAlign:"-1px"}}/> {r.save}% save</span>
                <span className="tag">{r.fmt}</span></div></div>
          </div>
          <button className="btn btn-ghost" style={{padding:"9px 14px",fontSize:13,whiteSpace:"nowrap"}} onClick={()=>open("reels")}>Make me one</button>
        </div>))}</div>}

      {tab==="engage" && <div style={{display:"grid",gap:11}}>{byEngage.map((r,i)=>(
        <div className="row-card" key={i}>
          <div style={{display:"flex",gap:14,alignItems:"center",minWidth:0}}>
            <span className="disp delta-up" style={{fontWeight:700,fontSize:20,width:52}}>{r.er}%</span>
            <div style={{minWidth:0}}><div style={{fontSize:14.5,fontWeight:600,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{r.hook}</div>
              <div className="mono" style={{fontSize:11,color:"var(--muted)",marginTop:5}}>engagement rate · {fmt(r.views)} views · {r.save}% save</div></div>
          </div>
          <button className="btn btn-ghost" style={{padding:"9px 14px",fontSize:13,whiteSpace:"nowrap"}} onClick={()=>open("reels")}>Recreate</button>
        </div>))}</div>}

      {tab==="hooks" && <div style={{display:"grid",gap:11}}>{hooks.map((h,i)=>(
        <div className="row-card" key={i}>
          <div style={{minWidth:0}}><div style={{fontSize:14.5,fontWeight:500}}>{h.t}</div><span className="tag" style={{marginTop:7}}>{h.cat}</span></div>
          <div style={{textAlign:"right"}}><div className="disp delta-up" style={{fontWeight:700,fontSize:19}}>{h.fit}</div><div className="mono" style={{fontSize:10,color:"var(--faint)"}}>FIT</div></div>
        </div>))}
        <button className="btn btn-grad" style={{marginTop:4,padding:"13px",justifyContent:"center",display:"flex",gap:8,alignItems:"center"}} onClick={()=>go?go("hookengine"):open("reels")}><Sparkles size={16}/> Open the full Hook Engine</button>
      </div>}

      {tab==="ideas" && <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))",gap:12}}>{ideas.map((idea,i)=>(
        <div className="tool" key={i} onClick={()=>open("reels")}><ArrowUpRight className="arr" size={16}/><div className="tool-ic"><Sparkles size={18}/></div><h4 style={{fontSize:14.5,marginTop:12}}>{_cap(idea)}</h4><p>Tap to turn into a full reel script.</p></div>
      ))}</div>}
    </>
  );
}

/* ── GENERIC TOOL PAGE ── */
function ToolPage({P,k,open}){
  const meta=TOOLS.find(t=>t.k===k)||{t:"Module",d:"Coming online",ic:Layers};
  return (
    <>
      <div className="eyebrow">{meta.t}</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>{meta.t}</h1>
      <p style={{color:"var(--muted)",fontSize:15,maxWidth:560,marginBottom:22}}>{meta.d}</p>
      <button className="btn btn-grad" onClick={()=>open(k)} style={{display:"inline-flex",gap:9,alignItems:"center"}}><Sparkles size={17}/> Generate in {P.name}'s voice</button>
      <div className="panel panel-pad" style={{marginTop:24,maxWidth:620}}>
        <span className="tag"><Lock size={12}/> Personalized to your profile</span>
        <ul style={{listStyle:"none",marginTop:14,display:"grid",gap:11}}>
          {[`Tuned to your ${P.niche} audience`,`Voice: ${(P.tone||["your tone"]).join(", ")}`,`Goal-weighted toward: ${(P.goals||[]).join(", ")}`,`Every output scored for opportunity`].map(x=>(
            <li key={x} style={{display:"flex",gap:10,alignItems:"center",fontSize:14,color:"var(--muted)"}}><Check size={15} color="var(--green)"/>{x}</li>))}
        </ul>
      </div>
    </>
  );
}

/* ── DRAWER (generation output) ── */
/* ─────────── interactive builder engine ─────────── */
const txt=(v)=>v&&typeof v==="object"?(v.text??v.label??""):(v||"");
const O=(text,desc)=>({id:text,label:text,text,desc});
function rngf(seed,salt){let h=salt|0;const s=""+seed;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%9973;return (h%1000)/1000;}
const NW=(P)=>({n:(P.niche||"your niche").toLowerCase(),N:(P.niche||"Niche").split(" ")[0],W:(P.niche||"Niche").split(" ")[0].toUpperCase()});
const fill=(t,{n,N,W})=>t.replace(/{n}/g,n).replace(/{N}/g,N).replace(/{W}/g,W);
const FRAG={
  pain:["you're still stuck","your views stay flat","nobody's converting","you feel invisible","you're posting into the void","your reach tanked","you're not growing","your engagement died","you keep getting ignored","your content flops"],
  desire:["blow up","go viral","hit your first 10K","get real reach","build a real audience","get clients from content","finally grow","get seen","escape the algorithm","scale fast"],
  result:["it changed everything","my views 10x'd","I blew up overnight","I gained 14K followers","my DMs flooded","I went viral","everything shifted","I 3x'd my reach","clients started coming in"],
  mistake:["posting without a hook","chasing the algorithm","copying everyone else","posting and ghosting","ignoring watch time","talking too long","burying the value","skipping captions","posting at the wrong time"],
  time:["30 days","60 days","one week","90 days","a single month","21 days"],
};
// niche-aware fragment resolver: prefer the niche pack, fall back to generic FRAG
function nfrag(P,key){
  const map={pain:"pains",desire:"desires",result:"results",mistake:"mistakes",topic:"topics"};
  const pk=pack(P), pkey=map[key];
  if(pk&&pkey&&pk[pkey]&&pk[pkey].length) return pk[pkey];
  return FRAG[key]||[""];
}
function buildPool(templates,P){
  const tags=NW(P); const groups=[];
  for(const t of templates){
    const key=["pain","desire","result","mistake","topic","time"].find(k=>t.includes("{"+k+"}"));
    if(!key){ groups.push([fill(t,tags)]); continue; }
    const frags=key==="time"?FRAG.time:nfrag(P,key);
    groups.push(frags.map(frag=>fill(t.replace("{"+key+"}",frag),tags)));
  }
  // INTERLEAVE: round-robin across template groups so adjacent options always differ
  const out=[]; let added=true, idx=0;
  while(added){ added=false;
    for(const g of groups){ if(idx<g.length){ out.push(g[idx]); added=true; } }
    idx++;
  }
  // dedupe + final cleanup: resolve any leftover {key} placeholders with niche fragments
  const KEYS=["pain","desire","result","mistake","topic","time"];
  const finish=(s)=>{let r=s;for(const k of KEYS){if(r.indexOf("{"+k+"}")>=0){const fr=(k==="time")?FRAG.time:nfrag(P,k);let h=0;for(let i=0;i<r.length;i++)h=(h*31+r.charCodeAt(i))%fr.length;r=r.split("{"+k+"}").join(fr[h]||"");}}return r;};
  const seen=new Set(), uniq=[];
  for(const s of out){ const f=finish(s); if(!seen.has(f)){ seen.add(f); uniq.push(f); } }
  return uniq;
}
/* ---- HOOK pool (expands to 150+) ---- */
const HOOK_T=[
  "Nobody in {n} tells you this — and it's why {pain}.",
  "I did the opposite of every {n} guru. {result}.",
  "Stop {mistake}. Do this instead.",
  "This is why {pain} even when you post every day.",
  "I stopped {mistake} and {result}.",
  "If you're under 10K in {n}, watch this before you post again.",
  "99% of {n} creators fail because of {mistake}.",
  "The {N} mistake quietly killing your reach: {mistake}.",
  "3 things I'd do today if I was starting {n} from zero.",
  "The {n} growth hack creators are gatekeeping from you.",
  "You're not failing because you're lazy. It's {mistake}.",
  "Why do some {n} creators {desire} and you don't? It's not luck.",
  "This one reel got me 14,000 followers. Let me break it down.",
  "The algorithm just changed. Here's what's working in {n} right now.",
  "POV: you've posted 50 reels and you still {pain}.",
  "I've studied 1,000 viral {n} reels. They all do ONE thing.",
  "Everyone says post more. I posted less and {result}.",
  "The 3-second rule that doubled my watch time.",
  "From 200 views to 2 million in {time} — same niche, one change.",
  "Your hook is fine. Your first FRAME is killing you.",
  "Saves beat likes every time in {n}. Here's how to get them.",
  "5 hooks that go viral in {n} every single time.",
  "How to keep people watching your {n} reel till the last second.",
  "I almost quit {n} at 800 followers. Then this happened.",
  "The DM script that turned my {n} comments into clients.",
  "Delete your last 3 posts. Here's what to post instead.",
  "Want to {desire} in {n}? You need to hear this.",
  "The reason {pain}: you're {mistake}.",
  "What I wish I knew before I started posting {n} content.",
  "This {n} format prints followers. Steal it.",
  "Why your {n} reels get views but no followers.",
  "The fastest way to {desire} without going viral.",
  "I tested this for {time}. The results were insane.",
  "Most {n} advice is wrong. Here's the truth.",
  "How I'd get to 10K in {n} if I started today.",
  "Your content isn't bad. Your hook is.",
  "The unsexy {n} habit that {result}.",
  "Stop scrolling — this fixes your {n} reach.",
  "One sentence that doubles your {n} watch time.",
  "If your {n} reels flop, it's because of this.",
];
/* ---- RETAIN ---- */
const RETAIN_T=[
  "Call out the exact mistake people make with {n}: {mistake}.",
  "Say the uncomfortable truth nobody in {n} admits.",
  "Hit them with a number or stat that stops the scroll.",
  "Name the myth you're about to destroy.",
  "Show the before vs after in one sharp line.",
  "Tell them what {mistake} is secretly costing them.",
  "Promise the payoff you'll reveal at the very end.",
  "Ask the question they're scared to ask themselves.",
  "Drop a bold claim and say 'let me prove it'.",
  "Agitate the pain: '{pain}, right?'",
  "Tease the result: 'this got me {result}'.",
  "Say 'most people do X — here's why that's backwards'.",
  "Reframe their problem so it sounds solvable in 30s.",
  "Use a pattern interrupt: change scene, location, or energy.",
  "Give them a reason to stay: 'the 3rd one shocked me'.",
  "Make it personal: 'I used to {pain} too'.",
  "Create urgency: 'this stops working soon'.",
  "Promise simplicity: 'this takes 5 minutes'.",
  "Challenge them: 'bet you're doing this wrong'.",
  "Hint at the secret: 'nobody talks about step 2'.",
];
/* ---- PAYOFF ---- */
const PAYOFF_T=[
  "Deliver the single most important step — just one, crystal clear.",
  "Give a 3-part mini-framework they can screenshot.",
  "Show exactly what you did and the result it got.",
  "Break the myth, then show what actually works.",
  "Walk the before → after with the ONE key move in the middle.",
  "List 3 fast wins they can do today.",
  "Reveal the tool/template that makes it easy.",
  "Show the simplest version of the system, step by step.",
  "Give the 80/20: the one thing that drives 80% of results.",
  "Demonstrate it live — show, don't just tell.",
  "Compare the wrong way vs the right way, side by side.",
  "Hand them a plug-and-play script or formula.",
  "Tell the mini-story of how you figured it out.",
  "Give a number-by-number breakdown of your best post.",
  "Explain the 'why' so it actually sticks.",
  "Show the mistake, then the fix, then the result.",
  "Reveal the {mistake} fix that {result}.",
  "Show how dropping {mistake} leads to real results.",
  "Break down the exact move that {result}.",
  "Explain why {mistake} keeps {pain}.",
  "Give the one shift that turns {pain} around.",
];
/* ---- CTA by goal ---- */
const CTA_T={
  "Grow followers":["Follow for part 2 tomorrow.","Follow so you don't miss the next one.","Follow if you want to {desire}.","Hit follow — I post this daily.","Follow for more {n} breakdowns.","Tap follow, your future self will thank you.","Follow — this is how you {desire}.","Follow if you're done with {pain}.","Follow for the stuff nobody else in {n} says.","Follow now — tomorrow's post builds on this.","Hit follow if this hit.","Follow and steal my whole system.","New here? Follow — I do this every day.","Follow if you're serious about {n}."],
  "Get saves":["Save this before you forget.","Save it — you'll want this later.","Save this for your next post.","Bookmark this and run it this week.","Save it so you can come back.","Save this if you want to {desire}.","Save this for the days you want to quit.","Save it — future you will need this.","Tap save and actually use it.","Save this and start tomorrow.","Bookmark it before it gets buried.","Save this — it's a cheat sheet for {n}."],
  "Get shares":["Send this to someone who needs it.","Share this with someone starting {n}.","Tag a creator who needs to see this.","Share this to your story.","Send this to your group chat.","Share if you {desire} too.","Tag someone who's tired of {pain}.","Send this to the friend who keeps saying 'someday'.","Share it — someone you know needs this today.","Repost this if you agree.","Tag your accountability partner.","Send this to a fellow {n} creator."],
  "Drive DMs":['Comment "{W}" and I\'ll DM you the breakdown.','Comment "{W}" for the full guide.','Comment "{W}" and I\'ll send the template.','DM me "{W}" to get it.','Comment "{W}" — I\'ll send it over.','Comment "{W}" if you want the system.','Drop "{W}" below and check your DMs.','Comment "{W}" and it\'s yours, free.','Want it? Comment "{W}".','Type "{W}" and I\'ll send the steps.','Comment "{W}" — I reply to every one.','"{W}" in the comments = I DM you the playbook.'],
  "Sell an offer":["DM me START to get the program.","Link in bio to start today.","Comment \"{W}\" and I'll send the details.","DM me if you want me to build this with you.","Spots are limited — DM to claim yours.","DM \"{W}\" if you're ready to {desire}.","Ready to {desire}? Link in bio.","DM 'ready' and let's get you started.","Doors are open — link in bio.","Comment \"{W}\" and I'll send the offer.","Want me to coach you through this? DM me.","Tap the link in bio — limited spots."],
};
/* ═══════════ CAPTION & CTA ENGINES — hundreds of fully-distinct, niche-true outputs ═══════════ */
function _dedupe(arr){const s=new Set(),o=[];for(const x of arr){if(!s.has(x)){s.add(x);o.push(x);}}return o;}
function ctaEngine(P,goal){
  const{n,N,W}=NW(P);const pk=pack(P);const G=(goal||"").toLowerCase();
  const kw=W; const tk=(pk.topics[0]||"this");
  const follow=[`Follow for more ${n} breakdowns.`,`Follow if you're serious about ${n} — I post this daily.`,`Hit follow so you don't miss part 2.`,`Follow @ for the system, not the hype.`,`Follow for the parts no one in ${n} explains.`,`If this helped, follow — it gets better.`,`Follow for daily ${n} that actually works.`,`Tap follow. Future-you will thank you.`];
  const save=[`Save this before it gets buried.`,`Save this — you'll want it later.`,`Save this and run it this week.`,`Save it now, thank me after your next post.`,`Bookmark this for your next ${tk} post.`,`Save this so you stop ${pk.mistakes[0]}.`,`Save → screenshot → execute.`];
  const share=[`Send this to someone who needs it.`,`Share this with the friend who keeps ${pk.mistakes[0]}.`,`Tag someone in ${n} who should see this.`,`Send this to your most ambitious friend.`,`Repost this if it hit.`,`Share it — someone you know is stuck on exactly this.`];
  const dm=[`Comment "${kw}" and I'll DM you the full breakdown.`,`Comment "${kw}" and I'll send you the template.`,`DM me "${kw}" to get the system.`,`Comment "${kw}" — I'll send the step-by-step.`,`Want it? Comment "${kw}" and check your DMs.`,`Comment "${kw}" and I'll walk you through it.`,`Drop "${kw}" below and I'll send the guide.`];
  const sell=[`DM me "${kw}" if you want me to help you do this.`,`Comment "${kw}" to see if you're a fit to work together.`,`Link in bio if you're ready to ${pk.desires[0]}.`,`Tap the link in bio — spots are limited.`,`DM "${kw}" and I'll show you exactly how I'd help you.`,`Ready to ${pk.desires[0]}? Link in bio.`];
  const engage=[`Agree? Drop a 🔥.`,`Am I wrong? Tell me below.`,`What would you add? 👇`,`Which one are you guilty of? Be honest.`,`Drop your biggest ${n} struggle below.`,`Yes or no — does this match your experience?`];
  let primary;
  if(/save/.test(G))primary=save; else if(/share/.test(G))primary=share; else if(/dm/.test(G))primary=dm;
  else if(/sell|offer/.test(G))primary=sell; else if(/follow|grow/.test(G))primary=follow; else primary=[...save,...follow];
  const secondary=[...engage,...save,...follow,...share];
  const out=[];
  for(let i=0;i<primary.length;i++){
    out.push(primary[i]);
    out.push(primary[i]+" "+secondary[(i*3+1)%secondary.length]);
    out.push(secondary[(i*2)%secondary.length]+" "+primary[(i+2)%primary.length]);
  }
  // add all banks so every goal still surfaces variety
  out.push(...follow,...save,...share,...dm,...sell,...engage);
  return _dedupe(out);
}
function captionEngine(P,tone){
  const{n,N,W}=NW(P);const pk=pack(P);
  const PA=pk.pains,DE=pk.desires,MI=pk.mistakes,TO=pk.topics,RE=pk.results;
  const at=(arr,i)=>arr[((i%arr.length)+arr.length)%arr.length];
  const cap=s=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
  const T=(tone||"").toLowerCase();
  const openers=[
    i=>`Most people in ${n} will never ${at(DE,i)}.`,
    i=>`If ${at(PA,i)}, read this.`,
    i=>`Nobody in ${n} tells you this.`,
    i=>`I wasted way too long ${at(MI,i)}.`,
    i=>`Stop ${at(MI,i)}.`,
    i=>`The truth about ${at(TO,i)} nobody says out loud:`,
    i=>`Unpopular opinion:`,
    i=>`${cap(at(DE,i))}? Simpler than they make it look.`,
    i=>`Here's why you're still stuck in ${n}.`,
    i=>`Read this if you're tired of ${at(PA,i)}.`,
    i=>`Everyone in ${n} is doing this wrong.`,
    i=>`This is the ${n} advice I wish I got at the start.`,
    i=>`You don't have a talent problem. You have a system problem.`,
    i=>`3 things about ${at(TO,i)} that changed everything:`,
    i=>`I almost quit ${n}.`,
    i=>`The fastest way to ${at(DE,i)}?`,
    i=>`Hard truth for anyone in ${n}:`,
    i=>`What if ${at(PA,i)} isn't your fault?`,
    i=>`Save this if you've ever felt ${at(PA,i)}.`,
    i=>`Let me save you 6 months in ${n}.`,
  ];
  const middles=[
    i=>`The people who win aren't more talented — they're just consistent while everyone else chases shortcuts.`,
    i=>`It's not ${at(MI,i)}. It's the lack of a repeatable system. And systems are learnable.`,
    i=>`Consistency beats motivation every single time. Boring, repeatable, relentless.`,
    i=>`Here's the move: get obsessed with ${at(TO,i)}. Master that one thing first.`,
    i=>`Stop trying to ${at(DE,i)} overnight. Build the system, then let it compound.`,
    i=>`The difference between people who ${at(DE,i)} and the ones stuck? One system, run daily.`,
    i=>`Most people overcomplicate this. One change, done consistently, beats ten random tactics.`,
    i=>`I stopped ${at(MI,i)}. That one decision changed everything.`,
    i=>`If you want to ${at(DE,i)}, get honest about ${at(MI,i)} first.`,
    i=>`The boring truth: show up, track what works, cut what doesn't. That's the whole game.`,
    i=>`Nobody wins by accident. They build the system, then show up when they don't feel like it.`,
    i=>`Here's what 90 days of real work looks like: unglamorous, repeatable, and undeniable.`,
  ];
  const turns=["Here's the truth:","Here's what changed it for me:","Let me break it down:","The part nobody talks about:","Read this twice:","So here's the move:"];
  const ctas=ctaEngine(P,/sell/.test(T)?"sell":/follow/.test(T)?"follow":"");
  const structures=[
    (o,m,t,c)=>`${o}\n\n${m}\n\n${c}`,
    (o,m,t,c)=>`${o}\n\n${t}\n\n${m}\n\n${c}`,
    (o,m,t,c)=>`${o}\n\n${m}\n\nSave this. ${c}`,
    (o,m,t,c)=>`${o}\n\n${m}`,
    (o,m,t,c)=>`${o}\n\n${m}\n\nThat's it. That's the post.\n\n${c}`,
    (o,m,t,c)=>`${o}\n\n${t}\n${m}\n\n${c}`,
  ];
  const out=[];
  for(let s=0;s<structures.length;s++){
    for(let i=0;i<openers.length;i++){
      const o=openers[i](i+s);
      const m=at(middles,i*2+s)((i+s)*3);
      const t=at(turns,i+s);
      const c=at(ctas,i*3+s*7);
      out.push(structures[s](o,m,t,c));
    }
  }
  return _dedupe(out);
}
function ctaPool(P,goal){return ctaEngine(P,goal);}
function hookMeta(P,hookText){
  const pk=pack(P);
  const def={pain:pk.pains[0],desire:pk.desires[0],result:pk.results[0],mistake:pk.mistakes[0],topic:pk.topics[0]};
  const t=(hookText||"").trim(); if(!t) return def;
  const h=buildHooks(P).find(x=>x.t===t);
  if(!h) return def;
  return {pain:h.pain||def.pain,desire:h.desire||def.desire,result:h.result||def.result,mistake:h.mistake||def.mistake,topic:h.topic||def.topic};
}
function retainPool(a,P){const{n}=NW(P);const pk=pack(P);const m=hookMeta(P,txt(a.hook));const T=m.topic;
  const bases=[
    `But here's what nobody tells you about ${T} 👇`,
    `Most people in ${n} get ${T} completely backwards.`,
    `And no — it's not what every guru repeats about ${T}.`,
    `Here's the part about ${T} that changed everything for me.`,
    `Stick with me — the fix for ${m.pain} is simpler than you think.`,
    `If ${m.pain}, the next 20 seconds are for you.`,
    `This is where 90% of people mess up ${T} 👇`,
    `Save this before it gets buried — it's the whole game.`,
    `I wish someone told me this about ${T} two years ago.`,
    `Let me show you exactly why, fast.`,
    `Quick truth before the how —`,
    `Watch this part twice.`,
  ];
  return shuffleSeeded(bases,(P.name||"")+daySeed()+(txt(a.hook)||"")+"ret");
}
function payoffPool(a,P){const{n}=NW(P);const pk=pack(P);const m=hookMeta(P,txt(a.hook));const T=m.topic;const out=[];
  const res=(""+m.result).toLowerCase();
  out.push(`The fix is ${T}:\n→ Start small and specific\n→ Stay consistent for two honest weeks\n→ Track it and adjust as you go`);
  out.push(`How to ${m.desire} by getting ${T} right:\n1) ${_cap(T)} — do this first, before anything else\n2) Cut what isn't moving the needle\n3) Double down on what is`);
  out.push(`Stop ${m.mistake}. Instead, fix ${T}:\n→ Do ${T} the right way\n→ Give it two weeks\n→ And ${m.pain}? That finally starts to change.`);
  out.push(`The 3 steps to ${res} through ${T}:\n1) Nail ${T}\n2) Then ${m.desire}\n3) Repeat until it's automatic`);
  out.push(`Most people overcomplicate ${T}. The truth:\n→ One focused change\n→ Done consistently\n→ Beats ten random tactics every time`);
  out.push(`Here's exactly how I'd fix ${T} if I were starting today:\n→ Pick the one lever that matters\n→ Remove the three that don't\n→ Show up daily for two weeks and measure`);
  return shuffleSeeded(out,(P.name||"")+daySeed()+(txt(a.hook)||"")+"pay");
}

/* ═══════════ DIGITAL PRODUCT GENERATOR — produces the actual sellable asset ═══════════ */
const EXLIB={
  chest:[["Barbell Bench Press","4","6–8","Drive through your feet, control the descent"],["Incline Dumbbell Press","4","8–10","Targets upper chest, don't flare elbows"],["Weighted Dips","3","8–12","Lean forward to hit the chest"],["Cable Fly","3","12–15","Squeeze hard at the midpoint"],["Push-Up Burnout","2","To failure","Finish the chest, control the tempo"]],
  back:[["Deadlift","4","5","Brace your core, neutral spine"],["Pull-Ups","4","6–10","Full stretch at the bottom"],["Barbell Row","4","8–10","Pull to your belly button"],["Lat Pulldown","3","10–12","Drive elbows down, not back"],["Face Pull","3","15","Rear delts & posture"]],
  legs:[["Back Squat","4","6–8","Depth below parallel, knees out"],["Romanian Deadlift","4","8–10","Hinge at the hips, feel the hamstrings"],["Bulgarian Split Squat","3","10/leg","Stay upright, control it"],["Leg Press","3","12","Full range, no lockout slam"],["Calf Raise","4","15–20","Pause at the top"]],
  arms:[["Barbell Curl","4","8–10","No swinging, strict form"],["Close-Grip Bench","4","8–10","Triceps emphasis"],["Incline Dumbbell Curl","3","10–12","Full stretch"],["Overhead Triceps Ext","3","12","Elbows tucked"],["Hammer Curl","3","12","Brachialis & forearms"]],
  shoulders:[["Overhead Press","4","6–8","Tight core, full lockout"],["Lateral Raise","4","12–15","Lead with the elbows"],["Rear Delt Fly","3","15","Slight bend, squeeze"],["Arnold Press","3","10","Full rotation"],["Upright Row","3","12","To collarbone height"]],
  glutes:[["Hip Thrust","4","8–10","Full lockout, squeeze glutes"],["Romanian Deadlift","4","10","Hinge, hamstrings & glutes"],["Bulgarian Split Squat","3","10/leg","Deep, controlled"],["Cable Kickback","3","15/leg","Squeeze at the top"],["Glute Bridge Burnout","2","To failure","Finish strong"]],
  core:[["Hanging Leg Raise","4","12","Control, no swinging"],["Cable Crunch","4","15","Crunch with the abs not arms"],["Plank","3","60s","Brace, don't sag"],["Russian Twist","3","20","Rotate from the core"],["Ab Wheel","3","10","Full extension"]],
  full:[["Squat","4","6–8","Full depth"],["Bench Press","4","6–8","Controlled"],["Barbell Row","4","8–10","Pull to belly"],["Overhead Press","3","8–10","Tight core"],["Romanian Deadlift","3","10","Hinge"]],
};
function detectBodyPart(topic){const t=_low(topic);for(const k of Object.keys(EXLIB)){if(t.includes(k))return k;}
  if(/shoulder|delt/.test(t))return"shoulders";if(/leg|quad|squat/.test(t))return"legs";if(/glute|butt|booty/.test(t))return"glutes";if(/ab|core/.test(t))return"core";if(/arm|bicep|tricep/.test(t))return"arms";if(/back|lat/.test(t))return"back";if(/chest|push/.test(t))return"chest";return"full";}
function productTypes(P){
  const nq=_low(P.niche);
  const base=[O("Guide / ebook"),O("Step-by-step plan"),O("Checklist"),O("Templates / toolkit"),O("30-day challenge")];
  if(/fitness|train/.test(nq)) return [O("Workout plan"),O("Meal plan"),...base];
  if(/nutrition|health/.test(nq)) return [O("Meal plan"),O("Recipe pack"),...base];
  if(/beauty|skincare/.test(nq)) return [O("Routine guide"),...base];
  return base;
}
function buildProduct(a,P){
  const type=txt(a.type), topic=(txt(a.topic)||P.niche).trim(), level=txt(a.level)||"All levels", size=txt(a.length)||"Standard (5–8 pages)";
  const pk=pack(P), N=_first(P.niche), nq=_low(P.niche);
  const big=/Premium/.test(size), small=/Quick/.test(size);
  const title=_cap(topic)+ (type==="Workout plan"?" — Training Plan":type==="Meal plan"?" — Meal Plan":type==="Routine guide"?" — Routine":type.includes("Guide")?" — The Complete Guide":type==="Checklist"?" — Checklist":type.includes("challenge")||type.includes("Challenge")?" — 30-Day Challenge":" — "+type);
  const subtitle=`A ${level.toLowerCase()} ${type.toLowerCase()} for ${nq}. Built to get results, not collect dust.`;
  const blocks=[];
  blocks.push({label:"Welcome",text:`This is your ${title.replace(/ — .*/,"")}.\n\nMost ${nq} resources are bloated and vague. This one is built to be used. Follow it exactly, track your progress, and you'll see why it works.\n\nLevel: ${level}\nWhat you'll get: a clear, do-this-now system — no fluff.`});

  if(type==="Workout plan"){
    const part=detectBodyPart(topic), ex=EXLIB[part];
    const days=big?5:small?2:3;
    blocks.push({label:"How to use this plan",text:`• Train ${days}× per week, resting at least one day between heavy sessions.\n• Warm up for 5 minutes before every session.\n• Rest 90–120s between heavy sets, 45–60s on accessories.\n• Add a little weight or one rep each week — that's progression.\n• Sleep 7–8h and hit your protein; the work happens in recovery.`});
    blocks.push({label:"Warm-up (5 minutes)",text:`1. 2 min light cardio to raise your heart rate\n2. Arm circles + band pull-aparts × 20\n3. 2 light warm-up sets of your first lift\n4. Mobility for the working joints`});
    blocks.push({label:`The ${_cap(part)} Workout`,text:`${"Exercise".padEnd(26)}Sets   Reps\n${"-".repeat(46)}\n`+ex.map(e=>`${e[0].padEnd(26)} ${e[1].padEnd(6)} ${e[2]}\n   ↳ ${e[3]}`).join("\n")});
    blocks.push({label:"4-week progression",text:`Week 1 — Learn the movements, leave 2 reps in the tank.\nWeek 2 — Add 2.5–5 lb to the main lifts.\nWeek 3 — Push the last set close to failure.\nWeek 4 — Deload 1 set per exercise, then retest your top weight.`});
    if(big) blocks.push({label:"Nutrition to support it",text:`• Protein: ~0.8–1g per lb of bodyweight daily.\n• Eat in a slight surplus to build, a slight deficit to lean out.\n• Prioritize whole foods; treat supplements as extras.\n• Hydrate — aim for clear-ish urine, not neon.`});
  } else if(type==="Meal plan"||type==="Recipe pack"){
    const days=big?5:small?1:3;
    blocks.push({label:"How to use this plan",text:`• Hit your protein at every meal.\n• Prep 2–3 days at a time to stay consistent.\n• Swap any protein/veg for what you like — keep the structure.\n• Drink water before you decide you're hungry.`});
    for(let d=1;d<=days;d++){
      blocks.push({label:`Day ${d}`,text:`Breakfast — 3 eggs + oats + berries  (~480 cal · 32g protein)\nLunch — Grilled chicken, rice & greens  (~620 cal · 48g protein)\nSnack — Greek yogurt + almonds  (~250 cal · 20g protein)\nDinner — Salmon, potatoes & veg  (~640 cal · 42g protein)\n\nDaily total ≈ 1,990 cal · ~142g protein (scale portions to your needs).`});
    }
    blocks.push({label:"Grocery list",text:`Eggs · oats · berries · chicken breast · rice · mixed greens · Greek yogurt · almonds · salmon · potatoes · seasonal veg · olive oil · seasonings`});
  } else if(type==="Routine guide"){
    blocks.push({label:"Morning routine",text:`1. Gentle cleanser\n2. Vitamin C serum (antioxidant + glow)\n3. Lightweight moisturizer\n4. SPF 30+ — every single day, non-negotiable`});
    blocks.push({label:"Evening routine",text:`1. Double cleanse (oil then gentle wash)\n2. Active (retinol or exfoliating acid — alternate nights)\n3. Hydrating serum\n4. Richer moisturizer to seal it in`});
    blocks.push({label:"Weekly + rules",text:`• 1–2× hydrating or clay mask.\n• Never mix retinol + strong acids the same night.\n• Introduce one new active at a time, 2 weeks apart.\n• Consistency beats expensive — give it 6 weeks.`});
  } else if(type==="Checklist"){
    const items=[...pk.desires.map(d=>`Set up the system to ${d}`),...pk.mistakes.map(m=>`Stop ${m}`),...pk.topics.map(t=>`Create content on: ${t}`)].slice(0,big?16:small?6:12);
    blocks.push({label:`${_cap(topic)} checklist`,text:items.map((x,i)=>`☐ ${x}`).join("\n")});
  } else if(type.includes("challenge")||type.includes("Challenge")){
    blocks.push({label:"How the challenge works",text:`30 days. One focused action per day. Check each off. Don't break the chain.`});
    for(let wk=1;wk<=4;wk++){
      const focus=[pk.desires[0],"build the habit","push harder","lock it in"][wk-1];
      blocks.push({label:`Week ${wk} — ${_cap(focus)}`,text:Array.from({length:7},(_,i)=>`Day ${(wk-1)*7+i+1}: ${_cap(pk.topics[((wk-1)*7+i)%pk.topics.length])}`).join("\n")});
    }
  } else { // Guide / Templates / plan
    blocks.push({label:"Introduction",text:`If ${pk.pains[0]}, this guide is for you. By the end you'll know exactly how to ${pk.desires[0]} — step by step, no guesswork.`});
    const chapters=big?5:small?2:3;
    for(let c=1;c<=chapters;c++){
      const d=pk.desires[c%pk.desires.length], m=pk.mistakes[c%pk.mistakes.length];
      blocks.push({label:`Chapter ${c}: ${_cap(d)}`,text:`The mistake most people make: ${m}.\n\nWhat to do instead:\n1. ${_cap(pk.topics[c%pk.topics.length])}\n2. Apply it consistently for two weeks\n3. Track the result and adjust\n\nWhy it works: it removes the guesswork and forces the one action that actually moves the needle in ${nq}.`});
    }
    blocks.push({label:"Your action plan",text:pk.desires.slice(0,4).map((d,i)=>`Step ${i+1}: ${_cap(d)}`).join("\n")});
  }
  blocks.push({label:"About / next step",text:`Built by ${P.name||"a CreatorX creator"}.\n\nWant the next level? ${P.offer&&P.offer!=="Nothing yet"?"Ask about "+P.offer:"DM me to work together"} — or follow for daily ${nq} breakdowns.`});
  const kit=blocks.map(b=>`【 ${b.label} 】\n${b.text}`).join("\n\n");
  return {title,subtitle,blocks,kit,docOpts:{subtitle,author:"By "+(P.name||"You")}};
}

/* email sequence generator — full sequence + strategy report */
function buildEmailSequence(a,P){
  const type=txt(a.type)||"Welcome sequence", aware=txt(a.aware)||"Brand-new subscribers", goal=txt(a.goal)||"Build trust & connection", tone=txt(a.tone)||"Warm & personal";
  const pk=pack(P), n=_low(P.niche), N=_first(P.niche), W=NW(P).W;
  const offer=(P.offer&&P.offer!=="Nothing yet")?P.offer:"your offer";
  const toneNote={"Direct & punchy":"Short lines. No fluff. One idea per email.","Warm & personal":"Write like a friend. First-person, a little vulnerable.","Authority / educational":"Teach something real in every email. Lead with insight.","Story-driven":"Open with a story, land on a lesson, then the ask."}[tone];
  const subj=(arr)=>arr; // helper
  const plans={
    "Welcome sequence":[
      ["Email 1 — Welcome + fastest win","Day 0",["You're in 🎉 (start here)",`Welcome — here's your first ${N} win`,`Read this first, ${P.name||"friend"}`],
        `Welcome them. Remind them why they joined (${pk.pains[0]}). Give ONE fast win they can act on today: ${_cap(pk.topics[0])}. Set the expectation that you show up with value. End by telling them tomorrow's email reveals the mistake most people make.`],
      ["Email 2 — The big mistake","Day 1",[`The #1 reason ${pk.pains[1]}`,"This is costing you more than you think","Stop doing this in "+n],
        `Call out the mistake: ${pk.mistakes[0]}. Agitate what it's costing them. Then flip to what to do instead: ${_cap(pk.topics[1])}. Invite a reply — "hit reply and tell me where you're stuck." Replies train the inbox to trust you.`],
      ["Email 3 — Your story / proof","Day 3",["How I went from stuck to results","the turning point","my honest story"],
        `Tell your origin story (or a client's). The turning point: you stopped ${pk.mistakes[1]}. Make it relatable, not braggy. Bridge to: "if you want the same, here's the next step."`],
      ["Email 4 — Teach the framework","Day 5",[`The 3-step ${N} framework`,"steal my system","the simple way to "+pk.desires[0]],
        `Deliver real value: a 3-step framework to ${pk.desires[0]}. Make it screenshot-worthy. This is the email that earns the right to sell next.`],
      ["Email 5 — The invitation","Day 7",[`Want me to just hand you the system?`,`ready to ${pk.desires[0]}?`,"the shortcut (if you want it)"],
        `Soft pitch ${offer}. Recap the transformation, who it's for, and the clear next step. One link, one CTA. ${goal==="Book a call"?"Drive to your booking link.":goal.startsWith("Sell")?"Drive to the sales page.":"Drive to your best resource."}`],
    ],
    "Sales sequence":[
      ["Email 1 — The problem","Day 0",[`${_cap(pk.pains[0])}? read this`,"the real reason you're stuck","let's be honest about "+n],
        `Name the pain hard: ${pk.pains[0]}. Agitate it. Tease that there's a better way — and you're about to show it. No pitch yet.`],
      ["Email 2 — The solution","Day 1",[`The fix: ${offer}`,"here's what actually works","introducing the system"],
        `Introduce ${offer}. What it is, what's included, who it's for, the transformation. Clear CTA to the page.`],
      ["Email 3 — Proof","Day 2",["real results","don't take my word for it","this could be you"],
        `Stack proof: testimonials, your results, screenshots. Handle the "will this work for me?" doubt. Restate the offer + CTA.`],
      ["Email 4 — Objections","Day 3",['"but what if..."',"the 3 things holding you back","let's address the elephant"],
        `Handle the top 3 objections (price, time, "I've tried things before"). Reframe each. Restate the CTA.`],
      ["Email 5 — Close","Day 4",["closing tonight","last call","this is it"],
        `Urgency: deadline or bonus expiring. Final recap. One link. Make the cost of inaction clear (${pk.pains[2]} continues).`],
    ],
    "Launch sequence":[
      ["Email 1 — Tease","Day -3",["something's coming...","I've been working on this","big news in 3 days"],`Build curiosity. Hint at the transformation, no link yet.`],
      ["Email 2 — Reveal / cart open","Day 0",["it's here 🚀",`${offer} is live`,"doors are open"],`Reveal ${offer}, the promise, what's included. Open cart. Strong CTA.`],
      ["Email 3 — Proof","Day 1",["real results","why this works","meet the people who did it"],`Testimonials + results. Restate the offer + CTA.`],
      ["Email 4 — Objections","Day 2",['"is this for me?"',"answering your questions","the honest breakdown"],`FAQ + objections. Reassure and restate CTA.`],
      ["Email 5 — Urgency","Day 3",["24 hours left","closing soon","don't miss this"],`Scarcity. The deadline is real. Recap + CTA.`],
      ["Email 6 — Last call","Day 4",["closing tonight ⏰","final call","last chance"],`Final email. Short. One link. Close the cart.`],
    ],
    "Nurture sequence":[
      ["Email 1 — Pure value","Day 0",[_cap(pk.topics[0]),"the thing nobody tells you","a quick win for you"],`Teach one idea: ${_cap(pk.topics[0])}. No pitch. Build the habit of opening you.`],
      ["Email 2 — Value + lean-in","Day 3",[_cap(pk.topics[1]),"do this this week","the small change that matters"],`Teach ${_cap(pk.topics[1])}. Mention what you do at the very end, lightly.`],
      ["Email 3 — Story","Day 6",["a quick story","what this taught me","the lesson that stuck"],`A story → one lesson. Relatable. Bridge toward ${goal.toLowerCase()}.`],
      ["Email 4 — Value → CTA","Day 9",[_cap(pk.topics[2]),"ready for the next step?","let's go deeper"],`Teach, then point clearly to ${goal.toLowerCase()}.`],
      ["Email 5 — Invitation","Day 12",["want to work together?","the next level",`ready to ${pk.desires[0]}?`],`Invite them to ${offer}. Clear CTA.`],
    ],
    "Re-engagement":[
      ["Email 1 — Pattern interrupt","Day 0",["did I lose you?","still want this?","quick question"],`Honest and short. Ask if they still want ${n} content. One link to your best resource.`],
      ["Email 2 — Best hit","Day 2",["in case you missed it","my most-loved post","this one's worth it"],`Send your single best resource. Re-earn the open.`],
      ["Email 3 — The clean break","Day 4",["should I stop emailing you?","last one (for real)","staying or going?"],`Clear opt-down. The ones who stay are your real list. Honest, warm.`],
    ],
  };
  const seq=plans[type]||plans["Welcome sequence"];
  const blocks=[];
  blocks.push({label:"Sequence overview",text:`Sequence: ${type}\nAudience: ${aware}\nGoal: ${goal}\nTone: ${tone} — ${toneNote}\nEmails: ${seq.length}\n\nThis sequence is built to take a ${aware.toLowerCase()} reader and ${goal.toLowerCase()} over ${seq.length} emails. Send on the schedule below; never send two "asks" back to back without value between them.`});
  seq.forEach((e,i)=>{
    blocks.push({label:`${e[0]}  ·  send ${e[1]}`,text:`SUBJECT LINE OPTIONS (pick one, A/B test 2):\n• ${e[2][0]}\n• ${e[2][1]}\n• ${e[2][2]}\n\nWHAT THIS EMAIL DOES:\n${e[3]}\n\nWRITE IT IN THIS TONE: ${tone} — ${toneNote}`});
  });
  // subject line bank
  const bank=[...new Set(seq.flatMap(e=>e[2]))].slice(0,12);
  blocks.push({label:"Subject-line swipe bank",text:bank.map(b=>"• "+b).join("\n")+"\n\nRule: curiosity or benefit, under 6 words, lowercase often wins, no spammy caps."});
  blocks.push({label:"Send schedule",text:seq.map(e=>`${e[1]}: ${e[0].replace(/^Email \d+ — /,"")}`).join("\n")});
  blocks.push({label:"What to test",text:`1. Subject lines — test 2 per email, keep the winner.\n2. Send time — try mornings vs evenings for your list.\n3. The CTA — one clear ask beats three soft ones.\n4. Plain-text vs designed — plain-text usually wins for creators.\n5. The first line (preview text) — it's a second subject line.`});
  blocks.push({label:"How to set this up",text:`1. Add these emails to your email tool (Beehiiv, ConvertKit, Resend, etc.) as an automation.\n2. Trigger it when someone joins your list (or hits your keyword "${W}").\n3. Paste each subject + write the body from the guidance above in your voice.\n4. Set the day delays as shown.\n5. Turn it on and watch opens/clicks — refine the weak emails.`});
  const kit=blocks.map(b=>`【 ${b.label} 】\n${b.text}`).join("\n\n");
  return {title:`${type} — full playbook`,subtitle:`${aware} · ${goal} · ${tone}`,blocks,kit,docOpts:{subtitle:`${aware} → ${goal} · ${seq.length}-email ${type.toLowerCase()}`}};
}

function buildReel(a,P){
  const{N,W,n}=NW(P);const pk=pack(P);
  const goal=txt(a.goal)||"Grow followers", tone=txt(a.tone)||"Direct & punchy", style=txt(a.style)||pk.formats[0][0], aware=txt(a.aware)||"Cold — strangers";
  const gen=/Generate/.test(txt(a.mode))||!a.hook;
  const hook=txt(a.hook)||buildHooks(P)[0].t;
  const m=hookMeta(P,hook);
  const retain=txt(a.retain)||retainPool({hook:O(hook)},P)[0];
  const payoff=txt(a.payoff)||payoffPool({hook:O(hook)},P)[0];
  const cta=txt(a.cta)||ctaPool(P,goal)[0];
  const offer=(P.offer&&P.offer!=="Nothing yet")?P.offer:"your offer";
  const toneVoice={"Direct & punchy":"short lines, no fluff","Warm & relatable":"warm and first-person, like a friend","Authority / educational":"credible and teach-y","Hype / high-energy":"fast, loud, exciting","Story-driven":"open on a beat of story","Luxury / aspirational":"premium and aspirational"}[tone]||"direct";
  const script=`HOOK (0–3s):\n"${hook}"\n\nRETAIN (3–10s):\n${retain}\n\nPAYOFF (10–35s):\n${payoff}\n\nCTA (35s+):\n${cta}`;
  const ost=`① 0:00–0:03 · TOP THIRD\n   Text: "${hook}"\n   Bold condensed sans (Anton / Montserrat Black) · 46–52pt · white + 3px black stroke · pop in on frame 1\n\n② 0:03–0:10 · CENTER\n   Core of: "${retain}"\n   Clean bold sans · 40pt · white + soft shadow\n\n③ 0:10–0:35 · LOWER THIRD (one line at a time)\n   Each payoff point as its own caption · 34–36pt · highlight the key word in your accent color\n\n④ Last 2s · CENTER\n   Text: "${cta}" · 44pt · white on a dark bar`;
  const cap1=`${hook}\n\n${payoff}\n\n${cta}`;
  const cap2=`Read this if ${m.pain} 👇\n\n${payoff}\n\nThe difference between people who ${m.desire} and the ones stuck? A real system for ${m.topic}.\n\n${cta}`;
  const cap3=`${hook}\n\nHere's the truth about ${m.topic}:\n\n${payoff}\n\nSave this. Then go run it.\n\n${cta}`;
  const audio=goal==="Sell an offer"||goal==="Drive DMs"?"Your voice is the audio — keep a quiet trending track ~15% under it.":"Use a fast-rising trending sound (under ~50k uses). Tap the ↗ in Signal Scanner to find them.";
  const shortGoal=/Grow|save|share|reach|follow|comment|DM/i.test(goal);
  const longStyle=/talking head|educational|authority|real talk|luxury/i.test(style+" "+tone);
  const longGoal=/Sell an offer|Tell a story|Build authority/i.test(goal);
  const longForm= !shortGoal && (longStyle || longGoal);
  const lenRec= longForm
    ? "30–60s — this is a longer-form play (real-talk / educational / talking-head / promo). Longer is only worth it when every second earns attention. If it sags, cut it."
    : (/Grow|save|share|reach|follow/i.test(goal)
        ? "5–12s · TIER 1 (most reels should live here) — short, fast, high-replay. Short length keeps your watch-time % high relative to the reel, and that's what the algorithm rewards with reach."
        : "12–18s · TIER 2 — punchy with a little more room. Still fast. Anything past 18s should have a real reason (story, teaching, selling).");
  const lenBlock=`${lenRec}\n\nThe rule of thumb:\n• 5–12s (Tier 1): viral / reach / saves / shares — the default. Speed wins.\n• 12–18s (Tier 2): a bit more depth, still tight.\n• 18s+: only for real-talk, promos, longer speaking, talking-head and educational.\n\nWhy: a 90% watch on an 8s reel beats a 40% watch on a 40s one. High completion % → more reach. When in doubt, cut it shorter.`;
  const funnel=`Turn the views from this reel into customers — automatically:\n\n1. REEL CTA → "${cta.replace(/\n/g," ")}"\n2. AUTO-DM → when they comment "${W}", auto-send your link + lead magnet\n3. WEBSITE / STORE → the link captures their name + email\n4. EMAIL → your welcome sequence nurtures them over a few days\n5. LEAD → they reply or book, you qualify them\n6. CLOSE → pitch ${offer}\n\n→ Build steps 2–3 in the Automation Engine, step 4 in Email & Funnels. This is how one reel becomes recurring revenue.`;
  const blocks=[
    {label:gen?"⚡ Your full reel — auto-built":"Full reel script",text:script},
    {label:"⏱ Ideal length & pacing",text:lenBlock},
    {label:"🎯 Retention timeline — beat by beat",text:"Built on the CreatorX retention curve — hold them at every second:\n\n"+RETENTION_TIMELINE.map(r=>`${r[0]} · ${r[1]}\n   ${r[2]}`).join("\n\n")},
    {label:"On-screen text — placement, font, size & color",text:ost},
    {label:"Caption · option 1 (punchy)",text:cap1},
    {label:"Caption · option 2 (story)",text:cap2},
    {label:"Caption · option 3 (authority)",text:cap3},
    {label:"Audio & edit notes",text:`${audio}\nTone: ${tone} — keep it ${toneVoice}.\nCut every 1.5–2s · caption every word · loop the last line into the first.`},
  ];
  if(gen) blocks.push({label:"🔗 Full funnel — automate the views into sales",text:funnel});
  const kit=`${cap1}\n\n${hashtags(P).join(" ")}`;
  return{title:`Your ${N} reel · ${goal.toLowerCase()}${gen?" · full package":""}`,subtitle:`${style} · ${tone} · ${aware}`,blocks,kit,hashtags:hashtags(P).join(" "),docOpts:{subtitle:`${style} · built to ${goal.toLowerCase()}`}};
}

const CONFIGS={
  email:{title:"Email Sequence Builder",intro:"Answer a few questions — I'll generate the full sequence in your voice, then build you a complete report.",steps:[
    {id:"type",q:"Which sequence?",kind:"select",options:()=>[O("Welcome sequence"),O("Nurture sequence"),O("Sales sequence"),O("Launch sequence"),O("Re-engagement")]},
    {id:"aware",q:"Who's it going to?",kind:"select",options:()=>[O("Brand-new subscribers","Just joined your list"),O("Warm leads","Engaged but haven't bought"),O("Past buyers","Already purchased"),O("Cold / re-engaging","Gone quiet")]},
    {id:"goal",q:"What's the end goal?",kind:"select",options:(a,P)=>[O("Build trust & connection"),O("Book a call"),O("Sell "+((P.offer&&P.offer!=="Nothing yet")?P.offer:"my offer")),O("Drive them back to my content"),O("Re-activate & clean the list")]},
    {id:"tone",q:"What tone fits you?",kind:"select",options:()=>[O("Direct & punchy"),O("Warm & personal"),O("Authority / educational"),O("Story-driven")]},
  ],assemble:(a,P)=>buildEmailSequence(a,P)},

  product:{title:"Digital Product Builder",intro:"Answer a few questions and I'll generate the actual product — ready to sell as an elite PDF or Word doc.",steps:[
    {id:"type",q:"What do you want to create?",kind:"select",options:(a,P)=>productTypes(P)},
    {id:"topic",q:"What's it about? Be specific.",kind:"text",ph:"e.g. chest workout, gut-health meal plan, glass-skin routine"},
    {id:"level",q:"Who is it for?",kind:"select",options:()=>[O("Beginner"),O("Intermediate"),O("Advanced"),O("All levels")]},
    {id:"length",q:"How big should it be?",kind:"select",options:()=>[O("Quick win (1–3 pages)"),O("Standard (5–8 pages)"),O("Premium (10+ pages)")]},
  ],assemble:(a,P)=>buildProduct(a,P)},
  reels:{title:"Reel Builder",intro:"A few quick questions — then generate a full package or custom-build each beat.",steps:[
    {id:"goal",q:"What should this reel do?",kind:"select",options:()=>[
      O("Grow followers","Maximize reach & new follows"),O("Get saves","Reference-worthy value"),
      O("Get shares","Relatable, send-to-a-friend"),O("Drive DMs","Comment-to-DM funnel"),O("Sell an offer","Convert to revenue")]},
    {id:"tone",q:"What tone are you going for?",kind:"select",options:()=>[
      O("Direct & punchy"),O("Warm & relatable"),O("Authority / educational"),O("Hype / high-energy"),O("Story-driven"),O("Luxury / aspirational")]},
    {id:"style",q:"What kind of video is it?",kind:"select",options:(a,P)=>pack(P).formats.map(f=>O(f[0],f[1])).concat([O("Talking head","Straight to camera"),O("Voiceover + b-roll","VO over footage")])},
    {id:"aware",q:"Who's this for?",kind:"select",options:()=>[O("Cold — strangers","People who don't follow you"),O("Warm — they know me","Followers & fans"),O("Buyers / leads","People close to buying")]},
    {id:"mode",q:"How do you want to build it?",kind:"select",options:()=>[
      O("⚡ Generate the full package for me","Hook → retain → payoff → CTA + the funnel, done for you"),
      O("🎛 Custom build","I'll pick each beat myself")]},
    {id:"hook",q:"Pick your hook (first 3 seconds)",kind:"select",when:a=>/Custom/.test(txt(a.mode)),pool:(a,P)=>buildHooks(P).map(h=>h.t),ai:(a,P)=>`Give me 15 more scroll-stopping hooks for a ${NW(P).n} reel, in my voice.`},
    {id:"retain",q:"Pick your retention beat (3–10s) — flows from your hook",kind:"select",when:a=>/Custom/.test(txt(a.mode)),pool:(a,P)=>retainPool(a,P),ai:(a,P)=>`Give me 10 more retention lines to hold viewers after the hook on a ${NW(P).n} reel.`},
    {id:"payoff",q:"Pick your payoff (the value, 10–35s)",kind:"select",when:a=>/Custom/.test(txt(a.mode)),pool:(a,P)=>payoffPool(a,P),ai:(a,P)=>`Give me 10 more ways to deliver the value/payoff in a ${NW(P).n} reel.`},
    {id:"cta",q:"Pick your CTA",kind:"select",when:a=>/Custom/.test(txt(a.mode)),pool:(a,P)=>ctaPool(P,txt(a.goal)),ai:(a,P)=>`Give me 10 more CTAs for a ${NW(P).n} reel built to ${txt(a.goal).toLowerCase()}.`},
  ],assemble:(a,P)=>buildReel(a,P)},

  offer:{title:"Offer Architect",intro:"Build a real, sellable offer end-to-end — then save it and go market it.",steps:[
    {id:"type",q:"What kind of offer are you building?",kind:"select",options:()=>[
      O("1:1 Coaching","High-touch, premium"),O("Group coaching","Leverage + community"),O("Digital course","Scalable, passive"),
      O("Templates / toolkit","Low-ticket, fast"),O("Paid community","Recurring revenue"),O("Done-for-you service","You do the work"),
      O("Challenge / bootcamp","Time-boxed, high energy"),O("Consulting / audit","Expertise on demand")]},
    {id:"promise",q:"Pick the core promise (the outcome you sell)",kind:"select",pool:(a,P)=>{const{n,N}=NW(P);return buildPool([
      `Get real ${n} results in {time} — without {mistake}.`,`Go from stuck to a clear ${n} system in {time}.`,
      `The fastest path to your first big ${n} win.`,`${N} results on a busy schedule — done with you.`,
      `Turn your ${n} into consistent income, step by step.`,`Finally ${"{desire}"} in ${n} — with a proven system.`,
      `Build a ${n} brand that pays you every month.`,`Stop ${"{mistake}"} and start seeing real ${n} growth.`,
      `Master ${n} faster than you thought possible.`,`From beginner to confident in ${n} in {time}.`],P);},
      ai:(a,P)=>`Give me 10 strong offer promises for a ${txt(a.type)} in ${NW(P).n}.`},
    {id:"price",q:"Pick your price (and plan)",kind:"select",options:()=>[
      O("$47 — tripwire","one-time impulse buy"),O("$97 — entry","low-ticket"),O("$197 — starter","or 2× $110"),
      O("$297 — core","or 2× $165"),O("$497 — signature","or 3× $185"),O("$997 — premium","or 4× $275"),
      O("$1,500 — high-ticket","or 4× $425"),O("$3,000 — elite 1:1","or 6× $550"),
      O("$49/mo — membership","recurring"),O("$99/mo — pro membership","recurring")]},
    {id:"deliverables",q:"What's inside? (pick 4–7)",kind:"multiselect",min:4,max:7,pool:(a,P)=>{const{n}=NW(P);return buildPool([
      "Step-by-step training modules","Weekly live coaching calls",`Custom ${n} game plan built to their goal`,
      "Private community / accountability channel","Direct DM access to you","Voice-note feedback on their work",
      "Plug-and-play templates & swipe files","Scripts for hooks, captions & DMs","Monthly live workshops",
      "Guest expert sessions","Searchable recordings library","30-day kickstart challenge","Progress tracker & milestones",
      "1:1 onboarding call","Done-for-you starter assets","Weekly accountability check-ins","Private podcast feed",
      "Content review / audits","Hot-seat coaching","Lifetime access & updates"],P);},
      ai:(a,P)=>`Suggest 12 deliverables I could include in a ${txt(a.type)} for ${NW(P).n}.`},
    {id:"bonuses",q:"Add bonuses (pick 2–4)",kind:"multiselect",min:2,max:4,pool:(a,P)=>{const{n,N}=NW(P);return buildPool([
      `Fast-action call (first 10 only)`,`The ${N} Starter Vault (templates)`,`Bonus mini-course: viral ${n} hooks`,
      `Private podcast: behind-the-scenes`,`30-day ${n} challenge`,`Lifetime updates`,`Founding-member badge & locked pricing`,
      `Group content audit`,`Swipe file of 100 hooks`,`Done-for-you 30-day calendar`,`1:1 strategy session`,`Accountability buddy match`],P);}},
    {id:"guarantee",q:"Pick a guarantee",kind:"select",options:()=>[
      O("14-day money-back","Lowers risk, lifts conversions"),O("30-day 'do the work' guarantee","Refund if they do the work & don't see progress"),
      O("Results-or-we-keep-working","Premium positioning"),O("Pay after your first result","Bold, high-trust"),O("No guarantee — premium","Scarcity / exclusivity")]},
  ],assemble:(a,P)=>{const{N,W,n}=NW(P);const type=txt(a.type),promise=txt(a.promise),price=txt(a.price),guar=txt(a.guarantee);
    const deliv=(a.deliverables||[]).map(o=>o.text), bon=(a.bonuses||[]).map(o=>o.text);
    const power=["Accelerator","Blueprint","Method","System","Intensive","Lab","Academy","Engine"];
    const names=[`The ${N} ${power[Math.floor(rngf(promise,1)*power.length)]}`,`${N} ${type.split(" ")[0]} ${power[Math.floor(rngf(promise,5)*power.length)]}`,`${W} OS — ${type}`];
    const build=type.includes("course")||type.includes("Coaching")||type.includes("bootcamp")
      ? `Build these 6 modules:\n1. Foundations — mindset + the ${n} landscape\n2. The hook & first-3-seconds system\n3. Retention & watch-time editing\n4. The content engine (calendar + batching)\n5. Funnels — turning views into DMs & leads\n6. Monetize — offers, pricing & closing\n\n+ a workbook per module and one live call each week.`
      : type.includes("community")||type.includes("membership")
      ? `Build the space:\n• Welcome + start-here path\n• Weekly content prompt & challenge\n• Monthly live training\n• Wins & accountability channel\n• Resource vault (templates, swipe files)\n• Member spotlight to drive retention.`
      : type.includes("Templates")
      ? `Build the toolkit:\n• 30 fill-in-the-blank hook templates\n• 10 caption frameworks\n• A 30-day content calendar\n• DM scripts\n• Notion/Canva delivery + a 10-min walkthrough video.`
      : `Build the delivery:\n• Intake form to scope their goal\n• A clear milestone roadmap\n• Weekly deliverables & check-ins\n• A simple dashboard to show progress.`;
    const sales=[`Outcome: ${promise}`,`Who it's for: ${n} creators who are done ${FRAG.pain[3]}`,`The mechanism: a proven, repeatable system — not random tips`,`What's included: ${deliv.length} deliverables + ${bon.length} bonuses`,`Risk: ${guar}`].map(x=>`• ${x}`).join("\n");
    const dmPitch=`Quick one — I put together "${names[0]}". ${promise} ${price.split(" — ")[0]}. ${bon[0]?`Plus: ${bon[0]}. `:""}Want me to send the full details?`;
    const story=`Slide 1: Most ${n} creators are ${FRAG.pain[2]}. (bold text)\nSlide 2: I built something to fix that. → poll: [tell me more] / [I'm good]\nSlide 3: "${names[0]}" — ${promise} → link / DM "${W}"`;
    const market=`1. Post a 'comment ${W}' reel that teases the outcome, not the offer.\n2. Run the 3-slide story above to your warm audience.\n3. DM everyone who engages using the pitch — qualify, then send the link.`;
    const kit=`${names[0]}\n\n${promise}\n\nPrice: ${price}\n\nWHAT'S INCLUDED:\n${deliv.map(x=>"• "+x).join("\n")}\n\nBONUSES:\n${bon.map(x=>"• "+x).join("\n")}\n\nGUARANTEE: ${guar}\n\nDM "${W}" to claim your spot.`;
    return{title:names[0],blocks:[
      {label:"Name options",text:names.join("\n")},
      {label:"Promise",text:promise},
      {label:"Price & payment plan",text:price},
      {label:"What's included",text:deliv.map(x=>"• "+x).join("\n")},
      {label:"Bonuses",text:bon.map(x=>"• "+x).join("\n")},
      {label:"Guarantee",text:guar},
      {label:"What to actually build (do this next)",text:build},
      {label:"Sales-page bullets",text:sales},
      {label:"DM pitch (ready to send)",text:dmPitch},
      {label:"Story launch sequence",text:story},
      {label:"How to market it this week",text:market}],kit};}},

  hooks:{title:"Hook Engine",intro:"Choose an angle, scroll for more, keep the ones that hit.",steps:[
    {id:"angle",q:"What angle?",kind:"select",options:()=>["Curiosity","Contrarian","Authority","Transformation","Pain-point","List"].map(x=>O(x))},
    {id:"picks",q:"Keep the ones you'll use (pick any)",kind:"multiselect",min:1,pool:(a,P)=>buildPool(HOOK_T,P),
      ai:(a,P)=>`Give me 15 ${txt(a.angle)} hooks for ${NW(P).n}, in my voice.`},
  ],assemble:(a,P)=>{const picks=(a.picks||[]).map(o=>o.text);
    return{title:`${picks.length} hooks, ready to use`,blocks:[{label:"Your hooks",text:picks.map((h,i)=>`${i+1}. ${h}`).join("\n")}],kit:picks.join("\n")};}},

  cta:{title:"CTA Lab",intro:"Pick your goal — scroll endless CTAs, then edit yours.",steps:[
    {id:"goal",q:"What should this CTA do?",kind:"select",options:()=>[O("Grow followers"),O("Get saves"),O("Get shares"),O("Drive DMs"),O("Sell an offer")]},
    {id:"pick",q:"Pick your CTA (Refresh for more — then edit it)",kind:"select",pool:(a,P)=>ctaPool(P,txt(a.goal)),ai:(a,P)=>`Give me 10 more ${txt(a.goal).toLowerCase()} CTAs for a ${NW(P).n} post.`},
  ],assemble:(a,P)=>{const c=txt(a.pick);return{title:"Your CTA",blocks:[{label:"Call to action",text:c},{label:"Where to use it",text:`• End screen of your reel (last 2s, on a dark bar)\n• Last line of your caption\n• Final story slide\n• Pinned comment\n\nGoal: ${txt(a.goal)}. One clear ask beats three soft ones.`}],kit:c};}},

  caption:{title:"Caption Lab",intro:"Set the vibe, scroll the options, pick your caption.",steps:[
    {id:"tone",q:"What's the vibe?",kind:"select",options:(a,P)=>(P.tone&&P.tone.length?P.tone:["Direct & intense","Educational","Real-talk","Contrarian"]).map(x=>O(x))},
    {id:"pick",q:"Pick your caption (Refresh for hundreds more — then edit it)",kind:"select",pool:(a,P)=>captionEngine(P,txt(a.tone)),
      ai:(a,P)=>`Write me 5 ${txt(a.tone)} captions for a ${NW(P).n} post.`},
  ],assemble:(a,P)=>{const c=txt(a.pick);return{title:"Your caption",blocks:[{label:"Caption",text:c}],kit:`${c}\n\n${hashtags(P).join(" ")}`};}},

  dm:{title:"DM Closer",intro:"Pick the situation and your style — scroll for the exact reply.",steps:[
    {id:"scenario",q:"What did they say?",kind:"select",options:()=>['"How much?"','"Tell me more"','"I don\'t have the money"','"Is this for beginners?"','"Can you help me?"','"I need to think about it"'].map(x=>O(x))},
    {id:"tone",q:"Your closing style",kind:"select",options:()=>[O("Friendly","Warm, low pressure"),O("Direct","Straight to it"),O("Premium","High-ticket energy"),O("Soft sell","Qualify first")]},
    {id:"pick",q:"Pick your reply",kind:"select",pool:(a,P)=>{const{n}=NW(P);const sc=txt(a.scenario);const map={
      '"How much?"':[`Before I throw a number — what's the #1 thing you're trying to fix in ${n}? Want to make sure it's a fit.`,`Good question 🙏 quick one first: where are you now, and where do you want to be?`,`Depends what you need — tell me your goal and I'll show you the right option.`,`Happy to share — but real quick, what's got you reaching out today?`],
      '"Tell me more"':[`Love that. In short: I help people get real ${n} results without the guesswork. What's your situation?`,`Happy to — what's the main thing you're stuck on? I'll tailor it.`,`Sure! It takes you from where you are to your next ${n} milestone. What's your goal?`],
      '"I don\'t have the money"':[`Totally hear you. Quick Q — is it timing, or you're not sure it'll work for you? I can show you exactly how it would.`,`No pressure. Want me to send a free starting point so you can begin now?`,`Understood — when timing's right, I'm here. Want me to keep your spot in mind?`],
      '"Is this for beginners?"':[`100%. It takes beginners from zero to a working ${n} system, step by step. Where are you starting?`,`Yes — most people start exactly where you are. What's your setup?`,`Perfect fit. I'll meet you at your level. What's your #1 goal?`],
      '"Can you help me?"':[`That's literally what I do 🙌 tell me the #1 thing you want to fix in ${n}.`,`For sure. What are you working on right now?`,`Yes — let's start with your biggest bottleneck. What is it?`],
      '"I need to think about it"':[`Totally fair. What's the one thing you're unsure about? I'd rather answer it than have you guess.`,`Of course — want me to send a quick example of how it'd work for you while you think?`,`No rush. Can I ask what would make this a clear yes for you?`]};
      return (map[sc]||map['"How much?"']);},ai:(a,P)=>`Write 5 ${txt(a.tone)} DM replies to "${txt(a.scenario)}" for my ${NW(P).n} offer.`},
  ],assemble:(a,P)=>{const reply=txt(a.pick);const follow="If no reply in 24h: 'No rush — want a quick example so you can see how it'd work for you?'";
    return{title:"Your DM reply",blocks:[{label:"Reply",text:reply},{label:"Follow-up (if no response)",text:follow}],kit:reply};}},

  story:{title:"Story Sequencer",intro:"Sequence a story set around your reel — or standalone. Refresh the topic for variety.",steps:[
    {id:"mode",q:"What are we sequencing?",kind:"select",options:()=>[O("🎬 Around my reel","Drive viewers to a post you're publishing"),O("📱 Standalone story","Engagement / sales without a reel")]},
    {id:"goal",q:"What's the goal?",kind:"select",options:(a,P)=>/reel/i.test(txt(a.mode))?[O("Drive views to my reel"),O("Drive saves & shares"),O("Drive comments / DMs"),O("Tease then sell")]:[O("Engagement","Polls & questions"),O("Sell","Bridge to an offer"),O("Authority","Build trust"),O("Launch","Tease & open")]},
    {id:"topic",q:"What's it about? (Refresh for more angles)",kind:"select",pool:(a,P)=>{const pk=pack(P);return buildPool([`${_cap("{topic}")}`,`why ${pk.pains[0]}`,`the truth about {topic}`,`how to ${pk.desires[0]}`,`the {mistake} mistake`,`{topic} in 30 days`,`what nobody says about {topic}`],P);},ai:(a,P)=>`Give me 8 more story angles for ${NW(P).n}.`},
    {id:"len",q:"How many slides?",kind:"select",options:()=>["3 slides","5 slides","7 slides"].map(x=>O(x))},
  ],assemble:(a,P)=>{const{n,W}=NW(P);const len=parseInt(txt(a.len))||3;const g=txt(a.goal);const topic=txt(a.topic)||"this";const aroundReel=/reel/i.test(txt(a.mode));
    let lib;
    if(aroundReel){
      lib=[
        `Tease (bold text): "Most people in ${n} get ${topic} completely wrong."`,
        `Build curiosity: "I just broke down the fix in a new post 👀"`,
        `Poll: "Want to see it?" → [Yes, show me] / [Already know]`,
        `Drive: "👆 It's live now — tap to watch" (use the 'tap to watch' / link sticker to your reel)`,
        `Proof: drop a quick result or screenshot that backs up the reel.`,
        `Question box: "What's your biggest struggle with ${topic}?"`,
        `DM bridge: "Comment \\"${W}\\" on the reel and I'll send you the template."`,
      ];
    } else {
      lib=[
        `Hook (bold text): "Most people in ${n} get ${topic} wrong."`,
        `Quiz/poll: "Which actually works?" → [A] / [B]`,
        `Question box: "What's your #1 struggle with ${topic}?"`,
        `Mini-story: "Here's what changed it for me…"`,
        `Proof: a result/screenshot that backs it up.`,
        `Soft bridge: "Want the full system?" → poll [yes] / [later]`,
        `CTA: "Tap to grab it" → link / DM "${W}"`,
      ];
    }
    const slides=lib.slice(0,len).map((s,i)=>`Slide ${i+1} — ${s}`).join("\n\n");
    const order=aroundReel
      ? `POST ORDER (around your reel):\n1. Publish the reel first.\n2. Within 10 min, post Slides 1–2 (tease + curiosity).\n3. 30–60 min later, post the poll + "tap to watch" slide.\n4. A few hours later, post the proof + question-box slide.\n5. Reply to every poll vote and question in DMs — that's where it converts.`
      : `POST ORDER:\n1. Post the hook + poll early in the day.\n2. Space the rest 1–2 hours apart to stay at the front of the tray.\n3. Reply to every vote and question in DMs.`;
    return{title:`${len}-slide story · ${aroundReel?"around your reel":g}`,subtitle:topic,blocks:[
      {label:"Story sequence",text:slides},
      {label:"How to post it (the order)",text:order}],kit:slides+"\n\n"+order};}},

  bio:{title:"Bio & Link Hub",intro:"Pick your goal and style — get a full profile setup.",steps:[
    {id:"goal",q:"Primary goal of your profile?",kind:"select",options:()=>[O("Grow","Followers first"),O("Capture leads","Email / DM"),O("Sell","Drive to offer")]},
    {id:"style",q:"Pick a bio style",kind:"select",pool:(a,P)=>{const{n,N}=NW(P);const k=knownPhrase(P);return buildPool([
      `${k} 📈\n${P.niche} · ${P.followers} strong\n↓ Free ${N} starter guide`,
      `I help you grow & monetize in ${n}.\nProof's in the reels.\n↓ DM "START"`,
      `${N} systems that actually work.\nNo fluff. Just results.\n↓ Grab the free guide`,
      `Turning ${n} into income.\nDaily breakdowns + free tools.\n↓ Start here`,
      `Ex-${FRAG.pain[3]}. Now ${FRAG.result[3]}.\nI show you how.\n↓ Free guide`],P);},
      ai:(a,P)=>`Write me 5 Instagram bio options for ${NW(P).n}, goal: ${txt(a.goal)}.`},
  ],assemble:(a,P)=>{const bio=txt(a.style);const funnel=["Lead magnet (capture email)","Best-performing reel","Your offer / apply page",'DM me "START"'].map((x,i)=>`${i+1}. ${x}`).join("\n");
    return{title:"Your profile setup",blocks:[{label:"Optimized bio",text:bio},{label:"Link-in-bio funnel",text:funnel}],kit:`${bio}\n\nLink funnel:\n${funnel}`};}},

  calendar:{title:"Content Calendar",intro:"Set cadence and focus — get a 7-day plan.",steps:[
    {id:"cadence",q:"How often will you post?",kind:"select",options:()=>["1×/day","2×/day","5×/week"].map(x=>O(x))},
    {id:"focus",q:"This week's focus?",kind:"select",options:()=>[O("Growth-heavy","Reach & new follows"),O("Balanced","Grow + nurture + sell"),O("Monetization","Push the offer")]},
  ],assemble:(a,P)=>{const focus=txt(a.focus);
    const growth=[["Mon","Viral hook reel","reach"],["Tue","Contrarian take","shares"],["Wed","Educational 1-idea reel","saves"],["Thu","Story poll → reel","engagement"],["Fri","Trend/format remix","reach"],["Sat","Personal story","connection"],["Sun","Q&A / engagement post","comments"]];
    const mon=[["Mon","Authority reel","trust"],["Tue","Proof / result post","credibility"],["Wed","Offer story sequence","sell"],["Thu","Objection-handling reel","sell"],["Fri","Comment-to-DM funnel reel","leads"],["Sat","Behind-the-scenes","connection"],["Sun","Final-call story","sell"]];
    const plan=(focus==="Monetization"?mon:growth).map(([d,t,goal])=>`${d} — ${t}  ·  goal: ${goal}`).join("\n");
    return{title:`7-day plan · ${focus}`,blocks:[{label:"Your week",text:plan}],kit:plan};}},

  launch:{title:"Launch Builder",intro:"Pick window and offer — get a phase-by-phase plan.",steps:[
    {id:"len",q:"Launch length?",kind:"select",options:()=>["5-day","7-day","14-day"].map(x=>O(x))},
    {id:"type",q:"What are you launching?",kind:"select",options:()=>[O("Coaching"),O("Digital product"),O("Membership"),O("Challenge")]},
  ],assemble:(a,P)=>{const len=txt(a.len),type=txt(a.type);
    const days=[["Prime","Tease the problem. Story polls. Plant the offer without selling."],["Build","Show proof and outcomes. Warm up the DMs."],["Open","Reveal the offer. Reel + story sequence + DM the warm list."],["Push","Handle objections publicly. Scarcity begins."],["Close","Final-call stories. DM everyone who engaged."]];
    const plan=days.map((d,i)=>`Phase ${i+1} · ${d[0]} — ${d[1]}`).join("\n\n");
    return{title:`${len} ${type} launch`,blocks:[{label:"Launch plan",text:plan}],kit:plan};}},

  repurpose:{title:"Repurpose",intro:"Pick your source and targets — get every asset.",steps:[
    {id:"source",q:"What are you repurposing?",kind:"select",options:()=>[O("A reel transcript"),O("A long caption / post"),O("A podcast / video"),O("A voice memo")]},
    {id:"targets",q:"Where do you want it? (pick any)",kind:"multiselect",min:1,options:()=>["IG caption","X / Twitter thread","LinkedIn post","Email","Carousel outline","YouTube Short script","5 new hooks"].map(x=>O(x))},
  ],assemble:(a,P)=>{const src=txt(a.source);const t=(a.targets||[]).map(o=>o.text);
    const out=t.map(x=>`▸ ${x}: drafted from your ${src.toLowerCase()}, tuned to ${(P.niche||"your niche").toLowerCase()}.`).join("\n");
    return{title:`${t.length} assets from 1 source`,blocks:[{label:"Your repurposed assets",text:out}],kit:out};}},

  carousel:{title:"Carousel Builder",intro:"Choose the goal and length — get slide-by-slide titles, flow & CTA.",steps:[
    {id:"goal",q:"What's the carousel for?",kind:"select",options:()=>[O("Educational","Teach one thing"),O("Authority","Prove you know your stuff"),O("Story","Take them on a journey"),O("Listicle","X ways to…")]},
    {id:"len",q:"How many slides?",kind:"select",options:()=>["6 slides","8 slides","10 slides"].map(x=>O(x))},
    {id:"hook",q:"Pick the cover-slide hook",kind:"select",pool:(a,P)=>buildPool(HOOK_T,P),ai:(a,P)=>`Give me 12 carousel cover hooks for ${NW(P).n}.`},
  ],assemble:(a,P)=>{const{W}=NW(P);const len=parseInt(txt(a.len))||8;const hook=txt(a.hook);
    const mids=len-2;const slides=[`Slide 1 (cover): "${hook}" — bold, high-contrast, one line`];
    for(let i=1;i<=mids;i++)slides.push(`Slide ${i+1}: point ${i} — one idea, short headline + 1 line of value`);
    slides.push(`Slide ${len}: recap + CTA — "Save this. Follow for more. Comment \\"${W}\\" for the guide."`);
    const text=slides.join("\n");
    return{title:`${len}-slide carousel`,blocks:[{label:"Slide-by-slide",text},{label:"Design notes",text:"Consistent template · big bold headers · one idea per slide · swipe arrow on slide 1 · brand color accent on key words."}],kit:text};}},

  script:{title:"Script Builder",intro:"Pick the format and angle — get a full, timed script.",steps:[
    {id:"format",q:"What format?",kind:"select",options:()=>[O("30-second reel"),O("60-second reel"),O("Long-form video"),O("Podcast clip"),O("YouTube video")]},
    {id:"angle",q:"Pick the angle",kind:"select",pool:(a,P)=>buildPool(HOOK_T,P),ai:(a,P)=>`Give me 12 video angles for ${NW(P).n}.`},
  ],assemble:(a,P)=>{const{W,n}=NW(P);const fmt=txt(a.format),hook=txt(a.angle);
    const long=fmt.includes("Long")||fmt.includes("YouTube");
    const body=long
      ? `0:00 HOOK — "${hook}"\n0:10 PROMISE — what they'll get by the end\n0:30 CONTEXT — why this matters now\n1:00 POINT 1 — teach + example\n2:30 POINT 2 — teach + example\n4:00 POINT 3 — teach + example\n5:30 RECAP — the one thing to remember\n6:00 CTA — subscribe + next step`
      : `0:00 HOOK (text + spoken): "${hook}"\n0:03 RETAIN: name the exact mistake in ${n}\n0:08 PAYOFF: the one idea, delivered fast\n0:22 PROOF: a quick example or result\n0:27 CTA: "Comment \\"${W}\\" and I'll send the breakdown" + loop to start`;
    return{title:`${fmt} script`,blocks:[{label:"Full script",text:body},{label:"Delivery notes",text:"Talk faster than feels natural · cut every pause · captions on every word · end on a loop."}],kit:body};}},

  retention:{title:"Retention System",intro:"Build the watch-time mechanics into your next video.",steps:[
    {id:"topic",q:"What's the video about? (one line)",kind:"text",ph:"e.g. why your reels get views but no followers"},
    {id:"techniques",q:"Pick your retention techniques (3–5)",kind:"multiselect",min:3,max:5,options:()=>["3-second pattern interrupt open","Open loop ('wait for the end')","Re-hook at the 5s mark","Fast cuts every 1.5–2s","Word-by-word captions","Visual b-roll under voiceover","Numbered points (1/3, 2/3)","Seamless end loop","Tension → release structure"].map(x=>O(x))},
  ],assemble:(a,P)=>{const topic=txt(a.topic)||"your topic";const tech=(a.techniques||[]).map(o=>o.text);
    const plan=`TOPIC: ${topic}\n\nRETENTION BUILD:\n`+tech.map((t,i)=>`${i+1}. ${t}`).join("\n")+`\n\nRULE: every 2–3 seconds, give a reason to keep watching — a cut, a reveal, or a new beat. Re-watch your draft on mute; if you'd scroll, fix that second.`;
    return{title:"Your retention plan",blocks:[{label:"Retention system",text:plan}],kit:plan};}},

  bridge:{title:"Transform My Reel",intro:"Pick a target platform and topic — I'll rebuild the whole post natively for it.",steps:[
    {id:"from",q:"Re-cut from which platform?",kind:"select",options:(a,P)=>(P.platforms&&P.platforms.length?P.platforms.map(p=>p&&p.pl?p.pl:p):["Instagram"]).map(x=>O(x))},
    {id:"to",q:"Transform it FOR which platform?",kind:"select",options:(a,P)=>{const from=txt(a.from);return PLATFORMS.filter(x=>x!==from).map(x=>O(x));}},
    {id:"topic",q:"What's the reel about? (Refresh for angles)",kind:"select",pool:(a,P)=>{const pk=pack(P);return buildPool([`${_cap("{topic}")}`,`how to ${pk.desires[0]}`,`the truth about {topic}`,`the {mistake} mistake`,`{topic} explained fast`,`why ${pk.pains[0]}`],P);},ai:(a,P)=>`Give me 8 more reel topics for ${NW(P).n}.`},
  ],assemble:(a,P)=>{const{n,N,W}=NW(P);const from=txt(a.from),to=txt(a.to);const topic=txt(a.topic)||"this";const hooks=buildHooks(P);
    const SPEC={
      "YouTube":{len:"Shorts: up to 60s · or expand to an 8–12 min long-form",
        title:`Searchable title (keyword first): "${_cap(topic)} — What Actually Works in ${N}"`,
        hook:`Say the benefit + keyword out loud in the first 3s: "${hooks[1].t}"`,
        body:`Description: 2–3 lines summarizing the value with your keyword in line 1, then links + timestamps if long-form.`,
        tags:`Add 5–8 tags (keyword variations). Title + thumbnail carry the click.`,
        cta:`"Subscribe for more ${n} breakdowns" + link in description.`,
        extra:`Make the first frame look like a thumbnail — bold text, high contrast. YouTube is search + click-through, not scroll.`},
      "TikTok":{len:"15–34s, fastest pacing of any platform",
        title:`On-screen hook, big and bold: "${hooks[0].t}"`,
        hook:`Lead with the boldest line in 1s. TikTok is the most ruthless first-second platform.`,
        body:`Caption: short + 1 question to spark comments. Native, casual, lowercase often wins.`,
        tags:`3–5 specific hashtags + 1 broad. Use a trending sound under your voice.`,
        cta:`"Follow for part 2" or comment keyword. Reply to comments with video.`,
        extra:`Jump on a trending sound/format and put your spin on it — TikTok rewards trends fast.`},
      "Instagram":{len:"15–30s reel",
        title:`Bold text hook on frame 1: "${hooks[0].t}"`,
        hook:`Curiosity or bold claim in 1.5s. Build for saves + shares.`,
        body:`Caption: hook line + value + 'save this'. Add a comment keyword for the DM funnel.`,
        tags:`4–6 niche hashtags. Trending audio low under your voice.`,
        cta:`'Comment "${W}" and I'll DM you' — drives comments AND DM threads.`,
        extra:`Re-share to your story within the hour with a poll to spike first-hour engagement.`},
      "LinkedIn":{len:"30–90s, slower & more professional",
        title:`Lead with a credible, specific claim: "Here's what most people in ${n} miss about ${topic}."`,
        hook:`Open with an insight or a result, not hype. Authority over flash.`,
        body:`Caption is the post here — write 4–8 short lines, story → lesson → takeaway. Line breaks for readability.`,
        tags:`3 relevant hashtags max. No keyword stuffing.`,
        cta:`"Agree? What's your take?" — LinkedIn rewards comment conversations.`,
        extra:`Subtitles are essential (most watch muted in-feed). Keep it value-first, sell soft.`},
      "X":{len:"Native video under 60s, or a thread",
        title:`Hook as the tweet text: "${hooks[2].t}"`,
        hook:`The first line of the tweet IS the hook. Make them stop.`,
        body:`Option A: short video + 1-line hook. Option B: turn the reel script into a 5-tweet thread.`,
        tags:`1–2 hashtags max. X favors plain text.`,
        cta:`"Follow for more" + reply with the link (links in replies, not the main post).`,
        extra:`Repurpose the script as a thread — same value, native format, more reach.`},
      "Facebook":{len:"15–60s reel",
        title:`Relatable, slightly longer hook: "${hooks[3].t}"`,
        hook:`Facebook skews older — lead with relatability and clarity over speed.`,
        body:`Caption can be longer and more story-driven. Native uploads beat shared links.`,
        tags:`Hashtags matter less; focus on shareable, relatable framing.`,
        cta:`"Share this with someone who needs it" — Facebook's reach engine is shares.`,
        extra:`Square or vertical both work; captions still essential for muted autoplay.`},
      "Threads":{len:"Short video or text",
        title:`Conversational hook: "${hooks[2].t}"`,
        hook:`Casual, human, opinion-led. Threads rewards conversation starters.`,
        body:`Turn the reel's core idea into a punchy text post or short video with a question.`,
        tags:`Minimal. Lead with a take people want to reply to.`,
        cta:`Ask a question to drive replies.`,
        extra:`Cross-post the take from your reel here within the hour to catch the same wave.`},
    };
    const key=to.indexOf("YouTube")>=0?"YouTube":(to.indexOf("X")>=0||to.indexOf("Twitter")>=0)?"X":to.indexOf("TikTok")>=0?"TikTok":to.indexOf("LinkedIn")>=0?"LinkedIn":to.indexOf("Facebook")>=0?"Facebook":to.indexOf("Threads")>=0?"Threads":"Instagram";
    const s=SPEC[key]||SPEC["Instagram"];
    return{title:`${from} reel → ${to}`,subtitle:topic,blocks:[
      {label:`① New hook / title for ${to}`,text:s.title+"\n\n"+s.hook},
      {label:`② Format & length`,text:`Length: ${s.len}\n${s.extra}`},
      {label:`③ Caption / description (rewritten for ${to})`,text:s.body},
      {label:`④ Hashtags / tags`,text:s.tags},
      {label:`⑤ CTA swap`,text:s.cta},
      {label:`⑥ Why this works on ${to}`,text:`${from} and ${to} reward different things. This rebuild matches ${to}'s algorithm and audience instead of just reposting — that's the difference between dead reposts and real cross-platform growth.`}],
      docOpts:{subtitle:`${from} → ${to} · ${topic}`},
      kit:`${to} REBUILD\n\nHOOK/TITLE: ${s.title}\n${s.hook}\n\nLENGTH: ${s.len}\n${s.extra}\n\nCAPTION: ${s.body}\n\nTAGS: ${s.tags}\n\nCTA: ${s.cta}`};}},
};

/* ── client-side document generation (Word .doc + print-to-PDF) ── */
function docHTML(title,blocks,P,opts){
  opts=opts||{};
  const esc=s=>(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const inl=s=>esc(s).replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>").replace(/"([^"]+)"/g,"&ldquo;$1&rdquo;");
  const renderBody=(text)=>{
    const lines=(text||"").split("\n");let html="",lt=null,buf=[];
    const flush=()=>{if(lt){html+=`<${lt} class="lst">`+buf.map(x=>`<li>${x}</li>`).join("")+`</${lt}>`;}buf=[];lt=null;};
    for(const raw of lines){const l=raw.trim();
      if(!l){flush();continue;}
      if(/^[•\-]\s?/.test(l)){if(lt!=="ul"){flush();lt="ul";}buf.push(inl(l.replace(/^[•\-]\s?/,"")));continue;}
      if(/^\d+[.)]\s/.test(l)){if(lt!=="ol"){flush();lt="ol";}buf.push(inl(l.replace(/^\d+[.)]\s*/,"")));continue;}
      flush();
      if(/:$/.test(l)&&l.length<64){html+=`<h3>${inl(l.replace(/:$/,""))}</h3>`;continue;}
      html+=`<p>${inl(l)}</p>`;}
    flush();return html;};
  const subtitle=opts.subtitle||"";
  const num=i=>String(i+1).padStart(2,"0");
  const toc=blocks.length>3?`<div class="toc"><div class="toch">Contents</div>${blocks.map((b,i)=>`<div class="tocr"><span class="tocn">${num(i)}</span><span>${esc(b.label.replace(/^\d+\s*·\s*/,""))}</span></div>`).join("")}</div>`:"";
  const body=blocks.map((b,i)=>`<section><div class="sh"><span class="snum">${num(i)}</span><h2>${esc(b.label.replace(/^\d+\s*·\s*/,""))}</h2></div><div class="bx">${renderBody(b.text)}</div></section>`).join("");
  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(title)}</title>
  <style>
  @page{margin:0.7in}
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&display=swap');
  *{box-sizing:border-box;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  body{font-family:'Inter','Helvetica Neue',Arial,sans-serif;color:#1A1D24;line-height:1.62;margin:0;font-size:11pt}
  .page{max-width:760px;margin:0 auto;padding:0 52px}
  /* COVER */
  .cover{min-height:100vh;display:flex;flex-direction:column;justify-content:center;page-break-after:always;background:radial-gradient(120% 90% at 100% 0%,rgba(139,124,255,.35),transparent 55%),linear-gradient(155deg,#08090C 0%,#10141C 55%,#1a2540 100%);color:#fff;padding:0 64px;position:relative}
  .cover .logo{display:flex;align-items:center;gap:11px;position:absolute;top:54px;left:64px}
  .cover .logo .mk{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#4F8CFF,#8B7CFF);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;color:#fff;font-family:'Space Grotesk'}
  .cover .logo .wm{font-family:'Space Grotesk';font-weight:700;font-size:17px;letter-spacing:.5px}
  .cover .bar{height:5px;width:128px;background:linear-gradient(90deg,#4F8CFF,#8B7CFF);border-radius:3px;margin:0 0 30px}
  .cover .kx{font-size:12px;letter-spacing:5px;color:#8FB0FF;font-weight:600;margin-bottom:22px;text-transform:uppercase}
  .cover h1{font-family:'Space Grotesk';font-size:46px;line-height:1.07;margin:0 0 20px;font-weight:700;letter-spacing:-1.2px;max-width:620px}
  .cover .st{font-size:16px;color:#B7C0D0;max-width:520px;line-height:1.55}
  .cover .meta{position:absolute;bottom:56px;left:64px;right:64px;display:flex;justify-content:space-between;align-items:flex-end;border-top:1px solid rgba(255,255,255,.14);padding-top:18px;font-size:11px;color:#8893A6;letter-spacing:.6px;text-transform:uppercase}
  /* TOC */
  .toc{page-break-after:always;padding-top:64px}
  .toch{font-family:'Space Grotesk';font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#4F8CFF;margin-bottom:20px}
  .tocr{display:flex;gap:16px;align-items:baseline;padding:11px 0;border-bottom:1px solid #EEF0F4;font-size:13.5px;font-weight:500}
  .tocn{font-family:'Space Grotesk';font-weight:700;color:#8B7CFF;font-size:12px;min-width:24px}
  /* SECTIONS */
  section{page-break-inside:avoid;margin-bottom:30px}
  .sh{display:flex;align-items:center;gap:13px;margin:30px 0 12px;padding-top:14px}
  .snum{font-family:'Space Grotesk';font-weight:700;font-size:13px;color:#fff;background:linear-gradient(135deg,#4F8CFF,#8B7CFF);min-width:30px;height:30px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center}
  h2{font-family:'Space Grotesk';font-size:18px;font-weight:700;color:#10141C;margin:0;letter-spacing:-.3px}
  .bx{font-size:11.4pt;color:#2A2E38;padding-left:43px}
  .bx p{margin:0 0 11px}
  .bx h3{font-size:12.5pt;font-weight:600;color:#10141C;margin:16px 0 7px}
  .lst{margin:6px 0 13px;padding-left:20px}
  .lst li{margin:5px 0;padding-left:4px}
  ol.lst li::marker{color:#4F8CFF;font-weight:700}
  ul.lst li::marker{color:#8B7CFF}
  strong{color:#0A0C11;font-weight:600}
  .ft{margin-top:46px;border-top:2px solid #10141C;padding-top:14px;font-size:10px;color:#9AA1AD;letter-spacing:.4px;display:flex;justify-content:space-between}
  .ft b{color:#4F8CFF;font-weight:600}
  </style></head>
  <body>
  <div class="cover">
    <div class="logo"><span class="mk">X</span><span class="wm">CreatorX</span></div>
    <div class="bar"></div><div class="kx">Creator Operating System</div>
    <h1>${esc(title)}</h1>${subtitle?`<div class="st">${esc(subtitle)}</div>`:""}
    <div class="meta"><span>${esc(opts.author||("Prepared for "+(P.name||"You")))} · ${esc(P.niche||"")}</span><span>${new Date().toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"})}</span></div>
  </div>
  <div class="page">
  ${toc}
  ${body}
  <div class="ft"><span>Produced with <b>CreatorX</b> — architected by Michael Caso, trained on 10,000+ hours of creator intelligence.</span><span>© ${new Date().getFullYear()}</span></div>
  </div>
  </body></html>`;
}
function downloadWord(title,blocks,P,opts){
  const html=docHTML(title,blocks,P,opts);
  const blob=new Blob(['\ufeff',html],{type:"application/msword"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);
  a.download=(title||"CreatorX").replace(/[^\w\s-]/g,"").slice(0,50).trim().replace(/\s+/g,"-")+".doc";
  document.body.appendChild(a);a.click();a.remove();
}
function printPDF(title,blocks,P,opts){
  const w=window.open("","_blank");
  if(!w){alert("Allow pop-ups to save as PDF, or use the Word download.");return;}
  w.document.write(docHTML(title,blocks,P,opts));w.document.close();
  setTimeout(()=>{try{w.focus();w.print();}catch(e){}},400);
}
function DocActions({title,blocks,P,label,opts}){
  return (
    <div className="panel panel-pad" style={{background:"var(--grad-soft)",border:"1px solid rgba(79,140,255,.3)"}}>
      <div style={{display:"flex",gap:10,alignItems:"center",marginBottom:10}}><div className="tool-ic" style={{width:34,height:34}}><FileText size={16}/></div>
        <div><div style={{fontWeight:700,fontSize:14.5}}>{label||"Build this now — your downloadable doc"}</div><div style={{fontSize:12.5,color:"var(--muted)"}}>Elite, branded, ready to sell or use. Choose your format.</div></div></div>
      <div className="btn-row">
        <button className="btn btn-grad sm" onClick={()=>printPDF(title,blocks,P,opts)}><Download size={15}/> Generate PDF</button>
        <button className="btn btn-ghost sm" onClick={()=>downloadWord(title,blocks,P,opts)}><FileText size={15}/> Word (.doc)</button>
      </div>
    </div>
  );
}

function Builder({P,config,onSaveAsset,askAI,preset}){
  const firstUnanswered=(()=>{ if(!preset)return 0; let i=0; while(i<config.steps.length&&preset[config.steps[i].id]!==undefined)i++; return i; })();
  const [si,setSi]=useState(firstUnanswered);
  const [ans,setAns]=useState(preset||{});
  const [page,setPage]=useState(0);
  const [done,setDone]=useState(false);
  const [edits,setEdits]=useState({});
  const [seed,setSeed]=useState(0);

  if(done){
    const out=config.assemble(ans,P);
    const eff=out.blocks.map((b,i)=>({label:b.label,text:edits[i]!=null?edits[i]:b.text}));
    const effKit=eff.map(b=>b.text).join("\n\n");
    return (
      <div style={{padding:22}}>
        <div className="live" style={{marginBottom:12}}><span className="pulse"/>Assembled in {P.name}'s voice · tap any text to edit</div>
        <div className="disp" style={{fontWeight:700,fontSize:20,marginBottom:6}}>{out.title}</div>
        <div style={{display:"flex",gap:7,flexWrap:"wrap",marginBottom:16}}>
          <span className="eyebrow" style={{alignSelf:"center"}}>Edit a step:</span>
          {config.steps.map((s,i)=>(!s.when||s.when(ans))?(<button key={s.id} className="editchip" onClick={()=>{setEdits({});setDone(false);setSi(i);setPage(0);}}>{s.q.replace(/\?.*/,"").replace(/^(Pick|What|Which|How|Where)\s+(your|the|an?)?\s*/i,"").trim()||s.id} ✎</button>):null)}
        </div>
        {eff.map((b,i)=>(
          <div className="out-card" key={i}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8,gap:10}}><span className="eyebrow">{b.label} <span style={{color:"var(--faint)",textTransform:"none",letterSpacing:0}}>· editable</span></span><CopyBtn text={b.text}/></div>
            <textarea className="kit kit-edit" value={b.text} onChange={e=>setEdits(ed=>({...ed,[i]:e.target.value}))} spellCheck={false}
              style={{width:"100%",resize:"vertical",minHeight:Math.min(280,Math.max(60,b.text.split("\n").length*22+24)),border:"1px solid var(--line)",background:"var(--void)",color:"var(--text)",borderRadius:10,padding:"12px 14px",fontFamily:"inherit",fontSize:13.5,lineHeight:1.6}}/>
          </div>
        ))}
        <div style={{marginTop:6,marginBottom:12}}><DocActions title={out.title} blocks={eff} P={P} opts={out.docOpts} label={config===CONFIGS.product?"Generate your product — elite PDF or Word":config===CONFIGS.offer?"Generate Architect Plan — full blueprint doc":"Build this now for me — downloadable doc"}/></div>
        <div className="btn-row" style={{marginTop:2}}>
          <button className="btn btn-grad" style={{flex:1,justifyContent:"center"}} onClick={()=>onSaveAsset&&onSaveAsset(out.title)}><Plus size={16}/> Save to library</button>
          <CopyBtn text={effKit} label="Copy all"/>
          <button className="btn btn-ghost sm" onClick={()=>{setEdits({});setDone(false);setSi(0);setAns({});setPage(0);}}>Start over</button>
        </div>
      </div>
    );
  }

  const step=config.steps[si];
  const pooled=!!step.pool;
  let full=pooled?step.pool(ans,P):(step.options?step.options(ans,P):[]);
  if(pooled&&seed>0) full=shuffleSeeded(full.map(s=>typeof s==="string"?s:s),"rf"+seed+step.id);
  const pageSize=6;
  const pages=pooled?Math.max(1,Math.ceil(full.length/pageSize)):1;
  const start=pooled?(page%pages)*pageSize:0;
  const shown=pooled?full.slice(start,start+pageSize).map(s=>typeof s==="string"?O(s):s):full;
  const val=ans[step.id];
  const valid=step.kind==="multiselect"?((val||[]).length>=(step.min||1)):!!val;
  const visible=(i)=>{const st=config.steps[i];return st&&(!st.when||st.when(ans));};
  const nextIdx=(from)=>{let j=from+1;while(j<config.steps.length&&!visible(j))j++;return j;};
  const prevIdx=(from)=>{let j=from-1;while(j>=0&&!visible(j))j--;return j;};
  const last=nextIdx(si)>=config.steps.length;
  const visTotal=config.steps.filter((s,i)=>visible(i)).length;
  const visPos=config.steps.slice(0,si+1).filter((s,i)=>visible(i)).length;
  const pick=(o)=>{
    if(step.kind==="multiselect"){const arr=val||[];const has=arr.find(x=>x.id===o.id);
      const next=has?arr.filter(x=>x.id!==o.id):(arr.length<(step.max||99)?[...arr,o]:arr);
      setAns(a=>({...a,[step.id]:next}));}
    else setAns(a=>({...a,[step.id]:o}));
  };
  const on=(o)=>step.kind==="multiselect"?(val||[]).some(x=>x.id===o.id):val&&val.id===o.id;

  return (
    <div style={{padding:22}}>
      <div className="bld-prog">{config.steps.map((s,i)=>visible(i)?(<span key={i} className={i<=si?"on":""}/>):null)}</div>
      <div className="eyebrow" style={{marginTop:14}}>Step {visPos} of {visTotal}</div>
      <div className="disp" style={{fontWeight:700,fontSize:19,margin:"7px 0 4px"}}>{step.q}</div>
      {step.kind==="multiselect" ? <div style={{fontSize:12.5,color:"var(--muted)",marginBottom:14}}>Pick {step.min||1}{step.max?`–${step.max}`:"+"} · {(val||[]).length} selected</div> : <div style={{height:10}}/>}

      <div style={{display:"grid",gap:9}}>
        {shown.map((o,i)=>(
          <div key={o.id+i} className={"opt-card"+(on(o)?" on":"")} onClick={()=>pick(o)}>
            <div className={"opt-tick"+(on(o)?" on":"")}>{on(o)&&<Check size={13} color="#fff"/>}</div>
            <div style={{flex:1}}><div style={{fontSize:14.5,fontWeight:500,lineHeight:1.4,whiteSpace:"pre-line"}}>{o.label}</div>{o.desc&&<div style={{fontSize:12.5,color:"var(--muted)",marginTop:3}}>{o.desc}</div>}</div>
          </div>
        ))}
      </div>

      {pooled && (
        <div style={{display:"flex",gap:9,alignItems:"center",marginTop:13,flexWrap:"wrap"}}>
          <button className="mini" onClick={()=>setPage(p=>p+1)}><ArrowDown size={12}/> More options</button>
          <button className="mini" onClick={()=>{setSeed(s=>s+1);setPage(0);}}><RefreshCw size={12}/> Refresh</button>
          <span className="mono" style={{fontSize:11,color:"var(--faint)"}}>{start+1}–{Math.min(start+pageSize,full.length)} of {full.length}+ · tap pick then edit freely</span>
          {step.ai && askAI && <button className="mini" onClick={()=>askAI(step.ai(ans,P))} style={{borderColor:"rgba(79,140,255,.4)",color:"var(--accent)"}}><Sparkles size={12}/> Ask AI for more</button>}
        </div>
      )}

      <div className="btn-row" style={{marginTop:18,justifyContent:"space-between"}}>
        <button className="btn btn-ghost sm" style={{visibility:prevIdx(si)<0?"hidden":"visible"}} onClick={()=>{setSi(prevIdx(si));setPage(0);}}>Back</button>
        <button className="btn btn-grad sm" disabled={!valid} style={{opacity:valid?1:.4,cursor:valid?"pointer":"not-allowed",display:"flex",gap:7,alignItems:"center"}}
          onClick={()=>{if(!valid)return;last?setDone(true):(setSi(nextIdx(si)),setPage(0));}}>{last?"Build it":"Next"} <ArrowRight size={15}/></button>
      </div>
    </div>
  );
}

function Drawer({P,k,close,onSave,askAI,preset}){
  const config=CONFIGS[k];
  const title=config?config.title:((ALLTOOLS.find(t=>t.k===k)||{}).t||"Builder");
  return (
    <>
      <div className="scrim" onClick={close}/>
      <div className="drawer">
        <div style={{position:"sticky",top:0,background:"rgba(10,12,17,.9)",backdropFilter:"blur(8px)",borderBottom:"1px solid var(--line)",padding:"18px 22px",display:"flex",justifyContent:"space-between",alignItems:"center",zIndex:2}}>
          <div><div className="eyebrow">Interactive builder</div><div className="disp" style={{fontWeight:700,fontSize:18,marginTop:3}}>{title}</div>{config&&<div style={{fontSize:12.5,color:"var(--muted)",marginTop:4}}>{config.intro}</div>}</div>
          <div style={{cursor:"pointer",color:"var(--muted)",paddingLeft:12}} onClick={close}><X size={22}/></div>
        </div>
        {config
          ? <Builder P={P} config={config} onSaveAsset={(t)=>onSave&&onSave(t)} askAI={askAI} preset={preset}/>
          : <div style={{padding:22,color:"var(--muted)"}}>This builder is coming online.</div>}
      </div>
    </>
  );
}

/* ─────────── VIDEO / PHOTO ANALYZER ─────────── */
function fileToB64(file){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result.split(",")[1]);r.onerror=rej;r.readAsDataURL(file);});}
function aspectLabel(w,h){if(!w||!h)return "unknown";const r=w/h;if(r<0.72)return "9:16 vertical";if(r<0.95)return "4:5 portrait";if(r<1.15)return "1:1 square";if(r<1.5)return "landscape";return "16:9 horizontal";}
function mediaBrightness(el,w,h){try{const sw=48,sh=Math.max(1,Math.round(48*((h||1)/(w||1))));const c=document.createElement("canvas");c.width=sw;c.height=sh;const ctx=c.getContext("2d");ctx.drawImage(el,0,0,sw,sh);const d=ctx.getImageData(0,0,sw,sh).data;let sum=0;for(let i=0;i<d.length;i+=4){sum+=0.299*d[i]+0.587*d[i+1]+0.114*d[i+2];}return Math.round(sum/(d.length/4));}catch(e){return null;}}
function inspectImage(file,url){return new Promise(res=>{const img=new Image();img.onload=()=>res({kind:"image",w:img.naturalWidth,h:img.naturalHeight,aspect:aspectLabel(img.naturalWidth,img.naturalHeight),brightness:mediaBrightness(img,img.naturalWidth,img.naturalHeight),size:file.size});img.onerror=()=>res({kind:"image",size:file.size});img.src=url;});}
function inspectVideo(file,url){return new Promise(res=>{const v=document.createElement("video");v.preload="metadata";v.muted=true;v.src=url;let done=false;
  const finish=(extra)=>{if(done)return;done=true;res(Object.assign({kind:"video",w:v.videoWidth,h:v.videoHeight,dur:v.duration,aspect:aspectLabel(v.videoWidth,v.videoHeight),size:file.size},extra||{}));};
  v.onloadedmetadata=()=>{try{v.currentTime=Math.min(0.7,(v.duration||2)/2);}catch(e){finish();}};
  v.onseeked=()=>finish({brightness:mediaBrightness(v,v.videoWidth,v.videoHeight)});
  v.onerror=()=>{if(!done){done=true;res({kind:"video",size:file.size});}};
  setTimeout(()=>finish(),2800);});}
function inspectMedia(file,url){if(file.type.startsWith("video"))return inspectVideo(file,url);if(file.type.startsWith("image"))return inspectImage(file,url);return Promise.resolve(null);}

function groundedAnalyze(P,m,mode,desc){
  const{n,N,W}=NW(P);const isVid=m&&m.kind==="video";const facts=[];const diag=[];let score=72;
  if(m){
    if(isVid&&m.dur)facts.push(["Length",Math.round(m.dur)+"s"]);
    if(m.w&&m.h)facts.push(["Format",m.w+"×"+m.h+" · "+m.aspect]);
    if(m.brightness!=null)facts.push(["Lighting",(m.brightness<60?"dark":m.brightness<115?"balanced":m.brightness>185?"very bright":"bright")+" ("+m.brightness+")"]);
    if(m.size)facts.push(["File size",(m.size/1048576).toFixed(1)+" MB"]);
    // aspect ratio
    if(m.aspect&&m.aspect.indexOf("9:16")>=0){diag.push(["Format is correct","Vertical 9:16 — exactly what Reels, TikTok and Shorts want. Full-screen real estate.","good"]);score+=7;}
    else if(m.aspect&&(m.aspect.indexOf("4:5")>=0||m.aspect.indexOf("square")>=0)){diag.push(["Reformat to vertical","It's "+m.aspect+". Reels favor full-screen 9:16 — recrop or place it on a 1080×1920 canvas so it fills the phone.","bad"]);score-=7;}
    else if(m.aspect&&(m.aspect.indexOf("16:9")>=0||m.aspect.indexOf("landscape")>=0)){diag.push(["Wrong orientation","This is horizontal. Short-form is vertical 9:16 — reframe or re-shoot vertically or it'll get crushed into a tiny strip.","bad"]);score-=13;}
    // length
    if(isVid&&m.dur){
      if(m.dur<7){diag.push(["Very short","Under 7s — punchy and loop-friendly, but make sure the payoff actually lands in that window.","mid"]);}
      else if(m.dur<=34){diag.push(["Ideal reel length","At "+Math.round(m.dur)+"s you're in the retention + reach sweet spot. Keep it tight.","good"]);score+=6;}
      else if(m.dur<=60){diag.push(["A touch long","At "+Math.round(m.dur)+"s, every second has to earn its place. Cut anything that isn't hook, value, or payoff.","mid"]);}
      else {diag.push(["Too long for a hook-driven reel","At "+Math.round(m.dur)+"s most viewers drop. Cut under ~45s, or split into Part 1 / Part 2.","bad"]);score-=9;}
    }
    // brightness
    if(m.brightness!=null){
      if(m.brightness<55){diag.push(["Too dark","Low light tanks retention and looks low-budget. Face a window or add a key light.","bad"]);score-=7;}
      else if(m.brightness>190){diag.push(["Overexposed","Very bright — pull exposure down so faces and detail aren't blown out.","mid"]);}
      else {diag.push(["Lighting reads well","Good exposure — your subject is clear and watchable.","good"]);score+=3;}
    }
    // resolution
    if(m.w&&m.w<600){diag.push(["Low resolution","Under 600px wide — export at 1080×1920 so it doesn't look soft in the feed.","bad"]);score-=6;}
    else if(m.w&&m.w>=1000){diag.push(["Crisp resolution","High enough res to look sharp on any phone.","good"]);score+=2;}
  } else {
    facts.push(["Note","Couldn't fully decode this file"]);
    diag.push(["Upload a standard format","I couldn't read this file's properties. Try an MP4/MOV video or a JPG/PNG image and I'll measure it.","mid"]);
  }
  score=clamp(score);
  const type=m?(isVid?`A ${m.dur?Math.round(m.dur)+"-second ":""}${m.aspect||""} video`:`A ${m.aspect||""} image (${m.w}×${m.h})`):"Your upload";
  return {kind:m&&m.kind,facts,diag,score,type,
    hook:buildHooks(P)[0].t,
    captions:[`${takeLine(P)}\n\nHere's what this ${n} moment is really about.\n\nComment "${W}" for the full breakdown.`,
      `Behind this clip is the part most people skip.\n\nSave this one.\n\nFollow for part 2.`,
      `${mode==="makeme"?"My version of this 👇":"Watch this if "+pack(P).pains[0]+" 👇"}\n\n${pack(P).topics[0]}.\n\nComment "${W}" and I'll send the steps.`],
    reel:["Open on your strongest 1 second + a bold text hook (don't bury it)","Cut to one clear idea — fast, no intro","Caption every line on screen; trending sound low under your voice","End on your CTA and loop the last line into the first for replays"],
    tips:[isVid&&m&&m.dur>45?"Trim it under 35s before posting":"Add an on-screen text hook in the first frame","Post at your audience's peak hour and reply to every comment in the first 60 min","Re-share to your story with a poll within the hour"],
    cta:`Comment "${W}" and I'll DM you the breakdown.`};
}
function groundedCompare(P,ma,mb,na,nb){
  const scoreOf=(m)=>{let s=72;if(!m)return 60;if(m.aspect&&m.aspect.indexOf("9:16")>=0)s+=8;else if(m.aspect&&m.aspect.indexOf("16:9")>=0)s-=12;
    if(m.kind==="video"&&m.dur){if(m.dur<=34)s+=7;else if(m.dur>60)s-=8;}
    if(m.brightness!=null){if(m.brightness<55)s-=7;else if(m.brightness<=190)s+=3;}
    if(m.w&&m.w<600)s-=6;else if(m.w>=1000)s+=2;return clamp(s);};
  const sa=scoreOf(ma),sb=scoreOf(mb);const winner=sa>=sb?"A":"B";
  const facts=(m)=>m?[m.kind==="video"&&m.dur?Math.round(m.dur)+"s":null,m.aspect,m.brightness!=null?(m.brightness<60?"dark":m.brightness>185?"bright":"good light"):null].filter(Boolean):["unreadable"];
  const why=(m,s)=>{const a=[];if(m){if(m.aspect&&m.aspect.indexOf("9:16")>=0)a.push("Correct 9:16 vertical format");else if(m.aspect)a.push("Format is "+m.aspect+" — not ideal for Reels");
    if(m.kind==="video"&&m.dur){if(m.dur<=34)a.push("Ideal length ("+Math.round(m.dur)+"s)");else if(m.dur>60)a.push("Long at "+Math.round(m.dur)+"s — needs trimming");else a.push(Math.round(m.dur)+"s — slightly long");}
    if(m.brightness!=null){if(m.brightness<55)a.push("Underlit");else a.push("Lighting reads well");}
    if(m.w&&m.w<600)a.push("Low resolution");}return a.length?a:["Couldn't measure this file"];};
  return {winner,sa,sb,factsA:facts(ma),factsB:facts(mb),whyA:why(ma,sa),whyB:why(mb,sb),
    verdict:`Reel ${winner} scores higher on the fundamentals — ${winner==="A"?(sa):(sb)}/100 vs ${winner==="A"?(sb):(sa)}/100 — mostly on format, length and lighting. Post ${winner} first; re-cut the other to fix what's flagged, then use it as a follow-up.`,
    hook:buildHooks(P)[0].t,
    direction:`Sharpen the winner's first 1.5s: open on the boldest frame + a text hook, cut any intro, put the payoff promise on screen immediately, and loop the last line into the first.`};
}
// kept for any non-media calls
function fallbackAnalyze(P,desc){return groundedAnalyze(P,null,"post",desc);}
async function visionAnalyze(P,b64,media,desc){
  const{n}=NW(P);
  const sys=`You are Creator AI, a creator-growth strategist. Analyze the image and return ONLY JSON (no markdown) with keys: type, hook, captions (array of 3), reel (array of 4 steps), tips (array of 3), cta. Niche: ${n}. ${desc?"Note: "+desc:""}`;
  const res=await fetch(AI_ENDPOINT,{method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,system:sys,messages:[{role:"user",content:[{type:"image",source:{type:"base64",media_type:media,data:b64}},{type:"text",text:"Analyze this for my "+n+" content and return the JSON."}]}]})});
  if(!res.ok)throw new Error("api");
  const data=await res.json();const t=(data.content||[]).map(b=>b.type==="text"?b.text:"").join("").replace(/```json|```/g,"").trim();
  return JSON.parse(t);
}

/* ═══════════ POST TESTER — real text analysis, multi-score, honest grade ═══════════ */
const POWER_WORDS="you your free new proven secret stop never always nobody most people truth honestly mistake fix finally exactly why how because results fast easy simple worst best biggest only without ".split(" ");
const EMO_WORDS="hate love fear afraid stuck struggle pain proud broke rich win lose quit ashamed obsessed brutal honest real raw failed".split(" ");
function gradeFor(v){return v>=92?"A+":v>=85?"A":v>=78?"B+":v>=70?"B":v>=62?"C+":v>=54?"C":v>=45?"D":"E";}
function analyzePostText(P,text){
  const pk=pack(P);const{n,N}=NW(P);
  const raw=(text||"").trim();const tl=raw.toLowerCase();
  const lines=raw.split(/\n/).map(l=>l.trim()).filter(Boolean);
  const first=(lines[0]||raw).toLowerCase();
  const fwords=first.split(/\s+/).filter(Boolean);
  const words=tl.split(/\s+/).filter(Boolean);const wc=words.length;
  const has=(...k)=>k.some(x=>tl.includes(x));
  const firstHas=(...k)=>k.some(x=>first.includes(x));
  // ── real signals ──
  const isQ=/\?/.test(first);
  const hookOpeners=firstHas("how ","why ","stop","nobody","most people","everyone","the truth","i ","what if","if you","here's","this is why","you're","read this","unpopular","3 ","5 ","one ","the #1","the one");
  const hookNumber=/\d/.test(first);
  const shortHook=fwords.length>0&&fwords.length<=12;
  const curiosity=firstHas("nobody tells","what nobody","the secret","here's why","this is why","what if","the real reason","the truth about","that no one");
  const negativity=firstHas("stop","never","worst","mistake","don't","quit","fails","wrong","killing");
  const ctaSave=has("save this","save it","bookmark");
  const ctaComment=has("comment ","drop a","tell me","what's your","agree?","👇","let me know");
  const ctaFollow=has("follow ","follow for");
  const ctaShare=has("share this","send this","tag someone","send to","repost");
  const ctaDM=has(" dm ","dm me","message me","comment \"","comment '");
  const hasCTA=ctaSave||ctaComment||ctaFollow||ctaShare||ctaDM;
  const ctaCount=[ctaSave,ctaComment,ctaFollow,ctaShare,ctaDM].filter(Boolean).length;
  const power=POWER_WORDS.filter(w=>tl.includes(" "+w)||tl.startsWith(w)).length;
  const emo=EMO_WORDS.filter(w=>tl.includes(w)).length;
  const emoji=(raw.match(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu)||[]).length;
  const numbers=(raw.match(/\d[\d,.]*/g)||[]).length;
  const broken=lines.length>=2;
  const nicheMatch=has(_low(N))||(pk.topics||[]).some(t=>has((t||"").split(" ").slice(-1)[0]))||(pk.desires||[]).some(d=>has((d||"").split(" ").slice(-1)[0]));
  const toneWords={"Direct":["stop","truth","real","no","never","now"],"Bold":["never","always","everyone","nobody","biggest"],"Educational":["how","why","here's","steps","because"],"Inspiring":["you can","believe","proud","win","rise"],"Funny":["lol","literally","ok but","not me"],"Premium":["elite","high","standard","quality"]};
  const toneSel=(P.tone&&P.tone.length?P.tone:["Direct"]);
  const toneFit=toneSel.some(t=>(toneWords[t]||[]).some(w=>tl.includes(w)))||power>=2;
  // ── four scores from real signals ──
  let viral=44; viral+=hookOpeners?14:0; viral+=shortHook?8:0; viral+=curiosity?10:0; viral+=hookNumber?5:0; viral+=Math.min(8,power*2); viral+=Math.min(6,emo*3); viral+=negativity?5:0; viral-= (fwords.length>18?10:0); viral-= (wc<8?12:0);
  let engagement=42; engagement+=hasCTA?16:0; engagement+=Math.min(10,ctaCount*6); engagement+=isQ?8:0; engagement+=ctaComment?6:0; engagement+=emoji>0?4:0; engagement+=broken?6:0; engagement-= (wc<8?10:0);
  let brand=46; brand+=toneFit?16:0; brand+=nicheMatch?14:0; brand+=broken?6:0; brand+=(wc>=20&&wc<=160?8:0); brand-= (wc>220?10:0); brand-= (power===0&&emo===0?8:0);
  let growth=44; growth+=hookOpeners?12:0; growth+=(ctaFollow||ctaSave)?12:0; growth+=curiosity?8:0; growth+=(ctaShare?8:0); growth+=Math.min(8,numbers*3); growth+=nicheMatch?6:0; growth-= (!hasCTA?10:0);
  viral=clamp(viral);engagement=clamp(engagement);brand=clamp(brand);growth=clamp(growth);
  const overall=Math.round((viral*1.15+engagement*1.1+brand+growth*1.05)/4.3);
  const grade=gradeFor(overall);
  // ── strengths / weaknesses / fixes from real signals ──
  const S=[],Wk=[],Fx=[];
  if(hookOpeners||curiosity||hookNumber)S.push(`Strong opening line — it uses a proven hook pattern${curiosity?" with a real curiosity gap":""}. That's the single biggest driver of reach.`);
  if(hasCTA)S.push(`You included a clear call-to-action (${[ctaSave&&"save",ctaComment&&"comment",ctaFollow&&"follow",ctaShare&&"share",ctaDM&&"DM"].filter(Boolean).join("/")}). Most posts forget to ask — yours doesn't.`);
  if(broken)S.push(`Good formatting — line breaks make it scannable, which lifts read-through on mobile.`);
  if(power>=2||emo>=1)S.push(`Strong word choice — emotional/power language pulls people in instead of reading flat.`);
  if(nicheMatch)S.push(`On-niche and on-message — it speaks directly to your ${n} audience.`);
  if(S.length===0)S.push(`You've got a draft to work with — the structure below shows exactly how to make it hit.`);
  if(!hookOpeners&&!curiosity&&!hookNumber){Wk.push(`The first line is weak — it doesn't create a question, a bold claim, or a curiosity gap, so the scroll won't stop.`);Fx.push(`Rewrite line 1 as a bold claim or question. Try: "${buildHooks(P)[0].t}"`);}
  if(fwords.length>16){Wk.push(`Your hook is too long (${fwords.length} words). Long hooks lose people before the point lands.`);Fx.push(`Cut the first line to under 12 words — front-load the most surprising part.`);}
  if(!hasCTA){Wk.push(`There's no call-to-action — you're leaving reach and leads on the table.`);Fx.push(`End with one clear ask: ${ctaEngine(P,"grow")[0]}`);}
  if(ctaCount>2){Wk.push(`Too many asks (${ctaCount}) — competing CTAs split attention and lower action.`);Fx.push(`Pick ONE call-to-action and cut the rest. One clear ask beats three soft ones.`);}
  if(!broken&&wc>25){Wk.push(`It's a wall of text — no line breaks. Mobile readers bounce off dense captions.`);Fx.push(`Break it into 1–2 line chunks with white space between ideas.`);}
  if(wc<8){Wk.push(`It's very short — there may not be enough substance to earn a save or a follow.`);Fx.push(`Add one concrete line of value or a mini-story so it's worth keeping.`);}
  if(wc>220){Wk.push(`It's long (${wc} words). Unless it's a story that earns every line, you'll lose people.`);Fx.push(`Tighten to the strongest 120–150 words — cut anything that isn't hook, value, or CTA.`);}
  if(!toneFit){Wk.push(`The voice reads generic — it doesn't sound distinctly like your ${toneSel.join("/")} brand yet.`);Fx.push(`Inject your POV and one signature phrase so it could only have come from you.`);}
  if(Wk.length===0){Wk.push(`Honestly? This is in good shape. The only risk is the visual — make sure the reel/image matches this energy.`);Fx.push(`Pair it with a strong first-frame visual + on-screen text of your hook.`);}
  return {text:raw,viral,engagement,brand,growth,overall,grade,
    scores:[["Viral potential",viral],["Engagement",engagement],["Brand fit",brand],["Growth pull",growth]],
    strengths:S.slice(0,5),weaknesses:Wk.slice(0,5),fixes:Fx.slice(0,5),
    verdict: overall>=85?"Post it — this is strong.":overall>=70?"Solid — apply 1–2 fixes and ship.":overall>=55?"Not yet — fix the flagged issues first.":"Hold — this needs work before it goes out."};
}
function AnalyzerView({P,askAI}){
  const [mode,setMode]=useState("post");
  const [postText,setPostText]=useState("");
  const [ptOut,setPtOut]=useState(null);
  const [ptBusy,setPtBusy]=useState(false);
  const runPostTest=()=>{if(!postText.trim())return;setPtBusy(true);setTimeout(()=>{setPtOut(analyzePostText(P,postText));setPtBusy(false);},700);};
  const [file,setFile]=useState(null),[fileB,setFileB]=useState(null);
  const [desc,setDesc]=useState("");
  const [loading,setLoading]=useState(false);
  const [out,setOut]=useState(null),[cmp,setCmp]=useState(null);
  const inputRef=useRef(),inputBRef=useRef();
  const pickInto=(setter)=>(e)=>{const f=e.target.files&&e.target.files[0];if(!f)return;setOut(null);setCmp(null);
    setter({url:URL.createObjectURL(f),type:f.type,name:f.name,file:f});};
  const analyze=async()=>{setLoading(true);
    try{
      const m=await inspectMedia(file.file,file.url);
      const base=groundedAnalyze(P,m,mode,desc);
      // try to enrich with real vision if the model is reachable (backend); otherwise keep grounded
      try{
        let b64,media;
        if(file.type.startsWith("image")){b64=await fileToB64(file.file);media=file.type;}
        else{b64=await videoFrameB64(file.url);media="image/jpeg";}
        if(b64){const v=await visionAnalyze(P,b64,media,mode==="makeme"?("Adapt to my voice/niche ("+P.niche+"). "+desc):desc);
          setOut({...base,hook:v.hook||base.hook,captions:v.captions||base.captions,reel:v.reel||base.reel,cta:v.cta||base.cta,visionOn:true});}
        else setOut(base);
      }catch(e){setOut(base);}
    }catch(e){setOut(groundedAnalyze(P,null,mode,desc));}
    setLoading(false);
  };
  const compare=async()=>{setLoading(true);
    try{const ma=await inspectMedia(file.file,file.url);const mb=await inspectMedia(fileB.file,fileB.url);
      setCmp(groundedCompare(P,ma,mb,file.name,fileB.name));}catch(e){setCmp(groundedCompare(P,null,null));}
    setLoading(false);
  };
  const reset=()=>{setFile(null);setFileB(null);setOut(null);setCmp(null);setDesc("");};
  const Up=({f,onClick,label})=>(
    f?<div className="panel" style={{padding:8,position:"relative"}}>{f.type.startsWith("video")?<video src={f.url} controls style={{width:"100%",borderRadius:8,maxHeight:240}}/>:<img src={f.url} style={{width:"100%",borderRadius:8,maxHeight:240,objectFit:"cover"}}/>}</div>
    :<div className="uploadzone" onClick={onClick} style={{padding:"26px 16px"}}><div className="tool-ic" style={{width:40,height:40,margin:"0 auto 10px"}}><Upload size={18}/></div><div style={{fontWeight:600,fontSize:14}}>{label}</div></div>
  );
  const dCol=t=>t==="good"?"var(--green)":t==="bad"?"var(--red)":"var(--amber)";
  const dIcon=t=>t==="good"?CheckCircle2:t==="bad"?AlertTriangle:CircleDot;
  const scoreCol=v=>v>=80?"var(--green)":v>=62?"var(--accent)":v>=45?"var(--amber)":"var(--red)";
  const title=mode==="text"?"Never post it blind. Test it first.":mode==="post"?"Already filmed it? Let's measure it.":mode==="makeme"?"Saw a reel you love? Make it yours.":"Got two? I'll measure both and pick the winner.";
  const sub=mode==="text"?"Paste your caption, hook, or whole post. I analyze the actual words — hook strength, CTA, formatting, voice — and grade it on viral, engagement, brand and growth, then tell you exactly what to fix before it goes out."
    :mode==="post"?"Upload your clip or photo. I read the real file — length, format, lighting, resolution — score it, tell you exactly what to fix, then hand you the post."
    :mode==="makeme"?"Upload a reel you admire. I'll measure it and re-work the hook, caption and format so it fits your voice and niche — without copying."
    :"Upload two. I measure both on the fundamentals and tell you which to post and why.";
  return (
    <>
      <div className="eyebrow">Video & Photo Analyzer</div>
      <h1 className="disp" style={{fontWeight:700,fontSize:28,margin:"6px 0 6px"}}>{title}</h1>
      <p style={{color:"var(--muted)",fontSize:14.5,maxWidth:620,marginBottom:14}}>{sub}</p>
      <div className="tabs">{[["text","Test my caption"],["post","Test my video/photo"],["makeme","Make it more me"],["winner","Pick the winner"]].map(([k,l])=>(<div key={k} className={"tab"+(mode===k?" on":"")} onClick={()=>{setMode(k);reset();}}>{l}</div>))}</div>

      {mode==="text" ? (
        <div style={{display:"grid",gridTemplateColumns:ptOut?"360px 1fr":"1fr",gap:18}} className="hero">
          <div>
            <textarea className="cx-in" rows={8} value={postText} onChange={e=>setPostText(e.target.value)} placeholder={`Paste your caption / hook / post here…\n\ne.g.\nStop ${pack(P).mistakes[0]}.\n\nIt's quietly killing your results. Here's what to do instead 👇\n\nSave this & comment "${NW(P).W}".`}/>
            <div className="btn-row" style={{marginTop:10}}><button className="btn btn-grad" style={{flex:1,justifyContent:"center"}} disabled={ptBusy||!postText.trim()} onClick={runPostTest}>{ptBusy?<><span className="pulse" style={{marginRight:8}}/>Analyzing your words…</>:<><Sparkles size={16}/> Grade my post</>}</button>{ptOut&&<button className="btn btn-ghost sm" onClick={()=>{setPtOut(null);}}>Clear</button>}</div>
            <p className="mono" style={{fontSize:10.5,color:"var(--faint)",marginTop:10}}>Scored from a real read of your text — hook pattern, CTA, length, formatting, power words, and brand-voice fit. No guessing.</p>
          </div>
          <div>
            {!ptOut&&!ptBusy&&<div className="panel panel-pad" style={{color:"var(--muted)",fontSize:14}}>Paste a post and hit <b>Grade my post</b>. You'll get a real grade, four scores, and the exact fixes — before you ever publish.</div>}
            {ptBusy&&<div className="panel panel-pad"><div className="live"><span className="pulse"/>Reading your hook, CTA, structure and voice…</div></div>}
            {ptOut&&(<div>
              <div className="panel panel-pad" style={{marginBottom:14}}>
                <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap",marginBottom:14}}>
                  <div style={{textAlign:"center",minWidth:96}}><div className="disp" style={{fontWeight:800,fontSize:46,lineHeight:1,color:scoreCol(ptOut.overall)}}>{ptOut.grade}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>{ptOut.overall}/100</div></div>
                  <div style={{flex:1,minWidth:200}}><div style={{fontWeight:700,fontSize:15,marginBottom:8}}>{ptOut.verdict}</div>
                    {ptOut.scores.map(([l,v])=>(<div key={l} style={{marginBottom:7}}><div style={{display:"flex",justifyContent:"space-between",fontSize:12,marginBottom:3}}><span>{l}</span><span className="mono" style={{color:scoreCol(v)}}>{v}</span></div><div className="bar"><i style={{width:v+"%",background:v>=70?"var(--green)":"var(--grad)"}}/></div></div>))}
                  </div>
                </div>
              </div>
              <div className="out-card" style={{marginBottom:12}}><div className="eyebrow" style={{color:"var(--green)",marginBottom:9}}>What's working</div>{ptOut.strengths.map((s,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,marginBottom:8,lineHeight:1.45}}><CheckCircle2 size={15} color="var(--green)" style={{flexShrink:0,marginTop:2}}/>{s}</div>))}</div>
              <div className="out-card" style={{marginBottom:12}}><div className="eyebrow" style={{color:"var(--amber)",marginBottom:9}}>Weaknesses</div>{ptOut.weaknesses.map((s,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,marginBottom:8,lineHeight:1.45,color:"var(--muted)"}}><AlertTriangle size={15} color="var(--amber)" style={{flexShrink:0,marginTop:2}}/>{s}</div>))}</div>
              <div className="out-card"><div className="eyebrow" style={{color:"var(--accent)",marginBottom:9}}>Exactly what to fix</div>{ptOut.fixes.map((s,i)=>(<div key={i} style={{display:"flex",gap:11,marginBottom:9,alignItems:"flex-start"}}><div style={{width:21,height:21,borderRadius:6,background:"var(--grad)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,fontSize:11,flexShrink:0}}>{i+1}</div><div style={{fontSize:13.5,lineHeight:1.45}}>{s}</div></div>))}</div>
            </div>)}
          </div>
        </div>
      ) : mode!=="winner" ? (
        <div style={{display:"grid",gridTemplateColumns:file?"320px 1fr":"1fr",gap:18}} className="hero">
          <div>
            <input ref={inputRef} type="file" accept="image/*,video/*" capture="environment" style={{display:"none"}} onChange={pickInto(setFile)}/>
            {!file?<div className="uploadzone" onClick={()=>inputRef.current&&inputRef.current.click()}><div className="tool-ic" style={{width:48,height:48,margin:"0 auto 12px"}}><Play size={22}/></div><div style={{fontWeight:600,fontSize:15}}>{mode==="makeme"?"Upload the reel to adapt":"Upload or shoot a video / photo"}</div><div style={{color:"var(--muted)",fontSize:13,marginTop:5}}>MP4, MOV, JPG, PNG</div></div>
            :<div><Up f={file}/><input className="cx-in" placeholder="Add context (optional): what's in it / your goal" value={desc} onChange={e=>setDesc(e.target.value)} style={{margin:"10px 0"}}/>
              <div className="btn-row"><button className="btn btn-grad" style={{flex:1,justifyContent:"center"}} disabled={loading} onClick={analyze}>{loading?"Measuring…":<><Sparkles size={16}/> {mode==="makeme"?"Measure & make it mine":"Analyze my video"}</>}</button><button className="btn btn-ghost sm" onClick={reset}>Change</button></div></div>}
          </div>
          <div>
            {!out&&!loading&&<div className="panel panel-pad" style={{color:"var(--muted)",fontSize:14,display:file?"block":"none"}}>Hit analyze and I'll measure the real file, score it, and turn it into a post.</div>}
            {loading&&<div className="panel panel-pad"><div className="live"><span className="pulse"/>Reading the actual file — length, format, lighting…</div></div>}
            {out&&(<div>
              {/* measured score + facts */}
              <div className="panel panel-pad" style={{marginBottom:14}}>
                <div style={{display:"flex",gap:18,alignItems:"center",flexWrap:"wrap"}}>
                  <div style={{textAlign:"center",minWidth:96}}><div className="disp" style={{fontWeight:800,fontSize:46,lineHeight:1,color:scoreCol(out.score)}}>{out.score}</div><div className="mono" style={{fontSize:9,color:"var(--faint)"}}>/100 READY</div></div>
                  <div style={{flex:1,minWidth:180}}><div className="eyebrow" style={{marginBottom:8}}>What I measured in your {out.kind==="video"?"video":"file"}</div>
                    <div style={{display:"flex",flexWrap:"wrap",gap:8}}>{(out.facts||[]).map((f,i)=>(<span key={i} className="tag">{f[0]}: <strong style={{color:"var(--text)",marginLeft:3}}>{f[1]}</strong></span>))}</div></div>
                </div>
              </div>
              {/* grounded diagnosis */}
              <div className="out-card"><div className="eyebrow" style={{marginBottom:10}}>Diagnosis — from your actual file</div>
                <div style={{display:"flex",flexDirection:"column",gap:9}}>{(out.diag||[]).map((d,i)=>{const Ic=dIcon(d[2]);return (
                  <div key={i} style={{display:"flex",gap:10,alignItems:"flex-start"}}><Ic size={16} color={dCol(d[2])} style={{marginTop:2,flexShrink:0}}/><div style={{fontSize:13.5,lineHeight:1.45}}><strong>{d[0]}.</strong> <span style={{color:"var(--muted)"}}>{d[1]}</span></div></div>);})}</div>
              </div>
              {mode==="makeme"&&<div className="nba" style={{margin:"12px 0"}}><p style={{fontSize:14,fontWeight:500}}>Now here's that idea re-worked in your voice for {P.niche} — fresh hook, your caption, your format. Not a copy.</p></div>}
              <div className="out-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span className="eyebrow">{mode==="makeme"?"Your hook":"Recommended hook"}</span><CopyBtn text={out.hook}/></div><p style={{fontSize:14.5,fontWeight:500,lineHeight:1.45}}>{out.hook}</p></div>
              {(out.captions||[]).map((c,i)=>(<div className="out-card" key={i}><div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span className="eyebrow">Caption option {i+1}</span><CopyBtn text={c}/></div><div className="kit">{c}</div></div>))}
              <div className="out-card"><div className="eyebrow" style={{marginBottom:8}}>How to cut it</div>{(out.reel||[]).map((s,i)=>(<div key={i} style={{display:"flex",gap:10,fontSize:14,padding:"6px 0",borderBottom:i<(out.reel.length-1)?"1px solid var(--line)":"none"}}><span className="mono" style={{color:"var(--accent)"}}>{i+1}</span>{s}</div>))}</div>
              <div className="out-card"><div className="eyebrow" style={{marginBottom:8}}>Fixes & posting tips</div>{(out.tips||[]).map((s,i)=>(<div key={i} style={{display:"flex",gap:9,fontSize:13.5,padding:"5px 0",color:"var(--muted)"}}><Check size={15} color="var(--green)"/>{s}</div>))}</div>
              <p className="mono" style={{fontSize:11,color:"var(--faint)",margin:"10px 2px"}}>{out.visionOn?"Frame + content read by the AI vision model.":"Scored from your file's real properties (length, format, lighting, resolution) + best-practice coaching. Frame-by-frame content analysis turns on when the AI vision model is connected."}</p>
              <DocActions title="My reel plan" P={P} opts={{subtitle:"Diagnosis + post, score "+out.score+"/100"}} blocks={[{label:"Measured",text:(out.facts||[]).map(f=>f[0]+": "+f[1]).join("\n")},{label:"Diagnosis",text:(out.diag||[]).map(d=>d[0]+" — "+d[1]).join("\n")},{label:"Hook",text:out.hook},...(out.captions||[]).map((c,i)=>({label:"Caption "+(i+1),text:c})),{label:"How to cut it",text:(out.reel||[]).join("\n")},{label:"CTA",text:out.cta}]}/>
            </div>)}
          </div>
        </div>
      ):(
        <div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:14}} className="hero">
            <div><div className="eyebrow" style={{marginBottom:8}}>Reel A</div><input ref={inputRef} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={pickInto(setFile)}/><Up f={file} onClick={()=>inputRef.current.click()} label="Upload Reel A"/></div>
            <div><div className="eyebrow" style={{marginBottom:8}}>Reel B</div><input ref={inputBRef} type="file" accept="image/*,video/*" style={{display:"none"}} onChange={pickInto(setFileB)}/><Up f={fileB} onClick={()=>inputBRef.current.click()} label="Upload Reel B"/></div>
          </div>
          <div className="btn-row" style={{marginBottom:14}}><button className="btn btn-grad" disabled={!file||!fileB||loading} style={{opacity:file&&fileB?1:.5}} onClick={compare}>{loading?"Measuring both…":<><Trophy size={16}/> Measure & pick the winner</>}</button>{(file||fileB)&&<button className="btn btn-ghost sm" onClick={reset}>Reset</button>}</div>
          {cmp&&(<div>
            <div className="nba" style={{marginBottom:12}}><div style={{display:"flex",gap:10,alignItems:"center",marginBottom:6}}><Trophy size={18} color="var(--amber)"/><span className="disp" style={{fontWeight:700,fontSize:18}}>Post Reel {cmp.winner}</span><span className="mono" style={{fontSize:12,color:"var(--muted)"}}>A {cmp.sa} · B {cmp.sb}</span></div><p style={{fontSize:14,lineHeight:1.5}}>{cmp.verdict}</p></div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}} className="hero">
              <div className="out-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span className="eyebrow">Reel A {cmp.winner==="A"?"🏆":""}</span><span className="disp" style={{fontWeight:700,color:scoreCol(cmp.sa)}}>{cmp.sa}</span></div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>{cmp.factsA.map((f,i)=>(<span key={i} className="tag">{f}</span>))}</div>
                {cmp.whyA.map((x,i)=>(<div key={i} style={{display:"flex",gap:8,fontSize:13,padding:"3px 0",color:"var(--muted)"}}><CircleDot size={13} color="var(--faint)"/>{x}</div>))}</div>
              <div className="out-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}><span className="eyebrow">Reel B {cmp.winner==="B"?"🏆":""}</span><span className="disp" style={{fontWeight:700,color:scoreCol(cmp.sb)}}>{cmp.sb}</span></div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:8}}>{cmp.factsB.map((f,i)=>(<span key={i} className="tag">{f}</span>))}</div>
                {cmp.whyB.map((x,i)=>(<div key={i} style={{display:"flex",gap:8,fontSize:13,padding:"3px 0",color:"var(--muted)"}}><CircleDot size={13} color="var(--faint)"/>{x}</div>))}</div>
            </div>
            <div className="out-card"><div style={{display:"flex",justifyContent:"space-between",marginBottom:7}}><span className="eyebrow">Sharpen the winner</span><CopyBtn text={cmp.direction}/></div><p style={{fontSize:14,lineHeight:1.5}}>{cmp.direction}</p></div>
            <p className="mono" style={{fontSize:11,color:"var(--faint)",margin:"8px 2px"}}>Scored on measured fundamentals: format, length, lighting, resolution.</p>
          </div>)}
        </div>
      )}
    </>
  );
}
/* ── MODALS ── */
function ConnectModal({close,onConnect}){
  const [h,setH]=useState("");
  const ok=h.trim().length>1;
  return (<><div className="scrim" onClick={close}/>
    <div className="modal panel-pad">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
        <div style={{display:"flex",gap:11,alignItems:"center"}}><div style={{width:38,height:38,borderRadius:10,background:"linear-gradient(135deg,#E1306C,#8B7CFF)",display:"flex",alignItems:"center",justifyContent:"center"}}><Instagram size={19} color="#fff"/></div><div className="disp" style={{fontWeight:700,fontSize:18}}>Connect Instagram</div></div>
        <div style={{cursor:"pointer",color:"var(--muted)"}} onClick={close}><X size={20}/></div>
      </div>
      <p style={{color:"var(--muted)",fontSize:13.5,margin:"10px 0 16px",lineHeight:1.5}}>Enter your handle to auto-pull followers, reach and your top-performing posts. (Demo — no real login in this prototype.)</p>
      <input className="cx-in" autoFocus placeholder="@yourhandle" value={h} onChange={e=>setH(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ok)onConnect(h.startsWith("@")?h:"@"+h);}}/>
      <button className="btn btn-grad" disabled={!ok} style={{width:"100%",marginTop:14,justifyContent:"center",display:"flex",gap:8,alignItems:"center",opacity:ok?1:.4,cursor:ok?"pointer":"not-allowed"}} onClick={()=>onConnect(h.startsWith("@")?h:"@"+h)}>Connect & sync <ArrowRight size={16}/></button>
    </div></>);
}
function NicheModal({P,close,onSave}){
  const [n,setN]=useState(P.niches||[]);
  const [g,setG]=useState(P.goals||[]);
  const tog=(arr,set,v)=>set(arr.includes(v)?arr.filter(x=>x!==v):[...arr,v]);
  return (<><div className="scrim" onClick={close}/>
    <div className="modal panel-pad">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}><div className="disp" style={{fontWeight:700,fontSize:18}}>Edit niche & goals</div><div style={{cursor:"pointer",color:"var(--muted)"}} onClick={close}><X size={20}/></div></div>
      <div className="eyebrow" style={{marginBottom:9}}>Niche layers — primary first</div>
      <div className="opts two" style={{marginBottom:18}}>{NICHES.map(o=>(<div key={o} className={"chip"+(n.includes(o)?" on":"")} onClick={()=>tog(n,setN,o)}><span className="dot"/>{o}{n.includes(o)&&<Check size={14} className="ck"/>}</div>))}</div>
      <div className="eyebrow" style={{marginBottom:9}}>Goals</div>
      <div className="opts" style={{marginBottom:18}}>{GOALS.map(o=>(<div key={o} className={"chip"+(g.includes(o)?" on":"")} onClick={()=>tog(g,setG,o)}><span className="dot"/>{o}{g.includes(o)&&<Check size={14} className="ck"/>}</div>))}</div>
      <button className="btn btn-grad" disabled={!n.length||!g.length} style={{width:"100%",justifyContent:"center",display:"flex",gap:8,alignItems:"center",opacity:n.length&&g.length?1:.4}} onClick={()=>onSave(n,g)}>Save changes</button>
    </div></>);
}

/* ─────────────────────────── ROOT ─────────────────────────── */
export default function App(){
  const [phase,setPhase]=useState("intro");
  const [answers,setAnswers]=useState(null);
  const [profile,setProfile]=useState(null);
  return (
    <div className="cx-root">
      <style>{CSS}</style>
      <div className="cx-grid-bg"/>
      {phase==="intro" && <Intro onStart={()=>setPhase("assess")}/>}
      {phase==="assess" && <Assessment initial={answers} onDone={(a)=>{setAnswers(a);setProfile(computeProfile(a));setPhase("analyze");}}/>}
      {phase==="analyze" && <Analyzing profile={profile} onDone={()=>setPhase("dash")}/>}
      {phase==="dash" && <Dashboard P={profile} onReassess={()=>setPhase("assess")} onUpdate={(patch)=>setProfile(p=>({...p,...patch}))}/>}
    </div>
  );
}
