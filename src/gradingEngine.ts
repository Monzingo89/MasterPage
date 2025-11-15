// src/gradingEngine.ts

export type CaptureSlot = "front_top" | "back_top" | "front_angle";

export interface CapturedImages {
  front_top?: string;
  back_top?: string;
  front_angle?: string;
}

export interface SubScores {
  centering: number;
  corners: number;
  edges: number;
  surface: number;
}

export interface GradingResult {
  predictedGrade: string;
  subScores: SubScores;
  notes: string[];
}

// PSA-style stub grading engine.
// Replace this later with real CV logic.
export function gradeCardFromImages(images: CapturedImages): GradingResult {
  const missing: string[] = [];
  if (!images.front_top) missing.push("Front (top-down)");
  if (!images.back_top) missing.push("Back (top-down)");
  if (!images.front_angle) missing.push("Front (angled)");

  if (missing.length > 0) {
    return {
      predictedGrade: "Incomplete capture",
      subScores: {
        centering: 0,
        corners: 0,
        edges: 0,
        surface: 0,
      },
      notes: [
        "Please capture all required images before grading.",
        `Missing: ${missing.join(", ")}`,
      ],
    };
  }

  // Placeholder: fake but believable subscores
  const base = 8.5;
  const jitter = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return (x - Math.floor(x)) * 0.6 - 0.3; // ±0.3
  };

  const centering = clamp(base + jitter(1), 7, 10);
  const corners = clamp(base + jitter(2), 7, 10);
  const edges = clamp(base + jitter(3), 7, 10);
  const surface = clamp(base + jitter(4), 7, 10);

  const raw = Math.min(centering + 0.3, corners, edges + 0.2, surface);
  const rounded = roundToHalf(raw);
  const label = gradeLabel(rounded);

  const notes: string[] = [];

  if (centering < 8.5) {
    notes.push("Centering may limit top grades (check left/right borders).");
  }
  if (corners < 9) {
    notes.push("Minor corner wear detected (zoom in on corners).");
  }
  if (edges < 9) {
    notes.push("Edge chipping or whitening could be present.");
  }
  if (surface < 9) {
    notes.push("Surface might have light scratches/print lines.");
  }
  if (notes.length === 0) {
    notes.push("Capture looks strong across all categories. Potential PSA 9–10 candidate.");
  }

  return {
    predictedGrade: `${label} (model estimate ~${rounded.toFixed(1)})`,
    subScores: { centering, corners, edges, surface },
    notes,
  };
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function roundToHalf(value: number): number {
  return Math.round(value * 2) / 2;
}

function gradeLabel(score: number): string {
  if (score >= 9.5) return "Likely PSA 10";
  if (score >= 9) return "Likely PSA 9";
  if (score >= 8) return "Likely PSA 8";
  if (score >= 7) return "Likely PSA 7";
  if (score >= 6) return "Likely PSA 6";
  return "Likely PSA 5 or lower";
}
