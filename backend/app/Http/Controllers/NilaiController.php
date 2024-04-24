<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Perkuliahan;

class NilaiController extends Controller
{
    public function index()
    {
        $nilai_mahasiswa = Perkuliahan::join('mahasiswa', 'perkuliahan.nim', '=', 'mahasiswa.nim')
            ->join('matakuliah', 'perkuliahan.kode_mk', '=', 'matakuliah.kode_mk')
            ->select('mahasiswa.nim', 'mahasiswa.nama', 'mahasiswa.alamat', 'mahasiswa.tanggal_lahir', 'matakuliah.kode_mk', 'matakuliah.nama_mk', 'matakuliah.sks', 'perkuliahan.nilai')
            ->get();

        return response()->json($nilai_mahasiswa);
    }

    public function show($nim)
    {
        $nilai_mahasiswa = Perkuliahan::join('mahasiswa', 'perkuliahan.nim', '=', 'mahasiswa.nim')
            ->join('matakuliah', 'perkuliahan.kode_mk', '=', 'matakuliah.kode_mk')
            ->where('mahasiswa.nim', $nim)
            ->select('mahasiswa.nim', 'mahasiswa.nama', 'mahasiswa.alamat', 'mahasiswa.tanggal_lahir', 'matakuliah.kode_mk', 'matakuliah.nama_mk', 'matakuliah.sks', 'perkuliahan.nilai')
            ->get();

        return response()->json($nilai_mahasiswa);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nim' => 'required|string|max:10',
            'kode_mk' => 'required|string|max:10',
            'nilai' => 'required|numeric',
        ]);

        $nilai_mahasiswa = Perkuliahan::create($request->all());
        return response()->json($nilai_mahasiswa, 201);
    }

    public function update(Request $request, $nim, $kode_mk)
    {
        $request->validate([
            'nilai' => 'required|numeric',
        ]);

        $nilai_mahasiswa = Perkuliahan::where('nim', $nim)->where('kode_mk', $kode_mk)->firstOrFail();
        $nilai_mahasiswa->update($request->all());
        return response()->json($nilai_mahasiswa, 200);
    }

    public function destroy($nim, $kode_mk)
    {
        $nilai_mahasiswa = Perkuliahan::where('nim', $nim)->where('kode_mk', $kode_mk)->firstOrFail();
        $nilai_mahasiswa->delete();
        return response()->json(null, 204);
    }
}
