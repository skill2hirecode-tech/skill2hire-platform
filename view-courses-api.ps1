# View all courses via API
Write-Host "`n📚 Fetching all courses from API...`n" -ForegroundColor Cyan

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/courses" -Method GET

Write-Host "✅ Found $($response.data.courses.Count) courses:`n" -ForegroundColor Green

foreach ($course in $response.data.courses) {
    Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor DarkGray
    Write-Host "📖 $($course.title)" -ForegroundColor Yellow
    Write-Host "   ID: $($course.id)" -ForegroundColor Gray
    Write-Host "   Slug: $($course.slug)" -ForegroundColor Gray
    Write-Host "   Duration: $($course.duration)" -ForegroundColor Cyan
    Write-Host "   Level: $($course.level)" -ForegroundColor Cyan
    Write-Host "   Price: ₹$($course.price) → ₹$($course.discountPrice)" -ForegroundColor Green
    Write-Host "   Category: $($course.category)" -ForegroundColor Magenta
    Write-Host "   Active: $($course.isActive)" -ForegroundColor Green
    Write-Host "   Description: $($course.description)" -ForegroundColor White
    Write-Host ""
}

Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`n" -ForegroundColor DarkGray
