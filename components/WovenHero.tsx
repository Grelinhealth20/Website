"use client";

import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Hero Layout ────────────────────────────────────────────────────────── */

export function WovenLightHero() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="relative w-full bg-brand-dark overflow-hidden px-4 md:px-8 lg:px-16"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-center"
        style={{ minHeight: "100vh" }}
      >
        {/* ── Text block ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1.0, ease: [0.2, 0.65, 0.3, 0.9] }}
          className="lg:w-[42%] pt-28 pb-6 lg:py-0 lg:pr-10 z-10 flex flex-col justify-center"
        >
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] text-white font-bold leading-[1.1] tracking-tight"
            style={{ textShadow: '0 0 60px rgba(255,255,255,0.10)' }}
          >
            The AI Intelligence Layer for Pre-Bill Revenue Integrity
          </h1>
          <p className="mt-6 max-w-md text-base sm:text-lg text-slate-400 leading-relaxed">
            Purpose-built AI applications that detect and resolve revenue risk before claims are submitted.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="mt-10 flex gap-3 sm:gap-4 flex-wrap"
          >
            <button 
            onClick={() => {
            window.location.href = '/solutions'
            }}
            className="rounded-lg bg-white px-6 sm:px-8 py-3 text-sm font-semibold text-[#0B1120] transition-all hover:bg-white/90 cursor-pointer">
              Explore Grelin Solutions →
            </button>
            <button 
            onClick={() => {
              window.open('https://revenue-risk.grelinhealth.com', '_blank', 'noopener,noreferrer');
            }}
            className="rounded-lg border border-white/25 bg-white/[0.08] px-6 sm:px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-white/15 cursor-pointer">
              Find My Revenue Risks →
            </button>

          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mt-6 text-sm text-slate-500"
          >
            Built for healthcare finance teams · Specialty-aware · No rip-and-replace
          </motion.p>
        </motion.div>

        {/* ── G canvas — below text on mobile (320px), full column on desktop ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1.0 }}
          className="relative w-full lg:w-[58%] lg:self-stretch pb-8 lg:pb-0 overflow-hidden"
          style={{ height: isDesktop ? undefined : "300px" }}
        >
          <div className="absolute inset-0">
            <GCanvas />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ─── G Animation Canvas ─────────────────────────────────────────────────── */

const CARDS_DATA = [
  { label: 'Wound.ai',       desc: 'Pre-bill intelligence for wound care complexity. Catches documentation gaps before claims are submitted.' },
  { label: 'Pain.ai',        desc: 'AI-powered billing validation for pain management. Prevents coding misalignment before transmission.' },
  { label: 'PriorAuth.ai',   desc: 'Detect authorization gaps before they delay reimbursement or disrupt claims.' },
  { label: 'Eligibility.ai', desc: 'Catch coverage and eligibility breakdowns upstream. Minimize preventable claim rejections.' },
  { label: 'Performance.ai', desc: 'Real-time revenue integrity signals across the billing stack.' },
];

const MOUTH_START = -35 * Math.PI / 180;
const MOUTH_END   =  15 * Math.PI / 180;

type NodeLayer = 'outer' | 'inner' | 'mid' | 'crossbar' | 'hot';
interface GNode { x: number; y: number; layer: NodeLayer; jit: { x: number; y: number }; cardIdx?: number; }
interface Orb    { phase: number; speed: number; size: number; trail: [number, number][]; }

function randJit(amp: number) { return { x: (Math.random()-0.5)*amp, y: (Math.random()-0.5)*amp }; }
function lerp2(a: [number,number], b: [number,number], t: number): [number,number] {
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
}

function buildG(cx: number, cy: number, R: number) {
  const OR = R * 0.78, IR = R * 0.50;
  const nodes: GNode[] = [];
  const hotNodes: number[] = [];

  // Outer arc
  for (let i = 0; i <= 38; i++) {
    const a = MOUTH_START - (i/38) * (Math.PI*2 - (MOUTH_END-MOUTH_START));
    nodes.push({ x: cx+Math.cos(a)*OR, y: cy+Math.sin(a)*OR, layer: 'outer', jit: randJit(6) });
  }

  // Inner arc
  for (let i = 0; i <= 30; i++) {
    const mos = MOUTH_START-0.12, moe = MOUTH_END+0.08;
    const a = mos - (i/30)*(Math.PI*2-(moe-mos));
    nodes.push({ x: cx+Math.cos(a)*IR, y: cy+Math.sin(a)*IR, layer: 'inner', jit: randJit(6) });
  }

  // Crossbar
  const me  = MOUTH_END;
  const cbY0 = cy + IR * Math.sin(me);
  const cbY1 = cbY0 + (OR - IR) * 0.5;
  const cbX0 = cx + IR * Math.cos(me);   // right end (inner arc at gap angle)
  const cbX1 = cx + IR * 0.2;            // left tip (inward extension)
  const cbW  = cbX0 - cbX1;
  const cbH  = cbY1 - cbY0;

  // Four valid boundary anchors (no me*0.6 / me*0.3 — those fell inside the gap)
  [
    [cbX0,               cbY0],                          // inner-arc right, top
    [cx+OR*Math.cos(me), cy+OR*Math.sin(me)],            // outer-arc right, top
    [cbX0,               cbY1],                          // inner-arc right, bottom
    [cx+OR*Math.cos(me), cy+OR*Math.sin(me) + cbH*0.5], // outer-arc right, mid
  ].forEach(p => nodes.push({ x: p[0], y: p[1], layer: 'crossbar', jit: randJit(5) }));

  // Scattered interior extension nodes — no two share the same y, avoids parallel lines
  const cbPts = [
    [0.10, 0.20], [0.32, 0.68], [0.55, 0.30], [0.78, 0.75],
    [0.18, 0.52], [0.45, 0.15], [0.67, 0.58], [0.90, 0.38],
    [0.05, 0.82], [0.85, 0.12],
  ];
  cbPts.forEach(([tx, ty]) =>
    nodes.push({ x: cbX1 + tx*cbW, y: cbY0 + ty*cbH, layer: 'crossbar', jit: randJit(6) })
  );
  // Left edge nodes
  for (let i = 1; i <= 3; i++) {
    nodes.push({ x: cbX1, y: cbY0 + (i / 4) * cbH, layer: 'crossbar', jit: randJit(3) });
  }

  // Mid-band scattered
  let midCount = 0, tries = 0;
  while (midCount < 55 && tries < 55*30) {
    tries++;
    const ang = Math.random()*Math.PI*2;
    const r   = IR + Math.random()*(OR-IR);
    const deg = (((ang%(Math.PI*2))+Math.PI*2)%(Math.PI*2))*180/Math.PI;
    if (deg > 325 || deg < 15) continue;
    const px = cx+Math.cos(ang)*r, py = cy+Math.sin(ang)*r;
    if (px > cx+IR*0.7 && py > cy-10 && py < cy+OR*0.6 && Math.random()>0.3) continue;
    nodes.push({ x: px, y: py, layer: 'mid', jit: randJit(7) });
    midCount++;
  }

  // Hotspot nodes — one per product, distributed around the G
  [
    { x: cx-OR*0.10, y: cy+OR*0.88, cardIdx: 0 },   // Wound.ai      — bottom
    { x: cx-OR*0.25, y: cy-OR*0.82, cardIdx: 1 },   // Pain.ai       — top
    { x: cx-OR*0.74, y: cy-OR*0.52, cardIdx: 2 },   // PriorAuth.ai  — upper-left
    { x: cx-OR*0.68, y: cy+OR*0.52, cardIdx: 3 },   // Eligibility.ai— lower-left
    { x: cx+OR*0.70, y: cy+OR*0.20, cardIdx: 4 },   // Performance.ai— right/crossbar
  ].forEach(hd => {
    hotNodes.push(nodes.length);
    nodes.push({ x: hd.x, y: hd.y, layer: 'hot', jit: {x:0,y:0}, cardIdx: hd.cardIdx });
  });

  // Build edges
  const MAXD = R*0.32;
  const edges: [number,number][] = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i+1; j < nodes.length; j++) {
      const dx = nodes[i].x-nodes[j].x, dy = nodes[i].y-nodes[j].y;
      if (Math.sqrt(dx*dx+dy*dy) >= MAXD) continue;
      const mx = (nodes[i].x+nodes[j].x)*0.5, my = (nodes[i].y+nodes[j].y)*0.5;
      const mr = Math.sqrt((mx-cx)**2+(my-cy)**2);
      const ma = Math.atan2(my-cy, mx-cx);
      const inCB = mx >= cbX1 && mx <= cx+OR && my >= cbY0 && my <= cbY1;
      if (mr < IR*0.88 && !inCB) continue;
      if (ma > MOUTH_START && ma < MOUTH_END && mr > IR && !inCB) continue;
      edges.push([i,j]);
    }
  }

  return { nodes, edges, hotNodes };
}

function buildOrbPath(cx: number, cy: number, R: number): [number,number][] {
  const OR = R*0.78, IR = R*0.50;
  const pts: [number,number][] = [];

  for (let i = 0; i <= 120; i++) {
    const a = MOUTH_START - (i/120)*(Math.PI*2-(MOUTH_END-MOUTH_START));
    pts.push([cx+Math.cos(a)*OR, cy+Math.sin(a)*OR]);
  }

  const p0: [number,number] = [cx+Math.cos(MOUTH_END)*OR, cy+Math.sin(MOUTH_END)*OR];
  const p1: [number,number] = [cx+Math.cos(MOUTH_END)*OR, cy+Math.sin(MOUTH_END)*OR+(OR-IR)*0.55];
  const p2: [number,number] = [cx+Math.cos(MOUTH_END)*IR, cy+Math.sin(MOUTH_END)*IR+(OR-IR)*0.55];
  const p3: [number,number] = [cx+Math.cos(MOUTH_END)*IR, cy+Math.sin(MOUTH_END)*IR];

  for (let i=1;i<=10;i++) pts.push(lerp2(p0,p1,i/10));
  for (let i=1;i<=20;i++) pts.push(lerp2(p1,p2,i/20));
  for (let i=1;i<=10;i++) pts.push(lerp2(p2,p3,i/10));

  const mos2 = MOUTH_END+0.1, moe2 = MOUTH_START+Math.PI*2-0.1;
  for (let i=1;i<=80;i++) {
    const a = mos2+(i/80)*(moe2-mos2);
    pts.push([cx+Math.cos(a)*IR, cy+Math.sin(a)*IR]);
  }
  pts.push(pts[0]);
  return pts;
}

function buildPathLengths(path: [number,number][]) {
  const lens = [0];
  for (let i=1;i<path.length;i++) {
    const dx=path[i][0]-path[i-1][0], dy=path[i][1]-path[i-1][1];
    lens.push(lens[i-1]+Math.sqrt(dx*dx+dy*dy));
  }
  return lens;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number,
  r: number | [number,number,number,number]
) {
  const [r0,r1,r2,r3] = typeof r==='number' ? [r,r,r,r] : r;
  ctx.beginPath();
  ctx.moveTo(x+r0,y); ctx.lineTo(x+w-r1,y); ctx.quadraticCurveTo(x+w,y,x+w,y+r1);
  ctx.lineTo(x+w,y+h-r2); ctx.quadraticCurveTo(x+w,y+h,x+w-r2,y+h);
  ctx.lineTo(x+r3,y+h); ctx.quadraticCurveTo(x,y+h,x,y+h-r3);
  ctx.lineTo(x,y+r0); ctx.quadraticCurveTo(x,y,x+r0,y);
  ctx.closePath();
}

const GCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio||1, 2);
    let W=0, H=0, cx=0, cy=0, R=0, animId=0;

    let gNodes: GNode[] = [];
    let gEdges: [number,number][] = [];
    let hotNodes: number[] = [];
    let orbPath: [number,number][] = [];
    let orbPathLen: number[] = [];

    const orbs: Orb[] = [
      { phase: 0.00, speed: 0.00012, size: 5,   trail: [] },
      { phase: 0.42, speed: 0.00009, size: 4,   trail: [] },
      { phase: 0.71, speed: 0.00014, size: 4.5, trail: [] },
    ];
    const TRAIL_LEN = 28;

    let nodeT = 0;
    // Auto-cycling card state
    let autoCardIdx = 0;
    let cardAlpha = 0;
    let cardTarget = 1;          // 1 = fade in, 0 = fade out
    const CARD_HOLD = 3.2;       // seconds card stays fully visible
    const CARD_FADE_OUT = 0.55;  // seconds to fade out before switching
    let cardHoldTimer = CARD_HOLD;
    let fadeOutTimer = -1;

    function getOrbPos(phase: number): [number,number] {
      const total = orbPathLen[orbPathLen.length-1];
      const target = (((phase%1)+1)%1)*total;
      let lo=0, hi=orbPathLen.length-1;
      while (lo<hi-1) { const mid=(lo+hi)>>1; if(orbPathLen[mid]<target) lo=mid; else hi=mid; }
      return lerp2(orbPath[lo], orbPath[hi], (target-orbPathLen[lo])/(orbPathLen[hi]-orbPathLen[lo]||1));
    }

    function drawCard(nx: number, ny: number, card: typeof CARDS_DATA[0], alpha: number) {
      const cw = Math.min(200, W * 0.52), ch=90, cr=12;
      const cx2 = Math.max(8, Math.min(W - cw - 8, nx > cx ? nx - cw - 20 : nx + 20));
      const cy2 = Math.max(10, Math.min(H-ch-10, ny-ch/2));

      ctx.save();
      ctx.globalAlpha = Math.min(alpha,1);

      // Shadow
      ctx.shadowColor='rgba(0,0,0,0.5)';
      ctx.shadowBlur=20;
      ctx.fillStyle='rgba(6,13,36,0.97)';
      roundRect(ctx,cx2,cy2,cw,ch,cr); ctx.fill();
      ctx.shadowBlur=0;

      // Amber border
      ctx.strokeStyle='rgba(245,158,11,0.55)'; ctx.lineWidth=1;
      roundRect(ctx,cx2,cy2,cw,ch,cr); ctx.stroke();
      // Left accent bar
      ctx.fillStyle='#f59e0b';
      roundRect(ctx,cx2,cy2,3.5,ch,[cr,0,0,cr]); ctx.fill();

      // Dashed connector
      const connX = nx>cx ? cx2+cw : cx2;
      const connY = cy2+ch/2;
      ctx.setLineDash([4,6]); ctx.strokeStyle='rgba(245,158,11,0.40)'; ctx.lineWidth=0.9;
      ctx.beginPath(); ctx.moveTo(nx,ny); ctx.lineTo(connX,connY); ctx.stroke();
      ctx.setLineDash([]);
      ctx.beginPath(); ctx.arc(connX,connY,3,0,Math.PI*2);
      ctx.fillStyle='rgba(245,158,11,0.7)'; ctx.fill();

      // Label
      ctx.font='700 13px Inter,-apple-system,sans-serif';
      ctx.fillStyle='#ffffff';
      ctx.fillText(card.label, cx2+16, cy2+26);

      // Description — word-wrap, bigger text
      ctx.font='400 10.5px Inter,-apple-system,sans-serif';
      ctx.fillStyle='rgba(255,255,255,0.55)';
      const words=card.desc.split(' ');
      let line='', lineY=cy2+46;
      words.forEach(w => {
        const test=line+w+' ';
        if (ctx.measureText(test).width>cw-28 && line) {
          ctx.fillText(line.trim(),cx2+16,lineY); line=w+' '; lineY+=15;
        } else line=test;
      });
      if (line) ctx.fillText(line.trim(),cx2+16,lineY);

      ctx.restore();
    }

    let lastTs=0;
    function draw(ts: number) {
      animId = requestAnimationFrame(draw);
      const dt = Math.min((ts-lastTs)/1000, 0.05);
      lastTs = ts;
      nodeT += dt;

      ctx.clearRect(0,0,W,H);

      // BG glow — fills full rect so edges are perfectly transparent (no visible rectangle)
      const bg = ctx.createRadialGradient(cx,cy,0,cx,cy,R*1.65);
      bg.addColorStop(0,   'rgba(49,82,173,0.22)');
      bg.addColorStop(1,   'rgba(9,17,33,0)');
      ctx.fillStyle=bg; ctx.fillRect(0,0,W,H);

      // Update orbs
      const orbPositions = orbs.map(orb => {
        orb.phase += orb.speed;
        const pos = getOrbPos(orb.phase);
        orb.trail.push([...pos] as [number,number]);
        if (orb.trail.length>TRAIL_LEN) orb.trail.shift();
        return pos;
      });

      // Edges
      gEdges.forEach(([i,j]) => {
        const a=gNodes[i], b=gNodes[j];
        const ax=a.x+Math.sin(nodeT*a.jit.x*0.8+i)*1.2;
        const ay=a.y+Math.cos(nodeT*a.jit.y*0.8+i)*1.2;
        const bx=b.x+Math.sin(nodeT*b.jit.x*0.8+j)*1.2;
        const by2=b.y+Math.cos(nodeT*b.jit.y*0.8+j)*1.2;
        const midX=(ax+bx)/2, midY=(ay+by2)/2;
        let glow=0;
        orbPositions.forEach(op => {
          const dd=Math.sqrt((midX-op[0])**2+(midY-op[1])**2);
          glow=Math.max(glow,Math.max(0,1-dd/(R*0.35)));
        });
        ctx.beginPath();
        ctx.strokeStyle=glow>0.05?`rgba(160,210,255,${0.18+glow*0.55})`:`rgba(80,140,220,${0.18+glow*0.1})`;
        ctx.lineWidth=0.7+glow*0.8;
        ctx.moveTo(ax,ay); ctx.lineTo(bx,by2); ctx.stroke();
      });

      // Nodes
      gNodes.forEach((nd,i) => {
        if (nd.layer==='hot') return;
        const nx=nd.x+Math.sin(nodeT*nd.jit.x*0.8+i)*1.2;
        const ny=nd.y+Math.cos(nodeT*nd.jit.y*0.8+i)*1.2;
        let glow=0;
        orbPositions.forEach(op => {
          const dd=Math.sqrt((nx-op[0])**2+(ny-op[1])**2);
          glow=Math.max(glow,Math.max(0,1-dd/(R*0.28)));
        });
        ctx.beginPath(); ctx.arc(nx,ny,1.5+glow*2.5,0,Math.PI*2);
        ctx.fillStyle=glow>0.1?`rgba(0,230,255,${0.35+glow*0.65})`:`rgba(110,160,230,${0.35+glow*0.3})`;
        ctx.fill();
      });

      // Trails
      orbs.forEach(orb => {
        const t2=orb.trail;
        if (t2.length<2) return;
        for (let i=1;i<t2.length;i++) {
          const frac=i/t2.length;
          ctx.beginPath();
          ctx.strokeStyle=`rgba(180,220,255,${Math.pow(frac,1.5)*0.4})`;
          ctx.lineWidth=frac*orb.size*1.8;
          ctx.lineCap='round';
          ctx.moveTo(t2[i-1][0],t2[i-1][1]); ctx.lineTo(t2[i][0],t2[i][1]); ctx.stroke();
        }
      });

      // Orbs
      orbPositions.forEach((pos,oi) => {
        const orb=orbs[oi];
        const g2=ctx.createRadialGradient(pos[0],pos[1],0,pos[0],pos[1],orb.size*5);
        g2.addColorStop(0,  'rgba(180,225,255,0.55)');
        g2.addColorStop(0.4,'rgba(100,175,255,0.18)');
        g2.addColorStop(1,  'rgba(0,200,255,0)');
        ctx.fillStyle=g2; ctx.beginPath(); ctx.arc(pos[0],pos[1],orb.size*5,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(pos[0],pos[1],orb.size,0,Math.PI*2);
        ctx.fillStyle='rgba(230,245,255,0.98)'; ctx.fill();
        ctx.beginPath(); ctx.arc(pos[0],pos[1],orb.size*0.45,0,Math.PI*2);
        ctx.fillStyle='#fff'; ctx.fill();
      });

      // Auto-cycle card logic
      if (fadeOutTimer > 0) {
        fadeOutTimer -= dt;
        if (fadeOutTimer <= 0) {
          // Switch to next card and fade in
          autoCardIdx = (autoCardIdx + 1) % CARDS_DATA.length;
          cardTarget = 1;
          cardHoldTimer = CARD_HOLD;
          fadeOutTimer = -1;
        }
      } else if (cardHoldTimer > 0) {
        cardHoldTimer -= dt;
        if (cardHoldTimer <= 0) {
          cardTarget = 0;
          fadeOutTimer = CARD_FADE_OUT;
        }
      }
      cardAlpha += (cardTarget - cardAlpha) * 0.08;

      // Hotspot dots — all 5, active one highlighted
      hotNodes.forEach((ni, hi) => {
        const nd = gNodes[ni];
        const isActive = hi === autoCardIdx;
        const pulse = Math.sin(nodeT * 2.2 + hi * 2.1) * 0.5 + 0.5;
        // Outer glow (brighter for active)
        const gr = ctx.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, 28);
        gr.addColorStop(0, `rgba(245,160,50,${isActive ? 0.38 + pulse*0.15 : 0.18 + pulse*0.06})`);
        gr.addColorStop(1, 'rgba(245,140,0,0)');
        ctx.fillStyle = gr;
        ctx.beginPath(); ctx.arc(nd.x, nd.y, 28, 0, Math.PI*2); ctx.fill();
        // Ripple ring
        ctx.beginPath(); ctx.arc(nd.x, nd.y, 10 + pulse * (isActive ? 9 : 5), 0, Math.PI*2);
        ctx.strokeStyle = `rgba(245,158,11,${(1-pulse)*(isActive ? 0.7 : 0.35)})`;
        ctx.lineWidth = isActive ? 1.2 : 0.7; ctx.stroke();
        // Core dot
        ctx.beginPath(); ctx.arc(nd.x, nd.y, isActive ? 6.5 : 5, 0, Math.PI*2);
        ctx.fillStyle = '#f59e0b'; ctx.fill();
        ctx.beginPath(); ctx.arc(nd.x, nd.y, isActive ? 3 : 2, 0, Math.PI*2);
        ctx.fillStyle = '#fff'; ctx.fill();
      });

      // Card popup — smooth fade in/out
      if (cardAlpha > 0.01) {
        const nd = gNodes[hotNodes[autoCardIdx]];
        if (nd) drawCard(nd.x, nd.y, CARDS_DATA[autoCardIdx], cardAlpha);
      }
    }

    function resize() {
      const c = canvas!;
      const parent=c.parentElement;
      W=parent?parent.clientWidth:600;
      H=parent?parent.clientHeight:700;
      c.width=Math.round(W*DPR);
      c.height=Math.round(H*DPR);
      c.style.width=W+'px';
      c.style.height=H+'px';
      ctx.setTransform(1,0,0,1,0,0);
      ctx.scale(DPR,DPR);
      cx=W*0.56; cy=H/2;
      R=Math.min(W,H)*0.46;
      const built=buildG(cx,cy,R);
      gNodes=built.nodes; gEdges=built.edges; hotNodes=built.hotNodes;
      orbPath=buildOrbPath(cx,cy,R);
      orbPathLen=buildPathLengths(orbPath);
    }

    const ro=new ResizeObserver(()=>{
      cancelAnimationFrame(animId);
      ctx.setTransform(1,0,0,1,0,0);
      resize();
      lastTs=0;
      animId=requestAnimationFrame(draw);
    });
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    resize();
    animId=requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', background: 'transparent' }}
    />
  );
};

/* ─── Static G Canvas (no animation, for /proof page) ───────────────────── */

export const GCanvasStatic = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const W = parent ? parent.clientWidth : 500;
    const H = parent ? parent.clientHeight : 500;
    canvas.width  = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(DPR, DPR);

    const cx = W * 0.5;
    const cy = H * 0.5;
    const R  = Math.min(W, H) * 0.49;
    const { nodes, edges } = buildG(cx, cy, R);

    // BG glow
    const bg = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.55);
    bg.addColorStop(0, 'rgba(49,82,173,0.20)');
    bg.addColorStop(1, 'rgba(9,17,33,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Edges — skip any edge that touches a hot node
    edges.forEach(([i, j]) => {
      if (nodes[i].layer === 'hot' || nodes[j].layer === 'hot') return;
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(80,140,220,0.22)';
      ctx.lineWidth   = 0.7;
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    });

    // Nodes — skip hot nodes entirely
    nodes.forEach(nd => {
      if (nd.layer === 'hot') return;
      ctx.beginPath();
      ctx.arc(nd.x, nd.y, 1.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(110,160,230,0.40)';
      ctx.fill();
    });

  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: 'block', width: '100%', height: '100%', background: 'transparent' }}
    />
  );
};
