import { Button } from "@loongkirin/ui/src/button";
import { Calendar } from "@loongkirin/ui/src/calendar";
import { DatePicker } from "@loongkirin/ui/src/date-picker";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div className="z-10 items-center justify-between w-full max-w-5xl font-mono text-sm lg:flex">
        <Button variant={"outline"}>Click</Button>
        <DatePicker/>
      </div>
    </main>
  );
}
