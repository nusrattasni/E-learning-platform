<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secure Player</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background-color: #000;
            overflow: hidden;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        /* Overlay to prevent right clicks directly on the iframe in some browsers */
        #protection-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10;
            opacity: 0; /* Fully transparent */
            pointer-events: none; /* Let clicks pass through, but some JS events catch it */
        }
    </style>
</head>
<body oncontextmenu="return false;" onkeydown="return disableKeys(event);">
    <iframe 
        src="{{ $videoUrl }}" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
    </iframe>
    
    <script>
        // Disable right click
        document.addEventListener('contextmenu', event => event.preventDefault());

        // Disable DevTools shortcuts
        function disableKeys(e) {
            // F12
            if(e.keyCode == 123) {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+I
            if(e.ctrlKey && e.shiftKey && e.keyCode == 73) {
                e.preventDefault();
                return false;
            }
            // Ctrl+Shift+J
            if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
                e.preventDefault();
                return false;
            }
            // Ctrl+U (View Source)
            if(e.ctrlKey && e.keyCode == 85) {
                e.preventDefault();
                return false;
            }
        }
    </script>
</body>
</html>
