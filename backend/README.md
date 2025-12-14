# The VIF Luxury Riviera - Backend API

Professional Node.js/Express backend for The VIF Luxury Riviera vacation rental platform.

## 🏖️ Features

- **RESTful API** - Clean, well-documented endpoints following REST best practices
- **Authentication** - JWT-based auth with access and refresh tokens
- **Authorization** - Role-based access control (Guest, Admin, Super Admin)
- **Database** - Prisma ORM with PostgreSQL (or SQLite for development)
- **Validation** - Request validation with express-validator
- **Security** - Helmet, CORS, rate limiting, input sanitization
- **Email** - Nodemailer for transactional emails
- **File Upload** - Image processing with Sharp
- **Documentation** - Swagger/OpenAPI documentation
- **Logging** - Winston for structured logging
- **Audit Trail** - Track important actions

## 📁 Project Structure

```
backend/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.js            # Database seeding
├── src/
│   ├── config/
│   │   ├── index.js       # Configuration management
│   │   ├── database.js    # Prisma client
│   │   └── swagger.js     # API documentation config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── propertyController.js
│   │   ├── bookingController.js
│   │   ├── experienceController.js
│   │   ├── inquiryController.js
│   │   └── reviewController.js
│   ├── middleware/
│   │   ├── auth.js           # JWT authentication
│   │   ├── errorHandler.js   # Global error handling
│   │   ├── rateLimiter.js    # Rate limiting
│   │   └── validators.js     # Request validation
│   ├── routes/
│   │   ├── index.js          # Route aggregator
│   │   ├── authRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── experienceRoutes.js
│   │   ├── inquiryRoutes.js
│   │   └── reviewRoutes.js
│   ├── services/
│   │   ├── emailService.js   # Email notifications
│   │   ├── uploadService.js  # File uploads
│   │   └── auditService.js   # Audit logging
│   ├── utils/
│   │   ├── ApiError.js       # Custom error class
│   │   ├── response.js       # Response helpers
│   │   ├── helpers.js        # Utility functions
│   │   └── logger.js         # Logging setup
│   └── server.js             # Express app entry
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL (or SQLite for development)
- npm or yarn

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Set up database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

## 📚 API Documentation

Once the server is running, access the interactive API documentation at:
- **Swagger UI**: http://localhost:5000/api/docs
- **OpenAPI JSON**: http://localhost:5000/api/docs.json

## 🔑 Authentication

The API uses JWT tokens for authentication.

### Register
```bash
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "Password123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

### Login
```bash
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "Password123!"
}
```

### Using tokens
Include the access token in the Authorization header:
```
Authorization: Bearer <access_token>
```

## 📖 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/v1/auth/register | Register new user |
| POST | /api/v1/auth/login | Login |
| POST | /api/v1/auth/refresh | Refresh token |
| GET | /api/v1/auth/me | Get profile |
| PATCH | /api/v1/auth/me | Update profile |
| POST | /api/v1/auth/change-password | Change password |
| POST | /api/v1/auth/logout | Logout |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/properties | List all properties |
| GET | /api/v1/properties/:idOrSlug | Get property details |
| GET | /api/v1/properties/:id/availability | Get availability |
| POST | /api/v1/properties | Create property (Admin) |
| PATCH | /api/v1/properties/:id | Update property (Admin) |
| DELETE | /api/v1/properties/:id | Delete property (Admin) |
| POST | /api/v1/properties/:id/images | Add image (Admin) |
| POST | /api/v1/properties/:id/block-dates | Block dates (Admin) |

### Bookings
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/bookings | List bookings (Admin) |
| GET | /api/v1/bookings/stats | Get statistics (Admin) |
| GET | /api/v1/bookings/my-bookings | Get user's bookings |
| GET | /api/v1/bookings/:id | Get booking details |
| POST | /api/v1/bookings | Create booking |
| PATCH | /api/v1/bookings/:id | Update booking (Admin) |
| POST | /api/v1/bookings/:id/cancel | Cancel booking |
| DELETE | /api/v1/bookings/:id | Delete booking (Admin) |

### Experiences
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/experiences | List experiences |
| GET | /api/v1/experiences/:idOrSlug | Get experience details |
| POST | /api/v1/experiences | Create experience (Admin) |
| PATCH | /api/v1/experiences/:id | Update experience (Admin) |
| DELETE | /api/v1/experiences/:id | Delete experience (Admin) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/reviews | List reviews |
| GET | /api/v1/reviews/featured | Get featured reviews |
| GET | /api/v1/reviews/property/:id | Get property reviews |
| GET | /api/v1/reviews/:id | Get review details |
| POST | /api/v1/reviews | Create review |
| PATCH | /api/v1/reviews/:id | Update/respond (Admin) |
| DELETE | /api/v1/reviews/:id | Delete review (Admin) |

### Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/v1/inquiries | List inquiries (Admin) |
| GET | /api/v1/inquiries/stats | Get statistics (Admin) |
| GET | /api/v1/inquiries/:id | Get inquiry details (Admin) |
| POST | /api/v1/inquiries | Submit inquiry |
| PATCH | /api/v1/inquiries/:id | Update status (Admin) |
| DELETE | /api/v1/inquiries/:id | Delete inquiry (Admin) |

## 🔒 Rate Limiting

- **General**: 100 requests per 15 minutes
- **Authentication**: 5 attempts per 15 minutes
- **Bookings**: 10 per hour
- **Contact/Inquiries**: 5 per hour

## 🗄️ Database

### Using PostgreSQL (Recommended for production)
```env
DATABASE_URL="postgresql://user:password@localhost:5432/vif_db?schema=public"
```

### Using SQLite (Development)
```env
DATABASE_URL="file:./dev.db"
```

Update `prisma/schema.prisma` datasource provider accordingly.

### Database Commands
```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema changes
npm run db:migrate   # Create migration
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio GUI
```

## 📧 Email Configuration

Configure SMTP in `.env`:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
EMAIL_FROM=noreply@thevif.com
```

For Gmail, use an [App Password](https://support.google.com/accounts/answer/185833).

## 🧪 Testing

```bash
npm test          # Run tests
npm run test:watch  # Watch mode
```

## 🚢 Deployment

### Production Build
```bash
npm start
```

### Environment Variables
Set these in production:
- `NODE_ENV=production`
- `DATABASE_URL` - Production database
- `JWT_SECRET` - Strong random secret
- `JWT_REFRESH_SECRET` - Different strong secret
- `SMTP_*` - Production email config

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run db:generate
EXPOSE 5000
CMD ["npm", "start"]
```

## 📝 Default Admin Credentials

After seeding:
- **Email**: admin@thevif.com
- **Password**: Admin123!

⚠️ Change these immediately in production!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for The VIF Luxury Riviera
