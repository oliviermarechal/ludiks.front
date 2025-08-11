import { Navigation } from "@/components/navigation";
import { DocsSidebar } from "@/components/docs-sidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/5">
      <Navigation />
      
      <div className="flex mt-16">
        <DocsSidebar />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}