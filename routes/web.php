<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LibraryController;
use App\Http\Controllers\Protected\BackupController;
use App\Http\Controllers\Protected\ConnectionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Ziggy routes
 * -> to use route names in frontend
 */
Route::get('routes', [LibraryController::class, 'ziggy'])->name('routes');


/**
 * Home or Landing page
 */
Route::get('/', [HomeController::class, 'index'])
    ->name('home');

Route::middleware(['guest'])->group(function () {
    /**
     * Login
     */
    Route::get('login', [LoginController::class, 'index'])
        ->name('login');

    Route::post('login', [LoginController::class, 'login']);

    /**
     * Register
     */
    Route::get('register', [RegisterController::class, 'index'])
        ->name('register');

    Route::post('register', [RegisterController::class, 'register']);

    /**
     * Forget and Reset Password
     */
    Route::prefix('password/lost')->as('password.')->group(function () {
        Route::get('request', [PasswordController::class, 'request'])
            ->name('request');

        Route::post('email', [PasswordController::class, 'email'])
            ->name('email');

        Route::get('reset/{token}', [PasswordController::class, 'reset'])
            ->name('reset');

        Route::post('update', [PasswordController::class, 'update'])
            ->name('update');
    });
});

Route::middleware(['auth'])->group(function () {
    Route::post('logout', [LoginController::class, 'logout'])
        ->name('logout');

    Route::prefix('email/verification')->as('verification.')
        ->group(function () {
            /**
             * Email Verification
             */
            Route::get('notice', [VerificationController::class, 'notice'])
                ->name('notice');

            Route::get('verify/{id}/{hash}', [VerificationController::class, 'verify'])
                ->middleware('signed')
                ->name('verify');

            Route::post('send', [VerificationController::class, 'send'])
                ->middleware('throttle:6,1')
                ->name('send');
        });

    Route::middleware(['verified'])
        ->group(function () {
            /**
             * Connections
             */
            Route::get('connections', [ConnectionController::class, 'index'])
                ->name('connections');

            Route::prefix('connection')->as('connection.')->group(function () {

                Route::get('create', [ConnectionController::class, 'create'])
                    ->name('create');

                Route::get('{id}/edit', [ConnectionController::class, 'edit'])
                    ->name('edit');

                Route::get('{id}/drop', [ConnectionController::class, 'drop_connection'])
                ->name('delete');

                Route::delete('{id}/drop', [ConnectionController::class, 'delete_connection']);

                Route::post('store', [ConnectionController::class, 'store'])
                    ->name('store');

                Route::patch('{id}/update', [ConnectionController::class, 'update'])
                    ->name('update');

                Route::get('{id}/backups', [BackupController::class, 'backups'])
                ->name('backups');

                Route::get('backup/{id}/drop', [BackupController::class, 'drop_backup'])
                ->name('backup.delete');

                Route::delete('backup/{id}/drop', [BackupController::class, 'delete_backup']);
            });
        });
});
