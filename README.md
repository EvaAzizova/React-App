# React-App
Example of my work for an internship.
Create a working and deployed Web application with registration and authentication.
Non-authenticated users should not have access to the user management (admin panel).
Only authenticated users should have access the user management table: id, name, e-mail, last login time, registration time, status (active/blocked).
The leftmost column of the table should contains checkboxes without labels for multiple selection (table header contains only checkbox without label that selects or deselects all records).
There must be a toolbar over the table with the following actions: Block (red button with text), Unblock (icon), Delete (icon).
Use a CSS framework (Bootstrap is recommended, but you can choose any CSS framework).
Every users should be able to block or delete yourself or any other user.
If user account is blocked or deleted any next user’s request should redirect to the login page.
User can use any non-empty password (even one character).
Blocked user should not be able to login, deleted user can re-register.
