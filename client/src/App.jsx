import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import Job from "./pages/job";
import Profile from "./components/profile";
import JobListing from "./pages/jobListing";
import MyJobs from "./pages/myJobs";
import Onbording from "./pages/onbording";
import PostJobs from "./pages/postJobs";
import { ThemeProvider } from "./components/theme-provider";
import LoginSignup from "./pages/LoginSignup";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/onboarding",
        element: <Onbording />,
      },
      {
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/description/:id",
        element: <Job />,
      },
      {
        path: "/post-jobs",
        element: <PostJobs />,
      },
      {
        path: "/my-Jobs",
        element: <MyJobs />,
      },
      {
        path: "/auth",
        element: <LoginSignup />,
      },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
