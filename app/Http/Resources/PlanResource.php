<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PlanResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return $this->only([
            'id',
            'title',
            'subtitle',
            'head1',
            'feature1',
            'feature2',
            'feature3',
            'feature4',
            'feature5',
            'originalPrice',
            'discountedPrice',
        ]);
    }
}
