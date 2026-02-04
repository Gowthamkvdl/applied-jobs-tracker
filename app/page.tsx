"use client";

import { useEffect, useState } from "react";
import apiRequest from "@/lib/apiRequest";
import Table from "@/components/Table";
import Link from "next/link";

type Job = {
  id: string;
  title: string;
  company: string;
  link: string;
  location: string;
  type: string;
  source: string;
  email: boolean;
  status: string;
  remarks?: string | null;
  createdAt: string;
};

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const res = await apiRequest.get("/get");
        setJobs(res.data.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // 🔥 DELETE HANDLER LIVES HERE
  function handleDelete(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  return (
    <div className="mx-md-6">
      <div className="flex justify-end gap-x-2 mb-3 mt-3 mt-md-0">
        <Link
          href="/dashboard"
          className="bg-blue-800 text-white flex items-center justify-center px-3 py-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi me-1 bi-speedometer2" viewBox="0 0 16 16">
            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
            <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
          </svg>
          Dashboard
        </Link>
        <Link
          href="/add"
          className="bg-blue-600 text-white flex items-center justify-center px-3 py-2 rounded"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi me-1 bi-plus-square" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
          Add More
        </Link>
      </div>


      {loading && <p className="text-center dark:text-white">Loading…</p>}
      {error && <p className="text-center text-red-500 dark:text-white">Failed to load jobs</p>}

      {!loading && !error && (
        <Table jobs={jobs} onDelete={handleDelete} />
      )}
    </div>
  );
}
