// Store captured request headers for Graph API calls
let capturedRequests = {};

// Listen for XHR requests to the Graph API for Conditional Access policies
chrome.webRequest.onBeforeSendHeaders.addListener(
    function(details) {
        // Check if this is a request we're interested in
        if (details.url.includes('graph.microsoft.com/beta/identity/conditionalAccess/policies/')) {
            // Extract the policy ID from the URL
            const policyIdMatch = details.url.match(/policies\/([^\/]+)/);
            if (policyIdMatch && policyIdMatch.length >= 2) {
                const policyId = policyIdMatch[1];
                
                // Store the headers for this policy request
                capturedRequests[policyId] = {
                    url: details.url,
                    headers: details.requestHeaders,
                    timestamp: Date.now()
                };
                
                // Cleanup old requests periodically (keep for 30 minutes)
                cleanupOldRequests();
            }
        }
        // Don't modify the request
        return { requestHeaders: details.requestHeaders };
    },
    { urls: ["https://graph.microsoft.com/beta/identity/conditionalAccess/policies/*"] },
    ["requestHeaders"]
);

// Cleanup function to remove old captured requests
function cleanupOldRequests() {
    const now = Date.now();
    const maxAge = 30 * 60 * 1000; // 30 minutes
    
    Object.keys(capturedRequests).forEach(policyId => {
        if (now - capturedRequests[policyId].timestamp > maxAge) {
            delete capturedRequests[policyId];
        }
    });
}

// Handle messages from content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if ((message.action === 'copyPolicyJson' || message.action === 'downloadPolicyJson') && message.policyId) {
        const policyId = message.policyId;
        
        // Check if we have captured headers for this policy
        if (!capturedRequests[policyId]) {
            sendResponse({ 
                success: false, 
                error: "No recent request found for this policy. Please refresh the page." 
            });
            return true;
        }
        
        // Replay the request with the original headers
        const requestInfo = capturedRequests[policyId];
        
        // Convert headers array to fetch-compatible object
        const headers = {};
        requestInfo.headers.forEach(header => {
            headers[header.name] = header.value;
        });
        
        fetch(requestInfo.url, {
            method: 'GET',
            headers: headers
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Get policy name for file naming
            const policyName = data.displayName || `policy-${policyId}`;
            const sanitizedPolicyName = policyName.replace(/[^a-z0-9-_]/gi, '_');
            
            // Send the JSON data back to the content script
            const jsonString = JSON.stringify(data, null, 2);
            sendResponse({ 
                success: true, 
                policyData: jsonString,
                policyName: sanitizedPolicyName
            });
        })
        .catch(error => {
            console.error('Error fetching policy:', error);
            sendResponse({ 
                success: false, 
                error: error.message 
            });
        });
        
        return true; // Keep the message channel open for async response
    }
});
