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
        Schema::table('courses', function (Blueprint $table) {
            $table->string('difficulty')->default('Beginner')->after('price');
            $table->text('requirements')->nullable()->after('difficulty');
            $table->text('what_you_will_learn')->nullable()->after('requirements');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('courses', function (Blueprint $table) {
            $table->dropColumn(['difficulty', 'requirements', 'what_you_will_learn']);
        });
    }
};
