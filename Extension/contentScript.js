// This content script injects a "Copy JSON" button into the Conditional Access policy page

// Function to create and inject the copy button
function injectCopyButton() {
    // Check if we're on a Conditional Access policy page
    if (!window.location.href.includes('Microsoft_AAD_ConditionalAccess/PolicyBlade/policyId')) {
        return;
    }
    
    // Find the toolbar where we want to inject our button
    const toolbar = document.querySelector('ul[role="toolbar"]');
    if (!toolbar) {
        console.log('CA Copy: Toolbar not found, waiting...');
        setTimeout(injectCopyButton, 1000); // Try again in 1 second
        return;
    }
    
    // Check if our buttons are already injected
    if (document.getElementById('ca-copy-json-btn')) {
        return;
    }
    
    // Create Copy JSON button
    const listItemCopy = document.createElement('li');
    listItemCopy.className = 'fxs-commandBar-item';
    
    const copyButton = document.createElement('button');
    copyButton.id = 'ca-copy-json-btn';
    copyButton.className = 'fxs-commandBar-item-button ca-custom-btn';
    copyButton.title = 'Copy JSON config to clipboard';
    copyButton.setAttribute('type', 'button');
    
    // Create the icon for Copy button
    const copyIcon = document.createElement('span');
    copyIcon.className = 'fxs-commandBar-item-icon';
    copyIcon.innerHTML = `
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z" stroke="#0078d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `;
    
    // Create the label for Copy button
    const copyLabel = document.createElement('span');
    copyLabel.className = 'fxs-commandBar-item-text';
    copyLabel.style.color = '#0078d4';
    copyLabel.textContent = 'Copy JSON';
    
    // Assemble the Copy button
    copyButton.appendChild(copyIcon);
    copyButton.appendChild(copyLabel);
    listItemCopy.appendChild(copyButton);
    
    // Add click handler for Copy button
    copyButton.addEventListener('click', handleCopyButtonClick);
    
    // Create Download JSON button
    const listItemDownload = document.createElement('li');
    listItemDownload.className = 'fxs-commandBar-item';
    
    const downloadButton = document.createElement('button');
    downloadButton.id = 'ca-download-json-btn';
    downloadButton.className = 'fxs-commandBar-item-button ca-custom-btn';
    downloadButton.title = 'Download JSON config as file';
    downloadButton.setAttribute('type', 'button');
    
    // Create the icon for Download button
    const downloadIcon = document.createElement('span');
    downloadIcon.className = 'fxs-commandBar-item-icon';
    downloadIcon.innerHTML = `
        <svg width="21" height="21" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 7L12 14M12 14L15 11M12 14L9 11" stroke="#0078d4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 17H12H8" stroke="#0078d4" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7" stroke="#0078d4" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
    `;
    
    // Create the label for Download button
    const downloadLabel = document.createElement('span');
    downloadLabel.className = 'fxs-commandBar-item-text';
    downloadLabel.style.color = '#0078d4';
    downloadLabel.textContent = 'Download';
    
    // Assemble the Download button
    downloadButton.appendChild(downloadIcon);
    downloadButton.appendChild(downloadLabel);
    listItemDownload.appendChild(downloadButton);
    
    // Add click handler for Download button
    downloadButton.addEventListener('click', handleDownloadButtonClick);
    
    // Inject custom styles for our buttons
    injectCustomStyles();
    
    // Inject the buttons into the toolbar
    toolbar.appendChild(listItemCopy);
    toolbar.appendChild(listItemDownload);
    console.log('CA Copy: Buttons injected');
}

// Function to inject custom styles for our button
function injectCustomStyles() {
    if (document.getElementById('ca-copy-styles')) {
        return; // Styles already injected
    }
    
    const styleEl = document.createElement('style');
    styleEl.id = 'ca-copy-styles';
    styleEl.textContent = `
        .ca-custom-btn {
            border: none !important;
            background: transparent !important;
            display: flex !important;
            align-items: center !important;
            height: 36px;
            padding: 0 12px !important;
            cursor: pointer !important;
        }
        
        .ca-custom-btn:hover {
            background-color: #f3f2f1 !important;
        }
        
        .ca-custom-btn .fxs-commandBar-item-icon {
            color: #0078d4 !important;
        }
        
        .ca-custom-btn .fxs-commandBar-item-text {
            color: #323130 !important;
            margin-left: 4px !important;
        }
        
        .fxs-commandBar-item {
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
        }
        
        .ca-notification {
            position: absolute;
            z-index: 10000;
            padding: 6px 12px;
            border-radius: 3px;
            font-size: 12px;
            font-weight: 500;
            box-shadow: 0 2px 4px rgba(0,0,0,0.14);
            animation: ca-fade-in 0.15s ease-out forwards;
            white-space: nowrap;
            display: inline-block;
            color: white;
            max-width: 250px;
            right: 15px;
            top: 0;
            height: 24px;
            line-height: 24px;
            display: flex;
            align-items: center;
        }
        
        /* Remove the triangle pointer as it's now in the toolbar */
        .ca-notification:before {
            display: none;
        }
        
        .ca-notification-info {
            background-color: #0078d4;
        }
        
        .ca-notification-success {
            background-color: #107c10;
        }
        
        .ca-notification-error {
            background-color: #d13438;
            padding-right: 25px;
        }
        
        .ca-notification-close {
            position: absolute;
            top: 6px;
            right: 8px;
            font-size: 12px;
            cursor: pointer;
        }
        
        @keyframes ca-fade-in {
            from {
                opacity: 0;
                transform: translateY(-3px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    
    document.head.appendChild(styleEl);
}

// Function to handle the button click
function handleCopyButtonClick(event) {
    // Store the button reference for positioning the notification
    const buttonElement = event.currentTarget;
    
    // Extract the policy ID from the URL
    const url = window.location.href;
    const policyIdMatch = url.match(/policyId\/([^\/]+)/);
    
    if (!policyIdMatch || policyIdMatch.length < 2) {
        showNotification('Error: Could not determine policy ID', 'error', buttonElement);
        return;
    }
    
    const policyId = decodeURIComponent(policyIdMatch[1]);
    showNotification('Copying policy JSON...', 'info', buttonElement);
    
    // Request the policy data from the background script
    chrome.runtime.sendMessage({ 
        action: 'copyPolicyJson', 
        policyId: policyId 
    }, response => {
        if (response.success && response.policyData) {
            // Copy the data to clipboard from the content script
            copyToClipboard(response.policyData)
                .then(() => {
                    showNotification('Policy JSON copied to clipboard!', 'success', buttonElement);
                })
                .catch(err => {
                    console.error('Copy failed:', err);
                    showNotification(`Error copying: ${err.message}`, 'error', buttonElement);
                });
        } else {
            showNotification(`Error: ${response.error || 'Failed to copy policy'}`, 'error', buttonElement);
        }
    });
}

// Function to handle the download button click
function handleDownloadButtonClick(event) {
    // Store the button reference for positioning the notification
    const buttonElement = event.currentTarget;
    
    // Extract the policy ID from the URL
    const url = window.location.href;
    const policyIdMatch = url.match(/policyId\/([^\/]+)/);
    
    if (!policyIdMatch || policyIdMatch.length < 2) {
        showNotification('Error: Could not determine policy ID', 'error', buttonElement);
        return;
    }
    
    const policyId = decodeURIComponent(policyIdMatch[1]);
    showNotification('Preparing download...', 'info', buttonElement);
    
    // Request the policy data from the background script
    chrome.runtime.sendMessage({ 
        action: 'downloadPolicyJson', 
        policyId: policyId 
    }, response => {
        if (response.success && response.policyData) {
            try {
                // Parse JSON to clean up specific fields
                const policyObj = JSON.parse(response.policyData);
                
                // Remove the specified fields
                delete policyObj.id;
                delete policyObj.createdDateTime;
                delete policyObj.modifiedDateTime;
                
                // Convert back to formatted JSON string
                const cleanedJsonData = JSON.stringify(policyObj, null, 2);
                
                // Download the data as a file
                downloadJsonFile(cleanedJsonData, response.policyName);
                showNotification('Download started!', 'success', buttonElement);
            } catch (err) {
                console.error('Error processing JSON:', err);
                showNotification(`Error processing JSON: ${err.message}`, 'error', buttonElement);
            }
        } else {
            showNotification(`Error: ${response.error || 'Failed to download policy'}`, 'error', buttonElement);
        }
    });
}

// Function to copy text to clipboard
async function copyToClipboard(text) {
    try {
        // Try the newer clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }
        
        // Fall back to the older method for non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        textArea.focus();
        textArea.select();
        
        // Execute the copy command
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!success) {
            throw new Error('Copy command was unsuccessful');
        }
    } catch (err) {
        console.error('Failed to copy: ', err);
        throw err;
    }
}

// Function to download JSON as file
function downloadJsonFile(jsonData, filename) {
    // Create a blob with the JSON data
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}.json`;
    link.style.display = 'none';
    
    // Add to document, click it, and then clean up
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }, 100);
}

// Function to create and show a notification
function showNotification(message, type = 'info', buttonElement = null) {
    // Remove any existing notification
    const existingNotification = document.getElementById('ca-copy-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'ca-copy-notification';
    notification.className = `ca-notification ca-notification-${type}`;
    
    // Create inner text container to ensure text is white
    const textSpan = document.createElement('span');
    textSpan.textContent = message;
    notification.appendChild(textSpan);
    
    // Find the toolbar to place notification inside
    const toolbar = document.querySelector('ul[role="toolbar"]');
    
    if (toolbar) {
        // Add notification to the toolbar - it will float right due to absolute positioning
        toolbar.style.position = 'relative'; // Ensure the toolbar can position absolute children
        toolbar.appendChild(notification);
    } else {
        // Fallback if toolbar not found, place in body with fixed position
        notification.style.position = 'fixed';
        notification.style.top = '15px';
        notification.style.right = '15px';
        notification.style.transform = 'none';
        document.body.appendChild(notification);
    }
    
    // Auto-remove after a delay, unless it's an error
    if (type !== 'error') {
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 1500);
    } else {
        // Add a close button for errors
        const closeBtn = document.createElement('span');
        closeBtn.className = 'ca-notification-close';
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => notification.remove());
        notification.appendChild(closeBtn);
    }
}

// Initial attempt to inject button
injectCopyButton();

// Observe for page changes to inject the button when navigating to policy pages
const observer = new MutationObserver(() => {
    if (window.location.href.includes('Microsoft_AAD_ConditionalAccess/PolicyBlade/policyId')) {
        injectCopyButton();
    }
});

// Start observing the document body for changes
observer.observe(document.body, { subtree: true, childList: true });
