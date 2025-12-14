import swaggerJsdoc from 'swagger-jsdoc';
import config from '../config/index.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'The VIF Luxury Riviera API',
      version: '1.0.0',
      description: `
# The VIF Luxury Riviera API

Professional REST API for the VIF Luxury Riviera vacation rental platform.

## Features
- **Authentication**: JWT-based authentication with refresh tokens
- **Properties**: Full CRUD operations for property management
- **Bookings**: Create, manage, and track bookings
- **Experiences**: Add-on services and activities
- **Inquiries**: Contact form submissions
- **Reviews**: Guest reviews and ratings

## Authentication
Most endpoints require authentication using Bearer tokens.
Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <access_token>
\`\`\`

## Rate Limiting
- General endpoints: 100 requests per 15 minutes
- Authentication: 5 attempts per 15 minutes
- Booking creation: 10 per hour
- Contact form: 5 per hour
      `,
      contact: {
        name: 'The VIF Team',
        email: 'api@thevif.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}/api/${config.apiVersion}`,
        description: 'Development server',
      },
      {
        url: `https://api.thevif.com/api/${config.apiVersion}`,
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            email: { type: 'string', format: 'email' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            phone: { type: 'string' },
            role: { type: 'string', enum: ['GUEST', 'ADMIN', 'SUPER_ADMIN'] },
            isActive: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Property: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            slug: { type: 'string' },
            name: { type: 'string' },
            type: { type: 'string', enum: ['VILLA', 'APARTMENT'] },
            description: { type: 'string' },
            address: { type: 'string' },
            city: { type: 'string' },
            bedrooms: { type: 'integer' },
            bathrooms: { type: 'number' },
            maxGuests: { type: 'integer' },
            pricePerNight: { type: 'number' },
            isActive: { type: 'boolean' },
            isFeatured: { type: 'boolean' },
          },
        },
        Booking: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            bookingRef: { type: 'string' },
            propertyId: { type: 'string', format: 'uuid' },
            guestName: { type: 'string' },
            guestEmail: { type: 'string', format: 'email' },
            checkIn: { type: 'string', format: 'date' },
            checkOut: { type: 'string', format: 'date' },
            numGuests: { type: 'integer' },
            totalPrice: { type: 'number' },
            status: { type: 'string', enum: ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW'] },
          },
        },
        Experience: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            slug: { type: 'string' },
            name: { type: 'string' },
            tagline: { type: 'string' },
            basePrice: { type: 'number' },
            priceUnit: { type: 'string' },
            isActive: { type: 'boolean' },
          },
        },
        Review: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            propertyId: { type: 'string', format: 'uuid' },
            guestName: { type: 'string' },
            rating: { type: 'integer', minimum: 1, maximum: 5 },
            content: { type: 'string' },
            isVerified: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Inquiry: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            message: { type: 'string' },
            status: { type: 'string', enum: ['NEW', 'IN_PROGRESS', 'RESPONDED', 'CLOSED'] },
            createdAt: { type: 'string', format: 'date-time' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            message: { type: 'string' },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: { type: 'string' },
                  message: { type: 'string' },
                },
              },
            },
          },
        },
        PaginatedResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean' },
            message: { type: 'string' },
            data: { type: 'array', items: {} },
            pagination: {
              type: 'object',
              properties: {
                page: { type: 'integer' },
                limit: { type: 'integer' },
                total: { type: 'integer' },
                totalPages: { type: 'integer' },
                hasNext: { type: 'boolean' },
                hasPrev: { type: 'boolean' },
              },
            },
          },
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ForbiddenError: {
          description: 'User does not have permission',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
        ValidationError: {
          description: 'Validation failed',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/Error' },
            },
          },
        },
      },
    },
    tags: [
      { name: 'Auth', description: 'Authentication endpoints' },
      { name: 'Properties', description: 'Property management' },
      { name: 'Bookings', description: 'Booking management' },
      { name: 'Experiences', description: 'Experience add-ons' },
      { name: 'Reviews', description: 'Guest reviews' },
      { name: 'Inquiries', description: 'Contact inquiries' },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
