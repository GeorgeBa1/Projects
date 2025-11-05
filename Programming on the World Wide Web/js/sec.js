$(document).ready(function () {
    if (JSON.parse(localStorage.getItem("logged_user"))[0].role != 'sec') { 
        window.location.replace('404.html');
    }
    loadStats();
    loadThesesDetails();
});

function loadStats() {
    $.ajax({
        url: './php/secretary_stats.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                // Call functions to populate the data
                updateStudentsCount(response.students);
                updateprofsList(response.profs);
                updateThesesCount(response.theses);
                updateAnnouncementsList(response.announcements);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error || 'Failed to fetch data',
                    confirmButtonColor: '#9333ea',
                    background: 'rgba(31, 41, 55, 0.8)',
                    color: '#fff',
                    customClass: {
                        popup: 'backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600'
                    }
                });                
            }
        },
        error: function () {
            Swal.fire({
                icon: 'error',
                title: 'AJAX Error',
                text: 'An error occurred while fetching the report',
                confirmButtonColor: '#9333ea',
                background: 'rgba(31, 41, 55, 0.8)',
                color: '#fff',
                customClass: {
                    popup: 'backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600'
                }
            });            
        }
    });
}

function updateStudentsCount(students) {
    $('#totalStudents').text(students).addClass('text-purple-400');
}

// Function to update the list of active profs
function updateprofsList(profs) {
    let profsHTML = '';
    profs.forEach(prof => {
        profsHTML += `
            <div class="prof-item bg-gray-800 p-2 mb-2 rounded shadow-sm inline-block transform transition-all duration-200 hover:-translate-y-1 hover:shadow-md self-start tooltip">
                <i class="fa-solid fa-chalkboard-user fa-flip" style="color:rgb(59, 248, 255);"></i> ${prof.prof_name}
                 <span class="tooltip-text">${prof.department} - ${prof.specialization}</span>
            </div>`;
    });
    $('#activeprofs').html(profsHTML);
}

function updateThesesCount(theses) {
    let totalTheses = 0;
    let statusHTML = '';

    theses.forEach(thesis => {
        const status = thesis.status || 'Other';
        const count = thesis.total;
        totalTheses += parseInt(count);
        statusHTML += `
            <p class="status-item">
                <strong>${status}:</strong> ${count}
            </p>`;
    });

    $('#activeTheses').html(`
        <span class="inline-block text-3xl font-bold text-purple-400 mr-4">${totalTheses}</span>
        <span class="inline-block">${statusHTML}</span>
    `);
}

function updateAnnouncementsList(announcements) {
    let announcementsHTML = '';
    announcements.forEach(announcement => {
        announcementsHTML += `
            <div class="announcement-item bg-blue-50 p-3 mb-2 rounded shadow-sm tooltip">
               <i class="fa-solid fa-scroll fa-flip-horizontal" style="color:rgb(59, 209, 255);"></i></i> ${announcement.announcement_text}
                 <span class="tooltip-text"> Thesis ID: ${announcement.thesis_id} - Title: ${announcement.title}</span>
            </div>`;
    });

    $('#announcementsList').html(announcementsHTML || '<p class="text-gray-500">No announcements available</p>');
}

let thesesData = []; 
function loadThesesDetails() {
    $.ajax({
        url: './php/secretary_theses.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                thesesData = response.theses;
                displayThesesDetails(thesesData);
            } else {
                $('#thesesDetailsCard').html('<p class="text-gray-600">No active or under_review theses found.</p>');
            }
        }
    });
}

function displayThesesDetails(theses) {
    const thesesContainer = $('#thesesDetailsCard');
    thesesContainer.empty();

    if (theses.length === 0) {
        thesesContainer.html('<p class="text-gray-600">No active or under_review theses found.</p>');
        return;
    }

    theses.forEach(thesis => {
        const thesisItem = `
            <div class="thesis-detail-item bg-gray-800 hover:bg-gray-900 p-4 rounded shadow mb-2 cursor-pointer"
                onclick="showThesisDetails(${thesis.thesis_id})">
                <h3 class="font-bold text-lg text-purple-700">${thesis.title}</h3>
                <p class="text-gray-600">Status: <span class="text-purple-600">${thesis.status}</span></p>
            </div>
        `;
        thesesContainer.append(thesisItem);
    });
}

function showThesisDetails(thesisId) {
    const thesis = thesesData.find(t => t.thesis_id == thesisId);
    const finalGrade = (thesis.co_sup1_detailed_grade && thesis.co_sup2_detailed_grade) ? thesis.final_grade : 'Not fully graded yet';
    $('#modalTitle').text(thesis.title);
    $('#modalContent').html(`
        <p><strong>Abstract:</strong> ${thesis.abstract}</p>
        <p><strong>Status:</strong> ${thesis.status}</p>
        <h3 class="text-purple-500 font-semibold mt-6"> Three Member Comitee </h3>
        <ul class="ml-6">
            <li> supervisor: ${thesis.supervisor_name || 'Not Assigned'}</li>
            <li> Co-supervisor: ${thesis.supervisor2_name || 'Not Assigned'}</li>
            <li> Co-supervisor: ${thesis.supervisor3_name || 'Not Assigned'}</li>
        </ul>
        <p class="mt-4"><strong>Final Grade:</strong> ${finalGrade || 'N/A'}</p>
        <p><strong>Library Link:</strong> ${thesis.library_link ? `<a href="${thesis.library_link}" target="_blank" class="text-purple-400"><i class="fa-sharp-duotone fa-solid fa-book transform transition-transform duration-300 hover:scale-150"></i></a>` : 'N/A'}</p>
        <p><strong>Assigned: ${calculateTimeSinceAssignment(thesis.assigned_at) || 'N/A'}</p>
        `);

    $('#thesisDetailsModal').removeClass('hidden');
}

function closeModal() {
    $('#thesisDetailsModal').addClass('hidden');
}


function calculateTimeSinceAssignment(assignedDate) {
    const now = new Date();
    const assigned = new Date(assignedDate);
    const diffTime = Math.abs(now - assigned);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} days ago`;
}

function importJSON() {
    Swal.fire({
        title: 'Upload JSON File',
        input: 'file',
        inputAttributes: {
            accept: '.json',
            'aria-label': 'Upload your JSON file'
        },
        background: 'rgba(31, 41, 55, 0.8)',
        color: '#fff',
        customClass: {
            popup: 'backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600'
        },
        showCancelButton: true,
        confirmButtonText: 'Upload',
        preConfirm: (file) => {
            return new Promise((resolve) => {
                const formData = new FormData();
                formData.append('file', file); // ✅ correct name: 'file'

                $.ajax({
                    url: './php/import_JSON.php',
                    type: 'POST',
                    data: formData,
                    processData: false,
                    contentType: false,
                    success: function (response) {
                        let res = typeof response === "string" ? JSON.parse(response) : response;
                        if (res.success) {
                            Swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Users imported successfully!',
                                confirmButtonColor: '#9333ea',
                                background: 'rgba(31, 41, 55, 0.8)',
                                color: '#fff',
                                customClass: {
                                    popup: 'backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600'
                                }
                            });
                            loadStats();
                            loadThesesDetails();
                        } else {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: res.error || 'Failed to import users',
                                confirmButtonColor: '#9333ea',
                                background: 'rgba(31, 41, 55, 0.8)',
                                color: '#fff',
                                customClass: {
                                    popup: 'backdrop-blur-lg rounded-xl shadow-2xl border border-gray-600'
                                }
                            });
                        }
                        resolve(); // resolve after success
                    },
                    error: () => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Upload Failed',
                            text: 'There was an error uploading the file.',
                            confirmButtonColor: '#9333ea',
                            background: 'rgba(31, 41, 55, 0.8)',
                            color: '#fff'
                        });
                        resolve();
                    }
                });
            });
        }
    });
}
