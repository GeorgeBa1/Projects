$(document).ready(function () {
    const logged_user = JSON.parse(localStorage.getItem("logged_user"));
    const student_AM = logged_user[0].AM;
    const thesis_id = logged_user[0].thesis_id;
    
    loadInstructors(thesis_id);
    loadInvitationsStatus(student_AM, thesis_id);
});

// Load instructors into the dropdowns
function loadInstructors(thesis_id) {
    console.log("Loading instructors for Thesis ID:", thesis_id);
    
    $.ajax({
        url: './php/get_profs.php',
        type: 'POST',
        dataType: 'json',
        data: { thesis_id: thesis_id },
        success: function (response) {
            console.log("Response from server:", response);
            
            if (response.success) {
                // Populate dropdowns with the profs list while checking for existing invitations
                populateDropdown('#coSupervisor1Dropdown', response.profs, response.theses, thesis_id);
                populateDropdown('#coSupervisor2Dropdown', response.profs, response.theses, thesis_id);
            } else {
                console.error('Failed to load profs:', response.error);
            }
        }
    });
}

function populateDropdown(selector, profs, theses, thesis_id) {
    const dropdown = $(selector);
    dropdown.empty();
    if (!thesis_id) {
        dropdown.prop('disabled', true);
        dropdown.append('<option value="">No thesis selected</option>');
        return;
    } else {
        dropdown.prop('disabled', false); 
    }

    dropdown.append('<option value="">Select</option>');

    const currentThesis = theses.find(thesis => thesis.thesis_id === String(thesis_id)); // Find the thesis entry for the current thesis_id
    profs.forEach(prof => {
        const isInvited = currentThesis && ( 
            currentThesis.supervisor2_id === prof.user_id ||
            currentThesis.supervisor3_id === prof.user_id
        );
        const optionDisabled = isInvited ? 'disabled' : '';
        const labelSuffix = isInvited ? ' - Invitation already sent' : '';

        dropdown.append(
            `<option value="${prof.user_id}" ${optionDisabled}>
            ${prof.name} ${prof.surname} - ${prof.department}${labelSuffix}
            </option>`
        );
    });
}


// Send invitation based on the role
function sendInvitation(role) {
    let prof_id;
    if (role === 'supervisor1') {
        prof_id = $('#supervisorDropdown').val();
    } else if (role === 'co-supervisor1') {
        prof_id = $('#coSupervisor1Dropdown').val();
    } else if (role === 'co-supervisor2') {
        prof_id = $('#coSupervisor2Dropdown').val();
    }

    const student_AM = JSON.parse(localStorage.getItem("logged_user"))[0].AM;
    const thesis_id = JSON.parse(localStorage.getItem("logged_user"))[0].thesis_id;

    if (!prof_id) {
        Swal.fire('Error', 'Please select an instructor to invite.', 'error');
        return;
    }

    $.ajax({
        url: './php/send_invitation.php',
        type: 'POST',
        data: {
            prof_id: prof_id,
            role: role,
            student_AM: student_AM,
            thesis_id: thesis_id
        },
        dataType: 'json',
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    title: 'Success',
                    text: 'Invitation sent successfully!',
                    icon: 'success',
                    background: 'rgba(75, 0, 130, 0.95)', 
                    color: '#fff'
                  });
                  
                loadInvitationsStatus(student_AM, thesis_id);
                loadInstructors(thesis_id);
            } else {
                Swal.fire('Error', response.error || 'Failed to send invitation.', 'error');
            }
        },
        error: function (xhr, status, error) {
            console.error('Error sending invitation:', error);
        }
    });
}

// Load the status of invitations
function loadInvitationsStatus(student_AM, thesis_id) {
    $.ajax({
        url: './php/get_invitations.php',
        type: 'GET',
        data: { student_AM: student_AM, thesis_id: thesis_id },
        dataType: 'json',
        success: function (data) {
            const invitationStatus = $('#invitationStatus');
            invitationStatus.empty();

            if (data.invitations) {
                const { supervisor1, supervisor2, supervisor3, lastUpdate } = data.invitations;

                // supervisor1 status
                if (supervisor1) {
                    const supervisorStatus = supervisor1.accepted === "1" ? 'Accepted' : 'Pending';
                    if (supervisorStatus === 'Accepted') {
                        $('#sendSupervisorInvitation').prop('disabled', true).addClass('opacity-50 cursor-not-allowed');
                        $('#supervisorDropdown').prop('disabled', true).addClass('opacity-40');
                    }
                    invitationStatus.append(`
                        <li class="p-4 bg-gray-800 rounded shadow-md flex flex-col justify-between items-center space-y-2">
                            <div class="w-full flex justify-between items-center">
                                <span>
                                    <strong>supervisor1:</strong> ${supervisor1.name} ${supervisor1.surname} - 
                                    <span class="${supervisorStatus === 'Accepted' ? 'text-green-600' : 'text-purple-200'}">${supervisorStatus}</span>
                                </span>
                                ${supervisorStatus === 'Pending' ? `
                                    <button onclick="cancelInvitation(${supervisor1.supervisorId}, 'supervisor1')" class="text-[##0bf59b] hover:text-green-300 ml-4 transition-transform transform hover:scale-110">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                                ` : ''}
                            </div>
                        </li>
                    `);
                }

                // Co-supervisor1 1 status
                if (supervisor2 && supervisor2.name) {
                    const coSupervisor1Status = supervisor2.accepted === "1" ? 'Accepted' : 'Pending';
                    if (coSupervisor1Status === 'Accepted') {
                        $('#sendCoSupervisor1Invitation').prop('disabled', true).addClass('opacity-50 cursor-not-allowed');
                        $('#coSupervisor1Dropdown').prop('disabled', true).addClass('opacity-40');
                    }
                    invitationStatus.append(`
                        <li class="p-4 bg-gray-800 rounded shadow-md flex justify-between items-center">
                            <span>
                                <strong>Co-supervisor1 1:</strong> ${supervisor2.name} ${supervisor2.surname} - 
                                <span class="${coSupervisor1Status === 'Accepted' ? 'text-green-600' : 'text-purple-200'}">${coSupervisor1Status}</span>
                            </span>
                            ${coSupervisor1Status === 'Pending' ? `
                                <button onclick="cancelInvitation(${supervisor2.coSupervisor1Id}, 'co-supervisor1')"  class="text-[##0bf59b] hover:text-green-300 ml-4 transition-transform transform hover:scale-110">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                            ` : ''}
                        </li>
                    `);
                } else {
                    invitationStatus.append(`
                        <li class="p-4 bg-gray-800 rounded shadow-md">
                            <strong>Co-supervisor1 1:</strong> <span class="text-gray-500">Not Assigned</span>
                        </li>
                    `);
                }

                // Co-supervisor1 2 status
                if (supervisor3 && supervisor3.name) {
                    const coSupervisor2Status = supervisor3.accepted === "1" ? 'Accepted' : 'Pending';
                    if (coSupervisor2Status === 'Accepted') {
                        $('#sendCoSupervisor2Invitation').prop('disabled', true).addClass('opacity-50 cursor-not-allowed');
                        $('#coSupervisor2Dropdown').prop('disabled', true).addClass('opacity-40');
                    }
                    invitationStatus.append(`
                        <li class="p-4 bg-gray-800 rounded shadow-md flex justify-between items-center">
                            <span>
                                <strong>Co-supervisor1 2:</strong> ${supervisor3.name} ${supervisor3.surname} - 
                                <span class="${coSupervisor2Status === 'Accepted' ? 'text-green-600' : 'text-purple-200'}">${coSupervisor2Status}</span>
                            </span>
                            ${coSupervisor2Status === 'Pending' ? `
                                <button onclick="cancelInvitation(${supervisor3.coSupervisor2Id}, 'co-supervisor2')"  class="text-[##0bf59b] hover:text-green-300 ml-4 transition-transform transform hover:scale-110">
                                        <i class="fa-solid fa-circle-xmark"></i>
                                    </button>
                            ` : ''}
                        </li>
                    `);
                } else {
                    invitationStatus.append(`
                        <li class="p-4 bg-gray-800 rounded shadow-md">
                            <strong>Co-supervisor1 2:</strong> <span class="text-gray-500">Not Assigned</span>
                        </li>
                    `);
                }
                invitationStatus.append(`<div class="text-gray-500 text-sm font-semibold">
                <span><strong>Last Updated:</strong> ${supervisor1.lastUpdate || 'N/A'}</span>
                 </div>`);
                
            }
        }
    });
}
  

// Function to cancel an invitation
function cancelInvitation(prof_id, role) {
    const student_AM = JSON.parse(localStorage.getItem("logged_user"))[0].AM;
    const thesis_id = JSON.parse(localStorage.getItem("logged_user"))[0].thesis_id;

    Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to cancel this invitation?",
        icon: 'warning',
        background: 'rgba(75, 0, 130, 0.95)',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, cancel it'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: './php/cancel_invitation.php',
                type: 'POST',
                data: { prof_id, student_AM, thesis_id, role },
                success: function (response) {
                    Swal.fire({
                        title: 'Cancel',
                        text: 'Invitation has been cancelled!',
                        icon: 'success',
                        background: 'rgba(75, 0, 130, 0.95)', 
                        color: '#fff'
                      });
                      
                    loadInvitationsStatus(student_AM, thesis_id);
                },
                error: function (xhr, status, error) {
                    console.error('Error cancelling invitation:', error);
                }
            });
        }
    });
}
