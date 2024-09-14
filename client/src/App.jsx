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
import ProtectedRoutes from "./components/ProtectedRoutes";
ProtectedRoutes;

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
      // Recruiter-only routes wrapped inside ProtectedRoutes
      {
        path: "/admin",
        element: (
          <ProtectedRoutes>
            <Companies />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/companies/create",
        element: (
          <ProtectedRoutes>
            <CreateCompany />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/companies/:id",
        element: (
          <ProtectedRoutes>
            <CompanySetup />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/jobs",
        element: (
          <ProtectedRoutes>
            <AdminJobs />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/jobs/create",
        element: (
          <ProtectedRoutes>
            <PostJob />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/admin/jobs/:id/applicants",
        element: (
          <ProtectedRoutes>
            <Applications />
          </ProtectedRoutes>
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
