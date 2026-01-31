import { fetchInvoiceById, fetchCustomers } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Page(props: { params: { id: string } }) {
  const { id } = props.params;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }

  return (
    <div>
      <h1>Edit Invoice #{invoice.id}</h1>
      <p>Customer: {customers.find(c => c.id === invoice.customer_id)?.name}</p>
      <p>Amount: ${(invoice.amount / 100).toFixed(2)}</p>
      <p>Status: {invoice.status}</p>
      {/* Add your form or edit UI here */}
    </div>
  );
}
