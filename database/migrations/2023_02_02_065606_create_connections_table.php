<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('connections', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table
                ->foreignUuid('user_id')
                ->constrained('users')
                ->cascadeOnUpdate()
                ->cascadeOnUpdate();
            $table->string('name');
            $table->string('slug');
            $table->string('mysqldb_host');
            $table->string('mysqldb_port')->default(3306);
            $table->string('mysqldb_user');
            $table->string('mysqldb_pass')->nullable();
            $table->string('mysqldb_name');
            $table
                ->enum('frequency', [
                    'everyMinute',
                    'everyTwoMinutes',
                    'everyThreeMinutes',
                    'everyFourMinutes',
                    'everyFiveMinutes',
                    'everyTenMinutes',
                    'everyFifteenMinutes',
                    'everyThirtyMinutes',
                    'everyTwoHours',
                    'everyThreeHours',
                    'everyFourHours',
                    'everySixHours',
                    'hourly',
                    'daily',
                    'weekly',
                    'monthly',
                    'quarterly',
                    'yearly',
                ])
                ->default('everyMinute');
            $table->tinyInteger('notifiable', false);
            $table->tinyInteger('enabled', false)->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('connections');
    }
};
