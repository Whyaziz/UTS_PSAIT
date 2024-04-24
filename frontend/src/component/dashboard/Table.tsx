"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface DataType {
  id: string;
  nim: string;
  nama: string;
  alamat: string;
  kode_mk: string;
  nama_mk: string;
  sks: string;
  nilai: string;
}

export default function Table() {
  const [data, setData] = useState<DataType[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/nilai`); // Sesuaikan dengan endpoint API Anda
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col relative overflow-x-auto rounded-lg">
      <Link
        className="py-3 px-6 w-[15%] bg-green-600 hover:bg-green-800 rounded-lg my-5 text-center"
        href="/dashboard/tambah-nilai"
      >
        Tambah Nilai
      </Link>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className="text-center">
            <th scope="col" className="px-6 py-3">
              Nim
            </th>
            <th scope="col" className="px-6 py-3">
              Nama
            </th>
            <th scope="col" className="px-6 py-3">
              Alamat
            </th>
            <th scope="col" className="px-6 py-3">
              Kode MK
            </th>
            <th scope="col" className="px-6 py-3">
              Nama MK
            </th>
            <th scope="col" className="px-6 py-3">
              SKS
            </th>
            <th scope="col" className="px-6 py-3">
              Nilai
            </th>
            <th scope="col" className="px-6 py-3">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 text-center"
            >
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {item.nim}
              </td>
              <td className="px-6 py-4">{item.nama}</td>
              <td className="px-6 py-4">{item.alamat}</td>
              <td className="px-6 py-4">{item.kode_mk}</td>
              <td className="px-6 py-4">{item.nama_mk}</td>
              <td className="px-6 py-4">{item.sks}</td>
              <td className="px-6 py-4">{item.nilai}</td>
              <td className="px-6 py-4 flex flex-col gap-2 text-white">
                <button className="bg-blue-600 hover:bg-blue-800 px-4 py-2 w-full rounded-lg">
                  Edit
                </button>
                <button className="bg-red-600 hover:bg-red-800 px-4 py-2 w-full rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
