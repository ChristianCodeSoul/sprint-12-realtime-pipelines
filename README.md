
# Sprint 12 : Real-Time Pipelines & UI Isolation

https://sprint-12-realtime-pipelines.vercel.app

This project is an extension of my Sprint 11 Advanced E-Commerce application.

For Sprint 12, I kept the core e-commerce functionality from Sprint 11 and focused on adding **real-time communication, isolated UI development, visual testing, and Redis-based WebSocket scaling**.

## What I Kept from Sprint 11

* Product browsing and product details
* Shopping cart and checkout flow
* Authentication and Redux state management
* MongoDB backend
* REST API architecture
* Responsive Next.js frontend
* Production deployment

I also added an **AI shopping assistant chatbot** to help users discover, compare, and choose products.

## Sprint 12 : Completed Phases

### Frontend : Component Driven Architecture

* Set up **Storybook** for isolated component development.
* Created and tested Button variations:

  * Primary
  * Secondary
  * Disabled
  * Loading
* Added **visual regression testing** to detect unintended UI/CSS changes.

### Fullstack : Real-Time Architecture

* Integrated **Socket.io** with the Express backend.
* Established persistent client-server WebSocket communication.
* Added room-based event handling for administrative clients.
* Implemented real-time **New Order** event broadcasting.
* Added the **Socket.io Redis Adapter** for Redis Pub/Sub.
* Configured the system for horizontal WebSocket event propagation across server instances.

## Tech Stack

**Frontend:** Next.js, React, Redux Toolkit, RTK Query, Storybook

**Backend:** Node.js, Express, MongoDB, Socket.io

**Real-Time Scaling:** Redis Pub/Sub, Socket.io Redis Adapter

**Testing:** Jest, Cypress, Storybook Visual Testing

**Deployment:** Vercel + Render

## Project Goal

The goal of this sprint was to move the application beyond a traditional request-response architecture and implement patterns used in modern production systems, particularly **component isolation, real-time event-driven communication, and scalable WebSocket infrastructure**.

This sprint completes the Advanced Integration phase before the Enterprise Capstone.
