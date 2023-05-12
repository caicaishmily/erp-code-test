import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider, RequireAuth } from "./hoc";
import SignIn from "./pages/signin/SignIn";
import Layout from "./layout";
import SignUp from "./pages/signup/SignUp";
import { User } from "./pages/user";
import { Shop } from "./pages/shop";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RequireAuth>
        <Layout>Dashboard</Layout>
      </RequireAuth>
    ),
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/user",
    element: (
      <RequireAuth>
        <Layout><User/></Layout>
      </RequireAuth>
    ),
  },
  {
    path: "/shop",
    element: (
      <RequireAuth>
        <Layout><Shop/></Layout>
      </RequireAuth>
    ),
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
}

export default App;
