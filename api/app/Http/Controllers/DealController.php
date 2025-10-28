<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\DealResource;
use App\Models\Deal;
use Illuminate\Http\Request;

class DealController extends Controller
{
    public function index() {
        $deals = Deal::all();

        return DealResource::collection($deals);
    }

}
