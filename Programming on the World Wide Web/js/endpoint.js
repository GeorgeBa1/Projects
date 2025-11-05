$(document).ready(function () {
    $('#loadFeedBtn').on('click', function () {
        const from = $('#fromDate').val();
        const to = $('#toDate').val();
        const format = $('#formatSelect').val();

        let url = `./php/endpoint.php?format=${format}`;
        if (from) url += `&from=${from}`;
        if (to) url += `&to=${to}`;

        $.ajax({
            url: url,
            method: 'GET',
            dataType: format === 'json' ? 'json' : 'text',
            success: function (data) {
                const $feed = $('#feedContainer');

                if (format === 'json') {
                    if (data.success && data.count > 0) {
                        let html = '<ul class="space-y-2">';
                        data.data.forEach(item => {
                            html += `
                                <li class="border border-purple-700 rounded p-3 bg-gray-800 text-purple-100">
                                    <p><strong>Thesis ID:</strong> ${item.thesis_id}</p>
                                    <p><strong>Presentation Date:</strong> ${item.presentation_date || 'N/A'}</p>
                                    <p><strong>Announcement:</strong> ${item.announcement_text || 'N/A'}</p>
                                </li>
                            `;
                        });
                        html += '</ul>';
                        $feed.html(html);
                    } else {
                        $feed.empty();
                        Swal.fire({
                            icon: 'info',
                            title: 'No Announcements Found',
                            text: 'No data available for the selected range.',
                            background: '#1f1b2e',
                            color: '#f3e8ff',
                            iconColor: '#a855f7',
                            confirmButtonColor: '#7e22ce',
                            confirmButtonText: 'OK',
                            customClass: {
                                popup: 'rounded-xl shadow-lg',
                                confirmButton: 'text-white font-semibold px-4 py-2'
                            }
                        });
                        
                    }
                } else {
                    if (!data.includes('<presentation>')) {
                        $feed.empty();
                        Swal.fire({
                            icon: 'info',
                            title: 'No Announcements Found',
                            text: 'No data available for the selected range.',
                            confirmButtonColor: '#f39c12'
                        });
                    } else {
                        $feed.html(`<pre class="whitespace-pre-wrap text-purple-100">${data}</pre>`);
                    }
                }
            },
            error: function () {
                $('#feedContainer').text('Error loading feed.');
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Something went wrong while loading the feed.',
                    confirmButtonColor: '#d33'
                });
            }
        });
    });
});
