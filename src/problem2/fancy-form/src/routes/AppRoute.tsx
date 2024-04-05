import {createBrowserRouter, createRoutesFromElements, Route,} from "react-router-dom";
import SwapPage from "../pages/swap/Swap.page";
import {APP_ROUTE} from "configs/app.const";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path={APP_ROUTE.HOME}
    >
      <Route path={APP_ROUTE.SWAP} element={<SwapPage/>}/>
    </Route>
  )
);
