let user_id;
let thesis_id;
$(document).ready(function () {
    const logged_user = JSON.parse(localStorage.getItem("logged_user"));
    user_id = logged_user[0].user_id; 
    if (logged_user[0].role != 'prof') { 
        window.location.replace('404.html');
    }
    
    loadInvitations(user_id);
});

function loadInvitations(user_id) {
    $.ajax({
        url: './php/prof_invitations.php',
        type: 'POST',
        data: { user_id: user_id },
        dataType: 'json',
        success: function (response) {
            const invitationsList = $('#invitationsList');
            invitationsList.empty();

            if (response.success) {
                if (response.data.length === 0) {
                    invitationsList.html(`
                        <div class="max-w-md mx-auto text-center p-4 bg-purple-800 bg-opacity-20 border border-purple-300 rounded-lg shadow-md">
                            <p class="text-purple-200 text-base font-semibold">No pending invitations.</p>
                        </div>
                    `);                    
                    return;
                }

                populateInvitations(response.data);
                thesis_id = response.data[0].thesis_id;
            } else {
                invitationsList.html(`
                    <div class="text-center p-6 bg-purple-800 bg-opacity-20 border border-purple-300 rounded-lg shadow">
                        <p class="text-purple-200 text-lg font-semibold">No invitations found.</p>
                    </div>
                `);
            }
        }
    });
}

function populateInvitations(invitations) {
    const invitationsList = $('#invitationsList');
    invitationsList.empty();

    invitations.forEach(invitation => {
        const actionButtons = `
            <button class="bg-green-600 hover:bg-green-700 text-white py-1.5 px-4 rounded-lg font-medium text-sm transition">
                Accept
            </button>
            <button class="bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-lg font-medium text-sm transition">
                Reject
            </button>
        `;

        const listItem = `
            <div class="max-w-xl mx-auto bg-white bg-opacity-10 backdrop-blur-md border border-purple-400 text-white shadow-lg rounded-2xl p-5 my-4 hover:shadow-xl transition-transform transform hover:-translate-y-1">
                <div class="flex justify-between items-start space-x-6">
                    <div class="flex-1 space-y-1">
                        <h3 class="font-bold text-purple-300 text-lg">🎓 ${invitation.title}</h3>
                        <p class="text-sm text-gray-300"><strong>Student AM:</strong> ${invitation.student_AM}</p>
                        <p class="text-sm text-gray-300"><strong>Name:</strong> ${invitation.info}</p>
                    </div>
                    <div class="flex-shrink-0 flex flex-col gap-2 items-end">
                        <button onclick="handleInvitation(${invitation.id}, 'accept')" class="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded-md text-sm font-semibold">
                            ✅ Accept
                        </button>
                        <button onclick="handleInvitation(${invitation.id}, 'reject')" class="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm font-semibold">
                            ❌ Reject
                        </button>
                    </div>
                </div>
                <div class="mt-4 bg-gray-900 bg-opacity-30 rounded-lg p-3 text-sm">
                    <p class="text-purple-200 mb-1 font-semibold">Abstract:</p>
                    <p class="text-gray-300 text-justify">${invitation.abstract}</p>
                </div>
            </div>
        `;

        invitationsList.append(listItem);
    });
}


function handleInvitation(id, action) {
    if (action == 'accept'){
        $.ajax({
            url: './php/accept_invitation.php',
            type: 'POST',
            data: { id: id, 
                    action: action,
                    user_id: user_id },
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Accepted!',
                        text: 'Invitation accepted!',
                        background: 'rgba(75, 0, 130, 0.9)',
                        color: '#ffffff',
                        confirmButtonColor: '#4CAF50',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        loadInvitations(user_id);
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Could not accept the invitation!',
                        background: 'rgba(75, 0, 130, 0.9)',
                        color: '#ffffff',
                        confirmButtonColor: '#e74c3c',
                        confirmButtonText: 'OK'
                    });
                }                
            }
        });

        $.ajax({
            url: './php/update_cosupervisor.php',
            type: 'POST',
            data: {id: id, thesis_id: thesis_id, user_id},
            dataType: 'json',
            success: function (response) {
            }
        });


    }
    else if (action == 'reject'){
        $.ajax({
            url: './php/reject_invitation.php',
            type: 'POST',
            data: { id: id, user_id: user_id},
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Rejected!',
                        text: 'Invitation rejected!',
                        background: 'rgba(75, 0, 130, 0.9)',
                        color: '#ffffff',
                        confirmButtonColor: '#4CAF50',
                        confirmButtonText: 'OK'
                    }).then(() => {
                        loadInvitations(user_id);
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error!',
                        text: 'Could not reject the invitation!',
                        background: 'rgba(75, 0, 130, 0.9)',
                        color: '#ffffff',
                        confirmButtonColor: '#e74c3c',
                        confirmButtonText: 'OK'
                    });
                }
                
            }
        });
    }
    
}
