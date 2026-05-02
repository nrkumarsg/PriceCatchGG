# PricePilot AI

PricePilot AI is a cross-platform system for industrial product price comparison.

## System Architecture
- **Frontend**: Flutter (Android & Web)
- **Backend**: Node.js + TypeScript + Puppeteer
- **AI**: Gemini (Normalization) & Google Vision (OCR)
- **Cache**: Redis

## Prerequisites
- Node.js v18+
- Flutter SDK
- Docker & Docker Compose
- API Keys for Google Gemini and Google Vision

## Backend Setup
1. `cd backend`
2. `npm install`
3. Create `.env` from `.env.example` and add your API keys.
4. `npm run dev`

## Frontend Setup
1. `cd frontend`
2. `flutter pub get`
3. `flutter run -d chrome` (for web) or `flutter build apk` (for Android)

## Docker Deployment
1. Set environment variables in your shell or a `.env` file in the root.
2. Run `docker-compose up --build`

## Features
- ✅ AI-powered product normalization
- ✅ Image search (OCR to Text)
- ✅ Concurrent scraping (RS Components, Element14)
- ✅ Redis caching (1 hour)
- ✅ Modern Material 3 UI
