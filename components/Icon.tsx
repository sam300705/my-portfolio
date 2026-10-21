import type { SVGProps } from "react";
export function Arrow({
  down = false,
  ...props
}: SVGProps<SVGSVGElement> & { down?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d={down ? "M12 4v16m-6-6 6 6 6-6" : "M5 19 19 5M5 5h14v14"} />
    </svg>
  );
}
export function Brand() {
  return (
    <span className="brand-mark" aria-hidden="true">
      ks<span>.</span>
    </span>
  );
}
