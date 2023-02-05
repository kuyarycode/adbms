<?php

namespace App\Http\Controllers;

use Tightenco\Ziggy\Ziggy;

class LibraryController extends Controller
{
    public function ziggy()
    {
        return json_encode(new Ziggy());
    }
}
