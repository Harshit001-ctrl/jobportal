<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('company_name')->after('title'); 
            $table->string('location')->after('company_name');
        });
    }

    public function down()
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn(['company_name', 'location']);
        });
    }
};
