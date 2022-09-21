import { useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import AppLayout from "components/common/AppLayout";
import { observer } from "mobx-react";
import React, { lazy, Suspense } from "react";
import { Route, Router, Switch } from "react-router";
import LoadingFallback from "screens/LoadingFallback";
import { createAppTheme } from "styles/theme";
import history from "./appBrowserHistory";

const HomePage = lazy(() => import("screens/Home/HomePage"));
const NotFoundPage = lazy(() => import("screens/NotFound"));

export const ConfirmModalInstance = {
};


const RootContainer = observer(() => {
  return (
    <Router history={history}>
      <AppLayout>
        <Suspense fallback={<LoadingFallback />}>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>

            <Route exact path="/show-room">
              <HomePage />
            </Route>

            <Route path="*">
              <NotFoundPage />
            </Route>
          </Switch>
        </Suspense>
      </AppLayout>
    </Router>
  );
});

const App = React.memo(() => {
  const theme = createAppTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RootContainer />
    </ThemeProvider>
  );
});

export default App;
