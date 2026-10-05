import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import BootstrapClient from "../components/BootstrapClient";

export const metadata = {
  title: "ServiceGarage | ระบบจัดการอู่ซ่อมรถและบริการบำรุงรักษา",
  description: "ระบบบริหารจัดการอู่ซ่อมรถ คลังอะไหล่ยานยนต์ และบริการบำรุงรักษาครบวงจร",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <head>
        {/* Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body className="bg-light">
        <BootstrapClient />
        {children}
      </body>
    </html>
  );
}
