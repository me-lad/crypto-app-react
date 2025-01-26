function Loading() {
  return (
    <svg
      className="m-auto max-w-[150px] py-12"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 200"
    >
      <radialGradient
        id="a11"
        cx=".66"
        fx=".66"
        cy=".3125"
        fy=".3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stopColor="#15803c"></stop>
        <stop offset=".3" stopColor="#15803c" stopOpacity=".9"></stop>
        <stop offset=".6" stopColor="#15803c" stopOpacity=".6"></stop>
        <stop offset=".8" stopColor="#15803c" stopOpacity=".3"></stop>
        <stop offset="1" stopColor="#15803c" stopOpacity="0"></stop>
      </radialGradient>
      <circle
        transform-origin="center"
        fill="none"
        stroke="url(#a11)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="2"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
      <circle
        transform-origin="center"
        fill="none"
        opacity=".2"
        stroke="#15803c"
        strokeWidth="12"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      ></circle>
    </svg>
  );
}

export default Loading;
