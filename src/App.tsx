import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  useOutlet,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./client/hooks/useAuth";

interface IApp {}

const AuthLayout = () => {
  const outlet = useOutlet();
  const user = window.localStorage.getItem("user");

  return (
    <>
      <AuthProvider userData={user}>{outlet}</AuthProvider>
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/:page?" element={<div>ROOT</div>} />
    </Route>
  )
);
