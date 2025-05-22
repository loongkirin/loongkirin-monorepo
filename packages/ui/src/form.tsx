"use client"

import { createFormHook } from "@tanstack/react-form"
import { useFormContext, useFieldContext, fieldContext, formContext } from "../hooks/use-form"
import { FormCaptchaField, FormCheckboxField, FormComboboxField, FormDatePickerField, FormField, FormInputField, FormRadioGroupField, FormSelectField, FormSubscribeButton, FormSwitchField, FormTextareaField } from "./form-components"

const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    FormField,
    FormInputField,
    FormTextareaField,
    FormCheckboxField,
    FormSwitchField,
    FormDatePickerField,
    FormComboboxField,
    FormSelectField,
    FormRadioGroupField,
    FormCaptchaField,
  },
  formComponents: {
    FormSubscribeButton,
  },
  fieldContext,
  formContext,
})

export {
  fieldContext,
  useFieldContext,
  formContext,
  useFormContext,
  useAppForm,
  withForm,
}