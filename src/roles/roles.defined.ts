export const Roles = {
    Attendee: "Attendee",
    Organizer: "Organizer",
    Admin: "Admin"
}

/***
 * Specified so it can be used in the signupDTO
 * Better than using constants for Roles
 */
export enum UserRole {
    Attendee = "Attendee",
    Organizer = 'Organizer',
    Admin = 'Admin'
}