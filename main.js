
        const imageUpload = document.getElementById('image-upload');
        const imagePreview = document.getElementById('image-preview');
        const brightnessInput = document.getElementById('brightness');
        const saturationInput = document.getElementById('saturation');
        const blurInput = document.getElementById('blur');
        const saveBtn = document.getElementById('save-btn');
        let originalImage = null;

        // Load image when file is uploaded
        imageUpload.addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.src = e.target.result;
                    imagePreview.style.display = 'block';
                    originalImage = e.target.result;
                    saveBtn.disabled = false;
                    applyFilters();
                };
                reader.readAsDataURL(file);
            }
        });

        // Apply filters when sliders are adjusted
        brightnessInput.addEventListener('input', applyFilters);
        saturationInput.addEventListener('input', applyFilters);
        blurInput.addEventListener('input', applyFilters);

        // Function to apply filters
        function applyFilters() {
            const brightness = brightnessInput.value;
            const saturation = saturationInput.value;
            const blur = blurInput.value;
            imagePreview.style.filter = `
                brightness(${brightness}%)
                saturate(${saturation}%)
                blur(${blur}px)
            `;
        }

        // Save image functionality
        saveBtn.addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = imagePreview.src;

            img.onload = function() {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.filter = imagePreview.style.filter;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Create a download link
                const link = document.createElement('a');
                link.download = 'edited-image.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            };
        });
    