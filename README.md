# Modal UI Demo

A simple UI demonstration for a modal dialog with form inputs, a data table, and company styling.

## Overview

This project creates a standalone modal UI with the following features:

- Background image with scrim overlay
- Modal dialog with heading
- Form inputs (text field, selects, radio buttons)
- Data table showing entries
- Interactive submit button
- Company styling with ShadCN-inspired components

## Project Structure

- `index.html` - Main HTML structure with the modal layout
- `styles.css` - Custom styling with company color scheme (#500F0B primary color)
- `script.js` - JavaScript for form handling and modal interactivity
- `images/` - Directory containing background image
  - Place your background image as `background.png` in this directory

## Features

- **Form Submission**: Add new entries to the table
- **Data Validation**: Basic validation for required fields
- **Success Messaging**: Feedback when entries are added successfully
- **Draggable Modal**: Click and drag the modal header to reposition

## Usage

1. Place your background image as `background.png` in the `images/` directory
2. Open `index.html` in a web browser to view the modal
3. No server setup required

Note: The background image just represents the site with no interaction. All interaction occurs within the modal itself.

## Styling Notes

The styling follows company guidelines with:
- Primary color: `#500F0B`
- Accent color: `#FBF9F5`
- Navigation icons:
  - Active state: Icon with #FBF9F5 border
  - Inactive state: Icon with #500F0B at 50% opacity
  - Hover state: 80% opacity for inactive icons
