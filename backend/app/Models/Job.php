<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'experience',
        'salary',
        'company_name',
        'location',
    ];

    protected $casts = [
        'salary' => 'decimal:2',
    ];

    public function admin()
    {
        return $this->belongsTo(Admin::class);
    }
}
