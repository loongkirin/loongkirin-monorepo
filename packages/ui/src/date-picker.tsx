import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover";
import { DayPicker, OnSelectHandler } from "react-day-picker";


 type DatePickerProps = {
  value?: Date,
  onChange?: OnSelectHandler<Date | undefined>,
  disabled?: boolean,
  placeholder?: string,
} & Omit<React.ComponentProps<typeof DayPicker>, "selected"|"onSelect"|"mode"|"disabled">;

function DatePicker ({
  value,
  disabled,
  placeholder="Pick a date",
  onChange,
  ...props
}: DatePickerProps) {
  console.log("date picker value:",value)
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          className={cn(
            "justify-start text-left font-normal grow",
            !value && "text-muted-foreground",
          )}
        >
          <CalendarIcon className="size-4 mr-2" />
          {value ? format(value, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 min-w-[var(--radix-popover-trigger-width)]">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          disabled={disabled}
          {...props}
        />
      </PopoverContent>
    </Popover>
  );
};

export { DatePicker }