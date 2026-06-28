<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->foreignId('quiz_id')->nullable()->constrained()->nullOnDelete();
        });
        
        if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE lessons MODIFY type ENUM('video', 'text', 'interactive_code', 'quiz') DEFAULT 'video'");
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lessons', function (Blueprint $table) {
            $table->dropForeign(['quiz_id']);
            $table->dropColumn('quiz_id');
        });
        
        if (\Illuminate\Support\Facades\DB::getDriverName() !== 'sqlite') {
            \Illuminate\Support\Facades\DB::statement("ALTER TABLE lessons MODIFY type ENUM('video', 'text', 'interactive_code') DEFAULT 'video'");
        }
    }
};
