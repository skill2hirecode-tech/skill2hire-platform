# View all courses in PostgreSQL database
Write-Host "`n📚 Fetching all courses from database...`n" -ForegroundColor Cyan

# Using psql to query the database
$query = "SELECT id, title, slug, duration, level, price, discount_price as discountPrice, category, is_active as isActive FROM courses ORDER BY created_at DESC;"

Write-Host "Connecting to PostgreSQL..." -ForegroundColor Yellow
Write-Host "Database: skill2hire_db`n" -ForegroundColor Gray

# Execute query
psql -U postgres -d skill2hire_db -c $query

Write-Host "`n✅ Query completed!`n" -ForegroundColor Green
