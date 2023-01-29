import { interpolate } from "d3-interpolate";
import { select } from "d3-selection";
import { arc } from "d3-shape";
import { transition } from "d3-transition";
import { interpolateNumber } from "d3-interpolate";
import { format } from "d3-format";
import { useEffect, useRef } from "react";
import usePrevious from "../hooks/usePrevious";

const arcTween =
  (newAngle: number, arcGenerator: (value: number) => string | undefined) =>
  (d: any) => {
    const customInterpolate = interpolate(d.endAngle, newAngle);
    return (t: number) => {
      return arcGenerator(customInterpolate(t)) || "";
    };
  };

const formatNumber = format(",d");

const tau = 2 * Math.PI;

const arcGeneratorFactory =
  (arcInnerRadius: number, arcOutherRadius: number) => (endAngle: number) =>
    arc().cornerRadius(5)({
      innerRadius: arcInnerRadius,
      outerRadius: arcOutherRadius,
      startAngle: 0,
      endAngle,
    }) || undefined;

type CircurlaProgressProps = {
  width?: number;
  arcWidth?: number;
  value: number;
};

export default function CircularProgress({
  width: svgWidth = 150,
  arcWidth = 12,
  value,
}: CircurlaProgressProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<SVGPathElement>(null);
  const svgHeight = svgWidth;
  const arcOuterRadius = svgWidth / 2;
  const arcInnerRadius = svgWidth / 2 - arcWidth;
  const previous = usePrevious(value) || 0;

  const arcGenerator = arcGeneratorFactory(arcInnerRadius, arcOuterRadius);

  // animate text
  useEffect(() => {
    if (!textRef.current) return;
    const t = transition().duration(800);

    select(textRef.current)
      .transition(t)
      .tween("text", function () {
        const that = select(this);
        const i = interpolateNumber(
          parseFloat(that.text().replace(/,/g, ".")),
          value
        );
        return function (t: number) {
          that.text(formatNumber(i(t)));
        };
      });
  }, [textRef, value]);

  // animate bar
  useEffect(() => {
    if (!barRef.current) return;
    const t = transition().duration(800);
    select(barRef.current)
      .datum({ endAngle: (previous * tau) / 100 })
      .transition(t)
      .duration(750)
      .attrTween("d", arcTween((value * tau) / 100, arcGenerator));
  }, [barRef, value]);

  return (
    <div className="relative">
      <svg height={svgHeight} width={svgWidth}>
        <g transform={`translate(${svgWidth / 2}, ${svgHeight / 2})`}>
          <path d={arcGenerator(tau)} opacity="0.2" />
          <path ref={barRef} d={arcGenerator(0)} fill="#22a423" />
        </g>
      </svg>
      <div
        className="absolute flex items-center justify-center inset-0 text-4xl"
        style={{ width: svgWidth, height: svgHeight }}
      >
        <span ref={textRef}>0</span>
        <span>%</span>
      </div>
    </div>
  );
}
