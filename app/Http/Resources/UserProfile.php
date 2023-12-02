<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserProfile extends JsonResource
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
            'name',
            'mobile_number',
            'email',
            'role_id',
            'occupation',
            'image',
            'gender',
            'city',
            'state',
            'country'
        ]);
    }
}
