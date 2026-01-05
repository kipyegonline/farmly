"use client";
import React from "react";
import { Affix, Transition, ActionIcon, Tooltip } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { ArrowUp } from "lucide-react";

interface ScrollToTopProps {
  threshold?: number;
  position?: { bottom: number; right: number };
}

export function ScrollToTop({
  threshold = 300,
  position = { bottom: 20, right: 20 },
}: ScrollToTopProps) {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Affix position={position} zIndex={50}>
      <Transition transition="slide-up" mounted={scroll.y > threshold}>
        {(transitionStyles) => (
          <Tooltip label="Back to top" position="left" withArrow>
            <ActionIcon
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              size="xl"
              radius="xl"
              variant="filled"
              className="bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 transition-all duration-300 hover:scale-110 active:scale-95"
              aria-label="Scroll to top"
            >
              <ArrowUp size={22} className="text-white" />
            </ActionIcon>
          </Tooltip>
        )}
      </Transition>
    </Affix>
  );
}
