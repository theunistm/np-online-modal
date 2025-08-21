// Modal interactivity script

document.addEventListener('DOMContentLoaded', () => {
    // Reference to the modal and form elements
    const modal = document.querySelector('.bg-white.rounded-lg');
    const form = document.createElement('form'); // Creating a virtual form
    
    // Add submit event for form submission
    modal.querySelector('button').addEventListener('click', (e) => {
        e.preventDefault();
        
        // Collect form data
        const fieldName = modal.querySelector('input[type="text"]').value;
        const fieldType = modal.querySelector('select:nth-of-type(1)').value;
        const category = modal.querySelector('select:nth-of-type(2)').value;
        const priority = modal.querySelector('input[name="priority"]:checked') 
            ? modal.querySelector('input[name="priority"]:checked').nextElementSibling.textContent.trim()
            : 'High';
        
        // Validate form data
        if (!fieldName.trim()) {
            alert('Field Name is required');
            return;
        }
        
        // Add new row to table
        addTableRow({
            id: getNextId(),
            name: fieldName,
            type: fieldType,
            category: category,
            priority: priority
        });
        
        // Clear form fields
        modal.querySelector('input[type="text"]').value = '';
        
        // Flash success message
        flashSuccessMessage();
    });
    
    // Function to get the next ID for the table
    function getNextId() {
        const rows = modal.querySelectorAll('tbody tr');
        if (rows.length === 0) return 1;
        
        const lastId = parseInt(rows[rows.length - 1].querySelector('td').textContent);
        return isNaN(lastId) ? rows.length + 1 : lastId + 1;
    }
    
    // Function to add a new row to the table
    function addTableRow(data) {
        const tbody = modal.querySelector('tbody');
        const tr = document.createElement('tr');
        
        tr.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${data.name}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.type}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.category}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${data.priority}</td>
        `;
        
        tbody.appendChild(tr);
    }
    
    // Function to display a success message
    function flashSuccessMessage() {
        const successMsg = document.createElement('div');
        successMsg.className = 'absolute top-2 right-2 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded';
        successMsg.textContent = 'Entry added successfully!';
        
        modal.appendChild(successMsg);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    }
    
    // Make the modal draggable (optional enhancement)
    makeDraggable(modal);
    
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        
        // Get the header element as the drag handle
        const header = element.querySelector('.border-b');
        if (header) {
            header.style.cursor = 'move';
            header.onmousedown = dragMouseDown;
        }
        
        function dragMouseDown(e) {
            e.preventDefault();
            // Get the mouse cursor position at startup
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // Call a function whenever the cursor moves
            document.onmousemove = elementDrag;
        }
        
        function elementDrag(e) {
            e.preventDefault();
            // Calculate the new cursor position
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // Set the element's new position
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }
        
        function closeDragElement() {
            // Stop moving when mouse button is released
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
});
