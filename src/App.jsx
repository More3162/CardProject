import CustomThemeProvider from "./providers/CustomThemeProvider";

import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import Layout from "./layout/Layout";
import UserProvider from "./users/providers/UserProvider";
import SnackbarProvider from "./providers/SnackbarProvider";
import SearchProvider from "./providers/SearchProvider";

function App() {
  return (
    <BrowserRouter>
      <CustomThemeProvider>
        <SnackbarProvider>
          <SearchProvider>
            <UserProvider>
              <Layout>
                <Router />
              </Layout>
            </UserProvider>
          </SearchProvider>
        </SnackbarProvider>
      </CustomThemeProvider>
    </BrowserRouter>
  );
}

export default App;
