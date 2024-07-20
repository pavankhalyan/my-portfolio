import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "@motionone/utils";
import { Link } from "react-router-dom";
import { sideBarLeftSocials, liveTickerData } from "../assets/lib/data";

interface ParallaxProps {
  children: any;
  baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef<number>(1);
  useAnimationFrame((_, delta) => { // Removed 't' parameter as it's not used
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMobileMenuActive(true);
      } else {
        setIsMobileMenuActive(false);
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="overflow-hidden whitespace-nowrap flex flex-nowrap m-0">
      <motion.div
        className="font-semibold text-9xl flex whitespace-nowrap flex-nowrap"
        style={{ x }}
      >
        {isMobileMenuActive ? (
          <>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
          </>
        ) : (
          <>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
            <p className="block mr-12 text-black">{children}</p>
          </>
        )}
      </motion.div>
    </div>
  );
}

export default function LiveTicker() {
  return (
    <>
      <div className="bg-[--lightblue] h-[4.8vh] -rotate-3 flex justify-center items-center scale-110 relative z-[1] w-full min-[1921px]:h-[3.3vh]">
        <ParallaxText baseVelocity={-2}>
          <Link
            to={sideBarLeftSocials[1].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-[--orange]">&lt;</span>
            {liveTickerData.content.en}
            <span className="text-[--orange]">/&gt;</span>
          </Link>
        </ParallaxText>
      </div>
    </>
  );
}
