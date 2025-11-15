// src/components/CardGrader.tsx

import React, { useState } from "react";
import {
  gradeCardFromImages,
  type CapturedImages,
  type GradingResult,
  type CaptureSlot,
} from "../gradingEngine";

type StepId = "front_top" | "back_top" | "front_angle" | "review";

interface StepConfig {
  id: StepId;
  label: string;
  short?: string;
  description: string;
  slot?: CaptureSlot;
}

const STEPS: StepConfig[] = [
  {
    id: "front_top",
    label: "Step 1",
    short: "Front (Top)",
    description: "Front – top-down (phone parallel to the card).",
    slot: "front_top",
  },
  {
    id: "back_top",
    label: "Step 2",
    short: "Back (Top)",
    description: "Back – top-down (same framing & angle).",
    slot: "back_top",
  },
  {
    id: "front_angle",
    label: "Step 3",
    short: "Front (Angled)",
    description: "Front – angled (~20–30° tilt for surface).",
    slot: "front_angle",
  },
  {
    id: "review",
    label: "Step 4",
    description: "Review captures & run PSA-style grade estimate.",
  },
];

const stepIndexById: Record<StepId, number> = {
  front_top: 0,
  back_top: 1,
  front_angle: 2,
  review: 3,
};

export const CardGrader: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<StepId>("front_top");
  const [images, setImages] = useState<CapturedImages>({});
  const [result, setResult] = useState<GradingResult | null>(null);
  const [isGrading, setIsGrading] = useState(false);
  const [activeUploadSlot, setActiveUploadSlot] = useState<CaptureSlot | null>(
    // start with the first required capture highlighted
    "front_top"
  );

  const currentStepConfig = STEPS[stepIndexById[currentStep]];
  const currentIndex = stepIndexById[currentStep];
  const totalSteps = STEPS.length;

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    slot: CaptureSlot
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setImages((prev) => ({ ...prev, [slot]: dataUrl }));

      // auto-advance to next step if available
      if (currentStep !== "review") {
        const nextStep = STEPS[currentIndex + 1];
        if (nextStep) setCurrentStep(nextStep.id);
      }

      // clear the active upload highlight after a short delay so user sees the result
      setTimeout(() => setActiveUploadSlot(null), 300);
    };
    reader.readAsDataURL(file);
  };

  const handleGrade = () => {
    setIsGrading(true);
    setTimeout(() => {
      const graded = gradeCardFromImages(images);
      setResult(graded);
      setIsGrading(false);
    }, 300);
  };

  const handleReset = () => {
    setImages({});
    setResult(null);
    setCurrentStep("front_top");
  };

  const goToStep = (id: StepId) => setCurrentStep(id);

  return (
    <div
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "1.5rem 1rem 3rem",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "1.8rem", marginBottom: "0.25rem" }}>
        GaaS – Grading as a Service (Demo)
      </h1>
      <p style={{ marginTop: 0, color: "#6b7280", maxWidth: "640px" }}>
        Capture your card front, back, and an angled shot. We&apos;ll estimate a PSA-style grade
        based on centering, corners, edges, and surface. This is an early demo model – visual only.
      </p>

      {/* Stepper */}
      <div style={{ display: "flex", gap: "0.75rem", margin: "1rem 0 1.5rem" }}>
          {STEPS.map((step, idx) => {
          const isActive = step.id === currentStep;
          const isCompleted = idx < currentIndex;
          return (
            <button
              key={step.id}
              type="button"
              onClick={() => goToStep(step.id)}
              style={{
                flex: 1,
                padding: "0.45rem 0.5rem",
                borderRadius: "9999px",
                border: isActive ? "2px solid #4f46e5" : "1px solid #d1d5db",
                backgroundColor: isActive
                  ? "#eef2ff"
                  : isCompleted
                  ? "#f3f4f6"
                  : "#ffffff",
                cursor: "pointer",
                fontSize: "0.8rem",
              }}
            >
              <div style={{ fontWeight: 600 }}>{step.label}</div>
              <div style={{ fontSize: "0.7rem", color: "#111827" }}>
                {step.short ?? (step.slot ? step.description.split("–")[0] : "Review")}
              </div>
            </button>
          )
        })}
      </div>

      {/* Progress bar */}
      <div
        style={{
          width: "100%",
          height: "6px",
          backgroundColor: "#e5e7eb",
          borderRadius: "9999px",
          overflow: "hidden",
          marginBottom: "1.25rem",
        }}
      >
        <div
          style={{
            width: `${((currentIndex + 1) / totalSteps) * 100}%`,
            height: "100%",
            backgroundColor: "#4f46e5",
            transition: "width 0.25s ease",
          }}
        />
      </div>

      {/* Content card */}
      <div
        style={{
          borderRadius: "0.9rem",
          border: "1px solid #e5e7eb",
          padding: "1.25rem",
          boxShadow: "0 10px 30px rgba(0,0,0,0.04)",
          backgroundColor: "#ffffff",
        }}
      >
        <h2 style={{ fontSize: "1.1rem", marginTop: 0, color: "#111827" }}>
          {currentStepConfig.description}
        </h2>

        {currentStep !== "review" && currentStepConfig.slot && (
          <>
            <p style={{ color: "#111827", fontSize: "0.9rem" }}>
              {activeUploadSlot === "front_top" && (
                <>
                  Place the card on a flat, non-glossy surface. Hold your phone <strong>parallel to the card</strong> in a top-down position, ensuring the entire card is visible and in focus. Use the <strong>Use camera</strong> button to capture directly, or the <strong>Choose file</strong> button to upload an existing photo.
                </>
              )}
              {activeUploadSlot === "back_top" && (
                <>
                  Flip the card over to show the back. Keep the same <strong>top-down angle and framing</strong> as the front photo. Ensure the card is flat and the entire back is visible. Use the <strong>Use camera</strong> button to capture directly, or the <strong>Choose file</strong> button to upload an existing photo.
                </>
              )}
              {activeUploadSlot === "front_angle" && (
                <>
                  Tilt your phone to a <strong>20-30° angle</strong> to capture the card's surface details and depth. Focus on corners and edges to show any wear or imperfections. Use the <strong>Use camera</strong> button to capture directly, or the <strong>Choose file</strong> button to upload an existing photo.
                </>
              )}
              {!activeUploadSlot && (
                <>
                  Click on any card slot above to begin uploading. Use the <strong>Use camera</strong> button to capture directly from your device, or the <strong>Choose file</strong> button to upload an existing photo. On mobile, the <strong>Use camera</strong> option opens the rear camera.
                </>
              )}
            </p>
            {/* Two hidden inputs + visible buttons: Choose file (picker) and Use camera (capture) */}
            <input
              id={`file-input-${currentStepConfig.slot}-choose`}
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFileChange(e, currentStepConfig.slot as CaptureSlot)
              }
              style={{ display: "none" }}
            />

            <input
              id={`file-input-${currentStepConfig.slot}-camera`}
              type="file"
              accept="image/*"
              capture="environment"
              onChange={(e) =>
                handleFileChange(e, currentStepConfig.slot as CaptureSlot)
              }
              style={{ display: "none" }}
            />

            <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.75rem" }}>
              <label
                htmlFor={`file-input-${currentStepConfig.slot}-choose`}
                role="button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 0.9rem",
                  borderRadius: "9999px",
                  background: "#111827",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 6px 14px rgba(0,0,0,0.12)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 10l5-5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Choose file
              </label>

              <label
                htmlFor={`file-input-${currentStepConfig.slot}-camera`}
                role="button"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 0.9rem",
                  borderRadius: "9999px",
                  background: "linear-gradient(90deg, #7c3aed, #5b21b6)",
                  color: "white",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                  boxShadow: "0 6px 18px rgba(91,33,182,0.18)",
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v12z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="13" r="3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Use camera
              </label>
            </div>

            <div
              style={{
                marginTop: "1rem",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: "0.75rem",
              }}
            >
              {(["front_top", "back_top", "front_angle"] as CaptureSlot[]).map(
                (slot) => (
                  <div
                    key={slot}
                    className={`capture-tile ${activeUploadSlot === slot ? 'upload-flash' : ''}`}
                    onClick={() => {
                      // allow quick switching to this capture slot and highlight it
                      setActiveUploadSlot(slot);
                      setCurrentStep(slot as StepId);
                    }}
                    style={{
                      borderRadius: "0.6rem",
                      border: "1px solid #e5e7eb",
                      padding: "0.6rem",
                      textAlign: "center",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        marginBottom: "0.3rem",
                        color: "#111827",
                      }}
                    >
                      {slotLabel(slot)}
                    </div>
                    {images[slot] ? (
                      <img
                        src={images[slot]}
                        alt={slotLabel(slot)}
                        style={{
                          maxWidth: "100%",
                          maxHeight: "140px",
                          borderRadius: "0.4rem",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "140px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          color: "#9ca3af",
                          border: "1px dashed #e5e7eb",
                          borderRadius: "0.4rem",
                        }}
                      >
                        Not captured yet
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </>
        )}

        {currentStep === "review" && (
          <>
            <p style={{ color: "#111827", fontSize: "0.9rem" }}>
              Check your captures, then run the grade estimate. For best results, the
              card should fill most of the frame and be in sharp focus.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              {(["front_top", "back_top", "front_angle"] as CaptureSlot[]).map(
                (slot) => (
                  <div
                    key={slot}
                    style={{
                      borderRadius: "0.75rem",
                      border: "1px solid #e5e7eb",
                      padding: "0.75rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: 600,
                          color: "#111827",
                        }}
                      >
                        {slotLabel(slot)}
                      </div>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(slot as StepId)}
                        style={{
                          border: "none",
                          background: "none",
                          color: "#4f46e5",
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        Retake
                      </button>
                    </div>
                    {images[slot] ? (
                      <img
                        src={images[slot]}
                        alt={slotLabel(slot)}
                        style={{
                          width: "100%",
                          borderRadius: "0.5rem",
                          objectFit: "cover",
                          maxHeight: "260px",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "200px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.8rem",
                          color: "#9ca3af",
                          border: "1px dashed #e5e7eb",
                          borderRadius: "0.5rem",
                        }}
                      >
                        No image yet
                      </div>
                    )}
                  </div>
                )
              )}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <button
                type="button"
                onClick={handleGrade}
                disabled={isGrading}
                style={{
                  padding: "0.6rem 1.35rem",
                  borderRadius: "9999px",
                  border: "none",
                  backgroundColor: "#4f46e5",
                  color: "white",
                  fontWeight: 600,
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                {isGrading ? "Analyzing…" : "Run Grade Estimate"}
              </button>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  padding: "0.6rem 1.35rem",
                  borderRadius: "9999px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                }}
              >
                Start Over
              </button>
            </div>

            {result && (
              <div
                style={{
                  borderRadius: "0.75rem",
                  border: "1px solid #e5e7eb",
                  padding: "1rem",
                  backgroundColor: "#f9fafb",
                }}
              >
                <h3
                  style={{
                    marginTop: 0,
                    marginBottom: "0.5rem",
                    fontSize: "1.1rem",
                    color: "#111827",
                  }}
                >
                  Estimated Grade
                </h3>
                <div
                  style={{
                    fontSize: "1.05rem",
                    fontWeight: 700,
                    marginBottom: "0.75rem",
                    color:
                      result.predictedGrade.startsWith("Incomplete") ||
                      result.predictedGrade.startsWith("Missing")
                        ? "#b91c1c"
                        : "#111827",
                  }}
                >
                  {result.predictedGrade}
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                    gap: "0.75rem",
                    marginBottom: "0.75rem",
                  }}
                >
                  {([
                    ["Centering", result.subScores.centering],
                    ["Corners", result.subScores.corners],
                    ["Edges", result.subScores.edges],
                    ["Surface", result.subScores.surface],
                  ] as const).map(([label, value]) => (
                    <div
                      key={label}
                      style={{
                        borderRadius: "0.5rem",
                        border: "1px solid #e5e7eb",
                        padding: "0.6rem",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "0.8rem",
                          color: "#111827",
                          marginBottom: "0.15rem",
                        }}
                      >
                        {label}
                      </div>
                      <div
                        style={{
                          fontSize: "1rem",
                          fontWeight: 600,
                        }}
                      >
                        {value.toFixed(1)} / 10
                      </div>
                    </div>
                  ))}
                </div>

                <ul
                  style={{
                    margin: 0,
                    paddingLeft: "1.1rem",
                    fontSize: "0.85rem",
                    color: "#374151",
                  }}
                >
                  {result.notes.map((note, idx) => (
                    <li key={idx}>{note}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

function slotLabel(slot: CaptureSlot): string {
  switch (slot) {
    case "front_top":
      return "Front – Top-down";
    case "back_top":
      return "Back – Top-down";
    case "front_angle":
      return "Front – Angled";
    default:
      return slot;
  }
}

export default CardGrader;