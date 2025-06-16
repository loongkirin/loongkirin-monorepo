"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandFilter } from "./command"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { DropdownOption } from "../types/ui-types"

export type ComboboxProps = {
  className?: string,
  id?: string,
  name?: string,
  dropdownOptions?: DropdownOption[],
  selectPlaceholder?: string,
  searchPlaceholder?: string,
  emptyDataContent?: string,
  value?: string,
  onSelect?: (value: string | undefined) => void,
  commandFilter?: typeof CommandFilter,
}

function Combobox({id, name, dropdownOptions, selectPlaceholder, searchPlaceholder, emptyDataContent, value, onSelect, className, commandFilter } : ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between grow", className)}
          id={id}
          name={name}
        >
          {value
            ? dropdownOptions?.find((item) => item.value === value)?.label
            : <div className="opacity-50">{selectPlaceholder}</div>}
          <ChevronsUpDownIcon className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 min-w-[var(--radix-popover-trigger-width)]">
        <Command filter={commandFilter}>
          <CommandInput placeholder={searchPlaceholder}/>
          <CommandList>
            <CommandEmpty>{emptyDataContent}</CommandEmpty>
            <CommandGroup>
              {dropdownOptions?.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={(currentValue) => {
                    const finalvalue = currentValue === selectedValue ? "" : currentValue
                    setSelectedValue(finalvalue)
                    onSelect && onSelect(finalvalue)
                    setOpen(false)
                  }}
                  disabled={item.disabled}
                >
                  {item.label}
                  <CheckIcon
                    className={cn(
                      "ml-auto",
                      selectedValue === item.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export { Combobox }
