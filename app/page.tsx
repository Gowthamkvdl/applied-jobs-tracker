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
    <div className="mx-6">
      <div className="flex justify-end mb-3">
        <Link
          href="/add"
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
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
