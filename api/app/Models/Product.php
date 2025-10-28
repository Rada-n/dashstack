<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'rating',  'price', 'category', 'image', 'reviews',
    ];

    public function likedByUser() {
        return $this->belongsToMany(User::class, 'favourites', 'product_id', 'user_id');
    }
}
