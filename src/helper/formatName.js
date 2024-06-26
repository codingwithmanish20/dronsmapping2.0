export function formatName(name) {
    // Split the name into words
    let words = name.trim().split(/\s+/);

    // Initialize variable to store initials
    let initials = "";

    // Iterate over each word
    words.forEach(word => {
        // Get the first letter of each word and convert to uppercase
        initials += word.charAt(0).toUpperCase();
    });

    return initials;
}


