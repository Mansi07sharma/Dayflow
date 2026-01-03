import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container py-8">{children}</main>
    </div>
  );
}
