<?php
require 'vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Support\Facades\DB;

$pdo = DB::connection()->getPdo();
$pdo->exec("PRAGMA writable_schema = 1;");
$result = DB::select("SELECT sql FROM sqlite_master WHERE type='table' AND name='lessons'");
$sql = $result[0]->sql;

// Find the check constraint and replace it
// Usually looks like: check ("type" in ('video', 'text', 'interactive_code'))
$newSql = str_replace(
    "'video', 'text', 'interactive_code'", 
    "'video', 'text', 'interactive_code', 'quiz'", 
    $sql
);

// If for some reason it has double quotes for strings, just replace the whole thing:
if (strpos($newSql, "'quiz'") === false) {
    $newSql = str_replace(
        "\"video\", \"text\", \"interactive_code\"", 
        "\"video\", \"text\", \"interactive_code\", \"quiz\"", 
        $sql
    );
}

$stmt = $pdo->prepare("UPDATE sqlite_master SET sql = ? WHERE type = 'table' AND name = 'lessons'");
$stmt->execute([$newSql]);
$pdo->exec("PRAGMA writable_schema = 0;");

echo "Schema updated successfully!";
