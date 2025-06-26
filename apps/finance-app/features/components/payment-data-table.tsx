import { Payment, columns } from "@/features/accounts/shared-form"
import { DataTable } from "@loongkirin/ui/src/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
        {
      id: "728ed53a",
      amount: 50,
      status: "pending",
      email: "m3@example.com",
    },
        {
      id: "728ed53b",
      amount: 1000,
      status: "processing",
      email: "m1@example.com",
    },
        {
      id: "728ed53c",
      amount: 1230,
      status: "success",
      email: "m2@example.com",
    },
    // ...
  ]
}

export default async function PaymentPage() {
  const data = await getData()

  return (
    <div className="theme-container container mx-auto py-10">
      <DataTable columns={columns} data={data} model={"client"}/>
    </div>
  )
}
