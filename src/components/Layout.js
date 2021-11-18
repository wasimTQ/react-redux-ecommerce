import Header from "./products/Header";

const Layout = ({ children }) => {
  return (
    <main className="px-5 py-3">
      <Header />
      <div className="h-12"></div>
      {children}
    </main>
  );
};

export default Layout;
