import Link from "next/link";
const Layout = ({ children }) => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Три города</Link>
            </li>
            <li>
              <Link href="/history">Ошибка</Link>
            </li>
            <li>
              <Link href="/weather">Поиск</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>Подвал сайта</p>
      </footer>
    </div>
  );
};

export default Layout;
