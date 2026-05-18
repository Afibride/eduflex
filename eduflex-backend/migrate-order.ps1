# migrate-order.ps1
Write-Host "Migrating tables in correct order..." -ForegroundColor Yellow

$migrations = @(
    "2025_01_01_000001_create_schools_table.php",
    "2025_01_01_000002_create_users_table.php",
    "2025_01_01_000003_create_students_table.php",
    "2025_01_01_000004_create_teachers_table.php",
    "2025_01_01_000005_create_parents_table.php",
    "2025_01_01_000006_create_classes_table.php",
    "2025_01_01_000007_create_subjects_table.php",
    "2025_01_01_000008_create_enrollments_table.php",
    "2025_01_01_000009_create_attendances_table.php",
    "2025_01_01_000010_create_grades_table.php",
    "2025_01_01_000011_create_parent_student_table.php"
)

foreach ($migration in $migrations) {
    Write-Host "Migrating: $migration" -ForegroundColor Cyan
    php artisan migrate --path="database/migrations/$migration"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error migrating $migration" -ForegroundColor Red
        break
    }
}

Write-Host "Migration complete!" -ForegroundColor Green