interface SectionDividerProps {
  color?: "lavender" | "mint" | "blush" | "background";
  flip?: boolean;
}

const colorMap = {
  lavender: "hsl(262, 52%, 93%)",
  mint: "hsl(163, 37%, 88%)",
  blush: "hsl(340, 42%, 93%)",
  background: "hsl(270, 33%, 98%)",
};

const SectionDivider = ({ color = "background", flip = false }: SectionDividerProps) => {
  const fill = colorMap[color];
  return (
    <div className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""}`}>
      <svg
        viewBox="0 0 1440 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto animate-wave"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
};

export default SectionDivider;
