"use client";

import CheckBox from "@/components/CheckBox";
import Input from "@/components/Input";
import Select from "@/components/Select";
import apiRequest from "@/lib/apiRequest";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

type JobForm = {
  company: string;
  title: string;
  link: string;
  location: string;
  type: "Full Time" | "Internship" | "";
  source: string;
  email: boolean;
  status: "Applied" | "Interview" | "Rejected" | "Offer" | "";
  remarks: string;
};

export default function JobInputPage() {
  const [form, setForm] = useState<JobForm>({
    company: "",
    title: "",
    link: "",
    location: "",
    type: "",
    source: "",
    email: false,
    status: "",
    remarks: "",
  });
  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter()

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleCheckChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: checked,
    }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError(false)
      setLoading(true)
      const res = await apiRequest.post("/add", form)
      router.push("/")
    } catch (error) {
      setError(true)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto">
      <div className="flex justify-between mb-3">
        <h1 className="text-2xl font-semibold  dark:text-white ">
          Add Job Application
        </h1>
        <Link href={"/"} className="addBtn text-white px-3 py-2 bg-blue-600 rounded-md mb-3 w-fit">Back</Link>
      </div>
      {
        error && <div className="text-center mb-3 text-red-500" >Some error occured</div>
      }
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 dark:text-white"
      >
        <Input label="Company Name" name="company" onChange={handleChange} />
        <Input label="Job Title" name="title" onChange={handleChange} />
        <Input label="Job Link" name="link" onChange={handleChange} />
        <Input label="Location" name="location" onChange={handleChange} />
        <Input label="Source" name="source" onChange={handleChange} />
        <div className="selectAndCheck flex justify-between items-baseline-last gap-0">

          <Select
            label="Type"
            name="type"
            options={["Full Time", "Internship"]}
            onChange={handleChange}
          />


          <Select
            label="Status"
            name="status"
            options={["Applied", "Interview", "Rejected", "Offer"]}
            onChange={handleChange}
          />
          <CheckBox checked={form?.email ? form.email : false} onChange={handleCheckChange} name="email" label="Email" />
        </div>
        <div className="md:col-span-2">

          <Input label="Remarks" name="remarks" onChange={handleChange} />
        </div>

        <button
          type="submit"
          className="md:col-span-2 mt-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
        >
          {loading ? "Adding..." : "Save Job"}
        </button>

      </form>
    </div>
  );
}
