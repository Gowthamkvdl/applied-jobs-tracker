"use client";

import { useState } from "react";
import apiRequest from "@/lib/apiRequest";
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

type TableProps = {
  jobs: Job[];
  onDelete: (id: string) => void;
};

const statusClasses: Record<string, string> = {
  Applied: "bg-blue-800/25",
  Interview: "bg-yellow-600/25",
  Rejected: "bg-red-400/25",
  Offer: "bg-green-600/80",
};


export default function Table({ jobs, onDelete }: TableProps) {
  // 🔹 Column widths (px)
  const [cols, setCols] = useState<number[]>([
    50,   //S.No.
    120,   // Date
    160,  // Company
    180,  // Title
    50,   // Link
    160,  // Location
    110,  // Type
    120,  // Source
    110,  // Status
    100,  // Remarks
    40,   // Edit
    40,   // Delete
  ]);

  function startResize(index: number, startX: number) {
    const startWidth = cols[index];

    function onMouseMove(e: MouseEvent) {
      const diff = e.clientX - startX;
      setCols((prev) =>
        prev.map((w, i) =>
          i === index ? Math.max(60, startWidth + diff) : w
        )
      );
    }

    function onMouseUp() {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this job?")) return;
    await apiRequest.delete(`/delete/${id}`);
    onDelete(id);
  }

  const headers = [
    "S.No.",
    "Date",
    "Company",
    "Title",
    "Link",
    "Location",
    "Type",
    "Source",
    "Status",
    "Remarks",
    "Edit",
    "Delete",
  ];

  return (
    <div className="overflow-x-auto dark:text-white/90">
      <div style={{ minWidth: cols.reduce((a, b) => a + b, 0) }}>
        <table className="table-fixed border-collapse w-full">

          {/* ================= HEADER ================= */}
          <thead className="sticky top-0 text-white dark:text-white bg-black z-10">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={h}
                  style={{ width: cols[i] }}
                  className="relative p-2 text-start  font-semibold border-b border-blue-300 select-none"
                >
                  {h}

                  {/* Resize handle */}
                  <div
                    onMouseDown={(e) => startResize(i, e.clientX)}
                    className="absolute top-0 right-0 h-full w-[4px] cursor-col-resize bg-transparent hover:bg-blue-500"
                  />
                </th>
              ))}
            </tr>
          </thead>

          {/* ================= BODY ================= */}
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className="border-b border-blue-200">
                <td className="p-2">{jobs.length - index}</td>
                <td className="p-2">{job.createdAt.slice(0, 10)}</td>
                <td className="p-2 truncate">{job.company}</td>
                <td className="p-2 truncate">{job.title}</td>
                <td className="p-2">
                  <a href={job.link} target="_blank" className="text-blue-400 underline">
                    Link
                  </a>
                </td>
                <td className="p-2 truncate">{job.location}</td>
                <td className="p-2">{job.type}</td>
                <td className="p-2">{job.source}</td>
                <td
                  className={`p-2 dark:text-white rounded ligh:text-black 
                    ${statusClasses[job.status] ?? "bg-gray-600"}
                    `}
                >
                  {job.status}
                </td>
                <td className="p-2 truncate">{job.remarks ?? "-"}</td>

                <td className="p-2 text-center">
                  <div className="bg-orange-600 w-fit text-white p-1 rounded">
                    <Link
                      href={`/edit/${job.id}`}
                      className=""
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                      </svg>
                    </Link>
                  </div>
                </td>

                <td className="p-2 text-center">
                  <button
                    onClick={() => handleDelete(job.id)}
                    className="bg-red-600 text-white p-1 rounded"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                      <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
