export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center min-vh-100 gx-0">
        <div className="col-12 col-md-5 col-lg-4">{children}</div>
      </div>
    </div>
  );
}
