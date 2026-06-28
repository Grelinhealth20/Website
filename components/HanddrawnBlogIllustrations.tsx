"use client";

import React from "react";

export type BlogIllustrationType =
  | "clipboard"
  | "bandage"
  | "shield"
  | "building"
  | "network"
  | "chart";

export function HanddrawnBlogIllustration({ type }: { type: BlogIllustrationType }) {
  switch (type) {

    /* ── Revenue Integrity — document + bold checkmark ── */
    case "clipboard":
      return (
        <svg width="120" height="134" viewBox="0 0 120 134" fill="none">
          <rect x="8" y="16" width="104" height="116" rx="9" fill="white" />
          <rect x="34" y="6" width="52" height="22" rx="8" fill="white" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
          <line x1="22" y1="55" x2="98" y2="55" stroke="rgba(0,0,0,0.38)" strokeWidth="4" strokeLinecap="round" />
          <line x1="22" y1="75" x2="76" y2="75" stroke="rgba(0,0,0,0.38)" strokeWidth="4" strokeLinecap="round" />
          <polyline
            points="20,98 44,124 100,80"
            fill="none"
            stroke="rgba(0,0,0,0.78)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* ── Wound Care — bandage/plaster ── */
    case "bandage":
      return (
        <svg width="152" height="128" viewBox="0 0 152 128" fill="none">
          <g transform="rotate(-13, 76, 64)">
            <rect x="6" y="34" width="140" height="58" rx="29" fill="white" />
            <rect x="52" y="40" width="48" height="46" rx="4" fill="rgba(200,200,200,0.8)" />
            <rect x="64" y="44" width="24" height="38" rx="3" fill="rgba(0,0,0,0.12)" />
            <rect x="56" y="52" width="40" height="22" rx="3" fill="rgba(0,0,0,0.12)" />
            <circle cx="26" cy="63" r="9" fill="rgba(0,0,0,0.07)" />
            <circle cx="26" cy="63" r="4" fill="rgba(0,0,0,0.22)" />
            <circle cx="126" cy="63" r="9" fill="rgba(0,0,0,0.07)" />
            <circle cx="126" cy="63" r="4" fill="rgba(0,0,0,0.22)" />
          </g>
        </svg>
      );

    /* ── Pain Management — shield + padlock ── */
    case "shield":
      return (
        <svg width="110" height="128" viewBox="0 0 110 128" fill="none">
          <path
            d="M55 7 L92 23 L92 62 Q92 98 55 120 Q18 98 18 62 L18 23 Z"
            fill="white"
          />
          <path
            d="M40 67 L40 52 A15 15 0 0 1 70 52 L70 67"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="5.5"
            strokeLinecap="round"
            fill="none"
          />
          <rect x="36" y="65" width="38" height="34" rx="7" fill="rgba(0,0,0,0.13)" />
          <circle cx="55" cy="79" r="6.5" fill="rgba(0,0,0,0.3)" />
          <rect x="52" y="80" width="6" height="12" rx="2" fill="rgba(0,0,0,0.3)" />
        </svg>
      );

    /* ── MSO — three buildings ── */
    case "building":
      return (
        <svg width="156" height="126" viewBox="0 0 156 126" fill="none">
          <rect x="4" y="58" width="42" height="62" rx="4" fill="white" />
          <rect x="12" y="68" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="28" y="68" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="12" y="85" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="28" y="85" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />

          <rect x="57" y="20" width="42" height="100" rx="4" fill="white" />
          <rect x="66" y="31" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="83" y="31" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="66" y="49" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="83" y="49" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="66" y="67" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="83" y="67" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />

          <rect x="110" y="46" width="42" height="74" rx="4" fill="white" />
          <rect x="118" y="56" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="134" y="56" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="118" y="73" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />
          <rect x="134" y="73" width="12" height="12" rx="2" fill="rgba(0,0,0,0.1)" />

          <line x1="1" y1="122" x2="155" y2="122" stroke="rgba(0,0,0,0.2)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      );

    /* ── Platform — two panels + integration arrow ── */
    case "network":
      return (
        <svg width="154" height="112" viewBox="0 0 154 112" fill="none">
          {/* Left panel — existing system */}
          <rect x="4" y="12" width="58" height="88" rx="9" fill="white" />
          <line x1="16" y1="32" x2="50" y2="32" stroke="rgba(0,0,0,0.32)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="16" y1="48" x2="44" y2="48" stroke="rgba(0,0,0,0.32)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="16" y1="64" x2="48" y2="64" stroke="rgba(0,0,0,0.22)" strokeWidth="3" strokeLinecap="round" />
          <line x1="16" y1="78" x2="38" y2="78" stroke="rgba(0,0,0,0.18)" strokeWidth="2.5" strokeLinecap="round" />

          {/* Arrow */}
          <line x1="65" y1="56" x2="91" y2="56" stroke="rgba(0,0,0,0.65)" strokeWidth="5.5" strokeLinecap="round" />
          <polyline
            points="83,47 93,56 83,65"
            fill="none"
            stroke="rgba(0,0,0,0.65)"
            strokeWidth="5.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Right panel — with pre-bill validation */}
          <rect x="92" y="12" width="58" height="88" rx="9" fill="white" />
          <line x1="104" y1="32" x2="138" y2="32" stroke="rgba(0,0,0,0.32)" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="104" y1="48" x2="132" y2="48" stroke="rgba(0,0,0,0.32)" strokeWidth="3.5" strokeLinecap="round" />
          {/* Bold checkmark — validated */}
          <polyline
            points="104,72 118,88 140,62"
            fill="none"
            stroke="rgba(0,0,0,0.76)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    /* ── Revenue Integrity (cost) — declining bar chart ── */
    case "chart":
      return (
        <svg width="142" height="118" viewBox="0 0 142 118" fill="none">
          <rect x="8" y="10" width="36" height="96" rx="6" fill="white" />
          <rect x="54" y="34" width="36" height="72" rx="6" fill="white" />
          <rect x="100" y="56" width="36" height="50" rx="6" fill="white" />
          <line x1="2" y1="108" x2="140" y2="108" stroke="rgba(0,0,0,0.22)" strokeWidth="3.5" strokeLinecap="round" />
          <line
            x1="22" y1="6"
            x2="120" y2="58"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray="7 5"
          />
          <polyline
            points="113,53 122,60 115,69"
            fill="none"
            stroke="rgba(0,0,0,0.5)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    default:
      return null;
  }
}
