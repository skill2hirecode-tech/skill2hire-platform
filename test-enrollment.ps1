# Test Course Enrollment API
Write-Host "Testing Course Enrollment API..." -ForegroundColor Cyan

$body = @{
    fullName = "Test Student"
    email = "test@example.com"
    phone = "+91 98765 43210"
    education = "B.Tech"
    message = "Test enrollment"
    courseId = "1"
} | ConvertTo-Json

Write-Host "`nSending request to: http://localhost:5000/api/courses/1/enroll" -ForegroundColor Yellow
Write-Host "Body: $body`n" -ForegroundColor Gray

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/courses/1/enroll" `
        -Method POST `
        -Body $body `
        -ContentType "application/json" `
        -ErrorAction Stop
    
    Write-Host "✅ SUCCESS!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host "❌ ERROR!" -ForegroundColor Red
    Write-Host "Status Code: $($_.Exception.Response.StatusCode.value__)" -ForegroundColor Red
    Write-Host "Error Message: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.ErrorDetails.Message) {
        Write-Host "`nServer Response:" -ForegroundColor Yellow
        $_.ErrorDetails.Message
    }
}
