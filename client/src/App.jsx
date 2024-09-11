import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import Job from "./pages/job";
import Profile from "./components/profile";
import JobListing from "./pages/jobListing";
import MyJobs from "./components/admin/myJobs";
import Onbording from "./pages/onbording";
import PostJobs from "./pages/postJobs";
import { ThemeProvider } from "./components/theme-provider";
import LoginSignup from "./pages/LoginSignup";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import Jobs from "./components/admin/AdminJobs";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";

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
        path: "/auth",
        element: <LoginSignup />,
      },
      {
        path: "/admin",
        element: <Companies />,
      },
      {
        path: "/admin/companies/create",
        element: <CreateCompany />,
      },
      {
        path: "/admin/companies/:id",
        element: <CompanySetup />,
      },
      {
        path: "/admin/jobs",
        element: <AdminJobs />,
      },
      {
        path: "/admin/jobs/create",
        element: <PostJob />,
      },
      {
        path: "/my-Jobs",
        element: <MyJobs />,
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
