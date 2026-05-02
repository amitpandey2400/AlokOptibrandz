# Optibrandz Marketing Agency Website

A modern, single-page marketing site for Optibrandz that highlights services, packages, client logos, reviews, and contact options. The experience is designed to feel energetic and conversion-focused with scroll-driven visuals, micro-interactions, and a built-in FAQ chatbot.

## Overview

This project is a static website built with HTML, CSS, and vanilla JavaScript. It includes sections for services (Web, SEM, SMO), pricing packages, a project estimator, social proof, and a contact form that stores enquiries locally for quick demos.

## Features

- Sticky header with scroll progress indicator
- Hero, services, packages, reviews, and clientele sections
- Animated counters and scroll reveal transitions
- Interactive estimator for campaign scope
- Contact form with localStorage persistence
- WhatsApp call-to-action and floating launcher
- Built-in FAQ chatbot with quick topics
- Fully responsive layout

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6)

## Getting Started

No build step is required.

1. Open the site by launching the HTML file in a browser.
2. (Optional) Use a local static server if you want live reload while editing.

## Project Structure

- files-mentioned-by-the-user-optibrandz/
	- index.html
	- styles.css
	- script.js
	- assets/
		- client-logos/
		- optibrandz-marketing-rate-list.pdf

## Customization Guide

- Update copy and sections in index.html to change messaging and services.
- Adjust brand colors in styles.css under the :root CSS variables.
- Edit the estimator options inside the form in index.html.
- Update contact details and WhatsApp links in the contact section.
- Modify FAQ responses in the embedded chatbot script in index.html.
- Add or replace logos in assets/client-logos/ and update the markup.

## Form Handling

The contact form stores submissions in the browser under the key optibrandz-enquiries. For production, replace this with a real backend endpoint or a form service.

## Deployment

Deploy to any static host (GitHub Pages, Netlify, Vercel, or similar). Ensure the assets folder is included in the deployment output.

## Notes

Brand names and logos belong to their respective owners.

## License

No license is specified. Add a license file if you plan to reuse or distribute this project.
