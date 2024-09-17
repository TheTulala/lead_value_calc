document.getElementById('calculateBtn').addEventListener('click', calculateResults);

function calculateResults() {
    // Get input values
    const P = parseFloat(document.getElementById('ticketPrice').value) || 0;
    const L = parseInt(document.getElementById('monthlyLeads').value) || 0;
    const M = parseFloat(document.getElementById('profitMargin').value) / 100 || 0;
    const C = parseFloat(document.getElementById('closeRate').value) / 100 || 0;

    // Calculations
    const N = L * C;
    const R = N * P;
    const Profit = R * M;
    const V = C * P * M;
    const netMarginValueOfLead = V;
    const totalMonthlyProfit = Profit;

    // Display outputs
    document.getElementById('totalCustomers').textContent = N.toFixed(2);
    document.getElementById('totalRevenue').textContent = R.toFixed(2);
    document.getElementById('profitAfterExpenses').textContent = Profit.toFixed(2);
    document.getElementById('actualLeadValue').textContent = V.toFixed(2);
    document.getElementById('netMarginValueOfLead').textContent = netMarginValueOfLead.toFixed(2);
    document.getElementById('totalMonthlyProfit').textContent = totalMonthlyProfit.toFixed(2);

    // Scenarios for Low, Moderate, High
    const scenarios = {
        low: {
            C: Math.max(C - 0.05, 0),
            M: Math.max(M - 0.05, 0)
        },
        moderate: {
            C: C,
            M: M
        },
        high: {
            C: Math.min(C + 0.05, 1),
            M: Math.min(M + 0.05, 1)
        }
    };

    // What Should You Charge Per Lead
    document.getElementById('chargePerLeadLow').textContent = calculateChargePerLead(scenarios.low.C, scenarios.low.M, P).toFixed(2);
    document.getElementById('chargePerLeadModerate').textContent = V.toFixed(2);
    document.getElementById('chargePerLeadHigh').textContent = calculateChargePerLead(scenarios.high.C, scenarios.high.M, P).toFixed(2);

    // Monthly Profit for Business Owner
    document.getElementById('monthlyProfitLow').textContent = calculateMonthlyProfit(L, scenarios.low.C, scenarios.low.M, P).toFixed(2);
    document.getElementById('monthlyProfitModerate').textContent = totalMonthlyProfit.toFixed(2);
    document.getElementById('monthlyProfitHigh').textContent = calculateMonthlyProfit(L, scenarios.high.C, scenarios.high.M, P).toFixed(2);

    // Monthly Bill to Client
    document.getElementById('monthlyBillLow').textContent = (calculateChargePerLead(scenarios.low.C, scenarios.low.M, P) * L).toFixed(2);
    document.getElementById('monthlyBillModerate').textContent = (V * L).toFixed(2);
    document.getElementById('monthlyBillHigh').textContent = (calculateChargePerLead(scenarios.high.C, scenarios.high.M, P) * L).toFixed(2);
}

function calculateChargePerLead(C, M, P) {
    return C * P * M;
}

function calculateMonthlyProfit(L, C, M, P) {
    return (L * C * P) * M;
}
