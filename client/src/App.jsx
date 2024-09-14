import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";
import HomePage from "./pages/HomePage";
import Job from "./pages/job";
import Profile from "./components/profile";
import JobListing from "./pages/jobListing";
import { ThemeProvider } from "./components/theme-provider";
import LoginSignup from "./pages/LoginSignup";
import Companies from "./components/admin/Companies";
import CreateCompany from "./components/admin/CreateCompany";
import CompanySetup from "./components/admin/CompanySetup";
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from "./components/admin/PostJob";
import Applications from "./components/admin/Applications";
import AppliedJob from "./components/AppliedJob";
import Browse from "./components/Browse";
import PrivateRoutes from "./components/PrivateRoutes";

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
        path: "/jobs",
        element: <JobListing />,
      },
      {
        path: "/description/:id",
        element: <Job />,
      },
      {
        path: "/auth",
        element: <LoginSignup />,
      },
      {
        path: "/browse",
        element: <Browse />,
      },
      {
        path: "/appliedjobs",
        element: <AppliedJob />,
      },
      // Recruiter-only routes wrapped inside PrivateRoutes
      {
        path: "/admin",
        element: (
          <PrivateRoutes>
            <Companies />
          </PrivateRoutes>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <PrivateRoutes>
            <CreateCompany />
          </PrivateRoutes>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <PrivateRoutes>
            <CompanySetup />
          </PrivateRoutes>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <PrivateRoutes>
            <AdminJobs />
          </PrivateRoutes>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <PrivateRoutes>
            <PostJob />
          </PrivateRoutes>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <PrivateRoutes>
            <Applications />
          </PrivateRoutes>
        ),
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
