<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\ProductResource;
use App\Models\Favourite;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class FavouriteController extends Controller
{
    public function index() {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $favouriteProducts = $user->favourites;
        return ProductResource::collection($favouriteProducts);

    }

    public function like(String $productId) {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->favourites()->syncWithoutDetaching([$productId]);

        $product = Product::findOrFail($productId);
        return new ProductResource($product);

    }

    public function unlike($productId)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user->favourites()->detach($productId);

        return response()->json(['message' => 'Unliked successfully']);
    }
}
