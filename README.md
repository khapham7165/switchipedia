# Switchipedia

Switchipedia is a cross-platform application for browsing and exploring mechanical keyboard switches. This project consists of a NestJS backend API and a React Native mobile app built with Expo.

## Project Structure

- **Backend**: NestJS API server with MongoDB
- **App**: React Native/Expo mobile application

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Yarn](https://yarnpkg.com/) package manager
- [Docker](https://www.docker.com/) and Docker Compose for MongoDB
- [Expo CLI](https://docs.expo.dev/workflow/expo-cli/) for mobile app development

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=3000
   DB_PORT=27017
   DB_URI=mongodb://localhost:27017/switchipedia
   ```

4. Start MongoDB using Docker:
   ```bash
   docker-compose up -d
   ```

5. Start the backend server:
   ```bash
   # Development mode
   yarn start:dev
   
   # Production mode
   yarn build
   yarn start:prod
   ```

## Mobile App Setup

1. Navigate to the app directory:
   ```bash
   cd app
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create a `.env` file in the app directory with:
   ```
   API_URL=http://localhost:3000
   ```

4. Start the Expo development server:
   ```bash
   yarn start
   ```

5. Use the Expo Go app on your device to scan the QR code, or run on simulators:
   ```bash
   # For iOS
   yarn ios
   
   # For Android
   yarn android
   
   # For web
   yarn web
   ```

## Deployment

### Backend Deployment

1. Build the Docker image:
   ```bash
   docker build -t switchipedia-backend .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 --env-file .env switchipedia-backend
   ```

Alternatively, you can deploy to platforms like Heroku, AWS, or Digital Ocean.

### Mobile App Deployment

Follow the Expo documentation for building and publishing your application:

- [Building standalone apps](https://docs.expo.dev/distribution/building-standalone-apps/)
- [Publishing to app stores](https://docs.expo.dev/distribution/app-stores/)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.