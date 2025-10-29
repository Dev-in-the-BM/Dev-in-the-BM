<style>
/* HIDE THE CHECKBOX AND THE CONTENT BY DEFAULT
*/
.toggle-checkbox {
    display: none;
}
/* HIDE THE TARGET CONTENT BLOCK BY DEFAULT 
  Use max-height: 0 and overflow: hidden for a smooth vertical toggle effect
*/
.toggle-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease-in-out; /* Adds a clean animation */
    padding: 0 10px; /* Optional: adds horizontal padding */
    margin: 0; /* Important: remove default margin */
}

/* WHEN THE HIDDEN CHECKBOX IS :CHECKED, EXPAND THE CONTENT
  The '+' selector targets the adjacent sibling.
  '~' targets any following sibling. Using '~' is safer.
*/
.toggle-checkbox:checked ~ .toggle-content {
    max-height: 300px; /* Set a large enough max-height to display all content */
    margin-top: 10px;
    padding-bottom: 10px;
}

/* STYLE THE CLICKABLE LABEL/IMAGE/TEXT (Optional)
  This makes it look like a button or link
*/
.toggle-label {
    cursor: pointer;
    display: inline-block;
    padding: 8px 12px;
    border: 1px solid #4A86CF; /* Border matching your style */
    border-radius: 5px;
    background-color: #1a1a2e; /* Dark background */
    color: #fff; /* White text */
    user-select: none; /* Prevents selecting text when clicking rapidly */
}
.toggle-label:hover {
    background-color: #4A86CF; /* Vibe Coder blue on hover */
}
</style>

<input type="checkbox" id="toggle-music" class="toggle-checkbox">

<label for="toggle-music" class="toggle-label">
    Click to See Music Details 🎵
</label>

<div class="toggle-content">
    <p>This is the secret content that was hidden! Here you can place a markdown table or any other block.</p>
    <ul>
        <li>**Post 1:** [Link 1](URL)</li>
        <li>**Post 2:** [Link 2](URL)</li>
    </ul>
</div>

<input type="checkbox" id="toggle-tech" class="toggle-checkbox">

<label for="toggle-tech" class="toggle-label" style="background: none; border: none; padding: 0;">
    <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Desktop%20Computer.png" alt="Desktop Computer" width="30" height="30" />
    **Toggle Tech Posts**
</label>

<div class="toggle-content">
    <p>This is the hidden tech post content:</p>
    <ol>
        <li>[Post Title 1](URL)</li>
        <li>[Post Title 2](URL)</li>
    </ol>
</div>