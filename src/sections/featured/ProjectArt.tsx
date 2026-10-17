import type { ReactNode } from "react";

/**
 * Placeholder artwork shown until real screenshots are added.
 * To use a screenshot instead, set `image` on the project in projectData.ts.
 */

/** Builds the spiral "print path" drawn on the Batterly placeholder. */
function buildSpiralPath(turns = 5.2, steps = 260) {
  const points: string[] = [];

  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const radius = 8 + t * 106;
    const x = 240 + radius * Math.cos(angle);
    const y = 180 + radius * Math.sin(angle);

    points.push(`${x.toFixed(1)} ${y.toFixed(1)}`);
  }

  return `M${points.join(" L")}`;
}

const SPIRAL_PATH = buildSpiralPath();

function WhatsOnArt() {
  return (
    <>
      <rect x="372" y="34" width="196" height="330" rx="30" className="pn" />
      <rect x="384" y="52" width="172" height="294" rx="20" fill="rgba(6,14,12,.35)" />
      <rect x="398" y="70" width="70" height="10" rx="5" className="ps" />
      <rect x="398" y="92" width="44" height="18" rx="9" className="pa" />
      <rect x="448" y="92" width="44" height="18" rx="9" className="pn" />
      <rect x="498" y="92" width="44" height="18" rx="9" className="pn" />
      <rect x="398" y="128" width="144" height="52" rx="12" className="pn" />
      <rect x="406" y="136" width="36" height="36" rx="8" className="pa" />
      <rect x="450" y="140" width="80" height="8" rx="4" className="ps" />
      <rect x="450" y="156" width="52" height="6" rx="3" className="pl" />
      <rect x="398" y="192" width="144" height="52" rx="12" className="pn" />
      <rect x="406" y="200" width="36" height="36" rx="8" className="pl" />
      <rect x="450" y="204" width="80" height="8" rx="4" className="ps" />
      <rect x="450" y="220" width="52" height="6" rx="3" className="pl" />
      <rect x="398" y="256" width="144" height="52" rx="12" className="pn" />
      <rect x="406" y="264" width="36" height="36" rx="8" className="pl" />
      <rect x="450" y="268" width="80" height="8" rx="4" className="ps" />
      <rect x="450" y="284" width="52" height="6" rx="3" className="pl" />
      <rect x="168" y="70" width="196" height="118" rx="16" className="pn" />
      <rect x="182" y="84" width="168" height="52" rx="10" className="pa" opacity=".9" />
      <rect x="182" y="150" width="110" height="9" rx="4.5" className="ps" />
      <rect x="182" y="168" width="70" height="7" rx="3.5" className="pl" />
      <rect x="128" y="208" width="176" height="70" rx="14" className="pn" />
      <circle cx="156" cy="243" r="14" className="pa" />
      <rect x="180" y="232" width="96" height="9" rx="4.5" className="ps" />
      <rect x="180" y="250" width="64" height="7" rx="3.5" className="pl" />
      <circle cx="340" cy="236" r="9" className="pa" />
      <circle cx="340" cy="236" r="3.5" className="ps" />
    </>
  );
}

function BatterlyArt() {
  return (
    <>
      <rect x="120" y="40" width="230" height="230" rx="18" className="pn" />
      <circle cx="142" cy="60" r="4" className="pl" />
      <circle cx="156" cy="60" r="4" className="pl" />
      <circle cx="170" cy="60" r="4" className="pl" />
      <circle cx="235" cy="164" r="76" className="pn" />
      <g transform="translate(235 164) scale(.62) translate(-240 -180)">
        <path className="pas" strokeWidth="6" d={SPIRAL_PATH} />
      </g>
      <path d="M350 156H392" className="pls" strokeDasharray="5 6" />
      <circle cx="490" cy="164" r="92" className="pn" />
      <g transform="translate(490 164) scale(.8) translate(-240 -180)">
        <path className="pas" strokeWidth="5" d={SPIRAL_PATH} />
      </g>
      <path className="pb" d="M388 62V34h30M592 62V34h-30M388 266v28h30M592 266v28h-30" />
    </>
  );
}

function AuxiliumArt() {
  return (
    <>
      <rect x="112" y="40" width="250" height="236" rx="18" className="pn" />
      <rect x="132" y="60" width="64" height="18" rx="9" className="pa" />
      <rect x="204" y="60" width="44" height="18" rx="9" className="pn" />
      <path
        d="M172 176A52 52 0 0 1 276 176"
        className="pls"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path d="M172 176A52 52 0 0 1 207.9 126.5" className="pas" strokeWidth="10" />
      <circle cx="224" cy="176" r="5" className="ps" />
      <polyline
        points="132,238 150,238 164,214 178,256 194,222 210,244 226,230 242,250 258,220 276,240 292,226 310,242 328,232 342,236"
        className="pas"
        strokeWidth="3"
      />
      <path
        d="M486 60L512 190"
        fill="none"
        stroke="rgba(238,243,239,.2)"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d="M512 190L476 292"
        fill="none"
        stroke="rgba(238,243,239,.2)"
        strokeWidth="34"
        strokeLinecap="round"
      />
      <path
        d="M548 96L556 250"
        fill="none"
        stroke="#6B7BFF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="512" cy="190" r="22" className="pa" />
      <circle cx="512" cy="190" r="8" className="ps" />
      <path d="M362 176C420 170 450 190 488 190" className="pls" strokeDasharray="5 6" />
    </>
  );
}

const ART_BY_ID: Record<string, () => ReactNode> = {
  whatson: WhatsOnArt,
  batterly: BatterlyArt,
  auxilium: AuxiliumArt,
};

export default function ProjectArt({ id }: { id: string }) {
  const Art = ART_BY_ID[id];

  if (!Art) return null;

  return (
    <div className={`fp-art fp-art--${id}`} aria-hidden="true">
      <svg viewBox="0 0 720 480" preserveAspectRatio="xMidYMid slice" focusable="false">
        <Art />
      </svg>
    </div>
  );
}
