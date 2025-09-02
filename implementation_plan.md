# Implementation Plan

[Overview]
The overall goal is to modify the navigation bar to display specific action buttons when a user is logged in, replacing the current "Logout" button.
This change will enhance the user experience by providing direct access to key functionalities (Outreach and Results) from the navigation bar, aligning with the application's core purpose. The "Start Free Trial" button is already hidden when logged in, so no changes are needed for that.

[Types]
No new types or interfaces are strictly required for this change, as existing types for `Link` and `Button` components are sufficient.

[Files]
The `src/components/ui/navbar.tsx` file will be modified to change the conditional rendering of buttons in the "Auth Buttons" section based on the `isAuthenticated` state.

[Functions]
No new functions will be created or modified. The existing `logout` function will no longer be directly accessible from the navbar, as the "Logout" button will be replaced.

[Classes]
No new classes will be created, modified, or removed.

[Dependencies]
The `Plus` icon will be imported from `lucide-react` in `src/components/ui/navbar.tsx`.

[Testing]
The testing approach will involve verifying the correct display and navigation of the new buttons based on the user's authentication status.

- Verify that when a user is logged in, the "Login" and "Sign Up" buttons are not visible.
- Verify that when a user is logged in, a button with a plus icon, an "Outreach" button, and a "Results" button are visible in the "Auth Buttons" section.
- Verify that clicking the button with the plus icon navigates to `/outreach`.
- Verify that clicking the "Outreach" button navigates to `/outreach`.
- Verify that clicking the "Results" button navigates to `/results`.
- Verify that when a user is logged out, the "Login" and "Sign Up" buttons are correctly displayed.

[Implementation Order]
The implementation sequence will focus on modifying the `navbar.tsx` file to update the conditional rendering logic.

1. Modify `src/components/ui/navbar.tsx` to import the `Plus` icon from `lucide-react`.
2. In `src/components/ui/navbar.tsx`, locate the "Auth Buttons" section.
3. Update the conditional rendering block for `isAuthenticated` to replace the `Logout` button with the new set of buttons:
   - A `Link` component wrapping a `Button` with a `Plus` icon, navigating to `/outreach`.
   - A `Link` component wrapping a `Button` labeled "Outreach", navigating to `/outreach`.
   - A `Link` component wrapping a `Button` labeled "Results", navigating to `/results`.
