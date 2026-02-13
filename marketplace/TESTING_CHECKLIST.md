# Testing Checklist - Product Details & Authentication

## 🧪 Quick Testing Guide

### Product Details Page

**Test 1: Navigate to Product Details**
- [ ] Go to home page or explore page
- [ ] Click on any product card
- [ ] URL changes to `/product-details/1` (or corresponding product ID)
- [ ] Product image, title, price, and vendor info display correctly

**Test 2: Image Gallery**
- [ ] Click on thumbnail images
- [ ] Main image updates to selected thumbnail
- [ ] Main image hover shows zoom button
- [ ] Image gallery is responsive on mobile

**Test 3: Product Information**
- [ ] Verified badge shows for verified vendors
- [ ] Star rating displays correctly
- [ ] Review count shows
- [ ] Price displays with original price struck through
- [ ] Discount percentage shows

**Test 4: Action Buttons**
- [ ] Quantity +/- buttons work
- [ ] Add to Cart button is clickable
- [ ] Request Approval button is clickable
- [ ] Info box displays (if vendor requires manual approval)

**Test 5: Vendor Card**
- [ ] Vendor name displays
- [ ] Verified badge shows for verified sellers
- [ ] "Visit Store" button works (click prevents default)
- [ ] Vendor rating/information displays

**Test 6: Sticky Bottom Bar**
- [ ] Sticky bar appears at bottom when scrolling
- [ ] Shows product image, name, and price
- [ ] Action buttons are functional
- [ ] Disappears on mobile if needed

**Test 7: Reviews Section**
- [ ] Customer sentiment score displays
- [ ] Star rating bars show distribution
- [ ] Sample review card displays
- [ ] All styling is correct

### Authentication Pages

**Test 8: Login Page**
- [ ] Navigate to `/auth/login`
- [ ] Page displays "Seller Login" heading
- [ ] Email input has mail icon
- [ ] Password input has lock icon
- [ ] "Login to Dashboard" button works
- [ ] Benefits showcase displays on right side

**Test 9: Login Form Validation**
- [ ] Try to submit without email - shows error
- [ ] Try to submit without password - shows error
- [ ] Enter valid email and password
- [ ] Click login - should redirect to `/vendor-dashboard`
- [ ] Check localStorage - seller data saved

**Test 10: Signup Page**
- [ ] Navigate to `/auth/signup`
- [ ] Page displays "Become a Seller" heading
- [ ] All form fields present:
  - [ ] Store Name
  - [ ] Email
  - [ ] Phone
  - [ ] Password
  - [ ] Confirm Password
- [ ] "Create Seller Account" button works

**Test 11: Signup Form Validation**
- [ ] Try to submit empty form - shows error
- [ ] Enter mismatched passwords - shows error
- [ ] Enter password < 6 characters - shows error
- [ ] Fill all correctly - redirects to dashboard
- [ ] Check localStorage - seller data saved with all fields

**Test 12: Navigation Auth Check**
- [ ] Fresh browser (no localStorage)
- [ ] Click "Sell" in navbar
- [ ] Redirects to `/auth/login`
- [ ] After login, click "Sell" again
- [ ] Goes directly to `/vendor-dashboard`

**Test 13: Logout Test**
- [ ] Open browser DevTools (F12)
- [ ] Go to Console tab
- [ ] Run: `localStorage.removeItem('seller')`
- [ ] Refresh page
- [ ] "Sell" button shows login icon
- [ ] Click "Sell" redirects to login

**Test 14: Persistence Test**
- [ ] Login with any email/password
- [ ] Refresh page
- [ ] Still logged in (localStorage persists)
- [ ] Close browser & reopen
- [ ] Still logged in (if localStorage cleared on close, re-login)

### Navigation Component

**Test 15: Sell Button Behavior**
- [ ] When not logged in:
  - [ ] Shows "Sell" text in gray with login icon
  - [ ] Clicking redirects to `/auth/login`
- [ ] When logged in:
  - [ ] Shows "Sell" text in green
  - [ ] No login icon visible
  - [ ] Clicking redirects to `/vendor-dashboard`

**Test 16: Navigation Links**
- [ ] Home link works
- [ ] Explore link works
- [ ] Deals link works (can add later)
- [ ] Logo is clickable
- [ ] All nav links have hover effect

### Responsive Design

**Test 17: Mobile (< 768px)**
- [ ] Product page stacks vertically
- [ ] Image gallery thumbnails below main image
- [ ] Auth pages stack vertically
- [ ] Benefits display as grid (3 columns)
- [ ] Buttons are touch-friendly size
- [ ] Form inputs span full width

**Test 18: Tablet (768px - 1024px)**
- [ ] Two column layout works on product page
- [ ] Navigation search is hidden
- [ ] Auth cards display properly
- [ ] Benefits show as grid

**Test 19: Desktop (> 1024px)**
- [ ] All layouts display correctly
- [ ] Hover effects work
- [ ] Sticky bars position correctly
- [ ] Image gallery full featured

### Browser Compatibility

**Test 20: Cross-Browser**
- [ ] Chrome/Edge - All features work
- [ ] Firefox - All features work
- [ ] Safari - All features work
- [ ] Mobile browsers - Responsive design works

## 🔍 Error Scenarios to Test

**Test 21: Non-existent Product**
- [ ] Navigate to `/product-details/99999`
- [ ] Shows "Product Not Found" message
- [ ] "Back to Explore" button works
- [ ] No console errors

**Test 22: Form Errors**
- [ ] Invalid email format - shows validation error
- [ ] Empty required fields - shows error message
- [ ] Password mismatch on signup - shows error
- [ ] All errors clear when user corrects input

## ✅ Success Criteria

- [ ] All 22 tests pass
- [ ] No console errors
- [ ] localStorage working correctly
- [ ] All redirects working
- [ ] Responsive design working
- [ ] Authentication persists
- [ ] All buttons functional
- [ ] Form validation working
- [ ] No broken images/icons
- [ ] Styling matches design system

## 📝 Notes

- **Test Data**: Use any email/password for login (no backend validation)
- **localStorage Key**: 'seller'
- **Product IDs**: 1-10 (from sample data)
- **Reset State**: Clear localStorage or use Private/Incognito browser
- **Debug**: Open DevTools Console to check localStorage with `JSON.parse(localStorage.getItem('seller'))`

## 🚀 Deploy Ready

Once all tests pass:
1. ✅ Commit changes to git
2. ✅ Deploy to staging
3. ✅ Run end-to-end tests
4. ✅ Ready for backend integration
