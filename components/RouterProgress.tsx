"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { nprogress, NavigationProgress } from "@mantine/nprogress";

export function RouterProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Complete the progress bar when route changes
    nprogress.complete();

    return () => {
      // Start progress on unmount (before new route loads)
      nprogress.start();
    };
  }, [pathname, searchParams]);

  return <NavigationProgress />;
}

// Hook to manually control progress (for programmatic navigation)
export { nprogress };
