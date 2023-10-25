import { useSearchParams } from "next/navigation";

/** Hook to get the Characters filter from the search params. */
export const useGetSearchFilters = () => {
  const searchParams = useSearchParams();

  const gender = searchParams.get("gender") || "";
  const name = searchParams.get("name") || "";
  const species = searchParams.get("species") || "";
  const status = searchParams.get("status") || "";

  return { gender, name, species, status };
};
