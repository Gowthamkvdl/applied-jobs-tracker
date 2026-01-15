"use client"

import Header from "@/components/Header";
import Table from "@/components/Table";
import apiRequest from "@/lib/apiRequest";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const JOBS = [
  {
    id: "1",
    company: "Google",
    title: "Frontend Engineer",
    link: "https://careers.google.com",
    location: "Bangalore",
    type: "Full Time",
    source: "LinkedIn",
    status: "Applied",
    remarks: "Waiting for response",
  },
  {
    id: "2",
    company: "Amazon",
    title: "SDE Intern",
    link: "https://amazon.jobs",
    location: "Hyderabad",
    type: "Internship",
    source: "Company Website",
    status: "Rejected",
    remarks: "Auto rejection",
  },
];

type job = {
  id: string,
  company: string,
  title: string,
  link: string,
  location: string,
  type: string,
  source: string,
  status: string,
  remarks: string,
}



export default function Home() {

  const [jobs, setJobs] = useState<job[]>([])
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {

    const  getData = async () => {
      try {
        setError(false)
        setLoading(true)

        const res = await apiRequest.get("/get");
        setJobs(res.data.data)

      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    getData()
  }, [])


  return (
    <div className="flex flex-col justify-center mx-6">
      <div className="flex justify-end">
        <Link
          href="/add"
          className="addBtn text-white px-3 py-2 bg-blue-600 rounded-md mb-3 w-fit"
        >
          Add More
        </Link>
      </div>
      <div className="text-xs text-center text-white/50 mb-1 md:hidden">
        ← Swipe horizontally →
      </div>
      {loading && (
        <div className="text-center text-white/70">Loading jobs…</div>
      )}

      {error && (
        <div className="text-center text-red-500">
          Failed to load jobs
        </div>
      )}

      {!loading && !error && <Table jobs={jobs} />}
    </div>
  );
}
