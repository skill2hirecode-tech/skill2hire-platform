# Test Email Functionality
Write-Host "`n📧 Testing Email Configuration...`n" -ForegroundColor Cyan

# Test enrollment with email
$body = @{
    fullName = "Test Student Email"
    email = "teststudent@example.com"
    phone = "+91 98765 43210"
    education = "B.Tech CSE"
    message = "Testing email notification system"
    courseId = "1"
} | ConvertTo-Json

Write-Host "Submitting test enrollment..." -ForegroundColor Yellow
Write-Host "This will send emails to:" -ForegroundColor Gray
Write-Host "  1. Admin: skill2hirecode@gmail.com" -ForegroundColor Cyan
Write-Host "  2. Student: teststudent@example.com`n" -ForegroundColor Cyan

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/courses/1/enroll" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"

Write-Host "✅ Enrollment Successful!" -ForegroundColor Green
Write-Host "`nEnrollment ID: $($response.data.enrollment.id)" -ForegroundColor Gray
Write-Host "Status: $($response.data.enrollment.status)" -ForegroundColor Gray
Write-Host "`n📬 Check your Gmail inbox:" -ForegroundColor Yellow
Write-Host "   skill2hirecode@gmail.com" -ForegroundColor Cyan
Write-Host "`nYou should receive an email notification about this enrollment!`n" -ForegroundColor Green

Write-Host "`n💡 Tip: Check backend terminal logs for email sending status`n" -ForegroundColor Gray
