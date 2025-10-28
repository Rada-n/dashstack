<?php

namespace Database\Seeders;

use App\Models\Deal;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DealSeeder extends Seeder
{
    public function run(): void
    {
        Deal::create([
            'name' => 'Apple Watch',
            'status' => 'Delivered',
            'date' => '2024-01-01',
            'time' => '12:00:00',
            'piece' => 5,
            'amount' => 502,
            'location' => 'Warehouse A',
            'image' => 'images/AppleWatch.jpg',
        ]);

        Deal::create([
            'name' => 'iPhone 14',
            'status' => 'Pending',  
            'date' => '2024-01-05',
            'time' => '15:30:00',
            'piece' => 10,
            'amount' => 216,
            'location' => 'Warehouse B',          
            'image' => 'images/iPhone.jpg',
        ]);

        Deal::create([
            'name' => 'MacBook Pro',
            'status' => 'Shipped',  
            'date' => '2024-01-10',
            'time' => '09:45:00',
            'piece' => 3,
            'amount' => 390,
            'location' => 'Warehouse C',          
            'image' => 'images/MacBook.jpg',
        ]);

        Deal::create([
            'name' => 'iPad Air',
            'status' => 'Delivered',  
            'date' => '2024-01-15',
            'time' => '11:15:00',
            'piece' => 7,
            'amount' => 270,
            'location' => 'Warehouse B',          
            'image' => 'images/MacBook.jpg',
        ]);
    }
}