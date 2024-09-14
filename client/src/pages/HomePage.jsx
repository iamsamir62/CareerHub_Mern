import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import companies from "../data/companies.json";
import faqs from "../data/faq.json";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import Profile from "../components/profile";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { toast } from "sonner";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const handleClick = () => {
    if (user) {
      navigate("/appliedjobs");
    } else {
      navigate("/auth");
      toast.error("Plese login first to apply for a job");
    }
  };
  return (
    <main className="flex flex-col gap-10 sm:gap-20 py-10 sm:py-20">
      <section className="text-center">
        <h1 className="flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-6xl lg:text-8xl tracking-tighter py-4">
          Find Your Dream Job{" "}
          <span className="flex items-center gap-2 sm:gap-6 ">
            at
            <h1 className="font-bold mt-2 text-6xl sm:text-6xl lg:text-8xl">
              Career<span className="text-red-700 font-mono">Hub</span>
            </h1>
          </span>
        </h1>
        <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">
          Explore thousands of job listings or find the perfect candidate
        </p>
      </section>
      {user?.role === "recruiter" ? (
        <div className="flex gap-6 justify-center">
          <Link to="/admin/jobs/create">
            <Button variant="destructive" size="xl">
              Post a Job
            </Button>
          </Link>
          <Link to="/admin/jobs">
            <Button variant="blue" size="xl">
              Your Jobs
            </Button>
          </Link>
        </div>
      ) : (
        <div className="flex gap-6 justify-center">
          <Link to="/jobs">
            <Button variant="blue" size="xl">
              Find Jobs
            </Button>
          </Link>

          <Button variant="destructive" size="xl" onClick={handleClick}>
            Applied jobs
          </Button>
        </div>
      )}

      {/* Carousel */}
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full py-10"
      >
        <CarouselContent className="flex gap-5 sm:gap-20 items-center">
          {companies.map(({ name, id, path }) => (
            <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
              <img
                src={path}
                alt={name}
                className="h-9 sm:h-14 object-contain"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* banner */}
      <img src="/bg.webp" className="w-full" alt="" />

      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* cards */}
        <Card>
          <CardHeader>
            <CardTitle>For Job Seekers</CardTitle>
          </CardHeader>
          <CardContent>
            Search and apply for jobs, track applications, and more.
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>For Employers</CardTitle>
          </CardHeader>
          <CardContent>
            Post jobs, manage applications, and find the best candidates.
          </CardContent>
        </Card>
      </section>
      {/* Accordion */}
      <Accordion type="multiple" className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index + 1}`}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </main>
  );
};

export default HomePage;
