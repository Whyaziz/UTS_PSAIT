<?php

use App\Http\Controllers\NilaiController;
use Illuminate\Support\Facades\Route;

Route::get('/nilai', [NilaiController::class, 'index']);
Route::get('/nilai/{nim}', [NilaiController::class, 'show']);
Route::post('/nilai', [NilaiController::class, 'store']);
Route::put('/nilai/{nim}/{kode_mk}', [NilaiController::class, 'update']);
Route::delete('/nilai/{nim}/{kode_mk}', [NilaiController::class, 'destroy']);
