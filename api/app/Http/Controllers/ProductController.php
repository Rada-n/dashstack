<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::all();

        return ProductResource::collection($products);
    }
    
    public function store(ProductRequest $request) {
        try {
            $validated = $request->validated();   

            if($request->file('image')) {
                $file = $request->file('image');
                $validated['image'] = $file->storeAs('images', time() . '_' . $file->getClientOriginalName(), 'public');
            } else {
                $validated['image'] = null;
            }

            $newProduct = Product::create($validated);
    
            return new ProductResource($newProduct);
            
        }  catch (Exception $e) {
            Log::error('Error posting product: ' . $e->getMessage());
            return response()->json(['message' => 'Product post failed.  See logs for details.'], 500);
        }
    }

    public function update(ProductRequest $request, string $id) {
        try {
            $product = Product::findOrFail($id);
            $validated = $request->validated();
    
            if ($request->file('image')) {
                if ($product->image && Storage::disk('public')->exists($product->image)) {
                    Storage::disk('public')->delete($product->image);
                }
    
                $file = $request->file('image');
                $validated['image'] = $file->storeAs(
                    'images',
                    time() . '_' . $file->getClientOriginalName(),
                    'public'
                );
            }
    
            $product->update($validated);
            $product->refresh();
    
            return new ProductResource($product);
    
        } catch (Exception $e) {
            Log::error('Error updating product: ' . $e->getMessage());
            return response()->json(['message' => 'Product update failed. See logs for details.'], 500);
        }
    }
    
    public function destroy(string $id) {
        try {
            $product = Product::findOrFail($id);
    
            if ($product->image && Storage::disk('public')->exists($product->image)) {
                Storage::disk('public')->delete($product->image);
            }
    
            $product->delete();
    
            return response()->json($id);
    
        } catch (Exception $e) {
            Log::error('Error deleting product: ' . $e->getMessage());
            return response()->json(['message' => 'Product delete failed. See logs for details.'], 500);
        }
    }
}    
