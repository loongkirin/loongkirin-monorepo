"use client";

import { formOptions } from '@tanstack/react-form'
import { z } from 'zod'
import { ColumnDef } from "@tanstack/react-table"
import { Button } from '@loongkirin/ui/components/button';
import {ArrowUpDown, ArrowDown, ArrowUp, ArrowUpAZ, ArrowDownAZ, Funnel } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@loongkirin/ui/components/popover';
import { Input } from '@loongkirin/ui/components/input';

export const PeopleSchema = z.object({
  fullName: z
    .string()
    .min(3, '[Zod] You must have a length of at least 3')
    .startsWith('A', "[Zod] First name must start with 'A'"),
  firstName: z
    .string()
    .min(3, '[Zod] You must have a length of at least 3'),
  age: z.nullable(z.number().gte(18, "Must 18 years old")),
  email: z.string().email("Invalid email address"),  
  phone: z.string().min(3, '[Zod] You must have a length of at least 3'),
  allow: z.boolean(),
  agree: z.boolean(),
  birthday:z.date(),
  address: z.object({
    line1: z.string(),
    line2: z.string().optional(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
  emergencyContact: z.object({
    fullName: z.string().min(1, "Emergency contact name is required"),
    phone: z.string().min(1, "Emergency contact phone is required"),
    framework: z.string(),
    tech: z.string(),
    tech2: z.string(),
  }),
  captcha: z.object({
    captcha_id: z.string(),
    captcha_value: z.string(),
  }),
});

type Peopele = z.infer<typeof PeopleSchema>

export const peopleFormOpts = formOptions({
  defaultValues: {
    fullName: '',
    firstName: '',
    email: '',
    phone: '',
    allow: false,
    agree: true,
    age: 20,
    birthday: new Date(),
    address: {
      line1: '',
      line2: undefined,
      city: '',
      state: '',
      zip: '',
    },
    emergencyContact: {
      fullName: '',
      phone: '',
      framework: "",
      tech: "",
      tech2: "",
    },
    captcha: {
      captcha_id: "",
      captcha_value: "",
    }
  } as Peopele,
})

export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    id: "status",
  },
  // {
  //   accessorKey: "email",
  //   header: "Email",
  // },
  {
    accessorKey: "email",
    header: "Email",
    id: "email",
  },
  {
    accessorKey: "amount",
    // header: "Amount",
    header: "Amount",
    id: "amount"
  },
]