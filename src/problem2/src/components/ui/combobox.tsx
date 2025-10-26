"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export interface ComboboxItem {
  value: string;
  label: React.ReactNode;
}

interface ComboboxProps<T> {
  items: ComboboxItem[];
  value: string;
  onChange: (value: string, raw: T) => void;
  placeholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onSearch?: (searchTerm: string) => void;
  searchDebounce?: number;
}

export function Combobox<T>({
  items,
  value,
  onChange,
  placeholder = "Select an option",
  emptyMessage = "No results found.",
  className,
  disabled = false,
  loading = false,
  onSearch,
  searchDebounce = 500,
  ...props
}: ComboboxProps<T> & React.ComponentProps<"div">) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const debouncedSearchRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const comboboxContainerRef = React.useRef<HTMLDivElement>(null);
  // Handle input change with debounce for search
  const handleInputChange = React.useCallback(
    (value: string) => {
      setInputValue(value);

      if (onSearch) {
        // Clear any existing timeout
        if (debouncedSearchRef.current) {
          clearTimeout(debouncedSearchRef.current);
        }

        // Set a new timeout
        debouncedSearchRef.current = setTimeout(() => {
          onSearch(value);
        }, searchDebounce);
      }
    },
    [onSearch, searchDebounce]
  );

  // Clear the timeout on unmount
  React.useEffect(() => {
    return () => {
      if (debouncedSearchRef.current) {
        clearTimeout(debouncedSearchRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        !comboboxContainerRef.current?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={comboboxContainerRef} {...props}>
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn("w-full justify-between", className)}
        disabled={disabled}
        onClick={() => setOpen(!open)}
        type="button"
      >
        {value
          ? items.find((item) => item.value === value)?.label || placeholder
          : placeholder}
        <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {open && (
        <div
          className="bg-popover text-popover-foreground absolute top-full left-0 z-50 mt-1 w-full min-w-[200px] rounded-md border p-0 shadow-md"
          style={{
            width: "var(--radix-popover-trigger-width, 100%)",
          }}
        >
          <Command
            filter={(value, search) => {
              // Disable built-in filtering when we use server-side search
              if (onSearch) return 1;
              return value.includes(search.toLowerCase()) ? 1 : 0;
            }}
          >
            <CommandInput
              placeholder={placeholder}
              className="h-9"
              value={inputValue}
              onValueChange={handleInputChange}
            />
            <CommandList>
              {loading ? (
                <CommandEmpty>
                  <div className="space-y-2 p-2">
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[96%]" />
                    <Skeleton className="h-4 w-[93%]" />
                  </div>
                </CommandEmpty>
              ) : items.length === 0 ? (
                <CommandEmpty>{emptyMessage}</CommandEmpty>
              ) : (
                <CommandGroup className="max-h-60 overflow-auto">
                  {items.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={item.value}
                      onSelect={() => {
                        onChange(item.value, item as T);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          value === item.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
}
