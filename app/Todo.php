<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    protected $fillable = [
        
    ];

    public function users()
    {
        return $this->belongsTo(User::class);
    }

}
