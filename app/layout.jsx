import NavBar from "@/components/NavBar";
import Provider from "@/components/provider/Provider";
import { CartProvider } from "@/context/CartContext";
import "@/styles/globals.css";

export const metadata = {
  title: "Ecommerce",
  description: "Descubre & Compra productos increibles",
};

const Root = ({ children }) => {
  return (
    <html>
      <body>
        <CartProvider>
          <Provider>
            <main>
              <NavBar />
              {children}
            </main>
          </Provider>
        </CartProvider>
      </body>
    </html>
  );
};

export default Root;
