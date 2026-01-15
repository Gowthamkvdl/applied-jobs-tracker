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
};

export default function Table({ jobs }: TableProps) {
  return (
    <div className="dark:text-white/90 py-4 overflow-x-auto">
      <div className="inline-block min-w-7xl dark:border dark:border-blue-300 rounded-2xl">
        <table className="min-w-full mb-2">
          <thead className="shadow rounded-t-2xl">
            <tr className="text-left font-semibold dark:border-b dark:border-blue-300">
              {[
                "Date",
                "Company",
                "Job Title",
                "Link",
                "Location",
                "Type",
                "Source",
                "Status",
                "Remarks",
                "Edit"
              ].map((head) => (
                <th key={head} className="p-2 px-2">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="shadow rounded-b-2xl">
            {jobs.map((job) => (
              <tr key={job.id} className="border-gray-200">
                <td className="cell">{job.createdAt.slice(0,10)}</td>
                <td className="cell">{job.company}</td>
                <td className="cell">{job.title}</td>
                <td className="cell">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline"
                  >
                    Link
                  </a>
                </td>
                <td className="cell">{job.location}</td>
                <td className="cell">{job.type}</td>
                <td className="cell">{job.source}</td>
                <td className="cell">{job.status}</td>
                <td className="cell max-w-xs truncate">
                  {job.remarks ?? "-"}
                </td> 
                <td className="cell">
                  <Link href={`/edit/${job.id}`} className="bg-orange-600 font-bold text-white px-2 py-0.5 rounded" >Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
