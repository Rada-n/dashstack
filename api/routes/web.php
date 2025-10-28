<?php

use App\Http\Controllers\AuthorizationController;
use App\Http\Controllers\DealController;
use App\Http\Controllers\FavouriteController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\SaleController;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;


// Route::middleware('auth:sanctum')->group(function () {

//     // Dashboard

//     Route::get('/orders', [OrderController::class, 'index']);
    
//     Route::get('/users', [UserController::class, 'index']);
    
//     Route::get('/sales', [SaleController::class, 'index']);

//     Route::get('/deals', [DealController::class, 'index']);
    
//     // Products

//     Route::get('/products', [ProductController::class, 'index']);

//     Route::post('/new_product', [ProductController::class, 'store']);

//     Route::put('/update_product/{id}', [ProductController::class, 'update']);

//     Route::delete('/delete_product/{id}', [ProductController::class, 'destroy']);

//     // Favourite

//     Route::get('/favourites', [FavouriteController::class, 'index']);

//     Route::post('/like_product/{id}', [FavouriteController::class, 'like']);

//     Route::post('/unlike_product/{id}', [FavouriteController::class, 'unlike']);


//     // Todo
    
//     Route::get('/todoes', [TodoController::class, 'index']);
    
//     Route::post('/new_todo', [TodoController::class, 'store']);
    
//     Route::delete('/delete_todoes/{id}', [TodoController::class, 'destroy']);

//     // User

//     Route::get('/user', [UserController::class, 'show']);
    
//     Route::put('/user', [UserController::class, 'update']);

// });



// // Registration

// Route::post('/reg', [RegistrationController::class, 'store']);

// // Authorization

// Route::post('/auth', [AuthorizationController::class, 'store']);

