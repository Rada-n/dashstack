<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deal extends Model
{
    protected $fillable = [
        'name', 'status', 'piece', 'date', 'time', 'amount', 'location', 'image'
    ];
}
