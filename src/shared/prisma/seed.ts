import { PrismaPg } from '@prisma/adapter-pg';

// Run npm run prisma:generate to generate the Prisma Client based on the schema.prisma file
import { serializeArray } from '../utils/helpers';
import { PrismaClient } from './generated/prisma/client';


const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

async function main() {

  // Crear usuario host
  const host = await prisma.user.create({
    data: {
      email: 'host@airbnb.com',
      password: '$2a$10$abcdefghijklmnopqrstuvwxyz',
      name: 'John Host',
      role: 'HOST',
    },
  });

  // Crear usuario guest
  const guest = await prisma.user.create({
    data: {
      email: 'guest@airbnb.com',
      password: '$2a$10$abcdefghijklmnopqrstuvwxyz',
      name: 'Jane Guest',
      role: 'GUEST',
    },
  });

  // Crear propiedad
  const property = await prisma.property.create({
    data: {
      title: 'Beautiful Beach House',
      description: 'Amazing ocean view with private beach access',
      price: 250.0,
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: 'HOUSE',
      status: 'PUBLISHED',
      address: '123 Beach Road',
      city: 'Miami',
      state: 'FL',
      country: 'USA',
      zipCode: '33139',
      latitude: 25.7617,
      longitude: -80.1918,
      hostId: host.id,
      amenities: serializeArray(['WiFi', 'Pool', 'Beach Access', 'BBQ']),
      images: serializeArray(['beach1.jpg', 'beach2.jpg', 'beach3.jpg']),
    },
  });

  console.log('Seed completed!');
  console.log({ host, guest, property });
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });