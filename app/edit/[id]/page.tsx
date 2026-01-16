"use client"

import Input from "@/components/Input";
import Select from "@/components/Select";
import apiRequest from "@/lib/apiRequest";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

type JobForm = {
  company: string;
  title: string;
  link: string;
  location: string;
  type: "Full Time" | "Internship" | "";
  source: string;
  status: "Applied" | "Interview" | "Rejected" | "Offer" | "";
  remarks: string;
};

export default function Edit() {

  const [form, setForm] = useState<JobForm>({
    company: "",
    title: "",
    link: "",
    location: "",
    type: "",
    source: "",
    status: "",
    remarks: "",
  });

  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataLoading, setDataLoading] = useState<boolean>(false)
  const router = useRouter()
  const { id } = useParams<{ id: string }>();

  useEffect(() => { 

    const  getData = async () => {
      try {
        setError(false)
        setDataLoading(true)

        const res = await apiRequest.get(`/get-single-job/${id}`);
        setForm(res.data.data)

      } catch (error) {
        console.log(error)
        setError(true)
      } finally {
        setDataLoading(false)
      }
    }

    getData()
  }, [])

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      setError(false)
      setLoading(true)
      const res = await apiRequest.put(`/edit`, {id, ...form})
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
          Edit Job Application
        </h1>
        <Link href={"/"} className="addBtn text-white px-3 py-2 bg-blue-600 rounded-md mb-3 w-fit">Back</Link>
      </div>
      {
        error && <div className="text-center mb-3 text-red-500" >Some error occured</div>
      }
      {
        dataLoading && <div className="text-center mb-3 dark:text-white" >Loading data...</div>
      }
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white"
      >
        <Input label="Company Name" name="company" defaultVal={form?.company} onChange={handleChange} />
        <Input label="Job Title" name="title" defaultVal={form?.title} onChange={handleChange} />
        <Input label="Job Link" name="link" defaultVal={form?.link} onChange={handleChange} />
        <Input label="Location" name="location" defaultVal={form?.location} onChange={handleChange} />

        <Select
          label="Type"
          name="type"
          options={["Full Time", "Internship"]}
          onChange={handleChange}
          selectedVal={form?.type}
        />

        <Select
          label="Status"
          name="status"
          options={["Applied", "Interview", "Rejected", "Offer"]}
          onChange={handleChange}
          selectedVal={form?.status}
        />

        <Input label="Source" name="source" defaultVal={form?.source} onChange={handleChange} />
        <Input label="Remarks" name="remarks" defaultVal={form?.remarks} onChange={handleChange} />

        <button
          type="submit"
          className="md:col-span-2 mt-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-medium"
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>

      </form>
    </div>
  )
}