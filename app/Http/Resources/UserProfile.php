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
            'full_name',
            'mobile_number',
            'email',
            'role_id',
            'occupation',
            'profile_photo',
            'gender',
            'city',
            'state',
            'country'
        ]);
    }
}
