import NavBar from "@/components/NavBar";
import Provider from "@/components/provider/Provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Ecommerce",
  description: "Descubre & Compra productos increibles",
};

const Root = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <main>
            <NavBar />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default Root;
