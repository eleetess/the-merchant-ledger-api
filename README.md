# the-merchant-ledger-api
api for merchant ledger
# The Merchant Ledger – Capstone Project Plan

## Project Description and Purpose
**The Merchant Ledger** is an Elder Scrolls Online–themed app that helps players keep track of items they want to buy from traders. It functions as a digital shopping ledger where users can record desired items, set target prices, mark items as found or bought, and manage their shopping lists efficiently.  

**Problem Solved:**  
Players often browse multiple guild traders in ESO and lose track of what they need to buy or how much they intended to spend. This app provides an organized, visually themed solution for managing in-game trading goals.

**Target User:**  
Elder Scrolls Online players who actively trade or shop at in-game guild traders.

**Unique Aspects:**  
- Fantasy-themed UI inspired by the game’s merchant system.  
- Uses cloud-based backend (AWS Lambda + DynamoDB) for persistent storage.  
 

---

## Planned Backend
**Stack Chosen:**  
 AWS Lambda + API Gateway + DynamoDB  
AWS Cognito for authentication  
AWS SDK, dotenv, Jest for testing  

**Main Table (DynamoDB):**  
`ShoppingList`  
| Field | Type | Description |
|-------|------|-------------|
| id | string (Partition Key) | Unique ID for each shopping list item |
| name | string | Item name |
| desiredPrice | number | Target price player wants to pay |
| status | string | One of: `needed`, `found`, `bought`,`sold` |


## API Routes and Methods
| Method | Route | Description |
|--------|--------|-------------|
| **GET** | `/items` | Retrieve all shopping list items for the logged-in user |
| **POST** | `/items` | Add a new item (requires name, desiredPrice) |
| **PUT** | `/items/:id` | Update an item’s status or details |
| **DELETE** | `/items/:id` | Delete an item |
| **GET** | `/items/filter?status=sold` | Filter by status |
 
## Authentication Flow
- **User signs up or logs in** via Amazon Cognito.  
- Cognito issues a **JWT token** that the frontend stores securely (localStorage).  
- All protected routes (`/items`) require valid JWT tokens.  
- Only authenticated users can add, edit, or delete their items.  
- Public routes: Login and Register pages.

---

## Deployment Plan(for app in whole)
| Component | Platform | Notes |
|------------|-----------|-------|
| **Frontend** | Vercel |react |
| **Backend** | AWS Lambda + API Gateway | Serverless functions for CRUD operations |
| **Database** | AWS DynamoDB | Table: ShoppingList |
| **Auth** | AWS Cognito | Handles user pool and tokens |<img width="644" height="1147" alt="image" src="https://github.com/user-attachments/assets/63c2ef05-3303-41e5-8448-19b5209f9443" />
