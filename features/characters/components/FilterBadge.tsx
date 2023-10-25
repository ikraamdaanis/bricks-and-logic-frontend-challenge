"use client";

import { Badge } from "components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "components/ui/tooltip";
import { useCreateQueryString } from "hooks/useCreateQueryString";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  filter: string;
  label: string;
  value: string;
};

/**
 * Displays a badge for a currently filtered field. If clicked, the filter will
 * be removed in the search params. Will return null if there is no value.
 */
export const FilterBadge = ({ filter, label, value }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCreateQueryString();

  if (!value) return null;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Badge
            className="cursor-pointer bg-brand-700 text-sm font-medium capitalize transition hover:bg-brand-700/50"
            onClick={() => {
              const value = createQueryString(filter, "");
              router.replace(`${pathname}/?${value}`);
            }}
          >
            {label} - {value}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p data-testid="tooltip-filter">Click to remove this filter</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
