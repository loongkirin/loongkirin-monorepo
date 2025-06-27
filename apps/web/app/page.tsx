import { Button } from "@loongkirin/ui/components/button"
import { Calendar } from "@loongkirin/ui/components/calendar"
import { DatePicker } from "@loongkirin/ui/components/date-picker"

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <Button variant={"outline"}>Click</Button>
        <DatePicker mode="single"/>
      </div>
    </main>
  )
}
