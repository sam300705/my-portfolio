"use client";
import Image from "next/image";
import { useId, useState } from "react";
export default function ImageComparison() {
  const [position, setPosition] = useState(50);
  const id = useId();
  return (
    <div className="comparison">
      <div className="comparison-images">
        <Image
          src="/assets/projects/imgflow-output.png"
          width={720}
          height={480}
          alt="Image produced by the checked-out CLI palette-conversion command"
          sizes="(max-width: 800px) 90vw, 600px"
        />
        <div
          className="comparison-before"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src="/assets/projects/imgflow-input.png"
            width={720}
            height={480}
            alt="Original generated color-card input"
            sizes="(max-width: 800px) 90vw, 600px"
          />
        </div>
        <span
          className="comparison-line"
          style={{ left: `${position}%` }}
          aria-hidden="true"
        >
          <span>↔</span>
        </span>
        <span className="compare-label label-before">Input</span>
        <span className="compare-label label-after">CLI output</span>
      </div>
      <label htmlFor={id}>
        Compare the actual files <span>{position}% original</span>
      </label>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(event) => setPosition(Number(event.target.value))}
        aria-label="Reveal original image"
      />
      <noscript>
        <p>
          Both images are supplied as real image files. Open the source and
          output links below to compare without JavaScript.
        </p>
      </noscript>
    </div>
  );
}
