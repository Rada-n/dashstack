<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class SaleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

     protected $model = Sale::class;

    public function definition(): array
    {
        return [
            'total' => $this->faker->numberBetween(2000, 10000),
            'date' => $this->faker->dateTimeBetween('2025-01-01', '2025-03-01')->format('Y-m-d'),
        ];
    }
}
