import { FormDist } from '@/features/components/login-form-dist'
import PaymentPage from '@/features/components/payment-data-table'
import { Calendar } from '@loongkirin/ui/src/calendar'
import { Card, CardContent } from '@loongkirin/ui/src/card'
import { DatePicker } from '@loongkirin/ui/src/date-picker'
import { ModeSwitcher } from '@loongkirin/ui/src/mode-switcher'
import { ThemeSelector } from '@loongkirin/ui/src/theme-selector'
import React from 'react'

const start = new Date(2025, 5, 5)
const end = new Date(2025, 5, 15)

const page = () => {
  return (
    <div className='theme-container '>
      <section className="hidden md:block">
            {/* <Card className="hidden max-w-[260px] p-0 sm:flex">
      <CardContent className="p-0"> */}
        <Calendar
          numberOfMonths={1}
          mode="range"
          defaultMonth={start}
          selected={{
            from: start,
            to: end,
          }}
        />
      {/* </CardContent>
    </Card> */}
      </section>
      <ModeSwitcher/>
      <ThemeSelector/>
      <DatePicker mode={"multiple"}/>
      <FormDist/>
      <PaymentPage/>
    </div>
  )
}

export default page