
import AppLayout from '@/components/app-layout';

export default function StatementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
