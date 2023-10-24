import React from "react";

interface InfiniteScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  loadingMessage?: React.ReactNode;
  endingMessage?: React.ReactNode;
  disabled: boolean;
}

/**
 * InfiniteScroller is a React component that enables infinite scrolling. It observes
 * an intersection target and triggers a fetch when that target becomes visible.
 */
export const InfiniteScroller = React.forwardRef<
  HTMLDivElement,
  InfiniteScrollProps
>(function InfiniteScroller(
  {
    fetchNextPage,
    hasNextPage,
    loadingMessage = null,
    endingMessage = null,
    disabled = false,
    children,
    ...props
  },
  ref
) {
  const observerTarget = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) !disabled && fetchNextPage();
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={ref} {...props} style={{ overflowAnchor: "none" }}>
      {children}
      <div ref={observerTarget} />
      {hasNextPage ? loadingMessage : endingMessage}
    </div>
  );
});
