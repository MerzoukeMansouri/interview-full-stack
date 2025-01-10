
# Simple TODOs List - Full Stack Interview Challenge

This repository contains a simple TODO list application built with:
- **Spring Boot** for the backend
- **Vue.js** for the frontend

## Objective

The goal is to demonstrate your ability to:
1. Fix and test the backend API (Spring Boot).
2. Create functionality in the frontend (Vue.js) to add a TODO item.

If the backend is not ready, you can use a mock server with WireMock.

---

## Instructions

### Step 1: Fix Backend and Run Tests
1. Navigate to the `backend` directory.
2. Fix the test cases and ensure the backend is running successfully.

### Step 2: Develop Frontend
1. Navigate to the `frontend` directory.
2. Add functionality to allow users to add TODO items via the frontend.
3. Start the frontend server:
   ```bash
   npm install
   npm run serve
   ```

### Step 3: Use WireMock Server (If Backend is Not Available)
If the backend is not ready, use WireMock to mock the backend API:
1. Run the following command to start the WireMock server:
   ```bash
   docker run -d \
     --name wiremock \
     -p 8080:8080 \
     -v $(pwd)/wiremock:/home/wiremock \
     wiremock/wiremock:latest
   ```

2. Configure the frontend to point to the mock server (e.g., `http://localhost:8080`).

3. Access the mock API responses at:
   - `http://localhost:8080/__admin/` (WireMock Admin Console)

## Deliverables
- Working backend with passing test cases.
- Functional frontend with TODO addition feature.
- Documentation of any assumptions or decisions made during implementation.
