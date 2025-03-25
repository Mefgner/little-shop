Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\client'; npm run dev"

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\server'; npm run dev"

Start-Process -FilePath "stripe.exe" -ArgumentList "listen -f http://localhost:4200/api/orders/stripe-webhook"
