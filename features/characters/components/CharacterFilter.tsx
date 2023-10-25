"use client";

import { Input } from "components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "components/ui/select";
import { FilterBadge } from "features/characters/components/FilterBadge";
import { useCreateQueryString } from "hooks/useCreateQueryString";
import { Check } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/**
 * Allows users to filter and search for characters. It provides an input
 * field to search by name and a dropdown select to filter by various
 * character attributes such as status, species, and gender.
 */
export const CharacterFilter = () => {
  const router = useRouter();
  const pathname = usePathname();

  const createQueryString = useCreateQueryString();

  const searchParams = useSearchParams();
  const nameSearchQuery = searchParams.get("name") || "";
  const statusSearchFilter = searchParams.get("status") || "";
  const speciesSearchFilter = searchParams.get("species") || "";
  const genderSearchFilter = searchParams.get("gender") || "";

  const hasFilter =
    statusSearchFilter || speciesSearchFilter || genderSearchFilter;

  // https://rickandmortyapi.com/documentation/#filter-characters
  const options = {
    status: [
      { value: "status=alive", label: "Alive" },
      { value: "status=dead", label: "Dead" },
      { value: "status=unknown", label: "Unknown" }
    ],
    species: [
      { value: "species=human", label: "Human" },
      { value: "species=alien", label: "Alien" }
    ],
    gender: [
      { value: "gender=male", label: "Male" },
      { value: "gender=female", label: "Female" },
      { value: "gender=genderless", label: "Genderless" },
      { value: "gender=unknown", label: "Unknown" }
    ]
  };

  return (
    <>
      <div className="flex w-full items-center gap-2">
        <Input
          placeholder="Search for a Character"
          className="w-full"
          defaultValue={nameSearchQuery}
          onChange={({ target }) => {
            const value = createQueryString("name", target.value);

            router.replace(`${pathname}/?${value}`);
          }}
        />
        <div className="w-[180px]">
          <Select
            onValueChange={value => {
              const [key, v] = value.split("=");
              const query = createQueryString(key, v);
              router.replace(`${pathname}/?${query}`);
            }}
            value=""
          >
            <SelectTrigger>
              <SelectValue
                className="w-48 rounded-md bg-white py-2 pl-4 pr-10 text-gray-900 shadow-md dark:bg-gray-800 dark:text-gray-100"
                placeholder="Filter by"
              />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(options).map(([groupLabel, option]) => {
                return (
                  <SelectGroup key={groupLabel}>
                    <SelectLabel className="capitalize">
                      {groupLabel}
                    </SelectLabel>
                    {option.map(option => {
                      const value = option.value.split("=")[1];

                      return (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="cursor-pointer"
                        >
                          {searchParams.get(groupLabel) === value && (
                            <span className="absolute left-2 top-1/2 flex h-3.5 w-3.5 -translate-y-1/2 items-center justify-center">
                              <Check className="h-4 w-4" />
                            </span>
                          )}
                          {option.label}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
      {hasFilter && (
        <div className="flex w-full items-center justify-start gap-1">
          <span>Filters: </span>
          <FilterBadge
            filter={"status"}
            label={"Status"}
            value={statusSearchFilter}
          />
          <FilterBadge
            filter={"species"}
            label={"Species"}
            value={speciesSearchFilter}
          />
          <FilterBadge
            filter={"gender"}
            label={"Gender"}
            value={genderSearchFilter}
          />
        </div>
      )}
    </>
  );
};
