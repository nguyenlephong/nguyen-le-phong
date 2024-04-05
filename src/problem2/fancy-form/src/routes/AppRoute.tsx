import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import SwapPage from "../pages/swap/Swap.page";
import ErrorRouteBoundary from "../components/ErrorRouteBoundary";

export const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/"
           errorElement={<ErrorRouteBoundary />}>
      <Route path="swap" element={<SwapPage />} />
    </Route>
  )
);
