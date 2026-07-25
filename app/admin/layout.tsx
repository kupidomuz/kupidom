import AdminMenu from "@/components/admin/AdminMenu";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside>
          <AdminMenu />
        </aside>

        <section>{children}</section>
      </div>
    </main>
  );
}