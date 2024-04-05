import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import SwapPage from "../pages/swap/Swap.page";
import ErrorRouteBoundary from "../components/ErrorRouteBoundary";
import {APP_ROUTE} from "configs/app.const";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_ROUTE.HOME}
      errorElement={<ErrorRouteBoundary/>}
    >
      <Route path={APP_ROUTE.SWAP} element={<SwapPage/>}/>
    </Route>
  )
);
