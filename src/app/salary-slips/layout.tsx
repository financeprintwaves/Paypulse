import AppLayout from '@/components/app-layout';

export default function SalarySlipsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppLayout>{children}</AppLayout>;
}
