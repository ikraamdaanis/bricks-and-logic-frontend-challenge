import {
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useEffect,
  useRef
} from "react";

interface InfiniteScrollProps extends HTMLAttributes<HTMLDivElement> {
  fetchNextPage: () => void;
  hasNextPage: boolean;
  loadingMessage?: ReactNode;
  endingMessage?: ReactNode;
  isDisabled: boolean;
}

/**
 * InfiniteScroller is a React component that enables infinite scrolling. It observes
 * an intersection target and triggers a fetch when that target becomes visible.
 */
export const InfiniteScroller = forwardRef<HTMLDivElement, InfiniteScrollProps>(
  function InfiniteScroller(
    {
      fetchNextPage,
      hasNextPage,
      loadingMessage = null,
      endingMessage = null,
      isDisabled = false,
      children,
      ...props
    },
    ref
  ) {
    const observerTarget = useRef(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        entries => {
          if (entries[0]?.isIntersecting && !isDisabled) {
            fetchNextPage();
          }
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
  }
);
