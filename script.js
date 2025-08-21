// Controlled Substance Order interactivity script

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the modal and form elements
    const modal = document.querySelector('.bg-white.rounded-3xl');
    const tableContainer = modal.querySelector('.overflow-x-auto');
    const saveButton = modal.querySelector('button');
    const pinField = modal.querySelector('input[type="text"]');
    const addressSelect = modal.querySelector('select');
    
    // Initialize table scrolling functionality
    initializeTableScrolling();
    
    // Add submit event for form submission
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validate PIN field if needed
        const pin = pinField.value;
        if (!pin.trim()) {
            showNotification('PIN is required', 'error');
            return;
        }
        
        // Show success message
        showNotification('Order saved successfully!', 'success');
        
        // In a real implementation, this would send the data to a server
        console.log('Order saved with PIN:', pin);
        console.log('Selected address:', addressSelect.value);
    });
    
    // Function to initialize table horizontal scrolling
    function initializeTableScrolling() {
        // Set minimum width for the table to ensure horizontal scrolling
        const table = tableContainer.querySelector('table');
        const tableWidth = calculateMinTableWidth();
        
        if (tableWidth > tableContainer.clientWidth) {
            table.style.minWidth = tableWidth + 'px';
        }
    }
    
    // Function to calculate the minimum width for the table
    function calculateMinTableWidth() {
        // Get all table headers
        const headers = Array.from(tableContainer.querySelectorAll('th'));
        let minWidth = 0;
        
        // Sum up the width of all headers plus some extra padding
        headers.forEach(header => {
            // Get the computed style of the header
            const style = window.getComputedStyle(header);
            // Calculate the total width including padding
            const width = header.offsetWidth + 
                parseInt(style.paddingLeft) + 
                parseInt(style.paddingRight);
            minWidth += width;
        });
        
        // Add a little extra for safety
        return minWidth + 20;
    }
    
    // Table width calculation functions only - scroll indicator removed
    
    // Function to display notifications (success or error)
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        
        // Set appropriate styling based on notification type
        if (type === 'success') {
            notification.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg shadow-md z-50';
        } else if (type === 'error') {
            notification.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md z-50';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
        
        // Add fade-out animation
        const fadeStyle = document.createElement('style');
        fadeStyle.textContent = `
            .fade-out {
                opacity: 0;
                transition: opacity 0.5s;
            }
        `;
        document.head.appendChild(fadeStyle);
    }
    
    // Function to enable the address dropdown keyboard navigation
    function enhanceAddressDropdown() {
        // Add keyboard navigation for the address dropdown
        addressSelect.addEventListener('keydown', (e) => {
            // Navigate options with arrow keys
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                e.preventDefault();
                
                const options = Array.from(addressSelect.options);
                const currentIndex = options.findIndex(option => option.selected);
                
                if (e.key === 'ArrowDown' && currentIndex < options.length - 1) {
                    addressSelect.selectedIndex = currentIndex + 1;
                } else if (e.key === 'ArrowUp' && currentIndex > 0) {
                    addressSelect.selectedIndex = currentIndex - 1;
                }
            }
        });
    }
    
    // Initialize enhanced address dropdown
    enhanceAddressDropdown();
});
