<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\CalendarRequest;
use App\Http\Resources\CalendarResource;
use App\Models\Calendar;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CalendarController extends Controller
{
    public function index() {
        $calendarsData = Calendar::all();

        return CalendarResource::collection($calendarsData);
    }

    public function store(CalendarRequest $request) {
        try {
            Log::info('Received event data', $request->all());
            $validated = $request->validated();   

            if($request->file('image_url')) {
                $file = $request->file('image_url');
                $validated['image_url'] = $file->storeAs('images', time() . '_' . $file->getClientOriginalName(), 'public');
            } else {
                $validated['image_url'] = null;
            }

            $newEvent = Calendar::create($validated);
    
            return new CalendarResource($newEvent);
            
        }  catch (Exception $e) {
            Log::error('Error posting event: ' . $e->getMessage());
            return response()->json(['message' => 'Event post failed.  See logs for details.'], 500);
        }
    }
}
