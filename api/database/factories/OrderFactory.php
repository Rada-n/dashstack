<?php

namespace Database\Factories;

use App\Models\Order;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Arr;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Order::class;
    
     public function definition(): array
     {
         $types = ['Electric', 'Book', 'Medicine', 'Watch', 'Chain', 'Bag', 'Lamp', 'IPhone'];
         $statuses = ['Completed', 'Processing', 'Rejected', 'On hold', 'In transit'];
         $fakerName = fake()->firstName . ' ' . fake()->lastName;
 
         return [
             'name' => $fakerName,
             'address' => fake()->address,
             'type' => Arr::random($types),
             'status' => Arr::random($statuses),
             'date' => fake()->date('Y-m-d'),
             'created_at' => now(),
             'updated_at' => now(),
             'amount' => fake()->numberBetween(20, 10000),
         ];
     }
 }