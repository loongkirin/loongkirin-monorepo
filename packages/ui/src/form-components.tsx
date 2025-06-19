"use client"

import * as React from "react"
import { AnyFieldApi, useStore } from "@tanstack/react-form"
import { useFormContext, useFieldContext } from "../hooks/use-form"
import { Input } from "./input"
import { Label } from "./label"
import { Button } from "./button"
import { Checkbox } from "./checkbox"
import { Switch } from "./switch"
import { Textarea } from "./textarea"
import { Combobox, ComboboxProps } from "./combobox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "./select"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Captcha } from "./captcha"
import { DatePickerMultiple, DatePickerRange, DatePickerSingle } from "./date-picker"
import { cva, type VariantProps } from "class-variance-authority"
import { DropdownOption, Captcha as CaptchaValue } from "../types/ui-types"
import useCaptcha from "../hooks/use-captcha"
import { DateRange } from "react-day-picker"

import { cn } from "../lib/utils"

function Form({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-root"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-md border px-2 py-6 shadow-sm h-full",
        className
      )}
      {...props}
    />
  )
}

function FormHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-header"
      className={cn(
        "@container/form-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=form-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function FormTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-title"
      className={cn("leading-none font-semibold m-auto col-span-full", className)}
      {...props}
    />
  )
}

function FormAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end mb-6",
        className
      )}
      {...props}
    />
  )
}

function FormContent({ className, ...props }: React.ComponentProps<"form">) {
  return (
    <form
      data-slot="form"
      className={cn("grid px-6 gap-6 md:grid-cols-2 xl:grid-cols-3", className)}
      {...props}
    />
  )
}

function FormFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

function FormSubscribeButton({ className, children, ...props }: React.ComponentProps<typeof Button>) {
  const form = useFormContext()
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button disabled={isSubmitting} 
          className={cn(className)} 
          {...props}>
          {children}
        </Button>)}
    </form.Subscribe>
  )
}

const fieldContentVariants = cva(
  "flex w-full gap-2",
  {
    variants: {
      orientation: {
        horizontal:
          "flex-row items-center",
        vertical:
          "flex-col",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

type FormFieldProps = {
  classesName?: {
    root?: string | undefined,
    content?: string | undefined,
    label?: string | undefined,
    error?: string | undefined,
  }
  showLabel?: boolean,
  label?: string | undefined,
  placeholder?: string | undefined,
  showError?: boolean,
  className?: string,
} & VariantProps<typeof fieldContentVariants>

type FormFieldRenderProps = {
  render: (field : AnyFieldApi) => React.JSX.Element,
}

function FormFieldError({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field-error"
      className={cn(
        "font-semibold text-red-400 text-sm",
        className
      )}
      {...props}
    />
  )
}

function FormFieldRoot({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="form-field-root"
      className={cn(
        className
      )}
      {...props}
    />
  )
}

function FormFieldContent({ className, orientation, ...props }: React.ComponentProps<"div"> & VariantProps<typeof fieldContentVariants>) {
  return (
    <div
      data-slot="form-field-content"
      className={cn(fieldContentVariants({orientation, className}))}
      {...props}
    />
  )
}

function FormField<TData>({ classesName, showLabel = true, label, orientation, showError = true, render } : FormFieldProps & FormFieldRenderProps) {
  const field = useFieldContext<TData>();
  const errors = useStore(field.store, (state) => state.meta.errors)

  return(
    <FormFieldRoot className={classesName?.root}>
      <FormFieldContent className={classesName?.content} orientation={orientation}>
        {showLabel && <Label htmlFor={field.name} className={classesName?.label}>{label}</Label>}
        {render(field)}
      </FormFieldContent>
      
      {showError && errors.map((error:any, index:number) => (
        <FormFieldError key={index} className={cn("mt-1.5", classesName?.error)}>
          {error.message}
        </FormFieldError>
      ))}
    </FormFieldRoot>
  )
}

function FormInputField({ classesName, label, showLabel=true, orientation, showError=true, placeholder, className, ...props } : FormFieldProps & React.ComponentProps<"input">) {
  return (
    <FormField<string | number | readonly string[] | undefined> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Input
            id={field.name}
            name={field.name}
            className={className}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
            {...props}
          />
        </>
      )}
    />
  )
}

function FormTextareaField({ classesName, label, showLabel=true, orientation, showError=true, placeholder, className, ...props } : FormFieldProps & React.ComponentProps<typeof Textarea>) {
  return (
    <FormField<string | number | readonly string[] | undefined> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Textarea
            id={field.name}
            name={field.name}
            value={field.state.value}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
            className={className}
            {...props}
          />
        </>
      )}
    />
  )
}

function FormCheckboxField({ classesName, label, showLabel=true, orientation, showError=true, className } : FormFieldProps) {
  return (
    <FormField<boolean> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Checkbox
            id={field.name}
            name={field.name}
            checked={field.state.value}
            onCheckedChange={(e) => field.handleChange(e === true)}
            onBlur={field.handleBlur}
            className={className}
          />
        </>
      )}
    />
  )
}

function FormSwitchField({ classesName, label, showLabel=true, orientation, showError=true, className } : FormFieldProps) {
  return (
    <FormField<boolean> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Switch
            id={field.name}
            name={field.name}
            checked={field.state.value}
            onCheckedChange={(e) => field.handleChange(e===true)}
            onBlur={field.handleBlur}
            className={className}
          />
        </>
      )}
    />
  )
}

function FormDatePickerField({ classesName, label, showLabel=true, orientation, showError=true, className, ...props } : FormFieldProps & React.ComponentProps<typeof DatePickerSingle>) {
  return (
    <FormField<Date | undefined> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <DatePickerSingle
            value={field.state.value}
            onChange={(e) => field.handleChange(e)}
            {...props}
          />
        </>
      )}
    />
  )     
}

function FormDatePickerRangeField({ classesName, label, showLabel=true, orientation, showError=true, className, ...props } : FormFieldProps & React.ComponentProps<typeof DatePickerRange>) {
  return (
    <FormField<DateRange | undefined> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <DatePickerRange
            value={field.state.value}
            onChange={(e) => field.handleChange(e)}
            {...props}
          />
        </>
      )}
    />
  )     
}

function FormDatePickerMultipleField({ classesName, label, showLabel=true, orientation, showError=true, className, ...props } : FormFieldProps & React.ComponentProps<typeof DatePickerMultiple>) {
  return (
    <FormField<DateRange | undefined> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <DatePickerMultiple
            value={field.state.value}
            onChange={(e) => field.handleChange(e)}
            {...props}
          />
        </>
      )}
    />
  )     
}

function FormComboboxField({ classesName, label, showLabel=true, orientation, showError=true, className, ...props } : FormFieldProps & ComboboxProps) {
  return (
    <FormField<string> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Combobox
            id={field.name}
            name={field.name}
            value={field.state.value}
            onSelect={(e) => field.handleChange(e)}
            className={className}
            {...props}
          />
        </>
      )}
    />
  )
}

function FormSelectField({ classesName, label, showLabel=true, orientation, showError=true, dropdownOptions, placeholder, className } : FormFieldProps & {dropdownOptions?: DropdownOption[]}) {
  return (
    <FormField<string> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Select
            name={field.name}
            value={field.state.value}
            onValueChange={(e) => field.handleChange(e)}
          >
            <SelectTrigger className={cn("grow w-auto", className)}>
              <SelectValue placeholder={placeholder}/>
            </SelectTrigger>
            <SelectGroup>
              <SelectContent>
                {dropdownOptions?.map(item => (
                  <SelectItem key={item.value} value={item.value} disabled={item.disabled}>{item.label}</SelectItem>
                ))}
              </SelectContent>
            </SelectGroup>
          </Select>
        </>
      )}
    />
  )
}

const radioGroupVariants = cva(
  "flex gap-3",
  {
    variants: {
      groupOrientation: {
        horizontal:
          "flex-row flex-wrap items-center",
        vertical:
          "flex-col",
      },
    },
    defaultVariants: {
      groupOrientation: "horizontal",
    },
  }
)
function FormRadioGroupField({ className, classesName, label, showLabel=true, orientation, showError=true, dropdownOptions,  groupOrientation, } : FormFieldProps & VariantProps<typeof radioGroupVariants> & { dropdownOptions?: DropdownOption[] }) {
  return (
    <FormField<string> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <RadioGroup
            id={field.name}
            name={field.name}
            defaultValue={field.state.value}
            onValueChange={(e) => field.handleChange(e)}
            onBlur={field.handleBlur}
          >
            <div className={cn(radioGroupVariants({groupOrientation, className}))}>
              {dropdownOptions?.map(item => (
                <div key={item.value} className="flex gap-1.5">
                  <RadioGroupItem value={item.value} disabled={item.disabled}/>
                  <Label>{item.label}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>  
        </>
      )}
    />
  )
}

function FormCaptchaField({ classesName, fetchUrl, label, showLabel=true, orientation, showError=true, className, ...props } : FormFieldProps & {fetchUrl: string}) {
  const { captchaData, isLoading, errorMessage, fetchCaptcha } = useCaptcha(fetchUrl);
  return (
    <FormField<CaptchaValue> 
      classesName={classesName} 
      showLabel={showLabel}
      label={label}
      orientation={orientation}
      showError={showError}
      render={(field) => (
        <>
          <Captcha
            fetchUrl={fetchUrl}
            isLoading={isLoading}
            errorMessage={errorMessage} 
            captchaData={captchaData} 
            fetchCaptcha={fetchCaptcha}
            id={field.name}
            name={field.name}
            value={field.state.value.captcha_value}
            onChange={(e) => {
              const captchaValue = {
                captcha_id: captchaData.captcha_id,
                captcha_value: e.target.value,
              } as CaptchaValue
              field.handleChange(captchaValue)
            }}
            onBlur={field.handleBlur}
            className={className}
            {...props}
          />
        </>
      )}
    />
  )
}

export {
  Form,
  FormHeader,
  FormAction,
  FormTitle,
  FormContent,
  FormSubscribeButton,
  FormFooter,
  FormField,
  FormInputField,
  FormTextareaField,
  FormCheckboxField,
  FormSwitchField,
  FormDatePickerField,
  FormDatePickerRangeField,
  FormDatePickerMultipleField,
  FormComboboxField,
  FormSelectField,
  FormRadioGroupField,
  FormCaptchaField,
}