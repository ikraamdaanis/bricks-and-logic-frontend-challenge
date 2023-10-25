"use client";

import { Button } from "components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "components/ui/dropdown-menu";
import { Input } from "components/ui/input";
import { FilterBadge } from "features/characters/components/FilterBadge";
import { useCreateQueryString } from "hooks/useCreateQueryString";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

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
      { value: "alive", label: "Alive" },
      { value: "dead", label: "Dead" },
      { value: "unknown", label: "Unknown" }
    ],
    species: [
      { value: "human", label: "Human" },
      { value: "alien", label: "Alien" }
    ],
    gender: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
      { value: "genderless", label: "Genderless" },
      { value: "unknown", label: "Unknown" }
    ]
  };

  function clearFilters() {
    const params = new URLSearchParams(searchParams);

    Object.keys(options).forEach(key => {
      params.delete(key);
    });

    const value = params.toString();

    router.replace(`${pathname}/?${value}`);
  }

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
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-full">
                <SlidersHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              {Object.entries(options).map(([groupKey, option]) => {
                return (
                  <Fragment key={groupKey}>
                    <DropdownMenuLabel className="capitalize">
                      {groupKey}
                    </DropdownMenuLabel>
                    <DropdownMenuRadioGroup
                      value={searchParams.get(groupKey) || ""}
                      onValueChange={value => {
                        const query = createQueryString(groupKey, value);
                        router.replace(`${pathname}/?${query}`);
                      }}
                    >
                      {option.map(option => {
                        return (
                          <DropdownMenuRadioItem
                            value={option.value}
                            key={option.value}
                            className="cursor-pointer"
                          >
                            {option.label}
                          </DropdownMenuRadioItem>
                        );
                      })}
                    </DropdownMenuRadioGroup>
                    <DropdownMenuSeparator />
                  </Fragment>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
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
          <Button
            variant="link"
            className="px-2"
            onClick={() => clearFilters()}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </>
  );
};
