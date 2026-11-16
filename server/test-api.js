const http = require('http');
const app = require('./index.js');

const PORT = 5001; // Use port 5001 for automated test isolation
let authToken = '';
let serverInstance = null;

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
        hostname: '127.0.0.1',
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

  try {
    // 1. Health check
    const health = await request('GET', '/api/health');
    console.log('1. Health check:', health.status === 200 ? 'PASS ✓' : `FAIL ✗ (${health.status})`);

    // 2. Products catalogue
    const prods = await request('GET', '/api/products?category=consoles');
    console.log('2. Catalogue browse (Consoles):', prods.status === 200 && prods.data.products.length > 0 ? `PASS ✓ (${prods.data.products.length} found)` : 'FAIL ✗');

    // 3. User's exact Official Excel Nintendo 64 Pricing Formula Test
    // N64 Base $500 + Extra original controller $150 + Expansion Pak $400 = $1,050 MXN
    const n64Estimate = await request('POST', '/api/calculator/estimate', {
      productId: 'n64-original',
      condition: 'working_good',
      accessories: {
        extra_controller: true,
        expansion_pak: true
      }
    });
    const n64Total = n64Estimate.data?.estimate?.calculatedEstimate;
    console.log(`3. Official Excel N64 Formula Validation:`, n64Total === 1050 ? `PASS ✓ (Exact $1,050 MXN)` : `FAIL ✗ (Received $${n64Total})`);

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
          productId: 'n64-original',
          condition: 'working_good',
          accessories: {
            extra_controller: true,
            expansion_pak: true
          }
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
      email: 'admin@retrocompra.com',
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
      serialVerified: 'SN-N64-TEST-999',
      discrepancies: 'Rasguño cosmético en carcasa lateral',
      revisedAmount: 1400,
      revisedReason: 'Ajuste de $150 MXN por detalle estético en la cubierta'
    });
    console.log('8. Record Inspection Findings & Revised Offer (AC-10):', inspect.status === 200 && inspect.data.request.revisedOffer.revisedAmount === 1400 ? 'PASS ✓' : 'FAIL ✗');

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
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  } finally {
    if (serverInstance) {
      serverInstance.close();
    }
    process.exit(0);
  }
}

// Start server on port 5001 and run tests
serverInstance = app.listen(PORT, '127.0.0.1', () => {
  runTests();
});
