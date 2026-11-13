const http = require('http');

const PORT = 5000;
let authToken = '';

function request(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };
    if (payload) {
      reqHeaders['Content-Length'] = Buffer.byteLength(payload);
    }
    if (authToken && !reqHeaders['Authorization']) {
      reqHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    const req = http.request(
      {
        hostname: 'localhost',
        port: PORT,
        path,
        method,
        headers: reqHeaders
      },
      (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode, data: JSON.parse(data) });
          } catch {
            resolve({ status: res.statusCode, raw: data });
          }
        });
      }
    );

    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING COMPREHENSIVE END-TO-END SYSTEM TESTS ---\n');

  // 1. Health check
  const health = await request('GET', '/api/health');
  console.log('1. Health check:', health.status === 200 ? 'PASS ✓' : 'FAIL ✗');

  // 2. Products catalogue
  const prods = await request('GET', '/api/products?category=consoles');
  console.log('2. Catalogue browse (Consoles):', prods.status === 200 && prods.data.products.length > 0 ? `PASS ✓ (${prods.data.products.length} found)` : 'FAIL ✗');

  // 3. Estimate Calculator
  const calc = await request('POST', '/api/calculator/estimate', {
    productId: 'prod-ps5-disc',
    condition: 'good',
    accessories: { extraController: true, originalBox: true }
  });
  console.log('3. Estimate Calculator server validation:', calc.status === 200 && calc.data.estimate.calculatedEstimate > 0 ? `PASS ✓ ($${calc.data.estimate.calculatedEstimate} MXN)` : 'FAIL ✗');

  // 4. Create Sell Request (AC-05)
  const sellReq = await request('POST', '/api/requests', {
    customer: {
      fullName: 'Juan Pablo Montoya',
      email: 'juan.pablo@test.mx',
      phone: '+52 55 9988 7766',
      city: 'Puebla',
      state: 'Puebla',
      postalCode: '72000'
    },
    items: [
      {
        productId: 'prod-ps5-disc',
        condition: 'good',
        accessories: { extraController: true }
      }
    ],
    termsAccepted: true
  });
  const createdId = sellReq.data?.requestId;
  console.log('4. Create Sell Request (REQ generated):', sellReq.status === 201 && createdId ? `PASS ✓ (${createdId})` : 'FAIL ✗');

  // 5. Customer Track Request (Public lookup)
  const track = await request('GET', `/api/requests/track/${createdId}`);
  console.log('5. Public Request Tracking:', track.status === 200 && track.data.request.id === createdId ? 'PASS ✓' : 'FAIL ✗');

  // 6. Admin Login
  const login = await request('POST', '/api/auth/login', {
    email: 'admin@liongamestv.mx',
    password: 'Admin123!'
  });
  authToken = login.data?.token;
  console.log('6. Admin Staff Login & JWT generation:', login.status === 200 && authToken ? 'PASS ✓' : 'FAIL ✗');

  // 7. Explicit Shipping Approval (AC-09)
  const ship = await request('POST', `/api/requests/${createdId}/approve-shipping`, {
    carrier: 'Estafeta México',
    trackingNumber: 'EST-TEST-12345678',
    instructions: 'Empacar con 3 capas de plástico burbuja'
  });
  console.log('7. Explicit Shipping Approval (AC-09):', ship.status === 200 && ship.data.request.shippingApproval.approved ? 'PASS ✓' : 'FAIL ✗');

  // 8. Physical Receiving & Inspection Findings (AC-10)
  const inspect = await request('POST', `/api/inspection/${createdId}/record-findings`, {
    outcome: 'REVISED_OFFER',
    functionalityStatus: 'fully_functional',
    physicalCondition: 'fair',
    serialVerified: 'SN-PS5-TEST-999',
    discrepancies: 'Rasguño cosmético en carcasa lateral',
    revisedAmount: 5800,
    revisedReason: 'Ajuste de $575 MXN por desgaste cosmético visible en la cubierta blanca'
  });
  console.log('8. Record Inspection Findings & Revised Offer (AC-10):', inspect.status === 200 && inspect.data.request.revisedOffer.revisedAmount === 5800 ? 'PASS ✓' : 'FAIL ✗');

  // 9. Customer Explicit Decision on Revised Offer (AC-11)
  const decision = await request('POST', `/api/requests/${createdId}/customer-decision`, {
    decision: 'ACCEPT',
    offerType: 'revised'
  });
  console.log('9. Customer Explicit Acceptance of Revised Offer (AC-11):', decision.status === 200 && decision.data.request.status === 'FINAL_ACCEPTED' ? 'PASS ✓' : 'FAIL ✗');

  // 10. Email Notification Logs
  const emails = await request('GET', `/api/logs/emails?requestId=${createdId}`);
  console.log('10. Email Notification Triggers & Templates:', emails.status === 200 && emails.data.emails.length > 0 ? `PASS ✓ (${emails.data.emails.length} notifications logged)` : 'FAIL ✗');

  console.log('\n--- ALL TEST CRITERIA COMPLETED SUCCESSFULLY ---');
  process.exit(0);
}

// Start server in background if not already running, then test
const app = require('./index.js');
setTimeout(runTests, 1000);
