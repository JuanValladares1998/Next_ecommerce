import NavBar from "@/components/NavBar";
import Provider from "@/components/Provider";
import "@/styles/globals.css";

export const metadata = {
  title: "Promptopia",
  description: "Descubre & Comparte IA Prompts",
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
