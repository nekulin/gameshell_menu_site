import { FC, useState } from "react";
import { motion, MotionConfig } from "framer-motion";




export const MenuButton: FC = (): JSX.Element => {
    const [active, setActive] = useState(false);
    return (
      <MotionConfig
        transition={{
          duration: 0.5,
          ease: "easeInOut",
        }}
      >
        <motion.button
          initial={false}
          animate={active ? "open" : "closed"}
          onClick={() => setActive((pv) => !pv)}
          className="relative h-10 w-10 rounded-full bg-gray-200 transition-colors"
        >
          <motion.span
            variants={VARIANTS.top}
            className="absolute h-0.5 w-5 bg-neutral-600"
            style={{ y: "-50%", left: "50%", x: "-50%", top: "34%" }}
          />
          <motion.span
            variants={VARIANTS.middle}
            className="absolute h-0.5 w-5 bg-neutral-600"
            style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
          />
          <motion.span
            variants={VARIANTS.bottom}
            className="absolute h-0.5 w-5 bg-neutral-600"
            style={{
              x: "-50%",
              y: "50%",
              bottom: "35%",
              left: "50%",
            }}
          />
        </motion.button>
      </MotionConfig>
    );
  };
  
  const VARIANTS = {
    top: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        top: ["34%", "50%", "50%"],
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        top: ["50%", "50%", "34%"],
      },
    },
    middle: {
      open: {
        rotate: ["0deg", "0deg", "-45deg"],
      },
      closed: {
        rotate: ["-45deg", "0deg", "0deg"],
      },
    },
    bottom: {
      open: {
        rotate: ["0deg", "0deg", "45deg"],
        bottom: ["35%", "50%", "50%"],
        left: "50%",
      },
      closed: {
        rotate: ["45deg", "0deg", "0deg"],
        bottom: ["50%", "50%", "35%"],
        left: "50%",
      },
    },
  };