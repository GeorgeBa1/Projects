let isCompleted;
let thesisStatus;
$(document).ready(function () {
    const logged_user = JSON.parse(localStorage.getItem("logged_user"));
    const user_id = logged_user[0].user_id;
    const thesis_id = logged_user[0].thesis_id;
    
    loadThesisDetails(user_id);
    loadGradeDetails(thesis_id);
    loadPresentationDate(thesis_id);
    // Function to load thesis details
    function loadThesisDetails(user_id) {
        $.ajax({
            url: './php/presentation_details.php',
            type: 'GET',
            dataType: 'json',
            data: { user_id: user_id },
            success: function (data) {
                if (data.success) {
                    populateThesisTable(data.theses);
                } else {
                    console.error('Error loading thesis details.');
                }
            }
        });
    }

    // Function to populate the thesis table
    function populateThesisTable(theses) {
        const tableBody = $('#thesisTableBody');
        tableBody.empty();
        console.log(theses);
    
        theses.forEach(thesis => {
            if (thesis.status === 'under_review') { // unhide the presentation pick if the thesis is under_review
                $('#presentationDiv').removeClass('hidden');
                flatpickr("#presentationDateTime", {
                    dateFormat: "Y-m-d H:i",
                    enableTime: true,
                    time_24hr: true
                });
            }
            
            // Set "Not Assigned" if any field is null or empty
            const supervisor1 = (thesis.supervisor_name && thesis.supervisor_surname) ? `${thesis.supervisor_name} ${thesis.supervisor_surname}` : 'Not Assigned';
            const coSupervisor1 = (thesis.supervisor2_name && thesis.supervisor2_surname) ? `${thesis.supervisor2_name} ${thesis.supervisor2_surname}` : 'Not Assigned';
            const coSupervisor2 = (thesis.supervisor3_name && thesis.supervisor3_surname) ? `${thesis.supervisor3_name} ${thesis.supervisor3_surname}` : 'Not Assigned';
    
            // Format the committee section to display each member on a new line
            const committee = `
                <div><strong>supervisor:</strong> ${supervisor1}</div>
                <div><strong>Co-supervisor:</strong> ${coSupervisor1}</div>
                <div><strong>Co-supervisor:</strong> ${coSupervisor2}</div>
            `;
    
            // Check if the status is "under_review"
            const isEditable = thesis.status === 'under_review'; // Allow editing only if status is 'under_review'
            const inputClass = isEditable ? '' : 'opacity-50 cursor-not-allowed'; // Disable styling for non-editable inputs
            const disabledAttr = isEditable ? '' : 'disabled'; // Disable inputs if not editable
    
            // Populate the table rows
            tableBody.append(`
                <tr class="border-b bg-gray-800 ${!isEditable ? 'bg-gray-100' : ''}">
                    <td class="py-4 px-4">${thesis.title}</td>
                    <td class="py-4 px-4">${thesis.student_name} ${thesis.student_surname}</td>
                    <td class="py-4 px-4">${committee}</td>
                    <td class="py-4 px-4">
                        <input type="text" value="${thesis.link || ''}" 
                            placeholder="Enter link" 
                            class="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 mb-2 ${inputClass}"
                            id="link-${thesis.thesis_id}" ${disabledAttr} />
                        <input type="text" value="${thesis.venue || ''}" 
                            placeholder="Enter venue" 
                            class="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 ${inputClass}"
                            id="venue-${thesis.thesis_id}" ${disabledAttr} />
                    </td>
                    <td class="py-4 px-4">
                        <button onclick="savePresentationDetails(${thesis.thesis_id})" 
                            class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded ${isEditable ? '' : 'opacity-50 cursor-not-allowed'}" 
                            ${disabledAttr}>
                            Save
                        </button>
                    </td>
                </tr>
            `);
        });
    }
});

// Function to save the presentation link or venue
function savePresentationDetails(thesisId) {
    const link = $(`#link-${thesisId}`).val();
    const venue = $(`#venue-${thesisId}`).val();

    $.ajax({
        url: './php/update_presentation_details.php',
        type: 'POST',
        data: { thesis_id: thesisId, link: link, venue: venue },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire('Success', 'Presentation details updated successfully!', 'success');
            } else {
                Swal.fire('Error', response.error || 'Failed to update details.', 'error');
            }
        } 
    });
}

// Function to load grades details
function loadGradeDetails(thesis_id) {
    $.ajax({
        url: './php/grades.php',
        type: 'GET',
        dataType: 'json',
        data: { thesis_id: thesis_id },
        success: function (data) {
            if (data.success && data.grades.length > 0) {
                populateGradeTable(data.grades);
            } else {
                console.error('No grades found');
            }
        }
    });

    $.ajax({
        url: './php/timeline.php',
        type: 'GET',
        data: { thesis_id: thesis_id },
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                populateStatusTimeline(data.statusTimeline);
            } else {
                console.error('Failed to load thesis status data:', data.error);
            }
        }
    });
}

function populateGradeTable(grades) {
    if (grades) {
        // Unhide the grades table and header if there are reviews available
        $('#gradeTable').removeClass('hidden');
        $('#reviewHeader').removeClass('hidden');
    }
    const reviewBody = $('#gradeTableBody');
    reviewBody.empty();

    grades.forEach(grade => {

        // Calculate the average of the three grades and round to the nearest 0.5
        const gradesAgg = [
            parseFloat(grade.supervisor_grade) || 0,
            parseFloat(grade.supervisor2_grade) || 0,
            parseFloat(grade.supervisor3_grade) || 0
        ];
        const gradeSum = gradesAgg.reduce((sum, grade) => sum + grade, 0);
        const averageGrade = gradeSum / 3;
        const finalGrade = Math.round(averageGrade * 2) / 2; // Round to the nearest 0.5

        // Tooltip text for the final grade
        const tooltipText = `Final Grade: ${finalGrade}`;

        // Populate the table rows with tooltips
        reviewBody.append(`
            <tr class="bg-gray-800 border-b ">
                <td class="py-4 px-4" title="${tooltipText}">${grade.supervisor_grade || 'N/A'}</td>
                <td class="py-4 px-4" title="${tooltipText}">${grade.supervisor2_grade || 'N/A'}</td>
                <td class="py-4 px-4" title="${tooltipText}">${grade.supervisor3_grade || 'N/A'}</td>
                <td class="py-4 px-4">
                    <input type="text" 
                        class="library-link-input w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-600 " 
                        value="${grade.library_link || ''}" 
                        data-id="${grade.thesis_id}" 
                       />
                </td>
                <td>
                    <button onclick="saveLibraryLink(${grade.thesis_id})" 
                       class="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded">
                        Save
                    </button>
                </td>
            </tr>
        `);
    });
}

function saveLibraryLink(thesisId) {
    // Retrieve the library link input value associated with this thesis ID
    const libraryLink = $(`input[data-id="${thesisId}"]`).val();

    $.ajax({
        url: './php/save_library_link.php',
        type: 'POST',
        data: { thesis_id: thesisId, library_link: libraryLink },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire('Success', 'Library link updated successfully!', 'success');
            } else {
                Swal.fire('Error', response.error || 'Failed to update the link.', 'error');
            }
        }
    });
}


function loadReviewDetails(thesis_id) {
    $.ajax({
        url: './php/grades.php',
        type: 'GET',
        dataType: 'json',
        data: { thesis_id: thesis_id },
        success: function (data) {
            if (data.success && data.reviews.length > 0) {
                populateGradeTable(data.reviews);
            } else {
                console.error('No grades found');
            }
        }
    });

    $.ajax({
        url: './php/timeline.php',
        type: 'GET',
        data: { thesis_id: thesis_id },
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                populateStatusTimeline(data.statusTimeline);
            } else {
                console.error('Failed to load thesis status data:', data.error);
            }
        },
        error: function (xhr, status, error) {
            console.error('Error fetching thesis status data:', error);
        }
    });
}


function populateStatusTimeline({ assigned_at, updated_at, status }) {
    const statusTimeline = $('#statusTimeline').empty();

    const format = date => new Date(date).toLocaleString();

    if (assigned_at) {
        statusTimeline.append(`<li><p class="time">${format(assigned_at)}</p><p>Assign Date</p></li>`);
    }

    if (updated_at) {
        statusTimeline.append(`<li><p class="time">${format(updated_at)}</p><p>Last Update</p></li>`);
    }

    if (status) {
        statusTimeline.append(`<li class="highlight-status"><p class="status-current">${status}</p><p>Current Status</p></li>`);
    }
}


$('#setPresentationDate').click(function () {
    const selectedDateTime = $('#presentationDateTime').val();

    if (!selectedDateTime) {
        Swal.fire('Warning', 'Please select a presentation date and time before saving.', 'warning');
        return;
    }

    // Call the savePresentationDate function to save the date
    savePresentationDate(selectedDateTime);
});

function savePresentationDate(dateTime) {
    $.ajax({
        url: './php/save_presentation_date.php',
        type: 'POST',
        data: { presentation_date: dateTime, thesis_id: JSON.parse(localStorage.getItem("logged_user"))[0].thesis_id },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire('Success', 'Presentation date set successfully!', 'success');
                loadPresentationDate(JSON.parse(localStorage.getItem("logged_user"))[0].thesis_id);
            } else {
                Swal.fire('Error', response.error || 'Failed to save presentation date.', 'error');
            }
        },
        error: function () {
            Swal.fire('Error', 'An error occurred while saving the presentation date.', 'error');
        }
    });
}


function loadPresentationDate(thesisId) {
    $.ajax({
        url: './php/get_presentation_date.php', 
        type: 'GET',
        data: { thesis_id: thesisId },
        dataType: 'json',
        success: function (response) {
            if (response.success && response.presentation_date) {
                $('#presentationDateDisplay').html(
                    `<strong>Current Presentation Date:</strong> ${response.presentation_date}`
                );
            } else {
                // Handle cases where no date is found
                $('#presentationDateDisplay').html(
                    `<strong>Presentation date not set</strong>`
                );
            }
        },
        error: function () {
            // Handle any errors in the AJAX request
            $('#presentationDateDisplay').html(
                `<strong>Current Presentation Date:</strong> N/A`
            );
        }
    });
}
