<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\OrderResource;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function index(Request $request)
    {
        $query = Order::query();
    
        if ($request->has('status')) {
            $statuses = is_array($request->status) ? $request->status : explode(',', $request->status);
            $query->whereIn('status', $statuses);
        }
    
        if ($request->has('type')) {
            $types = is_array($request->type) ? $request->type : explode(',', $request->type);
            $query->whereIn('type', $types);
        }
    
        if ($request->has('from') && $request->has('to')) {
            $query->whereBetween('date', [$request->from, $request->to]);
        }
    
        $limit = $request->query('limit', 10);
        $page = $request->query('page');
    
        if ($page) {
            $orders = $query->paginate($limit);
            return response()->json([
                'data' => OrderResource::collection($orders),
                'meta' => [
                    'current_page' => $orders->currentPage(),
                    'last_page' => $orders->lastPage(),
                    'per_page' => $orders->perPage(),
                    'total' => $orders->total(),
                ]
            ]);
        }
    
        return OrderResource::collection($query->get());
    }
    

}
