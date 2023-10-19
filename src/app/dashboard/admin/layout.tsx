import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3 col-lg-2">
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin/products">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin/categories">
                Categories
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/dashboard/admin/tags">
                Tags
              </Link>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex={-1}
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="col-md-9 col-lg-10 px-md-4">{children}</div>
      </div>
    </div>
  );
}
