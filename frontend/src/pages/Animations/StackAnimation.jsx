import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function StackAnimation() {
  const [stack, setStack] = useState([]);
  const stackRefs = useRef([]);
  const stackBoxRef = useRef(null);

  const pushElement = () => {
    const newValue = Math.floor(Math.random() * 100);
    setStack((prev) => [...prev, newValue]);
  };

  const popElement = () => {
    setStack((prev) => prev.slice(0, -1));
  };

  useEffect(() => {
    if (stack.length > 0) {
      const lastIndex = stack.length - 1;
      const el = stackRefs.current[lastIndex];
      gsap.fromTo(
        el,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [stack]);

  return (
    <div className="text-center">
      <div className="mb-4">
        <button onClick={pushElement} className="bg-green-500 px-4 py-2 text-white rounded mx-2">Push</button>
        <button onClick={popElement} className="bg-red-500 px-4 py-2 text-white rounded mx-2">Pop</button>
      </div>

      <div
        ref={stackBoxRef}
        className="w-40 h-64 border-4 border-blue-700 mx-auto relative overflow-hidden"
        style={{ borderBottom: "none" }}
      >
        {stack.map((val, idx) => (
          <div
            key={idx}
            ref={(el) => (stackRefs.current[idx] = el)}
            className="w-full h-10 bg-blue-500 text-white flex items-center justify-center absolute"
            style={{ bottom: `${idx * 40}px` }}
          >
            {val}
          </div>
        ))}
      </div>
    </div>
  );
}
