<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Calendar>
 */
class CalendarFactory extends Factory
{
    public function definition(): array
    {
        $isRange = $this->faker->boolean(40);

        $endOf2025 = new \DateTime('2025-12-31 23:59:59');

        if ($isRange) {
            $firstDate = $this->faker->dateTimeBetween('now', '2025-12-20 00:00:00');
            $lastDate = (clone $firstDate)->modify('+' . rand(1, 10) . ' days');
            if ($lastDate > $endOf2025) {
                $lastDate = $endOf2025;
            }
            $date = null;
        } else {
            $date = $this->faker->dateTimeBetween('now', '2025-12-31 23:59:59');
            $firstDate = null;
            $lastDate = null;
        }

        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(),
            'address' => $this->faker->address(),
            'date' => $date,
            'first_date' => $firstDate,
            'last_date' => $lastDate,
            'image_url' => $this->faker->imageUrl(1200, 800, 'events', true),
        ];
    }
}

