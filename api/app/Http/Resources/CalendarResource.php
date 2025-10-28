<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CalendarResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'title' => $this->title,
            'description' => $this->description,
            'address' => $this->address,
            'date' => $this->date ?? null,
            'dateRange' => ['firstDate' => $this->first_date ?? null,
                            'lastDate' => $this->last_date] ?? null,
            'image_url' => $this->image_url ? asset('storage/' . $this->image_url) : null,
        ];
    }
}
