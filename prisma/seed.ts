import { PrismaClient, Role } from "@/app/generated/prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt"

const pool = new Pool({connectionString: process.env.DATABASE_URL})
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({adapter});

async function main() {
  await prisma.review.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash("password", 10);

  const admin = await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "System Admin",
      password: hashedPassword,
      role: Role.ADMIN,
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: "user1@user.com",
      name: "Hari Bahadur",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@user.com",
      name: "Ramesh Bahadur",
      password: hashedPassword,
      role: Role.USER,
    },
  });

  const movie1 = await prisma.movie.create({
    data: {
      title: "Inception",
      description: "A thief who steals corporate secrets through dream-sharing technology.",
      imageUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    },
  });

  const movie2 = await prisma.movie.create({
    data: {
      title: "Interstellar",
      description: "A team of explorers travel through a wormhole in space to ensure humanity's survival.",
      imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=800",
    },
  });

  const movie3 = await prisma.movie.create({
    data: {
      title: "The Matrix",
      description: "A computer hacker learns from mysterious rebels about the true nature of his reality.",
      imageUrl: "https://unsplash.com",
    },
  });

  const movie4 = await prisma.movie.create({
    data: {
      title: "Blade Runner 2049",
      description: "A new blade runner unearths a long-buried secret that could plunge society into chaos.",
      imageUrl: "https://unsplash.com",
    },
  });

  const movie5 = await prisma.movie.create({
    data: {
      title: "Spirited Away",
      description: "A young girl wanders into a world ruled by gods, witches, and spirits.",
      imageUrl: "https://unsplash.com",
    },
  });

  await prisma.review.createMany({
    data: [
        {
          rating: 5,
          comment: "Very good movie",
          userId: user1.id,
          movieId: movie1.id,
        },
        {
          rating: 5,
          comment: "Yesta nathe movie",
          userId: user2.id,
          movieId: movie2.id,
        }
    ] 
  });

  console.log("Database successfully seeded!");
  console.log(`Admin ID: ${admin.email} Password: password`);
  console.log(`User ID: ${user1.email} ${user2.email} Password: password`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })