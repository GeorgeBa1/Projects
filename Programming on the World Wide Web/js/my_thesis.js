$(document).ready(function () {
    const logged_user = JSON.parse(localStorage.getItem("logged_user"));
    const user_id = logged_user[0].user_id;
    console.log(user_id);

    loadThesisDetails(user_id);
    
});


let thesisId;
// Function to load thesis details from the server
function loadThesisDetails(user_id) {
    $.ajax({
        url: `./php/get_thesis_details.php?id=${user_id}`,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.success) {
                const thesis = data.thesis;
                thesisId = thesis.thesis_id;

                if (thesis.status == "completed" || thesis.status == "under_assignment") {
                    // Disable the file input and button if the thesis is completed or under_assignment
                    $('#draftFile').prop('disabled', true); 
                    $('#uploadArea button').addClass("cursor-not-allowed opacity-50").prop('disabled', true);
                    $('#uploadArea').addClass("bg-gray-300 hover:bg-gray-300");
                    $('#linkInput').prop('disabled', true).addClass("cursor-not-allowed bg-gray-200");
                    $('#saveLinkButton').prop('disabled', true).addClass("cursor-not-allowed opacity-50");
                } else {
                    $('#linkInput').prop('disabled', false).removeClass("cursor-not-allowed bg-gray-200");
                    $('#saveLinkButton').prop('disabled', false).removeClass("cursor-not-allowed opacity-50");
                }

                // Populate thesis details
                $('#title').text(thesis.title);
                $('#abstract').text(thesis.abstract);
                $('#pdfAttachment a')
                .attr('href', thesis.pdf_attachment ? thesis.pdf_attachment : '#')
                .toggleClass('pointer-events-none opacity-50 disabled', !thesis.pdf_attachment) // Disable click if no PDF
                .html(`
                     <i class="fa-solid fa-file-pdf fa-2xl mr-2 ml-1 transform transition-transform duration-200 hover:scale-150" style="color:rgb(59, 255, 245);"></i>
                `);
                $('#status').text(thesis.status);
            

                // Populate and handle the editable link
                $('#linkInput').val(thesis.external_link || '');

                // supervisor1
                const supervisorFullName = thesis.supervisor_name && thesis.supervisor_surname ? thesis.supervisor_name + " " + thesis.supervisor_surname : 'Not Assigned';
                $('#supervisorName').text(supervisorFullName).addClass('text-purple-200 font-bold');

                // Co-supervisor1 1
                const coSupervisor1FullName = thesis.supervisor2_name && thesis.supervisor2_surname ? thesis.supervisor2_name + " " + thesis.supervisor2_surname : 'Not Assigned';
                $('#coSupervisor1').text(coSupervisor1FullName).addClass('text-purple-200 font-bold');

                // Co-supervisor1 2
                const coSupervisor2FullName = thesis.supervisor3_name && thesis.supervisor3_surname ? thesis.supervisor3_name + " " + thesis.supervisor3_surname : 'Not Assigned';
                $('#coSupervisor2').text(coSupervisor2FullName).addClass('text-purple-200 font-bold');

                if (thesis.status == 'active') {
                    $('#assignedDate').text(thesis.assigned_at || 'Not Assigned').addClass('text-purple-200 font-bold');
                    $('#timeElapsed').text(getTimeElapsed(thesis.assigned_at)).addClass('text-purple-200 font-bold');
                } else {
                    $('#assignedDate').text('Not Assigned yet!').addClass('text-purple-200 font-bold');
                }
            }
        }
    });
}


function getTimeElapsed(assignedDate) {
    if (!assignedDate) return 'Not Assigned';

    const now = new Date();
    const assigned = new Date(assignedDate);
    const diffTime = Math.abs(now - assigned);

    if (diffTime < 1000 * 60 * 60 * 24) {
        // If time difference is less than a day, show hours
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 1) {{return `1 hour` }} else {
            return `${diffHours} hours`;}
    }

    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30); // Approximate months (30 days per month)
    const remainingDays = diffDays % 30;

    if (diffMonths > 0) {
        return `${diffMonths} months - ${remainingDays} days`;
    }

    return `${diffDays} days`;
}

function triggerFileInput() {
    $('#draftFile').click();
}

function uploadDraft() {
    const fileInput = $('#draftFile')[0];
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('draftFile', file);
    formData.append('thesis_id', thesisId);


    $.ajax({
        url: './php/upload_draft.php',
        type: 'POST',
        data: formData,
        contentType: false,
        processData: false,
        success: function (response) {         
            Swal.fire('Success', 'Draft uploaded successfully!', 'success');
            loadThesisDetails(thesisId);
              
        }
    });
}


function saveLink() {
    const updatedLink = $('#linkInput').val().trim();
    if (!updatedLink) {
        Swal.fire({
            icon: 'warning',
            title: 'Invalid Link',
            text: 'Please enter a valid external link.',
            confirmButtonColor: '#d33'
        });
        return;
    }

    $.ajax({
        url: './php/update_external_link.php',
        type: 'POST',
        data: {
            thesis_id: thesisId,
            link: updatedLink
        },
        success: function (response) {
            if (response.success) {
                Swal.fire({
                    icon: 'success',
                    title: 'Link Updated',
                    text: 'The external link has been updated successfully.',
                    confirmButtonColor: '#28a745'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: response.error || 'Failed to update the link.',
                    confirmButtonColor: '#d33'
                });
            }
        }
    });
}
