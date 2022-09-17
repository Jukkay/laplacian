import {
    ReactNode
  } from "react";
  import Footer from "./footer";
  import NavbarComponent from "./navbar";
  const Layout = ({ children }: { children: ReactNode }) => {
  
    return (
          <div className="">
          <NavbarComponent />
            <main className="">{children}</main>
          {/* <Footer /> */}
          </div>
    );
  };
  export default Layout;
  